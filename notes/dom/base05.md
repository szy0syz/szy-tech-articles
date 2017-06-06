# JavaScript DOM基础 ---- 05.HTMLDivElement、HTMLAnchorElement

## HTMLDivElement

> HTMLDivElement里啥也没有！这说明啥呢？说明这货完完全全就是HTMLElement的实例而已！不过以前有个HTMLDivElement.align，可惜删了以后真的就啥也没有。

## HTMLAnchorElement

> HTMLAnchorElement代表锚元素，并提供一些特殊的属性和方法(出继承HTMLElement的以外)来操作页面的布局和显示。

### Properties

- .accessKey：这应该是继承的，MDN不严谨？
- .hash：返回USVString，其实定位页面位置时用的，`href="/#fist"`时是`hash`返回的是`#first`
- .host：返回href链接中的host
- .hostname：返回href链接中的hostname
- .href：USVString格式的URL
- .hreflang：href的语言类型
- .media：H5属性，规定被链接文档是为何种媒介/设备优化的
- .download：H5属性，规定被下载的超链接目标的文件名
- .coords：HTML5 中不支持。规定链接的坐标
- .charset：HTML5 中不支持。规定被链接文档的字符集
- .name：HTML5 中不支持。规定锚的名称
- .rel：规定当前文档与被链接文档之间的关系
- .rev：HTML5 中不支持。规定被链接文档与当前文档之间的关系
- .shape：HTML5 中不支持。规定链接的形状
- .target：规定在何处打开链接文档
- .type：H5，规定被链接文档的的 MIME 类型

### Methods

> 继承了所有HTMLElement的方法

- toString()：锚元素重写了toString()方法，返回href文本

> 在查阅资料中发现，MDN的资料是全，但太过于繁琐了，而W3CSchool的资料虽然不全，但都是所有浏览器基本通用的，切整理得当，可以两个网站对照来看。
