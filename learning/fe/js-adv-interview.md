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