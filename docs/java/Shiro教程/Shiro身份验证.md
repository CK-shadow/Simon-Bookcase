---
title: Shiro授权
tags: 
 - Authorization
categories: frontEnd
---

### 身份验证
1. 导入相关jar包  
![](../../.vuepress/public/img/682f430b.png)
![](../../.vuepress/public/img/682f430b.png)
   
2. 添加shiro.ini配置文件  
![](../../.vuepress/public/img/c31733af.png)
   
3. 编写HelloWorldTest测试类  
![](../../.vuepress/public/img/c50b3601.png)
   
### 身份认证流程
![](../../.vuepress/public/img/dafd5ab5.png)
   
1. 首先调用Subject.login(token)，其会自动委托给SecurityManager，调用之前必须通过SecurityUtils.setSecurityManager()设置
2. SecurityManager负责真正的身份验证逻辑，它会委托给Authenticator进行身份验证
3. Authenticator才是真正的身份验证者，Shiro API中核心得身份认证入口点，此处可自定义自己的实现
4. Authenticator可能会委托给相应的AuthenticationStrategy进行多Realm身份验证，默认ModularRealmAuthenticator进行多Realm验证
5. Authenticator会把相应的token传入Realm，从Realm获取身份验证信息，如果没有返回/抛出异常则表明验证失败
    
### 单Realm配置
基本DefaultSecurityMaager的单Realm配置（Shiro新版本推荐的Realm配置，但不支持多Realm配置，或是我还未发现，此处有待后续深入学习考证）
        
1. 编写自定义Realm   
![](../../.vuepress/public/img/ac08b93d.png)
   
2. 编写测试类  
![](../../.vuepress/public/img/b12e825a.png)
   
**基于IniSecurityManager的单Realm配置（已经过时的Realm配置方法，但是现在Shiro学习资料基本都是用此方法）**    
1. 编写自定义Realm  
![](../../.vuepress/public/img/ac08b93d.png)
   
2. 添加shiro.ini配置文件  
![](../../.vuepress/public/img/1523bb54.png)
    
3. 编写测试类  
![](../../.vuepress/public/img/ab28b891.png)
    
### 多Realm配置
目前只找到基于IniSecurityManager的多Realm配置方法，只需在shiro.ini添加多个realm配置即可
![](../../.vuepress/public/img/864e971e.png)
   
### JDBCRealm
1. 导入数据库连接jar包  
2. 创建数据库表，jdbcRealm默认的查询语句表名和字段名都已确定，如果使用jdbcRealm的默认配置，则表名和字段名都要一一对应，我们也可以通过Shiro提供的方法自定义自己的查询语句  
![](../../.vuepress/public/img/2a19b46b.png)
   
3. 添加shiro.ini配置文件
![](../../.vuepress/public/img/a1073d4a.png)
   
4. 编写测试类，与单Realm配置一样

