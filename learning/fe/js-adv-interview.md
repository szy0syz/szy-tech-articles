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

  * 异步问题
    * 一、没按照书写方式执行，可读性差
    * 二、callback中不容易模块化

* 问题解答：
  * 单线程就是同时制作一件事，两段JS代码不能同时执行
  * 原因就是为了避免DOM渲染的冲突
  * 异步是一种 “无奈” 的解决方案，虽然有很多问题

### event loop

* 事件轮询，JS实现异步的具体解决方案
* 同步代码，直接执行
* 异步函数先放在 异步队列 中
* 待同步函数执行完毕，轮询执行 异步队列 的函数

> 主进程按顺序执行，看到异步操作就加入异步队列，待主进程代码执行完毕，就去弹异步队列里的调用栈到主进程里去执行。JS引擎会一直监视着异步队列中有没有内容，一旦有了就要执行。

### jQuery的Deferred

![jq1](http://cdn.jerryshi.com/picgo/20180804143227.png)
![jq2](http://cdn.jerryshi.com/picgo/20180804143310.png)
![jq3](http://cdn.jerryshi.com/picgo/20180804143431.png)

jQuery 1.5的变化

* 无法改变 JS 异步和单线程的本质
* 只能从写法上杜绝 callback 这种形式
* 它是一种语法糖形式，但是解耦了代码
* 很好的体现：开放封闭原则(对扩展开放/对修改封闭)
* 以上图一的success回调函数里，如果我们想加个新逻辑，必须创建新回调来替换原来的回调，这就是对修改开放，对扩展封闭。还可以节省回归测试的工作。

```js
var wait = function () {
    var task = function () {
        console.log('执行完成')
    }
    setTimeout(task, 2000)
}
wait()
```

使用jQuery Deferred

```js
function waitHandle() {
    var dtd = $.Deferred()

    var wait = function (dtd) {
        var task = function () {
            console.log('执行完成')
            dtd.resolve()  // 表示异步任务执行完毕
            // dtd.reject() // 表示异步任务执行失败
        }
        setTimeout(task, 2000)
        return dtd
    }

    // 注意，这里一定要有返回值
    return wait(dtd)
}

var w = waitHandle()
w
  .then(function () {console.log('ok1')}, function() {console.log('err1')})
  .then(function () {console.log('ok2')}, function() {console.log('err2')})
```

相当于我们对 `dtd` 进行一系列加工后最终返回出去

总结

* dtd的API可以分为两类，用意不同
* 第一类：dtd.resolve dtd.reject
* 第二类：dtd.then dtd.done dtd.fail

promise和deferred区别

* deferred对象有 dtd.resolve dtd.reject api可以外界主观修改执行结果
* promise对象只能被动监听，不能主动篡改

> 要想深入理解它，就需要知道它的前世今生

### promise

#### 异常捕获

> then 只接受一个参数，最后统一用 catch 捕获异常

```js
result.then(img => {
    console.log(img.width)
}).then(img => {
    console.log(img.heiht)
}).catch(err => {
    console.error(err)
})
```

#### 多个串联

```js
var src1 = 'http://baidu.com/logo1.png'
var res1 = loadImg(src1)
var src2 = 'http://baidu.com/logo2.png'
var res2 = loadImg(src2)

// 链式操作
// 我们在链式操作中，第一个异步结果处理完成后返回第二个异步结果
res1.then(img => {
    console.log('第一个图片加载完成')
    return res2
}).then(img => {
    console.log('第二个图片加载完成')
}).catch(err => {
    console.error(err)
})
```

#### all 和 race

```js
// Promise.all 接收一个 promise 对象的数组
// 待全部完成之后，统一执行 success
Promise.all([res1, res2]).then(data => {
    // 接收到的 data 是一个数组，依次包含了多个 promise 返回的内容
    console.log(data[0])
    console.log(data[0])
})

// Promise.race 接收一个包含多个 promise 对象的数组
// 只要有一个完成，就执行 success
Promise.all([res1, res2]).then(data => {
    // data 即最先执行完成的 promise 的返回值
    console.log(data)
})
```

#### Promise标准

* 关于“标准”的闲谈
  * 任何技术推广使用都需要一套标准来支撑
  * 如 html js css http 等，无规矩不成方圆
  * 任何不符合标准的东西，终将会被用户抛弃
  * 不要挑战标准，不要自造标准

* 状态变化
  * 三种状态：pending、fulfilled、rejected
  * 初始状态就是pending
  * pending只能变为fulfilled，或者pending变为rejected，二选一
  * 状态变化不可逆

* then
  * Promise 实例必须实现then这个方法
  * then() 必须可以接收两个函数作为参数
  * then() 返回的必须是一个Promise实例

### async/await

* Promise的then函数只是将callback拆分了
* async/await是最直接的同步写法
* 我们一直在解决单线程异步的写法，所以async/await就是写法的解决方案
* 使用await，函数必须用async标识
* await后面跟的是一个Promise实例
* 需要用babel-polyfill
* 还是使用Promise，并没有和Promise冲突
* 完全是同步的写法，再也没有回调函数
* 但是，改变不了JS单线程、异步的本质

## 第6章 mvvm和vue

* 数据和视图的分离(解耦，开放封闭原则)，
* 以数据驱动视图，只关心数据变化，DOM操作被封装

### 对MVVM的理解

* MVC：Model、View、Controller
* MVVM
* ViewModel：用来连接Model和View

![mvc](http://cdn.jerryshi.com/picgo/20180804213343.png)

* MVVM不算是一种创新
* 只能算在MVC基础上的微创新
* 真正结合前端场景应用的创建

> view  可以通过 事件绑定 的形式影响 model
> model 可以通过 数据绑定 的形式改变 view

### Vue三要素

* 响应式：vue 如何监听到 data 的每个属性变化？
* 模板引擎：vue 的模板如何被解析，指令如何处理？
* 渲染：vue 的模板如何被渲染成 html？以及渲染过程

### Vue中如何实现响应式

> Vue中使用了Object.defineProperty

* 修改data属性后，vue立刻监听到
* data属性被代理到vm(this的一个属性)上

#### Object.defineProperty

```js
var obj = {
    name: 'jerry',
    age: 30
}
console.log(obj.name) // 获取属性的时候，如何监听到？
obj.name = 'jerry shi'          // 赋值属性的时候，如何监听到？
////////////////////////
var obj = {}
var name = 'jerry'
Object.defineProperty(obj, 'name', {
    get: function() {
        console.log('get')
        return name
    },
    set: function(newVal) {
        console.log('set')
        name = newVal
    }
})
console.log(obj.name)   // 可以监听到获取
obj.name = 'jerry2'     // 可以监听到修改
```

#### Vue响应式模拟实现

```js
var vm = {}
var data = {
    price: 99,
    title: 'book1',
    desc: 'good book'
}

var key, value
for (key in data) {
    // 创建闭包。新建一个函数，保证 key 的独立作用域
    (function(key) {
        Object.defineProperty(vm, key, {
            get: function() {
                console.log('get')
                return data[key]
            },
            set: function() {
                console.log('set')
                data[key] = newVal
            }
        }
    }
    })(key)
}
```

Vue的响应式

> Vue在实例化时，先拿到data不急着挂载到this上，而是遍历data这个对象拿到每一个key，然后把key传到一个IIFE中，里面用Object.defineProperty给vm对象分别挂载key属性，还声明get和set函数。这样外界在调用就能形成响应式，从计算机的角度来看，只要挂载上后的属性都是一个栈地址的指针，每次获取或调用都会去执行那个闭包里的get和set函数。

### vue中如何解析模板

![tmp](http://cdn.jerryshi.com/picgo/20180804222517.png)

#### 模板是什么

* 本质就是一堆字符串
* 但却有逻辑，如`v-if` `v-for`
* 与 html 格式很像，但有很大区别
* 但最终还要转换为 html 来显示
* 模板最终必须转换成JS代码，因为：
  * 模板有逻辑，必须用JS才能实现(图灵完备)
  * 模板转换为 html 渲染页面，必须用JS才能实现
  * 因此，模板最终还是会转换成一个JS函数(render函数)

#### render函数

![with](http://cdn.jerryshi.com/picgo/20180804223956.png)

在vue的render函数里，使用了with。

![render](http://cdn.jerryshi.com/picgo/20180804224459.png)

* 模板中所有信息都包含在了render函数中(包含id属性，p子元素)
* this 即 vm
* price 即 this.price 即 vm.price，即data中的price
* _c 即 this._c 即 vm._c

如何拿到任意组件的render函数？

* 传统方式引入vue
* 打开源码搜索 `code.render`
* 在return 前打印 `code.render` 即可

> Vue从2.0开始，已经支持预编译。即开发环境写模板，编译打包后，生产环境直接存render函数，这也就不需要浪费时间模板转render了。

从render渲染函数角度来看vue指令的v-on，其实就在render函数的on属性对象上加了一个监听input事件的函数，这个只要input值改动了就把 `$event.target.value` 赋值到 `this.title`

* 在render函数里 v-for 执行最终只会转换成 `_l(list)`，这个 `_l` 好比 `Array.map()` 函数

* 思考
  * v-model 怎么实现
  * v-on 怎么实现
  * v-for 怎么实现