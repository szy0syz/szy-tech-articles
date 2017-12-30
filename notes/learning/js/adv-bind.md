# JS进阶：实现bind方法

- 实现及测试原理图

![js-bind.png-383kB][1]

- 来吧，我们看着原理图，不看答案的来走一遭~

```javascript
Function.prototype.myBind = function myBind(context) {
    // 实现bind，原理是匿名函数外包一层，每次执行myBind就产生一个新作用域
    // 用的时候这样用hi.myBind(obj)，这个时候返回的是一个堆内存和与之链接的作用域
    // 这个时候我们要先将this保存起来，这个this就是hi方法的堆内存地址~
    var _this = this;
    // 接收一下用myBind时传入的外层参数，注意，这里arguments是类数组
    // 这里从索引1开始转数组，索引0是context不需要。
    var outerArg = Array.prototype.slice.call(arguments, 1);
    // 可以准备返回堆内存了，就是返回匿名函数~
    return function () {
      // 进来首先也是准备接收它的参数，这里得从索引0开始转换数组了
      var innerArg = [].__proto__.slice.call(arguments, 0);
      // 准备要执行了，我们先去上级作用域拿到要修改this的方法hi的堆内存，在_this中保存
      // 替换hi方法的this用上级作用域传入形参context~
      // 链接两个参数数组时，注意顺序，outer后面跟inner
      _this.apply(context, outerArg.concat(innerArg));
    }; // 打完收工
};
/////////////↓↓↓↓↓以下是myBind测试↓↓↓↓↓///////////////
function hi (one,two) {
    console.log(this.hello + ', ' + one + ' ' + two + '.')
}
var o = { hello: 'hello' };
hi.myBind(o,'jerry')('shi'); //直接执行
var fn1 = hi.myBind(o,'jerry'); //赋值堆地址等待执行
fn1('shi');
/////////////↑↑↑↑↑以上是myBind测试↑↑↑↑↑///////////////
```

  [1]: http://static.zybuluo.com/szy0syz/pu2jqt7lcrm7ebki8kjkke2i/js-bind.png
