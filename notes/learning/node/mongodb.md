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

`mongodump -h dbhost -d dbname -o out-dbdirectory`

  - `-h` host:port
  - `-d` dbname
  - `-o` out dbdirectory

### 恢复

`mongorestore -h dbhost -d dbname -directoryperdb dbdirectory`

  - `-h` host:27017
  - `-d` dbname
  - `-directoryperdb` 每个数据库独立文件
  - `dbdirectory` 所备份的数据目录
