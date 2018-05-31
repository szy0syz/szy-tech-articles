# CentOS Node.js 环境初始化

## 环境介绍

    腾讯云：标准型S2 + 2 核 4 GB 4 Mbps

## 步骤

1. 修改服务器名

```bash
vim /etc/hostname
```

2. CentOS 安装 MongoDB

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
