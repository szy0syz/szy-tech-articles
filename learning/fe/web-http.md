# HTTP协议原理实践

    https://coding.imooc.com/class/225.html

## 第2章 HTTP协议基础及发展历史

### 2-1 5层网络模型介绍

![5layer](http://cdn.jerryshi.com/note/2018/internet-5layers.png)

* 物理层主要作用是定义物理设备如何传输数据
* 数据链路层在通信的实体间建立数据链路连接
* 网络层为数据再借点之间传输创建逻辑链路

传输层

* 向用户挺可靠的端到端(End-to-End)服务
* 传输层向高层屏蔽了下层数据通信的细节

应用层

* 为应用软件提供了很多服务
* 构建与TCP协议之上
* 屏蔽网络传输相关细节

### 2-2 HTTP协议的发展历史

HTTP/0.9

* 只有一个命令GET
* 没有HEADER等描述数据的信息
* 服务器发送完毕，就关闭TCP连接
* 一个TCP连接对应的是多个HTTP请求，一个HTTP请求肯定是在某一个TCP连接中发送

    在http/1.1中，我们可以在一个TCP协议管道中发送多个HTTP请求，而且在http/2中还将继续在此方面优化。

HTTP/1.0

* 增加了很多命令
* 增加 `status code` 和 `header`
* 多字符集支持、多部分发送、权限、缓存等

HTTP/1.1

* 持久连接。在HTTP/1.0版本里，一个HTTP请求就需要在客户端与服务端之间创建一个TCP连接，创建后在服务端返回完内容后整个TCP链接就关闭，这个成本很高。
* pipeline。我们可以在客户端同一个链接中送多个请求，服务器可以根据多个请求作响应
* 增加host和其他一些命令

HTTP/2

* 所有数据都以二进制传输(http/1.1中是以字符串传输，http/2中都将以“帧”传输)
* 同一个链接里面发送多个请求不再需要按顺序来响应，异步响应
* 头信息压缩以及推送等提高效率的功能(并行发送静态资源：正常情况我们先请求html，然后再请求img、js、css等文件，有了服务端推送后，我们可以在发送html同时一起发送其它必须的静态资源文件)

### 2-3 HTTP的三次握手

![tcp-3](http://cdn.jerryshi.com/note/2018/tcp-3-handshakings.png)

### 2-4 URI-URL和URN

URI

* Uniform Resource Identifier / 统一资源标识符
* 用来唯一标识互联网上的信息资源
* 包括URL和URN

URL

* Uniform Resource Locator / 统一资源定位器
* `http://uer:pass@host.com:80/path?query=string#hash`

URN

* 永久统一资源定位符
* 在资源移动后还能被找到
* 目前还没有非常成熟的使用方案

### 2-5 HTTP报文格式

HTTP CODE

* 定义服务器对请求的处理结果
* 各个区间的CODE有各自的语义
* 好的HTTP服务可以通过CODE判断结果

## HTTP各种特性总览

### 3-1 认识HTTP客户端

    浏览器是一个最常见的HTTP客户端。

当浏览器请求`baidu.com`浏览器首先得到是一下内容，表示请 经过0秒后网页将跳转到url。

```bash
╭─jerry@JerrydeiMac  ~
╰─$ curl baidu.com
<html>
<meta http-equiv="refresh" content="0;url=http://www.baidu.com/">
</html>
```

浏览器访问我的博客时，得到的确实这个内容，表示域名已经永久转义到https上。但关键怎么没有永久转义后的url呢？

```bash
╭─jerry@JerrydeiMac  ~
╰─$ curl jerryshi.com
<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>nginx</center>
</body>
</html>
```

我们价格啰嗦模式看看，原来转义后的url在响应头里。

```bash
╭─jerry@JerrydeiMac  ~
╰─$ curl -v jerryshi.com
* Rebuilt URL to: jerryshi.com/
*   Trying 45.40.200.123...
* TCP_NODELAY set
* Connected to jerryshi.com (45.40.200.123) port 80 (#0)
> GET / HTTP/1.1
> Host: jerryshi.com
> User-Agent: curl/7.51.0
> Accept: */*
>
< HTTP/1.1 301 Moved Permanently
< Server: nginx
< Date: Sat, 09 Jun 2018 07:27:17 GMT
< Content-Type: text/html
< Content-Length: 178
< Connection: keep-alive
< Location: https://jerryshi.com/
<
<html>
<head><title>301 Moved Permanently</title></head>
<body bgcolor="white">
<center><h1>301 Moved Permanently</h1></center>
<hr><center>nginx</center>
</body>
</html>
* Curl_http_done: called premature == 0
* Connection #0 to host jerryshi.com left intact
```

### 3-2 CORS跨域请求的限制与解决

浏览器跨域请求说白了就是浏览器的默认行为，如果在curl中是不存在跨域的问题。这就表示其实服务器根本不知道你跨不跨域，服务器肯定是响应了请求的，只是客户端浏览器做了拦截并忽略而已。这也就是说只有服务器允许跨域请求，客户端才能使用跨域。

浏览器是允许link、script、image标签跨域加载，则jsonp的实现原理就是在script标签里加载某个url链接，用这个链接跨域访问某个请求并返回内容。

`Access-Control-Allow-Origin: "*"`