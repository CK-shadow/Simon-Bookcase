---
title: 深入Kafka
tags: 
 - Kafka
categories: frontEnd
---

## 集群成员关系
Kafka使用Zookeeper来维护集群成员的信息。每个broker都有一个唯一标识符，这个标识符可以在配置文件里指定，也可以自动生成。在broker启动的时候，它通过创建临时节点把自己的ID注册到Zookeeper。Kafka组件订阅Zookeeper的/brokers/ids路径 (broker在Zookeeper上的注册路径），当有broker加入集群或退出集群时，这些组件就可以获得通知

&emsp;  
如果你要启动另一个具有相同ID的broker，会得到一个错误--新broker会试着进行注册，但不会成功，因为Zookeeper里已经有一个具有相同ID的 broker

&emsp;  
在broker停机、出现网络分区或长时间垃圾回收停顿时，broker会从Zookeeper上断开连接，此时broke在启动时创建的临时节点会自动从 Zookeeper上移除。监听broker列表的Kafka组件会被告知该broker已移除

&emsp;  
在关闭broker时，它对应的节点也会消失，不过它的ID会继续存在于其他数据结构中。例如，主题的副本列表里就可能包含这些ID。在完全关闭一个broker之后，如果使用相同的ID启动另一个全新的broker，它会立即加入集群，并拥有与旧broker相同的分区和主题

## 控制器
控制器其实就是一个broker，只不过它除了具有一般broker的功能之外，还负责分区首领的选举。集群里第一个启动的broker通过在Zookeeper里创建一个临时节点/controller让自己成为控制器。其他broker在启动时也会尝试创建这个节点，不过它们会收到一个"节点已存在"的异常，然后"意识"到控制器节点已存在，也就是说集群里已经有一个控制器了。其他broker在控制器节点上创建Zookeeper watch对象，这样它们就可以收到这个节点的变更通知。这种方式可以确保集群里一次只有一个控制器存在

&emsp;  
如果控制器被关闭或者与Zookeeper断开连接，Zookeeper上的临时节点就会消失。集群里的其他broker通过watch对象得到控制器节点消失的通知，它们会尝试让自己成为新的控制器。第一个在Zookeeper里成功创建控制器节点的broker就会成为新的控制器，其他 点会收到"节点已存在"的异常，然后在新的控制器节点上再次创建watch对象。每个新选出的控制器通过Zookeeper的条件递增操作获得一个全新的、数值更大的controller epoch。其他broker在知道当前controller epoch后，如果收到由控制器发出的包含较 epoch的消息，就会忽略它们

&emsp;  
当控制器发现一个broker已经离开集群它就知道，那些失去首领的分区需要一个新首领（这些分区的首领刚好是在这个broker上）。控制器遍历这些分区，并确定谁应该成为新首领（简单来说就是分区副本列表里的下一个副本），然后向所有包含新首领或现有跟随者的broker发送请求。该请求消息包含了谁是新首领以及谁是分区跟随者的信息。随后，新首领开始处理来自生产者和消费者的请求，而跟随者开始从新首领那里复制消息

&emsp;  
当控制器发现一个broker加入集群时，它会使用broker ID来检查新加入的broker是否包含现有分区的副本。如果有，控制器就把变更通知发送给新加入的broker和其他broker, 新broker上的副本开始从首领那里复制消息

&emsp;  
简而言之，Kafka使用Zookeeper的临时节点来选举控制器，并在节点加入集群或退出集群时通知控制器。控制器负责在节点加入或离开集群时进行分区首领选举。控制器使用epoch来避免"脑裂"


