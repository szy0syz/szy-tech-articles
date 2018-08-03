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

### 3-5 设计模式简介

### 3-6 23种设计模式介绍

### 3-7 面试真题1

### 3-8 面试真题2

### 3-9 总结

## 第4章 工厂模式

### 4-1 工厂模式-介绍

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
