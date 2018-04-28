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

### 2.3 css module配置

```js
cssModules:
{
  localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
  camelCase: true
 }
```

使用方法

* vue文件style标签scoped更换成module
* template标签里的样式类名替换成`:class="$style.mainHeader"`
* 原理：相当于在xx.vue文件增加计算字段 `computed: {$style() { return { mainHeader: '[path]-[name]-[hash:base64:5]' } }}`

### 2.4 安装使用eslint和editorconfig以及precommit

eslint的好处：

1. 校验代码。如防止出现低级语法错误
2. 定义项目代码规范。团队协作时，规范代码书写，成员互看时，提高阅读效率
3. 保障代码质量

* `npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node -D`
* `touch .eslintrc`

```json
{
  "extends": "standard",
  "plugins": [
    "html"
  ]
}
```

* 为了识别.vue文件(非纯js，类似html文件)，故需要安装`npm i eslint-plugin-html -D`，需要使用该插件识别.vue中的js代码规范
* 修改`package.json` -- `script`中添加 `"lint": "eslint --ext .jsx --ext .vue client/"`。新建完后自行命令就可以检测出来错误提示
* 修改`package.json` -- `script`中添加 `"lint-fix": "eslint --fix --ext .jsx --ext .vue client/"`。新建完成后自行命令即可全部修复错误

为了每次保存代码时都进行eslint检测，我们需要安装`eslint-loader babel-eslint -D`，修改配置 

* `.eslintrc` `{"parser": "babel-eslint"}`，为什么要指定parser呢？因为我们项目基于webpack开发，代码都需要通过babel转换成ES5的，在babel处理时和eslint有不同，所以我们还需指定babel-eslint作为转换器
* 接下来需要在webpack中配置eslint。只需在base里配置，因为dev和prod都需要。新增module-rules
* 此时在webpack流程中，我们先用es-lint检测.vue.js.jsx文件，检测出错后就不能再继续进行下一步的loader编译，故我们需要进行强制预处理，即配置`enforce:: 'pre' `

```js
{
  test: /\.(vue|js|jsx)$/,
  loader: 'eslint-loader',
  exclude: /node_modules/,
  enforce:: 'pre' 
}
```

`.editorconfig`，规范编辑器配置，其可以在不同的IDE编辑器中生成相同的配置。vscode需要安装 `Editorconfig for VS Code` 插件

```js
root = true // 读.editorconfig文件仅读到当前目录不再往上层读取

[*]
charset = utf-8
end_of_line = lf // windows 'cslf'
indent_size = 2 // tab size
indent_style = space
insert_final_newline = true // 尾行加空行
trim_trailling_whitespace = true // 代码结束不能有空格
```

场景：在项目开发中需要多个协同开发，我们需要一个工具在我们git commit时触发git hook，从而进行eslint代码检测，如果检测不通过就不允许将代码发布的远程仓库中，这样就可以让代码出现问题仅在本地出错，不把错误代码共享给别人。 注意先初始化好git再安装，要不然生成不了hook。

* `npm i husky -D`首先安装 哈士奇
* 安装husky后，它会自动帮我们在.git生成一个hook钩子
* 在package.json 中配置`precommit: "npm run lint-fix"`，这样huksy就会自动读取改命令

## 第3章 Vue核心知识




## 第4章 Vue-Router和Vuex




## 第5章 服务器渲染




## 第6章 高级组件开发




## 第7章 项目开发




## 第8章 部署和总结





  [1]: https://www.imooc.com/learn/935
