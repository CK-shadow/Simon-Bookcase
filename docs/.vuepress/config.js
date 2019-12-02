module.exports = {
    title: 'Simon的书柜', // 页签标题 : A001_VuePress博客搭建的简单教程&问题分析 # | Wiki 1001
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
    themeConfig: {
        sidebarDepth: 4, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
        lastUpdated: 'Last Updated' ,// 文档更新时间：每个文件git最后提交的时间,
        // 顶部导航栏
        nav:[
             // 单项 text：显示文字，link：指向链接
             // 这里的'/' 指的是 docs文件夹路径
             // [以 '/' 结尾的默认指向该路径下README.md文件]
            { text: '计算机基础', link: '/computer/' },  // http://localhost:8080/Wiki1001Pro/FAQ/
            { text: 'Java', link: '/Store/' },
            { text: 'Python', link: '/Thought/' },
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
            // 打开FAQ主页链接时生成下面这个菜单
           '/computer/':[
               //多级菜单形式
               {
                // 菜单名
                title: 'Linux基础',
                // 子菜单
                children: [
                    // ['','']=>[路径,标题]
                    // 或者写成 '路径',标题自动识别为该地址的文件中的h1标题
                    // 不以 '/' 结尾的就是指向.md文件             
                    ['/computer/Linux基础/指令与选项','指令与选项'],
                    ['/computer/Linux基础/基础指令','基础指令'],
                    ['/computer/Linux基础/进阶指令','进阶指令'],
                    ['/computer/Linux基础/高级指令','高级指令']
                ]
                },
                {
                    title: 'HTTP简介',
                    children: [
                        ['/computer/HTTP简介/Web访问中的角色与协议','Web访问中的角色与协议'],
                        ['/computer/HTTP简介/HTTP协议','HTTP协议'],
                        ['/computer/HTTP简介/HTTP版本','HTTP版本'],
                        ['/computer/HTTP简介/HTTP协议组成','HTTP协议组成'],
                        ['/computer/HTTP简介/状态码','状态码'],
                        ['/computer/HTTP简介/GET与POST请求','GET与POST请求'],
                    ]
                    },
               {
                   // 菜单名
                   title: '消化堆',
                   // 子菜单
                   children: [
                       // ['','']=>[路径,标题]
                       // 或者写成 '路径',标题自动识别为该地址的文件中的h1标题
                       // 不以 '/' 结尾的就是指向.md文件             
                       ['/computer/DigestionHeap/Digested','消化过'], // '/FAQ/DigestionHeap/Digested.md'文件
                       ['/computer/DigestionHeap/Digesting','消化中'],
                       ['/computer/DigestionHeap/DigestWill','待消化']
                   ]
               },
               {
                   title: '输出层',
                   children: [
                       ['/computer/Console/A001','#A001_VuePress'],
                       ['/computer/Console/A002','#A002_插件清单']
                   ]
               },
               ['/computer/','百科首页'],
               ['/computer/Pool/SkillStack','技术栈'],
               ['/computer/Pool/Review','归去来']
           ],
            // 打开Thought主页链接时生成下面这个菜单
           '/Thought/':[
               ['/Thought/','随笔首页'],
               {
                   title: '游记',
                   children: [
                       ['/Thought/Travels/beiPing','北平游记'],
                   ]
               },
               {
                   title: '年终回顾',
                   children: [
                      ['/Thought/YearReview/2018','2018年'],
                      ['/Thought/YearReview/2019','2019年']
                   ]
               },
           ],
             // 打开Store主页链接时生成下面这个菜单
           '/Store/': [
               ['','仓库首页'],
               {
                   title: '应用',
                   children: [
                       ['/Store/Apps/DownDoors', '下载门户'],
                       ['/Store/Apps/OwnTest', '博主测评']
                   ]
               },
               {
                   title: '电影',
                   children: [
                       ['/Store/Films/','收藏级电影']
                   ]
               },
               {
                   title: '动画',
                   children: [
                       ['/Store/Anime/','收藏级动画']
                   ]
               },
           ]
       },
    }
 }