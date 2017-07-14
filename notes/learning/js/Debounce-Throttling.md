> 作为一个开发过单片机，玩示波器的老伙子来说，防抖什么的都是小菜一碟了。

防抖（Debounce）和节流（throttle）都是用来控制某个函数在一定时间内执行多少次的技巧，两者相似而又不同。

## 防抖 debounce

- 防抖的原理：某行为在其个时间段内不停地被触发，且行为触发间断时间小于预设wait时间，此时行为执行函数一直不会被执行，直到停止触发的wait时间后才会被执行指定函数。
  - 拿mousemove举个栗子：鼠标在区域内不停的快速晃，此时预置函数不会被执行，直到晃停后xxx毫秒才会被执行。 

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
  // 这里生产了一个不销毁的私有作用域
  // 每一次mousemove行为触发都会来这里找func，wait和timeout
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  }
}

// 防抖第一波
container.onmousemove = debounce(getUserAction, 500);
```

![debounce01.png-173.6kB][1]

- 防抖升级第二波，修复`this`关键字的指向。

```javascript
// 第二波 防抖
function debounce(func, wait) {
  // 这里生产了一个不销毁的私有作用域
  // 每一次mousemove行为触发都会来这里找func，wait和timeout
  var timeout;
  return function () {
    // 保存调用改函数的this传入func中
    var _this = this;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(_this);
    }, wait);
  }
}
```

- 防抖升级第三波，修复arguments问题。

```javascript
function debounce(func, wait) {
  // 这里生产了一个不销毁的私有作用域
  // 每一次mousemove行为触发都会来这里找func，wait和timeout
  var timeout;
  return function () {
    // 保存调用改函数的this传入func中
    var _this = this;
    var args = arguments; // 这里参数是类数组
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(_this, args); // apply接收数组参数
    }, wait);
  }
}
```

  [1]: http://static.zybuluo.com/szy0syz/jq57qdjovxpl95w4ueva4b38/debounce01.png
  