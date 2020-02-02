---
title: Render函数
tags: 
 - Vue.js
categories: frontEnd
---

>Vue.js 2.x与Vue.js 1.x最大的区别就在于2.x使用了Virtual DOM（虚拟DOM）来更新DOM节点，提升渲染性能。虽然前面的章节我们的组件模板都是写在template选项里的，但是在Vue.js编译时，都会解析为Virtual DOM

## 什么是Virtual DOM
React和Vue 2都使用了Virtual DOM技术，Virtual DOM并不是真正意义上的DOM，而是一个轻量级的JavaScript对象，在状态发送变化时，Virtual DOM会进行Diff运算，来更新只需要被替换的DOM，而不是全部重绘。与DOM操作相比，Virtual DOM是基于JavaScript运算的，所以开销会小很多

&emsp;  
用Virtual DOM创建的JavaScript对象一般是这样的
```js
let vNode = {
    tag: 'div',
    attributes: {
        id: 'main'
    },
    children: {
        // p 节点
    }
}
```

&emsp;  
vNode对象通过一些特定的选项描述了真实的DOM结构  
在Vue.js 2中，Virtual DOM就是通过一种VNode类表达的，每个DOM元素或组件都对应一个vNode对象，在Vue.js源码中是这样定义的：
```js
export interface VNode {
    tag?: string;
    data?: VNodeData;
    children?: VNode[];
    text?: string;
    elm?: Node;
    ns?: string;
    context?: Vue;
    key?: string | number;
    componentOptions?: VNodeComponentOptions;
    componentInstance?: Vue;
    parent?: VNode;
    raw?: boolean;
    isStatic?: boolean;
    isRootInsert?: boolean;
    isComment?: boolean;
}
```
具体含义如下：
* tag 当前节点的标签名
* data 当前节点的数据对象

&emsp;  
VNodeData代码如下：
```js
export interface VNodeData {
    key?: string | number;
    slot?: string;
    scopedSlots?: { [key: string]: ScopedSlot };
    ref?: string;
    tag?: string;
    staticClass?: string;
    class?: any;
    staticStyle?: { [key: string]: any };
    style?: Object[] | Object;
    props?: { [key: string], any };
    attrs?: { [key: string], any };
    domProps?: { [key: string], any };
    hook?: { [key: string], Function };
    on?: { [key: string], Function | Function[] };
    nativeOn?: { [key: string], Function | Function[] };
    transition?: Object;
    show?: boolean;
    inlineTemplate?: {
        render: Function;
        staticRenderFns: Function[];
    };
    directive?: VNodeDirective[];
    keepAlive?: boolean;
}
```
* children 子节点，数组，也是VNode类型
* text 当前节点的文本，一般文本节点或注释节点会有该属性
* elm 当前虚拟节点对应的真实的DOM节点
* ns 节点的namespace
* content 编译作用域
* functionalContext 函数化组件的作用域
* key 节点的key属性，用于作为节点的标识，有利于patch的优化
* componentOptions 创建组件实例时会用到的选项信息
* child 当前节点对应的组件实例
* parent 组件的占位节点
* raw 原始html
* isStatic 静态节点的标识
* isRootInsert 是否作为根节点插入，被transition包裹的节点，该属性的值为false
* isComment 当前节点是否是注释节点
* isCloned 当前节点是否为克隆节点
* isOnce 当前节点是否有v-once指令

&emsp;  
VNode节点主要分为以下几类：
* TextVNode 文本节点
* ElementVNode 普通元素节点
* ComponentVNode 组件节点
* EmptyVNode 没有内容的注释节点
* CloneVNode 克隆节点，可以使以上任意类型，区别是isCloned属性为true

&emsp;  
使用Virtual DOM就可以完全发挥JavaScript的编程能力，在多数场景下，我们使用template就足够了，但是在一些特定场景下，使用Virtual DOM会更简单

## 什么是Render函数
### createElement用法
**基本参数**  
createElement构成了Vue Virtual DOM的模板，它有三个参数：
```js
createElement(
    // { String | Object | Function }
    // 一个HTML标签，组件选项，或一个函数
    // 必须Return上述其中一个
    'div',
    // { Object }
    // 一个对应属性的数据对象，可选
    // 可以在template中使用
    {
        // 稍后详细介绍
    },
    // { String | Array }
    // 子节点（VNodes，可选）
    [
        createElement('h1', 'hello world'),
        createElement('MyCompnent', {
            props: {
                someProp: 'foo'
            }
        });
        'bar'
    ]
)
```
第一个参数必选，可以是一个HTML标签，也可以是一个组件或函数；第二个是可选参数，数据对象，在template中使用；第三个是子节点，也是可选参数，用法一致

&emsp;  
对于第二个参数“数据对象”，具体的选项如下：
```js
{
    // 和v-bind:class一样的api
    'class': {
        foo: true,
        bar: false
    },
    // 和v-bind:style一样的api
    style: {
        color: 'red'
    },
    // 正常的HTML特性
    attrs: {
        id: 'foo'
    },
    // 组件props
    props: {
        myProp: 'bar'
    },
    // DOM属性
    domProps: {
        innerHTML: 'baz'
    },
    // 自定义事件监听器'on'
    // 不支持如v-on:keyup.enter的修饰器
    // 需要手动匹配keyCode
    on: {
        click: this.clickHandler
    },
    // 仅对于组件，用于监听原生事件
    // 而不是组件使用vm.$emit触发的自定义事件
    nativeOn: {
        click: this.nativeClickHandler
    },
    // 自定义指令
    directives: [
        {
            name: 'my-custom-directive',
            value: '2',
            expression: '1 + 1',
            arg: 'foo',
            modifiers: {
                bar: true
            }
        }
    ],
    // 作用域slot
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
        default: props => h('span', props.text)
    },
    // 如果子组件有定义slot的名称
    slot: 'name-of-slot',
    key: 'myKey',
    ref: 'myRef'
}
```
有时候，template的写法明显比Render写法要可读而且简洁，所以要在合适的场景使用Render函数

&emsp;  
**约束**  
所有的组件树中，如果VNode是组件或含有组件的slot，那么VNode必须唯一。因此，如果我们想添加多个相同的组件，在createElement函数中添加多个VNode是无法实现的。对于重复渲染多个组件（或元素）的方法有很多，比如以下示例：
```HTML
<div id="app">
    <ele></ele>
</div>
<script>
    // 局部声明组件
    let Child = {
        render: function (createElement) {
            return createElement('p', 'text');
        }
    };

    Vue.component('ele', {
        render: function (createElement) {
            return createElement('div',
                Array.apply(null, {
                    length: 5
                }).map(function () {
                    return createElement(Child);
                })
            );
        }
    });

    let app = new Vue({
        el: '#app'
    })
</script>
```

&emsp;  
上例通过一个循环和工厂函数就可以渲染5个重复的子组件Child。对于含有组件的slot，复用就要稍微复杂一点了，需要将slot的每个子节点都克隆一份
```HTML
<div id="app">
    <ele>
        <div>
            <Child></Child>
        </div>
    </ele>
</div>
<script>
    // 全局声明组件
    Vue.component('Child', {
        render: function (createElement) {
            return createElement('p', 'text');
        }
    });

    Vue.component('ele', {
        render: function (createElement) {
            // 克隆slot节点的方法
            function cloneVNode(vnode) {
                // 递归遍历所有子节点，并克隆
                const clonedChildren = vnode.children &&
                        vnode.children.map(function (vnode) {
                            return cloneVNode(vnode);
                        });
                const cloned = createElement(
                    vnode.tag,
                    vnode.data,
                    clonedChildren
                );
                cloned.text = vnode.text;
                cloned.isComment = vnode.isComment;
                cloned.componentOptions = vnode.componentOptions;
                cloned.elm = vnode.elm;
                cloned.context = vnode.context;
                cloned.ns = vnode.ns;
                cloned.isStatic = vnode.isStatic;
                cloned.key = vnode.key;

                return cloned;
            }

            const vNodes = this.$slots.default;
            const clonedVNodes = vNodes.map(function (vnode) {
                return cloneVNode(vnode);
            });

            return createElement('div',[
                vNodes,
                clonedVNodes
            ]);
        }
    });

    let app = new Vue({
        el: '#app'
    })
</script>
```
在Render函数里创建了一个cloneVNode的工厂函数，提过递归将slot所有子节点都克隆了一份，并对VNode的关键属性也进行复制。深度克隆slot的的做法有点偏黑科技，不过一般在业务中几乎不会碰到这样的需求，主要还是运用在独立组件中

**是有JavaScript代替模板功能**  
在Render函数中，不再需要Vue内置的指令，比如v-if、v-for，当然，也没办法使用它们。无论要实现什么功能，都可以用原生JavaScript。比如v-if和v-else可以这样写：
```HTML
<div id="app">
    <ele :show="show"></ele>
    <button @click="show = !show">切换 show</button>
</div>
<script>
    Vue.component('ele', {
        render: function (createElement) {
            if (this.show) {
                return createElement('p', 'show的值为true');
            } else {
                return createElement('p', 'show的值为false');
            }
        } ,
        props: {
            show: {
                type: Boolean,
                default: false
            }
        }
    });

    let app = new Vue({
        el: '#app',
        data: {
            show: false
        }
    })
</script>
```

&emsp;  
对于v-for，可以用一个简单的for循环来实现
```HTML
<div id="app">
    <ele :list="list"></ele>
</div>
<script>
    Vue.component('ele', {
        render: function (createElement) {
            let nodes = [];
            for (let i=0; i<this.list.length; i++) {
                nodes.push(createElement('p', this.list[i]));
            }
            return createElement('div', nodes);
        } ,
        props: {
            list: {
                type: Array
            }
        }
    });

    let app = new Vue({
        el: '#app',
        data: {
            list: [
                'BookA',
                'BookB',
                'BookC'
            ]
        }
    })
</script>
```
在一开始解除Render写法时，可能会有点不适应，毕竟这种用createElement写法创建DOM节点的方法不够直观和可读，而且受Vue内置指令的影响，有时会绕不过弯。不过只要把它当作JavaScript一个普通的函数来使用，写习惯之后就没有那么难理解了

&emsp;  
Render函数里也没有与v-model对应的api，需要自己实现逻辑
```HTML
<div id="app">
    <ele></ele>
</div>
<script>
    Vue.component('ele', {
        render: function (createElement) {
            let _this = this;
            return createElement('div', [
                createElement('input', {
                    domProps: {
                        value: this.value
                    },
                    on: {
                        input: function (event) {
                            _this.value = event.target.value;
                        }
                    }
                }),
                createElement('p', 'value: ' + this.value)
            ])
        } ,
        data: function () {
            return {
                value: ''
            }
        }
    });

    let app = new Vue({
        el: '#app'
    })
</script>
```

## JSX
使用Render函数最不友好的地方就是在模板比较简单时，写起来也很复杂，而且难以阅读出DOM结构，尤其当子节点嵌套较多时，嵌套的createElement就像盖楼一样一层层延续下去

&emsp;  
为了让Render函数更好的书写和阅读，Vue.js提供了babel-plugin-transform-vue-jsx来支持JSX语法。JSX是一种看起来像HTML，但实际是JavaScript的语法扩展，它用更接近DOM结构的形式来描述一个组件的UI和状态信息，最早在React.js中大量应用

&emsp;  
```HTML
new Vue({
    el: '#app',
    render (h) {
        return (
            <Anchor level={1}>
                <span>一级</span>标题
            </Anchor>
        )
    }
})
```
上面代码无法直接运行，需要在webpack里配置插件babel-plugin-transform-vue-jsx编译后才可以。这里的render使用了ES2015的语法缩写了函数，需要注意的是，参数h不能省略，否则使用时会触发错误

&emsp;  
JSX仍然是JavaScript而不是DOM，如果你的团队不是JSX强驱动的，建议还是以模板template的方式为主，特殊场景（比如锚点标题）使用Render的createElement辅助完成