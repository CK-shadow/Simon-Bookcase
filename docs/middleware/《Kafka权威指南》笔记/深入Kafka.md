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

