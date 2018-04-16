# Vue核心技术 Vue+Vue-Router+Vuex+SSR实战精讲

[TOC]

## 第1章 课程介绍

课程基于【[Vue+Webpack打造todo应用][1]】升级实战

## 第2章 Vue+Webpack的前端工程工作流搭建

### 2.1 项目webpack重构升级

升级项目结构，适应项目迅速扩展。

首先把webapack的配置文件统一放入一个单独文件夹中`/build/webpack.config.base.js`，把所有webpack配置中都要用到的配置项放入此文件，开发环境和生产环境都会用到。注意config.base.js文件里只放公用的webpack配置项。

* 从根目录复制webpack.config.js到base中，删除判断环境那部分代码和plugins代码
* 使用`webpack-merge`插件合并公共项配置，webpack-merge比Object.assign聪明多了
* 新建`webpack.config.clinet.js`意为服务端渲染的webpack
* `url-loader`静态资源打包文件`name: 'resources/[path][name].[hash:8].[ext]'`静态资源全部打包到resources文件夹

### 2.2 vue-loader配置

1. create `build/vue-loader.confg.js`，根据开发和生产环境返回配置项
2. `preserveWhitespace: false` 忽略vue文件template模板中对空格的页面渲染
3. `extractCSS: true` 忽略vue文件中style样式提取到统一style文件去加载
4. 实现css热更新，`npm i -D vue-style-loader` 安装vue文件专用style-loader，替换`webpack.config.client.js`的module-rules中的`style-loader`为`vue-style-loader`
5. 更新配置
6. 安装`rimraf`，新增`package.json`文件中scripts: `"clean": "runraf dist"`


## 第3章 Vue核心知识




## 第4章 Vue-Router和Vuex




## 第5章 服务器渲染




## 第6章 高级组件开发




## 第7章 项目开发




## 第8章 部署和总结





  [1]: https://www.imooc.com/learn/935
