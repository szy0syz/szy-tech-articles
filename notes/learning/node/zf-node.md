# 珠峰Node.js全栈开发教程

---

[TOC]

## 课时01：node.js介绍


----------

## 课时02：gitflow

 1. fork repo
 2. git clone
 3. cd
 4. add files
 5. git add -A
 6. git commit -m "fixed"
 7. git push origin master
 8. create pull request
 9. merger pull request

> 这个怕是简单了点，怎么培训班招来那么新的新手。这也体现出前端行业从业者的水平阶段如此恐怖。

----------

## 课时03：REPL

- REPL：Read-eavl-print loop，“读取-求值-输出 循环”
  - 在REPL里可以直接输入js命令
  - 特殊变量下划线(_)表示上一个命令返回的结果
  - 如果运行一个表达式，会直接在命令行放回结果。如果运行一行语句，就不会有任何输出，因为语句没有返回值，就返回undefined

```bash
> .help
.break    Sometimes you get stuck, this gets you out
.clear    Alias for .break
.editor   Enter editor mode
.exit     Exit the repl
.help     Print this help message
.load     Load JS from a file into the REPL session
.save     Save all evaluated commands in this REPL session to a file
```

- node.js在Windows系统中环境变量名：PATH

----------

## 课时04：http

- webstrom配置，设置区搜索npm，enable！
- 模块：每个js文件都是一个模块，模块内部声明的变量都是**私有**变量，外部无法访问。
  - 创建math.js模块
  - 导出模块`exports.add = function(a, b) {return a+b;}`
  - 加载模块`var math = require('./math');`
  - 调用模块`var sum = math.add(4,6);`
- 模块分类：
  - 核心模块：http/fs/path
  - 文件模块：`var math = require('./math');`
  - 第三方模块：`var async = require('async');`

- NPM初始化一个项目后package.json：
  - "name": "包的名称，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含空格"
  - "description": "包的简要说明"
  - "version": "符合语义化八大识别规范的版本字符串"
  - "keyword": "关键字数组，通常用于搜索"
  - "maintainers": "维护者数组，每个元素都要包含name、email(可选)、web(可选)字段"
  - "contributors": "贡献者数组，格式与maintainers相同。包的作者应该是贡献则数组的第一个元素"
  - "bugs": "提交bugs的地址，可以是网址或者邮箱"
  - "licenses": "许可证数组，每个元素要包含type和url字段"
  - "repositories": "仓库托管地址数组。每个元素都要包含type和url字段"
  - "dependencies": "包的依赖，一个关联数组，由包名次和版本组成"

- 全局对象global：表示Node所在的全局环境，类似于浏览器的window对象，它及其所有属性都可以在程序的任何地方访问。

- 一个普通网站访问的过程(1)
  1. 浏览器向服务器发出一个**http请求**
  2. 先把域名**解析为IP地址**(chrome缓存1分钟[chrome://net-internals/#dns] --> 搜索操作系统缓存 --> 读取本地host文件 --> 发起DNS系统调用 --> 运营商DNS查询  --> 找根域 --> com域)
  3. 客服端通过随机端口向服务器发起TCP三次握手，建立**TCP连接**
  4. 连接建立后浏览器就可以**发送http请求**了
  5. 服务器端收到http请求，解析请求路径和参数，经过后台的一些处理之后**生成完整的响应**(可能是网页)
  6. 服务器将生成的'页面'作为http响应体，根据不同的处理结果生成**响应头**，发回客户端

----------

## 课时05：http2

- 一个普通网站访问的过程(2)
  1. 客户端(浏览器)接收到HTTP响应，从请求中得到的HTTP响应体里是HTML代码，于是对HTML代码开始**解析**
  2. 解析过程中遇到**引用的服务器上的资源**(额外的CSS、JS、图片、音视频、附件等)，再向服务器发送请求
  3. 浏览器解析HTML包含的内容，用得到的CSS代码进行外观上的进一步**渲染**，JS代码也可能会对外观进行一定**处理**
  4. 当用户与页面交互(点击、悬停等)时，JS代码对此作出一定反应，添加特效与动画
  5. 交互的过程中可能需要向服务器索取或提交额外的数据(局部的刷新)，一般不是跳转就是通过JS代码(响应某个动作或定时)向服务器发送AJAX请求
  6. 服务器再把客户端需要的资源返回，客户端用得到的资源来实现动态效果或者修改DOM结构

----------

## 课时06：global

- 状态码
  - 1XX 请求正在处理
  - 2XX 正常处理完成
    - 200 OK 请求成功 
  - 3XX 重定向
    - 301 Moved Permanently 永久重定向
    - 302 Found 临时重定向
  - 4XX 客服端错误
    - 400 Bad Request 语法错误
    - 401 Unauthorized 未认证
    - 403 Forbidden 禁止访问
    - 404 Not Found 资源未找到
  - 5XX 服务器错误
    - 500 Internal Sever Error 

- 在tcp协议头中，有一个`Connection:keep-alive`，是在TCP中一个可以检测死连接的机制，keepalive原理很简单，TCP会在空闲了一定时间后发送数据给对方。

```javascript
// 很好玩的一个东西，持续向客服端发送内容 keepalive
var counter = 0,
    int = setInterval(function() {
        // 这里给客服端返回一部分内容，但我们不结束响应，则服务端和客户端保持了一个keepalice!
        res.write(new Date().toString());
        counter++;
        if (counter >= 5) {
            clearInterval(int);
            // 好了，发够5次了，我们结束本次响应！
            res.end();
        }
    })
```

- global对象中常用属性
  - `process` - 当前进程对象


```javascript
// console.log('123');
// 其实consoloe.log()在node里就是stdout.write的一个子节点
process.stdout.write('hello');
process.stdin.on('data', function(data) {
  console.log(data.toString());
})

////////////////////////////////

console.log('a客人');
console.log('b客人');
console.log('c客人');
console.log('d厨师');
console.log('e厨师');

setTimeout(function() {
  console.log('去扫地 setTimeout');
}, 0);

// nextTick 会把该事件放入当前任务队列的末端
// 而setTimeout会把事件放入下一个任务队列的顶端
process.nextTick(function() {
  console.log('去扫地 nextTick1');
  process.nextTick(function() {
    console.log('去扫地 nextTick2');
    process.nextTick(function() {
      console.log('去扫地 nextTick3');
    });
  });
});
```

- 异步时的优先级：nextTick > setTimeout > setImmediate > async IO

```javascript
function Parent() {
  this.name = 'Parent';
  this.age = '29';
  function say() {
    console.log('hello ' + this.name);
  }
}

Parent.prototype.showName = function () {
  console.log(this.name);
}

function Child() {
  this.name = 'Chind';
}

//原型继承
// Child.prototype = new Parent;
// 其实node的util也给我们封装了一个继承方法
var util = require('util');
util.inherits(Child, Parent);
var child = new Child();
child.showName(); 
console.log(child.__proto__.__proto__.__proto__ === Object.prototype);
```
    
- util.inherits()：继承
- util.inspect()：检查
  - showHide, 是否显示隐藏属性
  - depth, 对象的递归显示深度
  - colors，是否显示颜色

```javascript
// arr1.concat(arr2);
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);
```

----------

## 课时07：events

```javascript
// 事件: 订阅发布
// 一个简单的时间订阅与发布demo

function Person(name) {
  this.name = name;
  this._events = {};
}

// 注册监听
Person.prototype.on = function(eventName, callback) {
  // 如果已经有人订阅过这个事件了，我们就直接添加回调到这个对象上
  if (this._events[eventName]) {
    this._events[eventName].push(callback);
  } else {
    // 把callback换成数组存到对象属性上 
    this._events[eventName] = [callback];
  }
}

Person.prototype.emit = function (eventName) {
  var args = Array.prototype.slice.call(arguments, 1);
  var callbacks = this._events[eventName];
  var _this = this; // 好土，不要用这种方法！
  callbacks.forEach(function(callback) {
    callback.apply(this, args);
  }, this); // 这才是ES5的新方法！
}

var girl = new Person('小花');
girl.on('长发及腰', function() {
  console.log('我要来娶你');
});
girl.on('长发及腰', function() {
  console.log('可以来撩');
});

girl.emit('长发及腰');
```

- node中的`events`小栗子

```javascript
var EventEmitter = require('events'),
  util = require('util');

function Bell(name) {
  this.name = name;
}
util.inherits(Bell, EventEmitter);

var littleBell = new Bell("little");
littleBell.on('ring', function() {
  console.log('收到礼物1');
});
littleBell.addListener('ring', function() {
  console.log('收到礼物2');
});
// 可以移除某个事件上的所有回调函数
// littleBell.removeAllListeners('ring');
function drop() {
  console.log('铃铛丢了');
};
littleBell.once('drop', drop);
littleBell.emit('ring');
// 移动事件上的某一个回调函数
// littleBell.removeListener('drop', drop);
littleBell.emit('drop');
littleBell.emit('drop');
```

----------

## 课时08：events2

```javascript
// 纯原生态使用JS原理将两异步操作结果合并输出
var fs = require('fs'),
  person = {},
  count = 0;
// 都怪vs~修改一下~
process.chdir(__dirname);
fs.readFile('name.txt', 'utf8', function(err, data) {
  person.name = data;
  if(++count == 2) {
    out();
  }
});
fs.readFile('age.txt', 'utf8', function(err,data) {
  person.age = data;
  if(++count == 2) {
    out();
  }
});

function out() {
  console.log(person.name, person.age);
}
```

- 升级：使用`events`内置类处理

```javascript
// 此时仅加载进来一个类！
var EventEmitter = require('events');
// 实例化这个类
var eve = new EventEmitter();
// 一个将两个异步操作结果合并的小demo
var fs = require('fs'),
  person = {},
  count = 0;
// 都怪vs~修改一下~
process.chdir(__dirname);

// 注册事件，data事件的回调函数
eve.on('data', out);

fs.readFile('name.txt', 'utf8', function (err, data) {
  person.name = data;
  // 如果异步读取到值，发射data事件到监听处
  eve.emit('data');
});
fs.readFile('age.txt', 'utf8', function (err, data) {
  person.age = data;
  // 如果异步读取到值，发射data事件到监听处
  eve.emit('data');
});

function out() {
  if(person.name && person.age) {
    console.log(person.name, person.age);
  }
}
```

```javascript
// 实现原理还是利用闭包生成一个不销毁的作用域，然后将这个作用域返回到newEat，第一次初始化时有个内置的计数器0，然后每执行一次就让内置计数器+1，只到大于等于times则执行回调函数！
function eat(times, callback) {
  var _times = 0;
  return function() {
    _times++;
    if (_times >= times) {
      callback && callback();
    }
  }
}

var newEat = eat(6, function() {
  console.log('吃完了');
})

console.log('1');
newEat();
console.log('2');
newEat();
console.log('3');
newEat();
console.log('4');
newEat();
console.log('5');
newEat();
console.log('6');
newEat();
```

----------

## 课时09：module

- JS的不足
  - js没有模块系统，不支持**封闭作用域**或**依赖管理**
  - 没有**标准库**，没有文件系统和IO流API
  - 没有**包**管理系统，不能自动加载和安装依赖

- commonJS规范
  - 以**模块**划分所有的功能，一个node.js由大量模块组成，**每个JS文件都是一个模块**；
  - 实现了`require`方法，npm基**于common.js**实现了自动加载和安装依赖；

- 模块和包的优点
  - 提高效率
  - 增加**内聚性**
  - 有助于分工
  - 重构方便
  - 提高代码质量

- 模块的分类
  - 核心模块
  - 文件模块
    - 后缀名为.js文件
    - 后缀名为.json文件
    - 后缀名为.node的经过编译后的二进制模块文件
  - 第三方模块 

- node.js加载json模块的原理

```javascript
var jsonObj = require('./json');
// 底下代码就是上面代码的原理实现，注意读文件是时同步模式！
var fs = require('fs');
var result = fs.readFileSync('json.json', 'utf8');
var jObj = JSON.parse(result);
```

- 那我还是去找一下node源码是怎么实现的！基本上和我们写的原理一样！

```javascript
// Native extension for .js
Module._extensions['.js'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  module._compile(internalModule.stripBOM(content), filename);
};

// 这里就是怎么解析json文件的函数！
// Native extension for .json
Module._extensions['.json'] = function(module, filename) {
  var content = fs.readFileSync(filename, 'utf8');
  try {
    module.exports = JSON.parse(internalModule.stripBOM(content));
  } catch (err) {
    err.message = filename + ': ' + err.message;
    throw err;
  }
};

//Native extension for .node
Module._extensions['.node'] = function(module, filename) {
  return process.dlopen(module, path._makeLong(filename));
};
```

- 文件模块
  - js模块
    - 使用exports对象导出**成员**
    - 模块定义为**类**
  -  json模块
    - fs读入内存，并且转化成json对象  

```javascript
(function(exports, require, module, __filename, __driname) {
    // 自定义代码
    return module.exports;
})
```

- 在module加载的js文件模块的原理，初始化时开头就让`exports = module.exports;`了

```javascript
//
//exports = module.exports;

var Person = function(name, age) {
  this._name = name;
  this._age = age;
}

Person.prototype.getName = function() {
  return this._name;
}

Person.prototype.setName = function(name) {
  this._name = name;
}

Person.prototype.getAge = function() {
  return this._age;
}

Person.prototype.setName = function(age) {
  this._age = age;
}

Person.prototype.home = "中国";

// exports = Person;
// 在导出引用类型对象时，还必须使用module.exports来导出！
module.exports = Person;
// return module.exports;
```

- `require.reslove('./person');` 查找`person`模块并返回该模块的绝对路径

```javascript
process.chdir(__dirname);
var Person =  require('./human');
console.dir(require.cache);
// 如果不清楚缓存，require只会加载一次human模块，如果请了后会加载两次！
// delete require.cache[require.resolve('./person')];
var Person =  require('./human');
```

- module加载模块时的查找逻辑

![node-require-logic.png-63kB][2]

![node-module-find-files.png-132.1kB][3]

- module属性和方法
  - module.id 模块的ID，也就是模块的**绝对路径** 
  - module.filename 模块文件名，也时模块的**绝对路径**
  - module.loaded 模块是否加载完毕
  - module.parent 父模块，即调用当前模块的模块对象
  - module.children 子模块，即当前模块require的模块对象
  - module.exports 导出对象
  - module.exports 模块的查找路径

- node.js在循环依赖中进行了优化，如果A和B为循环依赖且A较于B先初始化时，在B中加载A时，仅加载了一部分A的模块(绝大部分属性都不能访问到)。如果使用B模块来使用A模块可能有部分属性访问不到。
- 在module加载时，只有当全部加载完毕时才会设置module.loaded`module.loaded = true`，如果在模块的代码块里时，loaded均为false。因为这个文件模块被module嵌套在了一个函数内执行，所以不管你怎么判断，loaded都是false。

```javascript
//小栗子证明循环依赖部分加载问题
// A module
function A() {
  console.log('A');
}
console.log('A is loading');
console.log('module.loaded: ', module.loaded);
var b = require('./b');
module.exports = {
  A: A,
  name: 'aaaaa'
};
/////////////////
// B module
function B() {
  console.log('B');
}
console.log('B is loading');
console.log('module.loaded: ', module.loaded);
var a = require('./a');
module.exports = {
  B: B,
  a: a,
  test: function () {
    console.log(module.loaded);
  }
};
/////////////////
//loop.js
var A = require('./a');
var B = require('./b');

// 只有全部加载完后才会加载完毕
B.test();
// 循环依赖时，B模块内加载的A模块时，大部分属性都访问不到。
console.log(B.a.name);
console.log(A.name);
```

- require
  - main 主模块
  - reslove 得到实际查找模块的绝对路径
  - cache 模块缓存
  - delete cache[key] 删除缓存

- 包：在node.js中通过包来对一级具有**相互依赖**关系的模块进行统一管理。一个包就是一个**目录**。
  - `package.json` 包描述文件
  - `bin` 二进制
  - `lib` 存放JavaScript文件
  - `doc` 说明文档
  - `test` 单元测试和其他测试

01:09:40  

----------


----------


----------


  [2]: http://static.zybuluo.com/szy0syz/xj1bef58jsvxsmsmc9ps6fnt/node-require-logic.png
  [3]: http://static.zybuluo.com/szy0syz/uomz7siv193etc4d65tu1g4n/node-module-find-files.png

