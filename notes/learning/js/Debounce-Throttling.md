> 作为一个开发过单片机，玩示波器的老伙子来说，防抖什么的都是小菜一碟了。
防抖（Debounce）和节流（throttle）都是用来控制某个函数在一定时间内执行多少次的技巧，两者相似而又不同。

## 防抖 debounce

- 防抖的原理：

```javascript
var count = 1;
var container = document.getElementById('container');

function getUserAction() {
  container.innerHTML = count++;
}

// 直接绑定，没有任何防抖机制
// container.onmousemove = getUserAction;

// 第一波 防抖
function debounce(func, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  }
}

// 防抖第一波
container.onmousemove = debounce(getUserAction, 500);
```







  [1]: https://github.com/mqyqingfeng/Blog/issues/22
  [2]: http://www.css88.com/archives/7010#more-7010
  