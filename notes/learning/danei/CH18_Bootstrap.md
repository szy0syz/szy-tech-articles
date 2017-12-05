# 达内前端培训 CH16_Bootstrap

[TOC]

## unit01：响应式网页、bootstrap起步、全局CSS样式

### 什么是响应式网页

- Responsive Web Desien：响应式/自适应网页设计，2010年5月，由Ethan Marcotte专为改进移动互联网l浏览器提出的概念，基本概念为：
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
  - `initial-scale=1.0,`   --> 设置 视口 初始化的放大比例
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

- em和rem的区别

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
- 练习：找出bootstarap.css对HTML标签的默认样式进行了哪些重置：
  - `*{}`
  - `html{}`
  - `body{}`
  - `h1{}`
  - `h6{}`
  - `p{}`


  [1]: http://static.zybuluo.com/szy0syz/abamsxlsv398rc80vl95lxtc/image.png
  [2]: http://static.zybuluo.com/szy0syz/7kenz001yzcpzgmm33rik1b2/image.png