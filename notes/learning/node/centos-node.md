# CentOS Node.js 环境初始化

## 环境介绍

    腾讯云：标准型S2 + 2 核 4 GB 4 Mbps

## 步骤

### 修改服务器名

```bash
vim /etc/hostname
```

### CentOS 安装 MongoDB

```bash
# 新建  /etc/yum.repos.d/mongodb.repo 文件，并写入以下内容为
vim /etc/yum.repos.d/mongodb.repo

# ----------------------------------
[mongodb-org-3.6]
name=MongoDB Repository
baseurl=http://mirrors.tencentyun.com/mongodb/yum/redhat/$releasever/3.6/
gpgcheck=0
enabled=1
# ----------------------------------

# 开始安装MongoDB
yum install -y mongodb-org

# 新建默认数据存储目录
mkdir /data/db

# 开启或关闭mongod服务
service mongod start
service mongod stop

# 修复警告：WARNING: /sys/kernel/mm/transparent_hugepage/enabled is 'always'
echo "never" > /sys/kernel/mm/transparent_hugepage/enabled

# 修复警告：WARNING: /sys/kernel/mm/transparent_hugepage/defrag is 'always'
echo "never" >  /sys/kernel/mm/transparent_hugepage/defrag
```

### 安装Node.js

```bash
# 安装nvm
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash

# 编辑 ~/.bashrc 文件，将nvm的注册提到最前面
vim ~/.bashrc

# 生效 nvm
source ~/.bashrc

# 安装 node.js
nvm install 10.3.0

# 注册 npm 源
npm config set registry http://registry.npm.taobao.org/

# 更新 npm
npm i -g npm

# 安装 Yarn
curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | sudo tee /etc/yum.repos.d/yarn.repo
yum install yarn

# 修改yarn源
yarn config set registry https://registry.npm.taobao.org
```

### 安装 Nginx

```bash
# 安装
yum install nginx

upstream jerryshi {
    server 127.0.0.1:4401; # 这里的端口号写你node.js运行的端口号，也就是要代理的端口号，我的项目跑在8081端口上
    keepalive 64;
}

server {
    listen 80; #这里的端口号是你要监听的端口号
    server_name jerryshi.com www.jerryshi.com; # 这里是你的服务器名称，也就是别人访问你服务的ip地址或域名，可以写多个，用空格隔开

    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_set_header Connection "";
        proxy_pass http://jerryshi; # 这里要和最上面upstream后的应用名一致，可以自定义
    }

    # 重定向到https
    rewrite ^(.*)$  https://$host$1 permanent;
}



```

### Todo

The authenticity of host 'git.coding.net (123.59.83.81)' can't be established.
RSA key fingerprint is SHA256:jok3FH7q5LJ6qvE7iPNehBgXRw51ErE77S0Dn+Vg/Ik.
RSA key fingerprint is MD5:98:ab:2b:30:60:00:82:86:bb:85:db:87:22:c4:4f:b1.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'git.coding.net,123.59.83.81' (RSA) to the list of known hosts.