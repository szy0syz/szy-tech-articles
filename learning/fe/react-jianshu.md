# React16.4开发简书项目 从零基础入门到实战

    Immutable.js，React-redux,React-router4

## 第2章 React初探

* 在组件中如果不想在组件外再包一个元素，可以使用`Fragment`

关于React中的immutable应用

* `immutable` 不可变的
* `state` 不允许我们做任何改变

```js
handleItemRremove(index) {
    const list = [...this.state.list]   // 创建副本
    list.splice(index, 1)               // 修改操作
    this.setState({                     // 重新赋值state
        list: list
    })
}
```

* 组件写样式，不要直接用class，会和es6关键字同名，得用 `className`
* 组件属性：`dangerousSetInnerHTML` 危险的转换html

## 第3章 React基础精讲

### React设计思想

* 声明式开发
  * 对应的就是命令式的开发，例如jQuery就是一个操作DOM的命令式开发。而React这是好比我们在设计一张大楼的图纸，我们只管图纸设计，怎么施工就交给React。
* 可以与其他框架并存
* 组件化
* 单项数据流
  * 例如父组件中有5个子组件共同引用了一个数据源，当5个子组件都有修改数据源的操作后，如果出现bug，要精确定位bug很困难，必须一个一个组件找
  * 如果真要改就统一在父组件中改
* 视图层框架
* 函数式编程
  * React代码基本上都是一个个函数的写法
  * 优势1：易于维护，当一个函数比较大时，可以拆分，每个函数各司其职
  * 优势2：面试测试的开发流程，如果项目代码都是些函数，我们就可以很方便的测试其输出是不是符合我们预期的值

## 第4章 React高级内容

* `defaultProps` 默认属性值
* `propTypes`    限制属性类别

### props/state/render函数的关系

> 当组件的 `state` 或者 `props` 发生改变时，`render`函数就会执行

怎么证明呢？---> render函数首行加 `console.log`

之所以数据发生变化，页面就会跟着变，是因为页面是由render函数渲染出来的。所以当数据state变化时，render函数就会重新执行一次，所以页面也就跟着变。这里数据不仅仅指的是state，其还包括了props

当父组件的render函数被运行时，它所有的子组件的render函数都会再次被运行

### 相识虚拟DOM/渲染机制render

> 第一版：渲染机制

1. `state` 数据
2. `jsx` 模板
3. 数据 + 模板 结合，生成真实的DOM，页面渲染出来
4. state 发生改变
5. 数据 + 模板 结合，生成新的真实DOM，替换原来的DOM

* 第一版缺陷：
  * 第一次生成了一个完整的DOM片段
  * 第二次又生成一个完整DOM
  * 第二次生成的DOM替换掉第一次生成的DOM（**非常耗性能**）

> 第二版：渲染机制

1. `state` 数据
2. `jsx` 模板
3. 数据 + 模板 结合，生成真实的DOM，页面渲染出来
4. state 发生改变
5. 数据 + 模板 结合，生成新的真实DOM，但并不直接替换原来DOM
6. 新的DOM (DocumentFragment) 和 原来的DOM做对比，找差异diff
7. 找出了input框发生了变化
8. 只用新的DOM中的input元素，替换掉老的DOM中的input元素

* 第二版缺陷：
  * 性能提升不明显

> 第三版

1. `state` 数据
2. `jsx` 模板
3. 数据 + 模板生成虚拟DOM(实质就是一个JS对象数组而已，用它来描述真实DOM) `['div', {id: 'content'}, ['span',{}, 'hello world']]` (消耗了一点性能))
4. 使用虚拟DOM的结构生成真实的DOM，页面渲染出来 `<div id="content"><span>hello world</span></div>`
5. state 发生改变
6. 数据 + 模板 `['div', {id: 'content', ['span', {}, 'bye bye']}]` (极大的提示了性能，因为原来使用了WebAPI级别操作，生成DocumentFragment对象，性能开销很大，而现在只是一个JS对象)
7. 比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是span的内容
8. 直接操作原始DOM，改变span的内容即可

render函数中：jsx --> createElement --> 虚拟DOM(js对象) --> 真实DOM

说白了也就是jsx中的 `<div></div>` 就不是虚拟dom，只是jsx的语法而已，但最终还是会转换

虚拟DOM的好处：

* 性能提升了
* 他使得跨端应用得以实现，如React Native

### 虚拟DOM的diff算法

> 两个虚拟DOM的比较差异的算法就叫diff(diffrence)算法，实则就是JavaScript中两个js对象的差异比对。

* React中如果在短时间内(例如一个函数体里)连续执行了三次setState操作，React会把三次setState合并成一次setState，只进行一次虚拟DOM的diff比对，最后只更新一次DOM。
* React的diff算法核心：同级比较，一比较一层，有差异整体替换。diff算从虚拟DOM树的根节点进行比较，如果根节点就存在差异，就不会再比较下层节点，则会把原虚拟DOM该层节点下的DOM全部删除，用新的虚拟DOM重新生成一遍页面上绑定的虚拟DOM，再用页面绑定的虚拟DOM重新生成页面上的真实DOM。
* diff算法，同层比对，算法简单，则比对速度很快。所以虽然会浪费DOM渲染的性能，但是它可以大大减少了两个虚拟DOM比对上花费的性能消耗。
* 例子：一个虚拟DOM上的数组结构做循环，渲染到了页面上。在没有key值时，数据发生变化后，diff算法没法确定新虚拟DOM和原虚拟DOM元素间的关系，好比新的a变了，对应老的a到底是数组中的哪个元素呢？diff算法只能写双循环遍历确定，这样就会造成很大的性能开销。而假如，在对虚拟DOM数组做循环时给每个最外层父节点设置key值取名字后，新a变化后立马就能抓到对应老a来对比，好的，你变化，那么把a这个节点树整颗替换即可，再例如数组push了新元素z，diff算法一看key，原来没它，就生成新DOM树即可。
* 实例：循环是用index做key值。例如`['a','b', 'c']`，循环拿index做key值，当我们删除a时，新数组对应的就是 `['b':0, 'c': 1]`，好的diff算法一上来看到key值，怎么“全变了”，好吧，没办法，只能去重新这棵节点数！而当我们用稳定的唯一值做key值时，删除a元素后，diff算法比较后只会把dom树上的a节点删除，节省了渲染的性能。

### ref

正常情况下，在React中尽量不要使用 `ref`，因为有很多坑在等着你。

在一些页面动画等特殊情况下，必须要操作dom时，我们还是用ref来获取dom。但要记得ref和setState合用是有些坑，导致了DOM获取并不及时，原因就是setState是异步的，如果你希望页面更新之后再获取dom，一定记得要把dom操作的语法放到setState的回调函数中。

## 第5章 Redux入门

## 第6章 Redux进阶

## 第7章 项目：Header组件开发

## 第8章 项目：首页开发

## 第9章 项目：详情页面和登录功能开发

## 第10章 课程总结