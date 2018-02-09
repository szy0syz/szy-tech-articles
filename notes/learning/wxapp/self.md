# 微信小程序自学笔记

- 程序官方出品，WeUI+Weapp，小项目，很不错。`https://github.com/Tencent/weui-wxss、http://www.runoob.com/w3cnote/weui-for-weixin-web.html`

- `<scroll-view>`标签是个奇葩的存在，你对它设置的任何布局都不生效，有点像开了"天神下凡"的山丘之王~

## 小程序wepy框架笔记

> 哎，感觉怎么路越走越陡啊，直接上这么高大上的框架到底好不好啊。

- 因为wepy精简了四个文件的结构，所以wepy里加载文件时只需要到两层，例如`'pages/hot'`

- 使用`wepy-com-toast`组件

```javascript
// 1. 引入组件
import Toast from 'wepy-com-toast'

// 2. 在components对象中定义组件
components = {
    toast: Toast
}

// 3. 在<template>里为toast留个坑
<toast />

// 4. 在methods对象中定义方法
methods = {
    toast () {
        let promise = this.$invoke('toast', 'show', {
          title: '自定义标题',
          img: 'https://raw.githubusercontent.com/kiinlam/wetoast/master/images/star.png'
        })
        var t = arguments
        promise.then((d) => {
          console.dir(d) //对象：toast的属性，包含title、img等
          console.dir(arguments)
          //哇，内部函数的this竟然被绑定到了外部函数的this上
          console.log(t === arguments)
        })
    }
}

// 5. 最后肯定就是在元素上加事件绑定~
<button @tap="toast" size="mini">第三方组件</button>
```

- 在wepy的page实例就业页面实例，page实例随便用页面跳转，而在components实例就不该用页面跳转。
- 在wepy的component实例中，就不该用onload方法，因为组件的onload方法会在页面onload方法前执行，好坑啊。
- 在wepy程序中，数据放在page的实例中，不要放在组件中。这个真是我自己写业务，写不下去后悟出来的。
- 原来新版wepy的所有请求都默认是回调函数模式，保持和官方的一致，可能是降低难度，但劳资为了一个promise调试了3个多小时，就是没发现这个中间件，我靠。
- 在wepy添加中间件所有请求全部promise化后，await后还得加脏数据处理$apply()或者数据不同步
- 我懂了，每次在异步后都要进行脏数据数据$apply()
- 在promise对象中，resolve(res)并不是return，所以可以在resolve(res)后继续写代码
- 子组件的onload方法要在父页面组件onload方法前执行，好tm费解的机制。
- wepy -> props 也可以用于页面渲染
- wepy中view标签的子元素必须换行规规矩矩的来才正常显示
- navigate元素是块级元素，修改display还不行
- wepy组件要有个顺序，要不然插件还warnning：先template然script后style
- wepy组件中，不要的component、data、onLoad...没有就不要留空，直接别写，否则warnning
- wepy组件中传值，如果是静态的话只能传String，动态的可以选择不同步，单向同步和双向同步
- 父子组件传值方式 `<child :myData='varName'></child>`
- 在await函数后记得`this.$apply()`处理赃数据

- 看看`wepy`实例到底有些啥属性

| name        | x|  y  |
| :----:  | :----:   | :----:  |
| \$copy     |  |        |
| \$createApp        |      |     |
| \$createPage        |        |    |
| \$extend        |        |    |
| \$has        |     |   |

- 没事别在新页面中调用空onLoad钩子函数，否则报错：出现脚本错误或者未正确调用 Page()

### wepy-v2ex-demo笔记

#### 流程

- 流程
  - 首页设hot，实例化`wepy.page`类生成实例对象，然后用封装好的api将数据存page中。注册子组件topicList，通过动态绑定props传递数据进子组件展示数据；
  - 第二页设latest，实例化`wepy.page`类生成实例对象并api调用数据。动态绑定属性到topicList组件展示，同上。
  - 第三页为nodes页，实例化`wepy.page`类生成实例对象并api调用数据存page中。动态绑定属性到nodeList组件展示。同时在page对象上为onReachBottom行为注册事件，并在events中定义函数，如果触发page组件的行为则用`this.$broadcast('getMoreNodes', 100)`广播行为到子组件，注册子组件getMoreNodes事件
- 在nodeList组件中，因为要分段显示数据，而父组件传进来的只绑定在props上，但子组件的onload又先在父组件onload先执行，则只能在子组件中利用watcher监控props里传入的数据，等父组件异步获取到数据，并传进来后执行展示。

### wepy-one 学习笔记
