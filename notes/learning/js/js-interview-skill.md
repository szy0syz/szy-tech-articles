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

## 第4章 二面/三面



## 第5章 三面/四面




## 第6章 课程终面



## 第7章 2017真题解析




## 第8章 课程总结


[1]: http://ofx24fene.bkt.clouddn.com//blog/2018/3rd-layout.jpeg
[2]: http://ofx24fene.bkt.clouddn.com//blog/2018/3rd-layout-1.jpeg
[3]: http://ofx24fene.bkt.clouddn.com//blog/2018/CSSBox.png
[4]: http://ofx24fene.bkt.clouddn.com//blog/2018/CSSBox-ie.png
