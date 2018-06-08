# HTTP协议原理实践

    https://coding.imooc.com/class/225.html

[TOC]

## 第2章 HTTP协议基础及发展历史

### 2-1 5层网络模型介绍

![5layer](http://cdn.jerryshi.com/note/2018/internet-5layers.png)

* 物理层主要作用是定义物理设备如何传输数据
* 数据链路层在通信的实体间建立数据链路连接
* 网络层为数据再借点之间传输创建逻辑链路

传输层

* 向用户挺可靠的端到端(End-to-End)服务
* 传输层向高层屏蔽了下层数据通信的细节

应用层

* 为应用软件提供了很多服务
* 构建与TCP协议之上
* 屏蔽网络传输相关细节