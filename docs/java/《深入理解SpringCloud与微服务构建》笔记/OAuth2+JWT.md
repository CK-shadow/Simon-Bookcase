---
title: OAuth2+JWT
tags: 
 - OAuth2
 - JWT
categories: frontEnd
---

### 使用Spring Security OAuth2和JWT保护微服务系统
如果只用Spring Security OAuth2来保护Spring Cloud微服务系统的话，那么每次请求都需要经过Uaa服务去验证当前Token的合法性，并且需要查询该Token对应的用户的权限。在高并发场景下，会存在性能瓶颈，改善的方法是将Uaa服务集群部署并加上缓存。可以采用Spring Security OAuth2和JWT的方式，Uaa服务只验证一次，返回JWT。返回的JWT中包含了用户的所有信息，包括权限信息

### 什么是JWT
JSON Web Token（JWT）是一种开放的标准，JWT定义了一种紧凑且自包含的标准，该标准旨在将各个主体的信息包装为JSON对象。主体信息是通过数字签名进行加密和验证的。常使用HMAC算法或RSA算法对JWT进行签名，安全性很高，下面进一步解释它的特点：
* 紧凑型：由于是加密后的字符串，JWT看起来数据体积非常小，可通过POST请求参数或HTTP请求头发送，另外，数据体积小意味着传输速度快
* 自包含：JWT包含了主体的所有信息，所以避免了每个请求都需要向Uaa服务验证身份，降低了服务器的负载

### JWT的结构
JWT由3个部分组成，分别以"."号分隔，组成部分如下：
* Header（头）
  * Header通常由两部分组成：令牌的类型和使用的算法类型，将Header用Base64编码作为JWT的第一部分 
* Payload（有效载荷）
  * Payload包含了用户的一些基本信息和Claim（声明、权利），有3种类型的Claim：保留、公开和私人，将Payload用Base64编码作为JWT的第一部分 
* Signature（签名）
  * 要创建签名部分，须将Base64编码后的Header、Payload和密钥进行签名

### JWT的应用场景
JWT的使用场景如下：
* 认证：这时JWT最常见的使用场景，一旦用户登录成功获取JWT之后，后续的每个请求都将携带该JWT。该JWT包含了用户信息、权限点等信息，根据JWT包含的信息，资源服务可以控制该JWT可以访问的资源范围。因为JWT的开销很小，并且能够在不同的域中使用，单点登录是一个广泛使用JWT的场景
* 信息交换：JWT是在各方之间安全传输信息的一种方式，JWT使用签名加密，安全性很高。另外，当使用Header和Payload签名时，还可以验证内容是否被篡改

### 如何使用JWT
客户端通过提供用户名、密码向服务器请求获取JWT，服务器判断用户名和密码正确无误之后，将用户信息和权限点经过加密以JWT形式返回给客户端。在以后的每次请求中，获取到该JWT的客户端都需要携带该JWT，这样做的好处就是以后的请求都不需要通过Uaa服务来判断该请求的用户以及该用户的权限。在微服务系统中，可以使用JWT来做单点登录

[推荐博文](https://www.cnblogs.com/yueshutong/p/10279346.html)