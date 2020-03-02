---
title: 安装Kafka
tags: 
 - Kafka
categories: frontEnd
---

## 安装Zookeeper
### 单机服务
安装目录为/usr/local/zookeeper, 数据目录为/var/lib/zookeeper
```
tar -zxf zookeeper-3.4.6.tar.gz
mv zookeeper-3.4.6 /usr/local/zookeeper
mkdir -p /usr/local/zookeeper/conf/zoo.cfg << EOF
> tickTime = 2000
> dataDir = /var/lib/zookeeper
> clientPort = 2181
> EOF
export JAVA_HOME = /usr/java/jdk1.8.0_51
/usr/local/zookeeper/binzkServer.sh start
```
现在可以连到Zookeeper端口上，通过发送四字命令srvr来验证Zookeeper是否安装正确

### Zookeeper群组（Ensemble）
Zookeeper集群被称为群组。Zookeeper使用的是一致性协议，所以建议每个群组里应该包含奇数个节点，因为只有当群组里的大多数节点（也就是法定人数）处于可用状态，Zookeeper才能处理外部的请求。也就是说，如果你有一个包含3个节点的群组，那么它允许1个节点失效。如果群组包含5个节点，那么它允许2个节点失效

&emsp;  
**群组节点个数的选择**  
假设有一个包含5个节点的群组，如果要对群组做一些包括更换节点在内的配置更改，需要依次重启每一个节点。如果你的群组无法容忍多个节点失 效，那么在进行群组维护时就会存在风险。不过，也不建议一个群组包含超过7个节点，因 Zookeeper使用了一致性协议，节点过多会降低整个群组的性能

&emsp;  
群组需要有一些公共配置，上面列出了所有服务器的清单，并且每个服务器还要在数据目录中创建一个 myid文件，用于指明自己的ID。如果群组里服务器的机器名是zoo1.example.com、zoo2.example.com、 zoo3.example.com，那么配置文件可能是这样的：
```
tickTime = 2000
dataDir = /var/lib/zookeeper
clientPort = 2181
initLimit = 20 # 从节点与主节点之间建立连接的时间上限， 这么写的值为20*tickTime
syncLimit = 5 # 从节点与主节点之间处于不同状态的时间上限，这么写的值为5*tickTime
server.1 = zoo1.example.com
server.2 = zoo2.example.com
server.3 = zoo3.example.com
```
配置里还列出了群组中所有服务器的地址。服务器地址遵循server.X=hostname:peerPort:leaderPort格式，各个参数说明如下： 
* X：服务器的ID，它必须是一个整数，不过不一定要从0开始，也不要求是连续的
* hostname：服务器的机器名或IP地址
* peerPort：用于节点间通信的TCP端口
* leaderPort：用于首领选举的TCP端口

客户端只需要通过clientPort就能连接到群组，而群组节点间的通信则需要同时用到这3个端口（peerPort、 leaderPort、 clientPort）。除了公共的配置文件外，每个服务器都必须在dataDir目录中创建一个叫作myid的文件，文件里要包含服务器ID，这个ID要与配置文件里配置的ID保持一致。完成这些步骤后，就可以启动服务器，让它们彼此间进行通信了
