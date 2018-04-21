# Vue2.5开发去哪儿网App

[TOC]

## 第2章 Vue 起步

### Vue基础 hello world

```js
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

```js
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

## 第5章 Vue 中的动画特效



## 第6章 Vue 项目预热



## 第7章 旅游网站首页开发



## 第8章 旅游网站城市列表页面开发



## 第9章 旅游网站详情页面开发



## 第10章 项目的联调，测试与发布上线
