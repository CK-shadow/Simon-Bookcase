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
```
<ehcache>
    <diskStore path="java.io.tmpdir/cache"/>
    <!-- 默认缓存策略 -->
    <defaultCache
            maxElementsInMemory="10000"
            eternal="false"
            timeToIdleSeconds="120"
            timeToLiveSeconds="120"
            overflowToDisk="false"
            diskPersistent="false"
            diskExpiryThreadIntervalSeconds="120"/>
    <!-- 指定缓存策略 -->
    <cache
            name="book_cache"
            maxElementsInMemory="10000"
            eternal="true"
            timeToIdleSeconds="120"
            timeToLiveSeconds="120"
            overflowToDisk="true"
            diskPersistent="true"
            diskExpiryThreadIntervalSeconds="120"/>
</ehcache>
```
* name：缓存名称
* maxElementsInMemory：最大缓存个数
* eternal：缓存对象是否永久有效，一旦设置了永久有效，timeout将不起作用
* timeToIdleSeconds：缓存对象在失效前的允许闲置时间，当eternal=false时该属性才生效
* timeToLiveSeconds：缓存对象在失效前的允许存活时间，当eternal=false时该属性才生效
* overflowToDisk：当内存中的对象数量达到maxElementsInMemory时，Ehcache是否将对象写道磁盘中
* diskExpiryThreadIntervalSeconds：磁盘失效线程运行时间间隔

若想自定义配置文件名及位置，可在application.properties中添加如下配置  
```
spring.cache.ehcache.config=classpath:ehcache.xml
```
3. 开启缓存
```
@EnableCaching
@SpringBootApplication
public class BootDemoApplication
```
4. 创建Book实体类、BookDao以及Service
```java
public class Book implements Serializable {
    private Integer id;
    private String name;
    private String author;
    ...
}
```
```java
@Repository
//指定缓存使用名称，此配置可选，若不指定，则需在@Cacheable中指定
@CacheConfig(cacheNames = "book_cache")
public class BookDao {
    //默认情况下，缓存的key是方法的参数，返回的结果是方法的返回值，若是在其它类中调用此方
    //法，则会优先使用缓存，若是在当前类中使用该方法，则缓存不会生效。condition描述缓存的
    //执行时机，当前方法中则表示id取余2为0时才进行缓存
    @Cacheable(condition = "#id%2==0")
    public Book getBookById(Integer id) {
        Book book = new Book();
        book.setId(id);
        book.setName("三国演义");
        book.setAuthor("罗贯中");
        return book;
    }
    //指定key的值，我们也可以使用root对象来生成key
    @CachePut(key = "#book.id")
    public Book updateBookById(Book book) {
        book.setName("红楼梦");
        return book;
    }
    @CacheEvict(key = "#id")
    public void deleteBookById(Integer id) {
        System.out.println(id);
    }
}
```

**使用root对象生成key**
| 属性名称 | 属性描述          | 用法示例         |
| ----------- | --------------------- | -------------------- |
| methodName  | 当前方法名       | #root.methodName     |
| method      | 当前方法对象    | #root.method.name    |
| caches      | 当前方法使用的缓存 | #root.caches[0].name |
| target      | 当前被调用的对象 | #root.target         |
| targetClass | 当前被调用对象的class | #root.targetClass    |
| args        | 当前方法参数数组 | #root.args[0]        |

如果这些Key不能满足开发需求，我们也可自定义缓存key的生成器KeyGenerator

5.进行测试

### Redis单机缓存
和Ehcache一样，如果在classpath下存在Redis并且Redis已经配置好了，此时就会默认使用RedisCacheManager作为缓存提供者
1. 创建项目，添加依赖缓存
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-redis</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```
2. 在application.properties中添加缓存配置
```
# 缓存配置
spring.cache.cache-names=cache1, cache2
spring.cache.redis.time-to-live=1800s
# redis配置
spring.redis.database=0
spring.redis.host=localhost
spring.redis.port=6379
spring.redis.password=123456
spring.redis.jedis.pool.max-active=8
spring.redis.jedis.pool.max-idle=8
spring.redis.jedis.pool.max-wait=-1ms
spring.redis.jedis.pool.min-idle=0
```
3. 开启缓存
 ```
@EnableCaching
@SpringBootApplication
public class BootDemoApplication
```
4. 编写实体类与测试步骤，与Ehcache 2.x一致

### Redis集群缓存
1. 搭建集群
2. 配置缓存
```java
@Configuration
public class RedisCacheConfig {
    @Autowired
    private RedisConnectionFactory redisConnectionFactory;
    @Bean
    public RedisCacheManager redisCacheManager() {
        Map<String, RedisCacheConfiguration> configurationMap = new HashMap<>();
        RedisCacheConfiguration redisCacheConfiguration = RedisCacheConfiguration
                .defaultCacheConfig()
                .prefixKeysWith(":sand")
                .disableCachingNullValues()
                .entryTtl(Duration.ofMinutes(30));
        configurationMap.put("cache1", redisCacheConfiguration);
        RedisCacheWriter redisCacheWriter = RedisCacheWriter
                .nonLockingRedisCacheWriter(redisConnectionFactory);
        RedisCacheManager redisCacheManager = new RedisCacheManager(
                redisCacheWriter,
                RedisCacheConfiguration.defaultCacheConfig(),
                configurationMap
        );
        return redisCacheManager;
    }

}
```
3. 使用缓存，进行测试

### 小结
Ehcache部署简单，使用门槛较低，操作简便，但是功能较少，可扩展性较弱；Redis则需要单独部署服务器，单机版的Redis缓存基本上做到了开箱即用，集群版的Redis缓存虽然配置繁琐，但是有良好的扩展性与安全性，开发者在开发中可根据实际情况选择不同的缓存策略实现

### Spring Boot缓存代码示例
[SpringBoot缓存代码示例](https://gitee.com/CK_Simon/boot-demo/tree/master/chapter-4)