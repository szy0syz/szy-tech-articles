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

## 第4章 深入理解 Vue 组件



## 第5章 Vue 中的动画特效



## 第6章 Vue 项目预热



## 第7章 旅游网站首页开发



## 第8章 旅游网站城市列表页面开发



## 第9章 旅游网站详情页面开发



## 第10章 项目的联调，测试与发布上线
