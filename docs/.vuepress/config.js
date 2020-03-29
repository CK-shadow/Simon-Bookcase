module.exports = {
    base : '',
    title: 'Simon的书柜', 
    description: 'Simon的书柜', // meta 中的描述文字，意义不大，SEO用
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        // 增加一个自定义的 favicon(网页标签的图标)
        // 这里的 '/' 指向 docs/.vuepress/public 文件目录 
        // 即 docs/.vuepress/public/img/geass-bg.ico
        ['link', { rel: 'icon', href: '/img/geass-bg.ico' }], 
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    theme: 'reco',
    themeConfig: {
        //type: 'blog',
        sidebarDepth: 1, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated' ,// 文档更新时间：每个文件git最后提交的时间,
        // 顶部导航栏
        nav:[
            { text: '计算机基础', link: '/computer/首页' }, 
            { text: 'Java', link: '/java/首页' },
            { text: 'Python', link: '/Python/首页' },
            { text: '中间件', link: '/middleware/首页'},
            { text: '数据库', link: '/database/首页' },
            { text: '前端', link: '/frontend/首页' },
            { text: '技术博客', link: '' },
            { text: '随笔', link: '/essay/' },
            {
                text: 'GitHub',
                items: [
                    { text: 'GitHub首页', link: 'https://github.com/Mulander-J' }
                ]
            },
        ],
        sidebar:{
            // 打开computer主页链接时生成下面这个菜单
           '/computer/':[
                ['/computer/首页','首页'],
                {title: 'Linux基础',children: [['/computer/Linux基础/指令与选项','指令与选项'],['/computer/Linux基础/基础指令','基础指令'],['/computer/Linux基础/进阶指令','进阶指令'],['/computer/Linux基础/高级指令','高级指令']]},
                {title: 'HTTP简介',children: [['/computer/HTTP简介/Web访问中的角色与协议','Web访问中的角色与协议'],['/computer/HTTP简介/HTTP协议','HTTP协议'],['/computer/HTTP简介/HTTP版本','HTTP版本'],['/computer/HTTP简介/HTTP协议组成','HTTP协议组成'],['/computer/HTTP简介/状态码','状态码'],['/computer/HTTP简介/GET与POST请求','GET与POST请求'],]},
                {title: '图解TCPIP--阅读笔记',children: [['/computer/《图解TCPIP》笔记/网络基础知识','网络基础知识'],['/computer/《图解TCPIP》笔记/TCPIP基础知识','TCPIP基础知识'],['/computer/《图解TCPIP》笔记/数据链路','数据链路'],['/computer/《图解TCPIP》笔记/IP协议','IP协议'],['/computer/《图解TCPIP》笔记/IP协议相关技术','IP协议相关技术'],['/computer/《图解TCPIP》笔记/TCP和UDP','TCP和UDP'],['/computer/《图解TCPIP》笔记/路由协议','路由协议'],['/computer/《图解TCPIP》笔记/应用协议','应用协议'],['/computer/《图解TCPIP》笔记/网络安全','网络安全'],]},
                {title: '图解HTTP--阅读笔记',children: [['/computer/《图解HTTP》笔记/了解Web及网络基础','了解Web及网络基础'],['/computer/《图解HTTP》笔记/简单的HTTP协议','简单的HTTP协议'],['/computer/《图解HTTP》笔记/HTTP报文内的HTTP信息','HTTP报文内的HTTP信息'],['/computer/《图解HTTP》笔记/返回结果的HTTP状态码','返回结果的HTTP状态码'],['/computer/《图解HTTP》笔记/与HTTP协作的Web服务器','与HTTP协作的Web服务器'],['/computer/《图解HTTP》笔记/HTTP首部','HTTP首部'],['/computer/《图解HTTP》笔记/确保Web安全的HTTPS协议','确保Web安全的HTTPS协议'],['/computer/《图解HTTP》笔记/确保访问用户身份的认证','确保访问用户身份的认证'],['/computer/《图解HTTP》笔记/基于HTTP的功能追加协议','基于HTTP的功能追加协议'],['/computer/《图解HTTP》笔记/Web攻击技术','Web攻击技术'],]},
                {
                    title: '设计模式',
                    children: 
                        [
                        ['/computer/设计模式/设计模式简介','设计模式简介'],
                        ['/computer/设计模式/策略模式','策略模式'],
                        ['/computer/设计模式/观察者模式','观察者模式'],
                        ]
                },
            ],
           '/java/': [
            ['/java/首页','首页'],
            {
                title: '《Java并发编程实践》--笔记',
                children: 
                    [
                    ['/java/《Java并发编程实践》笔记/线程安全性','线程安全性'],
                    ['/java/《Java并发编程实践》笔记/对象的共享','对象的共享'],
                    ['/java/《Java并发编程实践》笔记/对象的组合','对象的组合'],
                    //['/java/《码出高效》笔记/安全规约','安全规约'],
                    //['/java/《码出高效》笔记/MySQL数据库','MySQL数据库'],
                    //['/java/《码出高效》笔记/工程结构','工程结构'],
                    //['/java/《码出高效》笔记/设计规约','设计规约'],
                    ]
            },
            {title: 'Shiro教程',children:[['/java/Shiro教程/Shiro简介','Shiro简介'],['/java/Shiro教程/Shiro身份验证','Shiro身份验证'],['/java/Shiro教程/Shiro授权','Shiro授权'],['/java/Shiro教程/Shiro-Web集成','Shiro-Web集成'],['/java/Shiro教程/Shiro-会话管理','Shiro-会话管理'],['/java/Shiro教程/Shiro-缓存机制','Shiro-缓存机制'],['/java/Shiro教程/Shiro-Spring集成','Shiro-Spring集成'],['/java/Shiro教程/Shiro-RememberMe','Shiro-RememberMe'],['/java/Shiro教程/Shiro-并发登录控制','Shiro-并发登录控制'],]},
            {title: 'Maven教程',children:[['/java/Maven教程/Maven简介','Maven简介'],['/java/Maven教程/Maven-POM','Maven-POM'],['/java/Maven教程/Maven构建声明周期','Maven构建声明周期'],['/java/Maven教程/Maven仓库','Maven仓库'],['/java/Maven教程/Maven插件','Maven插件'],['/java/Maven教程/快照','快照'],['/java/Maven教程/Maven依赖管理','Maven依赖管理'],],},
            {title: '一步一步上手SpringMVC--笔记',children: [['/java/《一步一步上手SpringMVC》笔记/SpringMVC概述','SpringMVC概述'],['/java/《一步一步上手SpringMVC》笔记/入门示例','入门示例'],['/java/《一步一步上手SpringMVC》笔记/映射路径','映射路径'],['/java/《一步一步上手SpringMVC》笔记/数据绑定','数据绑定'],['/java/《一步一步上手SpringMVC》笔记/视图解释器','视图解释器'],['/java/《一步一步上手SpringMVC》笔记/JSON的支持','JSON的支持'],['/java/《一步一步上手SpringMVC》笔记/上传和下载','上传和下载'],]},
            {title: 'SpringData教程',children: [['/java/SpringData教程/JPA相关内容简介','JPA相关内容简介'],['/java/SpringData教程/基于Hibernate的CRUD','基于Hibernate的CRUD'],['/java/SpringData教程/Hibernate高级查询','Hibernate高级查询'],['/java/SpringData教程/基于Hibernate-JPA的CRUD','基于Hibernate-JPA的CRUD'],['/java/SpringData教程/Hibernate-JPA高级查询','Hibernate-JPA高级查询'],['/java/SpringData教程/SpringDataJpa基础','SpringDataJpa基础'],['/java/SpringData教程/Repository接口','Repository接口'],]},
            {title: '一步一步上手SpringBoot--笔记',children:[['/java/《一步一步上手SpringBoot》笔记/SpringBoot概述','SpringBoot概述'],['/java/《一步一步上手SpringBoot》笔记/常用API说明','常用API说明'],['/java/《一步一步上手SpringBoot》笔记/SpringBoot配置流程','SpringBoot配置流程'],['/java/《一步一步上手SpringBoot》笔记/SpringBoot视图','SpringBoot视图'],]},
            {title: '《SpringBoot开发实战》--笔记',children: [['/java/《SpringBoot+Vue全栈开发实战》笔记/SpringBoot简介','SpringBoot简介'],['/java/《SpringBoot+Vue全栈开发实战》笔记/SpringBoot基础配置','SpringBoot基础配置'],['/java/《SpringBoot+Vue全栈开发实战》笔记/SpringBoot整合Web开发','SpringBoot整合Web开发'],['/java/《SpringBoot+Vue全栈开发实战》笔记/SpringBoot整合持久层技术','SpringBoot整合持久层技术'],['/java/《SpringBoot+Vue全栈开发实战》笔记/RESTful和单元测试','RESTful和单元测试'],['/java/《SpringBoot+Vue全栈开发实战》笔记/SpringBoot缓存','SpringBoot缓存'],['/java/《SpringBoot+Vue全栈开发实战》笔记/SpringBoot整合WebSocket','SpringBoot整合WebSocket'],['/java/《SpringBoot+Vue全栈开发实战》笔记/消息服务','消息服务'],['/java/《SpringBoot+Vue全栈开发实战》笔记/邮件发送','邮件发送'],['/java/《SpringBoot+Vue全栈开发实战》笔记/定时任务','定时任务'],['/java/《SpringBoot+Vue全栈开发实战》笔记/批处理','批处理'],['/java/《SpringBoot+Vue全栈开发实战》笔记/Swagger2','Swagger2'],['/java/《SpringBoot+Vue全栈开发实战》笔记/数据校验','数据校验'],['/java/《SpringBoot+Vue全栈开发实战》笔记/应用监控','应用监控'],]},
            {title: '《深入理解SringCloud》--笔记',children: [['/java/《深入理解SpringCloud与微服务构建》笔记/微服务简介','微服务简介'],['/java/《深入理解SpringCloud与微服务构建》笔记/SpringCloud简介','SpringCloud简介'],['/java/《深入理解SpringCloud与微服务构建》笔记/SpringCloud组件对应版本','SpringCloud组件对应版本'],['/java/《深入理解SpringCloud与微服务构建》笔记/服务注册与发现Eureka','服务注册与发现Eureka'],['/java/《深入理解SpringCloud与微服务构建》笔记/负载均衡Ribbon','负载均衡Ribbon'],['/java/《深入理解SpringCloud与微服务构建》笔记/负载均衡Feign','负载均衡Feign'],['/java/《深入理解SpringCloud与微服务构建》笔记/熔断器Hystrix','熔断器Hystrix'],['/java/《深入理解SpringCloud与微服务构建》笔记/路由网关SpringCloudZuul','路由网关SpringCloudZuul'],['/java/《深入理解SpringCloud与微服务构建》笔记/配置中心SpringCloudConfig','配置中心SpringCloudConfig'],['/java/《深入理解SpringCloud与微服务构建》笔记/链路追踪SpringCloudSleuth','链路追踪SpringCloudSleuth'],['/java/《深入理解SpringCloud与微服务构建》笔记/微服务监控SpringBootAdmin','微服务监控SpringBootAdmin'],['/java/《深入理解SpringCloud与微服务构建》笔记/SpringBootSecurity详解','SpringBootSecurity详解'],['/java/《深入理解SpringCloud与微服务构建》笔记/SpringCloudOAuth2详解','SpringCloudOAuth2详解'],['/java/《深入理解SpringCloud与微服务构建》笔记/OAuth2+JWT','OAuth2+JWT'],]},
            {title: '码出高效--阅读笔记',children: [['/java/《码出高效》笔记/编码规约','编码规约'],['/java/《码出高效》笔记/异常日志','异常日志'],['/java/《码出高效》笔记/单元测试','单元测试'],['/java/《码出高效》笔记/安全规约','安全规约'],['/java/《码出高效》笔记/MySQL数据库','MySQL数据库'],['/java/《码出高效》笔记/工程结构','工程结构'],['/java/《码出高效》笔记/设计规约','设计规约'],]},],
           '/python/':[
            ['/python/首页','首页'],
            {title: '自学笔记',children:[['/python/自学笔记/了解Python','了解Python'],['/python/自学笔记/基本运算符','基本运算符'],['/python/自学笔记/字符串','字符串'],['/python/自学笔记/字符串格式化与while循环','字符串格式化与while循环'],['/python/自学笔记/for循环与list','for循环与list'],['/python/自学笔记/list高级','list高级'],['/python/自学笔记/元组和字典','元组和字典'],['/python/自学笔记/Set和函数','Set和函数'],['/python/自学笔记/传参和变量','传参和变量'],['/python/自学笔记/装饰器和模块','装饰器和模块'],['/python/自学笔记/模块和包','模块和包'],['/python/自学笔记/异常','异常'],['/python/自学笔记/迭代器-生成器和字节','迭代器、生成器和字节'],['/python/自学笔记/File','File'],['/python/自学笔记/面向对象','面向对象'],['/python/自学笔记/类','类'],['/python/自学笔记/类的特征','类的特征'],['/python/自学笔记/与类相关','与类相关'],['/python/自学笔记/了解网络基础','了解网络基础'],['/python/自学笔记/UDP协议','UDP协议'],['/python/自学笔记/IO','IO'],['/python/自学笔记/IO多路复用','IO多路复用'],['/python/自学笔记/进程','进程'],['/python/自学笔记/线程','线程'],['/python/自学笔记/网络通信模型和协程','网络通信模型和协程'],['/python/自学笔记/初识Flask','初识Flask'],['/python/自学笔记/模板','模板'],['/python/自学笔记/Flask中的请求与响应','Flask中的请求与响应'],['/python/自学笔记/模型','模型'],['/python/自学笔记/基于Flask的CRUD','基于Flask的CRUD'],['/python/自学笔记/关系映射','关系映射'],['/python/自学笔记/Python爬虫','Python爬虫'],]},
            ],
           '/middleware/':[
            ['/middleware/首页', '首页'],
            {title: '《Kafka权威指南》--笔记',children: [['/middleware/《Kafka权威指南》笔记/初识Kafka','初识Kafka'],['/middleware/《Kafka权威指南》笔记/安装Kafka','安装Kafka'],['/middleware/《Kafka权威指南》笔记/Kafka生产者','Kafka生产者'],['/middleware/《Kafka权威指南》笔记/Kafka消费者','Kafka消费者'],['/middleware/《Kafka权威指南》笔记/深入Kafka','深入Kafka'],['/middleware/《Kafka权威指南》笔记/可靠的数据传递','可靠的数据传递'],['/middleware/《Kafka权威指南》笔记/构建数据管道','构建数据管道'],]},
            {title: 'Nginx教程',children: [['/middleware/Nginx教程/Nginx简介','Nginx简介'],['/middleware/Nginx教程/Nginx的安装','Nginx的安装'],['/middleware/Nginx教程/Nginx常用命令','Nginx常用命令'],['/middleware/Nginx教程/Nginx配置文件','Nginx配置文件'],['/middleware/Nginx教程/Nginx反向代理配置','Nginx反向代理配置'],['/middleware/Nginx教程/Nginx负载均衡配置','Nginx负载均衡配置'],['/middleware/Nginx教程/Nginx动静分离配置','Nginx动静分离配置'],['/middleware/Nginx教程/Nginx高可用配置','Nginx高可用配置'],['/middleware/Nginx教程/Nginx原理','Nginx原理'],]},
            {title: 'RabbitMQ教程',children: [['/middleware/RabbitMQ教程/RabbitMQ简介','RabbitMQ简介'],['/middleware/RabbitMQ教程/安装RabbitMQ','安装RabbitMQ'],['/middleware/RabbitMQ教程/五种队列之简单队列','五种模型之简单队列'],['/middleware/RabbitMQ教程/五种队列之Work模式','五种模型之Work模式'],['/middleware/RabbitMQ教程/五种队列之Fanout','五种模型之订阅模型'],['/middleware/RabbitMQ教程/五种队列之Direct','五种模型之路由模型'],['/middleware/RabbitMQ教程/五种队列之Topic','五种模型之主题模型'],['/middleware/RabbitMQ教程/Spring整合RabbitMQ','Spring整合RabbitMQ'],['/middleware/RabbitMQ教程/SpringBoot整合RabbitMQ','SpringBoot整合RabbitMQ'],]},
        ],
           '/database/':[
            ['/database/首页','首页'],
            {title: 'MongoDB基础教程',children:[['/database/MongoDB基础教程/NoSQL简介','NoSQL简介'], ['/database/MongoDB基础教程/MongoDB简介','MongoDB简介'], ['/database/MongoDB基础教程/基本操作指令','基本操作指令'], ['/database/MongoDB基础教程/CRUD','CRUD'],['/database/MongoDB基础教程/查询','查询'],['/database/MongoDB基础教程/基本函数','基本函数'],['/database/MongoDB基础教程/高级函数','高级函数'],]},
            {title: 'Redis基础教程',children:[['/database/Redis基础教程/数据操作','数据操作'],['/database/Redis基础教程/高级操作','高级操作'],]},
            ],
           '/frontend/':[
            ['/frontend/首页','首页'],
            {title: '《VueJs实战》--笔记',children: [['/frontend/《VueJs实战》笔记/初识VueJs','初识VueJs'],['/frontend/《VueJs实战》笔记/数据绑定和第一个Vue应用','数据绑定和第一个Vue应用'],['/frontend/《VueJs实战》笔记/计算属性','计算属性'],['/frontend/《VueJs实战》笔记/v-bind及class与style绑定','v-bind及class与style绑定'],['/frontend/《VueJs实战》笔记/内置指令','内置指令'],['/frontend/《VueJs实战》笔记/表单与v-model','表单与v-model'],['/frontend/《VueJs实战》笔记/组件详解','组件详解'],['/frontend/《VueJs实战》笔记/自定义指令','自定义指令'],['/frontend/《VueJs实战》笔记/Render函数','Render函数'],['/frontend/《VueJs实战》笔记/使用webpack','使用webpack'],['/frontend/《VueJs实战》笔记/插件','插件'],]},
           ]
       },
    }
 }