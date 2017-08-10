# koa学习笔记

## 《Koa框架教程(阮一峰)》

### Context 对象

Koa 提供一个 Context 对象，表示一次对话的上下文（包括 HTTP 请求和 HTTP 回复）。通过加工这个对象，就可以控制返回给用户的内容。

`Context.response.body`属性就是发送给用户的内容。请看下面的例子。

```javascript
const Koa = require('koa');
const app = new Koa();

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(main);
app.listen(3000);
```

上面代码中，`main`函数用来设置`ctx.response.body`。然后，使用`app.use`方法加载`main`函数。你可能已经猜到了，`ctx.response`代表 **HTTP Response**。同样地，`ctx.request`代表 **HTTP Request**。运行这个 demo。

- `ctx.request.accepts` 客户端希望接受什么数据（根据 HTTP Request 的Accept字段），然后使用ctx.response.type指定返回类型。
- `ctx.response.body = fs.createReadStream('./demos/template.html');` 我靠，竟然能直接接收文件流，koa就是高大上。
- 原生路由用 `if (ctx.request.path !== '/')` 
- 重定向 `ctx.response.redirect()`

### 中间件

- 中间件栈：多个中间件会形成一个栈结构（middle stack），以"先进后出"（first-in-last-out）的顺序执行。
  1. 最外层的中间件首先执行。
  2. 调用next函数，把执行权交给下一个中间件。
  3. ...
  4. 最内层的中间件最后执行。
  5. 执行结束后，把执行权交回上一层的中间件。
  6. ...
  7. 最外层的中间件收回执行权之后，执行next函数后面的代码。

- 栗子一个：

```javascript
const one = (ctx, next) => {
  console.log('>> one');
  next();
  console.log('<< one');
}

const two = (ctx, next) => {
  console.log('>> two');
  next(); 
  console.log('<< two');
}

const three = (ctx, next) => {
  console.log('>> three');
  next();
  console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);
```

- 运行结果

```javascript
>> one
>> two
>> three
<< three
<< two
<< one
```

#### 异步中间件

```javascript
const main = async function (ctx, next) {
  ctx.response.type = 'html';
  console.log('before');
  ctx.response.body = await fs.readFile('./demos/template.html', 'utf8');
  console.log('after');
};
app.use(main);
app.listen(3000);
//////////////////
// 顺序是先打印before、然后打印after、最后等执行完成再设置body为文件内容!
```