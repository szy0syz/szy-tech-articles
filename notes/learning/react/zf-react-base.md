# React基础学习笔记及代码

[TOC]

## CH01：认识React

- http://www.zhufengpeixun.cn/docs/html/react%E8%AF%BE%E7%A8%8B/2.React%E5%9F%BA%E7%A1%80.html

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Index</h1>,
  document.getElementById('root')
);

// React内核会把上面语句转换成以下格式：
//{
//    tagName: 'h1',
//    attr: null,
//    children: ['Index']
//}
// 两者相等
//ReactDOM.render(
//    React.createElement('h1', null, ['Index'])
//);
```

> 最终React引擎会把JSX书写的React元素转换成DOM元素插入到页面当中

- `ReactDOM.render()`函数的含义就是把一个React元素渲染到要挂载的DOM容器内
- `JSX`的简单理解：JavaSctipt+HTML(xmlの一种)的混合写法
- React元素时通过JavaScript对象来描述DOM结构的一种数据结构

## CH02 JSX

> 《React.js 小书
》  http://huziketang.com/books/react/

```js
const el1 = <h1>hello</h1>;
console.log(el1);
// 上面为语法糖，下面才是真正转换后的代码
const el2 = React.createElement('h1',null,['hello']);
console.log(el2);
```

- `React.createElement(type, attrs, array)`函数详解
  - type参数为标签类型
  - atts参数为属性对象
  - array参数为子元素数组
  - 注: atts中的所有属性名需遵守驼峰命名法 `backgroundColor`
  - 注: 有些atts里是属性为JS关键字，要转换写法 `class` 转 `className`，`for`转`htmlFor`

```js
const el3 = <div id="myDiv" className="red">hello</div>;
const _el3 = React.createElement('div', { className: "red", id: "myDiv" }, ['hello']);
// 经过简化后el3和_el3转换的React元素时以下这样的
let el3Obj = {
  type: 'div',
  props: { className: 'red', id: 'myDiv', childrem: ['hello'] }
};
```

- 关于手写实现React.Render()原理V1版：
  - children属性只能接受字符串，哈哈，好土

```js
let el3Obj = {
  type: 'div',
  props: { className: 'red', id: 'myDiv1', children: ['hello'] }
};

function render({props, type} , container) {
  let ele = document.createElement(type);
  for(let attr in props) {
    if(attr === 'children') {
      props[attr].forEach((item)=> {
        let textNode = document.createTextNode(item);
        ele.appendChild(textNode);
      });
    } else if(attr === 'className') {
      ele.setAttribute('class', props[attr]);
    } else {
      ele.setAttribute(attr, props[attr]);
    }
  }
  container.appendChild(ele);
}

render(el3Obj, document.querySelector('#root'));
```

- 实现React.Render()原理V2版：
  - 就是在children里多了个递归调用函数自身

```js

function render({ props, type }, container) {
  let ele = document.createElement(type);
  for (let attr in props) {
    if (attr === 'children') {
      props[attr].forEach((item) => {
        if (typeof item === 'string') {
          let textNode = document.createTextNode(item);
          ele.appendChild(textNode);
        } else {
          render(item, ele);
        }
      });
    } else if (attr === 'className') {
      ele.setAttribute('class', props[attr]);
    } else {
      ele.setAttribute(attr, props[attr]);
    }
  }
  container.appendChild(ele);
}
```
## CH03 JSX

- 在JSX的`{}`里放的是JS表达式，表达式是由变量的运行符组合而成
- 条件渲染时，可以返回`null`，表示什么都不进行渲染

![jsx-flow](http://ofx24fene.bkt.clouddn.com//2017/react/react-jsx-flow.png)

## CH04 React组件

1. React是一个用户界面的库
2. React元素 JSX元素 其实就是一个用JS来描述界面的对象

```js
let el = React.createElement('div', null, [React.createElement('span', {key: '1'}, ['hello'])];
// el经过React构造后会呈现如下结构:
{
  type: "div",
  props: {
    children: [
      {
        type: 'span',
        props: { children: [ 'hello' ] }
      }
    ]
  }
}
```

- React是由 React元素 和 React组件 构成
  1. 首字母要小写，凡是首字母小写的购汇被认为是React元素
  2. 在React里用DOM原生标签声明元素时，只能写DOM里原生的属性，如果出现不识别的，React渲染时会把不识别的属性从元素上移除

- React组件
  - 组件的出现可以很直观的将一个复杂的页面分割成若干独立组件，每个组件包含自己的逻辑和样式，再讲这些独立组件组合成一个复杂的页面。这样既减少了逻辑复杂度，又实现了代码的重用
  - 可组合：一个组件可以和其它的组件一起使用或者直接嵌套在另一个组件内部
  - 可重用：每个组件都是具有独立功能的，它可以被使用在多个场景中
  - 可维护：每个小组件仅仅包含自身的逻辑，更容易被理解和维护

### 组件的两种定义方式及区别

- 函数式定义组件
  - 当Message组件被调用时，调用者(父组件会)封装赋值props参数对象给子组件传递进去
  - 当render时，Message组件里的props会收到这样一个对象: `{ msg: 'jerry', id: '44' }`
  - 组件名首字母必须是大写的
  - 如果组件名首字母是小写的，就会被React引擎识别为 React元素，根本没法渲染
  - React核心知识点：组件、元素、属性、状态
  - 组件定义完后可以像React元素一样使用

```js
import React from 'react'
import ReactDOM,{render} from 'react-dom';
let Message = ({props}) => <h1 sytle={props.stlye}>{props.msg}</h1>;
render(<Message msg="jerry" id="44" sytle={{color: 'red'}} hobby={['eat', 'sleep']} />, document.querySelector('#root'));
```

- 组件的渲染过程
  1. 将组件上的属性 封装成`props`对象(键/值对)
  2. 调用组件函数，得到返回的 React元素
  3. ReactDOM把React元素转成真实的DOM元素并且插入到目标容器内部

## CH05 React组件的状态

### 组件的两种定义方式及区别

- 类方式声明组件
  - 通过类来声明的组件比函数声明的组件多了一个 `状态`
  - 状态可以用来存放组件内部一些变化的值。状态只能有内部初始化、由内部改变 
  - 类里的render方法指的是该组件将要如何渲染，一定要返回一个React元素，必须仅返回一个React元素

```js
// Demo: 通过类声明组件的小时钟
class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }
  componentDidMount() {
    window.setInterval(() => {
      this.setState({
        time: new Date().toLocaleString()
      });
    }, 1000);
  }
  render() {
    return (
      <div>
        <span>Datetime:  </span>
        <span>{this.state.time}</span>
      </div>
    );
  };
}
```

## CH06 React组件的属性

- React组件的状态是该组件自己本身的，父组件无法直接修改；
- React组件的属性是父组件传递进来的，并不是组件本身的；
- 打比喻：组件的属性好比儿子输出时父亲给取的名字，而组件的状态好比儿子心情。

### 组件的默认属性

当父组件没传递时，React会自动取默认属性到props上。

```js
static defaultProps = {
    name: '无名氏'
};
```

### 组件的属性类型

当父组件传递属性时，会进行过滤限制。

```js
static propTypes = {
    name: PropType.string.isRequired,
    age: PropType.number
};
```

## CH07 受控组件DOM操作

### 受控组件

> 收组状态控制的组件称为受控组件。反之亦然。

```js
<input type="text" value={this.state.val} />
```
当我们仅给`input`元素的value设置组件状态，而不设置诸如onChange的handle时，组件被React当做`只读元素 read-only`

```js
<input onChange={this.handleChange} type="text" value={this.state.val} />
```
而当我们设置了onChange来处理绑定后，就会实现了input.value和state.val之间的`双向绑定`。

## CH8 非受控组件DOM操作

> 使用ref特性可以是组件脱离受控状态，称为非受控组件
- ref的作用为将指定虚拟元素挂载到真实DOM树收的元素返回
- 在React的开发中，绝大数常规情况的`this`默认都是(应)指向当前组件的实例！
- 在ref放箭头函数时，表示当前**虚拟元素被挂载到页面中之后**会立即调用此函数，并传入渲染后的DOM元素。

```js
class Sum extends Component {

  handleChange = (e) => {
    let a = parseInt(this.a.value || 0, 0);
    let b = parseInt(this.refs.b.value || 0, 0);
    this.refs.c.value = a + b
  };

  render() {
    return (
      <div onChange={this.handleChange}>
        <input ref={ref => this.a = ref} type="text" />
        +
        <input ref="b" type="text" />
        =
        <input ref="c" type="text" />
      </div>
    );
  }
}
```

## CH9 复合组件

- 父组件在组件属性上值，传递给子组件，子组件再通过`props`传递给孙组件，孙组件用`props`接收。
- 父传子，子传孙
- 父传state给子，子接收state用props，父state变，子props也变，单项改变

```js
export default class Panel extends Component {
  constructor() {
    super();
    this.state = {
      color: 'black'
    };
  }

  render() {
    return (
      <div className="panel panel-default">
        <input className="btn btn-primary" onClick={() => this.setState({ color: 'blue' })} type="button" value="变蓝"></input>
        <input className="btn btn-warning" onClick={() => this.setState({ color: 'orange' })} type="button" value="变橙"></input>
        <PanelHeader color={this.state.color} header={this.props.header}></PanelHeader>
        <PanelBody body={this.props.body}></PanelBody>
        <PanelFooter footer={this.props.footer}></PanelFooter>
      </div>
    );
  };
}
```

## CH10 组件的生命周期函数

### 组件生命周期

一个组件类大多由 `extends Component` 创建。

1. getInitialState
初始化 `this.state` 的值，只在组件状态前调用一次。如果是ES6语法，也可以在构造函数中初始化状态: `constructor(props)`

2. getDefaultProps
只在组件创建时调用一次并缓存返回的对象(即在 `React.createClass` 之后就会调用)。

3. render
组装生成这个组件的HTML结构(使用原生HTML标签或者子组件)，也可以返回null或者false，这时候 ReactDOM.findDOMNode(this)会返回null。

### 装载组件时触发

- componentWillMount
- componentDidMount

### 更新组件时触发

- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate
- componentDidUpdate

### 卸载组件时触发

- componentWillUnmount

> CH10——Demo：点+，每个五次父组件就显示当前计数器，而子组件要等当前计数器被3和5整除再显示一次。

## CH11 百度搜索框

- 实现流程：
  - 给input绑定值改变时间，当值发生改变时调用对应的监听函数
  - 获取到input框中的值，然后调用百度的接口获取数据并修改状态对象中的`words`属性
  - 监听input的onKeyDown事件，分别对向上键、向下键和回车键做处理
  - 做好边界判断
  - 在向下和向下过程中时时修改input的value，input不能变受控组件

## CH12 留言板(上)

```js
<div className="container">
  <div className="row">
    <div className="col-sm-8 col-sm-offset-2">
      <div className="panel panel-default">
        <div className="panel-heading"></div>
        <div className="panel-body"></div>
        <div className="panel-footer"></div>
      </div>
    </div>
  </div>
</div>
```

1. 定义个 容器`container`
2. 来个 行`row`
3. 定义 列 `"col-sm-8 col-sm-offset-2"`，bootstrap里你定义了容器后，它会默认给你两边留白中间显示内容，它的格栅grid固定为12列，当我们定义当前列为`col-sm-8`时，右边还空着4个格栅，所以我们在后面补`col-sm-offset-2`这句，意思就是将列向右2列，这样正好在中间显示了
4. 定义个panel 样式default
5. 分别来`panel-heading`、`panel-body`、`panel-footer`三个部分

## CH13 留言板(下)

- 状态提升
  - 当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 `props` 传递数据或者函数来管理这种依赖或着影响的行为。
