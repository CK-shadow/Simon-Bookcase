---
title: Kafka生产者
tags: 
 - Kafka
 - Producer
categories: frontEnd
---

## 生产者概览
![](../../.vuepress/public/img/202003051526.png) 

我们从创建一个ProducerRecord对象开始，ProducerRecord对象需要包含目标主题和要发送的内容。我们还可以指定键或分区。在发送ProducerRecord对象时，生产者要先把键和值对象序列化成字节数组，这样它们才能够在网络上传输

&emsp;  
接下来，数据被传给分区器。如果之前在ProducerRecord对象里指定了分区，那么分区器就不会再做任何事情，直接把指定的分区返回。如果没有指定分区，那么分区器会根据ProducerRecord对象的键来选择一个分区。选好分区以后，生产者就知道该往哪个主题和分区发送这条记录了。紧接着，这条记录被添加到一个记录批次里，这个批次里的所有消息会被发送到相同的主题和分区上。有一个独立的线程负责把这些记录批次发送到相应的broker上

&emsp;  
服务器在收到这些消息时会返回一个响应。如果消息成功写入Kafka，就返回一个RecordMetaData对象，它包含了主题和分区信息，以及记录在分区里的偏移量。如果写入失败，则会返回一个错误。生产者在收到错误之后会尝试重新发送消息，几次之后如果还是失败，就返回错误信息

## 创建Kafka生产者
要往Kafka写入消息，首先要创建一个生产者对象，并设置一些属性。Kafka生产者有3个必选的属性：
* bootstrap.servers  
  该属性指定broker的地址清单，地址的格式 host:port。清单里不需要包含所有的broker地址，生产者会从给定的broker里查找到其他 broker的信息。不过建议至少要提供两个broker的信息，一且其中一个宕机，生产者仍然能够连接到集群上

* key.seriable  
  broker希望接收到的消息的键和值都是字节数组。生产者接口允许使用参数化类型，因此可以把Java对象作为键和值发送给broker。这样的代码具有良好的可读性，不过生产者需要知道如何把这些Java对象转换成字节数组。key.seriable必须被设置为一个实现了org.apache.kafka.common.serialization.Serializer接口的类，生产者会使用这个类把键对象序列化成字节数组。Kafka客户端默认提供了ByteArraySerilizer（这个只做很少的事情）、 StringSerilizer和 IntegerSerilizer，因此，如果你只使用常见的几种Java对象类型，那么就没必要实现自己的序列化器。要注意，key.seriable是必须设置的，就算你打算只发送值内容

* value.serilizer  
  与key.serilizer一样，value.serilizer指定的类会将值序列化。如果键和值都是字符串，可以使用与key.serilizer一样的序列化器。如果键是整数类型而值是字符串 ，那么需要使用不同的序列化器

&emsp;  
以下代码片段演示了如何创建一个新的生产者，这里只指定了必要的属性，其它的使用默认配置
```java
// 新建一个Properties对象
private Properties kafkaProps = new Properties();
kafkaProps.put("bootstrap.servers", "broker1:9092, broker2:9092");
// 打算把key和value定义成String类型，所以使用内置的StringSerilizer
kafkaProps.put("key.serilizer", "org.apache.kafka.common.serialization.StringSerilizer");
kafkaProps.put("value.serilizer", "org.apache.kafka.common.serialization.StringSerilizer");
// 新建一个生产者对象
producer = new KafkaProducer<String, String>(kafkaProps);
```

&emsp;  
实例化生产者对象后，接下来就可以开始发送消息了。发送消息主要有以下3种方式:
* 发送并忘记（fire-and-forget)   
  我们把消息发送给服务器，但并不关心它是否正常到达。大多数情况下，消息会正常到达，因为Kafka是高可用的，而且生产者会自动尝试重发。不过，使用这种方式有时候 也会丢失一些消息
* 同步发送  
  我们使用send()方怯发送消息，它会返回一个Future对象，调用get()方法进行等待，就可以知道消息是否发送成功
* 异步发送  
  我们调用send()方怯，并指定一个回调函数，服务器在返回响应时调用该函数

&emsp;  
本章的所有例子都使用单线程，但其实生产者是可以使用多线程来发送消息的。刚开始的时候可以使用单个消费者和单个线程。如果需要更高的吞吐量，可以在生产者数量不变的前提下增加线程数量。如果这样做还不够，可以增加生产者数量


