# React全家桶+Epxress+MongoDB开发招聘APP

## 第3张：React基础知识

### React是什么

- 帮助你构建UI的库
  - Facebook出品，专注View层
  - 一切皆为组件
  - 全部使用ES6语法

### 组件之间传递数据

- 组件之间用props传递数据
  - 使用`<组件 key="val">`形式传递
  - 组件里使用this.props获取值
  - 如果组件只有render函数，还可以用函数的形式写组件

### 组件内部state

- 组件内部通过state管理状态
  - JSX本质是JS，所以直接数据`.map`渲染列表
  - Constructor设置初始状态，记得执行super(props)
  - 如State就是一个不可变的对象，使用this.state获取

### 事件

- JSX里，onClick={this.函数名}来绑定事件
- this引用的问题，需要在构造函数里用bind绑定this
- this.setState修改state，记得必须返回新的state，而不是修改

### 生命周期

- React组件有若干钩子函数，在组件不同的状态执行
  - 初始化周期
  - 组件重新渲染生命周期
  - 组件卸载生命周期

![image.png-143.5kB][1]
![image.png-816kB][2]
![image.png-245.9kB][3]

### antd-mobile

按序加载：

- `yarn add antd-mobile`
- `yarn run eject`
- `yarn add babel-plugin-import --dev`
- 在package.json中新增`"plugs":"["import", { "libraryName": "antd-mobile", "style": "css" }],`
- 之后就不需要单独引入某个组件的css样式

## 第4章：Redux状态管理与React-router

专注于状态管理的库

- Redux专注于状态管理，和react解耦
- 单一状态，单向数据流
- 核心概念：store、state、action、reducer

使用react-redux

- Provier组件在应用最外层，传入store即可，只用一次
- Connect负责从从外部获取组件需要的参数
- Connect可以用装饰器的方式来写

使用装饰器优化connect代码

- `npm run eject` 弹出个性配置
- `npm i babel-pulgin-transform-decorators-legacy -D`插件
- package.json里babel加上plugins配置
- @connect(参数1, 参数2)
  - 参数1: 你要state的什么属性放到props里
  - 参数2: 你要什么方法放到props里，会自动dispatch

React-4outer4

- 核心概念：动态路由、Route、Link、Switch
- Router4使用react-router-dom
- Switch只渲染命中的一个路由

![image.png-368.3kB][4]

## 第5章：需求分析

![image.png-76.3kB][5]

### 前后端连调

- 如何发送，端口不一致，使用proxy配置转发
  - `package.json`中新增键值对 `"proxy": "http://localhost:9093"`
- asios拦截器，统一loading处理
- redux里使用异步数据，渲染页面

### axios拦截器

- 拦截请求：`axios.interceptors.request.use(fun=>)`
- 拦截响应：`axios.interceptors.response.use(fun=>)`

## 第6章：登录与注册

页面文件结构，骨架结构的实现

  - 组件放在Component文件夹下
  - 页面放在Container文件夹下
  - 页面入口处获取用户信息，决定跳转到哪个页面

开发模式

- 基于cookie验证用户
  - epxress依赖cookie-parser
  - cookie类似一张身份卡，登录后服务器返回，你带着cookie就可以访问受限资源
  - 页cookie的管理浏览器会自动c

![image.png-54.1kB][6]

## 第7章：

当想把一个对象中某个属性剔除后生产新对象，可以使用结构和展开运算符

```javascript
const { pwd, ...user } = data
```

![image.png-23.8kB][7]


  [1]: http://static.zybuluo.com/szy0syz/wojlnmcp2la4uxv0xe35juec/image.png
  [2]: http://static.zybuluo.com/szy0syz/3a1slmbmhcvnwing382lmxg6/image.png
  [3]: http://static.zybuluo.com/szy0syz/qsypkctj5nxokbgzsibddtgy/image.png
  [4]: http://static.zybuluo.com/szy0syz/qj84ur9i8gy9wazzbc1ekyot/image.png
  [5]: http://static.zybuluo.com/szy0syz/34p3ka7shlkx3y19656zvk6x/image.png
  [6]: http://static.zybuluo.com/szy0syz/p1kbyo53dardei7zopsappyj/image.png
  [7]: http://static.zybuluo.com/szy0syz/9j3vhzyn1tdbrkn5i3m4wksg/image.png
