---
title: SpringBoot整合持久层技术
tags: 
 - SpringBoot
categories: frontEnd
---

### 整合JdbcTemplate（注：除JdbcTemplate之外，其余MyBatis和Spring Data均有详细教程）
JdbcTemplate是Spring提供的一套JDBC模板框架，利用AOP技术来解决直接使用JDBC时大量重复代码的问题。JdbcTemplate虽然没有MyBatis那么灵活，但是比起直接使用JDBC要方便很多

**整合JdbcTemplate代码示例**  
![整合JdbcTemplate代码示例](../../.vuepress/public/img/201911281033.png)

**Jdbc多数据源配置（使用不同数据源的JdbcTemplate）**  
![](../../.vuepress/public/img/201911281138.png)
![](../../.vuepress/public/img/201911281411.png)
![](../../.vuepress/public/img/201911281416.png)
![](../../.vuepress/public/img/201911281421.png)

**MyBatis多数据源配置（不同的Mapper指定不同的数据源）**  
![](../../.vuepress/public/img/201911281423.png)

**SpringDataJpa多数据源配置（不同的Repository指定不同的数据源）**
![](../../.vuepress/public/img/201911281622.png)

**Spring Boot整合持久层技术代码示例**  
[SpringBoot整合持久层技术代码示例](https://gitee.com/CK_Simon/boot-demo/tree/master/chapter-3)

