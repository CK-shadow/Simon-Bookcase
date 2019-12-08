---
title: IO
tags: 
 - IO
categories: frontEnd
---

### IO
定义：在内存中存在着数据交换的操作即被认为是IO操作
* 和终端交互&emsp;input&emsp;output
* 和磁盘交互&emsp;read&emsp;write
* 和网络交互&emsp;recv&emsp;send
* IO密集型：在程序中存在着大量的IO，而cpu运算较少，耗时长，效率不高
* 计算密集型：在运行中存在着大量的计算操作，IO较少，cpu消耗大，执行速度快
        
**IO模型**  
阻塞IO，非阻塞IO，IO多路复用
    
* 阻塞IO
  * 定义：在执行IO操作时由于不满足某些条件形成的阻塞状态，阻塞IO是IO的默认行为
  * 效率：阻塞IO是一种效率很低的IO，逻辑简单
* 非阻塞IO
  * 定义：通过修改IO的属性行为，使原本阻塞的IO变为非阻塞的状态设置套接字为非阻塞IO
```python
socket.setblocking(bool)
功能：设置套接字为非阻塞IO
参数：True代表套接字IO阻塞，False代表非阻塞

设置超时检测
socket.settimeout(sec)
功能：设置套接字超时时间
参数：超时时间
```
* IO多路复用
  * 定义：同时监控多个IO事件，哪个IO事件准备就绪就执行哪个，由此形成可以处理多个IO的行为，提高IO效率
        
### python实现IO多路复用的方法
```python
select方法
rs,ws,xs=select(rlist, wlist, xlist[, timeout]) 
功能 ：监控多个IO事件，阻塞等待IO发生
参数 ：rlist 列表  存放关注的等待发生的IO事件
       wlist 列表  存放要主动处理的IO事件
       xlist 列表  存入发生异常时要处理的IO
       timeout : 超时时间
返回值 ： rs 列表  rlist 中准备就绪的IO
          ws 列表  wlist 中准备就绪的IO
    	  xs 列表  xlist 中准备就绪的IO
```
::: tip  
* wlist中如果有IO事件，则select会立即返回给ws
* 处理IO事件过程中不要出现死循环等长期占有服务端情况
* IO多路复用消耗资源较少，效率较高
:::
       
