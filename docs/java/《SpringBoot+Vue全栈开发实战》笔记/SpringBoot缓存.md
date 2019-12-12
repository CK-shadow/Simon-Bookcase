---
title: SpringBoot缓存
tags: 
 - SpringBoot
 - Cache
categories: frontEnd
---

### Spring Boot缓存
Spring3.1中开始对缓存提供支持，核心思路是对方法的缓存，当开发者调用一个方法时，将方法的参数和返回值作为key/value缓存起来，当再次调用该方法时，如果缓存中有数据，就直接从缓存中获取，否则再去执行该方法。但是，Spring中并未提供缓存的实现，而是提供了一套缓存的API，开发者可以自由选择缓存的实现，目前Spring Boot支持的缓存有如下几种：
* JCache（JSR-107）
* Ehcache 2.x
* Hazelcast
* Infinispan
* Couchbase
* Redis
* Caffeine
* Simple
目前最常用的缓存实现是EhCache 2.x和Redis，由于Spring早已将缓存领域统一，因此无论使用哪种缓存实现，不同的只是缓存配置，开发者使用的缓存注解是一致的 

### Ehcache 2.x缓存
Ehcache缓存在Java开发领域已是久负盛名，在Spring Boot中，只需要一个配置文件就可以将Ehcache集成到项目中。Ehcache 2.x的使用步骤如下：
1. 创建项目，添加缓存依赖
```java
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>net.sf.ehcache</groupId>
    <artifactId>ehcache</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
2. 添加缓存配置文件  
在classpath下添加一个名为ehcache.xml的Ehcache配置文件，EhCacheManager会自动读取并作为缓存的实现
