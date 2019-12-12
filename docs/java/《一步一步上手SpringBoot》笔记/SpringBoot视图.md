---
title: SpringBoot视图
tags: 
 - SpringBoot
categories: frontEnd
---


### SpringBoot视图
由于SpringBoot建议使用jar的方式发布web程序，所以不建议使用jsp视图，也不对jsp视图做默认支持，如果确实要使用jsp视图发布SpringBoot应用，那么使用war的方式打包

SpringBoot默认自动配置支持视图是以下的模板引擎：
* FreeMaker
* Thymeleaf
* Groovy
* Mustache
        
**FreeMaker模板引擎配置流程**  
1. 导入freemaker相关依赖
2. SpringBoot的模板引擎的默认路径是resource/templates，所以在resource下创建一个templates文件夹，把视图页面放在里面
3. 这样SpringBoot就支持直接返回freemaker的ftl视图了
4. 根据需要可以配置文件中修改freemaker视图的默认属性
::: tip
注意：application.properties中可以定义的freemaker的属性比ReeMakerProperties中定义的属性多，因为SpringBoot直接引用了FreeMaker框架原来内部定义的属性，只是在前面加一个前缀，所以导致一些没有默认值的属性不在FreeMakerPreoperties类中
::: 
          
**Thymeleaf模板引擎配置流程**  
配置流程与FreeMaker模板引擎配置流程相似
::: tip
注意：Thymeleaf模板引擎一定要引入xmlns:th="http://www.thymeleaf.org命名空间
:::
   
    
    
    