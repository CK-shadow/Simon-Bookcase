---
title: bind及class与style绑定
tags: 
 - Vue.js
categories: frontEnd
---

## 了解v-bind指令
```HTML
<div id="app">
    <!-- 链接的href属性和图片的src属性都被动态设置了，当数据变化时就会重新渲染 -->
    <a v-bind:href="url">链接</a>
    <img v-bind:src="imageUrl">
    <!-- 缩写为 -->
    <a :href="url">链接</a>
    <img :src="imageUrl">
</div>
<script>
    let app = new Vue({
            el: '#app',
            data: {
                url: 'https://www.github.com',
                imageUrl: 'http://xxx.xxx/img.png'
            }
        })
    </script>
```

&emsp;  
在数据绑定中，最常见的两个需求就是元素的样式名称class和内联样式style的动态绑定，他们也是HTML属性，因此可以使用v-bind指令。我们只需要用v-bind计算出表达式最终的字符串就可以，不过有时候表达式的逻辑较为复杂，使用字符串拼接方法难阅读和维护，所以Vue.js增强了对class和style的绑定

## 绑定class的几种方式
### 对象语法
给v-bind设置一个对象，可以动态的切换class，例如
```HTML
<div id="app">
    <div :class="{'active' : isActive}"></div>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            isActive: true
        }
    })
</script>
```
类名active依赖于数据isActive，当其为true时，div会拥有类名active，为false时则没有

&emsp;  
对象中也可以传入多个属性，来动态切换class，另外，:class与普通class可以共存，例如：
```HTML
<div id="app">
    <div class="static" :class="{'active' : isActive, 'error' : isError}"></div>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            isActive: true,
            isError: false
        }
    })
</script>
```

&emsp;  
当:class的表达式过长或者逻辑复杂时，还可以绑定一个计算属性，这是一种很友好和常见的用法，一般当条件多于两个时，都可以使用data或computed，例如使用计算属性：
```HTML
<div id="app">
    <div :class="classes"></div>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            isActive: true,
            error: null
        },
        computed: {
            classes: function () {
                return {
                    active: this.isActive && !this.error,
                    'text-fail': this.error && this.error.type === 'fail'
                }
            }
        }
    })
</script>
```
除了计算属性，也可以直接绑定一个Object类型的数据，或者使用类似计算属性的methods

### 数组语法
当需要应用多个class时，可以使用数组语法，给:class绑定一个数组，应用一个class列表：
```HTML
<div id="app">
    <div :class="[activeClass, errorClass]"></div>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            activeClass: 'active',
            errorClass: 'error'
        },
    })
</script>
```

&emsp;  
也可以使用三元表达式根据条件来切换class
```HTML
<div id="app">
    <div :class="[isActive ? activeClass : '', errorClass]"></div>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            isActive: true,
            activeClass: 'active',
            errorClass: 'error'
        },
    })
</script>
```

&emsp;  
class具有多个条件时，这样写较为繁琐，可以在数组语法中使用对象语法
```HTML
<div id="app">
    <div :class="[{active : isActive}, errorClass]"></div>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            isActive: true,
            errorClass: 'error'
        },
    })
</script>
```

&emsp;  
当然，和对象语法一样，也可以使用data、computed、method三种方法

&emsp;  
使用计算属性给元素动态设置类名，在业务中经常用到，尤其是在写复用的组件时，所以在开发过程中，如果表达式较长或者逻辑复杂，应该尽可能地优先使用计算属性

## 绑定内联样式
使用v-bind:style可以给元素绑定内联样式，方法与:class类似，也有对象语法和数组语法，看起来很像直接在元素上写CSS：
```HTML
<div id="app">
    <div :style="{'color': color, 'fontSize': fontSize}">文本</div>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            color: 'red',
            fontSize: '14px'
        },
    })
</script>
```

&emsp;  
大多数情况下，直接写一长串地样式不便于阅读和维护，所以一般写在data或computed里，以data为例
```HTML
<div id="app">
    <div :style="styles">文本</div>
</div>
<script>
    let app = new Vue({
        el: '#app',
        data: {
            styles: {
                color: 'red',
                fontSize: '14px'
            }
        },
    })
</script>
```

&emsp;  
在实际业务中，:style的数组语法并不常用，因为往往可以写在一个对象里面，而较为常用的应该是计算属性。另外，使用:style时，Vue.js会自动给特殊的CSS属性名称加前缀，比如transform