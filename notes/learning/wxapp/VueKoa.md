# Vue SSR + Koa2 全栈开发微信公众号 + 小程序

## 第1章

![w01.png-147.5kB][1]
![image.png-213.2kB][2]
![image.png-745.1kB][3]
![image.png-286.4kB][4]

### 阿里云ECS服务器环境部署

- `sudo apt-get update`
- `sudo apt-get install git vim openssl build-essential lib ssh-dev wget curl`
- install NVM
- 为防火墙开一些测试端口 `sudo vi /etc/iptables.up.rules`
- 生效防火墙规则 `sudo iptables -restore < /etc/iptables.up.rules`
- 也可以关闭防火墙 `sudo ufw stop`
- 安装yarn
- `yarn config set registry https://registry.npm.taobao.org`
- `npm install vue-cli pm2 -g`
- `sudo service apache2 stop` 停止服务
- `update-rc.d -f apache2 remove` 删除Apache
- `sudo apt-get remove apache2` 彻底删除Apache
- `sudo apt-get update` 更新系统所有的安装包
- `sudo apt-get install nginx`
- `nginx -v` 查看Nginx版本
- `cd /etc/nginx/conf.d` 这个文件夹包含所有部署的配置文件
- nginx配置文件取名规范: `ynzj-jerryshi-com-8080.conf`，可以在upstream设置负载均衡
- 安装MongoDB v3.6
- 安装public KEY `sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 2930ADAE8CAF5059EE73BB4B58712A2291FA4AD5`
- 创建文件，这里需改★阿里云的镜像，速度快。 `echo "deb [ arch=amd64,arm64 ] https://mirrors.aliyun.com/mongodb/apt/ubuntu xenial/mongodb-org/3.6 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.6.list`
- `sudo apt-get update`
- `sudo apt-get install -y mongodb-org`
- `sudo service mongod start`
- 查看mongodb默认日志 `cat /var/log/mongodb/mongod.log`
- 如果安装失败，可以进入目录直接修改源 `cd /etc/apt/sources.list.d/` `ls` `vim xxx.list`
- `vim /etc/mongod.conf`

```bash
# mongod.conf
security:
  authorization: 'enabled'
```

  [1]: http://static.zybuluo.com/szy0syz/qbf3fz7hgsxm6ykwigr8s8jm/w01.png
  [2]: http://static.zybuluo.com/szy0syz/bze9frkh04el10x9rct2ha3q/image.png
  [3]: http://static.zybuluo.com/szy0syz/u7kwc6lg19tyvvyykagzkrfb/image.png
  [4]: http://static.zybuluo.com/szy0syz/uor52mpuqf5nonkgg3evfesd/image.png
