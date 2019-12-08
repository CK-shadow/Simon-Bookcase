module.exports = {
    plugins: ['@vuepress/back-to-top'],
    '@vuepress/back-to-top': true,
    title: 'Simon的书柜', 
    description: 'Simon的书柜', // meta 中的描述文字，意义不大，SEO用
    // 注入到当前页面的 HTML <head> 中的标签
    head: [
        // 增加一个自定义的 favicon(网页标签的图标)
        // 这里的 '/' 指向 docs/.vuepress/public 文件目录 
        // 即 docs/.vuepress/public/img/geass-bg.ico
        ['link', { rel: 'icon', href: '/img/geass-bg.ico' }], 
    ],
    base: '/Simon-Bookcase/', // 这是部署到github相关的配置
    markdown: {
        lineNumbers: true // 代码块显示行号
    },
    theme: 'reco',
    themeConfig: {
        sidebarDepth: 1, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated' ,// 文档更新时间：每个文件git最后提交的时间,
        // 顶部导航栏
        nav:[
            { text: '计算机基础', link: '/computer/首页' }, 
            { text: 'Java', link: '/java/首页' },
            { text: 'Python', link: '/Python/首页' },
            { text: '数据库', link: '/database/首页' },
            { text: '技术博客', link: '' },
            { text: '随笔', link: '' },
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
                {title: '图解HTTP--阅读笔记',children: [['/computer/《图解HTTP》笔记/了解Web及网络基础','了解Web及网络基础'],['/computer/《图解HTTP》笔记/简单的HTTP协议','简单的HTTP协议'],['/computer/《图解HTTP》笔记/HTTP报文内的HTTP信息','HTTP报文内的HTTP信息'],['/computer/《图解HTTP》笔记/返回结果的HTTP状态码','返回结果的HTTP状态码'],['/computer/《图解HTTP》笔记/与HTTP协作的Web服务器','与HTTP协作的Web服务器'],['/computer/《图解HTTP》笔记/HTTP首部','HTTP首部'],['/computer/《图解HTTP》笔记/确保Web安全的HTTPS协议','确保Web安全的HTTPS协议'],['/computer/《图解HTTP》笔记/确保访问用户身份的认证','确保访问用户身份的认证'],['/computer/《图解HTTP》笔记/基于HTTP的功能追加协议','基于HTTP的功能追加协议'],['/computer/《图解HTTP》笔记/Web攻击技术','Web攻击技术'],]}
           ],
           '/java/': [
            ['/java/首页','首页'],
            {
                title: 'Java并发编程实践--阅读笔记',
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
            {
                title: 'Maven教程',
                children:[
                    ['/java/Maven教程/Maven简介','Maven简介'],
                    ['/java/Maven教程/Maven-POM','Maven-POM'],
                    ['/java/Maven教程/Maven构建声明周期','Maven构建声明周期'],
                    ['/java/Maven教程/Maven仓库','Maven仓库'],
                    ['/java/Maven教程/Maven插件','Maven插件'],
                    ['/java/Maven教程/快照','快照'],
                    ['/java/Maven教程/Maven依赖管理','Maven依赖管理'],
                ]
            },
            {title: '码出高效--阅读笔记',children: [['/java/《码出高效》笔记/编码规约','编码规约'],['/java/《码出高效》笔记/异常日志','异常日志'],['/java/《码出高效》笔记/单元测试','单元测试'],['/java/《码出高效》笔记/安全规约','安全规约'],['/java/《码出高效》笔记/MySQL数据库','MySQL数据库'],['/java/《码出高效》笔记/工程结构','工程结构'],['/java/《码出高效》笔记/设计规约','设计规约'],]},
           ],
           '/python/':[
            ['/python/首页','首页'],
            {title: '自学笔记',children:[['/python/自学笔记/了解Python','了解Python'],['/python/自学笔记/基本运算符','基本运算符'],['/python/自学笔记/字符串','字符串'],['/python/自学笔记/字符串格式化与while循环','字符串格式化与while循环'],['/python/自学笔记/for循环与list','for循环与list'],['/python/自学笔记/list高级','list高级'],['/python/自学笔记/元组和字典','元组和字典'],['/python/自学笔记/Set和函数','Set和函数'],['/python/自学笔记/传参和变量','传参和变量'],['/python/自学笔记/装饰器和模块','装饰器和模块'],['/python/自学笔记/模块和包','模块和包'],['/python/自学笔记/异常','异常'],['/python/自学笔记/迭代器-生成器和字节','迭代器、生成器和字节'],['/python/自学笔记/File','File'],['/python/自学笔记/面向对象','面向对象'],['/python/自学笔记/类','类'],['/python/自学笔记/类的特征','类的特征'],['/python/自学笔记/与类相关','与类相关'],['/python/自学笔记/了解网络基础','了解网络基础'],['/python/自学笔记/UDP协议','UDP协议'],['/python/自学笔记/IO','IO'],['/python/自学笔记/IO多路复用','IO多路复用'],['/python/自学笔记/进程','进程'],['/python/自学笔记/线程','线程'],['/python/自学笔记/网络通信模型和协程','网络通信模型和协程'],['/python/自学笔记/初识Flask','初识Flask'],['/python/自学笔记/模板','模板'],['/python/自学笔记/Flask中的请求与响应','Flask中的请求与响应'],['/python/自学笔记/模型','模型'],['/python/自学笔记/基于Flask的CRUD','基于Flask的CRUD'],['/python/自学笔记/关系映射','关系映射'],['/python/自学笔记/Python爬虫','Python爬虫'],]},
            ],
           '/database/':[
               ['/database/首页','首页'],
               {title: 'MongoDB基础教程',children:[['/database/MongoDB基础教程/NoSQL简介','NoSQL简介'], ['/database/MongoDB基础教程/MongoDB简介','MongoDB简介'], ['/database/MongoDB基础教程/基本操作指令','基本操作指令'], ['/database/MongoDB基础教程/CRUD','CRUD'],['/database/MongoDB基础教程/查询','查询'],['/database/MongoDB基础教程/基本函数','基本函数'],['/database/MongoDB基础教程/高级函数','高级函数'],]},
               {title: 'Redis基础教程',children:[['/database/Redis基础教程/数据操作','数据操作'],['/database/Redis基础教程/高级操作','高级操作'],]},
            ]
       },
    }
 }