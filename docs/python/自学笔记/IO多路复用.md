---
title: IO多路复用
tags: 
 - IO
categories: frontEnd
---


### 基于poll方法的IO多路复用
```python
p = select.poll()
    功能：创建poll对象
    返回值：poll对象

p.register(fd, event)
    功能：注册关注的IO
    参数：fd 要关注的IO    event 关注IO的事件类型
    常用事件：POLLIN 读IO(rlist)    POLLOUT 写IO(wlist)    POLLERR 异常IO(xlist)    
              POLLHUP 断开连接

p.unregister(fd)
    功能：取消对IO的关注
    参数：IO对象或者IO对象的fileno

events = p.poll()
    功能：阻塞等待监控的IO事件发生
    返回值：就续的IO事件
    events格式：[(fileno, event), (), (), ...]
```
        
### epoll实现IO多路复用
**使用方法**
* 基本与poll相同
* 生成对象改为epoll
* 所有事件类型改为EPOLL
    
**epoll特点**
* epoll效率比select poll高
* epoll可以同时监控的IO数量比select poll多
* epoll的触发方式更多（EPOLLET边缘触发）
        
### struct模块使用
原理:将一组数据进行打包，转换为bytes格式发送，或者将一组bytes个数数据转换为python数据类型
    
**接口使用**  
```
st = Struct(fmt)
    功能：生成结构化对象
    参数：fmt定制的数据结构

st.pack(v1, ...)
    功能：将一组数据按指定格式打包转换
    参数：要打包的数据
    返回值：bytes字节串

st.unpack(bytes_data)
    功能：将bytes字节串按格式解析
    参数：bytes字节串
    返回值：解析后的数据元组

struct.pack(fmt, v1, ...)

struct.unpack(fmt, bytes_data)
    可以使用struct模块直接调用pack，unpack，第一个参数直接传入fmt
```

### 本地套接字
功能：本地两个程序之间的数据交换  
通信原理：对一个内存对象进行读写操作，完成两个程序间的数据交互
    
**创建本地套接字**
```python
创建本地套接字
    sockfd = socket(AF_UNIX,SOCK_STREAM)

绑定套接字文件
    sockfd.bind(file)

监听、连接、收发消息
    listen  accept    recv/send
```
            
### 多任务并发编程
意义：充分利用计算机资源，同时处理多个任务，提高程序的运行效率
    
并行和并发
* 并行：多个任务利用计算机多核资源在同时执行，此时多个任务间是并行关系
* 并发：同时处理多个任务，内核在任务间不断地切换达到很多任务都被同时处理的效果，实际每时每刻只有一个在执行
    
实现方法  
&emsp;多进程，多线程
        
