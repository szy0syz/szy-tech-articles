# 达内前端培训 CH16_HTML5Core

[TOC]

### (1)新的语义标签和属性

##### 面试题：Flashb被HTML5取代在哪些方面

- 音频和视频 ———— `<video>` 和 `<audio>`
- 绘图       ———— `<canvas>`
- 动画和游戏 ———— `<canvas>` + 定时器
- 统计图表   ———— `<canvas>` 和 `<svg>`
- 客户端数据存储 ———— WebStorage

### (2)表单新特性

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

### (3)视频和音频

- 讲义里

### (4)Canvas绘图

```js
<canvas id="c1" width="600" height="400"></canvas>
var ctx = c1.getContext('2d');
```

> Canvas可以理解为画布，通过js获取上下文后使用JavaScript代码绘图，所以属于JavaScript绘图技术。

#### 常用属性

- ctx.fillStyle = 颜色/渐变对象
- ctx.strokeStyle =颜色/渐变对象
- ctx.lineWidth = 1
- ctx.font = '10px sans-serif'
- ctx.textBaseline = 'alphabetic'
- ctx.shadowColor = 'rgba(0,0,0,0)'
- ctx.shadowOffsetX = 0
- ctx.shadowOffsetY = 0
- ctx.shadowBlur = 0



#### 常用方法

- 矩形
  - ctx.fillRect(x, y, w, h)
  - ctx.strokeRect(x, y, w, h)
  - ctx.clearRect(x, y, w, h)
- 绘制文本
  - ctx.fillText(txt, x, y)
  - ctx.strokeText(txt, x, y)
  - ctx.measureText(txt).width

#### 注意

- 绝对不要用CSS指定canvas的宽和高(如指定800*600)，因为那是没用实际作用，并没有实际扩大了画布大小，而是把画布默认300px*150px的大小放大8/3 + 6/1.5倍数的大小

#### 使用Canvas绘制路径(Path)

- 提示：Canvas中的概念与photoshop中钢笔类似的。
  - 路径本身不可见，有三个用途：描边、填充(闭合)、裁剪(闭合)
- Canvas中与路径绘制相关的方法：

![image.png-24.2kB][2]

#### Canvas练习

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

#### 小结：Canvas可以绘制的内容

- 矩形：`ctx.fillRect()` `ctx.strokeRect()` `ctx.clearRect()`
- 文本：`ctx.fillText()` `ctx.strokeText()` `ctx.measureText()`
- 路径 —— 描边、填充、裁剪
  - `ctx.beginPath()` `ctx.closePath()` `ctx.moveTo` `ctx.lineTo` `ctx.arc` `ctx.stroke()` `ctx.fill()` `ctx.clip()`
- 图像 `ctx.drawImage()`
- 状态 `ctx.translate()` `ctx.rotate()` `ctx.scale()` `ctx.save()` `ctx.restore()`

#### 绘图上下文的状态和恢复———— 难点&晦涩

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

#### 项目中Canvas技术的注意应用

1. 绘制统计图
2. 小游戏
3. 绘图板
4. 动态背景(交互+动画)

#### Canvas第三方库Chartjs

- 一款开源的、提供了8种图表的、基于Canvas、响应式图表绘制工具库。
- 参考Demo

```js
new Chart(CanvasCtx, {
    type: ‘bar’,  // 图表类型，共有8种
    data: {},     // 图表必须的数据
    options: {}   // 可选项
});
```

#### homework04 随机验证码

- 使用Canvas绘制一个随机改变的验证码图片
  - var str = 'ABCDEFGHJKLMNPQRSTWXY3456789';
  - var char = str[ 0~字符串长度间的随机数 ];
- 要求：
  - 画布背景颜色随机(浅色) ctx.fillRect()
  - 文字内容随机、大小随机，颜色随机(深色)、旋转角度随机
  - 5条随机干扰线（深色），处于文字上方
  - 100个杂色点（半径为1为圆），处于文字上方

#### homework05 网易云音乐界面

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

#### 项目小结

- 如何等待所有图片都加载完毕后才开始绘图？
- 123


### (5)SVG绘图

- Scalable Vector Graphiph，可缩放的矢量图，此技术在2000年就已经存在了，独立于网页的一门技术；HTML5之后，纳入了HTML5标准标签库，并进行了一定的瘦身。

| 项目          | Canvas绘图           | SV绘图             |
| :-----------: |:--------:            | :-----:            |
| 绘图类型      | 位图                 |     矢量图         |
| 缩放          | 失真                 |      保真          |
| 颜色细节      | 丰富                 |    不够丰富        |
| 应用领域      | 照片、游戏、统计图   | 统计图、图标、地图 |
| 内容          | JavaScript等脚本绘制 | 每个图形都是标签   |
| 事件绑定      | 不方便               |    不够丰富        |

### (6)地理定位


### (7)拖放API


### (8)WebWorker


### (9)WebStorage


### (10)WebSocket


  [1]: https://www.html5rocks.com/zh/tutorials/forms/html5forms/
  [2]: http://static.zybuluo.com/szy0syz/zwtvtvpy3vqwqlydc47qutnv/image.png
  [3]: http://static.zybuluo.com/szy0syz/s8cqrxed2z260z74078trk7o/image.png
  [4]: http://static.zybuluo.com/szy0syz/yfjlkfmosved6ivq1ze2iem2/image.png
  [5]: http://static.zybuluo.com/szy0syz/qkpsz65o5zgal639wukbc49t/image.png
  [6]: http://static.zybuluo.com/szy0syz/if0flbc0h5gf2eq8gf40y7nj/image.png
  [7]: http://static.zybuluo.com/szy0syz/lw4nw5dwx6j8v3h470iy78gs/image.png
  [8]: http://static.zybuluo.com/szy0syz/dqafl7fz994duutvlhqh0ubw/image.png
  [9]: http://static.zybuluo.com/szy0syz/j4qvoxcg4ki7yw4sdjt1ur3t/m%E4%BA%91%E9%9F%B3%E4%B9%90.png