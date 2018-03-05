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
* `sudo apt-get install -y mongodb-org`
* `sudo service mongod start`
* 查看 mongodb 默认日志 `cat /var/log/mongodb/mongod.log`
* 如果安装失败，可以进入目录直接修改源 `cd /etc/apt/sources.list.d/` `ls` `vim xxx.list`
* `vim /etc/mongod.conf`

```bash
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

- babel编译启动服务

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

- http://jerrys.free.ngrok.cc/wechat-redirect?a=111&b=222
- openid: `o9ln70h0TgqD-N28g0-o8-VYXSAw`

## Mock & 微信网页开发

### 5-1 利用RAP Mock提供家族数据的测试接口

- RAP MOCK数据平台
- [RAP2网址](http://rap2.taobao.org) 
- 185505508@qq.com__s444

23:39

## 第 6 章 爬虫

[1]: http://static.zybuluo.com/szy0syz/qbf3fz7hgsxm6ykwigr8s8jm/w01.png
[2]: http://static.zybuluo.com/szy0syz/bze9frkh04el10x9rct2ha3q/image.png
[3]: http://static.zybuluo.com/szy0syz/u7kwc6lg19tyvvyykagzkrfb/image.png
[4]: http://static.zybuluo.com/szy0syz/uor52mpuqf5nonkgg3evfesd/image.png
