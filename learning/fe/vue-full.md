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
* 此时在webpack流程中，我们先用es-lint检测.vue.js.jsx文件，检测出错后就不能再继续进行下一步的loader编译，故我们需要进行强制预处理，即配置`enforce:: 'pre'`

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

### 2.5 Webpack4升级

## 第3章 Vue核心知识

### 3.1 vue核心讲解单独配置

* 新建`webpack.config.practice.js`
* 其中只要if里dev环境配置不需要prod的
* 覆盖base中的entry，重新指定入口点
* 在resolve中指定alias: `'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')`，这条命令的意思是在代码中使用`import Vue from 'vue'`重定向到`vue.esm.js`文件。这是因为Vue为我们提供不同环境的支持，默认import的vue都是加了runtime的vue，在开发环境是`vue.runtime.esm.js`。加了runtime和不加runtime的区别就是我们可以在Vue根节点对象里使用`template`。
* package.json新建命令``
* 在webpack的plugins时，可以添加htmlPlugin使用模板来初始化Vue的根节点

### 3.2 Vue实例

#### Vue实例的属性

* 修改data的几种方式
  * `app.counter = 111`
  * `app.$data.counter = 222`
  * `app.$options.data().counter = 333`
* `app.$el` 获取Vue挂在的dom根节点
* `app.$children` 获取所有子组件
* `app.$root === app` 在所有子组件中都可以this.$root获取vue的app实例
* `app.$refs` 全局所有引用的dom节点都存这里
* `app.$isServer` 是否启用服务端渲染
* `app.$options.render` 下一次轮询执行的渲染

```js
app.$options.render = h => {
  return h('span', {}, 'new jerry ssssss')
}
```

#### Vue实例的方法

* `app.$on('test', (a, b)=> {})` 和 `app.$emit('test', 11, 22)`
* `app.$forceUpdate()` 强制刷新
* `app.$set()`
* `app.$nextTick()`

  每一个Vue组件都是一个Vue的实例

### 3.3 Vue的生命周期方法

如果开启服务端渲染SSR，`beforeMount`和`mounted`是不会被调用的。

* `renderError(h, e) { return h('div', {}, e.stack) }` 在调试中，当调用实例redner方式报错时，可以自定义错误显示
* `errorCaptured () {}` 在生产环境冒泡方式报错

### 3.5 Vue的watch和computed

computed：有缓存、默认只有get没set

```js
watch: {
  obj.a: {
    handler() {
      console.log('obk.a changed.')
    },
    immediate: true,
    deep: true // 深入遍历对象的每个属性，否者watch不到
  }
}
```

* 不能在computed和watch中修改所依赖的变量。computed里不能做任何值的修改，可能导致循环依赖。

### 3.6 Vue的原生指令

* `v-text`：操作类似dom.innerHtml
* 在使用`v-for`时，需要加个key，vue希望这个key是在该循环数组中是唯一的，因为该列数据是经常会变化的，Vue就需要重新渲染这个行表后放回dom中去，这也性能开销就会比较大，然后我们放入唯一值到key中去后，当该行数据变化时，vue会从缓存经过key拿到对象后就仅去修改这一行的虚拟节点，就不需要生成新的dom节点，这样就可以复用dom节省性能开销。
* `v-model`默认只用在表单节点。`v-model.number` `v-model.trim` `v-model.lazy`
* `v-pre` 不解析差值表达式
* `v-cloak` 有了webpack应用场景很少
* `v-once` 只渲染一次，使用于静态文本渲染，节省开销，不做响应式绑定

```html
<div>
  <input type="checkbox" :value="1" v-model="arr" />
  <input type="checkbox" :value="2" v-model="arr" />
  <input type="checkbox" :value="3" v-model="arr" />
</div>

<script>
  data: {
    arr: [2, 3] // 多选框组 + 数组的绑定
  }
</script>
```

### 3.7 Vue的组件定义

Vue官方组件命名规则

```js
const component = {
  template: `<div>this is component one`
}

Vue.component('CompOne', component)

new Vue({
  el: '#root',
  template: `<comp-one></comp-one>`
})
```

* 正常情况下子组件没不应该去改父组件传进来的props，正确的行为应该是子组件emit事件把值传递出去，由父组件根据实际情况落实是不是需要改。
* props 应该使用单向数据流
* 在子组件上ref时，可以拿到这个子组件的vue实例

### 3.8 Vue的组件继承

```js
const Component = { ... }
// 方式一
const CompVue = Vue.extend(component)

new CompVue({
  el: '#root',
  propsData: {
    propOne: 'jerry' // 可以向父类pros传值
  },
  data: {
    text: 'dd2222' // 可以覆盖父类的data
  },
  mounted() {
    console.log('CompVue mounted') // 先调用父类，再调用子类生命周期函数
  }
})

///// 方法二
const component2 = {
  extends: Component,
  data() {
    return {
      text: 1111
    }
  }
}
```

* Vue中extends的应用场景：项目中先写了一个组件，此组件配置项复杂，且需要在不同页面复用，且每次还需配置默认配置项，此时则可以使用extends再封装一道，把不懂需求的配置封装成组件，每次使用直接启用即可。

* `this.$parent`获取父组件的引用，也可以修改父组件属性。只能在`new Vue()`实例时指定该实例的`parnet`，在子组件中无论怎么修改最终Vue也会在渲染时该成其当前上下文为parent。一定避免在子组件中修改父子间的属性！

### 3.9 Vue组件之自定义双向绑定

    v-model的双向绑定

Vue中爷爷和孙子组件传值还可以用`provide` + `inject`模式

### 3.11 Vue的render function

`template -转换-> render function`

我们在Vue中写template时，其实在内部Vue会将我们的template转换成render函数，这样在可以在有数据变化时调用render函数渲染即可。我们在了解template如何转换成render后，在写template就会具体知道为什么某处为什么编译不通过、如何书写紧凑的template。

我们还知道了原来Vue通过vue-loader将teplate转换成render函数，然后生成树形结构的vnode，最后如果vnode数据发生改变时，在nextTick调用render渲染。

在了解了template原理后，我们会更深入的了解Vue执行原理，在遇到一些问题时，就会用一些更合理的逻辑思维去思考这个问题，发生template本质问题所在，导致了调用createElement传参出现问题。

## 第4章 Vue-Router和Vuex

### 4-1 Vue-Router初始配置

1. add `router.js` export一个实例化的路由对象
2. add `routes.js` export具体路由配置
3. `new Vue({ router })`
4. page中即可使用 `<router-view />`

### 4-2 Vue-Router之配置

webapck-devServer中增加配置，为了方便前端调试。

```js
historyApiFallback: {
  index: '/index.html'
}
```

```js
export default () => {
  return new Router({
    routes,
    mode: 'history', // 路由模式为非hash路由,
    // base: '/base/' // 统一加前缀域名
    // linkActiveClass: 'active-link', // 只要包含就算匹配就加class
    // linkExactActiveClass: 'exact-link' // 必须精确匹配后才加class
    // scrollBehavior(to, from, savePosition) {
    //   // 页面跳转时，是否接受滚动数值的记录
    //   // 三个参数都是对象！
    //   // console.dir(arguments)
    //   // if (savePosition) {
    //   //   return savePosition
    //   // } else {
    //   //   return { x: 0, y: 0 }
    //   // }
    // }
    // parseQuery(query) {  // 拿参数
    //   console.log(query)
    //   return ''
    // },
    // stringifyQuery(obj) { // 拿参数，对象格式
    //   console.dir(obj)
    //   return ''
    // }
    // fallback: true // 自动识别开启history模式，失败就hash模式
  })
}
```

### 4-3 Vue-Router之路由参数传递

```js
{
  path: '/app/:qid',
  props: true, // 路由解耦
  component: Todo,
  name: 'app',
  meta: {
    title: 'this is app',
    description: 'app desc'
  },
  // children: [ // 嵌套路由，需要放在Todo组件中<router-view></router-view>
  //   {
  //     path: '/cc1',
  //     component: Login
  //   }
  // ]
}
```

### 4-4 Vue-Router之导航守卫

在Vue-router前端路由，参数可以配置replace，表示不在history记录中，这样返回时就跳过此条记录。

路由钩子的三种使用方式：

* 全局钩子
  * `router.beforeEach`
  * `router.beforeResolve`
  * `router.afterEach`
* 路由配置内的钩子
  * `beforeEnter`
* 组件内的路由钩子，前两个钩子是无法拿到组件this对象，但我们可以在next(vm=> { vm.name = 'eeee' })的回调拿到创建后的this对象。
  * `beforeRouteEnter`
  * `beforeRouteUpdate` 应用于`/detail/2291` 和 `detail/2982` 切换时触发
  * `beforeRouteLeave`

#### Vue-Router和webpack实现异步组件

实现步骤：

1. `npm i babel-plugin-syntax-dynamic-import -D` 引入babel插件编译动态引入
2. 修改`.babelrc`配置引入此插件
3. 在项目上删除原先对需要动态加载组件的import
4. 在配置路由时，修改`component: () => import(../views/todo/todo.vue)`

### 4-5 Vuex之集成

在使用vuex中必须每次都返回一个新router对象和store对象，否则在SSR时会产生内存溢出！

```js
// index.js
import Vuex from 'vuex'
Vue.use(Vuex)
import createStore from './store/store'
const store = createStore()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount(root)
///////////////////////////
// store
export default () => {
  return new Vuex.Store({
    state: {
      count: 0
    },
    mutations: {
      updateCount(state, num) {
        state.count = num
      }
    }
  })
}
```

### 4-6 Vuex之state和getters

我们可以简单地理解getter就是一个computed

对于那些为定稿的ES6语法，需使用`npm i babel-preset-stage-1 -D`的插件来编译

`...mapState(['count'])`用与store-state中变量名不需要自定义名

`...mapState({counter: 'count'})`用于store-state中变量名需自定义名

```js
computed: {
    // ...mapState(['count']),
    ...mapState({
      counter: (state) => state.count
    }),
    // count() {
    //   return this.$store.state.count
    // },
    ...mapGetters(['fullName']),
    // fullName() {
    //   console.log(this.$store.getters)
    //   return this.$store.getters.fullName
    // }
  }
```

### 4-7 Vuex之mutation和action

* 在mutation中只能传递两个参数，第二个参数可以是对象，但是不能传第三个参数。即`updateCount(state, payload)`

* Vuex官方推荐所有state的修改都需要放在mutation中
* 可以在构建Vue实例是传入`strict: true`研究在$store属性上修改state，但此选项仅在开发环境中限制开发人员规范来用
* 在开发过程中，mutation中是不能包含异步的代码，mutation中必须全是同步代码，所以我们只能将异步的代码写在action中
* 一般后端数据请求将代码写在actions中，而简单的数据变化则用mutation

### 4-8 Vuex之modules

```js
export default () => {
  return new Vuex.Store({
    state: defaultState,
    mutations,
    getters,
    actions,
    modules: {
      planA: {
        namespaced: true, // 强制启用命名空间 调用时a/title
        state: {
          title: 'planAAA',
          counter: 0
        }
      },
      planB: {
        state: {
          title: 'planBBBB',
          value: 99
        },
        mutations: {
          updateBVal(state, val) {
            console.log('mutations-updateVal:', state.value)
            state.value = val
          }
        }
      }
    }
  })
}
```

* `modules`启用模块
* 在modules下的getters的第三个参数可以拿个rootState
* modules子模块可以调用全局rootVuex的mutation等

#### 动态注册Vuex模块

```js
store.registerModule('c', {
  state: {
    val: 94
  }
})
```

#### 为Vuex加上热更替功能

1. 修改store.js导出store的方式
2. 判断module.hot
3. 如果有，就使用hot.accept监控各个路径文件
4. 发送变化就重新再次加载文件后用hotUpdate注册新模块

### 4-9 Vuex的API和配置

* `store.watch()`
* `store.subscribeAction((mutation, state) => { mutation.type, mutation.payload })` 坚守flux设计模式
* Vuex-plugin

## 第5章 服务器渲染

### 5-1 开发时服务端渲染的配置和原理

* `VueServerPlugin`此插件安装后，项目整体打包就不再会有JavaScript文件输出，它仅会输出JSON文件

### 5-2 使用koa实现node server

### 5-3 服务端渲染的entry配置

## 第6章 高级组件开发

## 第7章 项目开发

## 第8章 部署和总结

  [1]: https://www.imooc.com/learn/935
