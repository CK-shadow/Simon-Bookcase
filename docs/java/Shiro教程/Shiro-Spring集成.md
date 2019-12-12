---
title: Shiro-缓存机制
tags: 
 - Shiro
 - Cache
categories: frontEnd
---

### 与Spring集成
* Shiro的组件都是JavaBean/POJO式的组件，所有非常容易使用Spring进行组件管理，可以非常方便的从ini配置迁移到pring进行管理，且支持JavaEE应用和Web应用的集成。
* 需导入shiro-spring及spring-context相关依赖
* spring-beans.xml配置文件提供了基础组件如DataSource、DAO、Service组件的配置
    
### JavaSE应用
**spring-shiro.xml提供了普通JavaSE独立应用的spring配置：**  
```
<!-- 缓存管理器 使用Ehcache实现 -->
<bean id="cacheManager" class="org.apache.shiro.cache.ehcache.EhCacheManager">
    <property name="cacheManagerConfigFile" value="classpath:ehcache.xml"/>
</bean>
<!-- 凭证匹配器 -->
<bean id="credentialsMatcher" class="com.github.zhangkaitao.shiro.chapter12.credentials
        .RetryLimitHashedCredentialsMatcher">
    <constructor-arg ref="cacheManager"/>
    <property name="hashAlgorithmName" value="md5"/>
    <property name="hashIterations" value="2"/>
    <property name="storedCredentialsHexEncoded" value="true"/>
</bean>
<!-- Realm实现 -->
<bean id="userRealm" class="com.github.zhangkaitao.shiro.chapter12.realm.UserRealm">
    <property name="userService" ref="userService"/>
    <property name="credentialsMatcher" ref="credentialsMatcher"/>
    <property name="cachingEnabled" value="true"/>
    <property name="authenticationCachingEnabled" value="true"/>
    <property name="authenticationCacheName" value="authenticationCache"/>
    <property name="authorizationCachingEnabled" value="true"/>
    <property name="authorizationCacheName" value="authorizationCache"/>
</bean>
<!-- 会话ID生成器 -->
<bean id="sessionIdGenerator" 
class="org.apache.shiro.session.mgt.eis.JavaUuidSessionIdGenerator"/>
<!-- 会话DAO -->
<bean id="sessionDAO" 
    class="org.apache.shiro.session.mgt.eis.EnterpriseCacheSessionDAO">
    <property name="activeSessionsCacheName" value="shiro-activeSessionCache"/>
    <property name="sessionIdGenerator" ref="sessionIdGenerator"/>
</bean>
<!-- 会话验证调度器 -->
<bean id="sessionValidationScheduler" class="org.apache.shiro.session.mgt.quartz
        .QuartzSessionValidationScheduler">
    <property name="sessionValidationInterval" value="1800000"/>
    <property name="sessionManager" ref="sessionManager"/>
</bean>
<!-- 会话管理器 -->
<bean id="sessionManager" class="org.apache.shiro.session.mgt.DefaultSessionManager">
    <property name="globalSessionTimeout" value="1800000"/>
    <property name="deleteInvalidSessions" value="true"/>
    <property name="sessionValidationSchedulerEnabled" value="true"/>
    <property name="sessionValidationScheduler" ref="sessionValidationScheduler"/>
    <property name="sessionDAO" ref="sessionDAO"/>
</bean>
<!-- 安全管理器 -->
<bean id="securityManager" class="org.apache.shiro.mgt.DefaultSecurityManager">
    <property name="realms">
        <list><ref bean="userRealm"/></list>
    </property>
    <property name="sessionManager" ref="sessionManager"/>
    <property name="cacheManager" ref="cacheManager"/>
</bean>
<!-- 相当于调用SecurityUtils.setSecurityManager(securityManager) -->
<bean class="org.springframework.beans.factory.config.MethodInvokingFactoryBean">
<property name="staticMethod" value="org.apache.shiro.SecurityUtils.setSecurityManager"/>
    <property name="arguments" ref="securityManager"/>
</bean>
<!-- Shiro生命周期处理器-->
<bean id="lifecycleBeanPostProcessor" class="org.apache.shiro.spring
        .LifecycleBeanPostProcessor"/>
```
        
可以看出，只要把之前的ini配置翻译为此处的spring xml配置方式即可，无须多解释。 LifecycleBeanPostProcessor 用于在实现了Initializable接口的Shiro Bean初始化时调用Initializable接口回调，在实现了Destroyable接口的Shiro bean销毁时调用Destroyable接口回调
    
### Web应用
Web应用和普通JavaSE应用的某些配置是类似的，此处只提供一些不一样的配置
```
<!-- 会话Cookie模板 -->
<bean id="sessionIdCookie" class="org.apache.shiro.web.servlet.SimpleCookie">
    <constructor-arg value="sid"/>
    <property name="httpOnly" value="true"/>
    <property name="maxAge" value="180000"/>
</bean>
<!-- 会话管理器 -->
<bean id="sessionManager" 
class="org.apache.shiro.web.session.mgt.DefaultWebSessionManager">
    <property name="globalSessionTimeout" value="1800000"/>
    <property name="deleteInvalidSessions" value="true"/>
    <property name="sessionValidationSchedulerEnabled" value="true"/>
    <property name="sessionValidationScheduler" ref="sessionValidationScheduler"/>
    <property name="sessionDAO" ref="sessionDAO"/>
    <property name="sessionIdCookieEnabled" value="true"/>
    <property name="sessionIdCookie" ref="sessionIdCookie"/>
</bean>
<!-- 安全管理器 -->
<bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
<property name="realm" ref="userRealm"/>
    <property name="sessionManager" ref="sessionManager"/>
    <property name="cacheManager" ref="cacheManager"/>
</bean>
```    
1. sessonIdCookie使用于生产Session ID Cookie的模板
2. 会话管理器使用用于web环境的DefaultWebSessionManager
3. 安全管理器使用用于web环境的DefaultWebSecurityManager

```   
<!-- 基于Form表单的身份验证过滤器 -->
<bean id="formAuthenticationFilter" 
class="org.apache.shiro.web.filter.authc.FormAuthenticationFilter">
    <property name="usernameParam" value="username"/>
    <property name="passwordParam" value="password"/>
    <property name="loginUrl" value="/login.jsp"/>
</bean>
<!-- Shiro的Web过滤器 -->
<bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
    <property name="securityManager" ref="securityManager"/>
    <property name="loginUrl" value="/login.jsp"/>
    <property name="unauthorizedUrl" value="/unauthorized.jsp"/>
    <property name="filters">
        <util:map>
            <entry key="authc" value-ref="formAuthenticationFilter"/>
        </util:map>
    </property>
    <property name="filterChainDefinitions">
        <value>
            /index.jsp = anon
            /unauthorized.jsp = anon
            /login.jsp = authc
            /logout = logout
            /** = user
        </value>
    </property>
</bean>
```

1. formAuthenticationFilter 为基于 Form 表单的身份验证过滤器；此处可以再添加自己的 Filter bean 定义
2. shiroFilter：此处使用 ShiroFilterFactoryBean 来创建 ShiroFilter 过滤器；filters 属性用于定义自己的过滤器，即 ini 配置中的 [filters] 部分；filterChainDefinitions 用于声明 url 和 filter 的关系，即 ini 配置中的 [urls] 部分
      
接着在web.xml进行如下配置
```
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>
        classpath:spring-beans.xml,
        classpath:spring-shiro-web.xml
    </param-value>
    </context-param>
    <listener>
        <listener-class>
        org.springframework.web.context.ContextLoaderListener
        </listener-class>
    </listener>
```

通过 ContextLoaderListener 加载 contextConfigLocation 指定的 Spring 配置文件

```
<filter>
    <filter-name>shiroFilter</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
    <init-param>
        <param-name>targetFilterLifecycle</param-name>
        <param-value>true</param-value>
    </init-param>
</filter>
<filter-mapping>
    <filter-name>shiroFilter</filter-name>
    <url-pattern>/*</url-pattern>
</filter-mapping>
```

DelegatingFilterProxy 会自动到 Spring 容器中查找名字为 shiroFilter 的 bean 并把 filter 请求交给它处理
    
### Shiro权限注解
Shiro提供了相应的注解用于权限控制，如果使用这些注解就需要使用AOP的功能来进行判断，Shiro提供了Spring AOP集成用于权限注解的解析和验证为了测试，此处用了Spring MVC来测试Shiro注解，当然Shiro注解不仅可以再web环境中使用，在独立的JavaSE环境中也是可以使用的
    
在spring-mvc.xml配置文件添加Shiro Spring AOP权限注解的支持：
```
<aop:config proxy-target-class="true"></aop:config>
<bean class="
org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor">
    <property name="securityManager" ref="securityManager"/>
</bean>
```
        
接着就可以在相应的控制器中使用如下方式进行注解：
```
@RequiresRoles("admin")
@RequestMapping("/hello")
public String hello() {
    return "hello world";
}
```
        
### 权限注解
* @RequiresAuthentication
  * 表示当前Subject已经通过login进行了身份验证，即Subject.isAuthenticated()返回true
* @RequiresUser
  * 表示当前Subject已经身份验证或者通过记住我登录的
* @RequiresGuest
  * 表示当前Subject没有身份验证或通过记住我登录，即是游客身份
* @RequiresRoles(value={“admin”, “user”}, logical= Logical.AND)
  * 表示当前的Subject需要角色admin和user
* @RequiresPermissions (value={“user:a”, “user:b”}, logical= Logical.OR)
  * 表示当前Subject需要权限user:a或user:b
    
