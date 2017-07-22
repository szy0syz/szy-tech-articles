# 微信小程序自学笔记

- 程序官方出品，WeUI+Weapp，小项目，很不错。https://github.com/Tencent/weui-wxss、http://www.runoob.com/w3cnote/weui-for-weixin-web.html

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

- 看看`wepy`实例到底有些啥属性

| name        | x|  y  |
| :----:  | :----:   | :----:  |
| \$copy     |  |        |
| \$createApp        |      |     |
| \$createPage        |        |    |
| \$extend        |        |    |
| \$has        |     |   |


### wepy-one demo学习笔记

