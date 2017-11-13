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

- **伪类：匹配元素的不同状态，匹配到的仍然还是元素！**
- 伪元素：匹配的是某个元素中的某部分内容(例如匹配div中的第一个行文字或第一个字)
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
  - `<div>(:before)我是一个DIV</div>`
- `:after` 或 `::after`
  - 作用：匹配 某元素的 内容区域之后
  - `<div>我是一个DIV(:after)</div>`

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

```css
selector:before{
	content: "";
	display: table;
}
```

> 以上两个解决方案就是 **内容生成** 的最大用处！

#### 计数器

- 什么是计数器？使用CSS 动态生成一组 有序的数字并且插入到元素中

![css3-counter.jpg-95.9kB][2]

- 属性： counter-reset 声明或重置计数器 
  - 语法：
  - `counter-reset: key value;`
  - `counter-reset: key1 value1 key2 value2;`
  - 注意：初始值可以省略不写，默认为0；不能放在使用的元素中声明，大部分情况下，可以将计数器声明在使用元素的父元素上(结合实际情况考虑)

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

> 原理：充分使用CSS属性的优先级解决兼容性问题

#### CSS Hack的实现样式

- 第一种-CSS类内部Hack：在样式属性名或值的前后增加前后缀以便识别不同的浏览器

![image.png-168kB][4]

```css
background-color: black;
background-color: green\0;  /*IE8~10*/
background-color: blue\9\0; /*IE9~10*/
+background-color: pink;    /*IE6~7*/
-background-color: red;     /*IE6*/
```

- 第二种-选择器Hack：在选择器前增加前缀以便识别不同的浏览器
  - 在选择器前增加前缀以便识别不同的浏览器
  - `*`前缀：IE6 识别
  - `*+`前缀：IE7 识别

- 第三种-HTML头部引用Hack：使用HTML条件注释判断浏览器版本
  - 使用 IE条件注释 来解决兼容性问题
  - 语法
  - 版本：数字值6、7、8
  - 条件：gt大于 lt小于 gte大于等于 lte小于等于 !取反 省略仅指定IE

```css
<!-- [if 条件 IE 版本]>
    /*操作*/
<![endif]-->
```

----------

## Day2：转换、过渡、动画、CSS优化

### 转换

#### 转换简介

- 转换是改变元素在页面中的大小、位置、形状、角度的一种方式。
- 转换也可以称之为变形。
- 转换可以分为 2D转换 和 3D转换
- 2D转换：使元素在x轴和y轴上进行的转换操作
- 3D转换：在2D转换的基础上增加了Z轴的转换操作

- 转换属性
  - 属性：`transform`
  - 取值：
    1 `none`
    2 `transform-functions`，一组转换函数，表示一个或多个转换函数，多个的话，用 空格 隔开

- 转换原点
  - 属性：`transform-origin`
  - 默认：原点在元素的中心处
  - 取值：
    1 两个值: 值1(x) 值2(y)
    2 三个值: 值1(x) 值2(y) 值3(z)

#### 2D位移

- 什么是2D位移，就是改变元素在 x轴 和 y轴 上的位置

- 属性：transform
- 函数：
  - translate(x)：改变元素在x轴上的位置，取值为正则右移，否则反之。
  - translate(x,y)：改变元素在x轴和y轴上的位置，取值为正则右/下移，否则反之。
  - transformX
  - transformY

#### 2D缩放

- 什么是缩放？改变元素在 x轴 或 y轴上的大小
- 语法：
  - 属性：transform
  - 取值函数：
  - 1.scale(value)：value为缩放倍数，如果只给一个值则x轴和y轴等比缩放，默认值为1.
  - 2.scale(x, y)：分别改变元素在x轴和y轴上的大小
  - 3.scaleX(x)
  - 4.scaleY(y)
  - 当value为负数是，则体现“物极必反”，元素倒着放大了(旋转了180°)

#### 2D旋转

- 属性：transform
- 函数：rotate(ndeg)
  - n为旋转角度
  - 取值为正，顺时针旋转
  - 取值为负，逆时针旋转
- 注意
  - 转换原点，旋转围绕着转换原点来做的，所以原点位置不同，转换效果也不同
  - 旋转时连同坐标轴也一同跟着转

![image.png-37.7kB][5]

#### 2D倾斜

- 什么是倾斜？ 改变元素在页面中的形状，以原点为中心，围绕着x轴和y轴产生一定的倾斜角度
- 属性：transform
- 取值函数
  - skew(xdeg)：向横向产生倾斜角度，实际改变的是y轴的倾斜角度。值为正，y轴按逆时针角度倾斜，值为负，y轴按顺时针方向倾斜
  - skew(xdeg,ydeg)：x值为横向倾斜，y值为纵向倾斜。值为正，x轴按顺时针角度倾斜，否则反之
  - skewX(ndeg)
  - skewY(ndeg)

![image.png-21.8kB][6]

> 旋转坐标轴可不是小事，要提防！

#### 3D转换

#### perspective属性

- 模拟 **人眼** 到 **3D变换物体** 之间的距离
- 该属性要添加在 3D转换元素 的父元素上
- 浏览器兼容性：chrom和safari： `-webkit-perspective: 数值;`

#### 3D转换-旋转

- 属性：transform
- 取值：
  - rotateX(ndeg)
  - rotateY(ndeg)
  - rotateZ(ndeg)
  - rotate3D(x,y,z,ndeg)：x、y、z取值为0说明该轴不参与旋转，取值为1说明该轴参与到旋转操作
- 注意：
  - `transform: rotate3D(1,1,1,45)` 与
  - `transform: rotatex(45) rotatey(45) rotatez(45)`
  - 是不同的，上者为三个轴同时并发旋转，二下者为三个轴分别顺序旋转

#### 3D转换-位移

- 3D位移就是改变元素在 x,y,z 轴上的位置
- 属性：transform-style，如何处理子元素的摆放位置
- 取值：
  - flat，默认值，不保留子元素的3D位置
  - preserve-3d，保留子元素的3D位置

- 属性：transform
- 取值：
  - transformZ(z)
  - transform3d(x,y,z)

#### 练习要点

![image7][7]

- 要求：如上动画所示
- 步骤
  1. 嵌套元素: #stage>#parent>div*6
  2. #stage开启perspective属性，启动模拟人眼到3D变换物体之间的距离1200px
  3. #parent先相对定位(服务内部6个div)，再开启`transform-style: preserve-3d;`属性，启动保留子元素的3D位置，最后再开启`transform: rotateX(-20deg) rotateY(0deg);`让#parent元素在水平方向的x轴上(2D层面)与原来的轴产生20°偏移，相当于向前偏移20°，再好比把原本与观众水平的观众座椅升高了，观众就是俯视！
  4. 第一个div，x和y轴没啥变化，但z轴上，让div向着观众移动200px；
  5. 第二个div，效果图中右边2号位置，记住移动先旋转，再位移，因为旋转了就改变了轴的指向，那才是我们需要的方向啊！`transform: rotateY(60deg) translateZ(200px);`让元素现以y轴旋转60°后再向z轴位移200px。说实话这里还有有点难理解的，我的技巧就是想象你在蒙古包里吃烤羊腿，把铁叉串号的羊腿以右边扶手转动时，一定时X轴转换，而把羊腿拿得里我们进一点是Z轴位移，再而在我们眼前平行着换是y轴旋转(再进一步说明就想象钢管舞女郎在你眼前锁着钢管水平面旋转就是y轴旋转)！
  6. 剩下的以此类推，第三个`transform: rotateY(120deg) translateZ(200px);`，就Y转旋转度数在变化而已。
  7. 关于动画里的旋转，只是我手工修改#parent元素的`transform: rotateY(110deg);`而已，这一步真的就很明显的感受到Y轴旋转了，你看，每次增加度数，其实就是让红色边框元素于垂直平面产生一定度数！

### 过渡

#### 什么是过度

- 使得CSS属性值，在一段时间内，平缓变化的一个效果

#### 过渡效果四要素

1. 指定过渡属性：即指定哪个属性值在变化时需要使用过度效果
2. 指定过渡时间：多长时间内完成过度效果
3. 指定过渡时间的速率：过度过程中的变化速率(匀速、先快后慢...)
4. 指定过渡延时时间：当用户激发操作后，等待多长时间才激发效果

#### 过渡属性

- 指定过渡属性
  - 属性：`transition-property`
  - 取值：none | all | property-name
  - ex: `transition-property: background;` `transition-property: border-radius;`
- 允许设置过渡效果的属性：
  - 颜色属性：color, background-color, border-color
  - 取值为数值的属性：尺寸、background-size、margin、padding
  - 转换属性：transform
  - 渐变属性
  - 阴影属性
  - visibility
- 指定过渡时长
  - 属性：transform-duration
  - 取值：s | ms
  - 注意：默认值为0s，即没有过渡效果
- 指定过渡时间速率
  - 属性：transform-timing-function
  - 取值：
  - 1.ease，默认值，先慢后快再慢
  - 2.linear，匀速
  - 3.ease-in，慢速开始，快速结束
  - 4.ease-out，快速开始，慢速结束
  - 5.ease-in-out，慢速开始结束，中间先快后慢
- 过渡延迟
  - 属性：transition-delay
  - 取值：s | ms
- 过渡属性简写方式
  - 属性：`transition: property duration timing-function delay;`
  - 注意：`transition:transform 2s linear, background 3s;`

#### 练习一：过渡——方块过渡成圆形&圆球滚动

![image8][8]

- 实现步骤：
  1. 还是在#box元素本身加过渡，而不是在动态伪类上加。因为在元素本身加过渡效果“有去有回”，而在动态伪类上加则“有去无回”
  2. 过渡四要素之一(必须)：过渡属性 `transition-property: border-radius;`
  3. 过渡四要素之二(必须)：过渡时长 `transition-duration: 600ms;`
  4. 过渡四要素之三(非必须)：过渡速率 `transition-timing-function: linear;`
  5. 过渡四要素之四(非必须)：过渡延迟 `transition-delay: 10ms;`
  6. 圆球元素本身`transition: transform 1800ms;`
  7. 源头动态伪类:hoder`transform: translateX(255px) rotatez(720deg);`，在这里必须先在X轴位移后再z轴旋转

#### 练习二：CSS3钟

![image9][9]

- 实现步骤：
  - 让指针旋转点改到左边，然后沿z轴选择即可！

----------

### 动画

#### 什么是动画

- 使元素从一种样式逐渐变化为另一种样式的过程
- css中实现动画，会存在兼容性问题，与动画相关的操作尽量加上浏览器前缀

#### 使用步骤

- 定义动画
  - 指定动画名称以及创建动画中的每个状态(关键帧)
- 为元素调用动画
  - 指定 调用的动画名称、时长、播放次数......
- 声明动画
  - 指定动画名称及各个关键帧
  - 关键帧：当前元素状态的 **时间点** 及 **样式**
  - 语法：

```css
/* 在样式中声明：*/
    @keyframes animationName  {
        0%{
            /*动画开始时的 样式 0%可写成 from */
        }
        /* 50% {...} */
        100%{
            /*动画结束时的 样式 100%可写成 to */
        }
    }
```

- 调用动画(动画属性)
  - `animation-name` 指定调用动画的名称
  - `animation-duration` 指定动画完成一个周期所需用的时间s|ms
  - `animation-timing-function` 指定动画的速率，取值ease/linear/ease-in/ease-in-out
  - `animation-delay` 指定动画的延迟s|ms
  - `animation-iteration-count` 指定动画播放次数，取值数字、infinite无限播放
  - `animation-direction` 指定动画播放方向，默认为0%->100%。取值normal默认、reverse逆向播放(100%->0%)、alternate轮流播放，奇偶次播放(0%->100%->0%)
  - 简写：`animation`，取值`name duration timing-function delay iteration-count direction;`
  - `animation-fill-mode` 规定动画播放前后的填充效果，取值`none`默认-无填充效果、`forwards`动画播放完城后会保持在最后一帧的状态上，`backwards`动画播放前，应用在第一帧的状态上(只在有延迟(delay)时间内才会显示在 第一帧上)，`both` 动画播放前后，分别采用对应的填充状态
  - `animation-play-state` 规定动画播放还是暂停 取值 paused暂停 和running播放

### CSS优化



  [1]: http://static.zybuluo.com/szy0syz/h0dgdue2qmppyvapir77y9sv/content-generator.jpg
  [2]: http://static.zybuluo.com/szy0syz/5g2ha4e7mst5r1ymbruwmxvb/css3-counter.jpg
  [3]: http://static.zybuluo.com/szy0syz/hj76t782g5ran2goktz7tbyq/css3-column-count.jpg
  [4]: http://static.zybuluo.com/szy0syz/bs0v91139pmi8pvdmcdlyx61/image.png
  [5]: http://static.zybuluo.com/szy0syz/ckxo0lfnu7kdnjxu5fxviv19/image.png
  [6]: http://static.zybuluo.com/szy0syz/56nxjf6rgzs0z4bvyhjqse6p/image.png
  [7]: http://ofx24fene.bkt.clouddn.com//img/blog/3Drotate.gif
  [8]: http://ofx24fene.bkt.clouddn.com//img/blog/transition.gif
  [9]: http://ofx24fene.bkt.clouddn.com//img/blog/clock.gif
