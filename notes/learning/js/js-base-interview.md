# 前端JavaScript面试技巧

[TOC]

## 第1章 课程简介

## 第2章 JS基础知识（上）

```js
// 值类型 //
var a = 100
var b = a
a = 200
console.log(b) // 100

// 引用类型 //
var c = {age:20}
var b = a
b.age = 21
console.log(a.age)  // 21
```

引用类型包括：对象、数组、函数。引用类型可以无限制的扩展属性。

### typeof运算符

```js
typeof undefined // undefined
typeof 'abc'  // string
typeof 123  // number
typeof true  // boolean
typeof {}  // object
typeof []  // object
typeof null  // object
typeof console.log  // function
```

JavaScript中共有 6 种基本数据类型：Undefined、Null、Boolean、Number、String、Symbol

* 触发强制类型转换
  * 字符串拼接
  * == 运算符 `null == undefined // true`
  * if 语句
  * 逻辑运算 把变量强制转换为Boolean `!!a`

何时用===和==

`if(obj.a == null){} // 等于 obj.a === null || obj.a === undefined`

也就是说，除了想判断某对象属性是否为null时用==，其它场景都用===

### JS中的内置函数

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

### 如何理解JSON

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
for(key in obj) {
    if(f.hasOwnProperty(item)) {
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
    this.eat = function() {console.log('animal eat')}
}
function Dog() {
    this.bark = function() {console.log('dog bark')}
}

Dog.prototype = new Animal()

var xiaobai = new Dog()
```

原型链继承核心就是在子类的构造函数的显示原型上实例化一个父类的实例对象

#### 描述new一个对象的过程

* 创建一个新对象
* this指向这个新对象
* 执行代码，即对this赋值
* 返回this

阅读源码是高效提高技能的方式
但不能“埋头苦钻”有技巧在其中

#### 写一个用原型继承封装DOM查询的例子

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

## 第3章 JS基础知识（中）

### 执行上下文

```js
// 执行上下文
console.log(a) // undefined
var a = 100
// 完美体现了js预解释
fn('jerry') // jerry 20
function fn(name) {
    age = 20
    console.log(name,age)
    var age
}
```

* 范围：一段`<script>`或者一个函数
* 全局：变量定义、函数声明
* 函数：变量定义、函数声明、this、arguments

### this

* this要在执行时才能确认值，定义时无法确认
* 作为构造函数执行
* 作为对象属性执行
* 作为普通函数执行 --> 指向window
* call apply bind

## 第4章 JS基础知识（下）




## 第5章 JS-Web-API（上）




## 第6章 JS-Web-API（下）




## 第7章 开发环境




## 第8章 运行环境



[1]: http://ofx24fene.bkt.clouddn.com//img/blog/prototype.png
[2]: http://ofx24fene.bkt.clouddn.com//img/blog/eg1.png
