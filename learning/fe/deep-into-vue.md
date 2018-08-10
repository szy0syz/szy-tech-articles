# Vue.js 源码全方位深入解析 收藏   

## 第一章

### 认识Flow

在代码文件最前面加 `/*@flow*/`，表示该文件需要被检测。

安装 `npm i -g flow-bin`

### 工作方式

* **类型判断** ：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。
* **类型注释**：事先注释好我们期待的类型，Flow 会基于这些注释来判断。

### 类型判断

```js
function add(x: number, y: number): number {
  return x + y
}

var arr: Array<number> = [1, 2, 3]

class Bar {
  x: string;                  // x 是字符串
  y: string | number | void;  // y 可以是字符串或者数字或者不传
  z: boolean;

  constructor(x: string, y: string | number | void) {
    this.x = x
    this.y = y
    this.z = false
  }
}
```

### Vue.js 源码目录设计


## 第2章 数据驱动

### new Vue 发生了什么

```js
var app = new Vue({
  el: '#app',
  data: {
    message: 'hello jerry'
  }
})
```

* `new` 一个`Vue`，其实执行源码 `/src/core/instance/init/index.js`里的Vue构造函数。到底长啥样呢？--> `this._init(options)`
* 怪球事了，又没定义`_init`方法，往哪里来的呢？

```js
// 原来往这里来
initMixin(Vue)  // <--- 单步进去走一遭
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)
```

* 原来是这也，Vue源码里的所有带 `*Mixin`的函数，意思都是在Vue构造函数的显示原型 `.prototype` 上挂新的函数而已嘛
* 言归正传，继续说 `_init()`函数内部:
  * 进来就先声明 `vm = this`
  * 再挂一个 `vm._uid`，就是一个步长为1的自增id，后面有用
  * 开始合并options，挂载到 `vm.$options`
  * 执行一系列初始化，其中initState()就是处理data对象，这里就会遍历data对象里的属性使用 `defineReactive()` 挂到vm实例上，我去看下证据代码在哪里：`/src/core/instance/state.js` --> `initData()` 里面有个while循环，从keys里遍历，一开始各种判断边界问题，`proxy(vm, '_data', key)`最后取属性是在 `_data`里
  * 最后 `vm.$mount(vm.$options.el)` 想当然渲染DOM
