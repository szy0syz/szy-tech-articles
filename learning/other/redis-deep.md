# Redis 深度历险：核心原理与应用实践

> 大型互联网企业 Redis 实践总结，结合实际问题深入讲解 Redis 内部机制

## 01 基础

### Redis 基础数据结构

Redis有5种基础数据结构：string (字符串)、list (列表)、set (集合)、hash (哈希) 和 zset (有序集合)。

### string (字符串)

Redis 所有的数据结构都是以唯一的 key 字符串作为名称，然后通过这个唯一 key 值来获取相应的 value 数据。不同类型的数据结构的差异就在于 value 的结构不一样。

字符串常见用途有缓存用户信息。

Redis 的字符串是动态字符串，是可以修改的字符串，内部结构实现上和我写的“动态数组”类似，采用预分配冗余空间的方式来减少内存的频繁分配。其实就是类内部有data和size，size指向最后一个空元素，还有capacity指代数组申请的长度。当他快要满时，就扩展capacity。

> 需要注意的是字符串最大长度为 512M。

#### 操作键值对

正常set get只操作一个键值对，批量操作可以前缀m `mset` `mget`

#### 过期和 set 命令扩展

```bash
expire name 5 # 5s过期
setex name 5 jerry # 5s后过期 等价于 set+expire
setnx name jjery  # 如果 name 不存在就执行 set 创建，如果存在就不修改
```

#### 计数

计数前要确保value为整数，起最大值是 `signed long` 的最大最小值，超过就报错。

```bash
set age 31
incr age # +1
incrby age -5 # -5
set aage 9223372036854775807  # Long.Max
```

字符串是由多个字节组成，每个字节又是由 8 个 bit 组成，如此便可以将一个字符串看成很多 bit 的组合，这便是 bitmap「位图」数据结构

### list (列表)

> Redis 的列表相当于 Java 语言里面的 LinkedList，注意它是链表而不是数组。这意味着 list 的插入和删除操作非常快，时间复杂度为 O(1)，但是索引定位很慢，时间复杂度为 O(n)，这点让人非常意外。

当列表弹出了最后一个元素之后，该数据结构自动被删除，内存被回收。


### 过期时间

如果对redis对象设置了expire之后，再set修改这个对象，届时这个expire就会消失，对象不再会自动删除。