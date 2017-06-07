# JavaScript DOM基础 ---- 99. DOM 个人总结

## 在 HTML DOM 中，所有事物都是节点。DOM 是被视为节点树的 HTML。

### 关于资料查询

 主推mdn和w3cschool，真心好。
 
#### DOM节点
 
 dom

----------

#### 小细节记录
 
 - 关于体会“在HTML DOM中，所有事物都是节点。”
 
```javascript
// 我在我博客http://jerryshi.com执行这个，你懂的我为什么不加all，毕竟一个文档只有一个html根节点嘛。
var html = document.querySelector("html")
console.log(html.childNodes.length) // -> 3
// html.childNodes对象集中包含head、body和text各一个。
// text
console.log(html.children.length)  //  -> 2
```

结论：

Q：节点的`childNodes`和`children`属性到底根据啥原则来细分节点的归类呢？
A：这个问题问得好，小伙，我看好你哦。来来来，走个原理瞅瞅。
第一步，我们先看下这个text到底是啥？哦~原来是`↵↵`两个换行符，其实就是代码中<head>和<body>间的那个空行，空行怎么表示呢？就是两个换行符`↵↵`(以后强迫症患者别代码隔行，虽然文档好看，难道你想在你根节点`html.childNodes`下多加text节点？难道这样的文档会完美？😂)。
第二步，我们再来看看`text`接口的原型链，或者说看`text`接口继承。我就不画图了，手工文字做图法。

`Text`接口的原型链是这样的：`Text --> CharacterData --> Node --> EventTarget`
`HTMLDivElement`接口的原型链是这样的：`HTMLDivElement --> Element --> Element --> Node --> EventTarget`

好了，看完原型链我们应该大概推算出：
1. `childNodes`是把所有实现了Node接口的节点堆成一个类数组返回，常见的包括元素节点、attr属性节点、文本节点等
2. `children`则只把实现了Element接口的节点堆成一个类数组返回

```javascript
// 伪代码大概模拟下两个方法
// 1.引擎从该元素的HTML代码中提取出所有Node节点
this.childNodes = this.createNodes(this.innerHTML) // 自己本身又不是children
this.children = function () {
  var res = {} // 类数组的对象集
  for (var key in childNodes) {
    res[key] = childNodes[key]
  }
  return res
}
```

----------
