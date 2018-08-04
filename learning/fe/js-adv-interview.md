# 揭秘一线互联网企业 前端JavaScript高级面试

> BAT工程师讲解前端JS高级面试考点：虚拟DOM、Vue、React、Hybrid实现原理

## 第2章 ES6 语法

ES6模块化如何使用，开发环境如何打包

* 模块化的基本语法
* 开发环境配置
* 关于JS众多模块化标准

```js
// export 语法

/* util1.js */
// 默认输出一个
export default {
    a: 100
}

/* util2.js */
export function fn1() {
    alert('fn1')
}
export function fn2() {
    alert('fn2')
}

/* index.js */
import util1 from './util1.js'
import { fn1, fn2 } from './util2.js'

console.log(util1)
fn1()
fn2()
```

开发环境 babel

* `npm i -D babel-core babel-preset-es2015 babel-preset-latest`
* add file `.babelrc`
* `npm i -g babel-cli`
* `babel -v`

开发环境 webpack

* `npm i webpack babel-loader -S`
* 配置 `webpack.config.js`
* 配置 `package` 中 `script`

开发环境 rollup

* 其优势在于只打包js代码，rollup更专业，它还能优化一点点js冗余代码
* `npm init`
* `npm i rollup rollup-plugin-node-resolve rollup-plugin-babel babel-plugin-external-helpers babel-preset-latest -D`
* add file `.babelrc`
* 配置 rollup.config.js
* 将webpack环境的js代码直接拷贝过来
* 修改 `package` 中 `script`
* rollup功能单一，webpack功能强大
* 工具要尽量功能单一，可集成，可扩展

### 关于JS众多模块化标准

* 没有模块化
* AMD 成为标准， require.js (也有 CMD)
* 前端打包工具，是nodejs模块化可以被使用
* ES6出现，想统一出现在所有模块化标准
* nodejs积极支持，浏览器尚未统一
* 你可以自造lib，但不是要自造标准！！！

ES6模块化如何使用，开发环境如何打包

* 语法：import export
* 环境：babel编译ES6语法，模块化可用webpack和rollup
* 扩展：说下自己对模块化标准统一的期待