# 《React.js入门基础与案例开发》学习笔记

[TOC]

## 第1章 课程简介

- React组件基础
  1. React虚拟DOM概念，这是React性能高效的核心算法
  2. React组件，理解什么叫组件化
  3. React多组件嵌套
  4. JSX内置b表达式
  5. 生命周期，纵观整个React的生命周期

- React属性与实践
  1. State属性，控制着React的一切
  2. Props属性
  3. 事件与数据的双向绑定，包含了父子页面之间的参数互传
  4. 可复用附件，真正让React开发快速、高效的地方
  5. 组件的Refs
  6. 独立组件间共享Minxs

- React样式
  1. 内联样式
  2. 内联样式中的表达式
  3. CSS模块化，学习如何使用require进行样式的引用
  4. JSX样式与CSS的互转
  5. 一个匪巢用的样式框架 Ant Design 样式框架介绍
  6. Ant Design 样式框架使用

- React Router
  - Router概念
  - Router参数传递

----------

## 第2章 React 简介

- `https://github.com/enaqx/awesome-react`
- `http://kangax.github.io/compat-table/es6/`

----------

## 第3章 React 初体验

- 如何查看所有的历史版本
  - `https://facebook.github.io/react/blog/all.html`
  - 在官网博客中会有专门的帖子对每个版本的变化做相信的说明
  - `https://cdnjs.com/libraries/react/`

----------

## 第4章 NodeJS简介与安装

- npm修改镜像源：
  - Mac: 修改`~/.npmrc`文件添加`registry=https://registry.npm.taobao.org`
  - Window: 修改Node.js安装目录下`node_modules\npm\.npmrc`文件添加`registry`

- npm 与 cnpm 的区别：

![diff](http://ofx24fene.bkt.clouddn.com//img/2017/npm%20&%20cnpm%20diff.png)

----------

## 第5章 React环境配置与调试技巧

- 环境初始化：
  - `sudo npm i -S react react-dom babelify babel-preset-react`
  - `npm install babel-preset-es2015 -S`
  - `sudo npm i webpack -g`
  - `sudo npm i webpack-dev-server -g`
  - `cd xxx-project && npm i webpack -S && npm i webpack-dev-server -D`
  - `sudo npm i babel-loader -S`
  - `webpack` 大功告成
  - chrome 安装 `React Developer Tools` 开发辅助插件

- 使用webpack监视、自编译、热加载
  - `webpack`为根据config单据编译
  - `webpack --wathch`监视文件变化并自动编译`bundle.js`
  - 按教程走，将bundle.js放`src`，将index.html放`./`，根本不行。全部移到`/dist`就好了，坑啊，难道是`webpack v3.6`的问题。

```js
{
  "watch": "webpack --progress --watch",
  "start": "webpack-dev-server --content-base dist --inline --hot --open",
  "build": "webpack"
}
```

----------

## 第6章 开发工具与必要组件

> atom ~~~

----------

## 第7章 React组件基础

- 开源算法：`https://github.com/Matt-Esch/virtual-dom`
- 官方解释: `https://facebook.github.io/react/docs/react-api.html`
- 简单实例：`http://requirebin.com/?gist=5492847b9a9025e64bab`

```js
// virtual-dom 的简单实例
var h = require('virtual-dom/h');
var diff = require('virtual-dom/diff');
var patch = require('virtual-dom/patch');
var createElement = require('virtual-dom/create-element');

// 1: Create a function that declares what the DOM should look like
function render(count)  {
    return h('div', {
        style: {
            textAlign: 'center',
            lineHeight: (100 + count) + 'px',
            border: '1px solid red',
            width: (100 + count) + 'px',
            height: (100 + count) + 'px'
        }
    }, [String(count)]);
}

// 2: Initialise the document
var count = 0;      // We need some app data. Here we just store a count.

var tree = render(count);               // We need an initial tree
var rootNode = createElement(tree);     // Create an initial root DOM node ...
document.body.appendChild(rootNode);    // ... and it should be in the document

// 3: Wire up the update logic
setInterval(function () {
      count++;

      var newTree = render(count);
      var patches = diff(tree, newTree);
      rootNode = patch(rootNode, patches);
      tree = newTree;
}, 300);
```

### React组件

- 类里有`render()`用于解析类的输出
- 每一个组件return函数最终只能返回一个“HTML”节点，这点和Vue一致
- 组件导出定义: `export default class ComponentHeader extends React.Component {  }`
- 组件入口定义: `ReactDom.render(<Index />, document.getElementById('example'));`

### React多组件嵌套

- 组件也可以通过参数的方式进行传递
- Vue和React大体差不多了，关于套用的话
- 在render()函数内可以将组件定义为变量，方便逻辑操作 `var Header = <ComponentHeader />;`
- 注意项目命令的规范与文件的结构化

### JSX内置表达式

- 三元表达式
- bool值绑定
- 注释`{/*一些注释*/}`
- 解析: 后台解析html字符串，
  - 方法一：用Unicode转码
  - 方法二：`<p dangerouslySetInnerHTML={{ __html: html2 }}></p>`

### 生命周期

- `componentWillMount()`
- `componentDidMount()`

----------

## 第8章 React属性与事件

### State属性

- 初始化 `state`：`this.state = { username: 'Jerry' };`
- 初始化可以放置在构造函数 `constructor()`里
- 修改 `state`：`this.setState({ username: 'afei233' });`
- state的作用域只属于当前的类，不污染其它模块
- state对于模块属于 `自身` 属性

### Props属性

- props对于模块属于 `外来` 属性
- 传递props参数: `<BodyIndex username="Jerry" />`
- 接收props参数: `this.props.username`

### 事件与数据的双向绑定

- 事件绑定
  - 可以在构造函数里绑定 this: `this.forceUpdateHandler = this.forUpdateHandler.bind(this);`
  - 或者调用时绑定: `onClick={this.changeUserInfo.bind(this, 50)}`
  - `<inpit type="button" value="submit" onClick={this.changeUserInfo.bind(this, 50)} />`

- 子页面向父页面传递参数的方法
  - 在子页面中调用父页面传递过来的事件 props 进行组件间的传递参数
  - 为什么onClick事件呢，因为每次都触发，onBlur只触发一次

### 复用组件

- Prop验证
  - `https://facebook.github.io/react/docs/reusable-components.html`
  - `const propTypes = {id: PropTypes.number.isRequired, url: PropTypes.string}`
- 默认Prop值
  - `const defaultProps = {userDesc: '小伙子什么都没留下'};`
- 传递所有父组件props参数的快捷方式 `<Component {...this.props} more='val' />` 这就是ES6扩展运算符嘛

```js
BodyIndex.propTypes = {
  userid: React.PropTypes.string.isRequired,
  userage: React.PropTypes.number
}

<BodyIndex userage={1O} />

// ERROR in ./src/js/index.js
// Module build failed: SyntaxError: C:/git/imooc-react-starter/CH08/03_reusable/src/js/index.js: Identifier directly after number (12:31)
// Uncaught TypeError: Cannot read property 'isRequired' of undefined
// userid 是必须传递的参数，不传递就报错
// userage 是number类型的参数，传字符串报错

/////////////////////////////
const defaultProps = {
  username: 'Defaule-123'
}

BodyIndex.defaultProps = defaultProps;
// 当父组件调用子组件没定义属性是用属性默认值
```

### Refs

- 原始获取dom元素方法：

```js
var myDiv = document.getElementById('myDiv');
RaectDOM.findDOMNode(myDiv).style.color = 'green';
```

- 方法二：React.refs

```js
// <input ref="myInput" />
this.refs.myInput
```

- Refs是访问组件内部DOM节点唯一可靠的方法
- Refs会自动销毁对子组件的引用
- 不要在render里面或render之前对Refs进行调用(DidMount后调用)
- 不要滥用Refs(违背了state改变的原则)

### 独立组件间共享Mixins

- Mixins：组件间用作事件的共享
- 不同组件之间公用功能、共享代码
- 官方文档：`https://facebook.github.io/react/docs/reusable-components.html#mixins`
- 和页面具有类似的生命周期
- ES6下的使用需要安装插件: `react-mixin@2`
- 关于Mixins的讨论文章：`https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html`

----------

## 第9章 React样式

### 内联样式

- CSS命名规范：`dialog__confirm-button--highlight`

```js
// 必须在render函数里定义
const styleComponentHeader = {
  header: {
    backgroundColor: "#333333",
    color: "red",
    // "padding-top": "15px", // 可以用但不推荐
    "paddingTop": "15px",
    paddingBottom: "15px"
  }
}

- 注意样式的驼峰写法
- `style={styleComponentHeader.header}`
- 文件中引用css的形式
- 注意 `class` 徐改成 className
- 缺点是动画、伪类(`hover`)等不能使用

```

> 说来说去就是整转换成行内样式了！

### 内联样式中的表达式

- `paddingBottom: (this.state.isMini) ? "3px" : "18px"`
- 注意好好理解这里的 state 引起样式的及时变化

### CSS模块化

- CSS模块化的缺点
  - 全局污染
  - 命令混乱
  - 依赖管理不彻底
  - 无法共享变量
  - 代码压缩不彻底
- CSS Modules 模块化
- babel-plugin-react-html-attrs
- style-loader
- css-loader
- 导入：`var footerCss = require('../../css/fotter.css');`
- 使用：`<footer class={footerCss.miniFooter}>`
- `:local(.normal){color: red;}`
- `:global(.btn){color：red;}`
- CSS模块化的优点
  - 所有的样式都是 local 的，解决了命名冲突和全局污染问题(名称格式在weppck中配置)
  - class 名生成规则配置灵活，可以以此来压缩 class 名
  - 只需引用组件的 JS 就能搞定组件所有的JS和CSS
  - 依然是CSS，几乎零学习成本

- npm i babel-plugin-react-html-attrs -S
- npm i style-loader css-loader -S
- webpack.config.js
  - `test: /\.css?$/,`
  - `loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'`
- .babelrc
  - "plugins": [ "react-html-attrs" ]

### JSX样式与CSS的互转

- 在线转换: `http://staxmanade.com/CssToReact`

### Ant Design 样式框架

> 一样一样的~

----------

## 第10章 React Router

### Router 基本概念

- `npm install -S react-router`
- 控制页面的层级关系
- 单页面构建 Router 控制
- `https://reacttraining.com/react-router/`
- 底层机制
  - React: state/props -> Components -> UI
  - React: location -> Router -> UI

> 这尼玛才几个月就翻天覆地的变化API！还是散了吧，看官网API。

### Router 参数传递

- `<Route path="/details/:id" component={ComponentDetails} />`
- `{this.props.match.params.id}`
- 太基础了，还是得看官网API啊

----------

## 第11章 项目实战-开发环境初始化

...

## 第12章 项目实战-页头页脚模块

- `https://www.iconfinder.com`
- 项目采用FLEX布局
- 导航使用antd的Memu控件
- `"react-responsive": "^1.3.4"`

```js
<div>
  <MediaQuery query="(min-device-width: 1224px)">
    <PCIndex></PCIndex>
  </MediaQuery>
  <MediaQuery query="(max-device-width: 1224px)">
    <MobileIndex></MobileIndex>
  </MediaQuery>
      </div>
```

----------

## 第13章 项目实战-注册登录模块

- bundle.js:11645 Warning: `getFieldProps` is not recommended, please use `getFieldDecorator` instead.
- Warning: `Form[inline|horizontal|vertical]` is deprecated, please use `Form[layout]` instead.
- `<Form layout="horizontal" onSubmit={this.handleSubmit.bind(this)}>`
- `var formDAta = form.getFieldValue();`已经行不通了，必须加具体FieldName`var formDAta = form.getFieldValue('r_password');`
- 真尼玛，antd越来越严谨了，提交个表单都要验证后再拿值，服了。
- 真奇怪有些ES6语法竟然行不通，我得再配下babel才行？
- 网络的请求使用组件使fetch
- 样式的组件还是使用antd
- antd的Tab组件操作数都是字符串

----------

## 第14章 项目实战-首页模块

- 将首页body每个部分都模块化product、newContainer、newslist等
- antd中的轮播图`carousel`其实和我自己写的一样的，首先得固定个宽度(设置为图片默认宽度)，然后还要在样式中设置一个`overflow: hidden;`为了溢出隐藏；其实div们还是一横排(很大的宽度在那堆呢着)，这尼玛和自己写的是一样一样的，终于感到基础的重要性了。
- 好乱啊原来的布局，还是按grid再分一个子布局出来。

----------

## 第15章 项目实战-详情模块

----------

## 第16章 项目实战-个人中心模块

----------

## 第17章 项目实战-最后调优

----------

## 第18章 网页优化

----------

## 第19章 课程扩展-React的实用组件

----------

## 第20章 课程扩展-使用Webpack 2与React Router 4升级项目

----------

## 第21章 课程扩展-深入React原理与算法

----------

## 第22章 课程扩展-使用Webpack进行项目打包

----------

## 第23章 课程扩展-服务器部署相关

----------