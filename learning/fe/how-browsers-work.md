# 浏览器工作原理及在网页性能优化中的应用

> 网上零碎的看了很多文章，不如听个讲座。

![p01](http://cdn.jerryshi.com/picgo/sf-fe-lesson-01.jpg)

渲染引擎（Rendering Engine）

- 职责：解析HTML和CSS，将Web页面渲染到浏览器的屏幕上
- 分类：Webkit(Safari)、Blink(Chrome)、Gecko(FireFox)

JavaScript引擎（JavaScript Interpretor）

- 职责：解析和执行JavaScript
- 分类：JavaScriptCore(Safari)、V8(Chrome)、SpiderMonkey(FireFox)

浏览器工作基本流程

1. 解析HTML，构建DOM Tree；解析CSS，构建CSSOM(CSS对象模型)
2. 根据DOM和CSSOM，构建渲染树（Render tree）
3. 根据渲染树，计算每个节点在屏幕上的位置、尺寸等信息
4. 将渲染树绘制到屏幕上

![p02](http://cdn.jerryshi.com/picgo/20180730225138.png)

市面上浏览器主流程大体都差不多。

webkit简化流程：(解析HTML+构建DOM) --> (构建渲染树) --> (布局) --> (绘制到屏幕)

CSS对象模型与DOM Tree有所不通，因为CSSOM有重叠(层叠)的特性。

> **渲染树不包含屏幕不可见元素的信息**

布局这个阶段就是需要具体计算出所有元素绝对的坐标及宽高，因为在渲染树上是不存放这些信息的。在经过布局阶段后我们就可以精确的每个节点位置后，我们就可以绘制到浏览器的屏幕上。

重排(reflow)：指布局阶段再次发生的过程
重绘(repaint)：指绘制阶段再次发生的过程

导致重排或重绘发生的行为：

- JS行为
  - 修改DOM
  - 修改CSS
- 用户行为
  - 滚动页面
  - 改变浏览器窗口大小
  - 输入框中输入内容
  - 触发`:hover`等CSS效果

```js
// 代码1：
var foo = documnet.getElementById('foobar')
foo.style.color = 'blue'
foo.style.marginTop = '30px'

// 代码2：
var foo = documnet.getElementById('foobar')
foo.style.color = 'blue'
var margin = parseInt(foo.style.marginTop)
foo.style.marginTop = (margin + 10) + 'px'
```

以上代码分别会触发几次重绘和重排呢？