---
title: JPA相关内容简介
tags: 
 - JPA
categories: frontEnd
---

### Hibernate简介
Hibernate是一个开放源代码的对象关系映射框架，它对JDBC进行了非常轻量级的对象封装，它将POJO与数据库表建立映射关系，是一个全自动的orm框架，hibernate可以自动生成SQL语句，自动执行，使得Java程序员可以随心所欲的使用对象编程思维来操纵数据库。 Hibernate可以应用在任何使用JDBC的场合，既可以在Java的客户端程序使用，也可以在Servlet/JSP的Web应用中使用，最具革命意义的是，Hibernate可以在应用EJB的JaveEE架构中取代CMP，完成数据持久化的重任

### JPA标准
JPA是Java Persistence API的简称，中文名Java持久层API，是JDK 5.0注解或XML描述对象－关系表的映射关系，并将运行期的实体对象持久化到数据库中。Sun引入新的JPA ORM规范出于两个原因：其一，简化现有Java EE和Java SE应用开发工作；其二，Sun希望整合ORM技术，实现天下归一

### SpringData概述
SpringData：Spring的一个子项目，用于简化数据库访问，支持NoSQL和关系数据存储，去主要目标是使数据库的访问变得方便快捷  
SpringData项目所支持NoSQL存储：
* MongoDB（文档数据库）
* Neo4j（图形数据库）
* Redis（键/值存储）
* Hbase（列族数据库）
SpringData项目所支持的关系数据存储项目：
* JDBC
* JPA

JPA Spring Data：致力于减少数据访问层（DAO）的开发量，开发者唯一要做的，就是声明持久层的接口，其它的都交给Spring Data JPA来完成

比如：当有一个UserDAO.findUserById()这样一个方法声明，大致能判断出这是根据id来查询用户。Spring Data JPA做的便是规范方法的名字，根据符合规范的名字来确定方法需要实现什么样的逻辑

### SpringDataJPA
Spring Data JPA是较大的Spring Data系列的一部分，可轻松实现基于JPA的存储库。 该模块处理对基于JPA的数据访问层的增强支持。 它使构建使用数据访问技术的Spring支持的应用程序变得更加容易。实现应用程序的数据访问层已经很长一段时间了。 为了执行简单查询以及执行分页和审核，必须编写太多样板代码。 Spring Data JPA旨在通过将工作量减少到实际需要的数量来显着改善数据访问层的实施。 作为开发人员，您将编写包括自定义finder方法在内的存储库接口，Spring会自动提供实现

### SpringDataRedis
Spring Data Redis是较大的Spring Data系列的一部分，可轻松配置并从Spring应用程序访问Redis。 它提供了与储存交互的低层和高层抽象，使用户摆脱了基础设施的困扰。

