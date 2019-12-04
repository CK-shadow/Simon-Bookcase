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
        sidebarDepth: 4, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated' ,// 文档更新时间：每个文件git最后提交的时间,
        // 顶部导航栏
        nav:[
             // 单项 text：显示文字，link：指向链接
             // 这里的'/' 指的是 docs文件夹路径
             // [以 '/' 结尾的默认指向该路径下README.md文件]
            { text: '计算机基础', link: '/computer/首页' },  // http://localhost:8080/Wiki1001Pro/FAQ/
            { text: 'Java', link: '/java/首页' },
            { text: 'Python', link: '/Thought/' },
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
            {title: '码出高效--阅读笔记',children: [['/java/《码出高效》笔记/编码规约','编码规约'],['/java/《码出高效》笔记/异常日志','异常日志'],['/java/《码出高效》笔记/单元测试','单元测试'],['/java/《码出高效》笔记/安全规约','安全规约'],['/java/《码出高效》笔记/MySQL数据库','MySQL数据库'],['/java/《码出高效》笔记/工程结构','工程结构'],['/java/《码出高效》笔记/设计规约','设计规约'],]},
           ],
           '/database/':[
               ['/database/首页','首页'],
               {
                   title: 'MongoDB基础教程',
                   children:
                   [
                    ['/database/MongoDB基础教程/NoSQL简介','NoSQL简介'], 
                    ['/database/MongoDB基础教程/MongoDB简介','MongoDB简介'], 
                    ['/database/MongoDB基础教程/基本操作指令','基本操作指令'], 
                    ['/database/MongoDB基础教程/CRUD','CRUD'],
                    ['/database/MongoDB基础教程/查询','查询'],
                    ['/database/MongoDB基础教程/基本函数','基本函数'],
                    ['/database/MongoDB基础教程/高级函数','高级函数'],
                   ]
               }
            ]
       },
    }
 }