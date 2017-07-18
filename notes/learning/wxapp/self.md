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
```
