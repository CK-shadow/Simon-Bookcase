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

## 消费者的配置
1. fetch.min.bytes  
该属性指定了消费者从服务器获取记录的最小字节数。broker在收到消费者的数据请求时，如果可用的数据量小于fetch.min.bytes指定的大小，那么它会等到有足够的可用数据时才把它返回给消费者

2. fetch.max.wait.ms  
fetch.max.wait.ms则用于指定broker的等待时间，默认是500ms。如果没有足够的数据流入Kafka，消费者获取最小数据量的要求就得不到满足，最终导致500ms的延迟

3. max.partition.fetch.bytes  
该属性指定了服务器从每个分区里返回给消费者的最大字节数。它的默认值是lMB，也就是说，KafkaConsumer.poll()方法从每个分区里返回的记录最多不超过max.partition.fetch.bytes指定的字节数

4. session.timeout.ms  
该属性指定了消费者在被认为死亡之前可以与服务器断开连接的时间，默认是3s。如果消费者没有在session.timeout.ms指定的时间内发送心跳给群组协调器，就被认为已经死亡，协调器就会触发再均衡，把它的分区分配给群组里的其他消费者

5. auto.offset.reset  
该属性指定了消费者在读取一个没有偏移量的分区或者偏移量无效的情况下（因消费者长时间失效，包含偏移量的记录已经过时并被删除）该作何处理。它的默认值是latest，意思是说，在偏移量无效的情况下，消费者将从最新的记录开始读取数据（在消费者启动之后生成的记录）。另一个值是earliest，意思是说，在偏移量无效的情况下，消费者将从起始位置读取分区的记录

6. enable.auto.commit  
该属性指定了消费者是否自动提交偏移量，默认值是true。为了尽量避免出现重复数据和数据丢失，可以把它设为false，由自己控制何时提交偏移量。如果把它设为true，还可以通过配置auto.commit.interval.ms属性来控制提交的频率

7. client.id  
该属性可以是任意字符串，broker用它来标识从客户端发送过来的消息，通常被用在日志、度量指标和配额里

8. max.poll.records  
该属性用于控制单次调用call()方法能够返回的记录数量，可以帮你控制在轮询里需要处理的数据量

9. receive.buffer.bytes和send.buffer.bytes  
socket在读写数据时用到的TCP缓冲区也可以设置大小。如果它们被设为－1，就使用操作系统的默认值。如果生产者或消费者与broker处于不同的数据中心内，可以适当增大这些值，因为跨数据中心的网络一般都有比较高的延迟和比较低的带宽

## 提交和偏移量
每次调用poll()方法，它总是返回由生产者写入Kafka但还没有被消费者读取过的记录。Kafka不会像其他JMS队列那样需要得到消费者的确认，这是Kafka的一个独特之处。相反，消费者可以使用Kafka来追踪消息在分区里的位置（偏移量）。我们把更新分区当前位置的操作叫作提交

&emsp;  
消费者往一个叫作_consumer_offset的特殊主题发送消息，消息里包含每个分区的偏移量。如果消费者一直处于运行状态，那么偏移量就没有什么用处。不过，如果消费者发生崩溃或者有新的消费者加入群组，就会触发再均衡，完成再均衡之后，每个消费者可能分配到新的分区，而不是之前处理的那个。为了能够继续之前的工作，消费者需要读取每个分区最后一次提交的偏移量，然后从偏移量指定的地方继续处理。 如果提交的偏移量小于客户端处理的最后一个消息的偏移量，那么处于两个偏移量之间的 消息就会被重复处理。如果提交的偏移量大于客户端处理的最后一个消息的偏移量，那么处于两个偏移量之间的消息将会丢失

### 自动提交
最简单的提交方式是让消费者自动提交偏移量。如果enable.auto.commit被设为true，那么每过5s，消费者会自动把从poll()方法接收到的最大偏移量提交上去。提交时间间 由auto.commit.interval.ms控制，默认值是5s。与消费者里的其他东西一样，自动提交也是在轮询里进行的。消费者每次在进行轮询时会检查是否该提交偏移量了，如果是，那么就会提交从上一次轮询返回的偏移量

### 提交当前偏移量
开发者可以在必要的时候提交当前偏移量，而不是基于时间间隔。 把auto.commit.offset设为false，让应用程序决定何时提交偏移量。使用commitSync()交偏移量最简单也最可靠。这个API会提交由poll()方法返回的最新偏移量，提交成功后马上返回，如果提交失败就抛出异常
```java
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(100);
    for (Consumer<String, String> record : records) {
        System.out.println(record);
    }
    try {
        consumer.commitSync();
    } catch (CommitFailedException e) {
        log.error("Error Happend");
    }
}
```

### 异步提交
手动提交有一个不足之处，在broker对提交请求作出回应之前，应用程序会一直阻塞，这样会限制应用程序的吞吐量。我们可以通过降低提交频率来提升吞吐量，但如果发生了再均衡，会增加重复消息的数量。这个时候可以使用异步提交API。我们只管发送提交请求，无需等待broker的响应
```java
Consumer.commitAsync();
```
在成功提交或碰到无怯恢复的错误之前，Consumer.commitSync()会一直重试，但是Consumer.commitAsync()不会，这也是Consumer.commitAsync()不好的一个地方。它之所以不进行重试，是因为在它收到服务器响应的时候，可能有一个更大的偏移量已经提交成功

### 同步和异步组合提交
一般情况下，针对偶尔出现的提交失败，不进行重试不会有太大问题，因为如果提交失败是因为临时问题导致的，那么后续的提交总会有成功的。但如果这是发生在关闭消费者或再均衡前的最后一次提交，就要确保能够提交成功。 因此，在消费者关闭前一般会组合使用Consumer.commitAsync()和Consumer.commitSync()。它们的工作原理如下：
```java
try {
    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(100);
        for (Consumer<String, String> record : records) {
            System.out.println(record);
        }
        // 如果一切正常，使用异步提交，这样就算这次失败了，下次提交也会成功
        consumer.commitAsync();
    }
} catch (Exception e) {
    log.error("Error Happend");
} finally {
    try {
        // 如果要关闭消费者，那就没有下一次了，这时就使用同步提交
        consumer.commitSync();
    } finally {
        consumer.close();
    }
}
```

### 提交特定的偏移量
如果poll()方法返回一大批数据，为了避免因再均衡引起的重复处理整批消息，想要在批 次中间提交偏移量，这时无法通过调用consumer.commitAsync()或consumer.commitSync()来实现，因为它们只会提交最后一个偏移量，而此时该批次里的消息还没有处理完。幸运的是，消费者 API允许在调用consumer.commitSync()和consumer.commitAsync()方法时传进去希望提交的分区和偏移量的map
```java
// 用于跟踪偏移量的map
private Map<TopicPartition, OffsetAndMetadata> currentOffsets = new HashMap<>();
int count = 0;
...
while (true) {
    ConsumerRecords<String, String> records = consumer.poll(100);
    for (Consumer<String, String> record : records) {
        System.out.println(record);
        // 在读取每条记录之后，使用期望处理的下一个消息的偏移量更新map里的偏移量
        currentOffsets.put(new TopicPartition(record.topic(), record.partition()
            , new OffsetAndMetadata(record.offset()+1, "no metadata"));
        // 没处理1000条消息就提交一次
        if (count % 1000 = 0) {
            consumer.commitAsync(currentOffsets, null);
        }
        count++;
    }
}
```

## 再均衡监听器
消费者在退出和进行分区再均衡之前，会做一些清理工作。会在消费者失去对一个分区的所有权之前提交最后一个已处理记录的偏移量。如果消费 者准备了一个缓冲区用于处理偶发的事件，那么在失去分区所有权之前，需要处理在缓冲区累积下来的记录。可能还需要关闭文件句柄、数据库连接等

&emsp;  
在为消费者分配新分区或移除旧分区时，可以通过消费者API执行一些应用程序代码，在调用subcribe()方法时传进去一个ConsumerRebalanceListener实例就可以了。ConsumerRebalanceListener有两个需要实现的方法  
 * public void onPartitionRevoked(Collection《TopicPartition》 partitions)会在再均衡开始之前和消费者停止读取消息之后被调用。如果在这里提交偏移量，下一个接管分区的消费者就知道该从哪里开始读取了。 
 * public void onPartitionAssigned(Collection《TopicPartition》 partitions)方法会在重新分配分区之后和消费者开始读取消息之前被调用

&emsp;  
下面的例子将演示如何在失去分区所有权之前通过onPartitionRevoked()方法来提交偏移量
```java
private Map<TopicPartition, OffsetAndMetadata> currentOffsets = new HashMap<>();

// 实现ConsumerRebalanceListener接口
private class HandleRebalance implements ConsumerRebalanceListener {
    // 在获得新分区后开始读取消息，不需要做其它事情
    public void onPartitionsAssigned(Collection<TopicPartition> Parritions){}

    public void onPartitionRevoked(Collection<TopicPartition> Partitions) {
        // 如果发生再均衡，我们要在即将失去分区所有权时提交偏移量
        // 要注意，提交的是最近处理过的偏移量，而不是批次中还在处理的最后一个偏移量
        consumer.commitSync(currentOffsets);
    }

    try {
        // 把ConsumerRebalanceListener对象传给subscribe()方法
        consumer.subcribe(topics, new HandleRebalance());

        while (true) {
            ConsumerRecords<String, String> records = consumer.poll(100);
            for (ConsumerRecords<String, String> record : records) {
                currentOffsets.put(new TopicPartition(record.topic(), record.partition()
                    ,new OffsetAndMetadata(record.offset()+1, "no metadata"));
            }
            consumer.commitAsync(currentOffsets, null);
        }
    } catch (WakeupException e) {
        // 忽略异常，正在关闭消费者
    } catch (Exception e) {
        log.error("Error Happend");
    } finall {
        try {
            consumer.commitSync(currentOffsets);
        } finally {
            consumer.close();
        }
    }
}
```

## 从特定偏移量处开始处理记录
如果你想从分区的起始位置开始读取消息，或者直接跳到分区的末尾开始读取消息，可以使用seekToBeginning(Collection《TopicParrition》 tp)和seekToEnd(Collection《TopicParrition》 tp） 这两个方方法。不过，Kafka也为我们提供了用于查找特定偏移量的API。它有很多用途，比如向后回退几个消息或者向前跳过几个消息

&emsp;  
如果希望保存记录和偏移量可以在一个原子操作里完成。记录和偏移量要么都被成功提交，要么都不提交。如果记录是保存在数据库里而偏移量是提交到Kafka上，那么就无法实现原子操作。我们可以将偏移量和记录都保存在数据库里，然后使用seek()方法读取偏移量
```java
public class SaveOffsetOnRebalance implements ConsumerRebalanceListener {
    public void onPartitionsRevoked(Collection<TopicPartition> Partitions) {
        // 处理完记录之后，使用事务将记录和偏移量插入数据库
        commitDBTransaction();
    }

    public void onPartitionsAssigned(Collection<TopicPartition> Partitions) {
        for (TopicPartition Partition : Partitions) {
            // 在分配到新分区的时候，从数据库获取偏移量，使用seek()方法定位
            consumer.seek(Partition, getOffsetFromDB(Partition));
        }
    }
}

consumer.subcribe(topics, new SaveOffsetOnRebalance(consumer));
consumer.poll(0);

for (TopicPartition Partition : Partitions) {
    // 新加入消费者，订阅主题后，定位偏移量
    consumer.seek(Partition, getOffsetFromDB(Partition));
}

while (true) {
    ConsumerRecords<String, String> records = consumer.poll(100);
    for (ConsumerRecords<String, String> record : records) {
        processRecord(record);
        storeRecordInDB(record);
        storeOffsetInDB(record.topic(), record.Partition(), record.offset());
    }
    // 一次性提交多个记录和偏移量
    commitDBTransaction();
}
```
通过把偏移量和记录保存到同一个外部系统来实现单次语义可以有很多种方式，不过它们都需要结合使用ConsumerRebalanceListener和seek()方法来确保能够及时保存偏移量，并保证消费者总是能够从正确的位置开始读取消息

## 如何退出
如果确定要退出循环，需要通过另一个线程调用consumer.wakeup()方法。如果循环运行在主线程里，可以在ShutdownHook里调用该方法。要记住，consumer.wakeup()是消费者唯一一个可以从其他线程里安全调用的方法。调用consumer.wakeup()可以退出poll() , 并抛出consumer.WakeupException异常，或者如果调用consumer.wakeup()时线程没有等待轮询，那么异常将在下一轮调用poll()时抛出。我们不需要处理 WakeupException，因为它只是用于跳出循环的一种方式。不过，在退出线程之前调用consumer.close()是很有必要的，它会提交任何还没有提交的东西，并向群组协调器发送消息，告知自己要离开群组，接下来就会触发再均衡，而不需要等待会话超时
```java
Runtime.getRuntime().addShutdownHook(new Thread {
    public void run() {
        System.out.println("Starting Exiting");
        // 退出循环最安全的方法只能是wakeup方法
        consumer.wakeup();
        try {
            mainThread.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
});

...

try {
    // 循环，直到按下Ctrl+C，关闭的钩子会在退出时进行清理
    while (true) {
        ConsumerRecords<String, String> records = consumer.poll(1000);
        for (ConsumerRecords<String, String> record : records) {
            System.out.println(record.toString());
        }
        for (TopicPartition tp : consumer.assignment()) {
            movingAvg.consumer.commitAsync();
        }
    } catch (WakeupException e) {
        // 在另一个线程里调用wakeup方法，因此poll时会抛出异常
    } finally {
        consumer.close();
    }
}
```

## 独立消费者
如果只需要一个消费者从一个主题的所有分区或者某个特定的分区读取数据。这个时候就不需要消费者群组和再均衡了，只需要把主题或者分区分配给消费者，然后开始读取消息井提交偏移量。如果是这样的话，就不需要订阅主题，取而代之的是为自己分配分区。一个消费者可以订阅主题（并加入消费者群组），或者为自己分配分区， 但不能同时做这两件事情
```java
List<PartitionInfo> PartitionInfos = null;
// 向集群请求主题可用的分区，如果要读取特定的分区，可忽略这一步
partitionInfos = consumer.PartiotionsFor("topic");

if (PartitionInfos != null) {
    for (PartitionInfo partition : partitionInfos) {
        partitions.add(new TopicPartition(partition.topic(), partition.partition()));
    }
    // 确定需要调用的分区之后，调用assign方法
    consumer.assign(partitions);

    while (true) {
        ConsumerRecord<String, String> records = consumer.poll(1000);
        for (ConsumerRecords<String, String> record : records) {
            System.out.println(record.toString());
        }
        consumer.commitSync();
    }
}
```
除了不会发生再均衡，也不需要手动查找分区，其他的看起来一切正常。不过要记住，如果主题增加了新的分区，消费者并不会收到通知。所以，要么周期性地调用consumer.PartiotionsFor()方法来检查是否有新分区加入，要么在添加新分区后重启应用程序