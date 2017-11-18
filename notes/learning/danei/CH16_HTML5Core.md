# 达内前端培训 CH16_HTML5Core

[TOC]

## Unit1 HTML5表单元素、HTML5表单属性、HTML5表单验证

## HTML5新特性

### (1)新的语义标签和属性

##### 面试题：Flashb被HTML5取代在哪些方面？

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

unit03--01：09：31

#### 常用属性



#### 常用方法


#### 注意

- 绝对不要用CSS指定canvas的宽和高(如指定800*600)，因为那是没用实际作用，并没有实际扩大了画布大小，而是把画布默认300px*150px的大小放大8/3 + 6/1.5倍数的大小

#### 使用Canvas绘制路径(Path)

- 提示：Canvas中的概念与photoshop中钢笔类似的。
  - 路径本身不可见，有三个用途：描边、填充(闭合)、裁剪(闭合)
- Canvas中与路径绘制相关的方法：

![image.png-24.2kB][2]

#### Canvas练习

- 使用Canvas绘制简单的坐标轴
  - ![image.png-2.5kB][3] 
- 使用圆供和定时器绘制可以前进的进度条
  - ![image.png-44kB][4]
  - 解题思路：
- 创建一个函数`openMouth()`，在画布上绘制如下的图形：
  - ![image.png-15.1kB][5] 
- 创建一个函数`closeMouth()`，在画布上绘制如下的图形：
  - ![image.png-12.3kB][6]
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
- 可以将 **绘图上下文对象(即画笔对象)** 进行变形(transform) —— 与对Canvas元素施加CSS Transform样式不同，绘图上下文的变形只影响当前绘制的图形图像内容
  - `ctx.translate()` 坐标轴原点平移到指定点，所有点的坐标都发生改变
  - ![image.png-12.8kB][7]
  - `ctx.rotate()` 画笔旋转，则内容旋转，轴点在坐标轴原点
  - `ctx.scale()` 缩放
  - `ctx.save()` 保存绘图上下文(画笔)当前的变形数据
  - `ctx.restore()` 恢复最近一次保存的画笔的变形相关状态
- 画笔的平移、旋转、缩放有累加效果！
- 练习：绘制四个小飞机，各在画布的一个角且绕着自己的中心在旋转。
  - 注意：先将轴点translate到第一个小飞机中心，再translate做左上角，再translate到第二个小飞机中心点，旋转后再回左上角，以此类推... 

#### 项目中Canvas技术的注意应用

1. 绘制统计图
2. 小游戏
3. 绘图板
4. 动态背景(交互+动画)

### (5)SVG绘图


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