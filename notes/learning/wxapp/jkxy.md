# [极客学院]微信小程序学习笔记

[TOC]

> 周五晚上接到熟人电话说有小程序外快，价格不菲，表示流口水。但想了下，我竟然还没玩过小程序，根本不知道小程序是个什么鬼，果断加班加点跟进，关键周末和周一还要开X会，哎，又的熬夜了。网上大概找了下，感觉极客学院的小程序教程还不错，根本没时间对比，直接上车了。

## 1.1 微信小程序从基础到实战课程概要

- 快速入门
- 开发进阶
- UI组件的使用
- API的使用
- 项目实战
- 项目部署、上线和维护
- 作业

## 2.1 微信小程序简介

- 什么是微信小程序？

> 小程序是一种不需要下载安装即可使用的应用，他实现了应用“触手可得”的梦想，用户扫一扫或者搜一下即可打开应用。也体现了“用完即走”的理念，用户不用关系是否安装太多应用的问题。应用将无处不在，随时可用，但又无需安装卸载。 ---- 张小龙

- 微信小程序可以做什么？     淘宝、美团、滴滴都可以做；深度依赖系统API的程序则不合适做，例如支付宝、360安全软件等
- 什么互联网产品适合使用微信小程序？ 绝大部分互联网产品都适合做小程序
- 微信小程序会带来哪些变革？

> 刚看了几个小程序源码，感觉好像就是变了花样的html、css、js。而且还将每个页面全部模块化，而且书写格式很像Vue.js嘛，貌似还是看得懂的。我js那么强，还怕啥，妥妥滴。

## 2.2.1 微信小程序开发准备

- 微信开发账号
- 微信开发者工具

## 2.2.2 微信小程序开发工具的使用

- 基本使用
- 代码编辑
- 项目调试
- 项目导入
- 其他

> 项目调试，这貌似就是chrome的F12吧~
  从目前来看，感觉微信小程序就是chromeF12+类vue.js~

## 2.2.3 目录结构详解

- 项目配置
  - 每个页面中`.json`和`.wxss`文件并不是必须的；
  - 每个页面中`.wxml`和`.js`文件才是必须的；
  - 说实话`.wxss`就是对应`.css`，`.wxml`对应`.html`，那完全可以把微信小程序看作网页了
  - 每个页面中`.wxml`和`.js`两个文件完成页面的渲染工作
  - 层级关系：子级定义的可以覆盖父级定义的
  - 使用`require()`动态加载模块
  - 在根目录`app.json`，整个项目基本配置：页面路由定义、全局基本样式等
- 项目入口
  - 项目入口为根目录下`app.js`，在其内容中，初始化项目全等于执行`App()`，我们可以把config提出来单独写，然后执行时传参
- 项目页面
  - 项目的每个页面中，初始化用`Page()`函数，同样可以把config单独提出来写

```js
App({
  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    console.log("onLaunch...")
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    console.log("切换到前台...")
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    console.log("后台运行中...")
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    console.log(msg)
  }
})
```

> 从目前来看，腾讯为我们定义了很多生命周期函数和事件行为，只需要我们逐一绑定就行。

## 2.3.1 视图与渲染

- 组件的基本使用
  - 基本一样
- 数据绑定
  - `.js`的`data{}`对象
- 渲染标签
  - 列表渲染：`wx:for` `block wx:for` `wx:key` 
  - 条件渲染：`wx:if` `block wx:if`
- 模板的使用

```javascript
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
```

-  在页面的函数里，this为当前页面对象，其原型链：pageObj -> eventObj -> Object

## 2.3.2 微信小程序事件

- 什么是事件
  - 一种用户行为
  - 一种通讯方式
- 事件类别
  - 点击事件 tap --> [属于冒泡事件]
  - 长按事件 longtap --> [属于冒泡事件]
  - 触摸事件 touchstart、touchend(正常结束触摸)、touchmove、touchcancel(打断触摸) --> [属于冒泡事件]
  - 其他 submit、input...  --> [属于非冒泡事件]
  - 事件冒泡：冒泡事件和非冒泡事件
- 事件绑定
  - bind绑定：带冒泡机制的绑定
  - catch绑定：不带冒泡机制的绑定
- 事件对象详解
  - 类型 type
  - 时间戳 timeStamp
  - 事件源组件 target (就算在冒泡阶段，此属性仍然会指向原来的事件源)
  - 当前组件 currentTarget (在冒泡执行阶段，此属性会变为冒泡执行到的组件)
  - 触摸点数 touches

## 2.4 综合案例 - 快递查询

- 产品需求
- 准备
- 编码实战

```bash
/442408775253/
╭─jerry@JerrydeiMac  ~  ‹master*›
╰─$ curl -i -k --get --include 'https://ali-deliver.showapi.com/showapi_expInfo?com=zhongtong&nu=444669873836'  -H 'Authorization:APPCODE 1e37be95b6254fd184067e20b87d1381'
HTTP/1.1 200 OK
Server: Tengine
Date: Sat, 08 Jul 2017 06:46:47 GMT
Content-Type: application/json;charset=utf-8
Content-Length: 1697
Connection: keep-alive
Vary: Accept-Encoding
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With
Access-Control-Max-Age: 172800
X-Ca-Request-Id: 1F5A9B6E-265D-4029-BFDE-1926F6557B67
Access-Control-Allow-Credentials: true

{"showapi_res_code":0,"showapi_res_error":"","showapi_res_body":{"mailNo":"444669873836","update":1499496407144,"updateStr":"2017-07-08 14:46:47","ret_code":0,"flag":true,"dataSize":11,"status":4,"tel":"021-39777777","expSpellName":"zhongtong","data":[{"time":"2017-07-06 10:50:26","context":"[昆明月牙塘二部] [昆明市] [昆明月牙塘二部]的派件已签收 感谢使用中通快递,期待再次为您服务!"},{"time":"2017-07-06 08:08:35","context":"[昆明月牙塘二部] [昆明市] [昆明月牙塘二部]的皮国金正在第1次派件 电话:18206766125 请保持电话畅通、耐心等待"},{"time":"2017-07-06 08:06:14","context":"[昆明月牙塘二部] [昆明市] 快件到达 [昆明月牙塘二部]"},{"time":"2017-07-06 07:45:34","context":"[昆明月牙塘] [昆明市] 快件离开 [昆明月牙塘]已发往[昆明月牙塘二部]"},{"time":"2017-07-06 07:24:57","context":"[昆明月牙塘] [昆明市] 快件到达 [昆明月牙塘]"},{"time":"2017-07-06 02:55:31","context":"[昆明中转] [昆明市] 快件离开 [昆明中转]已发往[昆明月牙塘]"},{"time":"2017-07-06 02:32:16","context":"[昆明中转] [昆明市] 快件到达 [昆明中转]"},{"time":"2017-07-05 00:24:28","context":"[深圳中心] [深圳市] 快件离开 [深圳中心]已发往[昆明中转]"},{"time":"2017-07-05 00:22:52","context":"[深圳中心] [深圳市] 快件到达 [深圳中心]"},{"time":"2017-07-04 22:22:43","context":"[深圳龙华] [深圳市] 快件离开 [深圳龙华]已发往[昆明]"},{"time":"2017-07-04 20:21:17","context":"[深圳龙华] [深圳市] [深圳龙华]的大浪无线网络科技已收件 电话:18138812078"}],"expTextName":"中通快递"}}%
```
- 阿里云市场：[全国快递物流查询]返回的对象结构图
![image.png-36.3kB][1]

## 3.1 微信小程序的配置详情


## 3.2.1 微信小程序的生命周期与app对象的使用

- app的页面配置
- app的窗口配置
- app的tabBar配置
  - `pages`和`tabBar`路径要配对，否则不显示 
- 网络超时配置及debug开启配置
- 页面配置
  - 在页面文件夹下新建的`.json`和`.wxss`会覆盖全局的`app.json`和`app.wxss`配置

## 3.2.2 微信小程序页面的生命周期和参数传递



## 3.3 综合案例 - 用户登录



## 4.1 微信小程序的UI精讲



## 4.2.1 布局基础



## 4.2.2 样式基础



## 4.3.1 组件的使用



## 4.3.2 视图容器组件



## 4.3.3 基础内容组件



## 4.3.4表单组件





  [1]: http://static.zybuluo.com/szy0syz/6bfjlbsej8g60s6efq5qyfmr/image.png
  
  
  