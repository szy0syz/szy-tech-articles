# JavaScript DOM基础 ---- 04.HTMLElement class

### Properties

- HTMLElement.accessKey：用字符串存一个访问元素的快捷键
- HTMLElement.accessKeyLabel：存快捷键的描述
- HTMLElement.contentEditable：字符串，设置/获取元素可编辑状态，有inherit/true/false
- HTMLElement.isContentEditable：只读，标明是否可读
- HTMLElement.contextMenu：实验属性，设置/获取元素的右键菜单
- HTMLElement.dataset：获取元素中带data-的自定义特性集，是一个对象集
- HTMLElement.dir：获取/设置元素的方向，可选的值有：ltr，rtl，auto
- HTMLElement.draggable：设置/获取元素是否可以拖拽
- HTMLElement.dropzone：只读，返回DOMSettableTokenList...后面再说
- HTMLElement.hidden：获取/设置元素是否隐藏，好用!
- HTMLElement.lang：获取/设置元素属性、文本、内容的语言
- HTMLElement.spellcheck：
- HTMLElement.style：获取/设置元素的style属性,返回CSSStyleDeclaration的实例，其是CSS属性键值对的集合
- HTMLElement.tabIndex：获取/设置元素的tab键控制次序
- HTMLElement.title：获取/设置元素的title属性
- HTMLElement.offsetHeight：实验属性，元素自身可视高度加上上下border的宽度
- HTMLElement.offsetLeft：实验属性，元素自己border左边距离父元素border左边或者body元素border左边的距离
- HTMLElement.offsetParent：实验属性，元素的父元素，如果没有就是body元素
- HTMLElement.offsetTop：实验属性，元素自己border顶部距离父元素左边或者body元素border顶部的距离
- HTMLElement.offsetWidth：实验属性，元素自身可视宽度加上左右border的宽度

### Event handlers

> 都是非标准handler，就算了

### Mehods

- HTMLElement.blur()：手动触发元素失去焦点的handler，如果有，似乎移动端都没支持
- HTMLElement.click()：手动触发元素点击元素的handler，如果有
- HTMLElement.focus()：手动触发元素聚焦元素的handler，如果有

#### 疑问：

 1. isContentEditable 这个状态到底怎么用，明明一个input，界面明明可以编辑，却返回false，诡异
