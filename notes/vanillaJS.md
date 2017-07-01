# VanillaJS 全球最快的JavaScript框架小技巧

> 暂未细分大类，把会的全丢进来。

- 【字符串类】提取有效字符串/字符串左右两边删空格

```javascript
var str = '  szy0syz '.replace(/^ +| +$/g,''); // -> str: "szy0syz"
```

- 【兼容处理类】事件兼容写法

```javascript
e = e || window.event;
e.target = e.target || e.srcElement;
```
