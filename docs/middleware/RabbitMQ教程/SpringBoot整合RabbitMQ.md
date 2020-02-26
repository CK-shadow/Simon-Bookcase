---
title: Spring整合RabbitMQ
tags: 
 - RabbitMQ
 - SpringBoot
categories: frontEnd
---

::: tip
本教程使用代码创建队列和交换机，如果是使用控制台创建和绑定关系，则不需要该操作
:::

## 统一配置
### 添加依赖
```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-amqp</artifactId>
</dependency>
```

### 添加配置文件
```properties
spring.application.name=spirng-boot-rabbitmq
spring.rabbitmq.host=127.0.0.1
spring.rabbitmq.port=5672
spring.rabbitmq.username=admin
spring.rabbitmq.password=admin
```

## 简单队列
### 配置队列
```java
@Configuration
public class RabbitConfig {
    @Bean
    public Queue queue() {
        return new Queue("queue_simple");
    }
}
```

### 生产者
```java
@Component
public class SimpleSender {
    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void send() {
        String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());//24小时制
        String context = "Simple " + date;
        System.out.println("Sender : " + context);
        //简单对列的情况下routingKey即为Q名
        this.rabbitTemplate.convertAndSend("queue_simple", context);
    }
}
```

### 消费者
```java
@Component
@RabbitListener(queues = "queue_simple")
public class HelloReceiver {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("Receiver  : " + hello);
    }
}
```

## Work模式
### 生产者
```java
@Component
public class WorkSender {
    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void send() {
        String date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());//24小时制
        String context = "Simple " + date;
        System.out.println("Sender : " + context);
        //简单对列的情况下routingKey即为Q名
        this.rabbitTemplate.convertAndSend("queue_simple", context);
    }
}
```

### 消费者
```java
@Component
@RabbitListener(queues = "queue_simple")
public class WorkReceiverOne {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("ReceiverOne  : " + hello);
    }

}
```
```java
@Component
@RabbitListener(queues = "queue_simple")
public class WorkReceiverTwo {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("ReceiverTwo  : " + hello);
    }

}
```

## 订阅模型
### 配置队列
```java
@Configuration
public class FanoutRabbitConfig {

    @Bean
    public Queue aMessage() {
        return new Queue("queue_fanout_A");
    }

    @Bean
    public Queue bMessage() {
        return new Queue("queue_fanout_B");
    }

    @Bean
    FanoutExchange fanoutExchange() {
        return new FanoutExchange("mybootfanoutExchange");
    }

    @Bean
    Binding bindingExchangeA(Queue aMessage, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(aMessage).to(fanoutExchange);
    }

    @Bean
    Binding bindingExchangeB(Queue bMessage, FanoutExchange fanoutExchange) {
        return BindingBuilder.bind(bMessage).to(fanoutExchange);
    }
}
```

### 生产者
```java
@Component
public class MsgSenderFanout {

    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void send() {
        String context = "hi, fanout msg ";
        System.out.println("Sender : " + context);
        this.rabbitTemplate.convertAndSend("fanoutExchange","", context);
    }
}
```

### 消费者
```java
@Component
@RabbitListener(queues = "queue_fanout_A")
public class ReceiverA {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("AReceiver  : " + hello + "/n");
    }
}
```
```java
@Component
@RabbitListener(queues = "queue_fanout_B")
public class ReceiverA {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("BReceiver  : " + hello + "/n");
    }
}
```

## 主题模型
### 配置队列
```java
@Configuration
public class TopicRabbitConfig {

    final static String message = "queue_topic_message";
    final static String messages = "queue_topic_messages";

    @Bean
    public Queue queueMessage() {
        return new Queue(TopicRabbitConfig.message);
    }

    @Bean
    public Queue queueMessages() {
        return new Queue(TopicRabbitConfig.messages);
    }

    /**
     * 声明一个Topic类型的交换机
     * @return
     */
    @Bean
    TopicExchange exchange() {
        return new TopicExchange("bootexchange");
    }

    /**
     * 绑定Q到交换机,并且指定routingKey
     * @param queueMessage
     * @param exchange
     * @return
     */
    @Bean
    Binding bindingExchangeMessage(Queue queueMessage, TopicExchange exchange) {
        return BindingBuilder.bind(queueMessage).to(exchange).with("topic.message");
    }

    @Bean
    Binding bindingExchangeMessages(Queue queueMessages, TopicExchange exchange) {
        return BindingBuilder.bind(queueMessages).to(exchange).with("topic.#");
    }
}
```

### 生产者
```java
@Component
public class TopicSender {

    @Autowired
    private AmqpTemplate rabbitTemplate;

    public void sendOne() {
        String context = "hi, i am message 1";
        System.out.println("Sender : " + context);
        this.rabbitTemplate.convertAndSend("bootexchange", "topic.message", context);
    }


    public void sendTwo() {
        String context = "hi, i am messages 2";
        System.out.println("Sender : " + context);
        this.rabbitTemplate.convertAndSend("bootexchange", "topic.messages", context);
    }
}
```

### 消费者
```java
@Component
@RabbitListener(queues = "queue_topic_message")
public class ReceiverOne {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("ReceiverOne : " + hello);
    }
}
```
```java
@Component
@RabbitListener(queues = "queue_topic_messages")
public class ReceiverTwo {

    @RabbitHandler
    public void process(String hello) {
        System.out.println("ReceiverTwo : " + hello);
    }
}
```