---
title: SpringBoot概述
tags: 
 - SpringBoot
categories: frontEnd
---

### SpringBoot概述
特点  
1. 实现了各种主流框架的快速整合
2. 实现了Spring应用的快速部署，使用Spring开发的Web应用的快速部署
        
涉及Spring框架的纯注解配置类的常用注解如下  
* @Configuration&emsp;声明一个配置类，配置类的作用等同于Spring的配置文件
* @Bean&emsp;将没有声明@Component、@Controller、@Service、@Repository的类加入到bean容器
* @PropertySource&emsp;在Spring配置里读取，增加这个注解，可以使用@Value获取propertires中的内容
* @Value&emsp;获得上下文中，Properties文件的内容
* @ComponentScan&emsp;用于扫描类，创建对象到spring容器中
* @ConditionOnMissingBean&emsp;如果spring容器中已有该类的对象，就不执行创建方法再创建一次
        
入口类使用@SpringBootApplication注解，启动项目时，SpringBoot框架会扫描入口类的同级目录和子目录中的类添加到spring容器中
    
导入devtools相关依赖可实现热加载
    
