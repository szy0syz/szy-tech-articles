# 爱创课堂CSS内部视频

[TOC]

## 01 hover四种状态

- 超链接伪类 
  - 链接的交互体验很不爽，程序员就发明了几种样式表示链接的几种状态，来增强用户体验
  - 类与伪类，类是以`.`开头的，伪类是以`:`开头的
  - 类可以明确的添加到任意元素上，伪类只是为特殊元素添加特殊的样式
  - 超链接有四种伪类：`.link` `visited` `hover` `active`，它们的顺序非常重要，一定不要任意修改

- 浮动布局：负`margin`值对元素定位的影响。
  - 结论：负的`margin-right`或者负的`margin-left`在没有定义dom的宽度时，时可以改变宽度(尺寸的)。这个和饥人谷课件里讲的一样，可以`放大`元素！
  - 但如果定义了宽度，无论怎么定义margin都不可以改变宽度。正的margin也可以改变。

## 02 网易体育

## 03 伪类

- 伪元素
  - 伪类是不能单独设置，必须寄托于某个选择器（如id, class, tagname）
  - 伪元素也是不能单独设置，必须寄托于某类选择器（如id, class, tagname）
  - 伪类如：`a:hover`
  - 伪元素如：`div:after`
  - 我们观察发现伪类和伪元素很像，语法都类似。常用的伪元素有两个，分别是`:after`和`:before`，对应分别表示在元素的后/前面插入一个元素
  - ***伪类的display属性默认是行内元素inline，这两个伪元素都必须设置`content`属性，否则伪元素不存在，所以说`content`是这两个伪元素(伪类)的灵魂***

## 04 emmet

- 设置id为abc的div: div#abc
- 设置cla为bcd的p: p.bcd
- 设置class为abc、bcd、efg 的span: span.abc.bcd.efg
- 设置内容为hello的em: em{hello}
- 设置type属性为checkbox的input标签: input[checkbox] 。也可以设置自定义属性
- 设置10个div: div*10
- 设置10个div的类是demo1到demo10: div.demo$*10 。 这里$表示连续的意思
- 设置兄弟元素，div中的p与span: div>p+span
- 设置兄弟元素的子元素，如dic中的li与p(里面有个span): dic>li+p>span
- 设置兄弟元素的子元素中有子元素，如div中li和p分别有span: div>(li>span)+p>span
