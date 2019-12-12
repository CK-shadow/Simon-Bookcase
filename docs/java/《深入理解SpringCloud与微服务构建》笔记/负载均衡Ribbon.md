---
title: 负载均衡Ribbon
tags: 
 - SpringCloud
 - Ribbon
categories: frontEnd
---

### RestTemplate简介
RestTemplate是Spring Resource中一个访问第三方RESTful API接口的网络请求框架。RestTemplate的设计原则和其它Spring Template类似，都是为执行复杂任务提供了一个具有默认行为的简单方法。RestTemplate是用来消费REST服务的，所有RestTemplate的主要方法都与REST的Http协议的一些方法紧密相连，例如HEAD、PUT、DELETE等方法，这些方法在RestTemplate类对应的方法为headForHeaders()、put()、delete()等RestTemplate的使用很简单，它支持Xml、JSON数据格式，默认实现了序列化，可自动将JSON字符串转换为实体

### Ribbon简介
负载均衡是指将负载分摊到多个执行单元上，常见的负载均衡有两种方式。一种是独立进程单元，通过负载均衡策略，将请求转发到不同的执行单元上。另一种是将负载均衡逻辑以代码的形式封装到服务消费者的客户端上，服务消费者客户端维护了一份服务提供者的信息列表，有了信息列表，通过负载均衡策略将请求分摊给多个服务提供者，从而达到负载均衡的目的

Ribbon属于第二种方式，将负载均衡逻辑封装在客户端中，并允许在客户端的进程中。Ribbon是一个经过了云端测试的IPC库，可以很好的控制HTTP和TCP客户端的负载均衡行为。在Spring Cloud构建的微服务系统中，Ribbon作为服务消费者的负载均衡器，可以与RestTemplate结合，也可以与Fetch结合

### 代码示例
[服务注册](https://gitee.com/CK_Simon/cloud-demo/tree/master/eureka-server)  
[服务提供者A](https://gitee.com/CK_Simon/cloud-demo/tree/master/eureka-ribbon-client-provider-A)  
[服务提供者B](https://gitee.com/CK_Simon/cloud-demo/tree/master/eureka-ribbon-client-provider-B)  
[ribbon-server](https://gitee.com/CK_Simon/cloud-demo/tree/master/eureka-ribbon-server)  
[服务消费者](https://gitee.com/CK_Simon/cloud-demo/tree/master/eureka-ribbon-client-service)  

