# css面试资料整理

[TOC]

## 定位

* 流定位：也叫普通流定位、文档流定位。其元素不能设置left/top来改变x/y坐标位置；两个流定位元素的上下margin会发生折叠(按大的算)，而左右margin则不会。

* 浮动定位：一种可视化格式的模型，浮动元素可以左右移动，直到它的外边距碰到了父元素或另一个浮动元素。浮动元素不在普通文档流中，文档的普通流

* 相对定位：相对定位的元素会在文档中占据原来的位置，只是表现出来的位置会改变。

* 绝对定位：元素位置与文档流无关，也不会占据文档流的空间，普通流中的元素布局就像绝对定位的元素不存在一样。

* 固定定位：相对于视口进行定位。

## BFC

BFC全称是block format content即块级格式化作用域。

三个特征：

1. BFC会阻止垂直外边距的折叠。
2. BFC不会重叠浮动元素
3. BFC可以包含浮动

触发BFC的条件

* float:left|right
* overflow:hidden|auto|scroll
* display:table-cell|table-caption|* inline-block
* position:absolute|fixed

通用清除浮动的两种方式

```css
.clearfix {
    *zoom: 1;
}

.clearfix::after {
    content: '';
    display:block;
    height: 0;
    visibility: hidden;
    clear:left;
}
/*----------------------------*/
.clearfix {
  *zoom: 1;
}
.clearfix::after {
    content: '';
    display: table;
    clear:both;
}
```

* 清除浮动只有两种方式，一是使用clear属性清除浮动，二是使父容器形成BFC。
* 大白话理解BFC：创建BFC好比创建了一个封闭的大箱子，里面的元素无论如何翻江倒海，都不会影响外部。
* 大白话理解BFC plus版：BFC好比一个伊拉克美军的关塔那摩监狱，创建后里面的元素必须规规矩矩的，也不能相互挨着，跟无法越狱去外面做坏事，那么老是跳的元素也不敢乱动，否则美女军官就...分别对应三个特性：上下外边距不折叠、包含浮动元素(清除浮动)、阻止元素被浮动元素遮挡。

* `https://www.jianshu.com/p/a57d19b5742c`
* `https://zhuanlan.zhihu.com/p/25321647`
