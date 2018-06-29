# Vue SSR + Koa2 全栈开发微信公众号 + 小程序

## 第 1 章

![w01.png-147.5kB][1]
![image.png-213.2kB][2]
![image.png-745.1kB][3]
![image.png-286.4kB][4]

### 阿里云 ECS 服务器环境部署

* `sudo apt-get update`
* `sudo apt-get install git vim openssl build-essential lib ssh-dev wget curl`
* install NVM
* 为防火墙开一些测试端口 `sudo vi /etc/iptables.up.rules`
* 生效防火墙规则 `sudo iptables -restore < /etc/iptables.up.rules`
* 也可以关闭防火墙 `sudo ufw stop`
* 安装 yarn
* `yarn config set registry https://registry.npm.taobao.org`
* `npm install vue-cli pm2 -g`
* `sudo service apache2 stop` 停止服务
* `update-rc.d -f apache2 remove` 删除 Apache
* `sudo apt-get remove apache2` 彻底删除 Apache
* `sudo apt-get update` 更新系统所有的安装包
* `sudo apt-get install nginx`
* `nginx -v` 查看 Nginx 版本
* `cd /etc/nginx/conf.d` 这个文件夹包含所有部署的配置文件
* nginx 配置文件取名规范: `ynzj-jerryshi-com-8080.conf`，可以在 upstream 设置负载均衡
* 安装 MongoDB v3.6
* 安装 public KEY `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5`
* 创建文件，这里需改 ★ 阿里云的镜像，速度快。 `echo "deb [ arch=amd64,arm64 ] https://mirrors.aliyun.com/mongodb/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list`
* `sudo apt-get update`
* `sudo apt-get install -y mongodb-org` 在腾讯云也必须加-org
* 必须先创建mongodb的数据存储目录后再开启服务 `mkdir /data/db`
* `sudo service mongod start` 开启服务
* 查看 mongodb 默认日志 `cat /var/log/mongodb/mongod.log`
* 如果安装失败，可以进入目录直接修改源 `cd /etc/apt/sources.list.d/` `ls` `vim xxx.list`
* `vim /etc/mongod.conf`

```bash
use admin
db.addUser("username", "password")
# 在testdb数据库中创建普通账号
use testdb
db.addUser("test1","123")
db.addUser("test2","123", true) //test2用户仅有读取数据的权限

# mongod.conf
security:
  authorization: 'enabled'
```

### 配置 Git 私有仓库管理代码

* `ssh-keygen -t rsa -b 4096 -C 'szy0syz@gmail.com'` 如果出现密码不要输入忽略掉
* 使用以上命令前必须先看时候已经生成过 `cd ~/.ssh`
* ssh 代理开启 `eval "$(ssh-agent -s)"`
* 进入`~/.ssh`后打开 id_rsa.pub 文件查看公钥，之后就可以去 git 管理页面添加公钥

### 配置 PM2 一键部署发布项目

创建`ecosystem.json` "生态系统"的 json，pm2 读取此脚本后去服务器部署

```json
{
  "apps": [
    {
      "name": "Ice",
      "script": "server.js",
      "instances": 2,
      "env": {
        "COMMON_VARIABLE": "true"
      },
      "env_production": {
        "NODE_ENV": "production"
      }
    }
  ],
  "deploy": {
    "production": {
      "user": "root",
      "host": ["47.92.154.146"],
      "ref": "origin/master",
      "repo": "https://git.coding.net/szy0syz/yncyzj.git",
      "path": "/home/wwwroot/yncyzj",
      "ssh_options": "StrictHostKeyChecking=no",
      "pre-delpoy-local": "ehco 'Deploy Done!'",
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

* first: `pm2 deploy ecosystem.json production setup`
* then: `pm2 deploy ecosystem.json production`

### pm2 资源

* `https://segmentfault.com/q/1010000012007247`
* `https://segmentfault.com/a/1190000005171229`
* `https://www.kancloud.cn/daiji/pm2/395298`
* `http://pm2.keymetrics.io/docs/usage/application-declaration/`
* `https://www.kancloud.cn/daiji/pm2/395298`

## 第 2 章

* 全新邮箱注册微信开放平台，绑定公众号和小程序后，可以那到 uionID，此后在公众号和小程序上可以用相同 id 获取同一用户的数据

## 第 4 章

### 4-01 Ngrok 本地代理服务

* 下载 ngrok.cc 客户端
* 注册 ngrok.cc
* 启动 sunny_ngrok `ngrok client xxxxxxxxx`
* jerry 测试: `71eb740946c7b826`

### 4-02 构建初始项目验证公众号服务器

* babel编译启动服务

```javascript
require('babel-core/register')({
  'presets': [
    'stage-3',
    ['latest-node', { 'target': 'current' }]
  ]
})

require('babel-polyfill')
require('./server')

```

### 4-13 在 Vue SSR 中实现微信网页授权机制与用户资料读取

流程

  1. 微信访问/a?username=jerry&age=20
  2. 跳转到微信服务器 url /a redirect_url=/b
  3. /b?code&state 其中state就是a页面中的查询参数
  4. code => access_token openid => user info

* `http://jerrys.free.ngrok.cc/wechat-redirect?a=111&b=222`
* openid: `o9ln70h0TgqD-N28g0-o8-VYXSAw`

## Mock & 微信网页开发

### 5-1 利用RAP Mock提供家族数据的测试接口

* RAP MOCK数据平台
* [RAP2网址](http://rap2.taobao.org)
* 185505508@qq.com__s444

23:39

## 第6章 爬虫

## 第7章

骑牛云获取token

```js
qiniu.conf.ACCESS_KEY = config.qiniu.AK
qiniu.conf.SECRET_KEY = config.qiniu.SK

const bucket = config.qiniu.bucket

const bucketManager = new qiniu.rs.Client()

const uptoken = (key) => new qiniu.rs.PutPolicy(`${bucket}:${key}`).token()
```

### 7-6

七牛云 js-sdk 客户端直传

```js
const self = this
const observer = {
  next(res) {
    console.log(res.total, res)
  },
  error(err) {
    console.log(err)
  },
  complete(res) {
    self.edited.images.push(res.key)
  }
}
const observable = qiniu.upload(file, key, token, null, config)
observable.subscribe(observer) // 上传开始
```

### 8-4 增加前端微信二跳中间件

#### nuxt中间件使用

 1. pages/admin/index.vue - script 中添加中间件 `middleware: 'wevaht-auth'`
 2. 在项目根目录创建文件夹`middleware`，并新建`wevaht-auth.js`，内容为 `export default function({store, route, redirect}) {...}`
 3. 这样就表示每次在admin的首页中调用项目根目录下的中间件

在koa中同步函数使用await会造成响应超级慢！

this.$router.go(-1) 返回上一页

### 9-1 微信支付

在vue中可以直接在v-model后加trim去前后空格

```js
inputinput(v-model.trim='info.phoneNumber' type='tel' placeholder='你的电话')
```

### 9-3 支付功能的申请流程

1. 申请完微信支付之后，会收到两封邮件，一封是通知开通了微信支付，另一封是微信官方开通的商户号，里面会有商户的登录信息；
2. 微信商户里，设置网页授权的域名、JS安全域名、业务域名等，并且域名要求备案过；
3. 商户平台的产品中心的开放配置中，去添加公众号支付授权目录；
4. 下载官方demo实例代码，拷贝核心代码到项目中为己所用；
5. 在商户平台中下载API证书，设置API秘钥。需要用此证书在服务器端生成预支付订单。

### 10-2 代理环境集成与正式打包测试

启动生产环境：`NODE_ENV=production node start`

微信测试号管理---修改接口域名时需改三个地方

1. 接口配置信息修改 (必要)
2. JS接口安全域名修改 (不必要)
3. 体验接口权限表 - 网页授权获取用户基本信息 - 修改 (必要) ★被坑2小时半★

### 10-5 调整路由-控制器-数据 API 的分层结构

* 让路由更专注于路由的转发
* 让控制器更专业于业务的流转
* 让model(数据API)更专注于数据的流入与读出

在业务紧急时会有很多略带臃肿的面条代码，或者很多颗粒度划分得不够精细的模块，所以当业务跑通后我们需要第一时间对代码进行“**重构**”。

### 13-0 额外调试

> 把线上代码和课程代码clone后，改APPID本地运行对比调试，找手写代码bug~

### 13-1 课程总结

在招聘面试100多人后，我总结了以下三个方面：

* 技能覆盖面。对现有市面上或者近些年来流行的前段的技术点了解过多少、使用过多少、深入研究过多少，这么一听就能知道其能解决问题的范围、能适应的场景及其优劣势，这个点的背后反映的是对技术的敏感度、对技术的视野以及面对新老技术的包容度

* 技术技能深度。什么是基础技能深度呢？html、css、js的基础知识扎实程度，http静态资源的网络优化，和单个知识点、技能点向下挖掘的深度能到多少。这个放映的是面对市面上五花八门的技术，能不能沉下心、稳下心在做业务的同时，不断的向下扩张、向下去挖掘，从而解决比较困难的问题

* 主动解题能力。面对一个未知的、或目前尚不了解的、或不熟悉的领域、或者是一个比较奇葩的技术难题，能不能打开思路，很快的抓住问题的脉络，利用各种资源，不管是人脉资源还是搜索能力，能够把问题pass掉，那么这个就是其解题能力，并且要加上“主动”两个字。这个点能够放映的是作为一个工程技术人员，能不能形成一套有效的方法论和解题思路，那么只有通过整个自我驱动的过程，你才能不断的训练自己的思维能力和解题能力

## 第 14 章：自我扩展

后端如何添加collection并使用

1. `/server/database/schema/`目录下添加collection对应的schema，其中不仅限于定义、虚拟字段、pre、静态方法、实例方法等
2. `/server/api/`目录添加数据层逻辑
3. `/server/api/index.js`添加新的导出对象
4. `/server/routes/`目录添加新的子路由
5. `/server/middlewares/`[可选]添加collection初始化

[1]: http://static.zybuluo.com/szy0syz/qbf3fz7hgsxm6ykwigr8s8jm/w01.png
[2]: http://static.zybuluo.com/szy0syz/bze9frkh04el10x9rct2ha3q/image.png
[3]: http://static.zybuluo.com/szy0syz/u7kwc6lg19tyvvyykagzkrfb/image.png
[4]: http://static.zybuluo.com/szy0syz/uor52mpuqf5nonkgg3evfesd/image.png
