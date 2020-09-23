# etcd + overlay + docer + pxc 集群

## docker-node1

```bash
wget https://github.com/coreos/etcd/releases/download/v3.0.12/etcd-v3.0.12-linux-amd64.tar.gz
tar zxvf etcd-v3.0.12-linux-amd64.tar.gz
cd etcd-v3.0.12-linux-amd64

# 模板
nohup ./etcd --name docker-node1 \
--initial-advertise-peer-urls http://0.0.0.0:2380 \
--listen-peer-urls http://0.0.0.0:2380 \
--listen-client-urls http://0.0.0.0:2379,http://127.0.0.1:2379 \
--advertise-client-urls http://0.0.0.0:2379 \
--initial-cluster-token etcd-cluster \
--initial-cluster {NODE1_NAME}=http://{NODE1_IP}:2380,{NODE2_NAME}=http://{NODE2_IP}:2380 \
--initial-cluster-state new&

nohup ./etcd --name docker-node1 \
--initial-advertise-peer-urls http://0.0.0.0:2380 \
--listen-peer-urls http://0.0.0.0:2380 \
--listen-client-urls http://0.0.0.0:2379,http://127.0.0.1:2379 \
--advertise-client-urls http://0.0.0.0:2379 \
--initial-cluster-token etcd-cluster \
--initial-cluster docker-node1=http://119.23.111.25:2380,docker-node2=http://inner.yncce.cn:2380 \
--initial-cluster-state new&
```



## docker-node2

```bash
wget https://github.com/coreos/etcd/releases/download/v3.0.12/etcd-v3.0.12-linux-amd64.tar.gz
tar zxvf etcd-v3.0.12-linux-amd64.tar.gz
cd etcd-v3.0.12-linux-amd64

nohup ./etcd --name docker-node2 \
--initial-advertise-peer-urls http://0.0.0.0:2380 \
--listen-peer-urls http://0.0.0.0:2380 \
--listen-client-urls http://0.0.0.0:2379,http://127.0.0.1:2379 \
--advertise-client-urls http://0.0.0.0:2379 \
--initial-cluster-token etcd-cluster \
--initial-cluster docker-node1=http://119.23.111.25:2380,docker-node2=http://inner.yncce.cn:2380 \
--initial-cluster-state new&


```



## 检查cluster状态

```bash
./etcdctl cluster-health
```



## 重启docker服务

```bash
# docker-node1
systemctl stop docker.service
/usr/bin/dockerd \
-H tcp://0.0.0.0:2375 \
-H unix:///var/run/docker.sock \
--cluster-store=etcd://192.168.205.10:2379 \
--cluster-advertise=192.168.205.10:2375&

# docker-node2
systemctl stop docker.service
usr/bin/dockerd \
-H tcp://0.0.0.0:2375 \
-H unix:///var/run/docker.sock \
--cluster-store=etcd://192.168.205.11:2379 \
--cluster-advertise=192.168.205.11:2375&
```

## 创建overlay network

```bash
docker network create -d overlay demo
```

> 此时overlay网络 `demo` 会在docker-node2上同步创建

## 创建连接demo网络的容器

```bash
# docker-node1
docker run -d --name test1 --net demo busybox sh -c "while true; do sleep 3600; done"
#docker-node2
docker run -d --name test2 --net demo busybox sh -c "while true; do sleep 3600; done"
```

## 验证是否可相互通信

```bash
docker exec test1 sh -c "ping 10.0.0.3"
```

