# JS进阶：实现bind方法

```javascript
Function.prototype.myBind = function myBind(context) {
  // 实现原理，包一层不销毁的私有作用域，保存this(此时为那个要修改的函数)，传入的context变量就是新的函数内this，再保存外层myBind函数参数(舍去第一个)
  var _this = this; // 这里this为那个要修改的函数
  var outerArg = [].slice.call(arguments, 1);//myBind在绑定时第二个起的参数
  return function () { // 再套一层作用域
    var innerArg = [].slice.call(arguments, 0);  // 获取修改完this的函数执行时的所有参数
    _this.apply(context, outerArg.concat(innerArg)); // 修改this，将外层+内层参数链接，存个堆内存等待执行~
  }
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

- 实现及测试原理图

![js-bind.png-383kB][1]


  [1]: http://static.zybuluo.com/szy0syz/pu2jqt7lcrm7ebki8kjkke2i/js-bind.png
  
