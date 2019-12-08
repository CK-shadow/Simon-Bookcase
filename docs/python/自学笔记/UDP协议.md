---
title: UDP协议
tags: 
 - UDP
categories: frontEnd
---

 ### 网络概念
服务端 localhost / 127.0.0.1  
客户端 只在本机启动客户端，用127.0.0.1访问
    
服务端 0.0.0.0  
客户端 可以在本机用127.0.0.1、本机IP访问，局域网内用172.60.50.181访问
    
服务端 172.60.50.181  
客户端 局域网内用172.60.50.181访问
    
### TCP套接字传输特点
1. tcp连接中当一端退出，另一端如果阻塞在recv，则recv会立即返回一个空字符串
2. tcp连接中如果另一端已经不存在，再试图使用send向其发送内容时会出现BrokenPipeError
3. 网络收发缓冲区
   * 缓冲区有效协调了消息的收发速度
   * send，recv实际上是向缓冲区收发消息，当缓冲区不为空的时候recv就不会阻塞
4. 粘包问题
   * 原因：tcp以字节流方式传输数据，没有消息边界，多次发送的内容如果一次接收就会形成粘包
   * 影响：如果每次发送的内容是需要独立解析的含义，此时粘包会对消息的解析产生影响
   * 处理：1）人为添加消息边界&emsp;2）控制发送速度
        
### UDP套接字编程
**服务端流程** 
```python
client_socket = socket(AF_INET,SOCK_DGRAM)

绑定地址
client_socket.bind(address)

收发消息
data, address = client_socket.recvfrom(buffersize)
功能：接收UDP消息
参数：每次最多接收多少字节内容
返回值：data 收到的信息        address 消息发送方地址

n = client_socket.sendto(data, address)
功能：发送UDP消息
参数：data 发送的消息内容，bytes格式        address 目标地址

关闭套接字
client_socket.close()
```
        
**客户端流程**  
* 创建UDP套接字
* 收发消息
* 关闭套接字
        
**UDP套接字和TCP套接字的编程区别**  
1. 流式套接字以字节流方式传输数据，数据报套接字以数据包方式传输数据
2. TCP套接字会有粘包问题，UDP套接字有消息边界，因此不会有粘包问题
3. TCP套接字保证消息的完整性，UDP不保证
4. TCP套接字依赖listen、accept建立连接才能完成收发，UDP不需要
5. TCP使用recv、send收发消息，UDP使用recvfrom、sendto
        
### socket模块方法和socket套接字属性
**部分socket模块方法**
```python
获取计算机名
    socket.gethostname()
通过主机名获取ip地址
    socket.gethostbyname("www.baidu.com")
通过服务名获取监听端口
    socket.getservbyname(""mysql)
将ip地址转换为字节串
    socket.inet_aton("192.168.1.2")
将字节串转换为ip
    socket.inet_ntoa("b"\xc0\xa8")
```
            
**套接字属性**
* socket.family&emsp;地址类型
* socket.type&emsp;套接字类型
* socket.getsockname()&emsp;获取套接字绑定地址
* socket.fileon()&emsp;获取文件描述符
  * 文件描述符：系统种每一个IO操作都会分配一个整数作为编号，该整数即这个IO的文件描述符
  * 特点：每个IO的文件描述符不会重复
* socket.getpeername()    获取连接套接字客户端地址
* socket.setsockopt(level, option, value)    设置套接字选项
  * 参数：level&nbsp;选项类别&emsp;option&nbsp;具体选项内容&emsp;value&nbsp;选项值
            
 ### UDP套接字广播
广播定义：一端发送，多端接收  
广播地址：每个网段内的最大地址，向该地址发送则网段内所有的主机都能接收    

