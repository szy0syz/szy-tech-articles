# 达内前端培训 CH16_Bootstrap

[TOC]

## unit01：响应式网页、bootstrap起步、全局CSS样式

### 什么是响应式网页

- Responsive Web Desien：响应式/自适应网页设计，2010年5月，由Ethan Marcotte专为改进移动互联网浏览器提出的概念，基本概念为：
  - 集中创建页面的图片和排版大小，可以智能地根据用户行为以及使用的设备环境(系统平台、屏幕尺寸、屏幕方向等)进行相应的布局————即一个页面可以兼容各种终端，无需编写多个不同的版本。
  - 说白了，编写一个网页可以很好的显示在各种屏幕大小的终端上。
  - 总结：2010年5月提出的“Responsive Web Page”，响应式网页/自适应网页，一个页面可以根据浏览器设备的不同或使用环境的不同，自动的修改布局、修改图片尺寸、文字大小，从而可以保证所有的设备都正常的浏览体验。
  - 好处：各种设备下都正常显示
  - 不足：页面代码结构需要考虑到多种设备，编写难度更大，代码结构更加复杂，一般只适用于

![image.png-55.6kB][1]

### 如何测试响应式网页

- 使用真实物理设备测试————测试效果最好但麻烦
- 使用第三方模拟软件测试————测试效果有待验证
- 使用浏览器提供的设备模拟测试————最简单但有时测试效果与真实物理设备有所不同，需要进一步验证

> 行业小知识：viewport，视口，屏幕中浏览网页的那个窗口！
> 早期的手机浏览PC网页时只能把网页进行缩小，影响浏览体验；
> iOS系统提出l额viewport的概念————承载网页的窗口，可以随意指定宽高，但不能小于手机物理屏幕，可以让任意大小的网页不经过缩放直接显示。
> Android后来也引入了此概念————只有移动端浏览器才有此概念。

### 如何编写响应式网页

- 必须声明viewport元标签
  - `<meta name="viewport" content="... ... ...">`
  - `width=device-widht,` --> 指定 视口 的宽度
  - `inital-scale=1.0,`   --> 设置 视口 初始化的放大比例
  - `user-scalable=no`    --> 设置 视口 为用户不能缩放(1/0/yes/no)
  - `minimum-scale=1.0`   --> 允许的最小缩放倍率
  - `maximum-scale=1.0`   --> 允许的最大缩放倍率
- 容器尽量使用相对尺寸
  - 尽量避免绝对尺寸：`div.container{width: 1211px;}`
  - 使用相对尺寸代替：`div.container{width: 80%;}`
- 文字大小尽量使用相对尺寸
  - 尽量避免绝对尺寸：`.text{font-size: 12px;}`
  - 使用相对尺寸代替：`.text{font-size: 0.5rem;}`
- 图片尽量使用相对尺寸：
  - 尽量避免绝对尺寸：`img{width: 200px}`
  - 使用相对尺寸代替：`img{width: width:50%;}` 或 `img{max-width: width:50%;}`
  - width 和 max-width 的区别：两者都是指定在父容器中的宽度占比，但width属性可以随着父容器变大而无限变大；而 max-width 却限制放大同时不能超过自己的原始大小
- 页面布局尽量采用流式布局(Fluid)
  - float:left;  或者  display:inline-block;
- 响应式网页必须 CSS3 Media Query 技术

### CSS3 Media Query

- Media：指浏览网页的设备，如screen、tv、projection(投影)、printer、tty(字符终端)、braille
- Query：使用CSS自动查询浏览设备的特性，如位深、解析度、宽高、水平/竖立方向...
- CSS3 Media Query：根据浏览网页的设备类型不同，或者特性不同，而有选择的执行某些CSS，放弃执行另外的。

#### 媒体查询具有两种方法

- 有选择性的执行符合条件的外部CSS文件
  - `<link media="screen and (min-width:768px) and (max-width:991px)" rel="stylesheet" href="css/pad.css">`
  - 缺陷：即使不满足当前浏览器条件的CSS文件，也会被浏览器下载。

- **有选择性的执行CSS片段中的部分内容**
  - `@media screen and (min-width:768px) and (max-width:991px) { h3: {display: none} }`

#### 响应式网页练习

![image.png-81.2kB][2]

- 主体布局变化 1:3:1  -->  1:3:0  --> 100%:100%:0

### Bootstrap起步

> 我们学bootstrap到底学什么？学那1000来个class。————大实话

#### 基本模板

- `<html lang="zh-cn">` `<html lang="en-us">`
  - `html`标签的"lang"属性(language)指定当前网页所使用的自然语言，如zh、zh-cn、zh-tw、en-uk、ja、de、fr...
  - 作用1：指定当前页面的基础，为浏览器的翻译做准备；
  - 作用2：位盲人的屏幕阅读指明基础发音。
- `<meta http-equiv="X-UA-Compatible" content="IE=edge">`
  - Cross-UserAgent-Compatible，跨(IE)浏览器兼容性
  - IE6：拥有非常多的专有对象
  - IE7：6/7
  - IE8：6/7/8
  - ...
  - IE11：6/7/8/9/10/11
  - edge：edge
  - 这句话意思就是说：告诉IE使用可用的最新版本IE内核
- `html5shiv.min.js`：第三方的JS文件，自执行函数，让老IE支持HTML5的语义标签。
- `respond.min.js`：第三方的JS文件，自执行函数，让老IE支持响应式网页————支持CSS3的媒体查询技术

#### 练习-bootstrap的reset样式

- `*{}`
  - --> `box-sizing: border-box;` 改变盒子模型为边框盒子
- `html{}`
  - --> `font-size: 10px;` 全局字体为10px
  - --> `-webkit-tap-highlight-color: rgba(0, 0, 0, 0);`
- `body{}`
  - --> `font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;`
  - --> `font-size: 14px;` 覆盖修改全局字体14px
  - --> `line-height: 1.42857143;`
  - --> `color: #333333;`
  - --> `background-color: #fff;`
- `h1{}`
  - --> `font-family: inherit;`
  - --> `font-weight: 500;`
  - --> `line-height: 1.1;`
  - --> `color: inherit;`
  - --> --> `margin-top: 20px;`
  - --> --> `margin-bottom: 10px;`
- `h6{}`
  - --> `font-family: inherit;`
  - --> `font-weight: 500;`
  - --> `line-height: 1.1;`
  - --> `color: inherit;`
  - --> --> `margin-top: 10px;`
  - --> --> `margin-bottom: 10px;`
  - --> --> --> `font-size: 12px;`
- `p{}`
  - --> `margin: 0 0 10px;`
- `img{}`
  - --> `border: 0;`
  - --> `vertical-align: middle;`
- `a{}`
  - --> `color: #337ab7;text-decoration:none;`
- `ul{}`
  - --> `margin-bottom: 10px; margin-top: 0;`
- `table{}`
  - --> `background: transparent; border-collapse: collapse;`
- `div` --> 无
- `span` --> 无
- 上述样式重置很多依赖于 `normalize.css` 第三方样式文件。

### Bootstrap全局样式

#### 与按钮相关的样式

- .btn
- .btn-default
- .btn-danger
- .btn-warnning
- .btn-success
- .btn-info
- .btn-primary
- .btn-lg
- .btn-sm
- .btn-xs
- .btn-block

#### 与图片相关的样式

- .img-rounded   圆角图片
- .img-circle    圆形图片
- .img-thumbnail 缩略
- .img-responsive 响应式图片

#### 与列表相关的样式

- .list-unstyle  没有提示符的列表
- .list-inline   行内列表

#### 与文本相关的样式

- .text-danger
- .text-success
- .text-warnning
- .text-info
- .text-primary
- .bg-danger
- .bg-success
- .bg-warnning
- .bg-info
- .bg-primary
- .text-left
- .text-right
- .text-center
- .text-justify
- .text-uppercase
- .text-capitalize
- .text-muted

#### 辅助类

- .close
- .caret
- .pull-left
- .pull-right
- .center-block  让内容块居中
- .clearfix
- .show
- .hidden
- .sr-only  对屏幕阅读器以外的设备隐藏内容
- .text-hide  图片替换

#### unit01pm-home

- em和rem的区别
- 自学“全局CSS样式”：辅助类、排版、代码
- 使用媒体查询编写如下的响应式网页：

![image.png-172.6kB][3]

## Unit02：全局CSS样式、组件

### 响应式网页基本要求(步骤)

- 声明viewport元标签
- 容器尽量使用相对尺寸
- 文字尽量使用相对大小
- 图片尽量使用相对尺寸
- 布局尽量使用流式布局
- 使用CSS3 Media Query

### 手写响应式网站心法

No.01: css初始化

```css
* {
    box-sizing: border-box; /*边框盒子*/
}

html {
    font-family: 'sans-serif';
    font-size: 10px;
}

body {
    font-family: 'Helvetica Neue';
    font-size: 14px;
    background: #fff; /**/
    margin: 0;
}

/*防止子元素越界*/
.container:before {
    content: ' ';
    display: table;
}

/*清除浮动*/
.container:after {
    content: ' ';
    display: table;
    clear: both;
}

/**系统默认分四种屏幕的样式**/
/**lg(超宽PC屏幕)屏幕：w>=1200px**/
@media screen and (min-width: 1200px) {
    .container {
        width: 1170px; /*bootstrap 默认数值*/
        margin: 0 auto; /*水平居中*/
    }
}
/**md(Medim，一般的中等PC屏幕)屏幕：1200px>w>=992px**/
@media screen and (min-width: 992px) and (max-width: 1199px) {
    .container {
        width: 970px; /*bootstrap 默认数值*/
        margin: 0 auto; /*水平居中*/
    }
}
/**sm(Small，平板电脑)屏幕：992px>w>=768px**/
@media screen and (min-width: 768px) and (max-width: 991px) {
    .container {
        width: 750px; /*bootstrap 默认数值*/
        margin: 0 auto; /*水平居中*/
    }
}
/**xs(ExtraSmall，手机设备)屏幕：768px>w**/
@media screen and (min-width: 767px) {
}
```

No.2 html

```html
<!--导航条-->
<div class="navbar">
    <div class="container">
        <img src="img/logo.png" alt="logo">
        <ul class="list-inline pull-right">
            <li><a href="#">起步</a></li>
            <li><a href="#">全局CSS样式</a></li>
            <li><a href="#">组件</a></li>
            <li><a href="#">JS插件</a></li>
            <li><a href="#">定制</a></li>
        </ul>
    </div>
</div>
<!--主题-->
<div class="main">
    <div class="container">
        <h1 class="text-center">Bootstrap</h1>
        <p class="text-center">Bootstrap 是最受欢迎的 HTML、CSS 和 JS 框架，用于开发响应式布局、移动设备优先的 WEB 项目。</p>
        <a class="btn btn-primary center-block" style="width: 200px" href="#">Bootstrap3中文文档(v3.3.7)</a>

        <div class="container-fluid">
            <img src="img/t1.png" alt="t1" class="my-img"/>
            <img src="img/t2.png" alt="t2" class="my-img"/>
            <img src="img/t3.png" alt="t3" class="my-img"/>
            <img src="img/t4.png" alt="t4" class="my-img"/>
        </div>
    </div>
</div>
```

No.3 css

```css
.list-inline {
    /*li默认样式去除，内边距去除*/
    list-style: none;
    padding: 0;
    margin-left: -5px;
}

.list-inline > li {
    padding: 0 5px;
    display: inline-block;
}

.pull-right {
    float: right !important;
}

a {
    color: #333;
    text-decoration: none;
}

h1 {
    font-size: 36px;
    margin: 20px 0 10px 0; /*抄袭bootstrap*/
}

.text-center {
    text-align: center;
}

.btn {
    padding: 6px 12px;
    background: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
}

.btn-primary {
    background: #337ab7;
    color: #fff;
    border-color: #2e6ba4;
}

.center-block {
    display: block;
    margin: 0 auto;
}

.container-fluid:before {
    content: ' ';
    display: table;
}

.container-fluid:after {
    content: ' ';
    display: table;
    clear: both;
}

.container-fluid{
    margin: 0 20px;
}

.my-img {
    float: left;
    padding: 5px;
}

/**系统默认分四种屏幕的样式**/
/**lg(超宽PC屏幕)屏幕：w>=1200px**/
@media screen and (min-width: 1200px) {
    .container {
        width: 1170px; /*bootstrap 默认数值*/
        margin: 0 auto; /*水平居中*/
    }

    .my-img {
        width: 25%;
    }
}

/**md(Medim，一般的中等PC屏幕)屏幕：1200px>w>=992px**/
@media screen and (min-width: 992px) and (max-width: 1199px) {
    .container {
        width: 970px; /*bootstrap 默认数值*/
        margin: 0 auto; /*水平居中*/
    }

    .my-img {
        width: 25%;
    }
}

/**sm(Small，平板电脑)屏幕：992px>w>=768px**/
@media screen and (min-width: 768px) and (max-width: 991px) {
    .container {
        width: 750px; /*bootstrap 默认数值*/
        margin: 0 auto; /*水平居中*/
    }

    .my-img {
        width: 50%;
    }
}

/**xs(ExtraSmall，手机设备)屏幕：768px>w**/
@media screen and (max-width: 767px) {
    .my-img {
        width: 100%;
    }
}
```

### bootstrap全局样式————表格table

- .table
- .table-bordered   带边框的表格
- .table-striped    隔行变色的表格
- .table-hover      鼠标悬停变色的表格
- .table-responsive 响应式表格，需用在table的父元素上

### bootstrap全局样式————栅格布局系统

#### 页面布局的几种方式

- Table布局
  - 好处：简单、容易控制
  - 问题：语义错误、渲染效率低
- Div+CSS布局
  - 好处：语义正确、渲染效率高
  - 问题：不容易控制
- bootstrap栅格布局
  - 好处：语义正确，渲染效率简单容易控制，响应式布局
  - 不足：没有？

#### 栅格布局系统的使用方法

- **栅格系统的父元素必须是**
  - div.container       ————定宽容器：lg:1170px、md:970px、sm:750px、xs:100%
  - div.container-fluid ————变宽容器：全部情况下100%
- **在容器中声明**“行”****
  - `div.container > div.row`
- **在**“行”**中声明**“列”****
  - `div.container > div.row > div.col-*-*`
- **列根据不同的屏幕尺寸分为四组：**
  - `.col-lg-*`
  - `.col-md-*`
  - `.col-sm-*`
  - `.col-xs-*`
- **一行均分为12等列，每个列必须指定自己的占比**
  - `.col-lg-1`
  - `.col-lg-2`
  - `.col-lg-3`
  - `.col-lg-12`
- **列可以向后“偏移”指定的宽度**
  - `.col-lg-offset-1`
  - `.col-lg-offset-2`
  - `.col-lg-offset-3`
  - `.col-lg-offset-12`

![image.png-6.3kB][4]

![image.png-138.8kB][5]

- **列的适用性**
  - 不同屏幕宽度下的列宽度占比适用于指定屏幕已经更大的屏幕
  - `.col-xs-*`     适用于xs/sm/md/lg屏幕
  - `.col-sm-*`     适用于sm/md/lg屏幕
  - `.col-md-*`     适用于md/lg屏幕
  - `.col-lg-*`     仅适用于lg屏幕

- **响应式的列宽占比**
  - 一个列可以指定在不同屏幕下的不同宽度占比
  - `<div class="col-xs-12 col-sm-9 col-md-6">`手机占100%、平板占75%、PC屏占50%
  - `<div class="col-xs-12 col-md-6">` 手机和平板占100%、PC屏占50%
- **指定列在特定屏下隐藏**
  - `.hidden-lg`
  - `.hidden-md`
  - `.hidden-sm`
  - `.hidden-xs`
  - `.hidden`
- **栅格系统可以嵌套**

```html
<div class="row">
    <div class="col-xs-1">
        <div class="row">
            <div class="col-xs-6">1/24</div>
            <div class="col-xs-6">1/24</div>
       </div>
    </div>
</div>
```

- **列偏移**
  - 控制某列**向右**偏移，并影响后续所有的列
  - `.col-lg/md/sm/xs-offset-*`
  - 作用：列左右留白、列右对齐、列居中

- **列的排序问题**
  - 控制某列向右、向左移动，并不影响其他列
  - 向右推、向左拉
  - `col-md-push-1/2/3...12`
  - `col-md-pull-1/2/3...12`

#### 格栅系统练习

![image.png-134.4kB][6]

### bootstrap全局样式——表单

#### 1.默认表单

![image.png-16.9kB][7]

- 代码结构

```html
    <form>
        <div class="form-group">
            <label class="control-label" for="uname">用户名：</label>
            <input class="form-control" type="text" id="uname">
            <span class="help-block">用户名必须是字母、数字或下划线</span>
        </div>
        <!--注意H5规范推荐的复选框和单选框的写法-->
        <!--SRP:单一责任原则-->
        <div class="form-group">
            <div class="checkbox">
                <label>
                    <input type="checkbox">保存登录七天
                </label>
            </div>
        </div>
        <div class="form-group">
            <input class="btn btn-success" type="button" value="提交">
            <input class="btn btn-danger" type="button" value="重置">
        </div>
    </form>
```

#### 2.行内表单

![image.png-6.7kB][8]

- `<form class="form-inline">`
- `<label class="sr-only" for="uname2">用户名：</label>`
- Screen Reader Only 仅屏幕阅读器可见
- 代码结构

```html
<form>
    <div class="form-group">
        <label class="sr-only">username</label>
        <input class="form-control" placeholder="">
    </div>
</form>
```

#### 3.水平表单

![image.png-20.8kB][9]

- 水平表单是指在一行内放置label、input、span，需要整合栅格系统(变种)和表单相关内容。

| 项目     |    标准栅格系统   |  水平表单中栅格系统  |
| :------: | :-----:     | :----:  |
| 外层容器 | div.container 或 div.continer-fluid |  form.form-horizontal |
| 行       | div.row    |   div.form-group   |
| 列       | div.col-\*-\*   |  div.col-\*-\*  |

```html
<form>
    <div class="form-group">
        <div class="col-*-*">
            <label class="sr-only">username</label>
        </div>
        <div class="col-*-*">
            <input class="form-control" placeholder="">
        </div>
    </div>
</form>
```

- 练习：如何在输入框中放置一个对勾、叉叉、放大镜？

### bootstrap组件——下拉菜单

- 下来菜单必须的三级结构
- `data-toggle="dropdown"`此属性必须引入bootstrap.js，其中会监听元素，并绑定事件监听函数。

```html
<div class="dropdown">
    <a data-toggle="dropdown">触发元素</a>
    <ul class="dropdown-menu">隐藏的菜单</ul>
</div>
```

### bootstrap组件——警告框

```html
<div class="alert alert-danger alert-dismissible">
    <span data-dismiss="alert" class="close">&times;</span>
    <h4>警告</h4>
    <p>你所打开的内容无法显示，请联系网络管理员！</p>
</div>
```

### bootstrap组件——图表字体

- bootstrap提供了200+个Glyphicons图标，使用方法：
  - `<span class="glyphicon glyphicon-*"></span>`
  - 提示：使用图标字体HTML标签中不能有任何子元素或文本！
- 练习：使用图标找到如下内容
  - 首页、配置、用户、定位、刷新、搜索、邮件、星星、心型、加号、减号、对勾、叉叉、上一张、下一张、前进、后退、播放、暂停、快进、快退 

### bootstrap组件——按钮组

- `btn-group`

### bootstrap组件——导航nav

- bootstrap提供了三种形式的导航组件
  - 标签页式导航(页签组件) `nav nav-tabs`
  - 胶囊式导航 `nav nav-pills`
  - 导航条专用导航

### bootstrap组件——缩略图

- 可以用于A元素或者DIV元素，用于展示一系列条目中的一个。
- 练习：使用格栅系统+缩略图实现“商城中的商品列表”

![image.png-12.6kB][10]

### bootstrap组件——媒体对象

媒体对象常用于商品列表：

```html
<div class="media">
    <div class="media-left">图片</div>
    <div class="media-body">主体</div>
    <div class="media-right">图片</div>
</div>
```

### bootstrap组件——列表组

- 用法1：无鼠标悬停效果

```html
<ul>
    <li class="list-group-item">
</ul>
```

- 用法2：有鼠标悬停效果

```html
<div>
    <a class="list-group-item"></a>
</div>
```

### bootstrap的JS插件——collapse

- 折叠效果，本身使用很简单
- 折叠的应用场景
  - 手风琴：折叠效果插件 + 面板组
  - 响应式导航条

```html
<a data-toggle="collapse" href="#myID">触发元素</a>
<div id="myID" class="collapse in">
    内容
</div>
```
  
#### 扩展：前端实现动画可用的技术

- JavaScript定时器 烂啊--jQuery1/2中都用此技术
- CSS3 Transition  不错
- CSS3 KeyFrames   不错
- requestAnimationFrame 最好--jQuery3

### bootstrap组件——响应式导航条

![image.png-38kB][11]

- 代码结构

```html
<div class="navbar navbar-default"> 
    <div class="container">
        <div class="navbar-header"> 
            /*仅能放‘商标’和‘汉堡’*/
        </div>
        <div class="navbar-collapse collapse">
            /*折叠隐藏的内容，如导航、表单、链接...*/
        </div>
    </div>
</div>
```

```html
<div class="navbar navbar-default navbar-fixed-top">
    <div class="container">
        <div class="navbar-header">
            <!--商标和汉堡包-->
            <a class="navbar-brand" href="#">
                <img src="img/wangdoc.png" style="height: 50px; margin-top: -15px;" alt="logo">
            </a>
            <a href="#myMenu" data-toggle="collapse" class="navbar-toggle">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </a>
        </div>
        <div id="myMenu" class="navbar-collapse collapse">
            <!--导航条中的导航-->
            <ul class="nav navbar-nav">
                <li><a href="#">首页</a></li>
                <li><a href="#" class="active">新闻</a></li>
                <li><a href="#">产品</a></li>
            </ul>
            <!--导航条中的导航-->
            <ul class="nav navbar-nav navbar-right">
                <li><a href="#">注册</a></li>
                <li><a href="#">登录</a></li>
            </ul>
            <!--导航条中的表单-->
            <form class="navbar-form navbar-right hidden-xs">
                <div class="form-group">
                    <label for="kw" class="sr-only">搜索关键字：</label>
                    <input type="text" class="form-control" id="kw" placeholder="请输入搜索关键字">
                </div>
            </form>
        </div>
    </div>
</div>
```

- 导航条的种类，按颜色分：
  - 浅色底深色字：`navbar.navbar-default`
  - 深色底浅色字：`navbar.navbar-inverse`
- 导航条的种类，按定位分：
  - 相对定位(占用空间)：`.narbar`
  - 固定定位(不占空间)：`.navbar.navbar-fixed-*`
- 导航条的种类，按位置分：
  - 固定在顶部：`.navbar.navbar-fixed-top`
  - 固定在底部：`.navbar.navbar-fixed-bottom`

  [1]: http://static.zybuluo.com/szy0syz/abamsxlsv398rc80vl95lxtc/image.png
  [2]: http://static.zybuluo.com/szy0syz/7kenz001yzcpzgmm33rik1b2/image.png
  [3]: http://static.zybuluo.com/szy0syz/ly98vj2zh0wc9h9wfak2ov1a/image.png
  [4]: http://static.zybuluo.com/szy0syz/u9cbh3ikpn11q2yh1hj6ufsh/image.png
  [5]: http://static.zybuluo.com/szy0syz/4svm3w9se7x2ti0f6j3jo95e/image.png
  [6]: http://static.zybuluo.com/szy0syz/whk6hzuzpbrnx4z0rmqagyhn/image.png
  [7]: http://static.zybuluo.com/szy0syz/13kuumwbnygsetxbixvm2a2r/image.png
  [8]: http://static.zybuluo.com/szy0syz/ld5unqv6yyh9lovcmrxlel93/image.png
  [9]: http://static.zybuluo.com/szy0syz/ijxacstvycy9voc5tbyulbbz/image.png
  [10]: http://static.zybuluo.com/szy0syz/lvf593ri8uxwcyxfqant7gmz/image.png
  [11]: http://static.zybuluo.com/szy0syz/q52n71hujue8gehilqld6m62/image.png
