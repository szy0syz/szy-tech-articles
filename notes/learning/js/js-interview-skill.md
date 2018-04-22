# 前端跳槽面试必备技巧

    从面试准备，到一、二、三、终面，这次课程就是真实面试的完整分析

[TOC]

## 第1章 课程介绍

面试的那些事：

* JD描述怎么看？
* 简历怎么写？
* 知识怎么复习？
* 问题该怎么回答？
* 项目怎么准备？
* 和负责人怎么沟通？
* HR印象怎么留？

模拟一面：

* 面试技巧、页面布局
* CSS盒子模型、DOM事件
* HTTP协议、原型链
* 面向对象、通信
* 前端安全、前方算法

模拟二面：

* 面试技巧
* 渲染机制
* JS允许机制
* 页面性能
* 错误监控

模拟三面：

* 面试技巧
* 业务能力
* 团队协作能力
* 带人能力

模拟终面：

* 面试技巧
* 职业竞争力
* 职业规划

## 第2章 面试准备

### 2-1

什么是面试？

（维基百科）答：面试是测查和评价人员能力素质的一种考试活动。具体地说，面试是一种经过组织者**精心设计**，在特定场景下，以考官对考生的面对面交谈与观察为主要手段，由表及里测评考生的知识、能力、经验等有关素质的一种考试活动。

### 2-2 JD职位描述分析

### 2-3 业务分析和实战模拟

打开Chrome，从控制面板能看出技术细节。

* 在Sources中，如果是客户端渲染，可以在其webpack目录下找到打包编译前源码，认真查看细节；如果是服务端渲染SSR，则可以在静态资源目录的vendor文件查看框架版本等细节。
* 在Elements里直接看head，例如`<link rel="dns-prefetch" href="//static.360buyimg.com">`DNS预解析。又看head，艺龙head中有非常多的外部script，但根据雅虎军规来说，应该放在body的末尾，仔细一看原来加了async关键字。
* 在Application中看看产品使用了哪些存储技术，如果使用Local Storage很多，却没用Session Storage的话，就着重复习；还有Frames中再看看Fonts文件。

### 2-4 准备自己的技术栈

### 2-5 面试准备-自我陈述

简历

* 基本信息：姓名-年龄-手机-邮箱-籍贯
* 学历：博士 》硕士 》本科 》大专
* 工作经历：时间-公司-岗位-职责-技术栈-业绩
* 开源项目：Github

自我陈述

* 把握面试的沟通方向
* 豁达、自信的适度发挥

实例

* 自如谈兴趣、巧妙示实例、适时讨疑问
* 节奏要适宜、切记小聪明

实战

* 方向要对，过程要细
* 胆子要大，心态要和

## 第3章 一面/二面

### 3-1 页面布局

题目：假设高度已知，请写出三蓝布局，其中左栏、右栏宽度各位300px，中间自适应。

Common

```html
<style>
  html * {
    margin: 0;
    padding: 0;
  }
  .layout article div {
    min-height: 100px;
  }
  .left {
    background: red;
  }
  .center {
    background: green;
  }
  .right {
    background: blue;
  }
  .layout:not(:first-child) {
    margin-top: 20px;
  }
</style>
```

三栏布局之浮动：

```html
<section class="layout float">
  <style>
    .layout.float .left {
      float: left;
      width: 300px;
      background-color: red;
    }
    .layout.float .right {
      float: right;
      width: 300px;
      background-color: blue;
    }
  </style>
  <article class="left-right-center">
    <div class="left"></div>
    <div class="right"></div>
    <div class="center">
        <h2>我是【浮动定位】的三栏布局</h2>
        <p>富强、民主、文明、和谐</p>
        <p>自由、平等、公正、法治</p>
        <p>爱国、敬业、诚信、友善</p>
    </div>
  </article>
</section>
```

Jerry要点总结：

1. html5语义化书写
2. article中三个div顺序要注意left和right已经脱离文档流，这须写在center之前
3. left块为左浮动，right为右浮动，再把center放中间则其没设置宽度就会自动撑开

三栏布局之绝对定位：

```html
<section class="layout absolute">
  <style>
    .layout.absolute article>div {
      position: absolute;
    }
    .layout.absolute .left {
      left: 0;
      width: 300px;
    }
    .layout.absolute .right {
      right: 0;
      width: 300px;
    }
    .layout.absolute .center {
      left: 300px;
      right: 300px;
    }
  </style>
  <article class="left-center-right">
    <div class="left"></div>
    <div class="center">
      <h2>我是【绝对定位】的三栏布局</h2>
      <p>富强、民主、文明、和谐</p>
      <p>自由、平等、公正、法治</p>
      <p>爱国、敬业、诚信、友善</p>
    </div>
    <div class="right"></div>
  </article>
</section>
```

Jerry要点总结：

1. 容器内所有“item”均设为绝对定位
2. left元素设置距离左边0
3. right元素设置距离右边0
4. center元素设置距离左右两边都为300px

三栏布局之flex：

```html
<section class="layout flex" style="margin-top: 140px;">
  <style>
    .layout.flex article {
      display: flex;
    }
    .layout.flex .left {
      width: 300px;
    }
    .layout.flex .right {
      width: 300px;
    }
    .layout.flex .center {
      flex: 1;
    }
  </style>
  <article class="left-center-right">
    <div class="left"></div>
    <div class="center">
      <h2>我是【flex】的三栏布局</h2>
      <p>富强、民主、文明、和谐</p>
      <p>自由、平等、公正、法治</p>
      <p>爱国、敬业、诚信、友善</p>
    </div>
    <div class="right"></div>
  </article>
</section>
```

Jerry要点总结：

1. 设置容器为flex，因默认就是水平排列则不需要设置按哪条轴排列
2. 设置left和right元素的宽度
3. 设置center为flex:1，表示其在中间自动适应

三栏布局之table：

```html
<section class="layout table">
  <style>
    .layout.table article {
      display: table;
      width: 100%;
      height: 100%;
    }
    .layout.table article>div {
      display: table-cell;
    }
    .layout.table .left {
      width: 300px;
    }
    .layout.table .right {
      width: 300px;
    }
  </style>
  <article class="left-center-right">
    <div class="left"></div>
    <div class="center">
      <h2>我是【table】的三栏布局</h2>
      <p>富强、民主、文明、和谐</p>
      <p>自由、平等、公正、法治</p>
      <p>爱国、敬业、诚信、友善</p>
    </div>
    <div class="right"></div>
  </article>
</section>
```

Jerry要点总结：

1. 在容器上设置display:table，再设置容器width:100%，在这个外容器全部撑开，因为设置容器内item为table-cell后，所有item默认会成为一个收缩型表格，单元格宽度仅为内容撑开
2. 设置容器内所有item的display: table-cell
3. 设置left和right元素宽度，center会自动撑满剩余空间

三栏布局之网格：

```html
<section class="layout grid">
  <style>
    .layout.grid .left-center-right {
      display: grid;
      grid-template-rows: 100px;
      grid-template-columns: 300px auto 300px;
    }
  </style>
  <article class="left-center-right">
    <div class="left"></div>
    <div class="center">
      <h2>我是【grid】的三栏布局</h2>
      <p>富强、民主、文明、和谐</p>
      <p>自由、平等、公正、法治</p>
      <p>爱国、敬业、诚信、友善</p>
    </div>
    <div class="right"></div>
  </article>
</section>
```

Jerry要点总结：

1. 设置容器为grid网格布局，网格行高，网格各个列的宽度，完！
2. gird兼容型实在太差

![3rd-layout][1]


布局题目延伸：

* 这五种布局各自有什么优缺点？
  * 浮动布局，缺点需要处理清除浮动和浮动元素周边元素关系，优点则兼容性好，毕竟是老字号；
  * 绝对定位，优点为快捷，缺点为元素全部脱离文档流，则容器内剩余所有子元素都需要脱离，则其可使用性较差；
  * flex布局，CSS3中的新布局方式，其解决了上诉两种布局方式不足之处，相对于移动端使用相对完美；
  * table布局，优点为兼容性相对不错，缺点为如果应用场景要求每一栏高度不随之增加时就不适用，也就是说在表格中的所有单元格高度都会随着这行的高度变化而变化，但有些时候却需要限制某个单元格高度不变；
  * grid布局，优点为功能强大、使用便捷，缺点是兼容性极差。

![3rd-layout-1][2]

* 如果把高度已经去掉，不再只考虑水平方向自适应，还需考虑垂直方向自适应，例中间高度被撑开很大，两边高度也需随之跟着撑开。则这五种布局方案哪几个还能用，哪些不能用？
  * 一、二、五布局均不能出现错误
  * flex布局和table布局能在垂直水平方向自适应
* 五种方案的兼容性如何，如果在生产环境，该选哪种方案？
  * 浮动兼容性最好，但需要处理问题；
  * flex在IE6~9不支持，IE10以后也是部分支持；

页面布局小结

* 语义化掌握到位
* 页面布局理解深刻
* CSS基础知识扎实
* 思维灵活且积极向上
* 代码书写规范

页面布局的变通

三栏布局

* 左右宽度固定，中间自适应
* 上下高度固定，中间自适应

两栏布局

* 左宽度固定，右自适应
* 右宽度固定，左自适应
* 上高度固定，下自适应
* 下高度固定，上自适应

### 3-2 CSS盒模型

基本模型：标准模型 + IE模型
标准模型和IE模型区别：计算高度和宽度的不同
CSS如何设置这两种模型：
JS如何设置获取盒模型对应的宽高度
实例题：根据盒模型解释边距重叠
BFC（边距重叠解决方案）

![css-box][3]
![css-box][4]

CSS如何设置这两种模型

* `box-sizing: content-box` 标准模型 -> 浏览器默认
* `box-sizing: border-box` IE盒子模型

JS如何设置获取盒模型对应的宽和高

* `dom.style.width/height` 此api仅能取到元素内联样式的宽和高
* `dom.currnetStyle.width/height` 此api仅IE支持，取到的是浏览器渲染后dom元素的宽和高
* `window.getComputedStyle(dom).width/height` 此api仅weikit内核等支持，取到的是浏览器渲染后dom元素的宽和高
* `dom.getBoundingClientRect().width/height` 此api应用场景在计算某个元素相对于当前viewport视口的左上角定点的绝对位置

BFC原理介绍

* [史上最全面、最透彻的BFC原理剖析][5]
* [学习 BFC][6]

### 3-3 DOM事件

####　DOM事件的级别

* DOM0 `elemnet.onclick=function() {}`
* DOM1 其在设计DOM1标准时，没有设计和事件相关的功能
* DOM2 `element.addEventListener('click', function() {}, false)`
* DOM3 `elemnet.addEventListener('click', function() {}, false)` DOM3和DOM2差不多，只是增加了很多的事件类型

#### DOM事件模型

捕获(从外层到里层)和冒泡(从里层往外层)

#### DOM事件流

浏览器在为当前此页面与用户作交互过程中，如果用户点了鼠标左键，而事件流指的就是这个鼠标左键点击后怎么传递到页面上和如何响应的。

一个完整的事件流分为三个阶段：1.捕获阶段；2.目标阶段；3.冒泡冒泡。

#### 描述DOM事件捕获的具体流程

`window --> document --> html --> body --> ... --> 目标元素`

用JavaScript怎么获取html节点？`document.documentElement`

#### Event对象的常见应用

* `event.preventDefault()`  阻止默认事件
* `event.stopPropagation()` 阻止冒泡
* `event.stopImmediatePropagation()` 阻止调用相同事件的其他侦听函数，事件响应优先级，具体见MDN
* `event.currentTarget` 学会用事件代理，把子元素的事件代理全部放到父元素上，这样N多个子元素的响应，只需要绑定一次，而我们只需要父元素响应式区分到底是哪个子元素捕获了事件。currentTarget指的是绑定了此次响应事件的元素(父元素)
* `event.target` 具体指被点击的元素

```js
<script>
  window.addEventListener('click', function() {
    console.log('window capture ~~~')
  }, true) // 设为捕获

  document.addEventListener('click', function() {
    console.log('document capture ~~~')
  }, true)

  ev.addEventListener('click', function() {
    console.log('ev element capture ~~~')
  }, true) // 调整顺序

  document.documentElement.addEventListener('click', function() {
    console.log('html capture ~~~')
  }, true)
</script>
```

#### 自定义事件

```js
var eve = new Event('custome')
ele.addEventListener('custome', function() {
  console.log('custome')
})
ele.dispatchEvent(eve)

// 如果有参数传递，可以使用CustomeEvent，方法类似
// 绑定时间相应
ev.addEventListener('jerry', function(e) {
  console.log('jerry事件被触发了~~')
  console.dir(e)
}, true)

// 创建新事件
var event = new CustomEvent('jerry', {
  detail: {
    name: 'jerry shi',
    age: '18'
  }
})

// 触发事件
ev.dispatchEvent(event)
```

* 在`CustomEvent`传递的参数中，并不会定义事件是的参数传递到响应式的evnet对象上去，而是使用类似`Object.assign(e, customOptions)`的方式二次覆盖上去。

### 3-4 HTTP协议类

#### HTTP协议的主要特点

* 简单快速
* 灵活
* 无连接：每连接一次完成后就会断开连接
* 无状态：服务端无法区分这次连接和上次连接的客户端是否是同一个

#### HTTP报文的组成部分

请求报文：请求行(http方法、页面地址、http协议、http版本) + 请求头(包含一些key-value键值对告诉服务端需要什么数据) + 空行(隔离请求体和请求头) + 请求体
响应报文：状态行(http协议及版本号、http响应码) + 响应头(k-v) + 空行 + 响应体

#### HTTP方法

* `GET`     获取资源
* `POST`    传输资源
* `PUT`     更新资源
* `DELETE`  删除资源
* `HEAD`    获取报文首部

#### POST和GET的区别

* GET在浏览器回退时时无害的，而POST会再次提交请求
* GET产生URL地址可以被收藏，而POST不可以
* GET请求会被浏览器主动缓存，而POST不会，除非手动设置
* GET只能进行url编码，而POST支持多种编码方式
* GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
* GET请求在URL中传送的参数是有长度限制的，而POST没有限制
* 对参数的数据类型，GET只接受ASCII字符，而POST没有限制
* GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
* GET参数通过URL传递，POST放在Request Body中

#### HTTP状态码

* 1xx；指示信息 - 表示请求已接收，继续处理
* 2xx：成功 - 表示请求已被成功接收
* 3xx：重定向 - 要完成请求必须进行更进一步的操作
* 4xx：客户端错误 - 请求有语法错误或请求无法实现
* 5xx：服务端错误 - 服务端未能实现合法的请求

常见状态码：

* 200 OK：客户端请求成功
* 206  Partial Content：客户发送了带有Range头的GET请求，服务端完成了它(场景用于大视频的请求)
* 301 Moved Permanently：所请求的页面已经永久转移致新的url **永久重定向**
* 302 Found：所请求的页面已经临时转移至新的url **临时重定向**
* 304 Not Modified：客户端有缓冲的文档并发出了一个条件性的请求，服务端告诉客户，原来缓存的文档还可以继续使用
* 400 Bad Request：客户端请求有语法错误，不能被服务端所解析
* 401 Unauthriozed：请求未经授权，这个状态码必须和WWW-Authenticate报头一起用
* 403 Forbidden：对被请求页面的访问已被禁止
* 404 Not Found：请求资源不存在
* 500 Internal Server Error：服务器发生不可预期的错误，原来缓冲的文档还可以继续使用
* 503 Server Unavailable：请求未完成，服务器临时过载或宕机，一段时间后可能恢复正常

#### HTTP的持久连接

HTTP协议采用“请求-应答”模式，当使用普通模式，即非Keep-Alive模式时，每个请求/应答客户和服务器都要新建一个连接，完成后立即断开连接（HTTP协议为无连接协议）

当使用Keep-Alive模式（又称持久连接、连接重用）时，Keep-Alive功能使客户端到服务端的连接持续有效，当出现对服务器的后续请求时，Keep-Alive功能避免了建立或者重新建立连接

这个Keep-Alive持久连接技术要HTTP的1.1版本才支持，其1.0版本都不支持

#### HTTP管线化

在使用持久连接的情况下，某个连接上的消息的传递类似于

请求1 --> 响应1 --> 请求2 --> 响应2 --> 请求3 --> 响应3

某个连接的消息变成了类似这样

（请求1 + 请求2 + 请求3） --> （响应1 + 响应2 + 响应3）

**管线化**：**此通道须建立持久连接**，但不是请求/应答模式（请求一次响应一次），而是说把此刻所有请求打包一次传输过去，然后服务端也把所有响应打包响应回传

* 管线化机制通过持久连接完成，仅HTTP/1.1 支持此技术
* 只有GET和HEAD请求可以进行管线化，而POST则有所限制
* 初次建立连接时不应启动管线化机制，因为对方(服务器)不一定支持HTTP/1.1 版本的协议
* 管线化不会影响响应到达的顺序，响应返回的顺序并未改变
* HTTP/1.1要求服务端支持管线化，但并不要求服务端也进行响应的管线化处理，只是要求对于管线化的请求不失败即可
* 由于上面提到的服务端问题，开启管线化很可能并不会带来大幅度的性能提升，而且很多服务端和代理程序对管线化支持不好，因此现代浏览器和Chrom和Firefox默认并未开启管线化支持

### 3-5 原型链

#### 创建对象的几种方法

```js
// 第一种
var o10 = {name: 'jerry10'}
var o11 = new Object({name:'jerry11'})

// 第二种
var M = function(name){this.name = name}
var o2 = new M('jerry2')

// 第三种
var P = {name: 'jerry3'}
var o3 = Object.create(P)
```
#### new运算符

流程：

1. 一个新对象被创建。它继承自foo.prototype
2. 构造函数foo被执行。执行的时候，相应的传参会被传入，同时上下文 this 会被指定为这个新实例。new foo 等同于new foo()，只能用在不传递任何参数的情况
3. 如果构造函数返回了一个“对象”，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1所创建的对象

```js
var new2 = function(func) {
  var o = Object.create(func.prototype)
  var k = func.call(o)
  if(typeof k === 'object') {
    return k
  } else {
    return o
  }
}
```

### 3-6 面向对象



### 3-7 通信类

#### 什么是同源策略及限制

同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。
这是一个用于隔离潜在恶意文件的关键的安全机制。

* Cookie、LocalStorage 和 IndexDB 无法读取
* DOM 无法获得
* Ajax 请求不能发送

#### 前后端如何通信

* Ajax (同源策略)
* WebSocket (不限制同源策略)
* JSONP 数据格式 JSON 的一种 “使用模式”
* CORS "跨域资源共享"（Cross-origin resource sharing）

扩展阅读：

JSONP的原理：利用 script 标签不受同源策略影响，可以跨域引入外部资源的特性，让服务器端返回可执行的 JS 函数，将要返回的数据作为参数传进函数，以此实现跨域加载数据的目的。此时，绕过 Ajax，并未使用它，但同样达成了请求数据的目的。

script 标签引用资源得本质是：

* 向 src 发送请求
* 将资源下载到当前页面
* 当资源加载完毕后，把该资源当做 JS 代码来立刻执行

JSONP的使用

* 动态创建 script 标签，src 地址指向数据接口，并传递 callback 参数
* 定义数据处理函数
* 服务端接收请求，解析参数，计算数，返回回调函数字符串
* 将回调函数字符串引入页面并作为 JS 去执行：此时会调用数据处理函数，数据会作为数据处理函数的参数被处理计算出一个结果

JSONP的优缺点

* 优点：因 script 隶属于 HTML 的标签，所以不存在兼容问题
* 缺点：因需使用 URL 引入资源，所以 JSONP 仅支持 get 请求；因 script 标签会将资源作为 JS 代码执行，所以可能会被注入恶意代码

```js
////////JSONP
var btn = document.querySelector('.btn'),
    panal = document.querySelector('.panal');

btn.addEventListener('click', function () {
    var script = document.createElement('script');
    script.src = 'http://b.yang.com:8080/loadData?callback=onSuccess';
    document.head.appendChild(script);
    document.head.removeChild(script);
});

function onSuccess(data) {
    panal.innerText = data;
}

app.get('/loadData', function(req, res) {
    var dataStr = '';
    var len = 10;
    var disc = 'abcdefjhigklmnopqrstuvwxyz';
    for(var i = 0; i < len; i++){
        dataStr += disc[Math.floor(Math.random() * disc.length)];
    }
    var callback = req.query.callback;
    data = callback + '(' + JSON.stringify(dataStr) + ');';
    res.send(data);
});
```

CORS 的原理

1. 当使用 XMLHttpRequest 发送请求时，如果浏览器发现该请求不符合同源策略，会给该请求加一个请求头：Origin；
2. 后台进行一系列处理，如果确定接受请求则在返回结果中加入一个响应头：Access-Control-Allow-Origin；
3. 浏览器判断该响应头中是否包含 Origin 的值：
4. 如果包含浏览器则会处理响应，前端就可以拿到响应数据；
5. 如果不包含浏览器直接驳回，此时前端无法拿到响应数据。

CORS 的使用：前端：正常使用 AJAX 发送请求；服务端：若确定接受请求，则在返回结果中加入响应头：Access-Control-Allow-Origin。

CORS 的优缺点

* 优点：使用简单方便、更为安全；支持 POST 请求方式
* 缺点：CORS 是一种新型跨域问题的解决方案：存在兼容问题——仅支持 IE10 以上

```js
var btn = document.querySelector('.btn'),
panal = document.querySelector('.panal');

btn.addEventListener('click', function () {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4){
            if(xhr.status === 200){
                onSuccess(xhr.responseText);
            }
        }
    }
    xhr.open('post', 'http://b.yang.com:8080/loadData', true);
    xhr.send();
});

function onSuccess(data) {
    panal.innerText = data;
}

app.post('/loadData', function(req, res) {
    var disc = 'abcdefjhigklmnopqrstuvwxyz';
    var data = '';
    for(var i = 0; i < 10; i++){
        data += disc[Math.floor(Math.random() * disc.length)];
    }
    res.header("Access-Control-Allow-Origin", "http://a.yang.com:8080");
    res.send(data);
});
```

#### 如何创建Ajax

* XMLHttpRequest对象的工作流程
* 兼容性处理
* 事件的触发条件
* 事件的触发顺序

#### 跨域通信的几种方式

* JSONP
* Hash
* postMessage
* WebSocket
* CORS

JSONP：利用script标签的异步加载来实现的

```js
function jsonp(req){
    var script = document.createElement('script');
    var url = req.url + '?callback=' + req.callback.name;
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script); 
}

function hello(res){
    alert('hello ' + res.data);
}
jsonp({
    url : '',
    callback : hello
});
```

Hash：Iframe子父窗口传值

postMessage：html5新api，兄弟窗口间传值

WebSocket：init后，监听三个函数: onpen,onmessage,onclose

CORS：支持跨域通信的Ajax，浏览器在发现你用ajax发送了一个跨域请求后，向请求头中加了一个orgin:域名的内容，指明这个域可以跨域

### 3-7 安全类

#### CSRF

CSRF：跨站请求伪造

CSRF原理图

![CSRF][7]

CSRF能做什么：攻击者盗用了你的身份，以你的名义发送恶意请求

CSRF实现提前：

* 服务端接口有漏洞
* 用户在注册网站A登录过，有cookie等信息

CSRF防御措施：

* Token验证(加密的cookie)
* Referer验证：请求来源验证
* 隐藏令牌

#### XSS

XSS: 跨域脚本攻击 cross-site scripting

[攻击原理和防御措施](https://www.imooc.com/learn/812)

原理：例如各种渠道向你的页面注入JS脚本(eg:评论区)
防御：让你插入的js无法执行

CSRF与XSS区别

XSS是向你页面注入js脚本让其运行，然后在函数体里做非法操作
CSRF利用你网站本身的漏洞，利用cookie换取你登录的身份后发送恶意请求

## 第4章 二面/三面



## 第5章 三面/四面




## 第6章 课程终面



## 第7章 2017真题解析




## 第8章 课程总结


[1]: http://ofx24fene.bkt.clouddn.com//blog/2018/3rd-layout.jpeg
[2]: http://ofx24fene.bkt.clouddn.com//blog/2018/3rd-layout-1.jpeg
[3]: http://ofx24fene.bkt.clouddn.com//blog/2018/CSSBox.png
[4]: http://ofx24fene.bkt.clouddn.com//blog/2018/CSSBox-ie.png
[5]: https://github.com/zuopf769/notebook/blob/master/fe/BFC%E5%8E%9F%E7%90%86%E5%89%96%E6%9E%90/README.md
[6]: https://juejin.im/post/59b73d5bf265da064618731d
[7]: http://ofx24fene.bkt.clouddn.com//img/blog/CSRF.png
