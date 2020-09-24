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

nohup ./etcd --name node-yncce \
--initial-advertise-peer-urls http://node-yncce:2380 \
--listen-peer-urls http://0.0.0.0:2380 \
--listen-client-urls http://0.0.0.0:2379 \
--advertise-client-urls http://0.0.0.0:2379 \
--initial-cluster-token etcd-cluster \
--initial-cluster node-yncce=http://node-yncce:2380,node-lk=http://node-lk:2380 \
--initial-cluster-state new&

nohup ./etcd --name node-lk \
--initial-advertise-peer-urls http://node-lk:2380 \
--listen-peer-urls http://0.0.0.0:2380 \
--listen-client-urls http://0.0.0.0:2379 \
--advertise-client-urls http://node-lk:2379 \
--initial-cluster-token mritd-etcd-cluster \
--initial-cluster node-yncce=http://node-yncce:2380,node-lk=http://node-lk:2380 \
--initial-cluster-state new&


# -- 在测试
## ------------ ok ----------------
nohup ./etcd --name node-yncce \
--data-dir /home/jerry/etcd/default.etcd \
--initial-advertise-peer-urls http://172.18.85.161:2380 \
--listen-peer-urls http://172.18.85.161:2380 \
--listen-client-urls http://172.18.85.161:2379,http://127.0.0.1:2379 \
--advertise-client-urls http://172.18.85.161:2379 \
--initial-cluster-token mritd-etcd-cluster \
--initial-cluster node-yncce=http://172.18.85.161:2380,node-lk=http://172.18.69.200:2380 \
--initial-cluster-state new&

nohup ./etcd --name node-lk \
--data-dir /home/jerry/etcd/default.etcd \
--initial-advertise-peer-urls http://172.18.69.200:2380 \
--listen-peer-urls http://172.18.69.200:2380 \
--listen-client-urls http://172.18.69.200:2379,http://127.0.0.1:2379 \
--advertise-client-urls http://172.18.69.200:2379 \
--initial-cluster-token mritd-etcd-cluster \
--initial-cluster node-yncce=http://172.18.85.161:2380,node-lk=http://172.18.69.200:2380 \
--initial-cluster-state new&
# --------------------------------------------------------------------
vim /etc/hosts

# [member]
# 节点名称
ETCD_NAME=node-yncce
# 数据存放位置
ETCD_DATA_DIR="/var/lib/etcd/default.etcd"
#ETCD_WAL_DIR=""
#ETCD_SNAPSHOT_COUNT="10000"
#ETCD_HEARTBEAT_INTERVAL="100"
#ETCD_ELECTION_TIMEOUT="1000"
# 监听其他 Etcd 实例的地址
ETCD_LISTEN_PEER_URLS="http://0.0.0.0:2380"
# 监听客户端地址
ETCD_LISTEN_CLIENT_URLS="http://0.0.0.0:2379,http://0.0.0.0:4001"
#ETCD_MAX_SNAPSHOTS="5"
#ETCD_MAX_WALS="5"
#ETCD_CORS=""
#
#[cluster]
# 通知其他 Etcd 实例地址
ETCD_INITIAL_ADVERTISE_PEER_URLS="http://node-yncce:2380"
# if you use different ETCD_NAME (e.g. test), set ETCD_INITIAL_CLUSTER value for this name, i.e. "test=http://..."
# 初始化集群内节点地址
ETCD_INITIAL_CLUSTER="node-yncce=http://node-yncce:2380,node-lk=http://node-lk:2380"
# 初始化集群状态，new 表示新建
ETCD_INITIAL_CLUSTER_STATE="new"
# 初始化集群 token
ETCD_INITIAL_CLUSTER_TOKEN="mritd-etcd-cluster"
# 通知 客户端地址
ETCD_ADVERTISE_CLIENT_URLS="http://node-yncce:2379,http://node-yncce:4001"




# [member]
ETCD_NAME=node-lk
ETCD_DATA_DIR="/var/lib/etcd/default.etcd"
#ETCD_WAL_DIR=""
#ETCD_SNAPSHOT_COUNT="10000"
#ETCD_HEARTBEAT_INTERVAL="100"
#ETCD_ELECTION_TIMEOUT="1000"
ETCD_LISTEN_PEER_URLS="http://0.0.0.0:2380"
ETCD_LISTEN_CLIENT_URLS="http://0.0.0.0:2379,http://0.0.0.0:4001"
#ETCD_MAX_SNAPSHOTS="5"
#ETCD_MAX_WALS="5"
#ETCD_CORS=""
#[cluster]
ETCD_INITIAL_ADVERTISE_PEER_URLS="http://node-lk:2380"
# if you use different ETCD_NAME (e.g. test), set ETCD_INITIAL_CLUSTER value for this name, i.e. "test=http://..."
ETCD_INITIAL_CLUSTER="node-yncce=http://node-yncce:2380,node-lk=http://node-lk:2380"
ETCD_INITIAL_CLUSTER_STATE="new"
ETCD_INITIAL_CLUSTER_TOKEN="mritd-etcd-cluster"
ETCD_ADVERTISE_CLIENT_URLS="http://node-lk:2379,http://node-lk:4001"
```



## docker-node2

```bash
wget https://github.com/coreos/etcd/releases/download/v3.0.12/etcd-v3.0.12-linux-amd64.tar.gz
tar zxvf etcd-v3.0.12-linux-amd64.tar.gz
cd etcd-v3.0.12-linux-amd64

nohup ./etcd --name docker-node2 \
--initial-advertise-peer-urls http://inner.yncce.cn:2380 \
--listen-peer-urls http://inner.yncce.cn:2380 \
--listen-client-urls http://inner.yncce.cn:2379,http://127.0.0.1:2379 \
--advertise-client-urls http://inner.yncce.cn:2379 \
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

