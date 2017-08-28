# 珠峰Node.js全栈开发教程

---

[TOC]

## 课时01：node.js介绍


----------

## 课时02：gitflow

 1. fork repo
 2. git clone
 3. cd
 4. add files
 5. git add -A
 6. git commit -m "fixed"
 7. git push origin master
 8. create pull request
 9. merger pull request

> 这个怕是简单了点，怎么培训班招来那么新的新手。这也体现出前端行业从业者的水平阶段如此恐怖。

----------

## 课时03：REPL

- REPL：Read-eavl-print loop，“读取-求值-输出 循环”
  - 在REPL里可以直接输入js命令
  - 特殊变量下划线(_)表示上一个命令返回的结果
  - 如果运行一个表达式，会直接在命令行放回结果。如果运行一行语句，就不会有任何输出，因为语句没有返回值，就返回undefined

```bash
> .help
.break    Sometimes you get stuck, this gets you out
.clear    Alias for .break
.editor   Enter editor mode
.exit     Exit the repl
.help     Print this help message
.load     Load JS from a file into the REPL session
.save     Save all evaluated commands in this REPL session to a file
```

- node.js在Windows系统中环境变量名：PATH

----------

## 课时04：http

- webstrom配置，设置区搜索npm，enable！
- 模块：每个js文件都是一个模块，模块内部声明的变量都是**私有**变量，外部无法访问。
  - 创建math.js模块
  - 导出模块`exports.add = function(a, b) {return a+b;}`
  - 加载模块`var math = require('./math');`
  - 调用模块`var sum = math.add(4,6);`
- 模块分类：
  - 核心模块：http/fs/path
  - 文件模块：`var math = require('./math');`
  - 第三方模块：`var async = require('async');`

![image.png-387.1kB][1]

- 全局对象global：表示Node所在的全局环境，类似于浏览器的window对象，它及其所有属性都可以在程序的任何地方访问。

- 一个普通网站访问的过程(1)
  1. 浏览器向服务器发出一个**http请求**
  2. 先把域名**解析为IP地址**(chrome缓存1分钟[chrome://net-internals/#dns] --> 搜索操作系统缓存 --> 读取本地host文件 --> 发起DNS系统调用 --> 运营商DNS查询  --> 找根域 --> com域)
  3. 客服端通过随机端口向服务器发起TCP三次握手，建立**TCP连接**
  4. 连接建立后浏览器就可以**发送http请求**了
  5. 服务器端收到http请求，解析请求路径和参数，经过后台的一些处理之后**生成完整的响应**(可能是网页)
  6. 服务器将生成的'页面'作为http响应体，根据不同的处理结果生成**响应头**，发回客户端

----------

## 课时05：http2

- 一个普通网站访问的过程(2)
  1. 客户端(浏览器)接收到HTTP响应，从请求中得到的HTTP响应体里是HTML代码，于是对HTML代码开始**解析**
  2. 解析过程中遇到**引用的服务器上的资源**(额外的CSS、JS、图片、音视频、附件等)，再向服务器发送请求
  3. 浏览器解析HTML包含的内容，用得到的CSS代码进行外观上的进一步**渲染**，JS代码也可能会对外观进行一定**处理**
  4. 当用户与页面交互(点击、悬停等)时，JS代码对此作出一定反应，添加特效与动画
  5. 交互的过程中可能需要向服务器索取或提交额外的数据(局部的刷新)，一般不是跳转就是通过JS代码(响应某个动作或定时)向服务器发送AJAX请求
  6. 服务器再把客户端需要的资源返回，客户端用得到的资源来实现动态效果或者修改DOM结构

----------

## 课时06：global

- 状态码
  - 1XX 请求正在处理
  - 2XX 正常处理完成
    - 200 OK 请求成功 
  - 3XX 重定向
    - 301 Moved Permanently 永久重定向
    - 302 Found 临时重定向
  - 4XX 客服端错误
    - 400 Bad Request 语法错误
    - 401 Unauthorized 未认证
    - 403 Forbidden 禁止访问
    - 404 Not Found 资源未找到
  - 5XX 服务器错误
    - 500 Internal Sever Error 

- 在tcp协议头中，有一个`Connection:keep-alive`，是在TCP中一个可以检测死连接的机制，keepalive原理很简单，TCP会在空闲了一定时间后发送数据给对方。

```javascript
// 很好玩的一个东西，持续向客服端发送内容 keepalive
var counter = 0,
    int = setInterval(function() {
        // 这里给客服端返回一部分内容，但我们不结束响应，则服务端和客户端保持了一个keepalice!
        res.write(new Date().toString());
        counter++;
        if (counter >= 5) {
            clearInterval(int);
            // 好了，发够5次了，我们结束本次响应！
            res.end();
        }
    })
```

- global对象中常用属性
  - `process` - 当前进程对象


```javascript
// console.log('123');
// 其实consoloe.log()在node里就是stdout.write的一个子节点
process.stdout.write('hello');
process.stdin.on('data', function(data) {
  console.log(data.toString());
})

////////////////////////////////

console.log('a客人');
console.log('b客人');
console.log('c客人');
console.log('d厨师');
console.log('e厨师');

setTimeout(function() {
  console.log('去扫地 setTimeout');
}, 0);

// nextTick 会把该事件放入当前任务队列的末端
// 而setTimeout会把事件放入下一个任务队列的顶端
process.nextTick(function() {
  console.log('去扫地 nextTick1');
  process.nextTick(function() {
    console.log('去扫地 nextTick2');
    process.nextTick(function() {
      console.log('去扫地 nextTick3');
    });
  });
});
```

- 异步时的优先级：nextTick > setTimeout > setImmediate > async IO

```javascript
function Parent() {
  this.name = 'Parent';
  this.age = '29';
  function say() {
    console.log('hello ' + this.name);
  }
}

Parent.prototype.showName = function () {
  console.log(this.name);
}

function Child() {
  this.name = 'Chind';
}

//原型继承
// Child.prototype = new Parent;
// 其实node的util也给我们封装了一个继承方法
var util = require('util');
util.inherits(Child, Parent);
var child = new Child();
child.showName(); 
console.log(child.__proto__.__proto__.__proto__ === Object.prototype);
```
    
- util.inherits()：继承
- util.inspect()：检查
  - showHide, 是否显示隐藏属性
  - depth, 对象的递归显示深度
  - colors，是否显示颜色

```javascript
// arr1.concat(arr2);
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);
```

----------


  [1]: http://static.zybuluo.com/szy0syz/37h1t668jithowio81vlcsvb/image.png


