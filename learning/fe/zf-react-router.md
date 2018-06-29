# 珠峰React-Router-v4学习笔记(2017)

[TOC]

## zf_CH01 跑通路由

![router1](http://ofx24fene.bkt.clouddn.com//img/react/Router1.png)

## zf_CH02 完成组件简单模块化和引入bootstrap

## zf_CH03 嵌套路由

### HashRouter 与 BrowserRouter关系

- HashRouter的路由样式：`http://localhost:3000/#/home`
  - 这个HashRouter肯定和HTML5有关，后面再详细研究
  - 我猜这个路由应该适配WebAPP的，这个因为HashRouter需要用到Stack(栈：先进后出)
- BrowserRouter的路由样式: `http://localhost:3000/home`
  - 这个就是简单的浏览器样式

- 当在PC端使用HashRouter路由时，重复点某个导航(Link)时会报这样一个错：
  - `Warning: Hash history cannot PUSH the same path; a new entry will not be added to the history stack`
  - 提示我们push到stack里相同的路径
  - 原理解释如下图：

![err1](http://ofx24fene.bkt.clouddn.com//img/react/react_router_stack.png)

### 效果图
![CH03](http://ofx24fene.bkt.clouddn.com//img/react/zf_router03.gif)

## zf_CH04 实现用户管理

- ref: `reference` 引用
  - 先在某个虚拟元素上 特性上加入ref，ref内部是一个回调函数，函数第一个参数就是当这个虚拟元素mount挂载到页面并生成的那个dom元素，对，就是dom元素！
  - 只是栗子中的`this.name`取得好土。

```js
class UserAdd extends Component {
  handler = () => {
    let name = this.name.value;
  }
  render(){
    return(
      <input type="text" ref={ref => this.name = ref} />
    );
  };
}
```

## zf_CH05 Switch组件

- `react-router-dom`中的`Switch`，表示只对其内部Route实体进行一次匹配，不像正则那么贪婪。
- `exact`也是对Route实体进行精确匹配

```js
<Switch>
  <Route path="/" exact render={props => <div style={{ background: 'red' }}>首页</div>}></Route>
  <Route path="/:pathname" render={props => props.match.params.pathname}></Route>
  <Route path="/home" component={Home}></Route>
  <Route path="/user" component={User}></Route>
  <Route path="/profile" component={Profile}></Route>
</Switch>
```

## zf_CH06 路由实现登录与退出功能

- 当用户访问个人设置页面时，先判断此用户是否已经登录，如果已经登录则可以直接显示个人设置页面；如果此用户没有登录，那么就跳转到登录页面进行登录，如果登录成功就自动调回登录前的页面！
- 当通过函数来定义组件时，参数必须传个属性props对象。
- 而这个props是哪来的呢？是谁调用这个组件就是它的父组件，这个props就由父组件传递。
- 函数和类声明组件的区别？类声明的组件比函数声明的组件多一个状态，因为类会实例化嘛。
- 哪什么时候用函数声明组件呢？当声明的组件不需要状态(例如路由组件)时就可以用函数式声明，反之需要状态的组件要用类声明。
- `rest`是 [剩余参数运算符]: `export default function ({component: Component, ...rest}){}`
- 注意1：这里是结构的格式 前面那个component是结构出来的外来形参，Component是函数作用域内的实参
- 注意2：从路由中导出的Redirect的to属性会封装接收的对象转移到子组件的props.lcocation上
- `component`属性 对应一个组件 当URL路径跟当前Route path匹配时渲染
- `render`属性 对应一个匿名的组件函数 当URL路径跟当前Route path匹配时渲染
- `children`属性 对应一个匿名的组件 不管路由是否匹配当前URL都会进行渲染

```js
////------App.js ↓↓↓↓↓↓↓↓↓
<Router>
  <Route path="/login" component={Login}></Route>
  <ProtectedRoute path="/profile" component={Profile}></ProtectedRoute>
</Router>
////------App.js ↑↑↑↑↑↑↑↑↑

////------Login.js ↓↓↓↓↓↓↓↓↓
import React from 'react';
export default function (props) {
  return <button className="btn btn-primary" onClick={() => {
    localStorage.setItem('login', 'true');
    props.history.push(props.location.state.from);
  }}>登录</button>
}
////------Login.js ↑↑↑↑↑↑↑↑↑

////------ProtectedRoute.js ↓↓↓↓↓↓↓↓↓
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
export default function ({ component: Component, ...rest }) {
  return <Route {...rest} render={(props) =>
    localStorage.getItem('login') === 'true' ? <Component /> : <Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />
  } />
}
////------ProtectedRoute.js ↑↑↑↑↑↑↑↑↑
```

### 小节流程

1. App.js中定义普通路由`/login`和受保护路由`/profile`
2. Login.js不需要状态就用函数式定义
  - 逻辑1：设置已登录flag
  - 逻辑2：从props.location.state.from获取前一个页面地址，然后push到history的stack里，页面就跳转了
3. ProtectedRoute.js 自定义受保护的路由
  - ES6新语法
  - 返回`<Route />`组件
  - 在`<Route />`里用render属性定义箭头函数，判断flag，如果登录就返回传入的`<Component />`给render函数去渲染
  - 如果没有登录就返回`<Redirect />`给render渲染，在其里to属性自定义对象，这个对象会传给子附件的`props.location`属性上

### React-Router另一种渲染组件的方式 

- 在组件上直接挂Render属性，通过箭头函数`(props)=><div></div>`直接渲染。Link上就不需要挂component了。

```jsx
<Switch>
  <Route path="/:name" render={({match})=>(<div>{match.params.name}</div>)}/>
</Switch>
```

> 从现在来看，真感觉React真的比Vue强！

## zf_CH07 实现路由导航匹配高亮

- http://www.zhufengpeixun.cn/docs/html/react课程/3.react路由.html

```js
export default function ({ to, label, activeOnlyWhenExact }) {
  // 这里结构props里的match了，匹配到路由match有值，没有匹配就没值 
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => {
      return <li className={match ? 'active' : ''}><Link to={to}>{label}</Link></li>
    }} />
  );
}
```

## zf_CH08 路由跳转提示

- 实现流程
  1. 在有Input的组件构造函数上添加`state.blocking=false`属性，当值为true时表示需要提示用户
  2. 将原组件返回并级加返回一个从Router里导出来的Prompt组件，该组件when属性就是``state.blocking`，而message就是提示string即可
  3. 设置影响事件onBlur和onChange修改`state.blocking=true`
  4. 设置提交按钮是个例外，setState用异步方式push路由

## zf_CH09 404组件

- 实现流程
  1. 使用函数方式创建组件，因为这组件不需要状态嘛
  2. 主路由Swich最后写默认路由，不写path属性，它就可以匹配所有路由了