## Redis

> 基于内存亦可持久化的Key-Value数据库

### 安装

- aliyun Ubuntu 16.04

```bash
# 先更新系统
sudo apt-get update

# 安装Redis服务器端
sudo apt-get install redis-server

# 检查Redis服务器系统进程
ps -aux|grep redis

# 通过启动命令检查Redis服务器状态
netstat -nlt|grep 6379

# 通过启动命令检查Redis服务器状态
sudo /etc/init.d/redis-server status
```

### 配置

> 启用账号验证登录redis

```bash
~ sudo vi /etc/redis/redis.conf

#取消注释requirepass，并将密码修改为redisredis
requirepass redisredis
```

> 让Redis服务器被远程访问

```bash
sudo vi /etc/redis/redis.conf

#注释bind
#bind 127.0.0.1

#重启Redis服务器
sudo /etc/init.d/redis-server restart
```

摘自：[http://blog.fens.me/linux-redis-install/](http://blog.fens.me/linux-redis-install/)
