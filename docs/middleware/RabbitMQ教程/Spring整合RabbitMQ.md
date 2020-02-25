---
title: Spring整合RabbitMQ
tags: 
 - RabbitMQ
 - Spring
categories: frontEnd
---

### 导入相关依赖
```xml
<!-- RabbitMQ -->
<dependency>
    <groupId>com.rabbitmq</groupId>
    <artifactId>amqp-client</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.amqp</groupId>
    <artifactId>spring-rabbit</artifactId>
</dependency>
```

### 队列与交换机的绑定关系
**方案一：**
在配置文件中将队列和交换机完成绑定  
**方案二：**
在管理界面中完成绑定  

&emsp;  
使用方案一，绑定关系如果发生变化，需要修改配置文件，并且服务需要重启，但是重新部署服务器则不需要额外操作  
使用方案二，管理更加灵活，更容易对绑定关系的权限管理，流程管理，但是需要额外操作

&emsp;  
开发中一般使用第二种方案

### 添加FastJson转换类
```java
public class FastJsonMessageConverter  extends AbstractJsonMessageConverter {

    private static Log log = LogFactory.getLog(FastJsonMessageConverter.class);

    private static ClassMapper classMapper = new DefaultClassMapper();

    public FastJsonMessageConverter() {
        super();
    }

    @Override
    protected Message createMessage(Object object, MessageProperties messageProperties) {
        byte[] bytes = null;
        try {
            String jsonString = JSON.toJSONString(object);
            bytes = jsonString.getBytes(getDefaultCharset());
        } catch (IOException e) {
            throw new MessageConversionException("Failed to convert Message content", e);
        }
        messageProperties.setContentType(MessageProperties.CONTENT_TYPE_JSON);
        messageProperties.setContentEncoding(getDefaultCharset());
        if (bytes != null) {
            messageProperties.setContentLength(bytes.length);
        }
        classMapper.fromClass(object.getClass(), messageProperties);
        return new Message(bytes, messageProperties);
    }

    @Override
    public Object fromMessage(Message message) throws MessageConversionException {
        Object content = null;
        MessageProperties properties = message.getMessageProperties();
        if (properties != null) {
            String contentType = properties.getContentType();
            if (contentType != null && contentType.contains("json")) {
                String encoding = properties.getContentEncoding();
                if (encoding == null) {
                    encoding = getDefaultCharset();
                }
                try {
                    Class<?> targetClass = getClassMapper().toClass(
                        message.getMessageProperties());
                    content = convertBytesToObject(message.getBody()
                        , encoding, targetClass);
                } catch (IOException e) {
                    throw new MessageConversionException
                        ("Failed to convert Message content", e);
                }
            } else {
                log.warn("Could not convert incoming message with content-type [" 
                    + contentType + "]");
            }
        }
        if (content == null) {
            content = message.getBody();
        }
        return content;
    }

    private Object convertBytesToObject(byte[] body
        , String encoding, Class<?> clazz)
            throws UnsupportedEncodingException {
        String contentAsString = new String(body, encoding);
        return JSON.parseObject(contentAsString, clazz);
    }
}
```

### 配置文件amqp-application.xml
```xml
<description>rabbitmq 连接服务配置</description>

<!-- 连接配置 -->
<rabbit:connection-factory id="connectionFactory" host="${rabbit.hosts}" 
    username="${rabbit.username}" password="${rabbit.password}" port="${rabbit.port}" 
    virtual-host="${rabbit.virtualHost}"/>
<rabbit:admin connection-factory="connectionFactory"/>

<!-- spring amqp默认的是jackson 的一个插件,目的将生产者生产的数据转换为json存入消息队列
，由于fastjson的速度快于jackson,这里替换为fastjson的一个实现 -->
<bean id="jsonMessageConverter"  class="www.hrabbit.cn.util.FastJsonMessageConverter">
</bean>

<!-- spring template声明-->
<rabbit:template exchange="koms" id="amqpTemplate"  
    connection-factory="connectionFactory" 
    message-converter="jsonMessageConverter"/>

<!-- durable:是否持久化
     exclusive: 仅创建者可以使用的私有队列，断开后自动删除
     auto_delete: 当所有消费客户端连接断开后，是否自动删除队列-->

<!--  申明一个消息队列Queue   -->
<rabbit:queue id="test-topic" name="test-topic" durable="true" 
auto-delete="false" exclusive="false" />
<!--rabbit:direct-exchange：定义exchange模式为direct，意思就是消息与一个特定的路由键
完全匹配，才会转发。
rabbit:binding：设置消息queue匹配的key-->
<!-- 交换机定义 -->
<rabbit:direct-exchange name="koms" durable="true" auto-delete="false" id="koms">
    <rabbit:bindings>
        <rabbit:binding queue="order" key="order"/>
    </rabbit:bindings>
</rabbit:direct-exchange>

<!--
    queues：监听的队列，多个的话用逗号（,）分隔
    ref：监听器
-->
<bean class="com.demo.MessageListener" id="messageListener"></bean>
<!-- 配置监听  acknowledeg = "manual"   设置手动应答  
当消息处理失败时:会一直重发  直到消息处理成功 -->
<rabbit:listener-container connection-factory="connectionFactory" acknowledge="manual">
    <!-- 配置监听器 -->
    <rabbit:listener queues="order" ref="messageListener"/>
</rabbit:listener-container>
```

### 生产者
```java
@Service("spittleService")
public class SpittleServiceImpl implements SpittleService {
    @Resource
    private AmqpTemplate amqpTemplate;

    public Map<String,Object> spittleMsg(){

        Map<String,Object> dataList = new LinkedHashMap<>();

        for (int i=0;i<10;i++){
            dataList.put("order","msgResult:"+i);
            amqpTemplate.convertAndSend("order","msgResult:"+i);
        }
        return dataList;
    }
}
```

### 消费者
```java
@Component
public class MessageListener implements ChannelAwareMessageListener {

    private Logger logger= LoggerFactory.getLogger(MessageListener.class);

    @Transactional
    @Override
    public void onMessage(Message message, Channel channel) throws Exception {
        //业务处理，放到action层，并返回处理成功还是异常的flag
        //boolean mqFlag=rabbitMaConsumerTaskAction.saveMq(arg0);
        //还有一个点就是如何获取mq消息的报文部分message？
        String result=new String(message.getBody(),"UTF-8");
        System.out.println("消息:"+result);
        if(true){
            basicACK(message,channel);//处理正常--ack
        }else{
            basicNACK(message,channel);//处理异常--nack
        }
    }


    //正常消费掉后通知mq服务器移除此条mq
    private void basicACK(Message message,Channel channel){
        try{
            channel.basicAck(message.getMessageProperties().getDeliveryTag(),false);
        }catch(IOException e){
            logger.error("通知服务器移除mq时异常，异常信息："+e);
        }
    }
    //处理异常，mq重回队列
    private void basicNACK(Message message,Channel channel) {
        try {
            channel.basicNack(message.getMessageProperties().getDeliveryTag()
                , false, true);
        } catch (IOException e) {
            logger.error("mq重新进入服务器时出现异常，异常信息：" + e);
        }
    }
}

```