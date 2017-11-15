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


### (4)Canvas绘图


### (5)SVG绘图


### (6)地理定位


### (7)拖放API


### (8)WebWorker


### (9)WebStorage


### (10)WebSocket


<<<<<<< HEAD
  [1]: https://www.html5rocks.com/zh/tutorials/forms/html5forms/
=======
### homework01 HTML5表单基础样式

- 要注意html5标准表单书写方式
  - `label.control-label+input.form-control+span.help-block`
  - 表单中每一列之间有点像素的间隔
>>>>>>> 2b174b67ee7b0a977f7624c973efeae225585f20
