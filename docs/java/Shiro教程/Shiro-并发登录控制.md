---
title: Shiro-并发登录控制
tags: 
 - Shiro
categories: frontEnd
---

### 并发登录控制配置（spring-config-shiro.xml）
```
<bean id="kickoutSessionControlFilter" 
class="com.simon.web.shiro.filter.KickoutSessionControlFilter">
    <property name="cacheManager" ref="cacheManager"/>
    <property name="sessionManager" ref="sessionManager"/>
    <property name="kickoutAfter" value="false"/>
    <property name="maxSession" value="2"/>
    <property name="kickoutUrl" value="/login?kickout=1"/>
</bean>
```
    
* cacheManager：使用cacheManager获取响应的cache来缓存用户登录的会话，用于保存用户-会话之间关系的
* sessionManager：用于根据会话ID，获取会话进行踢出操作
* kickoutAfter：是否提出后来登录的，默认是false，即后登录用户踢出前登录用户
* maxSession：同一个用户的最大会话数，默认1
* kickoutUrl：被踢出后重定向到的地址
    
### Shiro-Filter配置
```
<bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
    <property name="securityManager" ref="securityManager"/>
    <property name="loginUrl" value="/login"/>
    <property name="filters">
        <util:map>
            <entry key="authc" value-ref="formAuthenticationFilter"/>
            <entry key="sysUser" value-ref="sysUserFilter"/>
            <entry key="kickout" value-ref="kickoutSessionControlFilter"/>
        </util:map>
    </property>
    <property name="filterChainDefinitions">
        <value>
            /login = authc
            /logout = logout
            /authenticated = authc
            /** = kickout,user,sysUser
        </value>
    </property>
</bean>
```

### KickoutSessionControlFilter核心代码
```
protected boolean onAccessDenied(ServletRequest request, ServletResponse response) throws Exception {
    Subject subject = getSubject(request, response);
    if(!subject.isAuthenticated() && !subject.isRemembered()) {
        //如果没有登录，直接进行之后的流程
        return true;
    }
    Session session = subject.getSession();
    String username = (String) subject.getPrincipal();
    Serializable sessionId = session.getId();
    //TODO 同步控制
    Deque<Serializable> deque = cache.get(username);
    if(deque == null) {
        deque = new LinkedList<Serializable>();
        cache.put(username, deque);
    }
    //如果队列里没有此sessionId，且用户没有被踢出；放入队列
    if(!deque.contains(sessionId) && session.getAttribute("kickout") == null) {
        deque.push(sessionId);
    }
    //如果队列里的sessionId数超出最大会话数，开始踢人
    while(deque.size() > maxSession) {
        Serializable kickoutSessionId = null;
        if(kickoutAfter) { //如果踢出后者
            kickoutSessionId = deque.removeFirst();
        } else { //否则踢出前者
            kickoutSessionId = deque.removeLast();
        }
        try {
            Session kickoutSession =
                sessionManager.getSession(new DefaultSessionKey(kickoutSessionId));
            if(kickoutSession != null) {
                //设置会话的kickout属性表示踢出了
                kickoutSession.setAttribute("kickout", true);
            }
        } catch (Exception e) {//ignore exception
        }
    }
    //如果被踢出了，直接退出，重定向到踢出后的地址
    if (session.getAttribute("kickout") != null) {
        //会话被踢出了
        try {
            subject.logout();
        } catch (Exception e) { //ignore
        }
        saveRequest(request);
        WebUtils.issueRedirect(request, response, kickoutUrl);
        return false;
    }
    return true;
}
```