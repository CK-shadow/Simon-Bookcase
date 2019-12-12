---
title: 负载均衡Feign
tags: 
 - SpringCloud
 - Feign
categories: frontEnd
---

### FeignClient详解
![](../../.vuepress/public/img/201911121651.png)

FeignClient注解被@Target(ElementType.TYPE)修饰，表示FeignClient注解的作用目标在接口上。@Retention(RetentionPolicy.RUNTIME)注解表明该注解会在Class字节码文件中存在，在运行时可以通过反射获取到。@Documented表示该注解将被包含在Javadoc中

@FeignClient注解用于创建声明式API接口，该接口是RESTful风格的。Feign被设计成插拔式的，可以注入其它组件与Feign一起使用。最典型的是如果Ribbon可用，Feign会和Ribbon结合实现负载均衡

在代码中，value()和name()一样，是被调用的服务的serviceId。url()直接写硬编码的Url地址。decode()404即404是被解码，还是抛异常。configuration()指明FeignClient的配置类，默认的是FeignClientsConfiguration类，在缺省情况下，这个类注入了默认的Decoder、Encoder和Contract等配置的bean。fallback()为配置熔断器的处理类

### Feign常用配置
**Ribbon配置**  
在Feign中配置Ribbon非常简单，直接在配置文件中添加配置即可：
```
ribbon.ConnectTimeout=500 # 设置连接超时时间
ribbon.ReadTimeout=5000 # 设置读取超时时间
ribbon.OkToRetryOnAllOperations=true # 对所有请求都进行重试
ribbon.MaxAutoRetriesNextServer=2 # 切换实例的重试次数
ribbon.MaxAutoRetries=1 # 对当前实例的重试次数
```
也可以指定某个服务的配置，比如：
```
user-service.ribbon.ConnectTimeout=600 # 设置user-service服务的连接超时时间
```

    
**请求压缩**  
Spring Cloud Feign支持对请求和响应进行GZIP压缩，以提高通信效率，配置方式如下：
```
feign.compression.request.enabled=true # 配置请求GZIP压缩
feign.compression.response.enabled=true # 配置响应GZIP压缩
# 配置压缩支持的MIME TYPE
feign.compression.request.mime-types=text/xml,application/xml,application/json 
feign.compression.request.min-request-size=2048 # 配置压缩数据的下限
```

**日志配置**  
Spring Cloud Feign为每个Feign Client都提供了一个Logger实例  
```
logging.level. com.eureka.feign.service.UserService: debug 
```
然后在启动类中添加Logger实例

### 在Feign中使用HttpClient和OkHttp
在Feign中，Client是一个非常重要的组件，Feign最终发送Request请求以及接收Response响应都是由Client组件完成的。Client在Feign源码中是一个接口，在默认的情况下，Client的实现类是Client.Default，Client.Default是由HttpUrlConnection来实现网络请求的。另外，Client还支持HttpClient和OkHttp来进行网络请求。只需在项目中导入相应的jar包即可

### 总结
总的来说，Feign源码实现过程如下：
1. 首先通过@EnableFeignClients注解开启FeignClient的功能，只有这个注解存在，才会在程序启动时开启对@FeignClient注解的包扫描  
2. 根据Feign规则实现接口，并在接口上添加@FeignClient注解
3. 程序启动后，会进行包扫描，扫描所有的@FeignClient注解的类，并将这些信息注入到IOC容器中
4. 当接口的方法被调用时，通过JDK的代理来生成具体的RequestTemplate模板对象
5. 根据RequestTemplate再生成Http请求的Request对象
6. Request对象交给Client去处理，其中Client的网络请求框架可以是HttpUrlConnection、HttpClient和OkHttp
7. 最后Client被封装到LoadBalanceClient类，这个类结合类Ribbon做到了负载均衡

