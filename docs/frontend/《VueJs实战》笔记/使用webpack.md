---
title: 使用webpack
tags: 
 - Vue.js
categories: frontEnd
---

## webpack基础配置
**安装webpack与webpack-dev-server**  
安装Node.js和NPM，创建一个目录，比如Demo，使用NPM初始化配置，可以用回车键快速确认
```
npm init
```
之后在本地局部安装webpack
```
npm install webpack --save-dev
```
接着安装webpack-dev-server，它可以在开发环境中提供很多服务
```
npm install webpack-dev-server --save-dev
```

&emsp;  
**就是一个js文件**  
归根到底，webpack就是一个.js配置文件，你的架构好或差都体现在这个配置里，随着需求的不断出现，工程配置也是逐渐完善的

&emsp;  
首先在目录Demo下创建一个webpack.config.js文件，并初始化它的内容
```js
let config = {
};
module.exports = config;
```
::: tip
这里的module.exports = config，相当于exports default config，由于目前还没有安装支持ES6的插件，因此不能直接使用ES6的语法，否则会报错
:::
然后再package.json的scripts里增加一个快速启动webpack-dev-server服务的脚本
```json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --port 8888 --open --config webpack.config.js"
},
```
这样当执行npm run dev指令的时候，在浏览器访问localhost:8888就可以查看页面  

&emsp;  
webpack配置中最重要也是必选的两项是入口（Entry）和出口（Output），入口的作用是告诉webpack从哪里开始寻找依赖，并且编译，出口则用来配置编译后的文件存储位置和文件名

&emsp;  
在Demo目录下新建一个空的main.js作为入口的文件，然后在webpack.config.js中进行入口和输出的配置
```js
let path = require('path');

let config = {
    entry: {
        main: './main'
    },
    output: {
        path: path.join(__dirname, './dist'),
        publicPath: "/dist/",
        filename: "main.js"
    }
};

module.exports = config;
```

&emsp;  
entry中的main就是我们配置的单入口，webpack会从main.js文件开始工作。output中path选项用来存放打包后文件的输出目录，是必填项。publicPath指定资源文件引用的目录，如果你的资源存放在CDN上，这里可以填CDN的网址。filename用于指定输出文件的名称。因此，这里配置的output意为打包后的文件会存储为demo/dist/main.js文件，只要在HTML中引入它就可以了

&emsp;  
在Demo目录下，新建一个index.html作为SPA的入口
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>webpack App</title>
</head>
<body>
    <div id="app">
        Hello World
    </div>
    <script type="text/javascript" src="/dist/main.js"></script>
</body>
</html>
```

&emsp;  
最后，输入npm run dev指令，之后便可在浏览器查看编写的页面

&emsp;  
**逐步完善配置文件**  
在webpack的世界里，每个文件都是一个模块，比如css、js等。对于不同的模块，需要不同的加载器（Loaders）来处理，而加载器就是webpack最重要的功能。通过安装不同的加载器可以对各种后缀名的文件进行处理，比如现在要写一些CSS样式，就要用到style-loader和css-loader。首先通过NPM来安装它们
```
npm install css-loader --save-dev
npm install style-loader --save-dev
```
安装完成后，在webpack.config.js文件里配置Loader，增加对css文件的处理
```js
module: {
    rules: [
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
    ]
}
```
在module对象的rules属性中可以指定一系列的loaders，每一个loader都必须包含test和use两个选项。这段配置的意思是说，当webpack编译过程中遇到require()或import语句导入一个后缀名为.css的文件时，先将它通过css-loader转换，再通过style-loader转换，然后继续打包。use选项的值可以是数组或字符串，如果是数组，它的编译顺序就是从后往前

&emsp;  
在Demo目录下新建一个style.css的文件，并在main.js中导入
```css
/* style.css */
#app {
    font-size: 24px;
    color: red;
}
```
```js
// main.js
import './style.css'

document.getElementById('app').innerHTML = 'Hello World';
```
重新执行npm run dev指令，可以看到字体的样式已经发生了变化

&emsp;  
可以看到，CSS是通过JavaScript动态创建style标签来写入，这意味着样式代码都已经编译在了main.js文件里，但在实际业务中，可能并不希望这样做，因为项目大了样式会很多，都放在JS里太占体积，还不能做缓存。这里就要用到webpack的最后一个概念--插件（Plugins）。webpack的插件功能很强大而且可以定制，这里我们使用一个extract-text-webpack-plugin的插件来把散落在各地的CSS提取出来，并生成一个main.css文件，最终在index.html里通过link的形式加载它

&emsp;  
通过NPM安装extract-text-webpack-plugin插件
```
npm install extract-text-webpack-plugin --save-dev

//如果是webpack 4.0及以上版本，需通过如下指令安装插件
npm install –save-dev extract-text-webpack-plugin@next
```
::: warning
官方已不推荐使用extract-text-webpack-plugin，推荐使用mini-css-extract-plugin插件
:::
然后在配置文件里导入插件，并改写loader的配置
```js
// 导入插件
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
    ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        // 重命名提取后的css文件
        new ExtractTextPlugin("main.css")
    ]
    ...
};
...
```
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>webpack App</title>
    <link rel="stylesheet" type="text/css" href="/dist/main.css"/>
</head>
...
</html>
```
## 单文件组件与vue-loader
Vue.js是一个渐进式的JavaScript框架，在使用webpack构建Vue项目时，可以使用一种新的构建模式：vue单文件组件。顾名思义，.vue单文件组件就是一个后缀名为.vue的文件，在webpack中使用vue-loader就可以对.vue文件格式的文件进行处理。一个.vue文件一般包含3部分，即template、script、style

&emsp;  
在.vue文件中，template中的代码就是该组件模板的HTML，style之间的是CSS样式，如果在style标签中使用了scoped属性，表示当前的CSS只在这个组件有效，如果不加那么div的样式会应用到整个项目。style还可以结合CSS预编译一起使用，比如使用Less处理可以添加lang="less"属性。

&emsp;
使用.vue文件需要先安装vue-loader、vue-style-loader等加载器并作配置，因为要使用ES6语法，还需要安装babel和babel-loader等加载器，使用NPM逐个安装以下依赖
```
npm install --save vue
npm install --save-dev vue-loader
npm install --save-dev vue-style-loader
npm install --save-dev vue-template-compiler
npm install --save-dev vue-hot-reload-api
npm install --save-dev babel
npm install --save-dev babel-loader
npm install --save-dev babel-core
npm install --save-dev babel-plugin-transform-runtime
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-runtime
```
安装完成后，修改配置文件webpack.config.js来支持对.vue文件及ES6的支持
```js
...
let config = {
    ...
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders:{
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        })
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_module/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: 'css-loader',
                    fallback: 'style-loader'
                })
            }
        ]
    },
...
```
vue-loader在编译.vue文件时，会对template、script、style分别处理，所以在vue-loader选项里多了一项options来进一步对不同语言进行配置。比如在对css进行处理时，会先通过css-loader解析，然后把处理结果再交给vue-style-loader处理。当你的技术栈多样化时，可以给template、script、style都指定不同的语言，然后配置loaders就可以了

&emsp;  
在Demo目录下新建一个名为.babelrec的文件，并写入babel的配置，webpack会依赖此配置文件来使用babel编译ES6代码
```
{
    "presets": ["es2015"],
    "plugins": ["transform-runtime"],
    "comments": false
}
```
配置好这些后，就可以使用.vue文件了。记住，每个.vue文件就代表一个组件，组件之间可以相互依赖

&emsp;  
在Demo目录下新建一个app.vue的文件并写入如下内容
```vue
<template>
    <div>Hello {{ name }}</div>
</template>

<script>
    export default {
        data () {
            return {
                name: 'Vue.js'
            }
        }
    }
</script>

<style scoped>
    div{
        color: #f60;
        font-size: 24px;
    }
</style>
```
::: tip
data () {} 等同于 data: function() {}  
在template内的HTML写法完全等同于html，不用加"\"换行，webpack最终会把它编译成Render函数的形式
:::
.vue的组件是没有名称的，在父组件使用时可以对它自定义，写好了组件，就可以在入口的main.js中使用它了，打开main.js文件，把内容替换为以下内容
```js
// 导入Vue框架
import Vue from 'vue';
// 导入app.vue组件
import App from './app';

// 创建Vue根实例
new Vue({
    el: '#app',
    render: h => h(App)
});
```
::: tip
=> 是箭头函数  
render:h=>h(App)等同于  
&emsp;render: function (h) {  
&emsp;&emsp;renturn h(App)  
&emsp;}  
也等同于  
&emsp;render: h => {  
&emsp;&emsp;return h(App);  
&emsp;}
:::
箭头函数里的this指向与普通函数是不一样的，箭头函数体内的this对象就是定义时所在的对象，而不是使用时所在的对象

&emsp;  
接下来，在Demo目录下再新建两个文件，title.vue和button.vue
```vue
<!-- title.vue -->
<template>
    <h1>
        <a :href="'#' + title">{{ title }}</a>
    </h1>
</template>

<script>
    export default {
        props: {
            title: {
                type: String
            }
        }
    }
</script>

<style scoped>
h1 a{
    color: #3399ff;
    font-size: 24px;
}
</style>
```
```vue
<!-- button.vue -->
<template>
    <button @click="handleClick" :style="styles">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        props: {
            color: {
                type: String,
                default: '#00cc66'
            }
        },
        computed: {
            styles () {
                return {
                    background: this.color
                }
            }
        },
        methods: {
            handleClick (e) {
                this.$emit('click', e);
            }
        }
    }
</script>

<style scoped>
    button{
        border: 0;
        outline: none;
        color: #fff;
        padding: 4px 8px;
    }
    button:active{
        position: relative;
        top: 1px;
        left: 1px;
    }
</style>
```
改写根实例app.vue组件，把title.vue和button.vue导入进来
```vue
<template>
    <v-title title="Vue组件化"></v-title>
    <v-button @click="handleClick">点击按钮</v-button>
</template>

<script>
    // 导入组件
    import vTitle from './title';
    import vButton from './button';

    export default {
        computed: {
            vTitle,
            vButton
        },
        methods: {
            handleClick (e) {
                console.log(e);
            }
        }
    }
</script>

<style scoped>
    
</style>
```
::: tip
component: {  
&emsp;vTitle,  
&emsp;vButton  
}  
等同于：  
components: {  
&emsp;vTitle: vTitle,  
&emsp;vButton: vButton  
}  
对象字面量缩写，当对象的key与value名称一致时，可以缩写成一个
:::
导入的组件都是局部注册的，而且可以自定义名称，其他用法和组件一致

## 用于生产环境
安装url-loader和file-loader来支持图片、字体等文件
```
npm install --save-dev url-loader
npm install --save-dev file-loader
```