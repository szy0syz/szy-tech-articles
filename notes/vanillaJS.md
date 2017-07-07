# VanillaJS 全球最快的JavaScript框架小技巧

> 暂未细分大类，把会的全丢进来。

- 【字符串类】提取有效字符串/字符串左右两边删空格

```javascript
var str = '  szy0syz '.replace(/^ +| +$/g,''); // -> str: "szy0syz"
```

- 【数组类】类数组转换数组

```javascript
var ary = [].slice.call(likeAry);
var ary2 = Array.prototype.slice.call(likeAry);
```

- 【兼容类】事件兼容写法

```javascript
function handleClick (e) {
    e = e || window.event; // 事件对象
    e.target = e.target || e.srcElement; // 事件源
    e.pageX = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft); // 鼠标点击坐标距离(首屏)body的绝对距离X坐标
    e.pageY = e.clientY + (document.documentElement.scrollHeight || document.body.scrollTop); // 鼠标点击坐标距离(首屏)body的绝对距离Y坐标
    e.preventDefault = function () {
      e.returnValue = false; // 取消事件的默认行为
    };
    e.stopPropagation = function () {
      e.cancelBubble = true; // 取消事件的默认冒泡
    }
}

```
