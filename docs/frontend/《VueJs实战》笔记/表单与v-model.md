---
title: 表单与v-model
tags: 
 - Vue.js
categories: frontEnd
---

## 基本用法
表单控件在实际业务较为常见，比如单选、多选、下拉选、输入框等，用它们可以完成数据的录入、校验、提交等，Vue.js提供了v-model指令，用于在表单类元素上双向绑定数据，例如在输入框上使用时，输入的内容会实时映射到绑定的数据上，如下：
```HTML
<div id="app">
    <input type="text" v-model="message" placeholder="输入...">
    <p>输入的内容是：{{ message }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: ''
        }
    })
</script>
```
在输入框输入的同时，{{message}}也会实时将内容渲染在视图中

&emsp;  
对于文本域textarea：
```HTML
<div id="app">
    <textarea type="text" v-model="text" placeholder="输入..."></textarea>
    <p>输入的内容是：</p>
    <p style="white-space: pre">{{ text }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            text: ''
        }
    })
</script>
```
::: tip
使用v-model后，表单控件显示的值只依赖所绑定的数据，不再关心初始化时的value属性，对于在textarea中插入的值，也不会生效。使用v-model时，如果是用中文输入法输入中文，一般在没有选定词组前，Vue是不会更新数据的，当敲下汉字时才会触发更新，如果希望总是实时更新，可以使用@input替换v-model。事实上，v-model也是一个特殊的语法糖，只不过它会在不同的表单上智能处理
:::

### 单选按钮
单选按钮在单独使用时，不需要v-model，直接使用v-bind绑定一个布尔值的类型，为真时选中，为否时则不选
```HTML
<div id="app">
    <input type="radio" :checked="picked">
    <label>单选按钮</label>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            picked: true
        }
    })
</script>
```

&emsp;  
如果是组合使用来实现互斥选择的效果，就需要v-model配合value来使用
```HTML
<div id="app">
    <input type="radio" v-model="picked" value="html" id="html">
    <label for="html">HTML</label>
    <br>
    <input type="radio" v-model="picked" value="js" id="js">
    <label for="js">JS</label>
    <br>
    <input type="radio" v-model="picked" value="css" id="css">
    <label for="css">CSS</label>
    <br>
    <p>选择的项是：{{ picked }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            picked: 'js'
        }
    })
</script>
```
数据picked的值与单选按钮的value值一致时，就会选中该项

### 复选框
复选框也分单独使用和组合使用，不过用法稍与单选不同。复选框单独使用时，也是给v-model来绑定一个布尔值
```HTML
<div id="app">
    <input type="checkbox" v-model="checked" id="checked">
    <label for="checked">选择状态：{{ checked }}</label>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            checked: false
        }
    })
</script>
```
在勾选时，数据checked的值变成了true，label中渲染的值也会更新

&emsp;  
组合使用时，也是v-mdel与value一起，多个勾选框都绑定到同一个数组类型的数据，value的值在数组当中，就会选中这一项。这一过程也是双向的，在勾选时，value的值也会自动push到这个数组中
```HTML
<div id="app">
    <input type="checkbox" v-model="checked" value="html" id="html">
    <label for="html">HTML</label>
    <br>
    <input type="checkbox" v-model="checked" value="js" id="js">
    <label for="js">JS</label>
    <br>
    <input type="checkbox" v-model="checked" value="css" id="css">
    <label for="css">CSS</label>
    <br>
    <p>选择的项是：{{ checked }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            checked: ['html', 'css']
        }
    })
</script>
```

### 选择列表
选择列表就是下拉选择器，也是常见的表单控件，同样也分为单选和多选两种方式
```HTML
<div id="app">
    <select v-model="selected">
        <option>html</option>
        <option value="js">js</option>
        <option>css</option>
    </select>
    <p>选择的项是：{{ selected }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            selected: 'html'
        }
    })
</script>
```
option是备选项，如果含有value属性，v-model就会优先匹配value的值；如果没有，就会直接匹配option的text

&emsp;  
给selected添加属性multiple就可以多选了，此时v-model绑定的是一个数组，与复选框用法类似
```HTML
<div id="app">
    <select v-model="selected" multiple>
        <option>html</option>
        <option value="js">js</option>
        <option>css</option>
    </select>
    <p>选择的项是：{{ selected }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            selected: ['html', 'js']
        }
    })
</script>
```

&emsp;  
在业务中，option经常用v-for动态输出，value和text也是有v-bind来动态输出的
```HTML
<div id="app">
    <select v-model="selected">
        <option
            v-for="option in options"
            :value="option.value">{{ option.text }}</option>
    </select>
    <p>选择的项是：{{ selected }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            selected: 'html',
            options: [
                {
                    text: 'html',
                    value: 'html'
                },
                {
                    text: 'js',
                    value: 'js'
                },
                {
                    text: 'css',
                    value: 'css'
                }
            ]
        }
    })
</script>
```
虽然有选择列表select控件可以很简单的完成下拉选择的需求，但是在实际业务中反而不常用，因为它的样式依赖平台和浏览器，无法统一，也不太美观，功能也受限，比如不支持搜算，所以常见的解决方法是用div模拟一个类似的控件

## 绑定值
上例中v-model绑定的值是一个静态字符串或布尔值，但在业务中，有时需要绑定一个动态的数据，这时可以用v-bind来实现
### 单选按钮
```HTML
<div id="app">
    <input type="radio" v-model="picked" :value="value">
    <label>单选按钮</label>
    <p>{{ picked }}</p>
    <p>{{ value }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            picked: false,
            value: '123'
        }
    })
</script>
```

### 复选按钮
```HTML
<div id="app">
    <input type="checkbox" v-model="toggle" :true-value="value1" :false-value="value2">
    <label>复选框</label>
    <p>{{ toggle }}</p>
    <p>{{ value1 }}</p>
    <p>{{ value2 }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            toggle: false,
            value1: 'a',
            value2: 'b'
        }
    })
</script>
```

### 选择列表
```HTML
<div id="app">
    <select v-model="selected">
        <option :value="{ number : 123 }">123</option>
    </select>
    {{ selected.number }}
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            selected: ''
        }
    })
</script>
```

## 修饰符
与事件的修饰符类似，v-model也有修饰符，用于控制数据同步的机制
### .lazy
在输入框中，v-model默认是在input事件中同步输入框的数据（中文输入法除外），使用修饰符.lazy会转变为在change事件中同步
```HTML
<div id="app">
    <input type="text" v-model.lazy="message">
    <p>{{ message }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: ''
        }
    })
</script>
```
这时，message并不是实时改变的，而是在失焦或点击回车时才更新

### .number
使用修饰符.number可以将输入转换为Number类型，否则虽然你输入的是数字，但它的类型其实是String，，比如在数字输入框时会比较有用
```HTML
<div id="app">
    <input type="number" v-model.number="message">
    <p>{{ typeof message }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: '123'
        }
    })
</script>
```

### .trim
修饰符trim可以自动过滤首尾输入的空格
```HTML
<div id="app">
    <input type="text" v-model.trim="message">
    <p>{{ message }}</p>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            message: ''
        }
    })
</script>
```

::: tip
从Vue.js 2.x开始，v-model还可以用于自定义组件，满足定制化的需求
:::