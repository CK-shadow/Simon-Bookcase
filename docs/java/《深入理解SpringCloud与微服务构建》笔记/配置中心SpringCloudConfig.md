---
title: 配置中心SpringCloudConfig
tags: 
 - SpringCloud
 - Config
categories: frontEnd
---

### Config Server 从本地读取配置文件
Config Server可以从本地仓库读取配置文件，也可以从远程Git仓库读取。本地仓库是指将所有的配置文件统一写在Config Server工程目录下。Config Server暴露Http API接口，Config Client通过调用Config Server的Http API接口来读取配置文件

### Config Server 从远程Git仓库读取配置文件
Spring Cloud Config支持从远程Git仓库读取配置文件，即Config Server可以不从本地的仓库读取，而是从远程Git仓库读取。这样做的好处就是将配置统一管理，并且可以通过Spring Cloud Bus在不人工启动程序的情况下对Config Client进行刷新

[config-server](https://gitee.com/CK_Simon/cloud-demo/tree/master/cloud-config-server)  
[config-client](https://gitee.com/CK_Simon/cloud-demo/tree/master/cloud-config-client)

### 使用 Spring Cloud Bus刷新配置
Spring Cloud Bus是用轻量的消息代理将分布式的节点连接起来，可以用于广播配置文件的更改或者服务的监控管理。一个关键的思想就是，消息总线可以为微服务做监控，也可以实现应用程序之间的相互通信。Spring Cloud Bus可选的消息代理组件包括RabbitMQ、AMQP和Kafka等。Spring Cloud Bus的主要功能就是在修改配置文件之后，不用手动的去一个个重启服务容器。当远程Git仓库的配置更改后，只需向某一个微服务示例发送一个Post请求，通过消息组件通知其它微服务实例重新拉取配置文件

