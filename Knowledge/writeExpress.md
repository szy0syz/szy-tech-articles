# 来吧，一起撸一套简仿的express框架

[TOC]

> Express - 基于 Node.js 平台的 web 应用开发框架。为了更好的了解Express运行原理和向偶像TJ大神致敬，撸撸Expres的源码再好不过了。

## 第00节 原生node web应用

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

## 第01节 初代connect中间件

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

///////////////////////////////

////////app.js/////////
var http = require('http');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var connect = require('./connect');
var articles = {
  1: '第一篇文章的详情',
  2: '第二篇文章的详情',
  3: '第三篇文章的详情'
}

var app = connect();
app.use(function (req, res, next) {
  var urlObj = url.parse(req.url, true)
  // 为方便使用者在req中添加两个属性
  req.path = urlObj.pathname;
  req.query = urlObj.query;
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
  console.log('Server is running on %d port.', 8080);
});
//////////////////////////
```

- 构建connect模块后，使用app.use()方式顺序创建中间件；而当客户端请求接收时，按创建的顺序依次执行中间件
- demo中第一个中间件是设置req公有属性后调用next()方法将流程转交下一个中间件
- 第二个中间件是给res设置公有方法且调用了next()移交控制权
- 第三个中间件是路由中间件，在其中通过第一个中间件设置的公有属性path判断路由进行相应处理

----------

## 第02节 提取非业务中间件

- 我们将为req和res封装属性的中间件单独提取出来，取名为middle.js。
    - req封装属性有：`req.path` 和 `req.query`
    - req封装属性有： `res.send()`

```js
// middle.js
var url = require('url');

module.exports = function (app) {
    app.use(function (req, res, next) {
        var urlObj = url.parse(req.url, true);
        var pathname = urlObj.pathname;
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
}

//////////////////////////////////

// 在main.js中使用时需传入app实例
require('./2.middle')(app);
```

----------

## 第03节 在connect类新增listen()方法

Express不是带了个app.listen()方法听方便的，我们也整一个。对了，记得返回实例，要链式编程不是嘛。

```js
// connect.js: 新增 listen() 创建并启动服务
proto.listen = function (port, callback) {
  console.log(this);
  var server = http.createServer(this); 
  return server.listen(port,callback);  // app.listen(8080) -> this == app
}

//////////////////////////////////

// main.js: 使用listen()方法
app.listen(8080, function() {
  console.log('Server in running on %d port.' ,8080);
})
```

----------

## 第04节 构建路由

看看业务核心函数中的逻辑判断，我也是醉了，赶紧操刀改造吧！

```js
if (req.path === '/') {
    ...
} else if (req.path === '/articles') {
    ...
} else {
    ...
}
```

1. 在connect.js中的use方法下手(后续会再次升级)，原来只能传入一个参数，现在我们升级成能传入两个参数`route`和`fn`
2. use()方法中判断第一个参数传的是路由不，不是就当纯中间件处理，且推入stack存储时要存俩个参数了

```js
proto.use = function (route, fn) {
  var handle = fn;
  var path = route;
  // 那就说明没传路由，视为中间件
  if (typeof route !== 'string') {
    // 那么就让第一个参数等于handle
    handle = route;
    // 默认为根目录
    path = '/';
  }
  this.stack.push({ handle: handle, path: path });
}

proto.handle = function (req, res) {
  var stack = this.stack;
  var index = 0;
  function next() {
    var layer = stack[index++];
    var route = layer.path;
    var handle = layer.handle;

    var path = url.parse(req.url).pathname;
    // 用startsWith有bug，后面二次改造
    if (path.startsWith(route)) {
      // 调用中间件
      handle(req, res, next);
    } else {
      next();
    }
  }
  next();
}
```

----------

## 第05节 构建路由中间件

经改造路由后，提出很啰嗦的业务代码

```js
///////////route.js//////////////
module.exports = function (app) {
    ///////测试数据/////////
    var articles = {
        1: '第一篇文章的详情',
        2: '第二篇文章的详情',
        3: '第三篇文章的详情'
    }
    ///////////////////////

    app.use('/list', function (req, res) {
        res.send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
    })

    app.use('/article', function (req, res) {
        res.send(articles[req.query.id]);
    })

    app.use(function (req, res) {
        res.end('404');
    })
}

///////////app.js//////////
// 精简后的app.js好舒爽
var app = connect();

require('./middle')(app);
require('./route')(app);

http.createServer(app).listen(8080, function () {
  console.log('Server is running on %d port.', 8080);
});
```

----------

## 第06节 模板引擎

- 定义：模板引擎是为了使用户界面与业务数据分离而产生的，用于网站的模板引擎就会生成一个标准的HTML文档
- 原理：置换型模板引擎是将指定模板内容(字符串)中的特定标记(子字符串)替换一下便生成了最终需要的业务数据(比如网页)
- 要求：
  - 读模板文件
  - 遇到`<% ... %>`视作为可执行JavaScript代码 
  - 遇到`<%= ... %>`则输出JavaScript表达式的文本值
- 流程：
  1. 创建`render.js`，写成中间件模式，给res上新增属性`render`
  2. 在`app.js`注册该中间件
  3. 获取数据，在返回前用`res.render()`输出模板
- 备注：
  - 实现参考了阮一峰es6书中的demo

```js
///// render.js
var fs = require('fs');

module.exports = function redner(app) {
  app.use(function(req, res, next) {
    res.render = function(filename, obj) {
      fs.readFile(filename, 'utf8', function(err, str) {
        res.send(compile(str, obj));
      });
    }
    next(); // 继续下一个中间件
  });
}

function compile(template, obj) {
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;

  template = template // 这里预置替换内容中$表示正则匹配的到索引为1的字符串,其实也就是表达式
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  var script =
    `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return eval(script)(obj);
}

////////注册模板引擎
require('./render')(app);

////////使用模板引擎
res.render('./index.szy', { articles: articles })
```

- 创建模板

```html
<!-- filename: index.szy -->
<ul>
    <% for(var i=0; i < data.articles.length; i++) { %>
        <li>
            <a href="/article?id=<%= data.articles[i].id %>">
                <%= data.articles[i].title %>
            </a>
        </li>
    <% } %>
</ul>
```

- 修改路由文件

```js
///////测试数据/////////
var articles = [
  {
    id: 1,
    title: '第一篇文章',
    detail: '第一篇文章内容在此'
  },
  {
    id: 2,
    title: '第二篇文章',
    detail: '第二篇文章内容在此'
  },
  {
    id: 3,
    title: '第三篇文章',
    detail: '第三篇文章内容在此'
  }
];
///////////////////////

app.use('/list', function (req, res) {
  res.render('./index.szy', { articles: articles })
})

app.use('/article', function (req, res) {
  res.send(articles[req.query.id - 1].detail);
})
```

----------

## 第07节 改造路由，修复Bug

> 原来路由不能匹配首页`/`，现在通过在注册中间件时添加`isRoute`属性，如果为路由中间件再进行一次判断

```js
proto.use = function (route, fn) {
  var handle = fn;
  var path = route;
  var isRoute = true;
  // 如果第一个参数不是字符串，那么可能是函数。
  // 那就说明没传路由，直接传业务操作函数，其实就是404操作之类的
  if (typeof route !== 'string') {
    // 那么就让第一个参数等于handle
    handle = route;
    // 默认为根目录
    path = '/';
    // 功能型中间件不是路由
    isRoute = false;
  }
  this.stack.push({ handle: handle, path: path, isRoute: isRoute });
}

proto.handle = function (req, res) {
  var stack = this.stack;
  var index = 0;
  function next() {
    var layer = stack[index++];
    var route = layer.path;
    var handle = layer.handle;
    var isRoute = layer.isRoute;
    // 如果handle不是函数就置空指针
    handle = typeof handle === 'function' ? handle : null;

    var path = url.parse(req.url).pathname;

    // 关于路由的匹配，不管req还是res都要走一遭
    if (path.startsWith(route)) {
      if (isRoute) {
        // 如果是路由型中间件值再比较一次且不再执行后续的路由中间件
        if(path === route) {
          handle(req, res, null);
        } else {
          next();
        }
      } else {
        handle(req, res, next);
      }
    } else {
      next();
    }
  }
  next();
}
```

----------