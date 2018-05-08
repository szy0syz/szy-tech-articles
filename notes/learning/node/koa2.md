# Koa2框架从0开始构建预告片网站

[TOC]

## 第1章 2018 年的编程姿势

### 1-3 毫不犹豫的使用promise

* `https://www.promisejs.org/`
* promise不是简单的语法糖，而是一个设计规范，有着各种各样的库去实现这套规范，进而向我们提供Promise接口能力的函数。

## 第2章 必会 ES6-7 语法特性与规范

* 箭头函数：跟父作用域共享this

```js
// 箭头函数经典栗子
const jerry = {
    age: 18,
    say: function () {
        setTimeout(function () {
            console.log('age: ', this.age)
        }, 500)
    },
    sayWithThis: function () {
        let _this = this
        setTimeout(function () {
            console.log('_this age: ', _this.age)
        }, 1000)
    },
    sayWithArrow: function () {
        setTimeout(() => {
            console.log('arrow age: ', this.age)
        }, 1500)
    },
    sayWithGlobalArrow: () => {
        setTimeout(() => {
            console.log('global arrow age: ', this.age)
        }, 2000) // --> global arrow age:  undefined
    }
}
```

### 这些年JavaScript处理异步的几个阶段

第一阶段：`callback`

```js
function readFile (cb) {
  fs.readFile('../package.json', (err, data) => {
    if (err) return cb(err)

    cb(null, data)
  })
}

readFile((err, data) => {
  if (!err) {
    data = JSON.parse(data)

    console.log(data.name)
  }
})
```

第二阶段：`promise`

```js
function readFileAsync (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

readFileAsync('../package.json')
  .then(data => {
    data = JSON.parse(data)

    console.log(data.name)
  })
  .catch(err => {
    console.error(err)
  })
```

第三阶段：`co + Generator + Promisify`

```js
co(function *() {
  let data = yield util.promisify(fs.readFile)('../package.json')

  data = JSON.parse(data)

  console.log(data.name)
})
```

第四阶段：`async`

```js
const readAsync = util.promisify(fs.readFile)

async function init () {
  let data = await readAsync('../package.json')

  data = JSON.parse(data)

  console.log(data.name)
}

init()
```

一开始我没明白`co+generator+promise`是什么意思，后来发现原来co是把函数暂停了异步的结果，等到异步结果出来后再去执行后续的代码。

### babel环境配置与import、export、async和await

配置babel环境

* `npm i -D babel-cli babel-preset-env`
* add `.babelrc`

`ReferenceError: regeneratorRuntime is not defined` 重新配置babel

* `npm i -S babel-plugin-transform-runtime babel-runtime`
* 修改 `.babelrc`

## 第3章 层层学习 Koa 框架的 API

## 第4章 Koa2 与 Koa1 、Express 框架对比

## 第5章 从 0 开发一个电影预告片网站

## 第6章 利用爬虫搞定网站基础数据

## 第7章 彩蛋篇 - [高难度拔高干货] 深度理解 Node.js 异步 IO 模型

## 第8章 实战篇 - 在 Koa 中向 MongoDB 建立数据模型

## 第9章 实战篇 - 为网站增加路由与控制器层对外提供 API 服务

## 第10章 实战篇 - 集成 AntDesign 与 Parcel 打通前后端与构建

## 第11章 实战篇 - 实现网站前端路由与页面功能

## 第12章 实战篇 - 实现后台登录权限与管理功能

## 第13章 服务器部署与发布

## 第14章 课程总结与展望
