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

  [1]: http://static.zybuluo.com/szy0syz/qbf3fz7hgsxm6ykwigr8s8jm/w01.png
  [2]: http://static.zybuluo.com/szy0syz/bze9frkh04el10x9rct2ha3q/image.png
  [3]: http://static.zybuluo.com/szy0syz/u7kwc6lg19tyvvyykagzkrfb/image.png
  [4]: http://static.zybuluo.com/szy0syz/uor52mpuqf5nonkgg3evfesd/image.png
