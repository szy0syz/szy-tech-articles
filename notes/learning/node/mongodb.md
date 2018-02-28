# 传智博客 - MongoDB入门

## NoSQL简介

- NoSQL(`Not Only SQL`)，意即“不仅仅是SQL” ,指的是非关系型的数据库 。是一项全新的数据库革命性运动，早期就有人提出，发展至2009年趋势越发高涨。NoSQL的拥护者们提倡运用非关系型的数据存储，相对于铺天盖地的关系型数据库运用，这一概念无疑是一种全新的思维的注入。 
- 关系型数据库中的表都是存储一些格式化的数据结构，每条记录的字段的组成都一样，即使不是每条记录都需要所有的字段，但数据库会为每条数据分配所有的字段。而非关系型数据库以键值对(key-value)存储，它的结构不固定，每一条记录可以有不一样的键，每条记录可以根据需要增加一些自己的键值对，这样就不会局限于固定的结构，可以减少一些时间和空间的开销。 

- 关系型数据库中的结构： `database --> table --> record --> field`
- 非关系型数据库中结构(实质是面向对象的数据库)： `collection --> document --> JSON`

### NoSql数据库优缺点

- 在优势方面主要体现在下面几点：
  - 简单的扩展
  - 快速的读写
  - 低廉的成本
  - 灵活的数据模型

- 在不足方面主要有下面几点：
  - 不提供对SQL的支持
  - 支持的特性不够丰富
  - 现有的产品部够成熟
  - 事务支持不够好

### MongoDB 数据库

- C++语言编写, 高性能 易部署 易使用
  - 面向集合存储, json
  - 模式自由
  - 支持动态查询
  - 支持完全索引
  - 支持复制和故障恢复
  - 使用高效的二进制数据存储, 包括大型对象
  - 文件存储格式为 BSON

- MongoDB与关系型数据库对比

| 对比项 | MongoDB | MySQL / Oracle |
| :---: | :----: | :----: |
| 表 | 集合collection | 二维表table |
| 表的一行数据row    | 文档document  | 一条记录record |
| 表字段 | 健key | 字段field |
| 字段值 | 值value | 值value |
| 主外键 | 无 | PK,FK |
| 灵活度扩展性 | 极高 | 差 |


- 文档(document) 是 Mongodb 的最基本对象, 都有一个 `objectId`, `{"id": ObjectId()}`
- 集合(`collection`)是文档的聚合
- 0 和 1 也可以表示 true 或 false
- 数字类型64位浮点数, 整数都会被转换成64位浮点数

## MongoDB操作

> MongoDB中有很多隐式

## 索引

索引就是用来加速查询的。数据库索引与书籍的索引类似：有了索引就不需要翻遍整本书，数据库这可以直接在索引中查找，使得查找速度能提高几个数量级。在索引中找到条目以后，就可以直接跳转到目标文档的位置。

- `explain()`是非常有用的工具，会帮助你获得查询方面诸多有用的信息。只要对游标调用方法，就可以得到查询细节。explain会返回一个文档，而不是游标本身。如：`db.test.find().explain()`查询该查询的执行性能

```js
// 创建索引
db.shares.ensureIndex({ barCode: 1 })

// 创建唯一索引(不允许重复)
db.shares.ensureIndex({barCode: 1}, {unique: true})

// 查看关于索引(包含整个集合)信息
db.shares.stats()

// 查询使用索引的情况
db.shares.find({shares: 2}).explain()

// 删除索引
db.shares.dropIndex({ barCode: 1 })
```

## 固定集合

> 固定集合指的是事先创建而且大小固定的集合。

固定集合的特性：固定集合很像环形队列，如果空间不足，最早的文档就会被删除，为新的文档腾出空间。最合适的场景用于任何想要自动淘汰过期属性的场景，没有太多的操作限制。

```js
// 创建一个固定集合，其大小限制100KB，集合的文档限制100000条
// size指定文档数量，max指定集合大小
db.createCollection("collectionName"， { capped:true, size: 100000, max: 100 })
```

当指定文档数量上限时，必须同时指定大小。淘汰机制会用或逻辑或判定条件启动淘汰机制。

## 备份与恢复

### 备份

`mongodump -h dbhost -d dbname -o output-dbdirectory`

  - `-h` host:port
  - `-d` dbname
  - `-o` output dbdirectory

### 恢复

`mongorestore -h dbhost -d dbname -directoryperdb dbdirectory`

  - `-h` host:27017
  - `-d` dbname
  - `-directoryperdb` 每个数据库独立文件
  - `dbdirectory` 所备份的数据目录

## 导入与导出

这里导出的数据是json数据，和备份出来的二进制数据不一样。

`mongoexport -h dbhost -d dbname -c collectionName -o output`

  - `-o` output filename 需指明文件名

`mongoimport -h dbhost -d dbname -c collectionname output`

  - `output` 导出是的文件名

## 安全和认证

每个MongoDB实例中的数据库都可以有许多用户。如果开启了安全检查，则只有数据库认证用户才能执行读写操作。在认证的上下文中，MongoDB会将普通的数据作为admin数据库处理。admin数据库中的用户被视为超级用户。
在认证后，管理员可以读写所有数据库，执行特定的管理命令。
在开启安全检查之前，必须保证有一个管理员用户。

```js
use admin
db.addUser("username", "password")

// 在test数据库中创建普通账号
use test
db.addUser("test1","123")
db.addUser("test2","123", true) //test2用户仅有读取数据的权限

// 开启验证模式
mongod --dbpath d:/data/db --auth
```

## 主从复制(主从集群)

> 主从复制是MongoDB最常用的复制方式。

```js
// 启动主数据库实例
mongod --master

// 启动从属数据库实例并连接主服务库
mongod --slave --source master_address
```

MongoDB的复制至少需要两个服务器或者节点。其中一个是主节点，负责处理客户端请求，其它的都是从节点，负责映射主节点的数据。
主节点记录在其上执行的所有操作。从节点定期轮询主节点获得这些操作，然后对自己的数据副本执行这些操作。由于和主节点执行了相同的操作，从节点就能保持与主节点的数据同步。

```js
mongod --dbpath c:\data\master --master --port 10000 --directoryperdb

mongod --dbpath c:\data\slave\slave1 --port 10001 --slave --source localhost:10000 --directoryperdb

mongod --dbpath c:\data\slave\slave1 --port 10002 --slave --source localhost:10000 --directoryperdb
```

> 注意：主节点可以进行增删改查所有操作，而在从节点只能进行查询的操作。

## 副本集

> 副本集就是有自动故障恢复功能的主从集群。

![repl-1](https://docs.mongodb.com/manual/_images/replica-set-read-write-operations-primary.bakedsvg.svg)
![repl-2](https://docs.mongodb.com/manual/_images/replica-set-primary-with-two-secondaries.bakedsvg.svg)
![repl-3](https://docs.mongodb.com/manual/_images/replica-set-primary-with-secondary-and-arbiter.bakedsvg.svg)
![repl-4](https://docs.mongodb.com/manual/_images/replica-set-trigger-election.bakedsvg.svg)

主从集群和副本集最大的区别就是副本集没有固定的“主节点”；整个集群会选出一个“主节点”，当其挂掉后，又在剩下的从节点中选中其他节点为“主节点”。
 
副本集总有三种节点：和。

- 一个主要节点(primary)
- 一个或多个次要节点(secondary)，其中又分为：
  - standard 常规节点，存储一份完整的数据副本，参与选举投票，有可能成为primary节点;
  - passive 被动节点，存储了完整的数据副本，参与投票，不能成为primary节点;
  - arbiter 仲裁节点，只参与投票，不接收复制的数据，也不能成为primary节点。

```js
// 启动三台
mongod --replSet jerry --dbpath c:\data\rs\data\10000 --port 10000 --logpath c:\data\rs\log\10000.log --logappend

mongod --replSet jerry --dbpath c:\data\rs\data\10001 --port 10001 --logpath c:\data\rs\log\10001.log --logappend

mongod --replSet jerry --dbpath c:\data\rs\data\10002 --port 10002 --logpath c:\data\rs\log\10002.log --logappend

// 添加secondary节点
> rs.add("localhost:10002")
// 查看副本集状态
rs.status()
// 查看副本集配置
rs.conf()
```

## 分片

> 分片(sharding)是指将数据拆分，将其分散存在不同的机器上的过程。有时也用分区(partitioning)来表示这个概念。将数据分散到不同的机器上，不需要功能强大的大型计算机就可以储存更多的数据，处理更多的负载。

MongoDB分片的基本思想就是将集合切分成小块。这些块分散到若干片里面，每个片只负责总数据的一部分。应用程序不必知道哪片对应哪些数据，甚至不需要知道数据已经被拆分了，所以在分片之前要运行一个路由进程，该进程名为mongos。这个路由器知道所有数据的存放位置，所以应用可以连接它来正常发送请求。对应用来说，它仅知道连接了一个普通的mongod。路由器知道数据和片的对应关系，能够转发请求道正确的片上。如果请求有了回应，路由器将其收集起来回送给应用。
设置分片时，需要从集合里面选一个键，用该键的值作为数据拆分的依据。这个键称为片键(shard key)。
用个例子来说明这个过程：假设有个文档集合表示的是人员。如果选择名字("name")作为片键，第一片可能会存放名字以A~F开头的文档，第二片存的G~P的名字，第三片存的Q~Z的名字。随着添加或者删除片，MongoDB会重新平衡数据，使每片的流量都比较均衡，数据量也在合理范围内。

![sharding](http://ofx24fene.bkt.clouddn.com//blog/2018/sharding.png)
![sharding](http://ofx24fene.bkt.clouddn.com//blog/2018/sharding_.png)

```js
// 先开一个configdb
mongod --port 10000 --dbpath c:\data\sharding\data\10000 --directoryperdb --logappend --logpath c:\data\sharding\log\10000.log

//


```
