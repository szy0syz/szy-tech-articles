# 达内前端培训 CH16_HTML5Core

[TOC]

## (1)新的语义标签和属性

#### 面试题：Flashb被HTML5取代在哪些方面

- 音频和视频 ———— `<video>` 和 `<audio>`
- 绘图       ———— `<canvas>`
- 动画和游戏 ———— `<canvas>` + 定时器
- 统计图表   ———— `<canvas>` 和 `<svg>`
- 客户端数据存储 ———— WebStorage

## (2)表单新特性

- 新的input type —— 10个
  - email、url、number、tel(PC无效果,手机端弹出拨号盘)、search、range(滑块选择)、color(颜色选择)、date(日期选择)、month、week
- 新的表单元素 —— 4个
  - datalist、progress(进度条)、meter、output(输出-语义标签) 
- 表单元素的新属性 —— 12个
  - autocomplete(自动补全)、autofoucus、placeholder(占位符)、multipe、form
  - 验证相关属性 required、maxlength、minlength、max、min、step(限定步长,只能是偶数)、patten(样式验证)
- homework-HTML5表单练习
  - 要注意html5标准表单书写方式
  - `.form-group>label.control-label+input.form-control+span.help-block`
  - 表单中每一列拿个`div`包起来，且用个`.form-group`
  - `.control-label`为控件标签、`input.form-control`为表单控件(表单每一列最好只要一个表单控件)、`span.help-block`为帮助块(用作提示作用)
  - 表单中每一列之间有点像素的间隔，`.form-group:not(:last-child)`先选择所有.form-group元素然后在集合里排除最后一个子元素
  - 每个表单控件对象都有`validity`属性，在其中包含了很多验证相关的属性
  - `this.setCustomValidity(msg)`设置自定义验证消息
- HTML5表单文章收藏: [利用 HTML5 美化表单 - HTML5 Rocks][1]

## (3)视频和音频

- 讲义里

## (4)Canvas绘图

```js
<canvas id="c1" width="600" height="400"></canvas>
var ctx = c1.getContext('2d');
```

> Canvas可以理解为画布，通过js获取上下文后使用JavaScript代码绘图，所以属于JavaScript绘图技术。

### 常用属性

- ctx.fillStyle = 颜色/渐变对象
- ctx.strokeStyle =颜色/渐变对象
- ctx.lineWidth = 1
- ctx.font = '10px sans-serif'
- ctx.textBaseline = 'alphabetic'
- ctx.shadowColor = 'rgba(0,0,0,0)'
- ctx.shadowOffsetX = 0
- ctx.shadowOffsetY = 0
- ctx.shadowBlur = 0

### 常用方法

- 矩形
  - ctx.fillRect(x, y, w, h)
  - ctx.strokeRect(x, y, w, h)
  - ctx.clearRect(x, y, w, h)
- 绘制文本
  - ctx.fillText(txt, x, y)
  - ctx.strokeText(txt, x, y)
  - ctx.measureText(txt).width

### 注意

- 绝对不要用CSS指定canvas的宽和高(如指定800*600)，因为那是没用实际作用，并没有实际扩大了画布大小，而是把画布默认300px*150px的大小放大8/3 + 6/1.5倍数的大小

### 使用Canvas绘制路径(Path)

- 提示：Canvas中的概念与photoshop中钢笔类似的。
  - 路径本身不可见，有三个用途：描边、填充(闭合)、裁剪(闭合)
- Canvas中与路径绘制相关的方法：

![image.png-24.2kB][2]

### Canvas练习

![image.png-2.5kB][3] 

- 使用Canvas绘制简单的坐标轴

![image.png-44kB][4]

- 使用圆供和定时器绘制可以前进的进度条
  - 解题思路：
- 创建一个函数`openMouth()`，在画布上绘制如下的图形：

![image.png-15.1kB][5] 

- 创建一个函数`closeMouth()`，在画布上绘制如下的图形：

![image.png-12.3kB][6]

- 使用定时器，不停的调用openMouth()和closeMouth()函数 

### 小结：Canvas可以绘制的内容

- 矩形：`ctx.fillRect()` `ctx.strokeRect()` `ctx.clearRect()`
- 文本：`ctx.fillText()` `ctx.strokeText()` `ctx.measureText()`
- 路径 —— 描边、填充、裁剪
  - `ctx.beginPath()` `ctx.closePath()` `ctx.moveTo` `ctx.lineTo` `ctx.arc` `ctx.stroke()` `ctx.fill()` `ctx.clip()`
- 图像 `ctx.drawImage()`
- 状态 `ctx.translate()` `ctx.rotate()` `ctx.scale()` `ctx.save()` `ctx.restore()`

### 绘图上下文的状态和恢复———— 难点&晦涩

- `var ctx = canvas.getContext('2d');`

![image.png-12.8kB][7]

- 可以将 **绘图上下文对象(即画笔对象)** 进行变形(transform) —— 与对Canvas元素施加CSS Transform样式不同，绘图上下文的变形只影响当前绘制的图形图像内容
  - `ctx.translate()` 坐标轴原点平移到指定点，所有点的坐标都发生改变
  - `ctx.rotate()` 画笔旋转，则内容旋转，轴点在坐标轴原点
  - `ctx.scale()` 缩放
  - `ctx.save()` 保存绘图上下文(画笔)当前的变形数据
  - `ctx.restore()` 恢复最近一次保存的画笔的变形相关状态
- 画笔的平移、旋转、缩放有累加效果！
- 心法：：在Canvas中绘制一个旋转的飞机
  - 首先在循环外`translate(x,y)`移动坐标原点只目标坐标(如画布中央)
  - 然后进入循环定时器
  - 先清整个画布(因为移动了坐标点，清除的起始坐标为-x,-y)
  - 再移动画笔5度
  - 最后画飞机，因坐标已经移动到，画的坐标仅需-planeWidth和-planeHeight即可
  - 进入循环~
- 练习：绘制四个小飞机，各在画布的一个角且绕着自己的中心在旋转。
  - 注意：先将轴点translate到第一个小飞机中心，再translate做左上角，再translate到第二个小飞机中心点，旋转后再回左上角，以此类推...

### 项目中Canvas技术的注意应用

1. 绘制统计图
2. 小游戏
3. 绘图板
4. 动态背景(交互+动画)

### Canvas第三方库Chartjs

- 一款开源的、提供了8种图表的、基于Canvas、响应式图表绘制工具库。
- 参考Demo

```js
new Chart(CanvasCtx, {
    type: ‘bar’,  // 图表类型，共有8种
    data: {},     // 图表必须的数据
    options: {}   // 可选项
});
```

### homework04 随机验证码

- 使用Canvas绘制一个随机改变的验证码图片
  - var str = 'ABCDEFGHJKLMNPQRSTWXY3456789';
  - var char = str[ 0~字符串长度间的随机数 ];
- 要求：
  - 画布背景颜色随机(浅色) ctx.fillRect()
  - 文字内容随机、大小随机，颜色随机(深色)、旋转角度随机
  - 5条随机干扰线（深色），处于文字上方
  - 100个杂色点（半径为1为圆），处于文字上方

### homework05 网易云音乐界面

![image.png-141.2kB][8]![m云音乐.png-152.5kB][9]

- 仿网易云音乐的播放界面
  - 点击播放按钮，碟片开始旋转，背景音乐开始播放；
  - 再次点击播放按钮，碟片停止旋转，背景音乐停止播放。

- V1版项目完成心得：
  - V1仅按照iphone5实现界面，V2使用rem重新做。
  - 项目一开始一个container容器包裹，然后开始分开。
  - 先从评论开发分上下两块，上块包含logo、needle、disc的Canvas、playBtn、歌词，下块则评论和fixed的按钮区
  - 加载歌曲封面和disc背景图，待加载完毕后将画布ctx的原点位移至画布中垂点
  - Canvas旋转disc时，先修改播放器状态和audio播放起来，再清除画布，旋转一定读书的画笔，之后立马保存此状态，因为要开始画图了，因为涉及到了放大画笔
  - 画图，然后恢复画笔，然后又保存状态，又放大画笔，有画图，恢复画笔，手工、
  - toggle()函数实现disc和audio的旋转与播放，停止播放其实就是清除定时器。
  - 在上块区域的最后一个子元素加一个`div.clickarea`，修改display后再修改z-index为10，背景是透明的，放置在最上方，这样用户点击后toggle播放器

### 项目小结

- 如何等待所有图片都加载完毕后才开始绘图？
- 123


## (5)SVG绘图

- Scalable Vector Graphiph，可缩放的矢量图，此技术在2000年就已经存在了，独立于网-页的一门技术；HTML5之后，纳入了HTML5标准标签库，并进行了一定的瘦身。

| 项目          | Canvas绘图           |     SVG绘图         |
| :-----------: |:--------:            |    :-----:         |
| 绘图类型      | 位图                 |     矢量图         |
| 缩放          | 失真                 |      保真          |
| 颜色细节      | 丰富                 |    不够丰富        |
| 应用领域      | 照片、游戏、统计图   | 统计图、图标、地图 |
| 内容          | JavaScript等脚本绘制 | 每个图形都是标签   |
| 事件绑定      | 不方便               |    不够丰富        |

### SVG和Canvas区别

- SVG
  - 不依赖分辨率
  - 支持事件处理
  - 最适合带有大型渲染区域的应用程序(如百度地图)
  - 不适合游戏
- Canvas
  - 依赖分辨率
  - 不支持事件处理
  - 能够以".png" 或 ".jpg" 格式保存结果图像
  - 最适合图像密集型游戏开发

- Adobe Photoshop：处理**位图**————每幅图像由点(RGB)组成，用于描述颜色的细节变化，可用于照片等领域，但放大后会出现马赛克失真。
- Adobe Illustrator：处理**矢量图**————每幅图像由线条(需要指定方向和值)，可以无限缩放而不失真—————不善于描述颜色的细节变化

### SVG基本使用

```xml
<?xml version="1.0" encoding="utf-8" ?>
<!--XML Name Space: 命名空间，指定当前标签用于何种语境-->
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100">
    <rect width="100" height="50"></rect>
</svg>
```

#### H5之前使用SVG

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>started</title>
</head>
<body>
    <h3>Html5之前只用SVG</h3>
    <img src="started.svg" alt="svg">
    <hr>
    <iframe src="started.svg" frameborder="0"></iframe>
    <hr>
    <object data="started.svg"></object>
    <hr>
    <embed src="started.svg" >
</body>
</html>
```

- http://SVG标签不属于HTML4或XHTML标签，只能编写在独立的XML文件中，首先编写一个SVG文件（本质是一个XML文件），然后在HTML中使用IMG/IFRAME/OBJECT/EMBED等标签引入.svg文件。

#### 在H5之中使用SVG

- 在HTML文件中直接使用SVG相关标签即可
  - `<svg>默认是300*150的行内块元素</svg>` 

#### 练习

- 练习1：
  - 方式1：使用SVG矩形绘制一个国际相机的棋盘————使用HTML-rect标签
  - 方式2：使用SVG矩形绘制一个国际相机的棋盘————使用JS动态创建HTML-rect标签

```js
  const svgns = "http://www.w3.org/2000/svg";
  const svg = document.getElementById("pan");
  const base = 80, h = 80, w = 80;
  let i = 0, j = 0, rect = null;
  let frag = document.createDocumentFragment();
  for (; i < 8; i++) {
    let even = i % 2 === 0;
    for (; j < 4; j++) {
      rect = document.createElementNS(svgns, 'rect');
      rect.setAttributeNS(null, 'width', w);
      rect.setAttributeNS(null, 'height', h);
      rect.setAttributeNS(null, 'x', even ? j * 2 * base : (j * 2 + 1) * base);
      rect.setAttributeNS(null, 'y', i * base);
      frag.appendChild(rect);
      rect = null;
    }
    /*完成一次外循环后重置j为0*/
    j = 0;
  }
  svg.appendChild(frag);
```


### 使用SVG画矩形

- `<rect height="" width="" x="" y="" fill="#f00" fill-opacity="" stroke="" strok-width="" strok-opacity=""></rect>`
- 注意：
  - SVG图形的样式可以用HTML属性赋值，也可以使用CSS形式，但不接受普通CSS样式！只能使用SVG元素的专有样式属性。
  - 使用JS修改时不能直接`myRect.x=200`，因为这样是能修改dom对象上新增一个x属性并赋值200，对SVG元素不生效，必须使用修改核心dom属性的方式修改，`rect.setAttribute('width', w);`，直接修改文档中dom元素的核心(行内)属性。
  - 所有的SVG图形的属性不属于HTMLDOM标准，只能使用核心DOM方法操作其属性：`rect.setAttribute(key,val)`
  - 使用JS动态添加SVG元素时，要么用`svg.innerHTML=""`覆盖，要么`document.createElementNS(ns,tag)`创建，不能直接使用`document.createElement(tag)`

![501511449222_.pic.jpg-22.7kB][10]

- 练习：
  - 在SVG画布上绘制一个矩形，从左到只右移动，同时填充颜色还在不停的变化
  - 根据如下json数据，绘制柱状统计图：

```js
  var x = 0, step = 10, dir = 0;
  function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  setInterval(function () {
    rect.setAttribute('fill', randomColor());
    if (x >= 500) {
      dir = 1;
    }
    if (x <= 0) {
      dir = 0;
    }
    x = dir === 0 ? x + step : x - step;
    rect.setAttribute('x', x);
  }, 50);
```

### 使用svg画圆形

- `<circle r="10" cx="10" cy="10"></circle>`
- 练习1：创建30个大小随机、颜色随机、透明度随机的原形
- 练习2：在以上基础上，当点击某个原形时，其慢慢变大、变淡...直到消失，最后从DOM树上删除该元素（可以判断透明度是否为零确实是否删除）

![image.png-30.9kB][11]

### 使用svg画椭圆

- 椭圆：半径在X轴和Y轴不一样的圆
- `<ellipse rx="" ry="" cx="" cy=""></ellipse>`

### 使用svg画直线

- `<line x1="" y1="" x2="" y2="" stroke=""></line>`
- 注意：所有SVG图形默认只有填充颜色，没有描边色。
- 练习：使用 line 创建如下图标：<三道杠>
- 提示：把多个元素放在一个`<g></g>`Group小组中，可以自动继承小组的公共属性

![image.png-2.8kB][12]

```js
<svg width="400" height="400">
    <g stroke="#f00" stroke-width="40">
        <line x1="30" y1="100" x2="100" y2="100"></line>
        <line x1="30" y1="200" x2="100" y2="200"></line>
        <line x1="30" y1="300" x2="100" y2="300"></line>
        <line x1="160" y1="100" x2="330" y2="100"></line>
        <line x1="160" y1="200" x2="330" y2="200"></line>
        <line x1="160" y1="300" x2="330" y2="300"></line>
    </g>
</svg>
```

### 使用svg画折线

- `<polyline points="x1,y1 x2,y2 x3,y3 ..."></polyline>`
- 折线默认手尾闭合且填充，所以需要我们将填充透明
- 练习：使用折线绘制如下的图标 ★

### 使用svg画多边形

- `<polygon points="x1,y1 x2,y2 x3,y3 ..."></polygon>`
- 练习：使用多边形polygon绘制如下图标

![image.png-2kB][13]

### 使用svg画文本

- 提示：传统的标签不能置于SVG内部！同理，SVG的标签也不能放其他元素中！
- `<text font-size="" alignment-baseline="before-edge" x="" y="">文本</text>`

### 使用svg画图像

- 提示：在SVG中绘制图像使用image元素，引入位图后，此SVG图片方法后同样会失真。
- `<image width="" height="" xlink:href="xx.jpg" x="" y=""></image>`

### SVG渐变元素

- 什么是渐变
  - 渐变是一种从一种颜色到另一种颜色的平滑过度(可以将多个颜色的过度应用到同一个元素上)
- SVG渐变类型
  - SVG线性渐变，使用`<lineGradient>`标签定义线性渐变
  - SVG放射性渐变，使用`<radiaGradient>`标签定义放射性渐变
- 注意：**SVG渐变必须在`<defs>`标签中进行定义**

```js
<defs>
    <linearGradient id="g2" x1="" y1="" x2="100%" y2="">
        <stop offset="0" stop-color="" stop-opacity=""></stop>
        <stop offset="100%" stop-color="" stop-opacity=""></stop>
    </linearGradient>
</defs>
<rect width="" height="" fill="url(#g2)"></rect>
```

- 练习一：使用svg绘制如下统计图

![image.png-54.9kB][14]

- 练习二：自学two.js，绘制如下旋转效果：太阳、地球和月亮

![image.png-25.5kB][15]

### svg特效——滤镜

- 类似Photoshop中的滤镜

```html
<svg width="600" height="500">
    <defs>
        <!--<linearGradient></linearGradient>-->
        <filter id="f1">
            <fegaussianblur stdDeviation="3"></fegaussianblur>
        </filter>
        <filter id="f2">
            <fegaussianblur stdDeviation="6"></fegaussianblur>
        </filter>
    </defs>
    <text font-size="50" x="20" y="100">葫芦娃，今天大日子。</text>
    <text filter="url(#f1)" font-size="50" x="20" y="200">葫芦娃，今天大日子。</text>
    <text filter="url(#f2)" font-size="50" x="20" y="300">葫芦娃，今天大日子。</text>
</svg>
```

### 复习

- SVG可以不在元素内设置宽高，在CSS中指定宽高，但Canvas就不行，如果不在元素内部指定在CSS指定的话则意味着缩放Canvas画布！
- 前端领域中可以用的绘图技术：
  - Canvas ———— 2D位图
  - SVG    ———— 2D矢量图
  - WebGL  ———— 2D/3D图
- 绘制统计图，以上任意一种均可用，但三种技术可供调用的代码不一样！ 

### Two.js

- 一套提供了统一接口，可用在Canvas、SVG和WebGL中常见图形的绘制，如矩形、三角形、圆形等...
- 不足：为了兼容三种技术，必须舍弃某个技术所专用的效果，效率上有待提高。
- 一般使用：
  - 先配参数
  - 再用参数实例化two(相当于画布)
  - 然后对需要的子实例进行实例化
  - 最后将数据从内存渲染的浏览器update

unit5am 02：07：06

## (6)地理定位

- 使用JS获取浏览器当前所在的地理坐标，实现LBS(Location Based Service)，具体包括：
  - 经度
  - 维度
  - 海拔
  - 速度
- 技术上如何获取浏览器所在的定位信息：
- 手机中的浏览器
  - 靠手机内置的GPS芯片数据，精度在“米”级
  - 靠手机与基站的数据，精度在“公里”级
- PC中的浏览器
  - 靠IP地址反向解析，精度在“公里”级
- HTML5新增用于获取浏览器所在定位的对象：
- `window.navigator.geolocation`
- `.getCurrentPosition: fn` 用于获取当前定位信息
- `.watchPosition: fn` 不停的监视定位信息的改变
- `.clearWatch: fn` 清除监视

### 百度地图的使用

## (7)拖放API

- 拖：Drag ，放：Drop  --> D&D ，HTML5为拖放x效果提供了七个事件，其中分为两组
- 拖动的源对象(source)可以触发的事件
  - dragstart：拖动开始
  - drag：拖动进行中
  - dragend：拖动结束
  - 源对象的拖动过程：dragstart*1 + drag*n + dragend*1 组成
- 练习：实现一个可以跟随鼠标拖动而移动的小飞机
- 拖动的目标对象(target)可以触发的事件
  - dragenter：拖动着进入
  - dragover：拖动着在目标对象上方
  - dragleave：拖动着离开
  - drop：松手/释放/松开
  - 目标对象的进入/离开过程：dragenter*1 + dragover*n + dragleave*1
  - 目标对象的进入/释放过程：dragenter*1 + dragover*n + drop*1
  - 注意：必须阻止dragover的默认行为，否则drop事件无法触发！
- 练习1：垃圾桶初始时半透明；拖动小飞机进入垃圾桶变为不透明；离开后重新恢复半透明；在垃圾桶上松手也变为半透明！提示：只需要用到目标对象的四个事件
  - 心法开始：
  - 全局空间保存dragged对象
  - drag事件，阻止冒泡传递
  - dragstart事件，保存触发对象的ref.引用，并修改样式
  - dragend事件，恢复触发对象的样式
  - dragover事件，阻止默认行为，为了触发drop事件
  - dragenter事件，判断是谁进来了，然后修改样式
  - dragleave事件，一样的，判断谁离开了，然后又去修改样式
  - drop事件，也一样的，判断谁drop了，然后触发逻辑
  - 心法完了。
- 练习2：一个垃圾桶，下方有一个容器(div#container)，其中有三架小飞机，拖动某个小飞机到垃圾桶上方，则页面中删除此小飞机。提示：需要用到源对象和目标对象的事件

- 一个例子完美诠释HTML5-D&D
  - 一开始定义个dragged元素存储单页面中拖动的“源对象”
  - 所有时间都直接加到“document”上，因为时间冒泡传递，最终还是会传递到“document”
  - 一定记得，在document.dragstart事件上给全局变量dragged赋值dom元素的引用哦，对了还可以改变样式~
  - 后面又在document.dragend事件上对源对象恢复样式
  - 对对对，所有7个事件都要阻止冒泡！当然也就意味着还需要在dragover阻止默认行为，这样drop事件才会触发啦！
  - 好了，终于进到了dragenter事件中，此时就可以判断进来的元素到底是“谁”，然后根据需求改样式
  - 对也，又进到了dragleave事件中，同样我们也判断“谁”离开的，然后根据需求恢复样式
  - 哈哈，终结者drop事件到了，进来就先阻止默认行为`preventDefault()`，然后判断是不是我们指定的源对象drop到了目标对象，是的话就进行逻辑操作，完了！
  - 这个例子写得真好！

```js
  var dragged;

  /* events fired on the draggable target */
  document.addEventListener("drag", function (event) {

  }, false);

  document.addEventListener("dragstart", function (event) {
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    event.target.style.opacity = .5;
  }, false);

  document.addEventListener("dragend", function (event) {
    // reset the transparency
    event.target.style.opacity = "";
  }, false);

  /* events fired on the drop targets */
  document.addEventListener("dragover", function (event) {
    // prevent default to allow drop
    event.preventDefault();
  }, false);

  document.addEventListener("dragenter", function (event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == "dropzone") {
      event.target.style.background = "purple";
    }

  }, false);

  document.addEventListener("dragleave", function (event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
    }

  }, false);

  document.addEventListener("drop", function (event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();
    // move dragged elem to the selected drop target
    if (event.target.className == "dropzone") {
      event.target.style.background = "";
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
    }

  }, false);
```

#### 如何在拖动的源对象和目标对象间传递数据

- 如何在以下的七个事件中传递数据？
  - 源对象事件————3个：
  - 目标对象事件————4个
- 方法一：使用全局对象 ———— 全局对象污染
- 方法二：使用拖放事件对象的dataTransfer属性
  - dataTransfer，用作数据传递/转移，看作“拖拉机” 
  - 使用：
  - 在源对象上 `ev.dataTransfer.setData('myKey', '20171130');`
  - 在目标对象上 `var val = ev.dataTransfer.getData('myKey');`

#### 作业题：游戏飞机选择

![image.png-40.9kB][16]

- 要求：拖动某家飞机到目标区域，则在上方显示该飞机；下方该飞机图消失；替换选中区域已有的飞机。拖动另一架飞机到目标区域，则显示出该飞机，之前选中的飞机则重新显示在待选区域。

### 拖拽扩展：客户端文件拖拽到浏览器端

- 面试题：如何在服务器端下载的网页中显示客户端图片？
- 一般情况下，网页只能显示服务器上的图片；
- HTML5中，可以实现用户拖拽一张本地的图片显示在服务器端下载的网页中。
  - HTML5中提供的用于文件输入输出(I/O)的对象：
  - File：代表一个文件/目录对象
  - FileList：代表一个文件列表(类数组对象)
  - FileReader：用于从文件中读取内容
  - FileWriter：用于向文件中写入内容
- 核心代码：

```js
container.ondrop = function(ev) {
    var f0 = e.dataTransfer.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(f0);
    reader.onload = function() {
        // 读取完成后结果保存在result中
        var dataUrl = reader.result;
    }
}
```


## (8)WebWorker


## (9)WebStorage


## (10)WebSocket


  [1]: https://www.html5rocks.com/zh/tutorials/forms/html5forms/
  [2]: http://static.zybuluo.com/szy0syz/zwtvtvpy3vqwqlydc47qutnv/image.png
  [3]: http://static.zybuluo.com/szy0syz/s8cqrxed2z260z74078trk7o/image.png
  [4]: http://static.zybuluo.com/szy0syz/yfjlkfmosved6ivq1ze2iem2/image.png
  [5]: http://static.zybuluo.com/szy0syz/qkpsz65o5zgal639wukbc49t/image.png
  [6]: http://static.zybuluo.com/szy0syz/if0flbc0h5gf2eq8gf40y7nj/image.png
  [7]: http://static.zybuluo.com/szy0syz/lw4nw5dwx6j8v3h470iy78gs/image.png
  [8]: http://static.zybuluo.com/szy0syz/dqafl7fz994duutvlhqh0ubw/image.png
  [9]: http://static.zybuluo.com/szy0syz/j4qvoxcg4ki7yw4sdjt1ur3t/m%E4%BA%91%E9%9F%B3%E4%B9%90.png
  [10]: http://static.zybuluo.com/szy0syz/fdj87li5hc324q05cdmoeq13/501511449222_.pic.jpg
  [11]: http://static.zybuluo.com/szy0syz/78zl1xboopgc6fswaojpxiqz/image.png
  [12]: http://static.zybuluo.com/szy0syz/ze1f01ffij85gen9lcukgfw6/image.png
  [13]: http://static.zybuluo.com/szy0syz/rm8ypz89r68o43tkut5ngpeg/image.png
  [14]: http://static.zybuluo.com/szy0syz/swyj9jkgnz1mds97surhim81/image.png
  [15]: http://static.zybuluo.com/szy0syz/mwmxabjcp8edsv1ntg8h6p1f/image.png
  [16]: http://static.zybuluo.com/szy0syz/pq8sbh3u9p9nuafdbkm5gj30/image.png