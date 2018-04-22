# Vue2.5开发去哪儿网App

[TOC]

## 第2章 Vue 起步

### Vue基础 hello world

```html
<body>
  <div id='app'>{{content}}</div>

  <div>{{content}}</div>

  <script>
    // var app = document.getElementById('app')
    // app.innerHTML = 'hello world'
    // setTimeout(() => {
    //   app.innerHTML = 'hello world Timeout'
    // }, 2000)

    var app = new Vue({
      el: '#app',
      data: () => {
        return  {
          content: 'hello Vue'
        }
      }
    })

    setTimeout(() => {
      app.$data.content = 'hello jerry'
    }, 2000)
  </script>
</body>
```

Vue 组件之间传值

```html
<div id='app'>
  <input type="text" v-model="inputValue" @keyup.enter="handleAddItem">
  <!-- <ul>
          <li @click="handleRemove(index)" v-for="(item, index) in list">{{item}}</li>
      </ul> -->
  <todo-list @remove="handlerRemoveItem" :list="list"></todo-list>
</div>

<script>
  const todoList = {
    props: ['list'],
    template: '<ul><li @click="handleItemClick(index)" v-for="(item, index) in list">{{item}}</li></ul>',
    methods: {
      handleItemClick(index) {
        console.log(index)
        this.$emit('remove', index)
      }
    }
  }

  var vm = new Vue({
    el: '#app',
    data: {
      inputValue: '',
      list: ['one', 'two', 'three']
    },
    components: {
      todoList
    },
    methods: {
      handleAddItem() {
        this.list.push(this.inputValue)
        this.inputValue = ''
      },

      handlerRemoveItem(index) {
        this.list.splice(index, 1)
      }
    }
  })
</script>
```

## 第3章 Vue 基础精讲

Vue的声明周期函数就是Vue的实例在某一个时间点会自动执行的函数

### 3-3 模板语法

* `{{ inputValue }}` 差值表达式
* `v-text` 文本指令
* `v-html` html渲染指令
* 三者都可以在其内部写js表达式

### 3-4 计算属性，方法和侦听器

* 计算属性内置缓存，只要其计算的数据没变，它就不重新计算。如果一个需求可以用mothods、watch和computed实现，我们优先使用computed，watch也带缓存，只是语法复杂。

### 3-5 计算属性的setter和getter

* 计算属性默认只有get，没有set，得自己写。

### 3-8 列表渲染

在Vue中只能用Vue提供的7个数据遍历方法来操作数据，否则不会触发updated

* `push`
* `pop`
* `shift`
* `unshif`
* `splice`
* `sort`
* `reverse`

修改被Vue-data中数组具体某项的值的三种方法

* `list.splice(1,1,{id:"1012", content: "new"})`
* 直接将`this.list = 新的数组对象`
* `$set(this.list, 2, 88)`

`<template></template>` 为模板占位符，渲染时不会出现任何dom元素

新增data中某对象的属性时记得$set

## 第4章 深入理解 Vue 组件

### 4-1 组件使用的细节

* 使用`is`属性解决模板标签的中bug问题：`<table><tr is="rowComponent"></tr></table>`，显示指定又哪个组件替换dom节点
* 每个组件里的data必须是个函数，除非根组件
* `ref`如果放在某html标签上时，得到的是该dom元素；如果`ref`放在某子组件上时，得到的是这样组件实例的引用
* `ref`的应用场景：父组件有需求动态拿子组件data上数据变化的值来做计算

### 4-2 父子组件的数据传递

* 父组件通过属性的方式向子组件传递数据
* 子组件通过事件触发的方式向父组件传递数据
* 父子组件传值遵循原理：单向数据流。解决方案拷贝副本

在子组件特性上加`v-bind`或`:`时，对根据传递的对象类型按实际类型传递，对象引用地址、数字、字符串等。如果不加时，就完全当这个传递属性的值为字符串！

Vue中有单向数据流的概念，也就是说应避免在子组件中修改父组件传递来的属性的值，解决办法是在子组件的data中新建一个属性保存父组件传递来的属性，在template或mothds中操作时，也就操作这个克隆来的自己的属性。

### 4-3 组件参数校验与非Props特性

```js
Vue.component('child', {
  props: [String, Number] // 只接受这两个类型其中一个
})

Vue.component('child', {
  props: {
    content: {
      type: String,
      required: false,
      defalut: 'Deafult Value',
      validator: function(value) {
        return (value.length > 5)
      }
    }
  }
})
```

非porps特性

* 父组件v-bind传递属性，但子组件不接收此属性，那么子组件就不能使用此传递属性
* 同时父组件v-bind的属性会显示的放在子组件最外层的dom元素特性上

### 4-4 给组件绑定原生事件

`<child @click.native="handleClick"></child>`

### 4-5 非父子组件间的传值

解决方案：Bus/总线/发布订阅模式/观察者模式

```js
Vue.prototype.bus = new Vue()

    Vue.component('child', {
      props: ['content'],
      data: function() {
        return {
          myContent: this.content
        }
      },
      template: '<div @click="handleClick">{{myContent}}</div>',
      methods: {
        handleClick() {
          this.bus.$emit('change', this.myContent)
        }
      },
      mounted: function() {
        var _this = this
        this.bus.$on('change', function(msg) {
          console.log(msg)
          _this.myContent = msg
        })
      }
    })

    const vm = new Vue({
      el: '#app'
    })
```

### 4-6 Vue中的slot插槽

具名插槽的使用场景：父组件向子组件传递自定义的dom结构来替换子组件默认的dom结构

### 4-7 Vue中的作用域插槽

子组件组装数据，但不管数据如何显示，父组件调用子组件并用`<template>`标签定义显示结构，此时在子组件定义作用域插槽`slot-scope="props"`，此后就可以在此作用域内使用子组件的数据对象

## 第5章 Vue 中的动画特效

![enter][1]
![leave][2]

### 5-2 Vue中使用Animation.css库

使用第三方动画库，只需要修改`transition`组件的那六个自定义动态添加的类

```js
// link animation.css
<div>
  <transition name="fade" enter-active-class="animated swing" leave-active-class="animated shank">
    <div>Hello Jerry</div>
  </transition>
  <button @click="handleClick">toggle</button>
</div>
```

### 5-2 在Vue中同时使用过度和动画

解决第一次载入或刷新网页时没动画：在`transtion 新增appear特性`

```js
<transition 
  name="fade" 
  appear
  enter-active-class="animated swing" 
  leave-active-class="animated shank"
  appear-active-class="animated swing"
  >
    <div>Hello Jerry</div>
  </transition>
```

在Vue中同时使用过度和动画： 在`transition`组件标签上添加`enter-active-class`，且又在style类里自定义`fade-enter-active`的过度动画即可。

在两种动画都在用时：

* 可以在transition标签上指定type，则可以指定到底以哪种动画时长为准，也可以`:duration="4000"`自定义两者的动画时长，还可以`:duration="{enter: 5000, leave: 2000}"`分别指定两者的不同时长。

### 5-3 Vue中的JS动画与Velocity.js的结果

Vue中的JS动画钩子函数

* `before-enter`
* `enter`
* `after-enter`

```js
methods: {
  handleBeforeEnter: function(el) {
    el.style.opacity = 0;
  },
  handleEnter: function(el, done) {
    Velocity(el, {
      opactity: 1
    }, {
      duration: 1000,
      complete: deon
    })
  },
  handleAfterEnter: function(el) {
    console.log('动画结束)
  }
}
```

### 5-5

    不让Vue复用DOM方法，加`key="uniq"`

Vue的transition中可以指定mode="in-out"指定多个元素入场和出差的动画执行循序

多个组件的过度动画需要用动态组件的方式来实现

```js
<transition mode="in-out">
  <component :is="whichType"></component>
</transition>
```

### 5-6 Vue中的列表过度

![group][3]

### 5-7 Vue中动画的封装

![封装][4]

## 第6章 Vue 项目预热



## 第7章 旅游网站首页开发



## 第8章 旅游网站城市列表页面开发



## 第9章 旅游网站详情页面开发



## 第10章 项目的联调，测试与发布上线

[1]: http://ofx24fene.bkt.clouddn.com//img/blog/vue-css3-enter.png
[2]: http://ofx24fene.bkt.clouddn.com//img/blog/vue-css3-leave.png
[3]: http://ofx24fene.bkt.clouddn.com//img/blog/vue-transition-group.png
[4]: http://ofx24fene.bkt.clouddn.com//img/blog/vue-transition.png
