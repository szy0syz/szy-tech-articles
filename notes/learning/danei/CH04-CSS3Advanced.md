# 达内前端培训 CH04_CSS3Advanced

[TOC]

## Day1：复杂选择器、内容生成、多列、CSS Hack

### 复杂选择器

#### 兄弟选择器

- 特点：
  - 通过位置关系来匹配元素。
  - 只能向后找，不能向前找。CSS3中的兄弟选择器只能找弟弟元素，不能找哥哥元素。

- 兄弟选择器之 相邻兄弟选择器
  - 什么是相邻兄弟？紧紧挨在一起的一个元素，称之为 **相邻兄弟元素**。 
  - 语法： 选择器1 **+** 选择器2  （+ 加号）

- 兄弟选择器之 通用兄弟选择器
  - 什么通用兄弟选择器？后面所有的弟弟元素们
  - 语法： 选择器1 ~ 选择器2

#### 属性选择器

- 允许使用元素所附带的属性及其值来匹配页面的元素
- 语法： [attr=value]
  - 详解`[attr]`：attr表示某一具体属性名称，作用为匹配所有附带了 attr 属性的元素
  - 详解`ele[attr]`：表示页面中限定某一类具体元素并附带attr属性的元素
  - 详解`[attr1][attr2]...`：匹配具备attr1属性同时也具备attr2属性的元素。ex:p[id][class]表示匹配所有页面中既有id属性又有class属性的p元素
  - 详解`[attr=value]`：表示某一具体数字属性的元素
  - 详解`[class~=value]`：用在多类选择器中，且匹配 class属性值是以 空格 隔开的值列表，并且 value 是该值列表中的 一个独立的值 的元素
  - 详解`[attr^=value]`：^= 表示以value开始的值，作用为匹配 attr 属性值 以 value 作为开始的元素
  - 详解`[attr*=value]`：*= 表示包含value的字符，作用为匹配 attr 属性值中包含 value 字符的元素
  - 详解`[attr&=value]`：&= 表示以value结束的值，作用为匹配 attr 属性值 以 value 作为结束的元素
- 属性选择器中，所有的值，可以用双引号`“ ”`、单引号`' '`引起来，当然也可以选择不引

#### 伪类选择器

- 目标伪类
  - 作用：突出显示活动的HTML锚点元素
  - 语法：`ele:target`

- 元素状态伪类
  - 作用：匹配 元素已启用，被禁用，被选中的状态
  - **主要应用在表单控件上**
  - 语法：
  - `:enable` 匹配 每一个已启用(或未被禁用)的元素
  - `:disabled` 匹配 每一个被禁用的元素
  - `:checked` 匹配 每一个被选中的元素(radio, checkbox)

- 结构伪类
  - 作用：通过元素的结构关系，类匹配元素
  - 语法：
  - `:first-child` 匹配属于其父元素中的首个子元素
  - `:last-child` 匹配属于其父元素中的最后一个子元素
  - `:nth-child(n)` 匹配属于其父元素中的第n个子元素
  - `:empty` 匹配没有子元素的元素，注意不能包含文本，文本也算一个node节点啊
  - `:only-child` 匹配属于其父元素中的唯一子元素，就是匹配只有一个儿子的父元素

- 否定伪类
  - 作用：将 满足条件的 选择器匹配的元素 排除出去，取反！
  - 语法：`:not(选择器)`
  - `#tbl td:not(:first-child){ color:red; }` 匹配：除每行第一列以外的所有列

#### 伪元素选择器

- 伪类：匹配元素的不同状态，匹配到的仍然还是元素！
- 为元素：匹配的是某个元素中的某部分内容(例如匹配div中的第一个行文字或第一个字)
- 语法：
  - `:first-letter` 或 `::first-letter` 匹配某元素的首字符
  - `:first-line` 或 `::first-line` 匹配某元素的首行字符
  - `::selection` 匹配被用户选取的部分，W3C只允许修改 文本颜色 和 背景颜色
- `:` 与 `::` 的区别：
  - `:` 既能表示 伪类选择器，也能表示 伪元素选择器(CSS2)
  - `::` 在CSS3中，表示伪元素选择器
- 以后尽量选择 `:` 来使用，即表示伪类也表示伪元素，这样可以实现兼容处理 

### 内容生成

![content-generator.jpg-81.7kB][1]

#### 伪元素选择器

- `:before` 或 `::before`
  - 作用：匹配 某元素的 内容区域之前
  - <div>(:before)我是一个DIV</div>
- `:after` 或 `::after`
  - 作用：匹配 某元素的 内容区域之后
  - <div>我是一个DIV(:after)</div>

#### 属性

- `content`
- 取值：
  - 字符串：纯文本，要用双引号“”引起来
  - 图像： `url()` content: url(xxx.jpg)
  - 计数器： `count`

#### 解决的问题

- 解决浮动元素父元素高度的问题
  - 父元素中的最后一个子元素
  - 内容为空
  - 必须为块级
  - clear: both

```css
.clear:after{
    content: "";
    dispaly: block;
    clear: both;
}
```

- 外边距移除问题
  - 第一个子元素位置
  - 空的元素
  - 显示方式为 table

> 以上两个解决方案就是 **内容生成** 的最大用处！

#### 计数器

- 什么是计数器？使用CSS 动态生成一组 有序的数字并且插入到元素中

![css3-counter.jpg-95.9kB][2]

- 属性： counter-reset 声明或重置计数器 
  - 语法：
  - `counter-reset: key value;`
  - `counter-reset: key1 value1 key2 value2;`
  -  注意：初始值可以省略不写，默认为0；不能放在使用的元素中声明，大部分情况下，可以将计数器声明在使用元素的父元素上(结合实际情况考虑)

- 属性：counter-increment
  - 作用：指定计数器每次出现的增量，即每次出现计数器值的变化范围
  - 语法： 
  - `counter-increment: 名 增量`
  - `counter-increment: 名1 增量1 名2 增量2`
  - 注意：增量可以为正，也可以为负，也可以省略，默认增量为1；哪个元素使用计数器，就在哪个元素中设置计数器增量

- 函数：counter()
  - 作用：在指定元素中，使用计数器的值；必须配合counter 属性一起使用。counter要配合着 `:before` 或 `:after` 一起使用。

### 多列

![css3-column-count.jpg-90.3kB][3]

#### 语法

- 分割列
  - 属性：column-count
  - 取值：数值

- 列间隔
  - 属性： column-gap
  - 取值：px为单位的数值

- 列规则
  - 作用：定位每列之间的线条样式
  - 属性：column-rule
  - 取值：width style color

#### 兼容性

- chrome：  
  - `-webkit-column-count`
  - `-webkit-column-gap`
  - `-webkit-column-rule`
- firefox： 
  - `-moz-column-count`
  - `-moz-column-gap`
  - `-moz-column-rule`

### CSS Hack(浏览器兼容问题)



----------


## Day2：转换、过渡、动画、CSS优化


