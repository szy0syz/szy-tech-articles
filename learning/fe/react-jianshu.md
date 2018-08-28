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

## 第5章 Redux入门

## 第6章 Redux进阶

## 第7章 项目：Header组件开发

## 第8章 项目：首页开发

## 第9章 项目：详情页面和登录功能开发

## 第10章 课程总结