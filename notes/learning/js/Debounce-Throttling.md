# 防抖与节流

> 作为一个开发过单片机，玩示波器的老伙子来说，防抖什么的都是小菜一碟了。
防抖（Debounce）和节流（throttle）都是用来控制某个函数在一定时间内执行多少次的技巧，两者相似而又不同。

## 经典比喻

- 电梯超时：想象每天上班大厦底下的电梯。把电梯完成一次运送，类比为一次函数的执行和响应。假设电梯有两种运行策略`throttle`和`debounce`，超时设定为15秒，不考虑容量限制。
  - `throttle`策略的电梯。保证如果电梯第一个人进来后，15秒后准时运送一次，不等待。如果没有人，则待机。
  - `debounce`策略的电梯。如果电梯里有人进来，等待15秒。如果又人进来，15秒等待重新计时，直到15秒超时，开始运送。

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

## 防抖升级第二波，修复this关键字的指向

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

## 防抖升级第三波，修复arguments问题

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

## 防抖升级第四波，支持immediate立即执行

- 如果immediate参数为true则，从来没有支持过func就立马执行一次。以后如果还想执行，你得等到wait时间后再触发行为就会立即执行。

```javascript
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var _this = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if(immediate) {
      // 这里的意思是说，如果没执行过func，就执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null; // 也是等到wait时间后再请timeout,到时间后才会执行第二次
      }, wait);
      // 如果从来没有执行过func，就立即执行
      if (callNow) func.apply(_this, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(_this, args); // apply接收数组参数
      }, wait);
    }
  }
}
```

## 防抖升级第五波，支持返回值

```javascript
function debounce(func, wait, immediate) {
  var timeout, result; // result 要定义不销毁的作用域里~
  return function () {
    var _this = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if(immediate) {
      // 这里的意思是说，如果没执行过func，就执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null; // 也是等到wait时间后再请timeout,到时间后才会执行第二次
      }, wait);
      // 如果从来没有执行过func，就立即执行
      // 这里不是异步，这里可以返回值
      if (callNow) result = func.apply(_this, args);
    } else {
      timeout = setTimeout(function () {
        // 这里只异步空间，如果这里赋值result的话会一直都是undefined
        func.apply(_this, args); // apply接收数组参数
      }, wait);
    }
  }
}
```

## 防抖升级第五波，支持取消

```javascript
function debounce(func, wait, immediate) {
  var timeout, result; // result 要定义不销毁的作用域里~
  // 将翻来的匿名函数换成具名函数，是为了给函数添加一个属性，在这个作用域里变量共享，则可以取消防抖。
  var debounced = function () {
    var _this = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if(immediate) {
      // 这里的意思是说，如果没执行过func，就执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null; // 也是等到wait时间后再请timeout,到时间后才会执行第二次
      }, wait);
      // 如果从来没有执行过func，就立即执行
      // 这里不是异步，这里可以返回值
      if (callNow) result = func.apply(_this, args);
    } else {
      timeout = setTimeout(function () {
        // 这里只异步空间，如果这里赋值result的话会一直都是undefined
        func.apply(_this, args); // apply接收数组参数
      }, wait);
    }
  };
  
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null; // 恢复初始化状态
  };
  
  return debounced;
}
```

##  第六波 支持取消防抖

```javascript
function debounce(func, wait, immediate) {
  var timeout, result; // result 要定义不销毁的作用域里~
  // 将翻来的匿名函数换成具名函数，是为了给函数添加一个属性，在这个作用域里变量共享，则可以取消防抖。
  var debounced = function () {
    var _this = this;
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    if(immediate) {
      // 这里的意思是说，如果没执行过func，就执行
      var callNow = !timeout;
      timeout = setTimeout(function () {
        timeout = null; // 也是等到wait时间后再请timeout,到时间后才会执行第二次
      }, wait);
      // 如果从来没有执行过func，就立即执行
      // 这里不是异步，这里可以返回值
      if (callNow) result = func.apply(_this, args);
    } else {
      timeout = setTimeout(function () {
        // 这里只异步空间，如果这里赋值result的话会一直都是undefined
        func.apply(_this, args); // apply接收数组参数
      }, wait);
    }
  };
  
  // 这个取消防抖的意思也就是恢复防抖机制进如初始状态
  debounced.cancel = function () {
    clearTimeout(timeout);
    timeout = null; // 恢复初始化状态
  };
  return debounced;
}

container.onmousemove = debounce(getUserAction, 1000, true);
// 取消防抖
document.getElementById("button").addEventListener('click', function(){
  setUseAction.cancel();
});

```

## 参考

1. [JavaScript专题之跟着underscore学防抖][1]
2. [实例解析防抖动（Debouncing）和节流阀（Throttling）][3]
3. [浅谈 Underscore.js 中 _.throttle 和 _.debounce 的差异][4]

  [1]: http://static.zybuluo.com/szy0syz/jq57qdjovxpl95w4ueva4b38/debounce01.png
  [2]: https://github.com/mqyqingfeng/Blog/issues/22
  [3]: http://www.css88.com/archives/tag/debounce
  [4]: https://blog.coding.net/blog/the-difference-between-throttle-and-debounce-in-underscorejs
  