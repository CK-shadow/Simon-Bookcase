---
title: 数据绑定和第一个Vue应用
tags: 
 - Vue.js
categories: frontEnd
---

## Vue实例与数据绑定
### 实例与数据
Vue.js应用的创建很简单，通过构造函数Vue就可以创建一个Vue的根实例，并启动Vue应用
```js
// 变量app就代表了这个Vue实例，事实上，几乎所有的代码都是一个对象，写入Vue实例的选项内
var app = new Vue({
    // 选项
})
```
&emsp;  
Vue实例中必不可少的一个选项就是el。el用于指定一个页面中已存在的DOM元素来挂载Vue实例，它可以是HTMLElement，也可以是CSS选择器
```js
var app = new Vue({
    el : document.getElementById('app'); //或者是'#app'
})
```

&emsp;   
通过Vue实例的data选项，可以声明应用内需要双向绑定的数据。建议所有会用到的数据都预先在data内声明，这样不至于将数据散落在业务逻辑中，难以维护。Vue实例本身也代理了data对象里的所有属性，所以可以这样访问
```js
var app = new Vue({
    el : '#app',
    data : {
        a : 2
    }
})

console.log(app.a) // 2
```

&emsp;  
除了显式的声明数据外，也可以指向一个已有的变量，并且他们之间默认建立了双向绑定，当修改其中任意一个时，另一个也会一起发生变化：
```js
var myData = {
    a : 1
}
var app = new Vue({
    el : '#app',
    data : myData
})

console.log(app.a); // 1
// 修改属性，原数据也会随之修改
app.a = 2;
console.log(myData.a); // 2
// 反之，修改原数据，Vue属性也会修改
myData.a = 3;
console.log(app.a); // 3
```

### 生命周期
每个Vue实例创建时，都会经历一系列的初始化过程，同时也会调用相应的声明周期钩子，我们可以利用这些钩子，在合适的时机执行我们的业务逻辑

&emsp;  
Vue的生命周期钩子比较常用的有：
* created：实例创建完成后调用，此阶段完成了数据的观测等，但尚未挂载，$el还不可以。需要初始化处理一些数据时会比较有用
* mounted：el挂载到实例上之后调用，一般我们的第一个业务逻辑会在这里开始
* beforeDestroy：实例销毁之前调用，主要解绑一些使用addEventListener监听的事件等

&emsp;  
这些钩子与el和data类似，也是作为选项写入Vue实例中的，并且钩子的this指向的是调用它的Vue实例
```js
var app = new Vue({
    el : '#app',
    data : {
        a : 2
    },
    created : function() {
        console.log(this.a); // 2
    },
    mounted : function() {
        console.log(this.$el); // <div id="app"></div>
    }
})
```

### 插值与表达式
使用双大括号{{}}是最基本的文本插值方法，它会自动将我们双向绑定的数据显示出来，通过任何方式修改中的数据，大括号的内容都会被实时替换。比如下面这个示例，实时显示当前时间，每秒更新:
```html
<div id="app">
    {{date}}
</div>
<script>
    var app = new Vue({
        el : '#app',
        data : {
            date : new Date()
        },
        mounted : function () {
            // 声明一个变量指向Vue实例this，保证作用域一致
            var _this = this;
            this.timer = setInterval(function () {
                // 修改数据date
                _this.date = new Date();
            }, 1000);
        },
        beforeDestroy : function () {
            if (this.timer) {
                // 在Vue实例销毁前，清除我们的定时器
                clearInterval(this.timer);
            }
        }
    })
</script>
```

&emsp;  
如果有时候就是想输出HTML，而不是将数据解释后的纯文本，可以使用v-html：
```HTML
<div id="app">
    <span v-html="link"></span>
</div>
<script>
    var app = new Vue({
        el : '#app',
        data : {
            link : '<a href="#">这是一个链接</a>'
        }
    })
</script>
```
::: warning
如果将用户产生的内容使用v-html输出后，有可能会导致XSS攻击，所以要在客户端对用户提交的内容进行处理，一般可将尖括号"<>"转义
:::

&emsp;  
如果想显示{{}}标签，而不进行替换，使用v-pre即可跳过这个元素和它的子元素的编译过程，例如
```HTML
<span v-pre>{{这里的内容是不会被编译的}}</span>
```

&emsp;  
在{{}}中，除了简单的绑定属性值之外，还可以使用JavaScript表达式进行简单的运算、三元运算等
```HTML
<div id="app">
    {{number/10}} 
    {{isOK ? '确定' : '取消'}}
    {{text.split(',').reverse().join(',')}}
</div>
<script>
    var app = new Vue({
        el : '#app',
        data : {
            number : 100,
            isOK : false,
            text : '123,456'
        }
    })
</script>
```

&emsp;  
Vue.js只支持单个表达式，不支持语句和流控制，另外，在表达式中，不能使用用户自定义的全局变量，只能使用Vue白名单内的全局变量，例如Math和Date，以下是一些无效的示例：
```HTML
<!-- 这是语句，不是表达式 -->
{{var book = 'BOOK'}}
<!-- 不能使用流控制，要使用三元运算 -->
{{if(OK) return message}}
```

### 过滤器
Vue.js支持在插值的尾部添加一个管道符"(|)"对数据进行过滤，经常用于格式化文本，比如字母全部大写，货币千位使用逗号分隔等。过滤的规则是自定义的，通过给Vue实例添加选项filters来设置，比如对上面示例的时间进行格式化：
```HTML
<div id="app">
    {{ date | formatDate }}
</div>
<script>
    // 在月份、日期、小时等小于10时前面补0
    var padDate = function (value) {
        return value < 10 ? '0' + value : value;
    };

    var app = new Vue({
        el : '#app',
        data : {
            date : new Date()
        },
        filters : {
            formatDate : function (value) {
                const date = new Date(value);
                const year = date.getFullYear();
                const month = padDate(date.getMonth() + 1);
                const day = padDate(date.getDate());
                const hours = padDate(date.getHours());
                const minutes = padDate(date.getMinutes());
                const seconds = padDate(date.getSeconds());
                return year + '-' + month + '-' + day + ' ' 
                        + hours + ':' + minutes + ':' + seconds;
            }
        },
        mounted : function () {
            const _this = this;
            this.timer = setInterval(function () {
                _this.date = new Date();
            }, 1000);
        },
        beforeDestroy : function () {
            if (this.timer) {
                clearInterval(this.timer);
            }
        }
    })
</script>
```

&emsp;  
过滤器也可以串联，而且可以接收参数，例如：
```
<!-- 串联 -->
{{ message | filterA | filterB }}
<!-- 接收参数 -->
<!-- arg1和arg2分别是传给过滤器的第2个和第3个参数，因为第一个是数据本身 -->
{{ message | filterA('arg1', 'arg2') }}
```
::: tip
过滤器应当用于处理简单的文本转换，如果要实现更为复杂的数据变换，应该使用计算属性
:::

## 指令与事件
指令（Directives）是Vue.js模板中最常见的一项功能，它带有前缀v-，比如v-if、v-html、v-pre等。指令的主要职责就是当其表达式的值发生改变时，相应地将某些行为应用到DOM上

&emsp;  
以v-if为例：
```HTML
<div>
    <p v-if="show">显示这段文本</p>
</div>
<script>
    var app = new Vue({
        el : '#app',
        date : {
            show : true
        }
    })
</script>
```
当数据show的值为true时，p元素会被插入，为false时则会被移除。Vue.js内置了很多指令，后续会进行详细介绍

## 语法糖
语法糖是指在不影响功能的情况下，添加某种方法实现同样的效果，从而方便程序开发

&emsp;  
Vue.js的v-bind和v-on指令都提供了语法糖，也可以说是缩写
```
<a v-bind:href="url">链接</a>
<!-- 缩写为 -->
<a :href="url">链接</a>

<button v-on:click="handleClose">点击隐藏</button>
<!-- 缩写为 -->
<button @click="handleClose">点击隐藏</button>
```