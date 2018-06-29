# Webpack3 成神之路

Webpack3 成神之路
我是有多喜欢webpack，学几道都不够！

## 第1章: 认识Webpack

### 认识webpack和安装

> 不推荐全局安装webpack。

### 让你快速上手一个Demo

cli方式使用webpack：

- 命令行 `weboack entery.js bundle.js`


可以使用npm包`live-server`把目录加载起来。



## 第2章：插件与配置

配置文件webpack.config.js的基本结构

- entry选项(入口配置)
- output选项(出口配置)
- 多入口、多出口配置

```js
module.exports = {
  entry: {
    entry: './src/entery.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // 模块对象：打包css、转换图片等
  module: {},
  // 插件必须是数组
  plugins: [],
  devServer: {}
}
```

多入口、多出口配置：

```js
module.exports = {
  entry: {
    entry: './src/entry.js',
    entry2: './src/entry2.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
```

### 服务和热更新

```js
// webpack.config.js
devServer: {
    //监听内容的绝对路径
    contentBase: path.resolve(__dirname, 'dist'),
    host: '127.0.0.1',
    compress: true,
    port: 8044
  }

//package.json
"scripts": {
    "server": "webpack-dev-server"
  }
```
