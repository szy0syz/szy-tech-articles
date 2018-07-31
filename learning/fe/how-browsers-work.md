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

![p02](http://cdn.jerryshi.com/picgo/sf-fe-lesson-02-webkit.jpg)

市面上浏览器主流程大体都差不多。

webkit简化流程：(解析HTML+构建DOM) --> (构建渲染树) --> (布局) --> (绘制到屏幕)

![p03](http://cdn.jerryshi.com/picgo/sf-fe-lesson-03.jpg)

CSS对象模型与DOM Tree有所不通，因为CSSOM有重叠(层叠)的特性。

![p04](http://cdn.jerryshi.com/picgo/sf-fe-lesson-04.jpg)

![p05](http://cdn.jerryshi.com/picgo/sf-fe-lesson-05.jpg)

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
foo.style.color = 'blue' // 先修改一下dom元素，但没立即操作，因为加入到了缓存队列，等待UI线程执行
var margin = parseInt(foo.style.marginTop) // 竟然获取脏节点的属性，不得了了，立即执行喊UI线程来重排和重绘
foo.style.marginTop = (margin + 10) + 'px' // 好了，最后一次操作，只进行重绘
```

以上代码分别会触发几次重绘和重排呢？

- 代码1会触发一次重排和重绘
- 代码2会触发一次重绘+一次重排和重绘
- 当修改一个DOM节点时，修改的操作会先缓存到队列，队列中的修改会在下次UI线程执行时批量更新
- 例外：修改过的节点会被标记为“脏(Dirty)”节点，获取脏节点的属性会导致队列中的更新操作立即执行

常见的优化方案

1. 避免对同一个DOM节点的读和写操作交叉进行
2. 在DOM树外操作DOM，使用document fragment
3. 使用position为absolute或fixed的元素创建动画。这是因为这样的元素已经脱离文档流，修改后的重排与重绘会大大缩小范围
4. 使用window.requestAnimationFrame()。这是一个API，接收一个函数，其会在下次浏览器渲染时调用一并渲染
5. 虚拟DOM库。在虚拟DOM上操作，不会触发重排和重绘

JavaScript对HTML文件解析(默认)会产生阻塞的。

![p06](http://cdn.jerryshi.com/picgo/sf-fe-lesson-06.jpg)

## JS阻塞分析

- 两个外链JS会阻塞两次HTML文件的解析
- 默认情况下，解析是以上往下进行的
- 特殊情况：当两个外链JS脚本自上而下加载时，如果第一个脚本加载和解析完，二第二个脚本也加载完了，就不会产生两次阻塞，只会形成一次阻塞，相当于内嵌JS效果一样
- 外链JS和内嵌JS，都会阻塞解析
- JS代码执行顺序和JS在HTML中的位置顺序一致
- 浏览器解析到script标签时，如果script内部JS已知(内嵌JS或者外链JS已经加载完毕)，会立即解析和执行JS

## CSS间接阻塞分析

- 外链CSs和内嵌CSS，都不会阻塞解析
- 当解析到JS时，如果前面还存在没有解析完成的CSS，这当前JS解析会被阻塞，知道前面的所有CSS都完成解析。这种情况下，就会造成CSS间接阻塞HTML解析的问题。这个原则可以这样理解，浏览器认为你后面内嵌JS可能会操作前面加载中的CSS样式，所以就会分割蓝色的html解析时间柱子。

## JS不阻塞解析

- Async和Defer可以在不阻塞HTML解析的情况下，加载外链JS。Async在JS文件下载完成后立即执行JS，Defer这将JS执行推迟到HTML解析完成后。
- JS动态插入的外链脚本，其特性等同于Async，此时，如果要保证JS执行顺序，需要手动设置script元素的async属性为false

## JS放在body底部问题

> first meaningful paint

- 首次绘制的时间和DOMContentLoaded、onload时间发生时间没有直接关系
- body内的外链JS **可能** 会触发浏览器立即进行首次绘制。这是因为外链JS会阻塞解析HTML，所以遇到了外链JS有可能立马触发首次绘制。

## 优化建议

- CSS放在head中，减小CSS文件，可考虑直接将首屏依赖的关键CSS内嵌到HTML中，然后异步加载其他次要CSS
- 对于不依赖DOM的JS文件，设置async和defer属性进行异步加载(但需要注意JS的执行顺序)
- 当JS必须放到body内时，将JS放到body底部，保证首屏绘制时可以呈现页面的骨架内容，减少用户的白屏感知时间