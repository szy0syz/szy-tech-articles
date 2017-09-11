# 来吧，一起撸一套简仿的express框架

[TOC]

> Express - 基于 Node.js 平台的 web 应用开发框架。为了更好的了解Express运行原理和向偶像TJ大神致敬，撸撸Expres的源码再好不过了。

## 第0节 原生node web应用

- 业务需求
  - 路径`/`为首页，发送html代码，
  - 路径`/artcile`为文字详情页，需解析请求参数后返回不同内容
  - 其余均返回404字符到客户端

```js
var http = require('http');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var articles = {
  1: '第一篇文章的详情',
  2: '第二篇文章的详情',
  3: '第三篇文章的详情'
}

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;

  if (pathname === '/') {
    send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
  } else if (pathname === '/article') {
    send(articles[query.id]);
  } else {
    res.end('404');
  }

  // 公共方法
  function send(data) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(data);
  }

}).listen(8080, function () {
  console.log('server is running...');
});
```

----------

## 第1节 初代connect中间件

- 升级1：
  - 创建connect模块，负责处理创建Express应用实例；
  - 在模块中，导出createServer()方法，作为新建实例的构造方法，其内部定义app函数传入`req和res`并返回该函数地址，且app函数内运行handle()方法；
  - 在模块中，定义stack数组，按顺序存放所有中间件；
  - 在模块中，创建`use()`和`handle()方法`，前者用来添加中间件，后者用来调用中间件；

```js
////////connect.js/////////
var http = require('http');
var proto = {};

function createServer() {
  function app(req, res) {
    app.handle(req, res);
  }
  // 把proto对象的属性拷贝到app中一份
  Object.assign(app, proto);
  app.stack = [];
  return app;
}

proto.use = function(handle) {
  this.stack.push(handle);
}

proto.handle = function (req, res) {
  var stack = this.stack;
  var index = 0;
  function next() {
    stack[index++](req, res,next);
  }
  next();
}

module.exports = createServer;
///////////////////////////


////////app.js/////////
var http = require('http');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var connect = require('./2.connect');
var articles = {
  1: '第一篇文章的详情',
  2: '第二篇文章的详情',
  3: '第三篇文章的详情'
}

var app = connect();
app.use(function (req, res, next) {
  var pathname = url.parse(req.url, true).pathname;
  var query = urlObj.query;
  // 为方便使用者在req中添加两个属性
  req.path = pathname;
  req.query = query;
  next();
});

app.use(function (req, res, next) {
  // 给res添加一个业务方法
  res.send = function (data) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(data);
  }
  next();
});

app.use(function(req, res) {
  if (req.path === '/') {
    res.send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
  } else if (req.path === '/article') {
    res.send(articles[req.query.id]);
  } else {
    res.end('404');
  }
})

var server = http.createServer(app);

server.listen(8080, function () {
  console.log('server is running...');
});
//////////////////////////
```

- 构建connect模块后，使用app.use()方式顺序创建中间件；而当客户端请求接收时，按创建的顺序依次执行中间件
- demo中第一个中间件是设置req公有属性后调用next()方法将流程转交下一个中间件
- 第二个中间件是给res设置公有方法且调用了next()移交控制权
- 第三个中间件是路由中间件，在其中通过第一个中间件设置的公有属性path判断路由进行相应处理

----------

## 第二节 提取非业务中间件


