# Ubuntu安装及Node.js生产环境部署

## 下载镜像

使用阿里云镜像下载镜像，速度很快。

```bash
# 目录
http://mirrors.aliyun.com/ubuntu-releases/

# 测试机32位系统即可
http://mirrors.aliyun.com/ubuntu-releases/16.04.3/ubuntu-16.04.3-server-i386.iso
```

## 安装

安装完系统首先去更新下源，待会我们update和upgrade时会快一点。

```bash
cd /etc/apt/sources.list.d
touch sources-cn.list
vim sources-cn.list
```

到 `http://wiki.ubuntu.org.cn` 找个sources的模板，这里用16.04：

```bash
deb http://cn.archive.ubuntu.com/ubuntu/ xenial main restricted universe multiverse
deb http://cn.archive.ubuntu.com/ubuntu/ xenial-security main restricted universe multiverse
deb http://cn.archive.ubuntu.com/ubuntu/ xenial-updates main restricted universe multiverse
deb http://cn.archive.ubuntu.com/ubuntu/ xenial-backports main restricted universe multiverse
##測試版源
deb http://cn.archive.ubuntu.com/ubuntu/ xenial-proposed main restricted universe multiverse
# 源碼
deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial main restricted universe multiverse
deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial-security main restricted universe multiverse
deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial-updates main restricted universe multiverse
deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial-backports main restricted universe multiverse
##測試版源
deb-src http://cn.archive.ubuntu.com/ubuntu/ xenial-proposed main restricted universe multiverse
# Canonical 合作夥伴和附加
deb http://archive.canonical.com/ubuntu/ xenial partner
deb http://extras.ubuntu.com/ubuntu/ xenial main
```

其中也可以将以上源中的`http://cn.archive.ubuntu.com/ubuntu/`替换成阿里云、网易、中科院等等

更新系统及安装常用软件

```bash
# 从源中更新软件列表到本地
sudo apt-get update

# 如果报一个和cdrom没法获取数据的错，需把deb cdrom:[]注销
vim /etc/apt/sources.list

# 一键更新软件包
sudo apt-get upgrade

# 升级管理器
sudo update-manager -d

# 安装一些比用软件
sudo apt-get install git vim openssl build-essential libssh-dev wget curl

# 安装nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# Ubuntu安装yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install yarn

# 生效nvm
source ~/.bashrc

# 安装node.js
nvm install 8.9.4

# 配置npm源
npm config set registry https://registry.npm.taobao.org

# 安装yarn

# 安装ssh
#   先看是否安装ssh
ps -e|grep ssh
#   如果缺少就安装
sudo apt-get install openssh-server
#   启动服务
sudo /etc/init.d/ssh start
#   备份ssh配置
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak
#   修改ssh配置
sudo vim /etc/ssh/sshd_config
#   PermitEmptyPasswords no     # 禁止空密码登录
#   RSAAuthentication yes       # 启用 RSA 认证
#   PubkeyAuthentication yes    # 启用公钥认证
#   ServerKeyBits 1024          # 将ServerKey强度改为1024比特
#   重启以生效
sudo /etc/init.d/ssh restart
#   sudo service ssh restart

# 初始化ssh(服务器和开发端)
#   生成公钥和秘钥 空密码
ssh-keygen -t rsa -C "szy0syz@gmail.com"
#   将开发端公钥改名
cp id_rsa.pub jerry@4790MAC
#   发送authorized_keys到服务端 和修改权限
scp jerry@4790MAC szy0syz@192.168.2.36:~/
#   切到服务器将公钥放
cat jerry@4790MAC >> ~/.ssh/authorized_keys
sudo chmod 755 ~/.ssh
sudo chmod 600 ~/.ssh/authorized_keys
#   将ssh key添加到ssh-agent
ssh-add ~/.ssh/id_rsa
#   重启ssh-server
sudo /etc/init.d/ssh restart
#   sudo service ssh restart
#   开发端添加ssh host
vim ~/.ssh/config
#    格式如下：
#    Host ynamp
#      User root
#      HostName 47.92.154.146
#      Port 22
#      IdentityFile ~/.ssh/id_rsa
```

如果客户端使用git报错

`Permanently added the RSA host key for IP address  to the list of known hosts.`

```bash
# vim ~/.ssh/config
Host *
   StrictHostKeyChecking no
   UserKnownHostsFile /dev/null
   LogLevel ERROR
```

如果`pm2 deploy`报错找不到`npm`或`pm2`时，编辑.bashrc文件，nvm配置提到最前面。

## 安装lnmp中Nginx和ssl证书

```bash
# 安装lnmp (不要装多余的，如php、mysql，装了也能通用或删除)

#    部署ssl证书错误时，可以尝试升级Nginx版本，有时过低的Nginx会部署ssl失败
#    在http://nginx.org/查看最新版本
./upgrade.sh nginx
#    最后来添加ssl证书
lnmp ssl add 
#    升级后还失败，就是系统安装了py2的原因，得删除py2，安装py3，然后再来操作 https://segmentfault.com/a/1190000010693933
#    ubuntu系统以来pythone2.7，应该删除掉，把ubunt版本换成14.04即可正常使用。
```

## ssl/https后nginx配置

```bash
# 将所有的http请求通过rewrite重写到https上
rewrite ^(.*)$  https://$host$1 permanent;

# nginx最简模板
server {
  listen       8080;
  listen       443 ssl;
  server_name  localhost;

  ssl_certificate  /etc/nginx/ssl/server.crt
  ssl_certificate_key /etc/nginx/ssl/server.key

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location /public {
    root /usr/local/var/www;
  }

}
```

## npm设置淘宝源

```bash
npm config set registry http://registry.npm.taobao.org/
```

## Ubuntu安装Yarn

```bash
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update && sudo apt-get install yarn
```
