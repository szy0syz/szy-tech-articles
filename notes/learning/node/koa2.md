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

### Koa核心对象

```js
Koa           Epxress
======================
HTTP  接收  解析  响应
中间件      执行上下文

Application   Context
Request      Response
Middlewares
Session      Cookie
```

```js
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'Jerry Shi - ' + Date.now() 
})

app.listen(4441)
```

* Koa和Epxress一样，是一个Web服务框架，能够接收接收、解析和响应HTTP请求。
* Koa的全链路组合以后就是一个应用服务对象，这个对象内部有application、context、request、response、middlewares等对象。
* 上述代码中 `async` 、 `ctx` 、 `next` 、整个`app.use`传入的function `ctx.body` 各是什么？

### Koa源码之Application

```js
module.exports = class Application extends Emitter {
  constructor() {
    super();

    this.proxy = false;
    this.middleware = [];
    this.subdomainOffset = 2;
    this.env = process.env.NODE_ENV || 'development';
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  listen(...args) {
    debug('listen');
    const server = http.createServer(this.callback());
    return server.listen(...args);
  }

  /**
   * Use the given middleware `fn`.
   *
   * Old-style middleware will be converted.
   *
   * @param {Function} fn
   * @return {Application} self
   * @api public
   */

  use(fn) {
    this.middleware.push(fn);
    return this;
  }

  /**
   * Return a request handler callback
   * for node's native http server.
   */

  callback() {
    const fn = compose(this.middleware);
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn);
    };

    return handleRequest;
  }

  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }

  createContext(req, res) {
    const context = Object.create(this.context);
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this;
    context.req = request.req = response.req = req;
    context.res = request.res = response.res = res;
    request.ctx = response.ctx = context;
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url;
    context.cookies = new Cookies(req, res, {
      keys: this.keys,
      secure: request.secure
    });
    request.ip = request.ips[0] || req.socket.remoteAddress || '';
    context.accept = request.accept = accepts(req);
    context.state = {};
    return context;
  }
};

function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) return;

  const res = ctx.res;
  if (!ctx.writable) return;

  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' == ctx.method) {
    if (!res.headersSent && isJSON(body)) {
      ctx.length = Buffer.byteLength(JSON.stringify(body));
    }
    return res.end();
  }

  // status body
  if (null == body) {
    body = ctx.message || String(code);
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' == typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}
```

* 当我们import一个`Koa`时，其实是暴露了一个`Application`类，它继承了`Emitter`，就以为这这个类可以直接为自定义事件注册回调函数，也可以触发一些事件，同时可以捕获到其它地方捕捉到的事件，那就以为着它有耳朵和手，可以听到一些动静之后，做一些事件。
* Koa-Compose对应中间件的函数数据，Koa中的所有中间件都必须是中间件数组，数组中的每个值都必须是函数，这点需要注意。Koa-Compose实现的非常精妙，执行过程中的next都是在它里面传入后往下进行的整个流程的运转的，此源码应该读读。
* context 整个运行服务的上下文，context里不仅能访问到HTTP来源所携带的信息以及方法，也能访问到给用户返回数据的方法
* 读源码时，可以使用删减法来读，把非核心不重要的代码删除后再来整体阅读。看看它核心解决了什么问题，是怎么解决的
* `application.js` 提供一种能力：通过它所new的实例后，这个实例就能使用它的能力，它的能力包括传入中间件use、监听端口生成服务器实例，生成之后能够在nodejs里通过拿到进来的http请求，对这个请求逐层的过中间件数据，最后把过完之后的结果交给它内部的`handleRespose`来处理响应

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
