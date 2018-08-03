# Javascript 设计模式系统讲解与应用

    面试敲门砖、进阶垫脚石、设计有模式、代码更合理

## 第2章 面向对象

### 2-1 搭建开发环境

`npm init`

`npm i webpack webpack-cli --save-dev`

```js
//add webapck.dev.config.js file
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  }
}
```

```bash
# package.json
"dev": "webpack --config ./webpack.dev.config.js --mode development"
```

`npm i webpack-dev-server html-webpack-plugin -D`

```js
// webapck.dev.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, './release'), // 设置根目录
    open: true,  // 自动打开浏览器
    port: 9000
  }
}
```

`"dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"`

支持babel `npm i babel-core babel-loader babel-polyfill babel-preset-es2015 babel-preset-latest -D`

新增babel配置文件 `.babelrc`

```json
{
    "presets": ["es2015", "latest"],
    "plugins": []
}
```

再次修改webpack.config.js

```js
// 新增module
module: {
  rules: [{
    test: /\.js?$/,  // 我们要去检验哪些文件
    exclude: /(node_modules)/,  // 跳过哪些文件
    loader: 'babel-loader'  // 使用的loader
  }]
},
```

### 2-2 什么是面向对象

### 2-3 面向对象-继承

### 2-4 面向对象-封装

### 2-5 面向对象-多态

### 2-6 面向对象-应用举例

### 2-7 面向对象-总结

### 2-8 UML类图1-介绍

### 2-9 UML类图2-关系

### 2-10 总结

## 第3章 设计原则

### 3-1 设计原则-介绍

### 3-2 设计原则-何为设计

### 3-3 设计原则-5大原则

    S O L I D 五大设计原则

* S - 单一责任原则
* O - 开放封闭原则
* L - 里氏替换原则
* I - 接口独立原则
* D - 依赖倒置原则

#### 单一责任原则

* 一个程序只做好一件事
* 如果功能过于负责就拆分，每个部分保持独立

#### 开放封闭原则

* 对扩张开发，对修改封闭
* 增加需求时，扩张新代码，而非修改已有代码
* 这个是软件设计的终极目标

#### 里氏替换原则

* 子类能覆盖父类
* 父类能出现的地方子类就能出现
* JS中使用较少(弱类型&继承使用较少)

#### 接口独立原则

* 保持接口的单一独立，避免出现 “胖接口”
* JS中没有接口(typescript例外)，使用较少
* 类似于单一职责原则，这里更关注接口

### 依赖倒置原则

* 面向解扣子编程，依赖于抽象而不依赖于具体
* 使用方只关注接口而不关注具体类的实现
* JS中使用较少

#### 设计原则总结

* S O 体现较多，详细介绍
* LID 体现较少，但是要了解其用意

#### 用Promise来说明 S-O

```js
function loadImg(src) {
  var promise = new Promise(function(resolve, reject) {
    var img = document.createElement('img)
    img.onload = function () {
      resolve(img)
    }
    img.onerror = function () {
      reject('图片加载失败')
    }
    img.src = src
  })
  return promise
}

var src = 'https://www.imooc.com/static/img/index/logo.png'
var result = loadImg(src)

result.then(function (img) {
  console.log('img.width', img.width)
  return img
}).then(function (img) {
  console.log('img.height', img.height)
}).catch(function (err) {
  console.error(err)
})
```

* 单一职责原则：每个 then 中的逻辑只做好一件事
* 开放封闭原则：如果新增需求，扩展then
* 对扩展开发，对修改封闭

### 3-4 用promise演示

> 就是3-3的代码

### 3-5 设计模式简介

从设计到模式

体会什么是设计？设计是设计，模式是模式，两者是分离的。

该如何学习设计模式？

* 明白每个设计的道理和用意
* 通过经典应用体会它的真正使用场景
* 自己编码时多思考，尽量魔模仿

### 3-6 23种设计模式介绍

其实设计模式大致分为三种类型：

* 创建型
* 组合型
* 行为型

这23种设计模式分别分散在这三种类型中。

#### 创建型

* 工厂模式(工厂方法模式、抽象工厂模式、建造者模式)
  * 工厂模式是讲怎么面向对象、怎么创建对象、怎么生成
* 单例模式
  * 单例模式是讲如果这个系统中只有一个指定对象，那么出现第二个时，该怎么办
* 原型模式
  * 原型模式是讲如何通过一个现有的对象，用拷贝的方式来生成另一个新的对象

#### 结构型

* 适配器模式
* 装饰器模式
* 代理模式
* 外观模式
* 桥接模式
* 组合模式
* 享元模式

#### 行为型

* 策略模式
* 模板方法模式
* ★观察者模式★
* 迭代器模式
* 职责链模式
* 命令模式
* 备忘录模式
* ★状态模式★
* 访问者模式
* 中介模式
* 解释器模式

#### 如何讲解设计模式

* 介绍和举例(生活中易理解的示例)
* 画UML类图写demo代码
* 结合经典应用场景，讲解该设计模式如何被使用

### 3-7 面试真题1

* 打车时，可以打专车或者快车。任何车都有车牌号和名称
  * 解析：需设计公共父类(车牌号和名称)，父类下又有两子类(专车和快车))
* 不同车价格不同，快车每公里1元，专车每公里2元
  * 解析：子类里有不同的价格
* 行程开始时，显示车辆信息
  * 行车和车有关系，但和专车还是快车没关系。所以我们需要依赖抽象编程，所以行程只和车有关系，不和具体哪种车有关，也就是说无论什么车都有行车信息
  * 所以我们需要再建一个"行程"的类，这个类引用车的某个属性，我们可以通过这个属性得到车的信息(车牌号、名称、单价)
* 行程结束时，显示打车金额(假定行程就5公里)
  * “金额”属于行程。买了一万辆车丢着是没有行程金额的

UML类图

![uml01](http://cdn.jerryshi.com/picgo/20180803221439.png)

```js
class Car {
  constructor(number, name) {
    this.number = number
    this.name = name
  }
}

class Kuaiche extends Car {
  constructor(number, name) {
    super(number, name)
    this.Price = 1
  }
}

class Zhuanche extends Car {
  constructor(number, name) {
    super(number, name)
    this.Price = 2
  }
}

class Trip {
  constructor(car) {
    this.car = car
  }

  start() {
    console.log(`行程开始，名称：${this.car.name}，车牌号：${this.car.Price}`)
  }

  end() {
    console.log(`行程结束，价格：${this.car.Price * 5}`)
  }
}

let car = new Kuaiche('101', '捷达')
let trip = new Trip(car)
trip.start()
trip.end()
```

### 3-8 面试真题2

* 某停车场，分3层，每层100车位
  * 解析：三个类，分别是停车场、每层、车位，三个class
* 每个车位都能监控到车辆的驶入和离开
  * 解析：我们要给车位这个类定义一个方法或者属性来监控车辆驶入和离开，这个监控的方法要改变车位这个类的一个状态，车位空不空
* 车辆进入前，显示每层的空余车位数量
  * 解析：车辆进入前肯定面对的是停车场这个类，所以这个信息要在停车场这个类中释放出来，所以我们加一个方法，动态计算显示每一层(每一层都是一个类的实例)空车位，所以层这个类里还得加显示空车位的方法，最终由停车场这个类累加后显示
* 车辆进入时，摄像头可以识别车牌号和时间
  * 解析：还得加摄像头的class，这个class有方法能识别出车牌号和记录驶入时间，也就是说摄像头这个类，输入的是车的实例，输出车牌号和时间，这个车牌号和时间要让停车场那个类里去存，所以停车场这个类还得加车辆列表的属性
* 车辆出来时，出口显示器显示车牌号和停车时长
  * 解析：还得加显示器的类，通过显示器拿到车牌号和记录的驶入时间，然后用当前时间减去这个事件就拿到了停车时长

![uml02](http://cdn.jerryshi.com/picgo/20180803223836.png)

TODO: 补代码

### 3-9 总结

## 第4章 工厂模式

### 4-1 工厂模式-介绍

原理

* 将 `new` 操作单独封装
* 遇到 `new` 时，就要考虑是否该使用工厂模式

示例

* 你去购买汉堡，直接点餐、取餐，不会自己亲手做
* 商店要 “封装” 做汉堡的工作，做好直接给顾客

![uml03](http://cdn.jerryshi.com/picgo/20180803230323.png)

场景

* `jQuery - $('div')`
* `React.createElement`
* `vue异步组件`

#### React.createElement

![react1](http://cdn.jerryshi.com/picgo/20180803231325.png)


### 4-2 工厂模式-演示和场景

## 第5章 单例模式

### 5-1 单例模式-介绍

### 5-2 单例模式-演示

### 5-3 单例模式-场景和总结

## 第6章 适配器模式

### 6-1 适配器模式-介绍

### 6-2 适配器模式-演示

### 6-3 适配器模式-场景

## 第7章 装饰器模式

### 7-1 装饰器模式-介绍

### 7-2 装饰器模式-场景1

### 7-3 装饰器模式-场景2(装饰类和方法)

### 7-4 装饰器模式-场景3和总结

## 第8章 代理模式

### 8-1 代理模式-介绍和演示

### 8-2 代理模式-场景1(事件代理和jq的proxy)

### 8-3 代理模式-场景2(明星经纪人)

### 8-4 代理&适配器&装饰模式对比

## 第9章 外观模式

### 9-1 外观模式

## 第10章 观察者模式

### 10-1 观察者模式-介绍和演示

### 10-2 观察者模式-场景1jquery

### 10-3 观察者模式-场景2NodeJs自定义事件

### 10-4 观察者模式-其它场景

## 第11章 迭代器模式

### 11-1 迭代器模式-介绍

### 11-2 迭代器模式-演示

### 11-3 迭代器模式-场景1(ES6 Iterator)

### 11-4 迭代器模式-场景2

### 11-5 迭代器模式-代码演示和总结

## 第12章 状态模式

### 12-1 状态模式-介绍和演示

### 12-2 状态模式-场景1(有限状态机)

### 12-3 状态模式-场景2(写一个promise)

## 第13章 其他设计模式

### 13-1 其他设计模式概述

### 13-2 原型模式

### 13-3 桥接模式

### 13-4 组合模式

### 13-5 享元模式

### 13-6 策略模式

### 13-7 模板方法模式和职责连模式

### 13-8 命令模式

### 13-9 备忘录模式

### 13-10 中介者模式

### 13-11 访问者模式和解释器模式

### 13-12 关于面试和日常使用

## 第14章 综合应用

### 14-1 综合应用-介绍和演示

### 14-2 综合应用-UML类图分析

### 14-3 综合应用-画UML类图

### 14-4 综合应用-代码基础环境

### 14-5 综合应用-实现List组件

### 14-6 综合应用-实现item&cart

### 14-7 综合应用-状态模式实现购物车操作

### 14-8 综合应用-实现购物车列表和折扣

### 14-9 综合应用-实现日志

### 14-10 综合应用-总结

### 第15章 课程总结
