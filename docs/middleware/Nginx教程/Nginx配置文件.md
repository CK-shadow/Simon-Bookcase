---
title: Nginx的安装
tags: 
 - Nginx
categories: frontEnd
---

### Nginx的配置文件
**nginx配置文件位置**  
/usr/local/nginx/conf/nginx.conf

### nginx配置文件组成
1. 第一部分：全局块
   * 从配置文件开始到events块之间的内容，主要会设置一些影响nginx服务器整体运行的配置命令，主要包括配置nginx服务器的用户（组）允许生成的woker process数、进程PID存放路径、日志存放路径和类型以及配置文件的引入等。比如：worker_process 1;这是nginx服务器并发处理服务的关键配置，值越大，可以支持的并发处理量也就越多，但是会收到硬件、软件等设备的限制
        
2. 第二部分：events块
   * events块涉及的指令主要影响nginx服务器与用户的网络连接，常用的设置包括是否开启对多work process下的网络连接进行序列化，是否允许同事接收多个网络连接，选取哪种事件驱动模型来处理连接请求，每个work process可以同时支持的最大连接数等
        
3. 第三部分：http块（http块可以分为http全局块和server块）
   * http全局块
     * http全局块配置的指令包括文件引入、MIME-TYPE定义，日志自定义、连接超时时间、单链接请求数上限等
   * server块
     * 这块与虚拟主机有着密切关系，虚拟主机从用户角度看，和一台独立的硬件主机完全是一样的，该技术的产生是为了节省互联网服务器硬件成本每个http块可以包含多个server块，而每个server块就相当于一个虚拟主机而每个server块也可以分为全局server块，同时也可以包含多个location块全局server块
     * 最常见的配置是本虚拟主机的监听配置和本虚拟主机的名称或IP配置
   * location块
     * 一个server块可以配置多个location块
     * 这块的主要作用是基于nginx服务器接收到的请求字符串，对虚拟主机名称之外的字符串进行匹配，对特定的请求进行处理，地址定向、数据缓存和应答控制等功能，还有许多第三方模块的配置也在这里进行
                    
