# Redux学习笔记及代码

## CH01: redux应用场景和工作原理

- 我的绘画作品

![redux1](http://ofx24fene.bkt.clouddn.com//img/react/react-redux-scene1.png)

- Redux设计思想
  - Redux是将整个应用状态存储到到一个地方，称为`store`,，里面保存一棵状态树(`state tree`)。 组件可以派发(`dispatch`)行为(`action`)给`store`,而不是直接通知其它组件。 组件内部通过订阅`store`中的状态(`state`)来刷新自己的视图。

![redux-flow](http://ofx24fene.bkt.clouddn.com//img/react/redux-flow.png)

-------

## CH02: redux & jquery应用

- 第一步：创建一个基本导出的模块结构
  - 那么问题来了`reducer`是写死的还是传进来的呢？答案为传进来了，因为每个业务操作都不一样。

```js
const createStore = () => {
  let state;
}
export { createStore }
```

- `reduce` 永远只有一个`store`。如果老实复杂了，可以使用`state tree`。
- 为了初始化仓库里的`state`，一般我们会在`createStore`内部先调用一次`dispatch()`，这样避免第一次没发送`action`时`state`为`undefined`。
- 新建`reducer`时，如果action没初始化就啥也不管直接返回`state`。
- 在reducer的switch中用action.type最好用常量。

- 第二步：写完redux简单模拟实现

```js
// 创建仓库
const createStore = (reducer) => {
  // 状态
  let state;
  // 监听函数数组
  let listeners = [];
  // 获取最新的实时状态
  let getState = () => state;
  // 向仓库发送action
  let dispatch = (action) => {
    // 两个参数分别是：原state状态和传进来的指令。相当于用传来的执行action修改原state后返回新state
    // reducer最后返回新的state
    state = reducer(state, action);
    // 依次循环所有监听者们执行一次
    listeners.forEach(listener => listener())
  };
  // 订阅仓库内的状态事件，当状态发生变化后会调用对应的监听函数
  // 订阅方法执行后会返回一个取消订阅的函数，调用它可以取消订阅
  let subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      // 在现有监听者们中过滤掉传进来的这个监听者
      listeners = listeners.filter(l=>listener !== l);
    }
  };
  // 为了没action时初始化state
  dispatch();
  return { 
    getState,
    subscribe,
    dispatch
  }
}
export { createStore }
```

### 动态演示

![redux](http://ofx24fene.bkt.clouddn.com//img/react/redux.gif)

> 哇哈哈，我竟然模拟了redux的实现！

### 手绘复习redux调用流程

![redux-flow-hand](http://ofx24fene.bkt.clouddn.com//img/react/redux-flow-hand.jpeg)

-------

## CH03: redux & react应用

- 第一版: 使用老法子调用redux

```js
import React, { Component } from 'react';
import ReactRom from 'react-dom';
import { createStore } from './redux';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

// state是状态树，可以是任意的结构
// action是一个纯对象，但规定死了必须有一个属性type: {type: 'INCREASE'} / {type: 'DECREASE'}
let reducer = (state = { number: 0 }, action) => {
  if (action === undefined) { return state; }
  switch (action.type) {
    case INCREASE:
      return { number: state.number + action.amount }
    case DECREASE:
      return { number: state.number - action.amount }
    default:
      return { number: state }
  }
}
// store = {getState, subscribe, dispatch}
let store = createStore(reducer);
class Counter extends Component {
  render() {
    return (
      <div>
        <p>{store.getState().number}</p>
        <button onClick={()=>store.dispatch({type: INCREASE, amount: 3})}>+</button>
        <button onClick={()=>store.dispatch({type: DECREASE, amount: 2})}>+</button>
      </div>
    );
  }
}

let render = () => {
  ReactRom.render(<Counter/>, document.querySelector('#root'));
}
render();
store.subscribe(render);
```

- 第二版：使用新方法调用Redux

```js
import React, { Component } from 'react';
import ReactRom from 'react-dom';
import { createStore } from './redux';

const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

//  {type: 'INCREASE'} / {type: 'DECREASE'}
let reducer = (state = { number: 0 }, action) => {
  if (action === undefined) { return state; }
  switch (action.type) {
    case INCREASE:
      return { number: state.number + action.amount }
    case DECREASE:
      return { number: state.number - action.amount }
    default:
      return { number: state }
  }
}
// store = {getState, subscribe, dispatch}
let store = createStore(reducer);
class Counter extends Component {
  constructor() {
    super();
    this.state = { number: store.getState().number };

  }
  componentWillMount(){
    this.unsubscribe = store.subscribe(() => {
      this.setState({number: store.getState().number});
    });
  }
  componentWillUnmount(){
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={() => store.dispatch({ type: INCREASE, amount: 3 })}>+</button>
        <button onClick={() => store.dispatch({ type: DECREASE, amount: 2 })}>+</button>
      </div>
    );
  }
}

ReactRom.render(<Counter />, document.querySelector('#root'));
```

- React中组件化常规调用Redux的流程(初版，CH05中还有升级版)
  - 定义action常量名；
  - 定义reducer
  - 创建store
  - 新建子组件
  - 在子组件的constructor中，首先定义store中state的值赋给子组件自身state
  - 在子组件componentWillMount()生命周期函数中对应store.subscribe()订阅，内容就是`this.setState({number: store.getState().number});`
  - 在子组件componentWillUnmount中定义`this.unsubscribe()`
  - 在render()中，使用store发射action即可

-------

## CH04: redux概念回顾

### Redux的大三原则

- 原则一：整个应用的 `state` 被存储在一棵 `object tree` 中，便给这个 `object tree` 只存储在唯一一个 `state`中；
- 原则二：`state` 是只读的，唯一改变 `state` 的方法就是触发 `action`， `action` 是一个用于描述已发生事件的普通对象。`action`经过reducer后会覆盖返回新的`state`覆盖老的`state`；
- 原则三：使用存函数来执行修改，为了描述 `action` 如何改变 `state tree` ，你需要编写 `reducers`。

> 单一数据源的设计让 React 的组件之间的通信更加方便，同时也便于状态的统一管理。

-------

## CH05: redux版todos

> **注意：Redux要求我们的状态具有不变性，在有进行操作的case时，每次都要返回一个新的对象。说白了就是每次返回的引用都必须与老的不一样。**

### 关于React组件中使用Redux的流程

1. 


-------

## CH06: combineReducers

> 在箭头函数后，如果默认要默认返回就不要加花括号

在实现combineReducers时用到了“高阶函数”，其定义为：
  - 函数可以作为参数被传递；
  - 函数可以作为返回值输出。

我们实现combineReducers原理就是将函数作为结果输出。

#### combineReducers的实现

1. 老表的实质：一个函数，形参接收的是一个由若干reducer组成对象，返回的也是一个标准的reducer函数
2. 老表的作用：合并若干reducer成一个大的reducer返回

好了，知道了实质，就好写了:

```js
// 算了，就不写成es6版了，那语法太甜了！
function combineReducers(reducers) {
  // 高阶函数：函数返回函数
  return function(state, action) {
    let newState = {};
    for(var key in reducers) {
      if(reducers.hasOwnProperty(key)) {
        newState[key] = reducers[key](state[key], action);
      }
    }
  }
}

// 总之，还是要写个es6版本的
let combineReducers = (reducers) =>
  // 在tm记一遍：每个reducer都需要返回默认值，因为有内部初始化渲染dispatch的需要！
  // counter: { number: 0 }, todo: { list: [] }
  (state = {}, action) => { // 必须返回一个reducer(es6写法，买买，这种写法好语法糖啊！！！)
    // if (!action) return state; // 这里不需要，因为在子reducer里会有默认值处理
    let newState = {};
    for (var key in reducers) { // todo, counter 两个key
      // newState[key] = reducers[key]; // 不能这样写，因为reducers[key]取来的是reducer，不是state啊。
      // reducers[key](state[key], action); 我们不能传整个state进去，我们只能传key对应的老的state传进去
      newState[key] = reducers[key](state[key], action);
    }
    return newState;
  }
```

> 关于实现combineReducers的核心：多个reducer合并一个标准格式的reducer，子reducer只更新自己的state。

## CH07: context

### 有用**content**的demo

```js
class Contatiner extends Component {
  render() {
    return (
      <MessageList color={color} messages={this.props.messages}></MessageList>
    )
  }
}

class MessageList extends Component {
  render() {
    return (
      <ul>
        {
          this.props.messages.map((m, i) => (
            <Message color={this.props.color} key={i} message={m}></Message>
          ))
        }
      </ul>
    )
  }
}

class Message extends Component {
  render() {
    return (
      <li style={{ color: this.props.color }}>{this.props.message}</li>
    );
  }
}
```

### 使用context后

1. 祖宗组件类定义时使用`getChildContenxt()`函数
2. 祖宗组件类定义完后再追加`Contatiner.childContextTypes`
3. 孙组件内先定义`Message.contextTypes`
4. 孙组件使用`this.context.color`使用属性

> If you want your application to be stable, don’t use context. It is an experimental API and it is likely to break in future releases of React.
> 呵呵~

------

## CH08: react-redux

> React-Redux 将所有组件分成两大类：UI 组件（presentational component）和容器组件（container component）。 

### UI 组件

- UI 组件有以下几个特征。
  - 只负责 UI 的呈现，不带有任何业务逻辑
  - 没有状态（即不使用this.state这个变量）
  - 所有数据都由参数（this.props）提供
  - 不使用任何 Redux 的 API

下面就是一个 UI 组件的例子。

```js
const Title =
  value => <h1>{value}</h1>;
```

因为不含有状态，UI 组件又称为"纯组件"或“木偶组件”，即它纯函数一样，纯粹由参数决定它的值。

### 容器组件

- 容器组件的特征恰恰相反
  - 负责管理数据和业务逻辑，不负责 UI 的呈现
  - 带有内部状态
  - 使用 Redux 的 API 总之，只要记住一句话就可以了：UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。 你可能会问，如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。 React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

- 手写的很重要明天补再心得笔记。

> 在React中，当使用context属性时，在孙组件中的constructor构造函数中是无法获取this.context属性，因为还没初始化啊！

------

## CH09: 使用系统库实现

- 使用大神的写好的包来替换自己写的
  - 替换自己写的`redux`
  - 结构`react-redux`替换`Provider`
  - 结构`react-redux`替换`connect`

### 理清React-Reudx的使用路线

1. ~~从 `react-redux` 中结构 `{ Provider }`，用`<Provider></Provider>`包裹所有子孙组件，并在`<Provider store={store}>`放好store，以后的子孙组件可以用过context访问到这个store；~~
2. ~~写`store.js`：~~

> 完全写不出来嘛

**重新整理思路，再用系统库实现一此React-Redux：**

1. 从'react-redux'导`Provider`: 其实质就是将包裹组件，并自己属性上的sotre传递下去给所有子子孙孙组件。
2. 导入sotre
3. 在store.js中先从`redux`中导入`redux.createStore()`函数
4. 在导入若干reducer，如果需要就combineReducer
5. 创建store实例
6. 实现各种reducer，注意要判断没传action时的情况
7. 创建函数式组件。因为组件状态组件统一归redux管理，所以可以写成函数式的组件了,毕竟我们只用了属性，没用状态了，所以组件不需要管状态了，全部使用属性就可以，但如果有自己状态也可以
8. 实现状态映射属性表
9. 实现事件映射属性表：这里key的值必须是函数，丢事件嘛，不放函数放什么。
10. 调用`connect(mapState,mapDispatch)(MyComponent)`函数返回新的Proxy包装组件对象

> 因为就是上面这些，第二版来一个手写实现React-Redux版的使用流程