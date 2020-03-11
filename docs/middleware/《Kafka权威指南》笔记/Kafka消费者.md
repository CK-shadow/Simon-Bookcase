---
title: Kafka消费者
tags: 
 - Kafka
 - Consumer
categories: frontEnd
---

## KafkaConsumer概念
### 消费者和消费者群组
Kafka消费者从属于消费者群组。一个群组里的消费者订阅的是同一个主题，每个消费者接收主题一部分分区的消息  
![](../../.vuepress/public/img/202003101931.png)     
往群组里增加消费者是横向伸缩消费能力的主要方式，不过要注意，不要让消费者的数量超过主题分区的数量，多余的消费者只会被闲置

&emsp;  
除了通过增加消费者来横向伸缩单个应用程序外，还经常出现多个应用程序从同一个主题读取数据的情况。实际上，Kafka设计的主要目标之一，就是要让Kafka主题里的数据能够满足企业各种应用场景的需求。在这些场景里，每个应用程序可以获取到所有的消息，而不只是其中的一部分。只要保证每个应用程序有自己的消费者群组，就可以让它们获取到主题所有的消息。不同于传统的消息系统，横向伸缩Kafk 消费者和消费者群组并不会对性能造成负面影响
![](../../.vuepress/public/img/202003101940.png)   
简而言之，为每一个需要获取一个或多个主题全部消息的应用程序创建一个消费者群组，然后往群组里添加消费者来伸缩读取能力和处理能力，群组里的每个消费者只处理一部分消息

### 消费者群组和分区再均衡
分区的所有权从一个消费者转移到另一个消费者，这样的行为被称为再均衡。再均衡非常重要，它为消费者群组带来了高可用性和伸缩性（我们可以放心地添加或移除消费者），不过在正常情况下，我们并不希望发生这样的行为。在再均衡期间，消费者无法读取消息，造成整个群组一小段时间的不可用。另外，当分区被重新分配给另一个消费者时，消费者当前的读取状态会丢失，它有可能还需要去刷新缓存，在它重新恢复状态之前会拖慢 应用程序

&emsp;  
消费者通过向被指派为群组协调器的broker（不同的群组可以有不同的协调器）发送心跳来维持它们和群组的从属关系以及它们对分区的所有权关系。只要消费者以正常的时间间隔发送心跳，就被认为是活跃的，说明它还在读取分区里的消息。消费者会在轮询消息（为了获取消息）或提交偏移量时发送心跳。如果消费者停止发送心跳的时间足够长，会话就会过期，群组协调器认为它已经死亡，就会触发一次再均衡

&emsp;  
如果一个消费者发生崩溃，并停止读取消息，群组协调器会等待几秒钟，确认它死亡了才会触发再均衡。在这几秒钟时间里，死掉的消费者不会读取分区里的消息。在清理消费者时，消费者会通知协调器它将要离开群组，协调器会立即触发一次再均衡，尽量降低处理停顿

## 创建Kafka消费者
```java
Properties props = new Properties();
// 指定kafka集群的连接字符串
props.put("bootstrap.servers", "broker1:9092, broker2:9092");
// 指定消费者属于哪个集群，非必需，但是基本上都会指定
props.put("group.id", "CountryCounter");
// 指定反序列化器
props.put("key.serializer", "org.apache.kafka.common.serialization.StringDeserializer");
props.put("value.serializer", "org.apache.kafka.common.serialization.StringDeserializer");

KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(props);
```

## 订阅主题
创建好消费者之后，下一步可以开始订阅主题了。 subscribe()方法接受一个主题列表作为参数:
```java
consumer.subscribe(Collections.singletonList("consumerCountries"));
```
我们也可以在调用subscribe()方法时传入一个正则表达式。正则表达式可以匹配多个主题， 如果有人创建了新的主题，并且主题的名字与正则表达式匹配，那么会立即触发一次再均衡，消费者就可以读取新添加的主题。如果应用程序需要读取多个主题，并且可以处理不同类型的数据，那么这种订阅方式就很管用。在Kafka和其他系统之间复制数据时 使用正则表达式的方式订阅多个主题是很常见的做法

&emsp;  
要订阅所有与test相关的主题，可以这样做：
```java
consumer.subscribe("test.*");
```

## 轮询
消息轮询是消费者API的核心，通过一个简单的轮询向服务器请求数据。一旦消费者订阅了主题，轮询就会处理所有的细节，包括群组协调、分区再均衡、发送心跳和获取数据，开发者只需要使用一组简单的API来处理从分区返回的数据。消费者代码的主要部分如下所示：
```java
try {
    // 消费者实际上是一个长期运行的应用程序,它通过持续轮询向Kafka请求数据
    while (true) {
        // 消费者必须持续对Kafka进行轮询，否则会被认为己经死亡，它的分区会被移交给群组里的
        // 其他消费者
        // 传给poll()方法的参数是一个超时时间，用于控制 poll()方法的阻塞时间
        ConsumerRecords<String, String> records = consumer.poll(100);
        //  poll()方法返回一个记录列表。每条记录都包含了记录所属主题的信息、记录所在分区的
        // 信息、记录在分区里的偏移量，以及记录的键值对
        for (ConsumerRecord<String, String> record : records) {
            int updateCount = 1;
            if (custCountryMap.countainsValue(record.value())) {
                updateCount = custCountryMap.get(record.value()) + 1;
            }
            custCountryMap.put(record.value(), updatedCount);

            JSONObject json = new JSONObject(custCountryMap);
            System.out.println(json.toString(4));
        }
    }
} finally {
    consumer.close();
}
```
轮询不只是获取数据那么简单。在第一次调用新消费者的poll()方法时，它会负责查找GroupCoordinator，然后加入群组，接受分配的分区。 如果发生了再均衡，整个过程也是在轮询期间进行的。当然，心跳也是从轮询里发迭出去的。所以，我们要确保在轮询期间所做的任何处理工作都应该尽快完成