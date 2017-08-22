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


