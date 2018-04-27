# 达内前端培训CH02_CSS3Basic

[TOC]

## Day1：概述、CSS语法、尺寸与边框

### CSS概述

#### 问题

- 设置页面中所有的文本颜色为红色？
- 设置页面中所有的p元素文本颜色为蓝色？
- 设置页面中所有的h3元素文本颜色也为蓝色？
- 将页面中所有p元素的文本颜色改为绿色！

- 由此，引出了HTML的不足：
  - 不同的标记想完成相同的效果使用的是不同的标记：`<body text="red"> <font color="blue">` 
  - 样式效果不通用

- CSS作用：
  - 以统一的方式实现样式的定义：`color: red;`
  - 提高页面样式的可重用性和可维护性

#### 什么是CSS

> CSS(Cascading Style Sheets)，层叠样式表，级联样式表，简称样式表。

CSS实现了内容(HTML)与表现(CSS)的分离

#### CSS 与 HTML 之间的关系

HTML：构建页面勾结
CSS：构建HTML元素的样式

#### HTML属性与CSS样式的使用原则

html: `<body text="red">`
css: `color: red;`

W3C：建议尽量使用CSS样式取代HTML属性。
`<td colspan="3">`: colspan属性在css中没有实现，所以针对跨行跨列来讲，只能用html元素属性，不能使用css属性。

### CSS语法

#### 使用CSS样式表

- CSS样式表的使用方式(重点)
  - 内联方式
  - 内部样式表
  - 外部样式表

#### 内联方式

将样式声明在 **元素的** style 属性中

语法：
    <AMY style="样式声明;样式声明;"></AMY>
    样式声明：表示一个具体显示效果，多个样式声明之间，用分号隔开
    每个样式声明都由两部分组成：`样式属性:属性值`

#### 内部样式表

将样式声明在 **页面的** style 属性中

1. 在 <head> 中添加<style></style>元素
2. 在 style 中添加任意多 “样式规则”

样式规则:
    选择器{
        样式声明; /*属性:值;*/
        样式声明;
        ...
    }
选择器：规范了页面中哪些元素能够使用定义好的样式

####  外部样式表

步骤：
    1. 创建一个单独的样式表文件保存样式规则`.css`
    2. 在需要的页面上引入样式表文件 `<link rel="stylesheet" type="text/css" href="yourcss.css">`

#### CSS语法规范总结

- 内联样式： 由样式声明组成
- 样式表：(内部样式表或外部样式表)
  - 由多个样式规则组成
  - 每个样式规则都有两部分：选择器和样式声明

### CSS样式表特征

- 继承性
  - 子级元素可以直接使用父级元素声明好的样式
  - 大部分的CSS属性是可以被集成的

- 层叠性
  - 可以为一个元素声明多个样式规则
  - 如果样式不冲突的话，多个样式规则中的样式可以层叠为一个

- 优先级
  - 样式定义冲突时，按照不同样式使用的“优先级”来应用样式
  - 低：浏览器缺省设置(User Agent Stylesheet)
  - 中：外部样式表或者内部样式表
  - 高：内联样式
  - 更高原则：**谁离元素近就用谁**
  - 最高规则：`!imporant`  显示地调整样式的优先级
  - 只能针对一个样式声明后使用`!imporant`

- 注意：尽量少用 `!imporant`
  - IE6及以下浏览器不支持
  - 打破默认优先级规则

### CSS基础选择器

#### 作用

作用：规范了页面中哪些元素能够使用定义好的样式
目的：匹配页面元素

#### 详解

- 通用选择器
  - 作用：匹配页面中所有的元素
  - 语法：`*{样式声明}`
  - 缺点：效率较低，尽可能少用
  - 原因：如果使用*后，页面中每个元素都要从下往上重复渲染

```css
/* *{
    color: red；
    font-size: 14px;
} */
/*
    通过 继承的 方式来取代 通用选择器，去设置页面中所有元素的默认样式
*/
body{
    color: red；
    font-size: 14px;
}
```

- 元素选择器
  - 作用：定义页面某一标签的默认样式
  - 语法：`p{color:"red";}` 所有<p>元素颜色都为红

- 类选择器
  - 作用：由css定义好，可以被任意标记的class属性值进行引用的选择器
  - 语法：`.类名{样式声明;}`
  - 类名要求：不能以数字开始；除下划线(_)和连字符(-)外不能有其它特殊符号
  - 使用：`<ANY class="myClass"></ANY>`
  - 引用方式 - 多类选择器的引用
    - 可以将多个类选择器，同时应用在一个元素中
    - `<ANY class="myClass1 myClass2 myClass3"></ANY>`
  - 定义方式：分类选择器的定义
    - 将元素选择器和类选择器结合起来使用，从而实现对某种元素不同样式的细分控制
    - 语法：`元素选择器.类选择器{样式声明;}`
    - 使用：`h2.important{}` 定义 class 为important 的div元素的 样式

- ID选择器
  - 作用：针对 指定 ID值 的元素去定义样式(私人订制)
  - 语法：`#ID值{样式声明;}`
  - 备注：效率高，针对性强

- 群组选择器
  - 作用：选择器声明是以`[,]`逗号隔开的选择器列表 
  - 语法：`选择器1,选择器2,选择器3...{}`
  - 例子：`span,.important,#main,div.redColor{ color:red;font-size:12px; }` 页面中所有的span、以及class为important的元素、以及id为main的元素、以及class为redColor的div元素，它们的样式为`color:red;font-size:12px;`

- 后代选择器
  - 定义：只要具备层级关系的元素，被嵌套的都可以称之为 **后代元素** 
  - 语法：`选择器1 选择器2{样式声明;}` 空格表示后代关系


- 子代选择器
  - 定义：只具备一级层级关系的元素，被嵌套的元素称之为 **子代元素** 
  - 语法：`选择器1>选择器2{样式声明;}` 大于符号表示子代关系

- 伪类选择器
  - 作用：匹配页面元素的不同状态的选择器
  - 语法：`#anchor:link{样式声明;}`
  - 分类：6种伪类
  - 链接伪类
    - `:link`：匹配页面中 尚未被访问的超链接状态
    - `:visited`：匹配页面中 已访问过的超链接状态
  - 动态伪类
    - `:hover`：匹配 鼠标悬停在元素上的状态
    - `:avtive`：匹配 元素被激活时的状态
    - `:focus`：匹配 元素获取焦点时的状态(text,password,textarea...)
  - 目标伪类
  - 元素状态伪类
  - 结构伪类
  - 否定伪类

#### 选择器优先级

| 选择器类型    |   权重  |
| :----:        |  :----: |
| 元素选择器    | 0,0,0,1 |
| 类选择器      | 0,0,1,0 |
| 伪类选择器    | 0,0,1,0 |
| ID选择器      | 0,1,0,0 |
| 内联样式      | 1,0,0,0 |

> **选择器的权值加到一起，大的优先；如果权值相同，后定义的优先。**

```css
<style type="text/css">
    #s1 { /* 100 */
        color: red;
    }

    #d1 span { /* 100+1=101 */
        color: green;
    }

    #d1 #s1 { /* 100+100=200 ★★ */
        color: yellow;
    }

    #d1 p span { /* 100+1+1=102 */
        color: pink;
    }

    .important span { /* 10+1=11 */
        color: blue;
    }

    #p1 span { /* 100+1=101 */
        color: purple;
    }

    span { /* 1 */
        color: orange;
    }
</style>
```

### 尺寸与边框

#### CSS单位

- %：百分比
- ~~in：英寸~~
- ~~cm：厘米~~
- ~~mm：毫米~~
- pt：磅
- px：像素
- em：1em相等于当前的字体尺寸，2em相当于当前字体尺寸的两倍

#### 颜色单位

- rgb(x,x,x)：RGB值，如rgb(255,0,0)
- rgb(x%,x%,x%)：RGB百分比值，如rgb(100%,0,0)
- #rrggbb：十六进制数，如#ff0000
- #rbf：简写的十六进制数，如#f00
- ~~表示颜色的英文单词，如red~~

#### 尺寸属性

- 作用：用于设置元素的宽度和高度，单位为 百分比 或 像素
- 宽度属性：
  - width: 设置元素的宽度
  - min-width: 设置元素的最小宽度
  - max-width: 设置元素的最大宽度
- 高度属性：
  - height: 设置元素的高度
  - min-height: 设置元素的最小高度
  - max-height: 设置元素的最大高度
- 允许被修改宽和高的元素
  - 在CSS中不是所有元素默认都能改变其宽和高 
  - 块级元素允许被修改宽和高
  - 大部分的行内块状元素允许被修改尺寸(行内块状:大部分表单空间元素，而单选按钮/复选框无法修改尺寸)
  - 自身存在 width 和 height 属性的html元素允许被修改尺寸。比如：img、table、
- 溢出
  - 使用尺寸属性限制元素大小时，如果内容所需要的空间大小大于元素本身，则会导致溢出效果
  - 溢出后处理：
    - 属性：`overflow` `overflow-x` `overflow-y`
    - 属性值：1.`visible`默认值，溢出可见；2.`hidden`隐藏，溢出就隐藏；3.`scroll`滚动，元素会出现滚动条，当内容溢出时，滚动条可用；4.`auto`自动，内容溢出时会显示滚动条不溢出时就不显示滚动条

#### 边框属性

- 边框
  - 简写方式：通过 一个 属性控制 四个方向上边框的效果
     - 属性：`border:width style color;`边框粗细 边框样式 边框颜色
     - 注意：border:none; 或 border:0; 可以取消元素边框
  - 单边定义：单独定义某一边的边框属性
    - 属性：`border-方向：width style color`
    - 方向：top/right/bottom/left
  - 单属性定义：
    - border-属性值：值
    - 属性：widht/style/color
  - 单边单属性定义
    - 属性：border-方向-属性：值;
  - 原理：**元素的边框其实由四个三角形或者四个梯形组成的。**

```css
/*三角形*/
#myDiv{
    width: 0;
    height: 0;
    border: 5px solid red;
    border-top-color: yellow;
    border-right-color: blue;
    border-bottom-color: green;
}
```
![image.png-4.2kB][1]

```css
/*梯形*/
#myDiv{
    width: 10px;
    height: 10px;
    border: 5px solid red;
    border-top-color: yellow;
    border-right-color: blue;
    border-bottom-color: green;
}
```

![image.png-7.8kB][2]
 
- 边框倒角：将四个方向上的角倒成圆角
  - `border-radiux`(简写属性)
  - 取值：绝对数值 或 百分比
  - `border-radiux: 5px;` --> 表示当前四个倒角半径为5px
  - `border-radiux: 50%;` --> 如果当设置的元素宽和高相等时，则会将其变为一个圆形！
  - 单独定义`border-top-left-radiux` 左上角

- 边框阴影
  - 属性：box-shadow
  - 取值：h-shadow v-shadow blur spread color inset
  - h-shadow：[必须] 阴影的水平偏移距离：+ 右偏移、- 左偏移
  - v-shadow：[必须] 引用的垂直偏移距离：+ 下偏移、- 上偏移
  - blur：模糊距离
  - spread：阴影尺寸
  - color：颜色
  - inset：默认的外阴影更改为内阴影

- 轮廓
  - 作用：绘制于元素周围的一条线，位于边框之外
  - 属性：`outline: width style color;`
  - outline-width
  - outline-style
  - outline-color
  - `outline:none;` 或 `outline:0;` 取消元素轮廓

> 思考DEMO：在某场景中，给若干个元素动态伪类加个边框，如果没有预先设置，给动态加边框时会增大元素大小，导致元素重新排版；修复，在预先体现设置加动态加边框的属性为透明，这样webkit在渲染时就只需要渲染一次，不会再次渲染。

## Day2：框模型、背景、渐变

### 框模型

#### 框模型(盒子模型)

- 框：**页面一切元素皆为*框***
- 框模型：Box-Model，定义了元素框处理元素内容，内边距以及外边距的方式。
- **对象实际*宽度*** = 左右外边距(margin) + 左右边框(border) + 左右边距(padding) + width;
- **对象实际*高度*** = 上下外边距(margin) + 上下边框(border) + 上下边距(padding) + height;

![TEDU-outbox.png-13.9kB][3]


#### 外边距

- 什么是外边距？就是围绕在元素周围的空白区域就是外边距
- 正常情况下，外边距是不允许被其它元素所占据的。
- 语法：
  - 四个方向外边距 `margin:value;`
  - 单边设置：`margin-top：上外边距;`
  - 外边距取值：单位可以是`px`、`%`、`auto`
  - 外边距取值为`auto`：当左右外边距的取值为`auto`时，允许让`块级元素`水平居中显示！只有水平效果，没有上下效果。
  - 外边距取值为负值：移动元素
    1. 左外边距取值为负：元素向左移动！
    2. 上外边距取值为负：元素向上移动！ 
  - 外边距取值为正值：移动元素
    1. 左外边距取值为正：元素向右移动~
    2. 上外边距取值为正：元素向下移动~
- 外边距的简介写法
  - `margin: v1;`     v1代表四个方向的外边距
  - `margin: v1 v2;`  v1为上下外边距，v2为左右外边距
  - `margin: v1 v2 v3;` v1为上 v2为左右 v3为下外边距
  - `margin: v1 v2 v3 v4;` **顺时针方向:** v1为上 v2为右 v3为下 v4为左
- 默认具有外边距的元素
  - `<p></p>`
  - `<h1></h1>`
  - `<h2></h2>`
  - `<h3></h3>`
  - `<h4></h4>`
  - `<h5></h5>`
  - `<h6></h6>`
  - `<ul></ul>`
  - `<ol></ol>`
  - `<dl><dd>123</dd></dl>`
  - `<pre>预处理元素</pre>`
  - `<body></body>` 默认有8px的外边距
  - 编写网页时，一般会进行CSS重写，即改变一些元素的默认样式。比如：取消某些元素的默认外边距...

```css
body,p,h1,h2,h3,h4,h5,h6,ul,ol,dl,dd,pre{
    margin:0;
}
```

- 外边距特殊处理
  - 外边距合并
    1. 当两个垂直外边距相遇时，它们将形成一个外边距，称为外边距合并。
    2. 合并后的外边距的高度等于两个外边距中高度较大者
  - 外边距溢出
    1. 在某些特殊情况下，为子元素设置上下外边距时，有可能会作用到父元素上，换句话说就是“子债父还”，再换句话说就是子元素把外边距溢出给父元素了！
    2. 特殊情况触发情况：①父元素没有上或下边框；②必须为第一个子元素或最后一个子元素设置外边框时。
  - 处理方法：
    1. 增加边框：解决子元素边距溢出问题！但有弊端，父元素占地面积会扩大！
    2. 增加哥哥元素或弟弟元素：为该子元素增加一个空白元素`<table></table>`哥哥元素
    3. 通过设置父元素的上内边距来取代子元素的上外边距

- 为行内元素和行内块元素设置外边距
  - 为 **行内元素** 设置上下外边距 **无效**
  - 为 **行内块级元素** 设置上下外边距 **整行内容都跟着变**

#### 内边距

- 什么是内边距？就是内容区与边框之间的距离(Padding)
- 特点：会扩大元素边框所占用的区域
- 语法：`padding:value`
  - 单边设置：`padding-left/top/bottom/right`
  - 取值：`px` `%` ，不允许取负值
- 简洁写法：
  - `padding:value;` v1代表四个方向的内边距 
  - `padding: v1 v2;`  v1为上下内边距，v2为左右内边距
  - `padding: v1 v2 v3;` v1为上 v2为左右 v3为下内边距
  - `padding: v1 v2 v3 v4;` **顺时针方向:** v1为上 v2为右 v3为下 v4为左 内边距

- 特殊处理
  - 对行内元素和行内块元素设置内边距(上下)时，只会影响自己，并不会影响到其他元素。 

![image.png-26.8kB][4]
![image.png-27.6kB][5]

#### box-sizing

- 作用：重新指定元素框模型的计算模式
- 元素的边框及以内的占地区域=左右边框 + 左右内边距 + width
- 取值：
  1. content-box：默认值，采用默认计算模式，即内边距以及边框会 **额外地** 累加到元素的尺寸中
  2. border-box：改变计算模式，将元素的边框和内边距也算作元素尺寸

### 背景

#### 背景属性

- 背景颜色
  - 属性：`background-color`
  - 取值：任意合法颜色 或 transparent
  - 注意：背景颜色会填空到元素的 内容区域、内边距区域 以及 边框区域

- 背景图像
  - 作用：以图像作为元素的背景
  - 属性：`background-image`
  - 取值：函数`url(pathname)`

- 背景重复
  - 属性：`background-repeat`
  - 取值：
    1. repeat 默认值，水平垂直方向都平铺
    2. repeat-x 仅在水平方向平铺
    3. repeat-y 仅在垂直方向平铺
    4. no-repeat 不平铺

- 背景图片尺寸
  - 属性：`background-size`
  - 取值：
    1. `value1 value2` 指定背景图片的宽度和高度，以px为单位
    2. `value1% value2%` 采用当前元素的宽和高的百分比计算此背景图片的大小
    3. `cover` 覆盖，将背景图等比放大，只到背景图完全覆盖到元素的所有区域为止(背景图放太大，显示不完整，看不全了)
    4. contain 包含，将背景图等比放大直到背景图的下边或右边有一个边缘碰到元素为止

- 背景图片固定
  - 属性：background-attachment
  - 取值：
    1. scroll，滚动，默认值，背景图会随着文档而滚动
    2. fixed，固定，不会随着页面文档发生滚动，一直保持在可视化区域中的固定位置处

- 背景图片的定位
  - 作用：改变背景图片在元素中的默认位置 
  - 属性：background-position 
  - 取值：
    1. `x y`：x为背景图水平偏移距离，取正向右，取负向左；y为背景图垂直偏移距离，取正向下，取负向上
    2. `x% y%`：0% 0%背景图在元素的左上角，100% 100%在元素右下角，50% 50%背景图在元素的中间
    3. 关键字：x:left/center/right , y:top/center/bottom
  - background-position:center; 背景图水平和垂直都在 中间位置
  - background-position:left top; 背景图在左上方

- CSS Sprites
  - 雪碧图，精灵图
  - 作用：将一些小的背景图，合并到大的背景图中去，以便减少服务器请求次数
  - 步骤：
    1. 根据要看的图片大小，创建一个元素
    2. 将“雪碧图”作为元素的背景图，再通过背景图像位置 实现位置偏移，将用户要看的图象，显示在 元素中

- 背景属性
  - 属性：background
  - 取值：`color url() repeat attachment position`
  - 注意：如果不要设置其中的某个值，将采用默认值。

- 注意：在使用独立属性和综合属性的背景时，先独立后综合时，综合(简写)属性会把没有赋值的属性用默认值替换，所以最好用独立属性修改原属性。

----------

## Day3：文本格式化、表格

### 渐变

#### 什么是渐变？

两种或多种颜色间平滑过度的效果

- 分类
  - 线性渐变
  - 镜像渐变
  - 重复渐变

#### 渐变的组成(元素)
色标：决定了渐变的每种颜色及其出现的位置

每一种渐变效果都是由多个 **色标** 组成的(2个及两个以上)

#### 渐变的语法

- 语法
  - 属性：background-image
  - 值：
    1. linear-gradient(): 线性渐变
    2. radial-gradient(): 径向渐变
    3. repeating-linear-gradient(): 重复线性渐变
    4. repeating-radial-gradient(): 重复径向渐变

- 线性渐变
  - 语法: `background-image: linear-gradient(angle, color-point, color-point, color-point, ...);`
  - `angle`：方向或角度，即渐变的填充方向。值：
    1. 关键字：`to top`从下向下填充；`to right`从左到右填充；`to bottom`从上往下填充；`to left`从右向左填充
    2. 角度：`0deg`to top ；`90deg`to right；`180deg`to bottom；`270deg`to left
  - color-point：色标，表示每个颜色值，及其出现的位置，多个色标之间用逗号(,)分割

![image.png-23.6kB][6]

- 径向渐变
  - 语法：`background-image: radial-gradient([size at position], color-point, color-point, ...);`
  - size at position：径向渐变的半径 以及 圆心位置
  - size：园的半径，px为单位
  - position：圆心的位置，`0px 0px` 将圆心设置在元素的左上角，`50% 50%`将圆心设置在元素的中间位置，`right bottom`关键字，将圆心设置在元素的右下角

- 浏览器的兼容性

各主流浏览器的主流版本，均支持渐变效果。对于不支持的浏览器，可以尝试增加 浏览器前缀 去实现渐变的显示。

- 浏览器前缀：
  - FireFox: `-moz-`
  - Chrome/Safari: `-webkit-`
  - Opera: `-o-`

- 前缀的加载位置
  - 如果浏览器不支持属性的话，则将前缀加载到属性名称前。
  - 如果浏览器支持属性，但不支持值的话，则将前缀加载到属性值的前面

```css
/*如果浏览器不支持属性的话，则将前缀加载到属性名称前*/
animation: scroll 5s;
-moz-animation: scroll 5s;
-webkit-animation: scroll 5s;
-o-animation: scroll 5s;

/*如果浏览器支持属性，但不支持值的话，则将前缀加载到属性值的前面*/
background-image: linear-gradient();
background-image: -moz-linear-gradient();
background-image: -webkit-linear-gradient();
background-image: -o-linear-gradient();
```

### 文本格式化

#### 字体属性

- 指定字体系列
  - 属性：`font-family`
  - 取值：`value1, value2, value2`
  - 注意：字体取值包含 中文或特殊符号 时，使用双引号引起来

- 字体大小
  - 属性：`font-size`
  - 取值：`px` `pt` `em`

- 字体加粗
  - 属性：`font-weight`
  - 取值：
    1. normal 正常体
    2. bold 加粗
    3. 400~900 400=normal 900=bold

- 字体样式
  - 属性：`font-style`
  - 取值：
    1. normal 正常体
    2. italic 斜体

- 小型大写字母
  - 作用：针对英文字符，将小写字符变成大写字符，但是大小与x小写一样
  - 属性：`font-variant`
  - 取值：
    1. normal
    2. small-caps

- 字体属性
  - 属性：`font`
  - 取值：style varaint weight size family
  - 注意：使用简写属性时，必须设置family的值，否则无效！
  - ex：`font: 12px;` -> 无效

#### 文本属性

- 文本颜色
  - 属性：color
  - 取值：任意合法颜色

- 文本排列方式
  - 作用：指定当前元素中的**文本、行内元素、行内块级元素** 的 **水平对齐方式**
  - 属性：`text-align`
  - 取值：left、center、right

- 文本修饰
  - 作用：指定文本的线条样式
  - 属性：`text-decoration`
  - 取值：
    1. `none` 没有线条显示 
    2. `underline` 下划线 `<u></u>`
    3. `overline` 上划线
    4. `line-through` 删除线 `<s></s>`

- 行高
  - 作用：指定元素中一行数据的高度。如果行高的高度高于文字高度本身，那么该行文本将在行高的范围内，呈现出 **垂直居中** 的显示效果。
  - 应用场景：
    1. 控制一行文本 垂直居中对齐
    2. 设置行间距
  - 属性：`line-height`
  - 取值：以 px 为单位的数值
  - 注意：仅适用于一行文本的情况，不适合多行文本。

- 首行文本缩进
  - 属性：`text-indent`
  - 取值：缩进的距离，以px为单位的数值

- 文本阴影
  - 属性：`text-shadow`
  - 取值：`h-shadow v-shadow blur color;`

### 表格

#### 表格的常用属性

- 边距的属性：padding

- 尺寸属性：width，height
- 文本格式化属性
  - font-*
  - text-alitn, color, text-indent, ... ... 
- 背景属性
  - 背景色，背景图，渐变
- border属性
- vertical-align
  - 作用：在单元格中，设置文本的垂直对齐方式
  - 取值：top  middle  bottom

#### 表格的特有属性

- 边框合并
  - 属性：border-collapse
  - 取值：
    1. separate，默认值，即分离边框模式
    2. collapse，边框合并效果

- 边框边距
  - 作用：单元格之间的距离
  - 属性：border-spacing
  - 取值：
    1. 指定一个值，表示单元格间水平和垂直间距是相同的
    2. 指定两个值，第一个值为单元格的水平间距；第二个值为单元格间的垂直距离
  - 注意：仅限于边框分离状态时使用，即`border-collapse: separate;`

- 标题位置
  - 属性：caption-side
  - 取值：
    1. top：默认值，标题显示在表格之上
    2. bottom，标题显示在表格之下

- 显示规则
  - 作用：指定表格的布局方式 
  - 默认布局方式为 自动表格布局，即单元格的宽度实际上是由内容来决定的，与设定的值无关。
  - 属性：`table-layout
  - 取值：
    1. auto，默认值，即自动表格布局
    2. fixed，固定表格布局，即单元格的宽度由设定的值为主，而不取决于内容

- 自由表格布局 VS 固定表格布局
  - 自动表格布局
    1. 单元格大小会适应内容大小
    2. 缺点：表格复杂时，加载速度慢
    3. 适用于不确定每列大小的情况下使用
    4. 虽然算法较慢，但是能体现传统表格特点
  - 固定表格布局
    1. 单元格大小取决于td中设置的值
    2. 优点：加载速度较快
    3. 确定每列大小时，可以使用固定表格布局
    4. 算法较快，缺点是不够灵活

----------

## Day4：浮动、显示、列表、定位

### **浮动**

#### 定位概述

> 所谓的定位，实际上就是定义元素相对于其正常位置，应该出现的位置在哪。简单来说，定位就是改变元素在页面上的默认位置。

#### 定位分类

- 普通流定位(元素默认定位方式)
- 浮动定位
- 相对定位
- 绝对定位
- 固定定位

#### 普通流定位

普通流定位，又称为 “文档流定位”，是页面元素的默认定位方式。

页面中的块级元素按照从上到下的方式排列，而且每个元素独占一行

页面中的行内元素按照从左到右的方式排列，当前行显示不下所有行内元素时，会自动换行

正常情况下文档流中是不会有空隙的

问题：如何能够让多个块级元素在一行内显示呢？ --> 浮动定位

#### ***★浮动定位★***

浮动定位概述：如果将元素的定位方式设置为浮动定位，那么将具备以下几个特点：

    1. 浮动元素会被排除在文档流之外即脱离文档流，元素不再占据页面空间，其他未浮动元素要上前 **补位**
    2. 浮动元素会停靠在父元素的左边或右边，或停靠在其他已经浮动元素的边缘上
    3. 浮动元素只会在当前行内浮动
    4. **浮动元素依然位于父元素之内**
    5. **浮动定位处理的问题 --> *让多个块级元素在一行内显示***

注意：向左浮动时，没有浮动的元素会被浮动元素压在下面，我们的视角是从上往下看。

**语法**

- 属性：float
- 取值：
  1. `none` 默认值，即无浮动定位
  2. `left` 左浮动，让元素停靠在父元素的左边，或停靠在左侧已有浮动元素的边缘上
  3. `right` 右浮动，让元素停靠在父元素的右边，或停靠在右侧已有浮动元素的边缘上

**浮动引发的特殊效果**

    1. 当父元素的宽度显示不下所有的已浮动子元素时，最后一个将换行(有可能被卡住，就选哥哥只高1px页会卡住)
    2. 元素一旦浮动起来后，那么宽度将变成自适应(非人为指定情况下)。例如一个div没指定宽度时占据一行，但指定它浮动后它的宽度则为自适应。
    3. 元素一旦浮动起来后，那么将变成块级元素，尤其对行内元素影响最大
      块级元素：允许修改 尺寸
      行内元素：不允许修改 尺寸
      例如一个<span>行内元素，本来不支持修改宽高，一旦浮动起来后就允许修改宽高
    4. 文本、行内元素、行内块元素时采用环绕的方式排列的，是不会被浮动元素压在底下，会巧妙的避开浮动元素

![image.png-17.7kB][7]

![image.png-3.2kB][8]

> 浮动只在当前行浮动！

**清除浮动**

元素浮动起来之后，除了影响自己的位置以外，还会影响后续元素。
如果后续元素不想被前面浮动元素所影响的话，可以使用 清除浮动 的效果来解决浮动的影响

- 属性：
  1. none，默认值，即不做任何清除操作
  2. left，清除当前元素的前面元素左浮动带来的影响。即当前元素不会上前站位，并且左边不允许有浮动元素。
  3. right，清除当前元素的前面元素右浮动带来的影响。即当前元素不会上前站位，并且右边不允许有浮动元素。
  4. both，清除前面元素左右浮动带来的影响。


浮动元素对父元素的影响

- 由于浮动元素会脱离文档流，所以会导致元素不占据父元素的页面空间，所以会对父元素的高度带来影响。
- 如果一个容器元素中所有的子元素全部浮动了，那么该元素的高度就是0。
- 解决方案如下
  1. 直接设置父元素高度：弊端为必须知道父元素的准确高度
  2. 设置父元素也浮动：弊端为对父元素后续元素会有影响
  3. 为父元素设置 `overflow` 属性，取值为 hidden 或 auto。弊端：如果有子级内容要溢出显示的话，也一同被隐藏了
  4. 在父元素中追加空子元素，并设置其clear属性为 both。基本上趋近于没有弊端。用伪类啦

### 显示

#### 显示方式

- 作用：显示方式 决定了元素在页面中如何摆放j䦺
- 语法：
  - 属性：display
  - 取值：
    1. none，让生成的元素不显示 -> 隐藏。特点：脱离文档流即不占据页面空间
    2. block，让元素变得和块级元素一样
    3. inline，让元素变得和行内元素一样
    4. inline-block，让元素变得和行内块元素一样，多个元素在一行显示，允许修改尺寸

#### 显示效果

- visibility 属性
  - 作用：控制元素的可见性(显示/隐藏) 
  - 属性：visibility
  - 取值：
    1. visible，默认值，可见的
    2. hidden，隐藏元素，但依然占据页面空间
    3. collapse，使用在表格元素上，删除一行或者一列时，不影响表格整体布局
  - 注意：display:none; 和 visibility:hidden; 区别
    1. display:none，脱离文档流，所以隐藏后不占据页面空间
    2. visibility:hidden，隐藏元素，但并不脱离文档流，导致空间依然占据

- opacity 属性
  - 作用：改变元素的透明度
  - 属性：opacity
  - 取值：0.0(完全透明) ~ 1.0(完全不透明)

- vertical-algin 属性
  - 说明：特殊情况的，垂直对齐方式 
  - 属性：vertical-algin
  - 取值：top / middle / bottom / baseline(默认,基线对齐)
  - 作用：
    1. 设置单元格内容的垂直对齐方式
    2. 为行内块元素设置vertical-algin，相当于设置该元素两端的文本相对于该元素的垂直对齐方式(相对于文本，其基线就是最后一行文本的位置)
    3. 设置图片两端的文本相对于图片的垂直对齐方式
  - 注意：默认的基线对齐时基线会在图片底部下移3px的位置

![image.png-146.3kB][9]

#### 光标

- 属性：cursor
- 取值
  1. default 默认
  2. pointer 小手
  3. crosshair 准心 +
  4. text "I"
  5. wait 等待
  6. help 帮助

### 列表

#### 列表项标识

- 属性：list-style-type
- 取值：
  1. none 无标记
  2. disc 实心圆
  3. circle 空心圆
  4. square 实心方块

#### 列表项图像

- 作用：由自定义图像作为显示的标识
- 属性：list-style-image
- 取值：url(...)

#### 列表项位置

列表项默认位置是在 列表项内容区域以外，列表的内边距范围内

- 属性：list-sytle-position
- 取值：
  1. outside：默认值，列表项标识位置在列表项之外
  2. inside：将列表项标识放在列表项区域之内

#### 列表属性

- 属性：list-style
- 取值：type url() position;
- 常用方式：`list-style: none;`

#### 列表使用场景

列表能够使用在 纵向排列 和 横向排列的元素中

在写导航ul-->li-->a时，有三种实现方式

  1. float: left;
  2. display: inline-block;
  3. display: block;

第一种，以浮动方式解决，但如果li里的a还有后续元素，则会让后续元素上前补位，间接影响后续元素！
第二种：修改为行内块元素解决，最好的方式，仅仅让元素可以修改宽和高，其它不影响。
第三种，修改为块级元素解决，也同理影响后续元素，因为块级元素独占一行。

### 定位

#### 定位属性

- position 属性
  - 作用：指定元素的定位类型
  - 属性：`position`
  - 取值：
    - static 默认值
    - relative 相对定位
    - absolute 绝对定位
    - fixed 固定定位

- 偏移属性
  - 作用：改变元素在页面中的位置(移动元素)
  - 属性：
    1. top
    2. bottom
    3. left
    4. right
  - 取值：偏移距离，以px为单位的数值

![image.png-56.8kB][10]

- 堆叠顺序
  - 作用：在元素出现堆叠效果时，改变它们的顺序
  - 属性：z-index
  - 取值：没有单位的数字，值越大，越靠上

#### 定位方式

##### 相对定位

- 什么是相对定位？
  - 元素会相对与它原来的位置偏移某个距离
  - 相对定位元素原本所占的空间会保留

- 语法
  - `position: relative;`
  - 配合着 偏移属性top/bottom/left/right实现元素的位置移动

- 使用场景
  - 实现元素位置微调时使用 

##### 绝对定位

- 什么是绝对定位
  - 绝对定位的元素会脱离文档流，不占据页面空间(不再占用老的菜地了)
  - 绝对定位的元素相对于它 ***最近的已定位的祖先元素*** 实现位置的初始化，如果这个元素没有已定位的祖先元素，那么这个元素就会相对于最初的包含块实现位置的初始化(如body、html)
  - 已定位：absolute、relative、fixed三种其中一个都称为已定位元素
  - 祖先元素：无限父级元素
- 语法
  - `position: absolute;`
  - 配合着 偏移属性 实现位置的改变
- 绝对定位是一个关联定位
- 特殊效果
  - 绝对定位元素会变成块级元素
  - 绝对定位元素依然可以使用margin，正常情况下，auto会失效

![image.png-18.9kB][11]

![image.png-3.2kB][12]

![image.png-4.5kB][13]

![image.png-2.7kB][14]

![image.png-2.9kB][15]

#### 堆叠顺序

- 作用：改变元素的堆叠效果
- 属性：z-index
- 取值：没有单位的数字，值越大，越靠上；值越小，越靠下；可取负值，取负值的话，该元素在页面所有元素内容之下
- 注意：
  - **z-index：只能作用在，relative、absolute、fixed 定位过的元素上**
  - **如果不指定z-index，则后来者居上**
  - **父子关系(层级)的元素不能使用z-index修改堆叠效果，永远都是子压父之上**

#### 固定定位

- 作用：将元素固定在页面的某个位置处，不会随着滚动条变化而发生改变
- 语法：
  - position: fixed;
  - 配合着 偏移属性 实现位置的定位
- 注意
  - 固定定位元素会脱离文档流
  - 固定定位元素会变成块级元素
  - 固定元素永远都相对于 **body** 实现位置摆放

#### 各种定位的使用场合

- 浮动：多个块级元素想在一行内显示时，用浮动
- 相对定位：元素要实现自身位置微调时，用相对定位
- 绝对定位：实现弹出内容时，用绝对定位，配合着父元素做相对定位一起完成
- 固定定位：顶部固定、边栏(广告)时，使用固定定位

----------



  [1]: http://static.zybuluo.com/szy0syz/jhblh4okvj5z0mo76gwh3ji4/image.png
  [2]: http://static.zybuluo.com/szy0syz/115pn5wk168lmrm1u8jw0qbe/image.png
  [3]: http://static.zybuluo.com/szy0syz/9p3kic8ayksckfgb2lcyuvwd/TEDU-outbox.png
  [4]: http://static.zybuluo.com/szy0syz/jie63ul0vkjvl6w5fegsxsto/image.png
  [5]: http://static.zybuluo.com/szy0syz/gcg0vk4pchszka3dw902vl7i/image.png
  [6]: http://static.zybuluo.com/szy0syz/25g6j7dnxfngg2d89hevgdzo/image.png
  [7]: http://static.zybuluo.com/szy0syz/z7d9edudouyp5xzj4g4m0u2d/image.png
  [8]: http://static.zybuluo.com/szy0syz/iw0jizub58ywjr02oxrs1br4/image.png
  [9]: http://static.zybuluo.com/szy0syz/9m4blnyrpnqzqyethfamo6zy/image.png
  [10]: http://static.zybuluo.com/szy0syz/2ouyenvxzrs7lgbb99g1yimz/image.png
  [11]: http://static.zybuluo.com/szy0syz/u8hxfryllepyf74rsjebsqvl/image.png
  [12]: http://static.zybuluo.com/szy0syz/0eyu7whsfh35p0qurlmt9nvj/image.png
  [13]: http://static.zybuluo.com/szy0syz/xg1bpv04opikn38zd42y9y22/image.png
  [14]: http://static.zybuluo.com/szy0syz/clo3zmg6vqu947pj9ebnd675/image.png
  [15]: http://static.zybuluo.com/szy0syz/rlo3e00o6zpysvzjvvp43jxd/image.png
