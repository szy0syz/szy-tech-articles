# 前端 JavaScript 面试技巧

[TOC]

## 第 1 章 课程简介

## 第 2 章 JS 基础知识（上）

```js
// 值类型 //
var a = 100
var b = a
a = 200
console.log(b) // 100

// 引用类型 //
var c = { age: 20 }
var b = a
b.age = 21
console.log(a.age) // 21
```

引用类型包括：对象、数组、函数。引用类型可以无限制的扩展属性。

### typeof 运算符

```js
typeof undefined // undefined
typeof 'abc' // string
typeof 123 // number
typeof true // boolean
typeof {} // object
typeof [] // object
typeof null // object
typeof console.log // function
```

JavaScript 中共有 6 种基本数据类型：Undefined、Null、Boolean、Number、String、Symbol

* 触发强制类型转换
  * 字符串拼接
  * == 运算符 `null == undefined // true`
  * if 语句
  * 逻辑运算 把变量强制转换为 Boolean `!!a`

何时用===和==

`if(obj.a == null){} // 等于 obj.a === null || obj.a === undefined`

也就是说，除了想判断某对象属性是否为 null 时用==，其它场景都用===

### JS 中的内置函数

* Object
* Array
* Boolean
* Number
* String
* Fcuntion
* Date
* RegExp
* Error
* Math

他们都是类的构造函数，数据封装类对象。

值类型和引用类型：一个是值得拷贝，另一个是内存指针地址的拷贝。

### 如何理解 JSON

JSON 只不过是一个 JS 对象而已
JSON.stringify({a:10, b:20})
JSON.parse('{"a":"1","b":"2"}')

### 原型和原型链

* `var a = {}` 其实是 `var a = new Object()` 的语法糖
* `var a = []` 其实是 `var a = new Array()` 的语法糖
* `function Foo() {}` 其实是 `var Foo = new Function(...)` 的语法糖
* 使用 instanceof 判断一个函数是否是一个变量的构造函数 `arr1 instanceof Array`

### 原型规则和示例

原型的五条规则：

* 所有的引用类型（数据、对象、函数），都具有对象特性，即可以自由扩展属性(除了 “null” 以外)
* 所有的引用类型（数据、对象、函数），都有一个`__proto__`(隐式原型)属性，其地址指向一个普通的对象
* 所有的函数，都有一个`prototype`(显示原型)属性其属性值也是一个普通的对象
* 所有的引用类型（数据、对象、函数），`__prpto__`隐式原型属性都指向它的构造函数的`prototype`属性
* 当视图得到一个对象的属性时，吐过这个对象本身没有这个属性，那么就会去它的`__proto__`隐式原型(即它的构造函数的`prototype`)中寻找

只循环对象自身的属性

```js
for (key in obj) {
  if (f.hasOwnProperty(item)) {
    // 自身属性，不含原型链上的
  }
}
```

### 原型链

![eg1][2]

`Foo.prototype.__proto__ === Object.prototype`

![__proto__][1]

#### instanceof

    用于判断 引用类型 属于哪个 构造函数 的方法

```js
function Foo() {}
var f = new Foo()
f instanceof Foo
// 判断逻辑: f的__proto__隐式原型属性上递归一层一层往上找，能否找到对应的Foo.prototype，找到了就提前回来。
// 如果没找到，就再试着判断 f instanceof Object
```

#### 写一个原型链继承的例子

```js
function Animal() {
  this.eat = function() {
    console.log('animal eat')
  }
}
function Dog() {
  this.bark = function() {
    console.log('dog bark')
  }
}

Dog.prototype = new Animal()

var xiaobai = new Dog()
```

原型链继承核心就是在子类的构造函数的显示原型上实例化一个父类的实例对象

#### 描述 new 一个对象的过程

* 创建一个新对象
* this 指向这个新对象
* 执行代码，即对 this 赋值
* 返回 this

阅读源码是高效提高技能的方式但不能“埋头苦钻”有技巧在其中

#### 写一个用原型继承封装 DOM 查询的例子

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>原型扩展</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    .nav {
      display: flex;
    }

    .nav li {
      list-style-type: none;
      border: 1px solid #000;
      margin: 10px;
    }
  </style>
</head>

<body>
  <header>
    <nav>
      <ul class="nav">
        <li>首页</li>
        <li>关于</li>
      </ul>
    </nav>
  </header>
  <section>
    <article id="myContent">
      <p>我是内容</p>
    </article>
  </section>
  <footer>
    <p>我是footer</p>
  </footer>

  <script>
    function Elem(id) {
      this.elem = document.getElementById(id)
    }

    Elem.prototype.html = function (val) {
      var elem = this.elem
      if (val) {
        elem.innerHTML = val
        return this // 链式操作
      } else {
        return elem.innerHTML // 如果没有就返回元素html文本
      }
    }

    Elem.prototype.on = function (type, fn) {
      var elem = this.elem
      if (fn && (Object.prototype.toString.call(fn) === '[object Function]')) {
        elem.addEventListener(type, fn) // 冒泡
        return this
      } else {
        throw new Error('fn must be function')
      }
    }

    var myContent = new Elem('myContent')
    setTimeout(function () {
      myContent.html('我被修改了~~~~~~~~').on('click', function () { alert('click~~~') })
    }, 1000)
  </script>
</body>
```

## 第 3 章 JS 基础知识（中）

### 执行上下文

```js
// 执行上下文
console.log(a) // undefined
var a = 100
// 完美体现了js预解释
fn('jerry') // jerry 20
function fn(name) {
  age = 20
  console.log(name, age)
  var age
}
```

* 范围：一段`<script>`或者一个函数
* 全局：变量定义、函数声明
* 函数：变量定义、函数声明、this、arguments

### this

* this 要在执行时才能确认值，定义时无法确认
* 作为构造函数执行
* 作为对象属性执行
* 作为普通函数执行 --> 指向 window
* call apply bind

### 作用域

* js 没有块级作用域
* 只有函数作用域和全局作用域

```js
if (true) {
  var name = 'jerry'
}
console.log(name) // jerry，证明了js没有块级作用域
```

### 作用域链

```js
var a = 100
function fn() {
  var b = 200

  // 当前作用域没有定义的变量，但能在作用域链中找到，就叫“自有变量”
  console.log(a)
}
```

### 闭包

闭包的使用场景

* 函数作为返回值
* 函数作为参数传递（回调）

创建 10 个`<a>`标签 点击时弹出对应的序号

```js
var i
for (i = 0; i < 10; i++) {
  (function(i) {
    var a = document.createElement('a')
    a.innerHTML = i + '<br>'
    a.addEventListener('click', function(e) {
      e.preventDefault()
      alert(i)
    })
    document.body.appendChild(a)
  })
}
// 循环在立即执行函数中创建10个a标签，每个标签创建10个监听click事件，创建10个闭包一一对应这10个click监听函数~~~
```

### 如何理解作用域

* 自由变量
* 作用域链，即自由变量的查找
* 闭包的两个场景

### 闭包在实际开发中的应用

```js
function isFirstLoad() {
  var _list = []
  return function (id) {
    if (_list.indexOf(id) >= 0) {
      return false
    } else {
      _list.push(id)
      return true
    }
  }
}

var firstLoad = isFirseLoad()
firstLoad(10) // true
firstLoad(10) // false
firstLoad(20) // true
```

* **封装变量，收敛权限**

## 第 4 章 JS 基础知识（下）

JS的三座大山：

* 原型和原型链
* 作用域和作用域链
* 异步和单线程

### 前端使用异步的场景

* 定时任务：setTimeo、setInterval
* 网络请求：ajax、动态`<img>`加载
* 事件绑定：DOM事件
* Promise

### 同步和异步的区别

* 同步会阻塞代码执行，而异步不会
* alert是同步，setTimeout是异步

### 日期

* `Date.now()` 获取当前时间从19700101开始到现在的毫秒数
* 获取2018-04-22格式的日期

```js
var dt = new Date
var yeae = dt.fetFullYear()
var month = get.getMonth() + 1
var day = dt.getDate()
// 省略补0的代码
```

### 数组API

* `forEach` 遍历所有数组元素 `(item, index)`
* `every` 判断所有元素是否都符合条件
* `some` 判断是否有至少一个元素符合条件
* `sort` 排序
* `map` 对元素重新组装，生成新数组
* `filter` 过滤符合条件的元素

### 对应API

* `for(key in obj)`

```js
// 获取随机数，要求长度一致的字符串格式
var random = Math.random()
random = random + '0000000000' // 后面加10个零
random = random.slice(0, 10)
console.log(random)

// 写一个能遍历对象和数组的forEach函数
function forEach(obj, fn) {
  var key
  if (obj instanceof Array) { // 判断是不是数组
    obj.forEach(function(item, index) {
      fn(item, index)
    })
  } else { // 不是数据就用
    for (key in obj) {
      if(obj.hasOwnPropery(key)) {
        fn(key, obj[key]) // 原型链上的属性不遍历
      }
    }
  }
}
```

## 第 5 章 JS-Web-API（上）

JS基础知识(语法)：Standard ECMA-262，它定义什么变量类型、原型、作用域和异步。
JS-Web_API：W3C标准，但W3C标准没有规定任何Js基础相关的东西，只管定义用于浏览器中JS操作页面的API和全局变量。

* 例如获取元素document.getElementById(id)，浏览器需要：
  * 要定义一个document全局变量，对象类型；
  * 还给它定义一个getElementById的属性，属性值是一个函数

* 我们常说的JS(浏览器执行的JS)包含两部分：
  * JS基础知识(ECMA262标准)
  * JS-Web-API(W3C标准)

### DOM

Document Object Model

DOM可以理解为：浏览器把拿到的html代码，树形结构化一个浏览器可以识别并且js可以操作的一个模型而已。

* 获取DOM元素
* property
* attribute

```js
// 获取DOM元素
var pList = document.querySelectorAll('p')
var p =pList[0]

// property
console.log(p.nodeName)

// attribute
p.getAttribute('data-name')
p.setAttribute('data-name', 'jerry')
p.getAttribute('style') // img的src等
p.setAttribute('style', 'font-size:30px;')
```

### DOM结构操作

* 新增节点
* 获取父元素
* 获取子元素
* 删除节点

* DOM是哪种基本的数据结构
  * 树 tree

* DOM操作的常用API有哪些
  * 获取DOM节点，以及节点的property和attribute
  * 获取父节点，获取子节点
  * 新增节点，删除节点
  * property 只是一个js对象的属性的修改
  * attribute 是对html标签属性的修改

### BOM

* navigator
* screen
* location
* history

```js
// navigator
var ua = navigator.userAgent
var isChrome = ua.indexOf('Chrome')

// screen
console.log(screen.width)
console.log(screen.heigth)

// location
console.log(location.href)
console.log(location.protocol)
console.log(location.search)

// history
history.back()
history.forward()
```

## 第 6 章 JS-Web-API（下）

* 事件代理：用dom2级事件绑定，判断e.target.nodeName/id 之类的确定响应元素。
  * 代码简洁
  * 减少浏览器内存占用

todo：完善通用绑定事件的函数

## 第 7 章 开发环境

## 第 8 章 运行环境

[1]: http://ofx24fene.bkt.clouddn.com//img/blog/prototype.png
[2]: http://ofx24fene.bkt.clouddn.com//img/blog/eg1.png
