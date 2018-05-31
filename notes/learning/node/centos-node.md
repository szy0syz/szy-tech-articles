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


```