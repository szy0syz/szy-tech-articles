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

Web开发中一般会出现两种情况：

- 大型或资金充裕的组织
  - 这些组织通常会有QA部门，但QA部和开发部是敌对关系。这就是非常糟糕的事，因此两者之间会形成了冲突和竞争的基础。

- 小型组织或者预算有限的组织


