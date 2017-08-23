![9787115380333](../../../static/img/9787115380333.jpg)

# 《Node与Express开发》

> 此书大概在5月看完，这本书让我懂了express的中间件模式，原来是这回事。

## 第1章：初始Express

### 1.1 JavaScript革命

> 徜徉在互联网中令人感到兴奋，到处都是令人惊奇的新想法。现在得创新精神和新事物比过去的这许多年要更强、更多。

### 1.2 初始Express

- Express的特点：精简的、灵活的Node.js Web程序框架，为构建单页、多页及混合的Web程序提供了一系列健壮的功能特性。
  - 精简
  - 灵活
  - Web程序框架
  - 单页Web程序
  - 多页和混合的Web程序

----------

## 第2章：从Node开始

> 大体简介了下Node

----------

## 第3章：省时省力的Express

### 小栗子

```javascript
var express require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

// 404 handler
app.use(function(res, res) {
    res.type('text/plain');  // 设置响应报头还可以这样设
    res.status(404);
    res.send('404 - Not Found');
});

// 500 handler
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type(''text/plain'');
    res.status(500);
    res.send('500 - Server Error');
});

// server running
app.listen(app.get('port'), function () {
    console.log('Exprss started on http://localhost:' + app.get('port') + '.');
});
```

- 这个栗子真的挺不错的。
- 首先就是那个app.set、app.get。以前网上看的教程没看到app.set用法，原来tj在源码里来了个forEach循环，先然后把use、set、post等常用的动态添加到app对象的属性里，然后判断如果是get获取变量值的(arguments.length===1，因为不是还有get请求和他重名嘛)，就把path当做keyName读取keyValue。
- 然后就是app.use的使用顺序，404肯定在500前面，因为然res调用sned方法后就不会再往下面得代码走了
- 最后，在node中回调函数秉承了‘error’优先原则

```javascript
// express 路由部分源码
methods.forEach(function(method){
  app[method] = function(path){
    if (method === 'get' && arguments.length === 1) {
      // app.get(setting)
      return this.set(path);
    }

    this.lazyrouter();

    var route = this._router.route(path);
    route[method].apply(route, slice.call(arguments, 1));
    return this;
  };
});
```

### 视图

在视图的模板中用handlebars代码用`{{foo.bar}}`扩起来，然后`res.render(xxx.handlebars, viewModel)`即可。

----------

## 第4章：工欲善其事 必先利其器

### 4.5 项目元数据

`package.json`文件的另一个作用便是存储项目的元数据，比如项目名称、作者、授权信息等。当然里面还包含了项目的依赖，这个可是非常重要。

----------

## 第5章：质量保证

- Web开发中一般会出现两种情况：
  - 大型或资金充裕的组织：这些组织通常会有QA部门，但QA部和开发部是敌对关系。这就是非常糟糕的事，因此两者之间会形成了冲突和竞争的基础。
  - 小型组织或者预算有限的组织：无QA，开发人员需承当QA工作。

业界还有一种将QA和开发岗位融合的趋势，让开发人员负责QA。在这种范式下，擅长QA的软件工程师担任开发人员的顾问，帮他们将QA植入到开发流程中。不管QA岗位是分散还是集中的，了解QA对开发人员都是有益的。

### 5.1 QA：值得吗

- 在Web开发中，质量可以分解为四个维度：
  - 到达率：
  - 功能：
  - 可用性：
  - 审美：

### 5.2 逻辑与展示

从广义上来讲，网站上有两个“领域”：*逻辑*(经常被叫做“业务逻辑”)和*表示*。

### 5.4 QA技术概览

- 页面测试：顾名思义，用来测试页面的表示和前端功能。这个同事涉及单元测试和集成测试。一般用Mocha进行页面测试。
- 跨页面测试：对从一个页面转到另一个页面的功能的测试。比如电子商务网站上的结账功能，通常要跨越多个页面。因为这种测试会涉及多个组件，所以一般被当做集成测试。这个测试用得失Zombie.js。
- 逻辑测试：对逻辑域进行单元和集成测试。它只会测试JavaScript，跟所有表示功能分开。
- 去毛：去毛不是要找错误，而是要找潜在的错误。去毛的一般概念是找出可能有错误的区域，或者可能在将来导致错误发生的问题代码。一般用JSHint去毛。
- 链接检查：确保网站上没有破损的链接，属于“唾手可得”的那一类测试。对简单的项目做链接检查看起来可能没有必要，但简单的项目也会发展成复杂项目，破损的链接也将会出现。一般我们会用LinkChecker做链接检查。

### 5.12 持续集成

如果你在团队中工作，它尤其重要，但即便你只是一个人在战斗，他也能为你提供一些不可或缺的纪律。基本上你每次想共享服务器贡献代码时，CI都会运行部分或者全部测试。如果所有测试都通过了，通常什么也不会发生(也可能收到一封邮件)。另一方面，如果有测试失败了，后果一般是更加公开。这也取决于你的CI配置，但一般整个团队都会收到一封邮件说你“搞砸了构建”。如果你们的集成管理员是个虐待狂，又是老板也会出现在邮件列表中。我听说甚至有的团队会在有人搞砸构建时设置灯光和报警器，并且在一个特别有创造性的办公室，一个微型的机器人泡沫导弹发射装置向犯错的开发人员发射泡沫塑料弹。它是一个提前运行QA工具链的强力激励措施。

----------

## 第6章 请求和响应对象

### 6.1 URL的组成部分

![D70F491C-3421-4419-9874-D064E7610514.png-41.9kB][1]

### 6.8 请求对象

- 请求对象的生命周期起始于Node的一个核心对象http.IncomingMessage的实例。Express添加了一些附加功能。
  - req.params：一个数组，包含命名过的路由参数。
  - req.param(name)：返回命名的路由参数，或者GET请求或者POST请求参数。
  - req.query：一个对象，包含POST请求参数。需要用中间件解析。
  - req.route：路由信息
  - req.cookies/res.singnedCookies：一个对象，包含从客户端传递过来的cookie值
  - req.headers：从客户端接收到的请求报头
  - req.accepts([types])：一个简便的方法，用来确定客户端是否接受一个或一组指定的类型(可选类型可以是单个MIME类型，如application/json、一个逗号分割集合或是一个数组)。写公共API的人对该方法很感兴趣。
  - req.ip
  - req.path：请求路径(不包含协议、主机、端口或查询字符串)
  - req.host：用来返回客户端所报告的主机名。这个信息可以伪造。
  - req.xhr：如果请求由Ajax发起将返回true。
  - req.protocol：用于表示请求的协议(http或者https)。
  - req.secure：如果连接是安全的，将返回true
  - req.url/req.originalUrl：返回路径和查询字符串。req.url若是出于内部路由的目的，则可以重写，但是req.originalUrl旨在保留原始请求和查询字符串。
  - req.acceptedLanguages：用来返回客户端首选的一组语言。

### 6.9 响应对象

- 响应对象的生命周期始于Node核心对象http.serverResponse的实例。
  - res.status(code)：设置http状态码
  - res.set(name, value)：设置响应头，通常不需要手动设置。
  - res.cookie(name, value, [options])、res.clearCookie(name, [options])：设置或者清除客户端cookies值，需要中间件支持。
  - res.redirect([status], url)：重定向浏览器。默认重定向代码是302(建立)。通常，你应该尽量减少重定向，除非永久移动一个页面，这种情况应该使用代码301(永久移动)。
  - res.send(body) 、res.send(status, body)：向客户端发送响应几可选的状态码。
  - res.json(json)、res.json(status,json)：向客户端发送JSON以及可选的状态码
  - res.jsonp(json)、res.jsonp(status,json)
  - res.type(type)：用于设置Content-type头信息。基本上相当于res.set('Content-Type', 'type')。
  - res.format(object)：这个方法允许你根据接收请求报头发送不同的内容。
  - res.attachment([filename])、res.download(path, [filename], [callback])：将响应报头Content-Disposition设为attachment，这样浏览器就会选择下载而不是展现内容。
  - res.sendFile(path, [option], [callback])：这个方法可根据路径读取指定文件并将内容发送到客服端。
  - res.link(links)：设置链接响应报头。
  - res.locals、res.render(view, [locals], callback)：res.locals是一个对象，包含用于渲染视图的默认上下文。res.render使用配置的模板引擎渲染视图。

### 6.10 获取更多信息

由于JavaScript的原型继承，有时确切知道自己在做什么是很困难的。

- Express远吗的路径说明：
  - lib/application.js：Express主接口。如果想了解中间件是如何接入的，或视图是如何被渲染的，可以看这里。
  - lib/express.js：这是一个相对较短的shell，是lib/application.js中Connect的功能扩展，它返回一个函数，可以用http.createServer运行Express应用。
  - lib/request.js：扩展了Node的http.IncomingMessage对象，提供了一个稳健的请求对象。关于请求对象属性的方法的所有信息都在这个文件里。
  - lib/response.js：扩展了Node的http.ServerReponse对象，提供相应对象。关于响应对象的所有属性和方法都在这个文件里。
  - lib/router/route.js：提供基础路由支持。尽管路由是应用的核心，但这个文件只有不到200行，你会发现它非常优雅。

----------

## 第7章：Handlebars模板引擎

### 7.2 选择模板引擎

- 选择时可供参考的准则：
  - 性能
  - 客户端、服务端或兼而有之？
  - 抽象

### 7.3 Jade：不走寻常路

Jade是TJ大神的设想，他也是为我们带来Express的人。那Jade和Express可以很好地结合也就不足为奇了。Jade采用的方式是难能可贵的，其核心就是声称HTML是一中手写的模糊、枯燥的语言。

Jade无疑是少打了很多字，因为不再有尖括号和结束标记。取而代之，它依赖缩进和一些常识性规则，从而更容易表达出自己想要的。Jade具有一个额外的优势：理论上讲，当HTML自身发生改变时，你可以轻松地将Jade定位于HTML版本的最新版，从而让你的内容具有“前瞻性”。

### 7.4 Handlebars基础

Handlebars是另一个流行的模板引擎Mustache的扩展。其简单的JavaScript集成(前端和后端)和容易掌握的语法。

理解模板引擎的关键在于context。当你渲染一个模板时，便会传递给模板引擎一个对象，叫做上下文对象，它能让替换标识运行。

从下图中我们可以看到Handlebars引擎是怎样使用上下文结合模板渲染HTML的。
![0A483A9A-F388-48A4-B2CE-4573FAC0BE98.png-60.5kB][2]

#### 7.4.1 注释
Handlebars里注释：`{{! comment goes here }}`

#### 7.4.2 块级表达式

- {{#each var}}循环
- {{if var}}
- {{unless var}} 和if相反，只有条件为false才执行

每个块级表达式内都有一个context，如果想获取上级的context就用`../`，如果要用当前上下文可以使用`{{.}}`来获取。

#### 7.4.3 服务器模板

服务端模板除了隐藏实现细节，还支持末班缓存。开启缓存：`app.set('view cache', true);`

如果嫌弃.handlebars扩展名太长的话，`require('express3-handlebars').create({ extname: '.hbs' });`就可以将扩展名改为`.hbs`。

#### 7.4.4 视图和布局

![C4225C9C-5475-4C6E-A6E5-D3E6826E8839.png-156.8kB][3]

#### 7.4.5 在Express中使用布局

这个布局的意思就是模板再细不变的部分和变化的部分。

例如有一个main.hbs文件是。在Express中配置默认hbs设置的默认布局：
```javascript
var handlebars = require('express3-handlebars').create({defaultLayout: 'main'});
```
这样，Express会在views子目录中查找视图，在views/layouts下查找布局。所以如果有一个叫view/foo.hbs的视图，可以这样渲染它：
```javascript
app.get('/foo', function(req, res) {
    res.render('foo');
})
```
它就会使用views/layouts/main.hbs作为布局。如果你不想用布局可以`res.render('foo', {layout: null});`，这个提前是指定了默认layout。还可以指定要用哪个布局`res.render('foo', {layout: index});`

#### 7.4.6 局部文件

先创建一个局部文件：weather.hbs。上下文待设置。
```html
{{#each partials.weather.locations}}
...
{{/each}}
```

请注意这里使用partials.weather为开头来命名上下文。此后我们仅需设置res.locals(对于任何视图可用)。但是我们并不想让个别视图干扰指定的上下文，于是我们将所有局部文件上下文都放在partials对象中。

现在创建一个中间件给res.locals.partials对象添加数据。待所有东西都准备好了以后，我们可以使用视图中的这个局部文件。

```html
<h2>tieeeee</h2>
{{> weather}}
```
语法{{> partials_name}}可以让你在视图中使用一个局部文件。hbs会在views/partials中寻找一个叫做partials_name.hbs的视图。

> 老表讲得复杂了点，简化后应该是这样的。
> 首先定义定义局部文件，给局部文件添加context，名字自取。然后把需要传递给局部文件的对象赋值给res.locals对象上。最后引入局部文件用{{> partials_name}}。

#### 7.4.7 段落

从微软的Razor中借鉴了段落(section)的概念。使用方法就是在hbs的option时多加一个helpers:{section: function (name, options) { ... }}。

```html
var handlebars = require('express3-handlebars').create({ 
    defaultLayout:'main',
    helpers: {
        section: function(name, options){ 
        if(!this._sections) this._sections = {}; 
        this._sections[name] = options.fn(this); 
        return null;
        } 
    }
});

{{#section 'head'}}
    <!-- we want Google to ignore this page -->
    <meta name="robots" content="noindex"> {{/section}}

<h1>Test Page</h1>
<p>We're testing some jQuery stuff.</p>

{{#section 'jquery'}}
    <script>
        $('document').ready(function(){
            $('h1').html('jQuery Works');
        });
    </script>
{{/section}}

<!doctype html>
<html>
<head>
    <title>Meadowlark Travel</title>
    {{{_sections.head}}}
</head>
<body>
    {{{body}}}
    <script src="http://code.jquery.com/jquery-2.0.2.min.js"></script>               {{{_sections.jquery}}}
</body>
</html>
```

----------

## 第8章：表单处理

> 我记得node里可以用on('data')事件监听post的数据，然后合并chunk后最终得到全文吧。

```javascript
    // 利用node的基于事件驱动完成接收POST请求data的值
    req.on('data', function (chunk) {
      str += chunk;
    });
    // 这就是原生的表单处理吧
    req.on('end', function () {
      res.writeHead(200, {'content-type': 'application/json;charset=utf-8;'});
      try {
        // 1. 获取数组中id的最大值
        let o = JSON.parse(str);
        res.end(JSON.stringify(o));
      } catch (e) {
        console.error(e);
        res.end('error');
      }
    });
  }
```

### 8.4 处理表单的不同方式

- 无论使用寿命路径来处理表单，必须决定如何响应浏览器，选择如下：
  - 直接响应HTML
  - 302重定向
  - 303重定向
  - 重定向到专用的成功或失败页面
  - 运用flash消息重定向到原来位置
  - 运用flash消息重定向到新位置





  [1]: http://static.zybuluo.com/szy0syz/klv51h5qw4x3ynpvyaqkrz24/D70F491C-3421-4419-9874-D064E7610514.png
  [2]: http://static.zybuluo.com/szy0syz/xsc5sb8kzsk7eqxdilv4wd96/0A483A9A-F388-48A4-B2CE-4573FAC0BE98.png
  [3]: http://static.zybuluo.com/szy0syz/g55lqqnimcxjpty3tu3ktmve/C4225C9C-5475-4C6E-A6E5-D3E6826E8839.png


