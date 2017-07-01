# VanillaJS 全球最快的JavaScript框架小技巧

> 处理暂时细分大类，把会的全丢进来。

- 【字符串】提出有效字符串/字符串左右两边删空格

```javascript
var str = '  szy0syz '.replace(/^ +| +$/g,''); // -> str: "szy0syz"
```
