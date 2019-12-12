---
title: Shiro-RememberMe
tags: 
 - Shiro
 - RememberMe
categories: frontEnd
---

### RememberMe
Shiro提供了RememberMe功能，基本流程如下：
1. 首先在登录页面选择RememberMe然后登录成功，如果是浏览器登录，一般会把RememberMe的Cookie写到客户端然后保存下来
2. 关闭浏览器再重新打开，会发现浏览器还是记住你的
3. 能够访问一般的网页，并显示已登录
4. 访问某些特定的网页或功能，还是需要再次进行身份验证
        
### RememberMe配置
**web.xml配置**  
```
<bean id="sessionIdCookie" class="org.apache.shiro.web.servlet.SimpleCookie">
    <constructor-arg value="sid"/>
    <property name="httpOnly" value="true"/>
    <property name="maxAge" value="-1"/>
</bean>
<bean id="rememberMeCookie" class="org.apache.shiro.web.servlet.SimpleCookie">
    <constructor-arg value="rememberMe"/>
    <property name="httpOnly" value="true"/>
    <property name="maxAge" value="2592000"/><!-- 30天 -->
</bean>
```
* sessionIdCookie：maxAge=-1，表示浏览器关闭时失效此Cookie
* rememberMeCookie：即记住我的Cookie，保存时长30天

```      
<bean id="rememberMeManager" 
    class="org.apache.shiro.web.mgt.CookieRememberMeManager">
    <property name="cipherKey" value="\#{T(org.apache.shiro.codec.Base64).decode('4AvVhmFLUs0KTA3Kprsdag==')}"/>
    <property name="cookie" ref="rememberMeCookie"/>
</bean>
```

**rememberMeManager：RememberMe管理器，cipherKey是rememberMe Cookie的密钥，默认是AES算法**
```
<bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
    ……
    <property name="rememberMeManager" ref="rememberMeManager"/>
 </bean>
```

**安全管理器：设置securityManager安全管理器的rememberMeManager**  
```       
<bean id="formAuthenticationFilter" 
    class="org.apache.shiro.web.filter.authc.FormAuthenticationFilter">
    ……
    <property name="rememberMeParam" value="rememberMe"/>
</bean>
```

**rememberMeParam：即RememberMe请求参数名，请求参数是boolean类型，true表示RememberMe**  
``` 
<bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
    ……
    <property name="filterChainDefinitions">
    <value>
        /login.jsp = authc
        /logout = logout
        /authenticated.jsp = authc
        /** = user
    </value>
    </property>
</bean>
```

“/authenticated.jsp = authc” 表示访问该地址用户必须身份验证通过（Subject. isAuthenticated()==true）；而 /** = user” 表示访问该地址的用户是身份验证通过或 RememberMe 登录的都可以

