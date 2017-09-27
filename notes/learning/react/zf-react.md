# 珠峰React教程(2017版)

[TOC]

## React基础

----------

## React Router v4

### 初始项目
```bash
creact-react-app router
cd router
touch .gitignore

yarn add react-router-dom
```

### 跑通路由

```js
import React, { Component } from 'react';
import {
  // v4版本后，路由称为“生命式路由”
  HashRouter as Router, // route的容器
  Route // 一条路由
} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  Root = () => {
    return <h1 style={{ color: "red" }}>Root</h1>;
  }
  Home = () => {
    return <h2>Home</h2>;
  };
  User = () => {
    return <h2>User</h2>;
  };
  Profile = () => {
    return <h2>Profile</h2>;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <Router>
            <div>
              <Route path="/" component={this.Root}></Route>
              <Route path="/home" component={this.Home}></Route>
              <Route path="/User" component={this.User}></Route>
              <Route path="/profile" component={this.Profile}></Route>
            </div>
          </Router>
        </div>
      </div>
    );
  }
}
export default App;
```

- `A <Router> may have only one child element`，一个Router只能包含一个元素，拿个div包起来。
- 竟然可以路径的重复后组件堆叠，意思就是前端匹配到x个route后，拿x个route对应的“组件”堆叠显示。

> 感觉Vue和React都是一个套路：每个组件仅能返回一个元素！

----------

## redux