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

### 安装Kafka Broker
将Kafka安装在/usr/local/kafka目录下，使用之前配置好的Zookeeper，并把消息日志保存在/tmp/kafka-logs目录下
```
tar -zxf kafka_2.11-0.9.0.1.tgz
mv kafka_2.11-0.9.0.1 /usr/local/kafka
mkdir /tmp/kafka-logs
export JAVA_HOME = /usr/java/jdk1.8.0_51
/usr/local/kafka/bin/kafka-server-start.sh -daemon /usr/local/kafka/config/server.properties
```

## broker配置
### 常规配置
1. broker.id  
每个broker都需要有一个标识符，使用broker.id来表示。它的默认值是0，也可以被设置成其他任意整数。这个值在整 Kafka集群里必须是唯一的。这个值可以任意选定，如果出于维护的需要，可以在服务器节点间交换使用这些ID。建议把它们设置成与机器名具有相关性的整数，这样在进行维护时，将ID号映射到机器名就没那么麻烦了 

2. port  
如果使用配置样本来启动Kafka，它会监听9092端口。修改port配置参数可以把它设置成其他任意可用的端口。要注意，如果使用1024以下的端口，需要使用root权限启动 Kafka，不过不建议这么做

3. zookeeper.connect  
用于保存broker元数据的Zookeeper地址是通过zookeeper.connect来指定的。localhost:2181表示这 Zookeeper是运行在本地的2181端口上。该配置参数是用冒号分隔的一组hostname:port/path列表，每一部分的含义如下：
   * hostname是Zookeeper服务器的机器名或IP地址
   * port是Zookeeper的客户端连接端口
   * /path是可选的Zookeeper路径，作为Kafka集群的chroot环境。如果不指定，默认使用根路径 

4. log.dirs  
Kafka把所有消息都保存在磁盘上，存放这些日志片段的目录是通过log.dirs指定的。它是一组用逗号分隔的本地文件系统路径。如果指定了多个路径，那么broker会根据“最少使用”原则，把同一个分区的日志片段保存到同一个路径下。要注意，broker会往拥有最少数目分区的路径新增分区，而不是往拥有最小磁盘空间的路径新增分区

5. number.recovery.threads.per.data.dir  
对于如下3种情况，Kafka会使用可配置的钱程池来处理日志片段：
   * 服务器正常启动，用于打开每个分区的日志片段
   * 服务器崩溃后重启，用于检查和截短每个分区的日志片段
   * 服务器正常关闭，用于关闭日志片段
默认情况下，每个日志目录只使用一个线程。因为这些线程只是在服务器启动和关闭时会用到，所以完全可以设置大量的线程来达到井行操作的目的。特别是对于包含大量分区的服务器来说，一旦发生崩溃，在进行恢复时使用并行操作可能会省下数小时的时间。设置此参数时需要注意，所配置的数字对应的是log.dirs指定的单个日志目录。也就是说，如果 number.recovery.threads.per.data.dir被设为8，并且log.dir指定了3个路径，那么总共需要24个线程

6. auto.create.topics.enable  
默认情况下，Kafka会在如下几种情形下自动创建主题： 
   * 当一个生产者开始往主题写入消息时
   * 当一个消费者开始从主题读取消息时
   * 当任意一个客户端开始向主题发送元数据请求时
很多时候，这些行为都是非预期的。而且，根据Kafka协议，如果一个主题不先被创建，根本无法知道它是否已经存在。如果显式地创建主题，不管是手动创建还是通过其他配置系统来创建，都可以把auto.create.topics.enable设为false

### 主题的默认配置
Kafka为新创建的主题提供了很多默认配置参数。可以通过管理工具为每个主题单独配置一部分参数，比如分区个数和数据保留策略。服务器提供的默认配置 可以作为基准，它们适用于大部分主题

1. num.partitions  
num.partitions参数指定了新创建的主题将包含多少个分区。如果启用了主题自动创建功能（该功能默认是启用的），主题分区的个数就是该参数指定的值。该参数的默认值是l。 要注意，我们可以增加主题分区的个数，但不能减少分区的个数。所以，如果耍让一个主题的分区个数少于num.partitions指定的值，需要手动创建该主题

2. log.retentions.ms  
Kafka通常根据时间来决定数据可以被保留多久。默认使用log.retentions.hours参数来配置时间，默认值为168小时，也就是一周。除此以外，还有其他两个参数log.retentions.minutes和log.retentions.ms，不过还是推荐使用log.retentions.ms。如果指定了不止一个参数，Kafka会优先使用具有最小值的那个参数

3. log.retentions.bytes  
另一种方式是通过保留的消息字节数来判断消息是否过期。它的值通过参数log.retentions.bytes来指定，作用在每一个分区上。也就是说，如果有一个包含8个分区的主题，并且log.retentions.bytes被设为lGB，那么这个主题最多可以保留8GB的数据。所以，当主题的分区个数增加时，整个主题可以保留的数据也随之增加

4. log.segment.bytes  
以上的设置都作用在日志片段上，而不是作用在单个消息上。当消息到达broker时，它们被迫加到分区的当前日志片段上。当日志片段大小达到 log.segment.bytes指定的上限 （默认是 lGB ）时，当前日志片段就会被关闭，一个新的日志片段被打开。如果一个日志片段被关闭，就开始等待过期。这个参数的值越小，就会越频繁地关闭和分配新文件，从 而降低磁盘写入的整体效率

5. log.segment.ms  
另一个可以控制日志片段关闭时间的参数是log.segment.ms，它指定了多长时间之后日志片段会被关闭。就像log.retention.bytes 和log.retention.ms这两个参数一样，log.segment.bytes和log.segment.ms这两个参数之间也不存在互斥问题。日志片段会在大小或时间达到上限时被关闭，就看哪个条件先得到满足。默认情况下，log.segment.ms没有设定值，所以只根据大小来关闭日志片段

6. message.max.bytes  
broker通过设置message.max.bytes参数来限制单个消息的大小，默认值是l000000，也就是 lMB。如果生产者尝试发送的消息超过这个大小，不仅消息不会被接收，还会收到broker返回的错误信息。跟其他与字节相关的配置参数一样，该参数指的是压缩后的消息大小，也就是说，只要压缩后的消息小于message.max.bytes指定的值，消息的实际大小可以远大于这个值





