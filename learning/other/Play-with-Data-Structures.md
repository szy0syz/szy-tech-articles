# 玩转数据结构 从入门到进阶

    手把手从底层实现数据结构，层层深入，帮你提升编程内功（练习代码）

## 第1章 导学

### 1-1 欢迎学习《玩转数据结构》

* 数据结构是所有计算机专业的同学必学的课程
* 数据结构研究的是数据如何在计算机中进行组织和存储，使得我们可以高效的获取或者修改数据

数据结构一般分类三类：

* 线性结构
  * 数据
  * 栈
  * 队列
  * 链表
  * 哈希表
  * ...
* 树结构
  * 二叉树
  * 二分搜索树
  * AVL
  * 红黑树
  * Treap
  * Splay
  * 堆
  * Trie
  * 线段树
  * K-D树
  * 并查集
  * 哈夫曼树
  * ...
* 图结构
  * 临接矩阵
  * 邻接表

数据结构 + 算法 = 程序

课程主要包含12种数据结构：数组、栈、队列、链表、二叉搜索树、堆、并查集、AVL、线段树、红黑树、Trie、哈希表（前6个非常重要）

### 1-2 学习数据结构到底有没有用

学上数据结构可以大大提高计算机技术的上限，如果想走得更远，数据结构将是不可或缺的一门学科。

## 第2章 不要小看数组

### 2.2 二次封装属于自己的数组

数组基础

* 数组组大的有点：快速查询
* 数组最好应用于“索引有语意”的情况
* 但并非所有有语意的索引都适用于数组
  * 例如身份证号码：53332198808088888
  * 首先拿身份证号码做索引会开辟很大的内存空间，造成内存浪费
  * 其次这个整数是在太大了
* 数组也可以处理“索引没有语意”的情况
* 我们这一章节，主要处理“索引没有语意”的勤快数组的使用

制作属于我们自己的数组类

* 索引没有语意，如果表示没有元素？
* 如何添加元素？如何删除元素？
* 基于java的数组，二次分装属于我们自己的数组

> 原则上可以把增删改查的操作，视为研究数据结构的脉络。

* class Array
  * data 存数据
  * capacity
  * size 初始为0，指向最后一个没有存放元素的索引

### 拓展：JavaScript实现ES6

我有这么一个奇葩的需求：我想在Array里写的代码热更新，且支持ES6/7特性。

我们先安装webback `npm i webpack webpack-cli --save-dev`

再配置webpack的配置文件

```js
//add webapck.dev.config.js file
module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  }
}
```

增加package.json命令

```bash
# package.json
"dev": "webpack --config ./webpack.dev.config.js --mode development"
```

但是现在不支持热更新嘛，继续加：`npm i webpack-dev-server html-webpack-plugin -D`

再次修改webpack配置文件

```js
// webapck.dev.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, './release'), // 设置根目录
    open: true,  // 自动打开浏览器
    port: 9000
  }
}
```

修改启动命令 `"dev": "webpack-dev-server --config ./webpack.dev.config.js --mode development"`

### 2-3 向数组中添加元素

```js
const DArray = (function () {
  let _data = Symbol('data')
  let _size = Symbol('size')

  class DArray {
    constructor(capacity = 10) {
      this[_data] = new Array(capacity)
      this[_size] = 0
    }

    getCapacity() {
      return this[_data].length
    }

    getSize() {
      return this[_size]
    }

    isEmpty() {
      return this[_size] === 0
    }

    addLast(e) {
      this.add(this[_size], e)
    }

    addFirst(e) {
      this.add(0, e)
    }

    add(index, e) {
      let data = this[_data]
      // 只能引用类型保存地址，值类型不能转存
      // let size = this[_size]

      if (this[_size] === data.length) {
        throw new Error('Add failed. Array is full.')
      }
      if (index < 0 || index > this[_size]) {
        console.log(this[_size], index)
        throw new Error('Add failed. Require index >=0 and index <= size.')
      }
      // 一次把index索引后的元素后移
      for (let i = this[_size] - 1; i >= index; i--) {
        data[i + 1] = data[i]
      }

      data[index] = e
      this[_size]++
    }
  }

  return DArray
})()

export default DArray
```