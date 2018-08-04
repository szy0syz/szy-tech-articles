# 揭秘一线互联网企业 前端JavaScript高级面试

> BAT工程师讲解前端JS高级面试考点：虚拟DOM、Vue、React、Hybrid实现原理

## 第2章 ES6 语法

### ES6模块化如何使用，开发环境如何打包

* 模块化的基本语法
* 开发环境配置
* 关于JS众多模块化标准

```js
// export 语法

/* util1.js */
// 默认输出一个
export default {
    a: 100
}

/* util2.js */
export function fn1() {
    alert('fn1')
}
export function fn2() {
    alert('fn2')
}

/* index.js */
import util1 from './util1.js'
import { fn1, fn2 } from './util2.js'

console.log(util1)
fn1()
fn2()
```

开发环境 babel

* `npm i -D babel-core babel-preset-es2015 babel-preset-latest`
* add file `.babelrc`
* `npm i -g babel-cli`
* `babel -v`

开发环境 webpack

* `npm i webpack babel-loader -S`
* 配置 `webpack.config.js`
* 配置 `package` 中 `script`

开发环境 rollup

* 其优势在于只打包js代码，rollup更专业，它还能优化一点点js冗余代码
* `npm init`
* `npm i rollup rollup-plugin-node-resolve rollup-plugin-babel babel-plugin-external-helpers babel-preset-latest -D`
* add file `.babelrc`
* 配置 rollup.config.js
* 将webpack环境的js代码直接拷贝过来
* 修改 `package` 中 `script`
* rollup功能单一，webpack功能强大
* 工具要尽量功能单一，可集成，可扩展

### 关于JS众多模块化标准

* 没有模块化
* AMD 成为标准， require.js (也有 CMD)
* 前端打包工具，是nodejs模块化可以被使用
* ES6出现，想统一出现在所有模块化标准
* nodejs积极支持，浏览器尚未统一
* 你可以自造lib，但不是要自造标准！！！

ES6模块化如何使用，开发环境如何打包

* 语法：import export
* 环境：babel编译ES6语法，模块化可用webpack和rollup
* 扩展：说下自己对模块化标准统一的期待

### class和普通构造函数有何区别

JS构造函数语法

```js
function MathHandle(x,y) {
    this.x = x
    this.y = y
}

MathHandle.prototype.add = function () {
    return this.x + this.y
}

var m = new MathHandle(1,2)
console.log(m.add())
```

class语法

```js
class MathHandle {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add() {
        return this.x + this.y
    }
}

const m = new MatchHandle(1,2)
console.log(m.add())
```

以上两者其实就是两个语法糖，两者本质是一样的

```js
class MathHandle {}

typeof MathHandle // -> "function"
MathHandle === MathHandle.prototypt.constructor // -> true
```

* 这种语法糖形式，看起来和世纪缘里不一样的东西，我个人不太赞同
* 形式上强行模仿 Java、C#，却丢失了它的本性和个性

> 一个实例对象的隐式原型 全等于 它的构造函数(类)的显示原型

### JS继承

> 继承就是从抽象到具象的关系，从高级到低级的关系

```js
function Animal() {
    this.eat = function () {
        console.log('animal eat')
    }
}

function Dog() {
    this.bark = function () {
        console.log('dog bark')
    }
}

// 这里什么意思呢？
// 本来Dog.prototype原型是指向Object，现在我们把它原型替换成Animal的一个实例，最后还是指向Object的
Dog.prototype = new Animal()

// 哈士奇
var hashiqi = new Dog()
```

继承Class

```js
class Animal {
    constructor(name) {
        this.name = name
    }
    eat() {
        console.log(`${this.name} eat.`)
    }
}

class Dog extends Animal {
    constructor(name) {
        super(name)
        this.name = name
    }
    say() {
        console.log(`${this.name} say.`)
    }
}

const dog = new Dog('哈士奇')
dog.say()
dog.eat()
```

问题解答

* Class在语法上更加贴合面向对象的写法
* Class实现继承更加易读、易理解
* 更易于写java等后端语言的使用
* 本质还是语法糖，使用prototype

### Promise

```js
function loadImg(src) {
    const promise = new Prmoise(function (resolve, reject) {
        var img = document.create('img')
        img.onload = function () {
            resolve(img)
        }
        img.onerror = function () {
            reject()
        }
        img.src = src
    })
    return promise
}

var src = 'http://jerryshi.com/avater.png'
var result = loadImg(src)

result.then(function (img) {
    console.log(img.width)
}, function () {
    console.log('failed')
})

result.then(function (img) {
    console.log(img.height)
})
```

* new Promise 实例，而且要 return
* new Promise 时要传入函数，函数有resolve、reject两个参数
* 成功是执行resolve() 失败时执行 reject()
* then 监听结果
* catch 捕捉异常

### ES6其它常见功能

* let/const
* 多行字符串/模板变量
* 结构赋值
* 块级作用域
* 函数默认参数
* 箭头函数(解决全局函数this指向window)

## 第3章 原型

### zepto原型实现

```js
// 空对象
var zepto = {}

// 这就是构造函数
function Z(dom, selector) {
    var i, len = dom ? dom.length : 0
    for (i =0; i<len; i++) this[i] = dom[i]
    this.length = len
    this.selector = selector || ''
}

zepto.Z = function(dom, selector) {
    return new Z(dom, selector)
}

zepto.init = function (selector) {
    var slice = Array.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))

    return zepto.Z(dom, selector)
}

// 注册 zepto 的 $
var $ = function(selector) {
    return zepto.init(selector)
}

$.fn = {
    constructor: zepto.Z,
    css: function (key, value){},
    html: function (value){}
}

// Z的原型只是JS对象
zepto.Z.prototype = Z.prototype = $.fn
```

jQuery原型实现

```js
var jQuery = function (selector) {
    // 注意 new 关键字， 第一步就找到了构造函数
    return new jQuery.fn.init(selector)
}

var init = jQuery.fn.init = function (selector) {
    var slice = Arrar.prototype.slice
    var dom = slice.call(document.querySelectorAll(selector))

    var i, len = dom ? dom.length : 0
    for (i=0; i<len; i++) this[i] = dom[i]
    this.length = len
    this.selecotor = selector || ''
}

// 初始化 jQuery.fn
jQuery.fn = jQuery.prototype = {
    constructor: jQuery,

    css: function(key, value) {},
    html: function(value)
}

// 定义原型
init.prototype = jQuery.fn
```

为什么要把原型方法放在$.fn 对象上？

* 因为要扩展插件，做一个简单的插件例子

```js
$.fn.getNodeName = function () {
    return this[0].nodeName
}
```

* 这样就可以把 `getNodeName` 这个属性方法放在和 `jQuery.fn` 这个对象里，和 `css` `html`属性一个级别

好处

* 只有 `$` 会暴露在window 全局变量
* 将插件扩展统一到 $.fn.xxx 这个借口，方便使用

## 第4章 异步

* 什么是单线程，和异步有什么关系
* 什么是 event-loop
* 是否用过 jQuery 的 Deferred
* Promise的基本使用和原理
* 介绍async/await关系
* 当前JS解决异步的方案

### 什么是单线程，和异步有什么关系

* 单线程 - 同一只有一个线程，只能做一件事件
* 原因 - 避免 DOM 渲染的冲突
* 解决方案 - 异步：这是JS很无奈和高效的选择

在js代码中，循环运行期间，JS执行和DOM渲染都会卡顿
alert 不处理完，JS执行和DOM渲染暂时卡顿

* 避免 DOM 渲染的冲突
  * 绚烂器需要渲染DOM
  * JS可以修改DOM结构
  * JS执行时，浏览器DOM渲染会暂停。JS执行完，浏览器接着渲染
  * 两段JS也不能同时执行(都修改DOM就冲突了)
  * JS执行的线程和浏览器渲染线程都是同一个线程
  * webworkder支持多线程，但不能访问DOM