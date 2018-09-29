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

### 生命周期函数

> 在组件运行的某个时刻，会被自动执行的一些函数。

React生命周期函数的四大阶段：Initialization  --> Mounting  --> Updation  -->  Unmonting

* `componentWillMount()`：在组件即将被挂载到页面的时刻自动执行
* `render()`：渲染
* `componentDidMount()`：组件刚刚被挂载之后的时刻自动执行
* `shouldComponentUpdate()`：组件被更新之前，它会自动执行。该函数要求返回boolean值，返回false这不会执行render函数更新组件。所以可以理解这个函数为：是否应该更新组件？
* `componentWillUpdate()`：组件被更新之前，它会自动执行，但它会在 `shouldComponentUpdate()` 之后执行。如果`shouldComponentUpdate()`：返回false就不会有该函数执行了
* `componentDidUpdate()`：组件在被更新完成后，它会自动执行
* `componentWillUpdate()`：当一个组件要从父组件接收了参数，且只有父组件的render函数被重新执行了，则子组件的这个生命周期函数就会被执行。如果这个子组件一开始没有，第一次添加到父组件中时，`componentWillUpdate()`是不会被执行的！打个自己理解的比分，这个生命周期函数好比，要先有儿子以后，父亲给儿子传递属性才会触发，要是连个父亲都有没，母亲生的儿子，是不可能触发的！！！
* `componentWillUnmount`：组件即将要从页面中剔除的时刻，它会自动执行

## 第5章 Redux入门

## 第6章 Redux进阶

## 第7章 项目：Header组件开发

### 7.1 项目搭建

* 清洁template代码
* 使用 `styled-components`
* 使用 `Reset.css`

删除没用的文件，最后只保留`App.js` `index.css` `index.js`

使用 `styled-components` 统一管理组件样式，做到组件样式之间解耦。使用后，我们在组件中就不能直接引入`index.css`文件，而是新建文件 `style.js`来保存css

使用 `Reset.css` 统一不同浏览器内核渲染时出现的不一致问题

### 7.2 简书Header组件布局

创建 `header/index.js` 写react-js代码，在创建 `header/style.js` 放该文件的样式和html代码。我们在styld里把组件的拆分，好比人的细胞一样，一个头拆分成眼睛、鼻子、嘴巴和耳朵，当然还可以再细化

例如：在 `<Nav/>` 组件里，找到小item共性，让后拆分成多个`<NavItem/>`小组件

```js
// header/index.js 结构如下：
class Header extends Component {
  render() {
    return (
      <HeaderWrapper>
        <Logo />
        <Nav></Nav>
      </HeaderWrapper>
    )
  }
}

// header/style.js 结构如下：
export const HeaderWrapper = styled.div`
  position: relative;
  height: 56px;
  border-bottom: 1px solid #f0f0f0;
`
export const Logo = styled.a.attrs({
  href: '/'
})`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100px;
  height: 56px;
  background: url(${logoPic});
  background-size: contain;
`
export const Nav = styled.div`
  width: 960px;
  height: 100%;
  margin: 0 auto;
  background: green;
`
```

在 `style.js` 中，每个组件的样式都是独立的，如果有属性就再补属性即可，这样就是：

    完全遵循组件化思想

### 7-3 简书header组件布局组件化实现

这节课主要使用了 `styled-components` 第三方模块实现了一些带样式的组件，这些组件的样式是独享的，他们之间不会产生任何的相互影响，这就有效的避免了多个组件可能产生的css样式冲突的问题，所以非常建议以后开发时时候使用 `styled-components` 进行项目布局

### 7-4 使用iconfont嵌入头部图标

在网站选好图标后，只需要 `.eot` `.css` `.svg` `.ttf` `.woff` 文件引入项目，修改 `.css` 为 js 文件，然后使用 `import { injectGlobal } from 'styled-components'` 全局注入项目样式中。其中还需要修改 `url()` 的路径，以便方便webpack打包。

使用icon时，先拿到图标唯一的 `unicode` 名称，然后直接 `<i className="iconfont">&#xe636;</i>` 使用即可

### 7-5 使用transition-group实现头部搜索框动画

`CSSTransition`组件其实会帮你在内部组件被挂载到页面前，会把外层的组件上挂载一堆css样式，样式名就是你自定义的`classNames`，款式如：`.slide-enter` `.slide-enter-active` `.slide-exit` `.slide-exit-active`等等，此时就可以在这些样式内写自己的动画代码

    其实和Vue的动画使用方式一样的

优化：把 `.slide-enter` `.slide-exit-active` 最终移动到 `NavSearch`组件上，还需要加 `&` 保存层叠关系

### 7-6 使用Redux进行数据管理

`sotre` 好比一个实例仓库管理，但它不知道如何管理货物进出，得招聘一个 `reducer` 仓管员给仓库才行！

`reducer` 导出的必须是一个纯函数：给定一个固定的输入，必须返回一个固定的输出

使用reduc的dispatch出action改变reduc中的state

最终Header组件被拆解为一个“无状态组件”，如果这样，其实我们又可以把这个组件写成一个 “**函数**”。如果把一个组件写成无状态组件后，它的性能和可测试性都有提高

### 7-7 使用combineReducers对数据拆分管理

`redux-devtools-extension`

reducer如果存放过多数据，可能会造成代码的不可维护，那么我们把一个reducer拆分成很多个子reducer，最终再做一个整合即可。

### 7-8 actionCreators与constants的应用拆分数据

首先在header组件的store里创建 `actionCreators.js`，用于返回action函数

再创建 `actionTypes.js`，用于存储action type的常量

```js
// 'header' 表示命名空间，防止命名冲突
export const SEARCH_FOCUS = 'header/SEARCH_FOCUS'
```

在header组件的store里统一对外导出 `index.js` 文件，方便导出变量管理。这样我们就把一个组件展示的代码和数据管理的代码统一放到了一个文件夹下，这样以后管理组件就很方便迭代了

### 7-9 使用immutable来管理store中的数据

`immutable.js`这个库是Facebook耗时三年开发的一个库，它可以帮助我们生成一个 `immutable` 对象，这个对象是不可改变的。假设 reducer 中的 state 是一个 immutable 对象，那么 state 就不可以被改变，那么reducer就不会出问题

使用步骤：

* `import { fromJS } from 'immutable'`
* `const defaultState = fromJS({ isFocused: false })`
* `isFocused: state.header.get('isFocused')` 在业务组件中修改 mapStateToProps 的方式
* 回到header组件的reducer中，此时不能直接使用 `{ isFocused: true }`，因为次吃state是一个 immutable对象，是不允许修改的，所有我们得用 `set()` 方法
* 接着immutable对象的set方法，会结合之前 immutable 对象的值和设置的值，返回一个 [全新的对象]，其实set方法并不会去改变原先对象里的值！

### 7-10 使用redux-immutable统一数据格式

`state.header.get('isFocused')` 这段代码，第一个 `.` 是js方式的获取属性，但回去到的是 immutable 对象，再接着又用 `.get` 的immutable 方式获取属性，这样就是获取数据的不统一

原来这样获取`import { combineReducers } from 'redux'`，现在这样获取`import { combineReducers } from 'redux-immutable'`，用redux-immutable导出的combineReducers函数返回的就是一个immutable对象

此时，项目从头到尾的架子基本打完，接下来就是往架子上挂肉的过程，那这个过程就会简单很多

### 7-11 热门搜索样式布局

创建了在 `isFocused` 为 `true` 时，通过js代码直接把样式放到页面中去，不用css控制，这点可能太过于极端？

### 7-12 Ajax获取热门推荐

获取异步数据不能直接写在组件里，我们需要把异步操作放在action或者redux-sega里处理，该项目我们统一使用redux-thunk中间件用action来处理

`redux-thunk`是redux的一个中间件，它使得我们可以

```js
const store = createStore(reducer, composeEnhancers(
  applyMiddleware(thunk)
))
```

如何在`create-react-app`项目中mock数据呢？

其实在 `create-react-app` 底层也运行着一个node服务器，当访问`/api/headerList.json`时，node服务器会先到工程目录下看有没有这样的路由，如果找不到，就会去`/public`目录下去找，如果找到就把这个文件返回，如果没找到返回404错误

问题：

```js
const defaultState = fromJS({
  isFocused: false,
  list: []    // 此时，list属性对应的数据已经被immutable转换成了immutable的数据，不再是一个普通数据
})

// return state.set('list', action.data)
// 而在reducer里，我们尝试用action.data这个普通的js数据赋值给 immutable-array数据时，一定是报错的
```

解决：在源头 `actionCreators`里发送前就把js-array转换成immutable-array就可以了

```js
const changeList = (data) => ({
  type: actionTypes.CHANGE_LIST,
  data: fromJS(data)
})
```

    注意：在组件的 render 中使用 `mapStateToProps` 后，props 仍然是 immutable对象，但immutable-array仍然提供一些数组的基本方法

### 7-13 代码优化微调

解构 `this.props`
`if` 转 `switch`

### 7-14 热门搜索换页功能实现

```js
// return state.set('list', action.data).set('totalPage', action.totalPage)
return state.merge({
  list: action.data,
  totalPage: action.totalPage
})
```

### 7-15 换页旋转动画效果的实现

React实现动画的另一种方式：首先用 `ref` 获取DOM元素，然后再用`transition`初始化动画，最后在handler方法中改变dom元素style属性来驱动动画即可

### 7-16 避免发送重复ajax请求

```js
// 注意：这里的list是immutable-array，没有length的
(list.size === 0) && dispatch(actionCreators.getList())
```

## 第8章 项目：首页开发

### 8-1 react-router-dom的基本使用

`yarn add react-router-dom`

```js
// 未使用路由前，无论访问哪个路径，都是显示一个 Header 组件
return (
  <Provider store={store}>
    <Header />
  </Provider>
)
```

```js
// 开始使用路由，先引用
import { BrowserRouter, Route } from 'react-router-dom'

// 把 BrowerHitory 当成一个组件 包裹在需要切换路由显示的位置
// 此时 BrowerHitory 中间部分就是会切换显示的内容
return (
  <Provider store={store}>
    <Header />
    <BrowserRouter>
      <Fragment>
        <Route path='/' exact render={() => <div>Home</div>}></Route>
        <Route path='/detail' exact render={() => <div>Detail</div>}></Route>
      </Fragment>
    </BrowserRouter>
  </Provider>
)
```

`BrowserRouter` 代表一个整体的路由，而 `Route` 则代表每个具体的路由规则

### 8-2 首页组件的拆分

### 8-3 首页专题区域布局及reducer的设计

创建 Home 组件的 redux 流程

* 在组件下新建 store 文件夹，随后创建 `index.js` `reducer.js` `actionTypes.js` `actionCretors.js`
* 在根目录的 store 文件夹下找到 `store.js` 文件，将 Home 组件的 reduxer 引入并使用 `home: HomeReducer`
* 引入 `connect`，替换 Topic组件默认导出的组件，`connect()(Topic)` 这样表示这个组件和 Provider 相连接
* 但在导出 Topic 组件前，还得准备 mapState 和 mapDispatch 函数当作 `connect` 函数的参数
* 在 mapState 函数里 `list: state.get('home').get('topicList')` 把store里的immutable对象映射该组件的props上即可

### 8-4 首页文章列表制作

    又复习了一道redux执行流程

## 第9章 项目：详情页面和登录功能开发

## 第10章 课程总结