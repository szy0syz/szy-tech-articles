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

- node.js加载json模块的原理(源码)

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

![node-require-logic.png-63kB][1]

![node-module-find-files.png-132.1kB][2]

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

- npm 包管理工具
  - `npm search gulp` 查找宝，很慢，需要把官网所有包索引在本地构建一份
  - `npm view gulp` 查看包
  - `npm install gulp` 安装包
  - `npm install -g express-generator` 安装全局包
  - `npm config ls` 查看npm配置 (prefix = ... 全局配置路径)
  - `npm root -g` 查看全局安装路径
  - `npm config set prefix "d:\global"` 修改全局路径
  - `npm list` 显示当前目录下的所有包
  - `npm list -g` 显示全局下所有包
  - `npm uninstall gulp` 卸载本地的包
  - `npm uninstall gulp -g` 卸载全局的包
  - `npm update gulp` 更新本地的gulp
  - `npm updated gulp -g` 更新全局的gulp
  - `npm update` 更新当前目录下所有的包
  - `npm update -g` 更新所有目录下所有的包

----------

## 课时10：buffer

- 缓冲区Buffer是暂时存放输入输出数据的一段**内存**。
- JS语言自身只有字符串数据类型，没有**二进制**数据类型，而处理TCP和文件流的时候，必须处理二进制数据。
- NodeJS提供了一个Buffer对象来提供对二进制数据的操作。
- 其是一个表示**固定**内存分配的全局对象，也就是说放到缓存区中的字节需要**提前确定**。
- Buffer好比由一个**八位字节**元素组成的数组，可以有效的在JavaScript中表示二进制数据
- 创建Buffer
  - new Buffer(size) `var buff1 = new Buffer(3);`
  - new Buffer(array) `var buff2 = new Buffer([0x61, 0x62, 0x63]);`
  - new Buffer(str, [encoding]) `var buff3 = new Buffer("abc", "utf-8")'`

```javascript
var fs = require('fs');
// 使用fs模块读取文件时，默认就是二进制！
var content = fs.readFileSync('index.js');
console.log(content);
```

- JavaScript任意进制数转换
  - parseInt("11", 2); // -> 3
  - .toString("3", 2); // -> 11

- 简单的Buffer写入

```javascript
var buff = new Buffer(12); // 一个汉字3个字节，4个汉字12个字节
buff.write("振宇", 0, 6);  // 写两个汉字进入buff，从0开始，写6个字节
buff.write("集团", 6, 6);  // 写入两个函数进buff，从6索引开始，写6个字节
console.log(buff.toString());
/////////////////////////////

var buffer = new Buffer('振宇集团');
var buf1 = buffer.slice(0,7);
var buf2 = buffer.slice(7);
console.log(buf1.toString());
console.log(buf2.toString());

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder(); // 为什么导出成类呢？因为每个实例都需要存储自己的状态
console.log(decoder.write(buf1));
console.log(decoder.write(buf2));
// StringDecoder 大概实现原理为 输出buf1时如果解码出现非法字符，看哈有没有底下连续输出的，又就凑对拼接后再输出

var srcBuff = new Buffer([4,5,6]);
var tarBuff = new Buff(6);
tarBuff[0] = 0x01;
tarBuff[1] = 0x02;
tarBuff[2] = 3;
srcBuff.copy(tarBuff, 3, 0, 3); // 拷贝到tarBuff，从索引3开始，源从0开始，源拷贝3个字节
console.log(tarBuff);  // -> <Buffer 01 02 03 04 05 06>

var buf4 = new Buffer(2);
buf4[0] = -250;
buf4[1] = 260;
console.log(buf4.toString()); // -> <Buffer 06 04>
// 如果溢出时，
// 对于小于0的，会对256去模
// 对于大于250的，先模上256，再加256
```

- Buffer静态方法
  - `concat` `var buff = Buffer.concat([buff1, buff2], 3+3);`
  - `isBuffer`
  - `byteLength`
  - `isEncoding`

```javascript
//手工实现`Buffer.concat()`静态方法
function myConcat(list, len) {
  var b = new Buffer(len), i, j, counter = 0;
  // 双循环便利数组里的Buffer数组对象们
  for (i = 0; i < list.length; i++) {
    for (j = 0; j < list[i].length; j++) {
      // 如果提前到了长度限制，就返回了！
      if (counter >= len) {
        return b;
      }
      // 赋值 
      b[counter++] = list[i][j];
    }
  }
  return b;
}

var buff1 = new Buffer('振宇');
var buff2 = new Buffer('集团');

var buff = myConcat([buff1, buff2], 12);

console.log(buff.toString());
```

----------

## 课时10：file

- 异步方式把字符串写入文件时权限
  - 二爷(写)一直(执行)死(4)读书   4  2  1
  - `-rw-` 表示仅有自己的创建者拥有权限
  - `r--` 所属组
  - 默认node异步文件流权限为`0x666`表示所有人可读写
  - `fs.appendFile`内部用的还是`fs.writeFile + flag:a`模式

- base64编码原理：
  1. 把3个9位字符转成4个6为字节
  2. 在每个6位字节前补两个0 
  3. 再转成十进制数
  4. 将10进制数代如base64取值范围[0~63]中换取结果
  5. 最后连接所有结果


- 小栗子展示`fs.readFileSync()`内部实现流程

```javascript
// 用个vs也是用烦了, 我是不是优化配置一下，省得这样麻烦。
process.chdir(__dirname);

////// 模拟fs.readFile内部实现流程 //////
var fs = require('fs');

var fd = fs.openSync('line.txt', 'r');

// 我在line.txt里就写了三个字符szy
var buffer = new Buffer(3);

/**
 * fd 文件描述符(正常情况下是3，因为0被stdout占用，1被stdin占用，2倍stderr占用)
 * buffer 往buffer里写的偏移量
 * length 长度(这次写入的长度)
 * position 文件的当前读取位置
 */
fs.readSync(fd, buffer, 0 ,3);
console.log(buffer);
```

- 小栗子展示异步分批读取数据

```javascript
var fs = require('fs');
process.chdir(__dirname);
// demo要求：例如4个汉字，异步方式，两个两个的分别读取

// 第零步：创建buffer
var buffer = new Buffer(12); // 我已经提前知道长度了：4个汉字*3=12
// console.log(buffer); // <Buffer 00 00 38 00 00 00 00 00 d9 e9 ca 00>
// 第一步: 打开文件
fs.open('line.txt', 'r',function (err, fd) {
  // 第二步：执行第一次异步，读取一个汉字
  fs.read(fd, buffer, 0, 3, 0, function (err, bytesRead, buffer) {
    console.log('bytesRead:',bytesRead);
    console.log('第一次读取的内容: ' + buffer); //奇怪，为什么有乱码呢？原来实例化时被填充了一些数字
    // 第三部：异步嵌套执行，读取第2~4个汉字
    fs.read(fd, buffer, 3, 9, 3, function (err, bytesRead, buffer) {
      console.log('bytesRead:',bytesRead);
      console.log('第二次读取的内容: ' + buffer.toString());
    });
  });
});
```

- 升级版异步读取文件

```javascript
var fs = require('fs');
process.chdir(__dirname);

var res = new Buffer(8192), list = []; // 8k

// 实现异步读取文件，每次读3个字节！
fs.open('line.txt', 'r', function (err, fd) {
  var pos = 0; // 这个表示目标文件从哪读取的位置
  function read() {
    // 创建一个临时buffer当做缓存区，接收读到的那个字符
    var buffer = new Buffer(3);
    fs.read(fd, buffer, 0, 3, pos, function (err, bytesRead) {
      // 读取文件内容，将二级制buffer存到数组中
      list.push(buffer);
      // 设置文件读取位置，方便下次读取
      pos += bytesRead;
      // 如果还能读到内容
      if (bytesRead > 0) {
        // 递归执行这个函数
        read();
      }
      else {
        // 使用Buffer类的静态方法将数组链接成新Buffer
        var res = Buffer.concat(list);
        console.log(res.slice(0, pos).toString());
      }
    })
  };
  read();
});
```

- 小测验：复制文件

```javascript

function copySync(src, tar) {
  var fs = require('fs');
  process.chdir(__dirname);

  var list = [], size = 0, length = 255, flag = true; // 8k

  // 实现copy小栗子
  // 第一步：我们要创建一个缓存区的话，肯定要知道文件的大小嘛，fd好像可以看到文件大小，我看看node源码readFile怎么写的。
  // 哎，node的readFile里有别的方法确认大小，我们就有标准api吧
  size = fs.statSync(src).size;
  var res = new Buffer(size)
  var fd = fs.openSync(src, 'r');
  fs.readSync(fd, res, 0, size, 0);
  var fd_wtire = fs.openSync(tar, 'w');
  fs.writeSync(fd_wtire, res, 0, size, 0);
  fs.closeSync(fd);
  fs.closeSync(fd_wtire);
  console.log('同步模式复制文件完毕');
}

copySync('src.txt', 'tar.txt');
```

- 小栗子：通过fs.read()方法读取默认stdin(fd为0)，当我们输入后等3秒输出buff

```javascript
var fs = require('fs');

// 0  stdin
// 1  stdout
// 2  stderr

setTimeout(function () {
  var buffer = new Buffer(1);
  console.log(buffer);
  // 用fs读stdin
  fs.read(0, buffer, 0, 1, 0, function (err) {
    console.log(buffer);
  })
}, 3000);

// process.stdin.on('data', function (err, data) {
//   console.log(arguments);
// });

setInterval(function () { }, 1000);
```

- 小栗子：copy 异步版！待写

----------

## 课时12：可读流

### fs模块中几种流的读写方法的区别
| 用途                              | 异步            |     同步       |
| :-------------:                   |:-----------:    |     :-----:    |
| 将文件作为 **整体** 读入缓存区    | readFile        | readFileSync   |
| 将文件 **部分** 读入缓存区        | read            |   readSync     |
| 将数据 **完整** 写入文件          | writeFile       |  writeFilesync |
| 将缓存区的 **部分** 内容写入文件  | write           |   writeSync    |

- read & readSync 读取文件
  - 一**小块**一**小块**读入缓存区
  - 最后从缓存区读取 **完整** 文件内容

- write & writeSync 写入文件
  - 将需要操作的数据写到一个 系统缓存区内
  - 带缓存区写满后在将缓存区写到文件中

- 流的概念
  - 流是一组 `有序` 的，有 `起点` 和 `终点` 的 `字节数据传输` 手段
  - 不关心文件的整体内容，只关注是否从文件中 **读** 到了数据，以及读到数据后的 **处理**
  - 流是一个 **粗体文本** 抽象接口，被Node中的很多对象所实现。比如对一个HTTP服务器的请求对象request是一个流，stdout也是一个流。

> 几乎所有Node程序，无论多简单，都在某种途径用到了流。


### stream.Readable可读流

> 使用实现了stream.Readable接口的对象来将对象数据读取为流数据，在表明准备接收之前，Readable流并不会开始发射数据。

|      对象             |     同步       |
|:-----------:          |    :-----:     |
| fs.ReadStream         |   读取文件     |
| http.IncomingMessage  |   客户端的请求 |
| net.Socket            |   tcp连接中的socket对象 |
| process.stdin         |   标准输入流   |
| Gzip                  |   数据压缩     |


- 可读流模式
  - 内部 **flowing(流动)** 模式和 **非flowing(暂停)** 模式来读取数据
  - `flowing`模式使用操作系统的内部IO机制来读取数据，并尽可能 **快** 地为您提供数据
  - `非flowing`模式时流默认处于 暂停 模式，必须显示调用`read`方法来读取数据

- 如何切换到流动模式
  - 添加一个`data`事件处理器来监听数据
  - 调用`resume()`方法来明确开启数据流
  - 调用`pipe()`方法将数据发送到一个`Writable`可写流

> 注意：如果没有绑定data事件处理器，并且没有pipe()目标，同时流被切换到流动模式，那么数据就会流失。

- 切回暂停模式
  - 如果没有导流目标，调用`pause()`方法
  - 如果有导流目标，移除所有 data 事件处理器，调用`unpipe()`方法移除所有导流目标

### ReadStream文件可写流

    fs.createReadStream(path, [options]);

- path
- options
  - flags 对文件采取何种操作，默认为'r'
  - encoding 指定 **编码**，默认为null
  - autoClose 读完数据后是否关闭文件描述符
  - start 用整数表示文件 **开始** 读取的字节数的索引位置
  - end 用整数表示文件 **结束** 读取的字节数的缩影位置(包含end位置)
  - highWaterMark 最高水位线，停止从底层资源读取前内部缓冲区最多能存放的字节数。缺省时为`64kb`

```javascript
// 一个可读流的小demo
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 3, // 设置缓存区大小为3，那这个流因为要读6个字节，所以导致data事件执行两次
  encoding: 'utf8',
  start: 0,
  end: 5
});

rs.on('data', function (data) {
  console.log(data);
  // 如果这里加了setTimeout(function() {console.log(data);}, 5000);
  // 此时会先打印finished，再打印123，456！
  // 其实这就是流的特点
});

rs.on('end', function () {
  console.log('finished...');
});
```

### 可读流触发的事件
|   事件   |           用途              |
| :------: |        :-----------:      |
| readable | 监听`readable`会使数据从底层读到系统缓存区，读到数据后或者排空后如果再读到数据时，就会触发`readable`事件 |
| data     | 绑定一个`data`事件监听器会将流切换到`流动模式`，数据会尽可能快地读出 |
| end      | 该事件会在`读完`数据后被触发 |
| error | 当数据在接收中发生`错误`时触发 |
| close | 当底层数据源(如源头的文件描述符)被`关闭`时触发。并不是所有流都会触发这个事件 |

### 可读流触发的方法
|     方法    |           描述              |
| :-----:     |         :-----------:       |
| read        | 在`readable`事件触发时的`回调函数`里读取数据 |
| setEncoding | 指定`编码`                  |
| pause       | 通知对象`停止`触发data事件  |
| resume      | 通知对象`恢复`触发data事件  |
| pipe        | 设置 `管道` ，将可读流里的内容导入到参数指定的 `可写流`里 |
| unpipe      | `取消`数据管道              |
| unshift     | 把数据块 `插回` 到队列开头  |

```javascript
// 关于刘的暂停于恢复
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 3, // 设置缓存区大小为3，那这个流因为要读6个字节，所以导致data事件执行两次
  encoding: 'utf8',
  start: 0,
  end: 5
});

rs.on('data', function (data) {
  console.log(data);
  rs.pause(); // 将流切换成非流动模式/暂停模式，此时就不会触发data事件！
  setTimeout(function() {
    rs.resume(); // 切换流到流动模式
    // 这时，先打印123后，等2秒后再打印456，再触发end事件！
  },2000);
});

rs.on('end', function () {
  console.log('finished...');
  rs.close();
  console.log('stream is closed...');
});
```

- 用以下小栗子证明：
  1. 当把流切换成`流动模式`时，数据一定会尽可能快地被读取！
  2. 当可以恢复后没有data事件的监听，这样数据就过了，你再也监听不到流中的数据！

```javascript
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 3, // 强制流读两次数据
  encoding: 'utf8',
  start: 0,
  end: 5
});

rs.pause();

setTimeout(function() {
  rs.on('data', function (data) {
    console.log(data);
  });
}, 5);

rs.resume(); // 切换流到流动模式

rs.on('end', function () {
  console.log('finished...');
  rs.close();
  console.log('stream is closed...');
});
```

- 可读流读数据的原理归结(**流动模式**)：
  1. 初始化可读流(path, start, end, highWaterMark(默认64kb)...);
  2. 流去打开原始数据，看看原始数据的长度。买买，大着点了，哥哥的缓存区放不下。此时流就会分批读取到缓存区;
  3. 在从原始数据读到缓存区时，读满一次缓存区就会触发data事件，并将其回调函数的第一个参数赋值为目前缓存区的内容buff;
  4. 回调执行完后，再清空缓存区又跑去原始数据那读取等额长度的buff存在缓存区，又触发data事件并回调赋值buff;
  5. 当data读到文件末尾时，能读几个字节读几个，读完后data就不再触发。在data事件触发过程中，不会触发readable事件;
  6. 当原始数据读完(最后一次data事件触发完)后，流会最后执行一次readable事件，此时rs.read()返回null;
  7. 最后流发现该做的都做完了，触发end事件，完成读取。

```javascript
// 流动模式的流读取数据demo
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 3,
  start: 0,
  end: 8 
});
var counter = 0;
rs.on('readable', function() {
  console.log('===readable===  No.',counter++);
  console.log('rs.read(1): ', rs.read(1));
});
rs.on('data', function(data) {
  console.log('===data===  No.',counter++);
  console.log(data);
  console.log(rs.read(1)); // 流动模式的流我们读不到缓存区数据了！
});
rs.on('end', function() {
  // 流一般都带自动关闭
  // rs.close();
  console.log('===end===  No.',counter++);
});

////////执行结果/////////
// ===data===  No. 0
// <Buffer 31 32 33>
// In data -> rs.read(1):  null
// ===data===  No. 1
// <Buffer 34 35 36>
// In data -> rs.read(1):  null
// ===data===  No. 2
// <Buffer 37 38 39>
// In data -> rs.read(1):  null
// ===readable===  No. 3
// In readable -> rs.read(1):  null
// ===end===  No. 4
```

- 可读流读数据的原理归结(**手动流模式**)：
  1. 初始化可读流(path, start, end, highWaterMark(默认64kb)...)(假设原始数据长度3，缓存区长度3);
  2. 流检查了下自己的属性，没有导向目标，也没拿on绑定任何事件，好吧，'我'似乎不是一个流动模式的流(流的_state状态属性中 **flowing: null** );
  3. 绑定readable事件
  4. 流接到执行，我可以读数据了。流就开始读取原始数据到缓存区(3字节)，然后我们在readable的回调函数中，使用rs.read(n)来读取缓存区n个字节buff
  5. 每一次调用read()方法都会返回缓存区不同位置的数据，不停往下移，直到移动到null，说明缓存区没有数据了，可以返回这个回调；
  6. 执行完一次readable后，流发现原始数据还没读完时，流就先请缓存区再接着读3字节原始数据放在缓存区后，哦吼，readable事件又触发，又拿rs.read(n)读数据；
  7. 当流将原始数据全部读完后，readable事件还会触发一次，这次在readable回调中用read()方法时返回null，感觉是此多余的readable
  8. 最后触发end事件，我们可以在end上对buff拼接得到结果

```javascript
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt', {
  highWaterMark: 5,
  start: 0,
  end: 9  // 设置了只读0~5，6个数
});
var buffers = [], counter = 0;
rs.on('readable', function() {
  console.log('===readable===');
  var buff;
  //执行一次read()方法，缓存区指针就变一次，谨慎啊！
  while(null != (buff = rs.read(2))) {
    console.log('buf:', buff);
    buffers.push(buff);
    counter++;
    console.log('counter', counter);
  }
});
rs.on('end', function() {
  rs.close();
  var data = Buffer.concat(buffers);
  console.log('data', data);
  console.log('finished...');
});

///////执行结果/////
===readable===
buf: <Buffer 31 32>
counter 1
buf: <Buffer 33 34>
counter 2
===readable===
buf: <Buffer 35 36>
counter 3
buf: <Buffer 37 38>
counter 4
buf: <Buffer 39>
counter 5
===readable===
data <Buffer 31 32 33 34 35 36 37 38 39>
finished...
```

- 上例的原理图

![node-stream-readable.png-110.5kB][3]

- 简化版可读流读取数据原理：
  - 在流动模式下，流拼命读数据到缓存区，读了清了又读，而在非流动模式下，读到缓存区后睡起，等你自己手动读，读完又继续读有睡起等你处理，直到结束。 

----------

## 课时13：可写流


> 可写流writable：使用各种实现了stream.Writable接口的对象来将流数据写入到对象中。


|         对象        |       描述        |
|       :------       |   :-----------    |
| fs.writeStream      | 写入文件          |
| http.ClientRequest  | 客户端请求对象    |
| http.ServerResponse | http中的相应对象  |
| net.Socket          | Tcp中的socket对象 |
| process.stdout      | 标准输出          |
| process.stderr      | 标准输入          |
| Gunzip              | 解压              |

### 可写流的方法
| 方法  |    描述    |
| :---- |   :----    |
| write | 写入数据   |
| end   | 结束写入 数据时触发，迫使缓存区中的数据立即写入目标对象，调用后不能再write()写入方法    |

### 创建WriteStream
在fs模块中使用`createWriteStream`方法创建一个将流数据写入文件中的`WriteStream`对象：`fs.createWriteStream(path, [options]);`

- path 读取的文件路径
- options 
  - flags 对文件采取何种操作，默认为'w'
  - encoding 指定 编码 ，默认为null
  - autoClose 是否自动关闭文件描述符
  - start 用整数表示文件开始字节数的写入位置
  - highWaterMark 最高水位线，write()开始返回false的缓存区大小。缺省时为16kb

- 可写流的小demo

```javascript
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt');
var ws = fs.createWriteStream('./write.txt');

ws.on('open', function(){
  console.log('写入文件已经打开');
});

rs.on('data', function(data) {
  ws.write(data); // 写入
});

rs.on('data', function() {
  // 异步方法：追加`写入完成`四个字在文末
  ws.end('写入完毕', function() { // 写入并关闭
    console.log('写入完毕');
    console.log('共写入%d字节', ws.bytesWritten);
  })
});
```

- write方法：`writeable.write(chunk, [encoding], [callback]);`
  - chunk 要**写入**的数据，Buffer或字符串对象，必须指定
  - encoding 写入的**编码格式**，chunk为字符串时才有用，科尔选参数
  - callback 写入成功后的 **回调函数**
  - write方法返回值为布尔值，系统缓存区灌满时为`false`，未满时为`true`

- end方法：在写入文件时，当不再需要写入数据时可调用方法关闭文件。迫使系统缓存区的数据立即写入文件中。

- 大文件读取流程
  1. 从文件读入 缓存区 并填满
  2. 把缓存区中的数据写入到目标文件，同时读取剩余数据到内存中，write返回flase
  3. 缓存区中的数据全部写入后触发drain事件
  4. 先将内存中的数据写入缓存区，再读取文件剩余数据到缓存区直到填满
  5. **持续**上述步骤，直到读取完成

```javascript
// 大文件读写流程demo
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./project.zip');
var ws = fs.createWriteStream('./project_copy.zip');

rs.on('data', function (data) {
  // 这里可读流没设置最高水位线，应该是64kb，我打印个看看
  console.log(data.length);
  var flag = ws.write(data);
  console.log(flag);
});

ws.on('drain', function () {
  console.log('===drain===');
})

rs.on('end', function() {
  console.log('文件读取完毕');
})

//////////输出结果//////////
// ===drain===
// 65536
// false
// ===drain===
// 65536
// false
// ...
// ...
// ===drain===
// 65536
// false
// ===drain===
// 13347
// true
// 文件读取完毕
```

- 关于可写流`drain`事件的小demo

```javascript
var fs = require('fs');
process.chdir(__dirname);
var ws = fs.createWriteStream('./test.txt', {
  highWaterMark: 17
});
// drain演示demo：使用递归不停往缓存区里覆写数据，不使用可写流默认用内存空间的功能
writeMillion(ws, 'data', 'utf8', function () { });
function writeMillion(writer, data, encoding, callback) {
  var i = 1000000;
  write();
  function write() {
    var ok = true;
    do {
      i -= 1;
      if (i === 0) {
        writer.write(data, encoding, callback);
      } else {
        ok = writer.write(data, encoding);
        console.log(ok);
      }
    } while(i > 0 && ok);
    if (i > 0) { // 又是递归~~
      writer.once('drain', write);
    }
  }
}
```

![node-writeStream-drain.png-51.3kB][4]

- pipe
  - 流，尤其是pipe()方法的初衷，是将数据的 **滞留量** 限制到一个可接受的水平，以使得不同速度的来源和目标不会 **淹没** 可用内存。 
  - `rs.pipe(writeStream, [options]);`
  - 以下是pipe的小栗子，也是pipe的运行原理：

```javascript
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createReadStream('./read.txt');
var ws = fs.createWriteStream('./write.txt');

// pipe的简单实用
// rs.pipe(ws);

// pipe的运行原理
rs.on('data', function(data) {
  var flag = ws.write(data);
  if (!flag) {
    // 诶，ws那边写满缓存区了，rs这边暂停一下，等着ws将缓存区内数据全部写入对象再说
    rs.pause();
  }
});

ws.on('drain', function() {
  // 欧耶，ws这边已经缓存区内容全部写完，回复rs为流通模式，打开pipe上游的小阀门
  rs.resume();
});
```

![node-stream-pipe.png-41.9kB][5]

- unshift小栗子

```javascript
var fs = require('fs');
process.chdir(__dirname);
var rs = fs.createWriteStream('./request.txt'); // 等会这里改最高水位线测试

// 解析头部
var StringDecoder = require('string_decoder').StringDecoder;
function parseHeader(callback) {
  var headers = '';
  rs.on('readable', onReadable);
  var decoder = new StringDecoder();
  function onReadable() {
    var chunk;
    while (null != (chunk = rs.read())) { // 将缓存区所有内容一次读出
      var str = decoder.write(chunk);
      console.log('从可读流缓存区读到的内容:', str);
      if (str.match(/\r\n\r\n/)) { // 如果读到的这个内容包含两个回车换行，说明到分界线了
        // 到分界线后就不消再监听了
        rs.removeListener('readable', onReadable);
        var splits = str.split(/\r\n\r\n/);
        headers += splits.shift(); // 将数组索引0的内容移出给headers
        var remain = splits.join(/\r\n\r\n/);
        var buf = new Buffer(remain, 'utf8');
        if (buf.length) {
          rs.unshift(buf);
        }
        callback(headers);
      } else {
        headers += str;
      }
    }
  }
}
console.trace();
parseHeader(function (h) {
  console.log(h);
  console.log('======');
  rs.on('data', function (data) {
    console.log(data);
  });
});
```

----------

## 课时14：tcp

- 1.分层模型
![image.png-77kB][6]

- 8.tcp建立连接的三次握手
![image.png-83.7kB][7]

- 9.tcp四次退出
![image.png-81.2kB][8]

- 12.tcp传输示例
![image.png-82.4kB][9]

- http抓包
![image.jpg-314.6kB][10]

- tcp抓包
![tcp抓包.jpg-184.3kB][11]

- TCP (Transmission Control Protocol 传输控制协议)是一个可靠的 面向连接 的传输层协议。
- 它可以让你将数据从一台计算机完整 **有序** 地传输到另一台计算机，内置机制能够控制数据包的延迟率及 **丢包率** 不会太高
- 发送放将数据转换为 **字节流** 分成，将数据交给IP层。接收方接收后重新装配成原始的数据
- TCP对字符和字节编码是完全 **无知** 的，不同编码会导致传输的字节数不同
- TCP使用 **流控制** 来确保两点之间传输数据的平衡，以防止快速的发送方淹没慢速的接收方(用包里的窗口控制)
- TCP在传输前经过3次握手才能形成会话，只有会话形成后，服务端和客户端之间才能相互发送数据
- 在会话过程中，服务器和客户端分别提供一个 **套接字** ，这两个套接字共同形成一个连接。服务端和客户端通过这个套接字进行通信

### TCP服务器

> net模块用于实现TCP服务器和客户端之间的通信

- options 参数
  - `allowHalfOpen`属性值为false时，TCP服务器收到客户端的`FIN`包时会回发`FIN`包；为true时，服务器收到客户端`FIN`包不回发`FIN`包;
- `connectionListener = function(socket) {...}`客户端`连接`时的回调函数
  - socket 表示服务器监听的`socket`端口对象
- 返回被创建的服务器server
- listen(port, [host], [backlog], [callback])
  - port 监听的端口号
  - host 监听的IP地址或主机名
  - backlog 等待队列中的最大数量

```javascript
var net = require('net');
var util = require('util');

// socket是 双工流 Dyplux
var server = net.createServer(function (socket) {
  console.log(util.inspect(socket.remoteAddress));
  // 查看当前连接数量
  server.getConnections(function (err, count) {
    console.log('TCPs:', count);
  });
  // 当收到数据是，打印出来。
  socket.on('data', function (data) {
    console.log('接收数据:', data);
    // 将客户端传递来的data加工后写入可写流就传到客户端了
    socket.write('服务端的:' + data);
  });
  socket.on('error', function (err) {
    console.log(err);
    socket.destroy();
  })
});

server.on('error', function (err) {
  console.log(err);
});

server.listen(8088, function () {
  console.log(util.inspect(server.address()));
});

server.on('close', function () {
  console.log('server is closed...');
});
```

### 创建socket

    `var socket = new net.Socket([options]);`

- options
  - fd socket 文件描述符
  - type 客户端协议，ipv4或者ipv6
  - allowHalfOpen 是否允许半开连接

```javascript
// 客户端模式
var net = require('net');
var util = require('util');

var socket = new net.Socket({ allowHalfOpen: true });
socket.setEncoding('utf8');
// 连接我们的服务器
socket.connect(8088, 'localhost', function () {
  // 其实了嘛，socket是个双工流，我在这里write，服务端将能read
  socket.write('hello, jerry.');
  // 当服务端write时，客户端readable方向会触发data事件，会接收服务端返回值
  socket.on('data', function(data) {
    console.log(data);
  });
});
```

### 连接TCP服务器

    `socket.connect(port, [host], [connectListener]);`
- port
- host
- connectListener 连接成功后的监听

### 向服务器发送数据

    `socket.write(data, [encoding], [callback]);`
- data 写入的数据
- encoding 编码
- callback 回调函数

### net类方法

- `net.isIP` 判断字符是否是IP地址
- `net.isIPv4` 是否是IPv4地址
- `net.isIPv6` 是否是IPv6地址

### UDP

- TCP是基于连接的协议，进行通信前客户端与服务端要先建立连接，UDP是面向 **非连接** 的协议，可以直接发送数据包。
- **不要求分组顺序** 到达传输层中
- 受网络影响可能 **丢失** 数据包
- 资源消耗 少，处理速度 快，适合音频、视频和普通数据传输
- UDP协议中的包称为数据报`datagram`

UDP创建socket

    `var socket = dgram.createSocket(type, [callback]);`

- type 协议类型可以为udp4或upd6
- `callback = function(msg, rinfo)` 收到数据 时的回调函数
  - msg 收到的 **数据**
  - rinfo 
    - address 发送者的**ip**
    - family 地址**类型**
    - port 发送者的socket **端口** 号
    - size 发送者发送的数据 **字节数**

UDP发送数据

    `socket.send(buf, offset, length, port, address, [callback]);`
    
- buf 要发送的 **数据**
- offset 从缓存区中 **第几个** 字节开始发送数据
- length 发送数据的 **字节数**
- port 接收数据的 **端口号**
- address 接收数据的 IP地址
- `callback function(err, bytes) {}` 发送完毕时所调用的回调函数
  - err 发送出错时所触发的 **错误对象**
  - bytes **发送数据的字节数**

### UPD服务端和客户端demo

```javascript
// server
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');
socket.on('message', function (msg, rinfo) {
  console.log('=====server=====');
  console.log('msg', msg.toString());
  console.log('rinfo', rinfo);
  console.log('=====server=====');
  socket.send(new Buffer('upd_ok'), 0, 12, rinfo.port, rinfo.address);
});
socket.bind(41234, '127.0.0.1');

// client
var dgram = require('dgram');
var socket = dgram.createSocket('udp4');

socket.on('message', function (msg, rinfo) {
  console.log('===client===');
  console.log('msg', msg.toString());
  console.log('rinfo', rinfo);
  console.log('===client===');
});

socket.send(new Buffer('jerry shi'), 0,9,41234,'127.0.0.1', function(err, bytes) {
  console.log('===client===');
  console.log('发送了%d个字节', bytes);
  console.log('===client===');
});
```

----------

## 课时15：tcp2

- TCP简版聊天室Demo：

```javascript
/** TCP简版聊天室
 * 1. 创建这么一个服务端：
 * 2. 客户端可以连接服务端
 * 3. 客户端可以发言，然后广播给大家
 * 4. 客户端连接和退出后都要通知大家
 * 5. 显示当前的在线人数
 */

var net = require('net');
var util = require('util');
var clients = {};
var server = net.createServer(function (socket) {
  var nickname;
  socket.setEncoding('utf8');
  // 异步方式回去服务器在线人数和欢迎语
  server.getConnections(function (err, count) {
    socket.write('欢迎光临，当前共在线' + count + '，请输入用户名：\r\n> ');
  });

  // 监听socket上可读流方向上的data事件，如果读到来自客户端数据就触发事件 
  socket.on('data', function (data) {
    // 过滤回车换行
    data = data.replace(/\r\n/, '');
    // 如果在当前闭包里，nickname已经有值就说明设置过名称，直接将他输入的内容广播出去
    if (nickname) {
      broadcast(nickname, nickname + ': ' + data);
    // 否则就认为是新用户登录，则设置名称、存储socket、广播新用户到来
    } else {
      nickname = data;
      clients[nickname] = socket;
      broadcast(nickname, '[系统广播]' + nickname + '加入了聊天室! ');
    }
  });

  // 监听end，在流程中end比close先触发
  socket.on('end', function (data) {
    console.log('client is end...');
    broadcast(nickname, '[系统广播]' + nickname + '离开了聊天室! ');
    // 清除socket
    if (clients[nickname]) {
      clients[nickname].destroy();
      delete clients[nickname];
    }
  });

  socket.on('error', function (err) {
    console.log(err);
  });

  // 监听close事件，在end事件后触发，再次确认清除一下客户端的socket
  socket.on('close', function () {
    console.log('client is closed...');
    if (clients[nickname]) {
      clients[nickname].destroy();
      delete clients[nickname];
    }
  });
});

// 广播函数
function broadcast(nickname, msg) {
  for (var name in clients) {
    if (nickname !== name) {
      clients[name].write(msg + '\r\n');
    }
  }
}

// 开启 服务器
server.listen(8090, function () {
  console.log('Chat-server is running...');
})
```

----------

## 课时16：http文件上传

- http服务器：创建服务端并指定监听请求处理函数

    var server = http.createServer(requestListener(request, response));

- request http.IncomingMessage 客户端请求
- 服务器监听
  - `server.listen(port, [host], [backlog], [callback]);`
  - backlog 等待 中的队列数量，默认值是511
  - callback 请求到来的时候服务器调用的函调函数

- http接收客户端数据
  - http接收客户端的请一个参数为`http.IncomingMessage`对象，有如下属性：
  - method 客户端请求的方法类型
  - url 请求时使用的 url 参数字符串
  - headers 请求 头对象，包括客户端所有请求头信息，包括cookie
  - httpVersion HTTP版本

- 常见请求头信息：从客户端发往服务端请求报文所使用的字段，用于补充请求的附加信息 
  - host 请求的服务器主机
  - connection 客户端和服务端的 连接 选项
  - accept 告诉服务器客户端能够处理的内容类型和优先级 q=表示权重，用分号；隔开，范围是0-1，不指定时权重默认为1
  - user-agent **用户代理**，是指浏览器，它的信息包括硬件平台、系统软件、应用软件和用户个人偏好
  - accept-encoding 告诉服务器客户端支持的 **内容编码** 及内容编码的 **优先级** 顺序
  - accept-language 告诉服务器能够处理 语言 及优先级

- 把原始URL转成对象及属性
  - `var urlObj = url.parse('原始url');`
  - href 被转换的 **原url** 字符串
  - protocal 客户端请求时的 **协议**
  - slashes 在协议与路径中是否使用`//`分隔符
  - host url字符串中完整的 地址及端口号，可能为IP也可能域名
  - auth 认证 部分
  - hostname 主机名或者IP
  - port
  - pathname 路径 不包括查询字符串
  - query 不包含起始字符`?`的查询字符串，或根据查询字符串转换而成的对象

### 查询字符串

```javascript
var queryObj = querystring.parse(str, [sep], [eq], [options]); //字符串转对象
var queryStr = querystring.stringify(obj, [sep], [eq]); // 对象转字符串
```

- str 需要被转换的 **查询字符串**
- sep 查询字符串中 **分割** 字符，默认为&
- eq  查询字符串中 **分配** 字符，默认为=
- options 对象参数，可以设置maxKeys属性指定转换后的属性个数，默认不限定

```javascript
var qs = require('querystring');
var obj = qs.parse('name=szy&age=18&sex=1');
console.log(obj);
// 参数1指定分隔符，参数2指定key和val的连接符，最大转换参数个数
obj = qs.parse('name#szy;age#18', ';', '#', { maxKeys: 2 });
console.log(obj);
console.log(qs.stringify(obj));
```

### 响应

response http.serverResponse代表服务器相应对象

    response.writeHead(statusCode, [reasonPhase], [headers]);

- statusCode **状态码**
- reasonPhrase 状态码 **描述** 信息
- headers 响应头对象
  - content-type 内容类型
  - location 重定向 到的url地址
  - content-disposition 下载的**文件名**
  - content-length 响应内容的**字节数**
  - set-cookie 写入客户端的**cookie**
  - content-encoding 响应内容的**编码**方式
  - Cache-Control 缓存
  - Expires 指定缓存 过期时间
  - Etag 服务器响应的 **内容没有变化** 时不重新下载数据
  - connection 默认是keep-alive **保持连接** 想断开连接用close 
- 设置响应头
  - setHeaders方法可以单独设置响应头 `response.setHeader(name, value);`
  - 如果多个响应头的话可以使用数组 `response.setHeader('Set-Cookie', ['name=jerry', 'age=19']);`
- 其它响应设置
  - getHeader **获取** 响应头
  - removeHeader **移除** 响应头
  - headerSent 响应头是否 **已经发送**
  - sendDate 是否发送 **响应时间**
  - statusCode 设置 **响应码**

### 创建HTTP客户端

request方法可以向其它网站发送请求

- options
  - host 域名 或目标主机IP
  - hostname 域名 或目标主机IP，优先级比host高
  - port 端口号
  - method 请求方法
  - path 请求 路径，默认为/
  - headers 客户端**请求头对象**
  - auth 认证
- `callback = function(response) {};` 当 获取 到目标网站所返回 响应 时的回调函数
  - reponse 是一个 **http.IncomingMessage** 对象，可以从中**读取响应流数据** 

### 写入请求并发送请求

- write 方法向目标服务器 **发送** 数据，write方法可以调用多次，`request.write(chunk, [encoding]);`
  - chunk 要发送的数据，可以是Buffer或者字符串
  - encoding 编码，不指定默认是utf8
- end方法用来 **结束** 本次请求 `request.end(chunk, [encoding]);`

- 使用http模块编写服务端和客户端交互小demo

```javascript
// server V2
var http = require('http');
var querystring = require('querystring');
var util = require('util');
http.createServer(function (req, res) {
  // headers的属性全部都是小写
  var contentType = req.headers['content-type'];
  req.setEncoding('utf8');
  var result = '';
  //因为req和res都是流 
  req.on('data', function (data) {
    result += data;
  });
  req.on('end', function (data) {
    var obj;
    if(contentType === 'application/json') {
      obj = JSON.parse(result);
    }
    if (contentType === 'application/x-www-form-urlencoded') {
      obj = querystring.parse(result);
    }
    console.log('发送客户端数据');
    res.end(util.inspect(obj));
  })
}).listen(8080, function () {
  console.log('server is running...');
});
///// 服务端输出结果
// server is running...
// Server: { name: 'jerry', age: '18' }

///////////////////////

// client-json
var http = require('http');
var options = {
  hostname: '127.0.0.1',
  port: 8080,
  headers: {
    'Content-Type': 'application/json'
  },
  path: '/',
  method: 'POST'
};
var req = http.request(options, function (res) {
  // res.setEncoding('utf8');
  var result = '';
  //因为req和res都是流
  res.on('data', function(data) {
    result += data;
  });
  res.on('end', function(data) {
     console.log('Client:' ,JSON.parse(result));
  })
});

req.write(JSON.stringify({ name: 'jerry', age: '18' }));
req.end();
///////客户端输出结果
//╭─jerry@JerrydeiMac  ~/Git/zhufeng-node-practice/lesson16_httpUpload  //‹master*›
//╰─$ node ./client.js
//Client: { name: 'jerry', age: '18' }

///////////////////////
// client-form
var querystring = require('querystring');
var http = require('http');
var options = {
  hostname: '127.0.0.1',
  port: 8080,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  path: '/',
  method: 'POST'
};
var req = http.request(options, function (res) {
  // res.setEncoding('utf8');
  var result = '';
  //因为req和res都是流
  res.on('data', function(data) {
    result += data;
  });
  res.on('end', function(data) {
     console.log('Client:' ,JSON.stringify(result));
  })
});

req.write(querystring.stringify({ name: 'jerry', age: '18' }));
req.end();
```

- 以上demo小结：
  - 流需要结束方法.end()
  - util.inspect(obj)不知obj格式，可以使用此方法转换字符串
  - 服务端判断content-type判断

- 关于http中流的应用demo

```javascript
// serverV3.js
fs.createReadStream('./index.html').pipe(res);
```

### 用HTML5上传文件

- DEMO需求:
  - 选中文件后显示上传的文件信息，比如文件名、类型、大小
  - 一个能够显示 **真实** 进度的 进度条
  - 上传的速度
  - 剩余时间的估算
  - 已上传的数据量
  - 上传结束后服务器返回上传后保存的图片并在页面中 **显示** 出来

- 前端部分

```html
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML5-upload</title>
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <form>
            <div class="form-group">
                <label for="fileUpload">请选择上传的文件</label>
                <input class="form-control" type="file" id="fileUpload" name="fileUpload" onchange="fileSelect()">
            </div>
            <div class="form-group">
                <input type="button" onclick="uploadFile()" class="btn btn-default" value="上传">
            </div>
            <div>
                <table class="table table-striped">
                    <tr>
                        <td>文件名</td>
                        <td>文件大小</td>
                        <td>文件类型</td>
                    </tr>
                    <tr>
                        <td id="fileName"></td>
                        <td id="fileSize"></td>
                        <td id="fileType"></td>
                    </tr>
                </table>
            </div>
            <div>
                <table class="table table-striped">
                    <tr>
                        <td>传输速度</td>
                        <td>当前进度</td>
                        <td>剩余量</td>
                    </tr>
                    <tr>
                        <td id="speed"></td>
                        <td id="stage"></td>
                        <td id="remaining"></td>
                    </tr>
                </table>
            </div>
            <div class="progress">
                <div id="progressBar" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                </div>
            </div>
        </form>
    </div>
</body>
<script>
    function fileSelect() {
        var file = document.querySelector('#fileUpload').files[0];
        if (file) {
            document.querySelector('#fileName').innerHTML = file.name;
            document.querySelector('#fileSize').innerHTML = changeSize(file.size);
            document.querySelector('#fileType').innerHTML = file.type;
        }
    }

    function changeSize(size) {
        // GB级别的文件就算了，服务器伤不起！
        var fileSize = 0;
        if (size > 1024 * 1024) {
            fileSize = Math.round(size / (1024 * 1024)) + 'MB';
        } else {
            fileSize = Math.round(size / (1024)) + 'KB';
        }
        return fileSize;
    }

    var success = error = abort = function () { };
    var last = 0;
    function progress(event) {
        var percent = Math.round(event.loaded * 100 / event.total); // 计算上传进度
        var pb = document.querySelector('#progressBar');
        pb.style.width = percent + '%';
        pb['aria-valuenow'] = percent;
        var diff = Math.round(event.loaded - last);
        last = event.loaded;
        document.querySelector('#speed').innerHTML = changeSize(diff) + '/s';
        document.querySelector('#stage').innerHTML = changeSize(event.loaded);
        document.querySelector('#remaining').innerHTML = changeSize(event.total - event.loaded);

    }

    function uploadFile() {
        var file = document.querySelector('#fileUpload').files[0];
        if (!file) {
            return;
        }
        var fd = new FormData();
        fd.append('fileUpload', file);
        var xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', progress, false); //上传进度监听
        xhr.addEventListener('load', success, false); //上传成功
        xhr.addEventListener('error', error, false); //上传出错
        xhr.addEventListener('abort', abort, false); //上传中断
        xhr.onreadystatechange = function () {
            // 不仅判断xhr.status==2xx还要判断xhr.readyState==4，否则响应头也是200啊
            if (/^2\d\d$/.test(xhr.status) && xhr.readyState === 4) {
                console.log(xhr.response);
            }
        }
        xhr.open('POST', '/post');
        xhr.send(fd);
    }

</script>

</html>  
```

- 后端部分

```javascript
var querystring = require('querystring');
var http = require('http');
var util = require('util');
var url = require('url');
var formidable = require('formidable');
// var mine = require('mine');
var url = require('url');
var fs = require('fs');
process.chdir(__dirname);
var app = http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true); // 确定转换为对象方式
  var pathname = urlObj.pathname;
  if(pathname === '/') {
    fs.createReadStream('./index.html').pipe(res);
  } else if (pathname === '/post') {
    var parse = new formidable.IncomingForm();
    parse.parse(req, function(err, fields, files) {
      if(err) {
        res.end('file error');
      }
      console.log(files);
      res.end('file ok');
    })
  } else {
    res.end('404');
  }

}).listen(8088, function() {
  console.log('server is running...');
});
```

### 用HTML5分片上传大文件demo

- 项目原理：
  - 前端，将文件分片(chunk, size=4MB)，分片数量为Math.ceil()向上取整。根据分片数建立ajax批量上传，在传输过程中需要分片具体属性附在forms里一并上传，方便服务端计算合并。
  - 后端，批量接收分片文件。使用可读流读取所有分片文件，读取时需注意偏移量pos，再用可写流将文件写入目标对象。

- 前端:

```javascript
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>

</body>

</html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML5-upload</title>
    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
    <link rel="stylesheet" href="https://cdn.bootcss.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <form>
            <div class="form-group">
                <label for="fileUpload">请选择上传的文件</label>
                <input class="form-control" type="file" id="fileUpload" name="fileUpload" onchange="fileSelect()">
            </div>
            <div class="form-group">
                <input type="button" onclick="uploadFile()" class="btn btn-default" value="上传">
            </div>
            <div>
                <table class="table table-striped">
                    <tr>
                        <td>文件名</td>
                        <td>文件大小</td>
                        <td>文件类型</td>
                    </tr>
                    <tr>
                        <td id="fileName"></td>
                        <td id="fileSize"></td>
                        <td id="fileType"></td>
                    </tr>
                </table>
            </div>
            <div class="progress">
                <div id="progressBar" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                </div>
            </div>
        </form>
    </div>
    <script>
        function fileSelect() {
            var file = document.querySelector('#fileUpload').files[0];
            if (file) {
                document.querySelector('#fileName').innerHTML = file.name;
                document.querySelector('#fileSize').innerHTML = changeSize(file.size);
                document.querySelector('#fileType').innerHTML = file.type;
            }
        }

        function changeSize(size) {
            // GB级别的文件就算了，服务器伤不起！
            var fileSize = 0;
            if (size > 1024 * 1024) {
                fileSize = Math.round(size / (1024 * 1024)) + 'MB';
            } else {
                fileSize = Math.round(size / (1024)) + 'KB';
            }
            return fileSize;
        }

        // 分片传输完成后的回调函数
        function success() {

        }

        function uploadFile() {
            var file = document.querySelector('#fileUpload').files[0];
            if (!file) {
                return;
            }

            // 分片的小文件大小
            var shardSize = 4 * 1024 * 1024; // 4MB
            // 分片数
            var shardCount = Math.ceil(file.size / shardSize);
            var temp = (new Date()).getMilliseconds();
            for (var i = 0; i < shardCount; i++) {
                var fd = new FormData();
                // 读取二进制文件的起始位置
                var startPos = i * shardSize;
                // 读取二进制文件的截止位置
                var endPos = Math.min(file.size, startPos + shardSize);
                // 因为file是个数组对象，可以使用slice截取
                fd.append('data', file.slice(startPos, endPos));
                fd.append('name', 'fileUpload' + temp);
                fd.append('total', shardCount);
                fd.append('index', i); // 这里我不想+1
                fd.append('fileSize', file.size);
                fd.append('size', shardSize);

                var xhr = new XMLHttpRequest();
                // xhr.upload.addEventListener('progress', progress, false); //上传进度监听
                xhr.addEventListener('load', success, false); //上传成功
                //xhr.addEventListener('error', error, false); //上传出错
                //xhr.addEventListener('abort', abort, false); //上传中断
                xhr.onreadystatechange = function () {
                    // 不仅判断xhr.status==2xx还要判断xhr.readyState==4，否则响应头也是200啊
                    if (/^2\d\d$/.test(xhr.status) && xhr.readyState === 4) {
                        console.log(xhr.response);
                    }
                }
                xhr.open('POST', '/post');
                xhr.send(fd);
            }

        }
    </script>
</body>

</html>
```

- node后端源码

```javascript
var querystring = require('querystring');
var http = require('http');
var util = require('util');
var url = require('url');
var formidable = require('formidable');
var url = require('url');
var fs = require('fs');
var path = require('path');
process.chdir(__dirname);
var renameCount = 0;
var app = http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true); // 确定转换为对象方式
  var pathname = urlObj.pathname;
  if (pathname === '/') {
    fs.createReadStream('./index.html').pipe(res);
  } else if (pathname === '/post') {
    var parse = new formidable.IncomingForm();
    parse.parse(req, function (err, fields, files) {
      if (err) {
        res.end('file error');
      }
      var file = files.data;
      var filename = fields.name;
      var total = Number(fields.total);
      var index = fields.index;
      var size = Number(fields.size);
      var fileSize = Number(fields.fileSize);
      var tempDir = path.dirname(file.path);
      // 教程里这里创建可读流写一个新文件，太费性能了，改名就好了嘛
      // var src = fs.createReadStream()
      // 同步还是异步呢
      // fs.renameSync(file.path, file.path.replace(path.basename(file.path), filename + '.' + index));
      fs.rename(file.path, file.path.replace(path.basename(file.path), filename + '.' + index), function () {
        if (renameCount === total - 1) {
          var fd = fs.openSync(filename, 'a');
          var files = fs.readdirSync(tempDir);
          files.forEach(function (item) {
            if (item.startsWith(filename + '.')) {
              // 计算二进制文件pos位置
              var pos = Number(path.extname(item).slice(1)) * size;
              fs.readFile(tempDir + '/' + item, function (err, buff) {
                if (err) {
                  // 删除当前临时文件(以前的都已经清除了)
                  fs.unlinkSync(tempDir + '/' + item);
                  res.end('loaded err');
                  return;
                }
                fs.writeSync(fd, buff, 0, buff.length, pos);
                // 删除上传的临时文件
                fs.unlinkSync(tempDir + '/' + item);
                // 哎 关不掉fd啊，怎么办！
                // console.log(pos + size, fileSize);
                // if ((pos + size) >= fileSize) {
                //   console.log('关闭fd了~');
                //   //fs.closeSync(fd);
                // }
              });
            }
          });
          // 异步好坑。这里在循环外面关闭的话就成提前关闭fd了！不行！
          // fs.closeSync(fd);
          renameCount = 0;
        } else {
          renameCount++;
        }
      });
      res.end('file ok');
    })
  } else {
    res.end('404');
  }
}).listen(8088, function () {
  console.log('server is running...');
});
```

----------

## 课时17 express_prepare

- 模拟express第一步：原生node的网站demo
  - express是个web框架，根据url访问地址返回html网页(初期)
  - 那第一步肯定返回`/`主页的html，那就用res.end()方法返回个html代码
  - 第二步如果访问`/article`路径，服务端先解析查询参数url，并根据id进行内容查询
  - 第三步根据不同id查询内容后返回响应内容
  - OK，miniExpress完成，包含路由、查询参数，简单内容，后期就是封装

```javascript
var http = require('http');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var articles = {
  1: '第一篇文章的详情',
  2: '第二篇文章的详情',
  3: '第三篇文章的详情'
}

http.createServer(function(req, res) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;

  if(pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
  } else if (pathname === '/article') {
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end(articles[query.id]);
  } else {
    res.end('404');
  }

}).listen(8080, function() {
  console.log('server is running...');
});
```

- 升级1：提取公共业务逻辑，重构成一个函数

```javascript
function send(data) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(data);
}
```

![connect-middleware.png-71kB][12]

- 升级2：建立中间件模式
  - 构建app.use方法，所有中间件都使用use方法封装
  - 构建connect中间件时在app实例上构建stack数据存放所有中间件
  - 每当来一个请求时，都会应要按顺序执行所有存在stack中的中间件
  - 在执行每个中间件时，都会把next函数指针地址传入，如果调用就index+1，递归的执行下一个中间件直到没有中间件可执行为止

```javascript
// connect.js
var http = require('http');
var proto = {};

function createServer() {
  function app(req, res) {
    app.handle(req, res);
  }
  // 把proto对象的属性拷贝到app中一份
  Object.assign(app, proto);
  app.stack = [];
  return app;
}

proto.use = function(handle) {
  this.stack.push(handle);
}

proto.handle = function (req, res) {
  var stack = this.stack;
  var index = 0;
  function next() {
    stack[index++](req, res,next);
  }
  next();
}

module.exports = createServer;
```

```javascript
// main.js
var http = require('http');
var url = require('url');
var path = require('path');
var querystring = require('querystring');
var connect = require('./2.connect');
var articles = {
  1: '第一篇文章的详情',
  2: '第二篇文章的详情',
  3: '第三篇文章的详情'
}

var app = connect();
app.use(function (req, res, next) {
  var urlObj = url.parse(req.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;
  // 为方便使用者在req中添加两个属性
  req.path = pathname;
  req.query = query;
  next();
});

app.use(function (req, res, next) {
  // 给res添加一个业务方法
  res.send = function (data) {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end(data);
  }
  next();
});

app.use(function(req, res) {
  if (req.path === '/') {
    res.send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
  } else if (req.path === '/article') {
    res.send(articles[req.query.id]);
  } else {
    res.end('404');
  }
})

var server = http.createServer(app);

server.listen(8080, function () {
  console.log('server is running...');
});
```

- 升级3：将非业务中间件提取单独建立文件后导出使用

```javascript
// middle.js
var url = require('url');

module.exports = function (app) {
    app.use(function (req, res, next) {
        var urlObj = url.parse(req.url, true);
        var pathname = urlObj.pathname;
        var query = urlObj.query;
        // 为方便使用者在req中添加两个属性
        req.path = pathname;
        req.query = query;
        next();
    });

    app.use(function (req, res, next) {
        // 给res添加一个业务方法
        res.send = function (data) {
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            res.end(data);
        }
        next();
    });
}

// main.js 中使用中间件时导出即执行传入参数
require('./2.middle')(app);
```

- 升级4：在中间件app上创建listen()方法，创建服务器并将启动

```javascript
// connect.js: 新增 listen() 创建并启动服务
proto.listen = function (port, callback) {
  console.log(this);
  var server = http.createServer(this); 
  server.listen(port,callback); // app.listen(8080) -> this == app
}

// main.js: 使用listen()方法
app.listen(8080, function() {
  console.log('server in running at %d port.' ,8080);
})
```

- 升级5：改造路由
  - 还是改造use方法，那得将原来use()的一个参数升级到两个参数
  - 主要需要动的函数就两个：use和handle
  - 改造use方法时，不再是只存handle函数，而是改存`{path,handle}`对象了，因为需要判断路由嘛
  - 其实我看过express的route部分源码，这里还少了一步，那就是第一个参数是字符串而第二个参数也是字符串的情况时为单纯的存储键值对，后期补上。

```javascript
proto.use = function (route, fn) {
  var handle = fn;
  var path = route;
  // 如果第一个参数不是字符串，那么可能是函数。
  // 那就说明没传路由，直接传业务操作函数
  if (typeof route !== 'string') {
    // 那么就让第一个参数等于handle
    handle = route;
    // 默认为根目录
    path = '/';
  }
  this.stack.push({ handle: handle, path: path });
}

proto.handle = function (req, res) {
  var stack = this.stack;
  var index = 0;
  function next() {
    var layer = stack[index++];
    var route = layer.path;
    var handle = layer.handle;

    var path = url.parse(req.url).pathname;
    // 这里只能startWith，因为还有查询参数之类的
    // 但有个问题，如果是访问根目录/，则所有都匹配上了
    if (path.startsWith(route)) {
      handle(req, res, next);
    } else {
      next();
    }
  }
  next();
}
```

- 升级6：将所有路由中间件单独建立文件后导出使用

```javascript
// 2.route.js
module.exports = function (app) {
  //////测试数据
  var articles = {
    1: '第一篇文章的详情',
    2: '第二篇文章的详情',
    3: '第三篇文章的详情'
  }
  ////////////

  app.use('/list', function (req, res) {
    res.send('<ul><li><a href="/article?id=1">第一篇</a></li><li><a href="/article?id=2">第二篇</a></li><li><a href="/article?id=3">第三篇</a></li></ul>');
  })

  app.use('/article', function (req, res) {
    res.send(articles[req.query.id]);
  })

  app.use(function (req, res) {
    res.end('404');
  })
}

// 精简后的main.js文件 好清爽！
var connect = require('./2.connect');

var app = connect();
require('./2.middle')(app);
require('./2.route')(app);

app.listen(8080, function() {
  console.log('server in running at %d port.' ,8080);
})
```

- 升级7：模板
  - 定义：模板引擎是为了使用户界面与业务数据分离而产生的，用于网站的模板引擎就会生成一个标准的HTML文档
  - 原理：置换型模板引擎是将指定模板内容(字符串)中的特定标记(子字符串)替换一下便生成了最终需要的业务数据(比如网页)

- 模板原理
  - 模板分为普通字符串和表达式，表达式需要继续chu里，与shu局关联后变成一个具体的值，最终将字符串和变量连成一个最终的字符串。

> 我靠，教程里写模板引擎竟然用了`Function()`构造函数，太危险了吧。还好我看了es6，也看过《JS语言精粹》打死不用，换个es6的写法，我就是不按套路出牌。

- 模板引擎工作要求：
  - 读模板文件
  - 遇到`<% xxx... %>`视作为执行JavaScript代码
  - 遇到`<%= ... %>`则输出JavaScript表达式的值

```javascript
///// render.js
var fs = require('fs');

module.exports = function redner(app) {
  app.use(function(req, res, next) {
    res.render = function(filename, obj) {
      fs.readFile(filename, 'utf8', function(err, str) {
        res.send(compile(str, obj));
      });
    }
    next(); // 继续下一个中间件
  });
}

function compile(template, obj) {
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;

  template = template // 这里预置替换内容中$表示正则匹配的到索引为1的字符串,其实也就是表达式
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  var script =
    `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return eval(script)(obj);
}

////////注册模板引擎
require('./2.render')(app);

////////使用模板引擎
res.render('./index.szy', { articles: articles })
```

- 升级8：路由升级改造
  - 原来路由不能匹配首页`/`，现在通过在注册中间件时添加`isRoute`属性，如果为路由中间件再进行一次判断

```javascript
proto.use = function (route, fn) {
  var handle = fn;
  var path = route;
  var isRoute = true;
  // 如果第一个参数不是字符串，那么可能是函数。
  // 那就说明没传路由，直接传业务操作函数，其实就是404操作之类的
  if (typeof route !== 'string') {
    // 那么就让第一个参数等于handle
    handle = route;
    // 默认为根目录
    path = '/';
    // 功能型中间件不是路由
    isRoute = false;
  }
  this.stack.push({ handle: handle, path: path, isRoute: isRoute });
}

proto.handle = function (req, res) {
  // 就目前而言stack数组里有这些东西
  // [
  //   { 'path': '/', 'handle': '给req上添加query等共有属性的中间件' },
  //   { 'path': '/', 'handle': '给res添加send方法的中间件' },
  //   { 'path': '/', 'handle': '给res添加render方法的中间件' },
  //   { 'path': '/list', 'handle': '路由'},
  //   { 'path': '/article', 'handle': '路由'},
  //   { 'path': '/', 'handle': '最终404路由'},
  // ]
  // 每一个请求，都会进该函数一次，然后递归调用上面这6个中间件
  var stack = this.stack;
  var index = 0;
  function next() {
    var layer = stack[index++];
    var route = layer.path;
    var handle = layer.handle;
    var isRoute = layer.isRoute;
    // 如果handle不是函数就置空指针
    handle = typeof handle === 'function' ? handle : null;

    var path = url.parse(req.url).pathname;

    // 关于路由的匹配，不管req还是res都要走一遭
    if (path.startsWith(route)) {
      if (isRoute) {
        // 如果是路由型中间件值再比较一次且不再执行后续的路由中间件
        if(path === route) {
          handle(req, res, null);
        } else {
          next();
        }
      } else {
        handle(req, res, next);
      }
    } else {
      next();
    }
  }
  next();
}
```

- 升级8：静态资源服务中间件
  - 在项目根目录下新建public文件夹，客户端请求过来先过public文件夹里找文件，没有再`next()`下一个中间件。
  - 读取文件是用可读流读文件，如果触发可写流的`error`事件就next，否则就pipe到res里。

```javascript
"use strict";

var fs = require('fs');
var path = require('path');

module.exports = function (app) {
  app.use(function (req, res, next) {
    var rs = fs.createReadStream(path.join(__dirname, 'public', req.path));
    rs.on('error', function () {
      // 如果取静态文件夹读文件没读到触发error事件，则调用next()方法
      next();
    });
    rs.pipe(res);
  });
}
```

- 升级9：路由升级改造
  - 再次升级handle方法，添加错误处理中间件，其运行原理是只要在数组中某个索引中间件报错后在next(arg)方法传递错误信息后，不再执行后续的正常中间件而是找到最近一个错误处理中间件。

```javascript

```

----------

## 课时18：express

- Express是一个简洁、灵活的node.js Web应用开发框架，它提供yi系列强大de 功能。
  - 模板解析
  - 静态文件服务
  - 中间件
  - 路由控制

- 路由控制
  - `get()`方法：根据请求路径来处理客户端发出的GET方法`app.get(path, function(req, res));`
  - `app.all()`方法：可以匹配到所有的HTTP方法，也就是说它可以过滤s偶有路径的请求

- 中间件
  - 中间件(middleware)就是处理HTTPS请求的**函数**

```javascript
var express = require('express');
var app = express();

////////express 中间件测试

// 中央发100元红包
app.use(function(req, res, next) {
  req.redbag = 100;
  next();
});

// 过到省级关卡时被扣20元
app.use(function(req, res, next) {
  req.redbag -= 20;
  next();
});

// 过到市级关卡时被扣30元
app.use(function(req, res, next) {
  req.redbag -= 30;
  next();
});

// 过到村级关卡时被扣40元
app.use(function(req, res, next) {
  req.redbag -= 40;
  next();
});

app.all('*', function(req, res) {
  res.send('到你手上的红包：￥' + req.redbag + '.00元');
})

app.listen(8080, function() {
  console.log('server is running at %d port.', 8080);
})
```

- express中间件特点：
  1. 每个中间件都可以控制流程是否继续执行；
  2. req、res 对于不同中间件中都是相同对象
  4. 如果出错了，转交错误处理中间件执行权(不再执行后续正常的中间件)
  5. 一个中间件处理完，才可以把响应数据再传递给下一个中间件
  6. 如果调用回调函数的`next`参数表示将请求数据传递给下一个中间件

- express为我们封装的请求属性
  - req.host 返回请求头里取得 主机名
  - req.path 返回请求的URL的路径名
  - req.query 是一个可获取客户端get请求路径参数的对象属性，包含着解析过的 **请求参数对象**， 默认为空对象{}
  - req.params 是一个路径参数 对应的对象

- send()方法会向浏览器发送一个相应信息，并可以智能处理不同类型的数据。并再输出相应时会进行一些智能的设置，比如HEAD信息、HTTP缓存支持等等。
  - 当参数为一个String时，Content-Type默认设置为"text/html"
  - 当参数为Array或Object时，则直接返回一个JSON
  - 不能使用数组作为参数，如果要返回状态码要用 res.sendStatus() 方法

### 模板

1. 指定渲染模板引擎
    app.set('view engine', 'ejs');

2. 设置放置模板文件的目录
    app.set('view', path.join(__dirname, '/'));

3. render函数，对网页模板进行渲染。在渲染模板时 locals 可为其模板传入变量值，在模板中就可以调用所传变量了
    res.render(view, [locals], callback);

4. 原理：模板中能执行js表达式，还是输出js表达式的值

```javascript
// 如果想用ejs去渲染html文件也可以，或者说用ejs后缀的文件写代码没提示改html
var express = require('express');
var path = require('path');
var app = express();

// app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
app.set('views', path.join(__dirname, '/views'));
app.get('/', function(req, res) {
  res.render('05', {name: 'jerry', age: 88});
})

app.listen(8088);
```

### 静态文件服务中间件

`express.static`是 `Express` 内置的唯一一个中间件。是基于serve-static开发的，负责托管Express应用内的静态资源文件。 

- 如果要在网页中加载静态资源文件(js/css/img)，就需要另外指定一个 存放静态文件的目录`public`。
- 每个应用可配置有多个静态目录
- `app.use(express.static(path.join(__dirname, 'public')));`
- 简单模拟Express.static中间件的实现代码

```javascript
app.use(function(req, res, next) {
  var rs = fs.createReadStream(path.join(__dirname, 'public', req.path));
  rs.on('error', function() {
    next();
  })
  rs.pipe(res);
});
```

### 请求体参数处理中间件

- req.body 属性解析客户端的post请求参数，通过它可以获取请求路径携带的参数值。
  -  在`body-parser`中间件里有不同解析函数对应不同的格式，如form表单，json等

```js
var bodyParser = require('body-parser');
app.use(bodyParser.json());  // 解析json请求体
app.use(bodyParser.urlencoded({extended: true})); // 解析form表单请求体，extended表示继承node默认querystring解析器
```

- 在post请求如果用`form-data`格式传输时，`body-parser`无法解析，因为`res.headers['content-type']`格式为`multipart/form-data`。
- 但是`x-www-urlencoded`是可以处理

----------

## 课时19：cookie

- http特点：web应用是基于HTTP协议的，而HTTP协议恰恰是一种无状态协议
- cookie：是一种网站为了辨别用户身份，进行绘画跟踪而存储在客户端上的数据
  - 通过响应头向客户端设置cookie `Set-Cookie: name=jerry`
  - 读取客户端过来的cookie `Cookie：key1=val1;key2=val2`

```js
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/', function (req, res) {
  if (req.cookies.visited) {
    res.send('欢迎老朋友');
  } else {
    res.cookie('visited', 1, { maxAge: 10 * 60 * 1000 });
    res.send('欢迎新朋友');
  }
});

app.listen(8080);
```

- 手写实现Express_cookieParser中间件

```js
var express = require('express');
var querystring = require('querystring');
// var cookieParser = require('cookie-parser');

var app = express();

// app.use(cookieParser());
app.use(function (req, res, next) {
  console.log(req.headers.cookie);
  req.cookies = querystring.parse(req.headers.cookie, '; ', '=');
  res.myCookie = myCookie;
  next();
});

app.get('/', function (req, res) {
  if (req.cookies.visited) {
    res.send('欢迎老朋友');
  } else {
    res.myCookie('visited', 1, { path: '/', expires: new Date(Date.now() + 5000) });
    res.send('欢迎新朋友');
  }
});

app.get('/a', function (req, res) {
  if (req.cookies.visited) {
    res.send('欢迎老朋友');
  } else {
    res.cookie('visited', 1, { path: '/a', expires: new Date(Date.now() + 4000) });
    res.send('欢迎新朋友');
  }
});

function myCookie(name, val, options) {
  var opts = options || {};
  var parts = [name + '=' + val];
  if (opts.maxAge) {
    parts.push('Max-Age=' + Number(opts.maxAge));
  }
  if (opts.domain) {
    parts.push('Domain=' + opts.domain);
  }
  if (opts.path) {
    parts.push('Path=' + opts.path);
  }
  if (opts.expires) {
    parts.push('Expires=' + opts.expires.toUTCString());
  }
  if (opts.httpOnly) {
    parts.push('HttpOnly');
  }
  if (opts.secure) {
    parts.push('Secure');
  }
  // 图方便调用哈express封装的额方法
  this.append('Set-Cookie', parts.join('; '));

  return this;
}

app.listen(8080);
```

- res.redirect()方法原理

```js
res.statusCode = 302;
res.setHeader('Location', '/');
res.end();
```

- 手写前端版cookie的set与get

- 关于`cookie-parser`中间件开启后，有关singed属性的demo
  - 当设置某个cookie的键值对时，启用的`{ signed: true }`属性后，原req.cookies就不再存这个加密型cookie的键值对了
  - 而是在req.singedCookies里存放

```js
app.get('/login', function (req, res) {
  res.cookie('username', req.query.username, { signed: true });
  res.cookie('isLogin', 1);
  res.redirect('/user');
});

app.get('/user', function (req, res) {
  if (req.cookies.isLogin === '1') {
    res.end(req.signedCookies.username);
  } else {
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
  }
});
```

----------

## 课时20：session

- Demo1: 关于Express中session基本使用

```js
var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({
  secret: 'szy20170909',
  cookie: { maxAge: 60 * 1000 * 30 },
  resave: true,
  saveUninitialized: true
}));

app.get('/', function(req, res) {
  if (req.session.sign) {
    req.session.count = req.session.count + 1;
    res.send('welcome <strong>' + req.session.name + '</strong>, 欢迎你第' + req.session.count + '次登陆。');
  } else {
    req.session.sign = true;
    req.session.name = 'jerry';
    req.session.count = 1;
    res.send('欢迎登陆!');
  }
});

app.listen(8080);
```

- Demo2: **关于手写实现Express-Session中间原理demo(内存型存储方式)**

```js
var uuid = require('uuid/v4');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();

app.use(cookieParser());
app.use(mySession());

app.get('/', function (req, res) {
  if (req.session.sign) {
    req.session.count = req.session.count + 1;
    res.send('welcome <strong>' + req.session.name + '</strong>, 欢迎你第' + req.session.count + '次登陆。');
  } else {
    req.session.sign = true;
    req.session.name = 'jerry';
    req.session.count = 1;
    res.send('欢迎登陆!');
  }
});

app.listen(8080);

//手写Express session中间件
function mySession(options) {
  var data = {};
  options = Object.assign({
    rolling: false,
    resave: true,
    genid: uuid,
    name: 'connect.sid',
    cookie: { maxAge: 60 * 60 * 1000 },
    saveUninitialized: true
  }, options);
  // 要返回中间件格式的函数
  return function (req, res, next) {
    // 如果选项中有自定义id生成函数就用，没有就用uuid/v4
    var id = req.cookies[options.name] || options.genid();
    if (options.resave) {
      res.cookie(options.name, id, options.cookie);
    }
    req.session = data[id] || {};
    // 当响应结束时，要把在处理函数中修改的session保存回data里
    res.on('finish', function () {
      // 仅当res.session有属性或saveUninitialized为true
      if (Object.keys(req.session) > 0 || options.saveUninitialized) {
        data[id] = req.session;
      }
    });
    next();
  }
}
```
- Demo3: 手写实现Session扩展插件，文件型存储的Store

```js
///////app.js
var express = require('express');
var session = require('express-session');
var FileStore = require('./fileStore')(session);

var app = express();

app.use(session({
  secret: 'szy20170909',
  cookie: { maxAge: 60 * 1000 * 30 },
  resave: true,
  saveUninitialized: true,
  store: new FileStore({ dir: './sessions' })
}));

app.get('/', function (req, res) {
  if (req.session.sign) {
    req.session.count = req.session.count + 1;
    res.send('welcome <strong>' + req.session.name + '</strong>, 欢迎你第' + req.session.count + '次登陆。');
  } else {
    req.session.sign = true;
    req.session.name = 'jerry';
    req.session.count = 1;
    res.send('欢迎登陆!');
  }
});

app.listen(8080);
///////////////

//fileStore.js
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');

// 关于如何实现express-session中的抽象接口需要看源码readme
module.exports = function (session) {
  var Store = session.Store;
  function FileStore(opts) {
    var options = Object.assign({}, { dir: '.' }, opts);
    this._dir = options.dir;
    mkdirp.sync(this._dir); // 没有就创建
  }
  // 第一版fileStore为内存型
  // var data = {};

  // 拼接FileStore的原型链
  FileStore.prototype.__proto__ = Store.prototype;
  FileStore.prototype.get = function (sid, callback) {
    // callback(null, data[sid]);
    // 第二版：升级为文件型fileStore
    var pathname = path.join(this._dir, sid);
    fs.exists(pathname, function (exists) {
      if (exists) {
        fs.readFile(pathname,{encoding:'utf8'},function(err, data) {
          // 需要以utf8读取后转对象回传
          callback(null, JSON.parse(data));
        })
      } else {
        callback(null,null);
      }
    })
  }
  FileStore.prototype.set = function (sid, session, callback) {
    // data[sid] = session;
    // callback();
    fs.writeFile(path.join(this._dir,sid),JSON.stringify(session),callback)
  }
  FileStore.prototype.destroy = function (sid, callback) {
    // delete data[sid];
    // callback();
    fs.unlink(path.join(this._dir, sid), callback);
  }
  return FileStore;
}
```

- 关于session-store中间件实现步骤及原理
  1. 第一步，说什么写扩展中间件，我咋直到怎么写，看看express-session中间件的readme.md，一切答案都在其中！
  2. 我们看到原文 `Session Store Implementation` 这个h2章节中，它是这么说道的：Every session store must be an EventEmitter and implement specific methods，大概是说每个session-store需继承`EventEmitter`，且还需实现一些特殊的方法，说白了我们写的这个中间件要实现这个接口
  3. 又是`EventEmitter`，又要实现特殊方法，好麻烦，我们直接弄个构造函数，把它原型Function的原型上指向Object的连接(`FileStore.prototype.__proto__`)剪短了，拼接上`require('express-session').session`的原型链就完成了，妥妥的
  3. 按照文档指示，我们分别实现三个方法：`store.get(sid, callback)`、`store.set(sid, session, callback)`、`store.destroy(sid, callback)`
  4. 对了，在get方法时，我们读取到的数据一定要转换成对象后再交给`express-session`否则抛异常

----------

## 课时21： Referer

- 图片防盗链
  - 盗链是指服务提供商自己不提供服务的内容，直接在自己的网站上向最终用户提供其它服务提供商的服务内容
  - 从一个网页跳转，或者网页引用到某个资源文件时，HTTP请求中带有Referer表示来源网页的URL
  -  用浏览器直接访问图片网址时是没有Referer的

- Referer小栗子一个：

```js
var express = require('express');
var path = require('path');

var app = express();

app.use('/imgs', function (req, res, next) {
  var referer = req.headers.referer;
  var whiteList = ['a.szy.com']; // 白名单功能
  // 在Express中，如果访问本域的本地文件时referer是undefined的
  // 那就允许访问资源文件
  if (!referer) {
    return next();
  }
  var refererHost = require('url').parse(referer).host.split(':')[0];
  // 如果静态资源域名与请求地址域名相同就给访问了
  if (refererHost === req.host || whiteList.indexOf(refererHost) !== -1) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'imgs', 'xx.jpg'));
});

app.use(express.static(__dirname));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'img.html'));
});

app.listen(8080);
```

----------

## 课时22：多语言

- 请求头 `Accept-Language:en, zh-CN;q=0.8,zh;q=0.6`
    - q参数代表前者的权重 
- 响应头 `Content-Language: en`

```js
var express = require('express');
var path = require('path')
var app = express();

// Accept-Language: zh-CN,zh;q=0.8,en-US;q=0.6,en;q=0.4,zh-TW;q=0.2,ja;q=0.2,fr;q=0.2

function checkLanguage(languages) {
  function parse(str) {
    if (!str) {
      return [];
    }
    return str
      .toLowerCase()
      .split(',')
      .map(function (lan) {
        var parts = lan.split(';');
        return { name: parts[0], q: parts[1] || 1 }
      })
      .filter(function (lang) {
        return languages.indexOf(lang.name) !== 1;
      })
      .sort(function (prev, next) {
        return next.q - prev.q;
      })
      .map(function (item) {
        return item.name;
      })
  }
  return function(req, res, next) {
    var acceptLanguages = req.headers['accept-language'];
    console.log('accept-language:',acceptLanguages);
    req.acceptLanguages = parse(acceptLanguages)[0] || languages[0];
    next();
  }
}

app.use(checkLanguage(['zh-CN', 'en']));

app.get('/', function (req, res) {
  res.setHeader('Content-Language', req.acceptLanguages);
  res.sendFile(path.join(__dirname,req.acceptLanguages, 'index.html'));
})

app.listen(8080);
```

> 测试: 
    `curl -H 'Accept-Language: zh-CN' -v http://127.0.0.1:8080/`
    `curl -H 'Accept-Language: en' -v http://127.0.0.1:8080/`

- 算法实现原理：
  1. 1
  2. 2
  3. 3
  4. 4
  5. 5
  6. 6

----------

## 课时23-1：用户代理

- 客户端检测
  - User Agent中文名为用户代理，是HTTP协议中的一部分
  - 是一种向访问网站提供你所使用的浏览器类型及版本、操作系统及版本、浏览器内核等信息的识别
  - 通过这个标识，用户所访问的网站可以显示不同的排版从而为用户提供更好的体验或者进行信息统计
  - 识别是为手机客户端的 只要识别User-Agent中是否有"Mobile"字段即可

- 栗子一枚：

```js
var express = require('express');
var path = require('path');
var agentParser = require('user-agent-parser');
var app = express();
var visit = {mobile:0,other:0};

// "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.79 Safari/537.36"

app.use(function(req,res,next){
   req.agent = agentParser(req.headers['user-agent']||'');
    next();
});

app.get('/',function(req,res){
    console.log(req.agent);
   if(req.agent.device.type == 'mobile'){
       visit.mobile = visit.mobile+1;
   }else{
       visit.other = visit.other+1;
   }
   res.send(visit);
});

app.listen(8080);
```

----------

## 课时23-2：代理服务器

- 多个域名公用80端口
  - 虚拟主机是把一台真实的物理电脑主机分割成多个逻辑存储单元，每个单元都具有单独域名和相同的端口
  - 代理一般分为正向代理和反向代理
    - 整向代理的典型用途是在防火墙内的局域网客户端提供访问Internet的途径
    - 反向代理的典型用途是将防火墙后面的服务器提供给Internet用户访问

```js
var express = require('express');
var proxy = require('http-proxy').createProxyServer();

var app = express();

function proxyPass(config) {
    return function (req, res) {
        var target = config[req.hostname];
        proxy.web(req, res, {
            target: target
        });
    }
}

app.use(proxyPass({
    'a.szy.com': 'http://localhost:3000',
    'b.szy.com': 'http://localhost:4000'
}));

app.listen(8080);

// a.szy.com
var app3000 = express();
app3000.get('/', function (req, res) {
    res.end('3000');
});
app3000.listen(3000);

// b.szy.com
var app4000 = express();
app4000.get('/', function (req, res) {
    res.end('4000');
});
app4000.listen(4000);
```

----------

## 课时24：修改事件缓存

- 缓存作用
  - 减少了冗余的数据传输，节省了流量
  - 减少了服务器的负担，大大提高了网站的性能
  - 加快了客户端加载网页的速度

- 通过最后修改时间来判断缓存是否有用
  - Last-Modified：响应时告诉客户端此资源的最后修改时间
  - If-Modified-Since: 当资源过期时(使用 `Cache-Control` 标识的max-age)，发现资源具有 `Last-Modified` 声明，则再次向服务器请求时带上头 `If-Modified-Since` 
  - 服务器收到请求后发现有头 `If-Modified-Since` 则与被请求资源的最后修改时间进行对比。若最后修改时间较新，就说明资源被改动过，则相应最新的资源内容并返回`200`状态码
  - 若最后修改时间和 `If-Modified-Since` 一样，则说明资源没有修改，则相应304表示未更新，告知浏览器继续使用所保存的缓存文件

- 最后修改时间存在的问题
  - 某些服务器不能精确得到文件的最后修改时间，这样就无法通过最后修改时间来判断文件是否更新了
  - 某些文件的修改非常频繁，在秒以下的时间内进行修改 `Last-Modified` 只能精确到秒
  - 一些文件的最后修改时间改变了，但是内容并未改变。我们不希望客户端认为这个文件修改了
  - 如果同样的一个文件位于多个CDN服务器上的时候内容虽然一样，修改时间却不一样

- ETage
  - ETage是 **实体标签** 的缩写，根据实体内容生成的一段 **hash** 字符串，可以表示自愿的状态。当资源发送改变时，ETag也随之发生变化。ETag是Web服务端生成的，然后发给浏览器客户端的。
  - 客户端向判断缓存是否可用可以先获取缓存中文件的ETag，然后通过 `If-None-Match` 发送请求给Web服务端询问此缓存是否可用
  - 服务端收到请求，将服务端中的此文件的ETag和请求头中的 `If-None-Match` 相比较，如果值时一样的，说明缓存还是最新的，Web服务端将发送 `·`304 Not Modified`响应码给客户端表示缓存过未改动，可以继续使用。
  - 如果不一样，则Web服务端将发送该文件的最新版本给浏览器客户端

- 关于使用`Last-Modified`的小栗子：
  1. 截取请求头中的'if-modified-since'
  2. 使用异步获取请求文件mtime后比较
  3. 相同的话就发304
  4. 不相同就先设置'Last-Modified'响应头再发文件

```js
var fs = require('fs');
var express = require('express');
process.chdir(__dirname);
var http = require('http');

/**
 * @param {string} filename 
 * @param {IncomingMessage} req 
 * @param {stream} res 
 */
function send(filename,req, res) {
  // 取得文件最后修改时间
  var lastModifiedSince = new Date(req.headers['if-modified-since']); // 注意，服务端取键名要全小写！
  fs.stat(filename, function(err, stat) {
    if(stat.mtime.getTime() === lastModifiedSince.getTime()) {
      // res.sendStatus(304).end(); // 又不是express
      res.statusCode = 304;
      res.end();
    } else {
      res.writeHead(200, {'Last-Modified': stat.mtime.toGMTString()});
      fs.createReadStream(filename).pipe(res);
    }
  })
}

http.createServer(function(req, res) {
  if(req.url !== '/favicon.ico') {
    var filename = req.url.slice(1) || 'index.html'; // index.html 不要那个横杠杠
    send(filename, req, res);
  } else {
    res.statusCode = 404;
    res.end('404');
  }
}).listen(8080);
```

- 关于使用Etag的小栗子：
  1. 创建计算hash的方法
  2. 在send方法前设卡并获取`if-none-match`的值
  3. 如果相等就转发304
  4. 如果不相等先设置响应头`Etag`后再向客户端发送静态文件

```js
var fs = require('fs');
var http = require('http');
var crypto = require('crypto');
var express = require('express');

process.chdir(__dirname);

function getHash(str) {
  var shasum = crypto.createHash('sha1');
  return shasum.update(str).digest('base64');
}
/**
 * @param {string} filename 
 * @param {IncomingMessage} req 
 * @param {stream} res 
 */
function send(filename, req, res) {
  // 取得文件最后修改时间
  var ifNoneMAtch = req.headers['if-none-match']; // 注意，服务端取键名要全小写！

  fs.readFile(filename, function (err, data) {
    var sha1 = getHash(data.toString());
    if (sha1 === ifNoneMAtch) {
      res.statusCode = 304;
      res.end();
    } else {
      res.writeHead(200, { 'Etag': sha1, 'Cache-Control': 'max-age=3600' });
      fs.createReadStream(filename).pipe(res);
    }
  })
}

http.createServer(function (req, res) {
  if (req.url !== '/favicon.ico') {
    var filename = req.url.slice(1) || 'index.html'; // index.html 不要那个横杠杠
    send(filename, req, res);
  } else {
    res.statusCode = 404;
    res.end('404');
  }
}).listen(8080);
```

- 如果干脆不发请求
 - 浏览器会将文件缓存到Cache目录，第二次请求时浏览器会先检查Cache目录下是否含有该文件，如果有，并且还没到 `Expires` 设置的时间，及文件还没过期，那么此时浏览器将直接从 `Cache` 目录中读取该文件，而不再发送请求
 - `Expires`是服务器响应消息头字段，在响应 htpp 请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存读取数据，而无需再次请求
 - `Cache-Control` 与 `Expires` 的作用一致，都是致命当前资源的有效期，控制浏览器是否直接从浏览器缓存读取数据还是重新发送请求到服务端取数据，如果设置相同设置的话，其优先级高于 `Expires` 

- `Cache-Control`是指请求和响应遵循的缓存机制，以秒为单位，0表示不缓存
- `Expires` 缓存过期的时间（绝对时间）

----------

## 课时25 Basic认证

- 小栗子一个，感觉不是很实用了

```js
var http = require('http');

http.createServer(function(req, res) {
  var auth = req.headers['authorization'];
  if (auth) {
    var area = auth.slice(6);
    var parts = new Buffer(area, 'base64').toString().split(':');
    if(parts[0] + parts[1] === 'admin123') {
      return res.end('welcome');
    }
    res.setHeader('Content-Type', 'text/plain; charset=utf-8;');
    res.end('认证失败');
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="secure Area"');
    res.writeHead(401);
    return res.end();
  }
}).listen(8080);
```

----------

## 课时26 MongoDB

- MongoDB 是由C++语言编写的，是一个基于分布式文件存储的开源数据库系统。在高负载的情况下，添加更多的节点，可以保证服务器性能。
- MongoDB 旨在为WEB应用提供可扩展的高性能数据存储解决方案。
- MongoDB 将数据存储为一个文档，数据结构由键值对组成。MongoDB文档类似于JSON对象。字段值可以包含其他文档、数组及文档数组。

- MongoDB 的主要特点：
    1. MongoDB提供了一个面向文档存储，基本得思路就是将原来“行”的概念换成更加灵活的“文档”模型。一条记录可以表示非常复杂的层次关系。
    2. MongoDB支持丰富的查询表达式。查询执行使用JSON形式的标记，可轻易查询文档中内嵌的对象及数组。
    3. 非常容易扩展。面对数据量的不断上涨；通常有两种方案，一种是购买更好的硬件，另一种是分散数据，进行分布式扩展。前者有着非常大的缺点，因为硬件通常是由物理极限的，当达到极限以后，处理能力就不能再进行扩展了。所以建议的方式是使用集群进行扩展。MongoDB所采用的面向文档的数据模型使其可以自动在多态服务器之间分割数据。它还可以平衡集群的数据和负载，自动重排文档。
    4. MongoDB支持各种编程语言：Ruby、Python、Java、C++、PHP、C#等多种。
    5. 丰富的功能。包括索引、存储JavaScript、聚合、固定集合、文件存储等。
    6. 方便的管理，除了启动数据库服务器以外，几乎没有声明必要的管理操作。管理集群只需要知道有新增的节点，就会自动继承和配置新节点。

- MongoDB的数据库
    - 一个mongodb中可以建立多个数据库
    - MongoDB的单个实例可以容纳多个独立的数据库，每个都有自己的集合和权限，不同的数据库也放置在不同的文件中。
    - 数据库也通过名字来标识。数据库名称需是满足一下条件的任意UTF-8字符串：
        1. 不能是空字符串
        2. 不得含有 空格符 `.` `、` `$` `/` `\` `\0`(空字符)
        3. 应全部小写
        4. 最多64字节
    - 有一些数据库名是保留的，可以直接访问这些有特殊作用的数据库：
        1. admin: 从全县的角度来看，它其实是“root”数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的全县。一些特定的服务端命令也只能从这个数据库运行，比如列出所有数据库或者关闭服务器。
        2. local: 这个数据库永远不会被复制，可以用来存储限于本地单台服务器的任意集合。
        3. config: 当MongoDB用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

- MongoDB的文档
    - 文档是MongoDB中最新和的概念，是其核心单元，我们可以讲文档类必成关系型数据库中的每一行数据。
    - 多个键及其关联的值有序的防止在一起就是文档。MongoDB使用了BSON这种结构来存储数据和网络数据交换。
    - BSON数据可以理解为在JSON的基础上添加了一些json中没有的数据类型。
    - 如果我们会JSON，那么BSON我们就已经掌握了一半。
    - 文档中需要注意的是：
        1. 文档中键值对都是有序的；
        2. 文档中的值不仅可以是在双引号里面的字符串，还可以是其他几种数据类型(甚至可以是整个嵌入的文档)；
        3. MongoDB区分类型和大小写；
        4. MongoDB的文档不能又重复的键；
        5. 文档的键是字符串。除了少数例外情况，键可以使用任意UTF-8字符。
    - 文档键命名规范：
        1. 键不能含有`\0`(空字符)。因为这个字符用来表示键的结尾。
        2. `.`和`$`有特别的意义，只能在特定环境下才能使用。
        3. 以下划线`_`开头的键都是保留的(并非有严格要求)。

- MongoDB的集合
    - 集合就是一组文档的组合。如果将文档类必成数据库中的行，那么集合就可以类比成数据库的表。
    - MongoDB中集合是无模式的，也就是说集合中存储的文档的结构可以是不同的，比如某个文档三个键值对，另外一个文档却又五个键值对。
    - 合法的集合名：
        1. 集合名不能是空字符串
        2. 集合名不能含有`\0`(空字符)，这个字符表示集合名的结尾
        3. 集合名不能以"system."开头，这是为系统集合保留的前缀
        4. 用户创建的集合名字不能包含保留字符。有些驱动程序的确支持在集合名里包含，这是因为某些系统生成的集合中包含该字符。除非你要访问这种系统创建的集合，否否则千万不要在名字里出现`$`

-  MongoDB 的数据类型

|  name        |         description        |
| :--:         |            :--:            |
| String       |          字符串             |
| Interger     |         整形数值            |
| Boolean      |         布尔值              |
| Double       |         双精度浮点值         |
| Min/Max keys | 将一个值与BSON(二进制的JSON)元素的最低值和最高值相对比 |
| Arrays       | 用于将数组或列表或多个值存储为一个键 |
| Timestamp    | 时间戳                      |
| Object       | 用于内嵌文档 |
| Null         | 用于创建空值 |
| Symbol       | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date         | 日期时间。用 UNIX 时间格式来存储当前的日期或事件。 |

- MongoDB
  - db.collection.save() 和 db.collection.insert() 区域在于前者保存或添加，后者仅添加如有重复报错
  - 查询条件 and 直接填值，or 需用 `$or` 操作符

> MongoDB 我在WinSer2008R2、阿里云Ubtune都配过，就这样。

> MongoDB 我在WinSer2008R2、阿里云Ubtune都配过，就这样。

----------

## 课时27 mongoose

- mongoose是MongoDB的一个对象模型工具，是基于node-mongodb-native开发的MongoDB nodejs驱动，可以异步的环境下执行。同时它也是针对MongoDB操作的一个对象模型库ORM，封装了nodejs驱动，可以异步的环境下执行。同时它也是针对MongoDB对文档的一些增删改查等常用方法，让NodeJS操作MongoDB数据库变得非常灵活简单。

1. install
2. `var mongoose = require('mongoose');`
3. `var db = mongoose.connect('mongodb://user:pwd@host:port/database');`
4. 监听`open`事件判断是否连接成功

### 集合

MongoDB是一个对象数据库，没有表、行的概念，也没有固定的模式和结构，所有的数据以Document(以下简称文档)的形式存储(Document，就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组、甚至是一个嵌套的文档)。

在MongoDB中，多个Document可以组成Collection(简称集合)，多个集合又可以组成数据库。

我们想要操作MongoDB数据，那就得先要具备上面所说的包含数据的“文档”，文档又是什么意思呢？

文档----是MongoDB的核心概念，是键值对的一个有序集，在JavaScript里文档被表示成对象。同时它也是MongoDB中数据的基本单位，非常类似于关系型数据库中的行，但更具表现力。

集合----由一组文档组成，如果将MongoDB中的一个文档比喻成关系型数据库中的一行，那么一个集合就相当于一张表。

如果我们要通过mongoose去创建一个“集合”并对其进行增删改查，该怎么实现呢，那就得先了解Schema(数据属性模型)、Model、Entity。

### Schema

> schema是一种以文件形式存储的数据库模型骨架，无法直接通往数据库端，也就是说它不具备对数据库的操作能力，仅仅只是数据库模型在程序片段中的一个表现，可以说是数据库属性模型(传统意义的表结构)，又或者是“集合”的模型骨架。

- 以下是一个简单的schema。基本属性类型有：字符串、日期型、数值型、布尔型(Boolean)、null、数组、内嵌文档等。

```js
var PersonSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number, default: 0 },
  time: { type: Date, defaule: Date.now },
  email: { type: String, defaule: '' }
});
```

### Model

> Model----由Schema构造生成的模型，除了Schema定义的数据库骨架外，哈具有数据库操作的行为，类似于管理数据库属性、行为的类。

- 我们可以使用Schema来创建Model：

```js
var db = mongoose.connect("mongodb://host:port/databse");
var PersonModel = db.model("person", "PersonSchema");
```

- person: 数据库中集合名称，当我们对其添加数据时，如果person已经存在，则会保存到其目录下，如果未存在，则会创建person集合，然后再保存数据。
- 拥有了Model后，我们也就拥有了操作数据库的能力
- 如果你相对某个集合有所作为，那就交给Model模型来处理吧，创建一个Model模型，我们需要指定两个东西：
    1. 集合名称
    2. 集合的Schema结构对象
- 只有满足上面两个条件后，我们才可以操作数据库。

### Entity

> Entity----由Model创建的实体，使用save()方法保存数据，Model和Entity都有能影响数据库的操作，但Model比Entity更具操作性。

- 使用Model创建Entity，如下所示：

```js
var personEntity = new PerosonModel({
  name: "jerry",
  age: 18,
  email: "jerry@nowhere.com"
});
console.log(personEntity.name); // -> jerry
```
- 创建成功后，Schema的属性就变成了Model和Entity的公共属性。

### 创建基础集合数据

```js
// 0. 根据数据库连接创建db的实例
var mongoose = require('mongoose');
var db = mongoose.connect("mongodb://host:port/databse");
db.connect.on('error', function(err) {
  consoel.log('数据库连接失败:', err.message);
});
db.connect.on('open', function(err) {
  consoel.log('数据库连接成功');
});

// 1. 定义Schema
var PersonSchema = new mongoose.Schema({
  name: { type: String },
  age: { type: Number, default: 0 },
  time: { type: Date, defaule: Date.now },
  email: { type: String, defaule: '' }
});

// 2. 根据Schema创建Model
var PersonModel = db.model("person", "PersonSchema");

// 3. 使用Model实例一个Entity
var personEntity = new PerosonModel({
  name: "jerry",
  age: 18,
  email: "jerry@nowhere.com"
});

// 4. 使用Entity方法将对象保存到数据库中
personEntity.save(function(err, doc) {
  if (err) return console.error(err.stack);
  console.log(doc);
});
```

### 小节

1. Schema: 数据库集合的模型骨架，或者是数据库属性模型传统意义的表结构；
2. Model: 通过Schema构造而成，除了具有Schema定义的数据库骨架外，还可以具体的操作数据库；
3. Entity: 通过Model创建的实例，它也可以操作数据库。

### 基础操作

- 查询: `obj.find(conditions, field, callback);`返回符合条件的一个、多个或空数组文档结果；
- 保存: Model调用`create()`方法，Entity调用`save()`方法；
- 更新: `obj.update(conditions, obj, callback)`，根据条件更新相关数据；
- 删除: `obj.remove(conditons, callback)`，更具条件删除相关数据。

### 简单查询

- find过滤查询：find查询时我们可以过滤返回结果所显示的属性个数
- findOne查询：只返回符合条件的首条文档数据
- findById查询：根据文档`_id`来查询文档

### 高级查询

- $gt/$lt(大于、小于)
- $ne(不等于)：其含义相当于不等于、不包含。$ne可以匹配到单个值，也可以匹配不同类型的值
- $in(包含)：和$ne操作符相反，$in相当于包含、等于
- $exists(是否存在)

### 游标操作

数据库使用游标返回find的执行结果。

客户端对游标的实现通车能够对最终结果进行有效的控制。可以限制结果的数量，略过部分结果，根据任意键按任意顺序的组合对结果进行各种排序，或者是执行其他操作。

最常用的查询选择就是限制返回结果的数量(limit函数)、忽略一点数量的结果(skip函数)以及排序(sort函数)。所有这些选项一定要在查询被发送到服务器之前指定。

- limit函数：在查询操作中，又是数据了很大，这时我们就需要对返回结果的数量进行限制，那么我们就可以使用limit函数，通过它来限制结果数量。

```js
// 限制数量：find(conditions, fields, options, callback);
Model.find({}, nullm {limit: 20}, function(err, docs) {
  console.log(docs.length);
});
// 如果匹配到的结果不到20个，则返回匹配数量的结果，也就是说limit函数指定的是上限而非下限。
```

- skip函数：skip函数和limit类似，都是对返回结果数量进行操作，不同的是skip函数的功能是略过指定数量的匹配结果，返回余下的查询结果。

```js
// 跳过数量：find(conditions, fields, options, callback);
Model.find({}, null, {skip: 4}, function(err, docs) {
  console.log(docs);
});
// 如果查询结果数量中少于4个的话，则不会返回任何结果。
```

- sort函数：将查询结果数据进行排序操作，该函数的参数是一个或多个键值对，键代表要排序的键名，值代表排序的方法，1是升序，-1是降序。

```js
// 结果排序：find(conditions, fields, options, callback);
Model.find({}, null, {sort: {age: -1}}, function(err, docs) {
  // 查询所有数据，并按照age降序返回docs
});
// sort函数可以根据用户自定义条件有选择性的来进行排序显示数据结果。
```

### 小节

1. limit函数：限制返回结果的数量
2. skip函数：略过指定的返回结果数量
3. sort函数：对返回结果进行有效排序

### 扩展方法

- ObjectId

存储在mongodb集合中的每个文档(document)都有一个默认的主键`_id`，这个主键名称是固定的，它可以是mongodb支持的任何数据类型，默认是ObjectId。该类型的值由系统自动生成，从某种意义上将是不会重复的。

MySQL等关系型数据库的主键都是自增的。按在分布式环境下，这种方法是不可行的，因为会产生冲突。为此，MongoDB采用了一个称之为ObjectId的类型来做主键。ObjectId是一个12个字节的BSON类型字符串。按照自己饿顺序，一次代表：
    - 4字节：UNIX时间戳
    - 3字节：表示运行MongoDB的机器
    - 2字节：表示生成此_id的进程
    - 3字节：由一个随机数开始的计数器生成的值
每一个文档都有一个特殊的键`_id`，这个键在文档所属的集合中是唯一的。

- Schema添加属性值

使用Schema时，我们可以先定义后添加属性

```js
var mongoose = require('mongoose');
var PersonSchema = new mongoose.Schema;
PersonSchema.add({name: 'String', email: 'String', age: 'Number'});
```

- Schema添加实例方法

有的时候，我们创建的Schema不仅要为后面的Model和Entity提供公共属性，还要提供公共方法。那我们就给Schema添加一个实例方法把：

```js
var mongoose = require('mongoose');
var personSchema = new mongoose.Schema({name: String});

personSchema.method('greet', function() {
  console.log('how are you');
});

var Person = mongoose.model('person', personSchema);
var person = new Person();

person.greet(); 
```

- Schema添加静态方法

来吧，整个Schema的静态方法玩玩：

```js
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://host:port/database');

var PersonSchema = new mongoose.Schema({
  name: {type: String},
  age: {type: Number, default: 0}
});

// 记得要在Schema要添加静态方法，这和在构造函数上加静态方法有什么区别嘛。
  return this.find({ name: name }, callback);
});

var PersonModel = db.model('person', PersonSchema);

PersonModel.findByName('hello', function(err, docs) {
  // docs
})
```

----------

## 课时52 gulp API

- gulp是可以自动化执行任务的工具。在平时开发的流程中，一定有一些任务需要手工的重复地执行，比如：
    - 把一个稳健拷贝到另一个位置
    - 把多个JS或CSS文件合并压缩，以减少网络请求数和网络流量
    - 把Sass或Less文件编译成CSS
    - 压缩图像文件，以减少网络浏览
    - 创建一个可以实现实时刷新页面内容的本地服务器等等

只要你觉得有些动作是要重复去做的，一般你就可以把这些动作创建成一个gulp任务，然后在指定的条件下，比如文件发生变化后，自动去执行这些任务。

### gulp特点

- `易于使用` 通过代码优于配置的策略，gulp会让简单的任务变简单，复杂的任务可管理。
- `快速构建` 利用 node.js 流的威力，你可以快速构建项目并减少频繁的IO操作。前一级的输出，直接变成后一级的输入，使得操作上非常简单。
- `高质量的插件` gulp严格的插件指南保证插件如你期望那样简洁地工作。
- `易于学习` 通过最少的API、掌握gulp毫不费力，构建工作尽在掌握。

![glup & grunt diff.png-81.8kB][13]

### 流的概念

- `Stream` 是nodejs各种对象实现的抽象接口；
- 比如标准输入是一个流，标准输出也是一个流；
- 所有 Stream 对象都是 EventEmitter 的实例，可以发射事件；
- 流是一种有起点和重点的数据传输手段。
    - 上一个的输出，是下一个的输入
    - 上一个的输出，是下一个的输入
    - 上一个的输出，是下一个的输入

![image.png-170.2kB][14]

### gulp中的流

- gulpz正是通过流和代码优于配置的策略来尽量简化任务便携的工作。
- 类似jquery里的链式操作，把各个方法串联起来构建完成的任务。
- 用gulp便携任务也可以看做是用Node.js编写任务。
- 当使用流时，gulp不需要生成大量的中间文件，只将最后的输出写入磁盘，整个过程因此变得非常快。

> 安装： `npm install gulp -g --registry=http://registry.npm.taobao.org`

### gulp运行

1. 创建配置文件

gulp的任务要放在一个叫gulpfile.js的文件里，先在项目的根目录下创建一个这样的文件。然后在这个文件的顶部添加如下这行代码：`var gulp = require('gulp');`

通过`require`可以把`gulp`模块引入当前项目并赋值给`gulp`变量
这样，`gulp`这个变量里面就会拥有`gulp`的所有方法

2. 创建gulp的任务

可以使用`gulp`的`task`方法。同样我们去创建一个叫default的任务，它要做的事情就是在控制台上输出“gulp is cool!”这个两个字。第一个参数是任务的名称，第二个参数是任务的定义，它是一个匿名函数。

```js
// gulpfile.js
var gulp = require('gulp');

gulp.task('default', function() {
  console.log('gulp is cool!')
});
```
执行gulp的任务: `gulp`

最后会返回：

```bash
[16:12:13] Using gulpfile ~/Git/zhufeng-node-practice/lesson52_gulp/gulpfile.js
[16:12:13] Starting 'default'...
gulp is cool!
[16:12:13] Finished 'default' after 204 μs
```
在`gulp`命令后可以跟任务的名称，不输入任务名称则模块会找defaule任务。
可以顺序执行很多任务：`gulp <task <othertask>`

### gulp命令行

- gulp只有你需要熟知的参数标记，其他所有的参数标记只在一些任务需要的使用才使用。
    - `-v` `--version`
    - `--gulpfile path` 手动指定一个gulpfile的路径，在有很多个gulpfile时有用。这也会将CWD设置到该gulpfile所在目录
    - `--cwd dirpath` 手动指定CWD。定义 gulpfile 查找的位置，此外，所有的响应的依赖(require)会从这里开始计算相对路径
    - `T` `--tasks` 会显示所指定 gulpfile 的 task 依赖树
    - `--tasks-simple` 会以纯文本的方式显示所载入的 fulpfile 中的 task 列表
    - `--color` 强制gulp 和 gulp插件显示颜色，即便没有颜色支持
    - `no-color` 强制不显示颜色，即便检测到有颜色支持
    - `--silent` 禁止所有的gulp日志 

### gulp的工作流程

- gulp.js工作方式

gulp的使用流程一般是：
首先通过gulp.src()方法获取到想要处理的文件流，
然后把文件铜鼓pipe方法导入到gulp的插件中，
最后把经过插件处理后的流再通过pipe方法导入到gulp.dist()中，
gulp.dest()方法则把流中的内容写入到文件中。

```js
var gulp = require('gulp');
gulp.src('script/src.js')    // 获取文件的流的api
    .pipe(gulp.dest('dist/dest.js'));  // 写文件的api
```

### gulp.src

使用gulp，仅需知道4个API即可：gulp.task(), gulp.src(), gulp.dest(), gulp.watch()，所以很容易掌握。

- gulp.src()

在gulp中，使用的是Node.js中的stream，首先获取到需要的stream，然后可以通过stream的pipe()方法把stream导入到你想导的地方，比如gulp的插件中，经过插件处理后的流又可以继续导入到其它插件中，当然也可以把流写入到文件中。所以gulp是以stream，
为媒介的，他不需要频繁的生成临时文件，这也是gulp的速度比grunt快的一个原因。再回到正题上来，gulp.src()方法正是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流（vinyl-file），这个虚拟文件对象中存储着原始文件的路径、文件名。内容等信息，这个我们暂时不用深入理解，你只需要简单的理解可以用这个方法来读取你需要操作的文件就行了。

`gulp.src(globs, [, options]);`

**globs**参数是文件匹配模式(类似正则表达式)，用来匹配文件路径(包括文件名)，当然这里也可以直接指定某个具体的文件路径。当有多个匹配模式时，该参数可以为一个数组。
**options**为可选参数。通常很不用。

### glob

- gulp内部使用了node-glob模块来实现其文件匹配功能。我们可以使用下面这些特殊的字符串来匹配我们想要的文件：

|  匹配符  |   说明  |
|  :--: |  :----   |
|    *    |  匹配文件路径中的0个或多个字符，但不会匹配路径分隔符，除非路径分隔符出现在末尾 |
|     **  |  匹配路径中0个或多个目录及其子目录，需要单独出现，即它左右不能又其它东西了。如果出现在末尾，也能匹配文件。
|  ？     |  匹配文件路径中一个字符(不会匹配路径分隔符) |
|  [...]  |  匹配方括号中出现的字符中的任意一个，当方括号中第一个字符为`^`或者`!`时，则表示不匹配方括号中出现的其他字符中的任意一个，类似js正则的语法  |
| !(pattern\|pattern\|pattern) | 匹配任何与括号中给定的任一模式都不匹配的  |
| ?(pattern\|pattern\|pattern) | 匹配括号中给定的任一模式0次或者1次，类似于js正则中的(pattern\|pattern\|pattern)? |
| +(pattern\|pattern\|pattern) | 匹配括号中给定的任一模式至少1次，类似于js正则中的(pattern\|pattern\|pattern)+ |
| \*(pattern\|pattern\|pattern) | 匹配括号中给定的任一模式0次或者1次，类似于js正则中的(pattern\|pattern\|pattern)\* |
| @(pattern\|pattern\|pattern) | 匹配括号中给定的任一模式1次，类似于js正则中的(pattern\|pattern\|pattern) |

### gulp.dest()

gulp.dest()方法是用来写文件的，其语法为：`gulp.dest(path, [,options])`

**path**为写入文件的路径
**options**为一个可选参数对象，一般很不用

想要使用好gulp.dest()这个方法，就要理解给它传入的路径参数与最终生成的文件的关系。

gulp的使用流程一般是这样子的： 首先通过 `gulp.src()`方法获取到我们想要处理的文件流，然后把文件流通过 `pipe` 方法导入到 gulp 的插件中，最后把经过处理后的流再通过 pipe 方法导入到 `gulp.dest()`中。

`gulp.dest()`方法则把六种的内容写入到文件中，这里首先需要弄清楚一点是，我么给 `gulp.dest()` 传入的路径参数，只能用来指定要生成的文件的**目录**，而不能指定生成文件的文件名，它生成的文件的文件名使用的是导入到它的文件流自身的文件名，所以生成的文件名是由导入到它的文件流决定的，即使我们给它传入一个带有文件名的路径参数，最终它也会把这个文件名当做是目录名。

### gulp.task()

gulp.task方法用来定义任务： `gulp.task(name, [,deps], fn);`
**name**任务名
**deps**为当前定义的任务需要依赖的其他任务，为一个数组。当前定义的任务会在所有依赖的任务执行完毕后才开始执行。如果没有依赖，则可省略这个参数。
**fn**为任务函数，我们把任务要执行的代码都写在里面，该参数可选。

```js
gulp.task('mytask', ['array', 'of', 'task', 'name'], function() {
  // 定义一个有依赖的任务
});
```

`gulp.task()`这个API没什么东西，但需要知道执行多个任务时怎么来控制任务执行的顺序。
gulp中执行多个任务，可以通过依赖来实现。例如我们想要执行one、two、three这三个任务，那我们就可以定义一个空的任务，然后把那三个任务当做这个空的任务的依赖就行：

```js
var gulp = require('gulp');

// 顺序执行目标任务
gulp.task('1', function() {
  console.log('task 1...');
});

gulp.task('2', function() {
  console.log('task 2...');
});

gulp.task('3', function() {
  console.log('task 3...');
});

gulp.task('default', ['1', '2', '3']);
```

如果任务相互没有依赖，任务会按你书写的顺序来执行，如果有依赖的话则会先执行依赖的任务。但如果某个任务所依赖的任务是异步的，就要注意了，gulp并不会等待那个所依赖的异步任务完成，而是会接着执行后续的任务。例如：

```js
gulp.task('one', function() {
  // one任务是一个异步任务
  setTimeout(function() {
    console.log('one is done');
  }), 3000;
});

// two任务虽然依赖one任务，但并不会等到one任务中的异步操作完成后再执行
gulp.task('two', ['one'], function() {
  console.log('two is doen');
});
```

上面的例子中我们执行two任务，会限制性one任务，但不回去等one任务中的异步操作完成后再执行任务，而是紧接着执行two任务。所以two任务会在one任务中异步操作完成之前就执行了。

那如果我们想等待异步任务中的操作完成后再执行回去的任务，该怎么做呢？
**我们有三种方法实现：**

1. 在异步操作完成后执行一个回调函数来通知`gulp`这个异步已经完成，这个回调函数就是任务函数的第一个参数。

```js
gulp.task('one', function(cb) {  //cb为任务函数提供的回调，用来通知gulp任务已经完成了
  //one是一个一步执行的任务
  setTimeout(function() {
    console.log('one is doen');
    cb();   // 执行回调，表示这个异步任务已经完成
  }, 3000);
});

gulp.task('two', ['one'], function() {
  console.log('two is doen);
});
```

2. 定义任务时返回一个流对象。适用于任务就是操作gulp.src获取到的流的情况。

```js
gulp.task('one', function(cb) {
  var stream = gulp.src('client/**/*.js')
    .pipe(dosomething())
    .pipe(gulp.dest('build'));
  return stream;
});

gulp.task('two', ['one'], function() {
  console.log('two is doen);
});
```

3. 返回一个promise对象。

```js
var Q = reuqire('q'); // 一个异步库
gulp.task('one', function(cb) {
  var deferred = Q.defer();
  setTimeout(function() {
    deferred.resolve('ok');
  }, 3000);
return deferred.promise;
});

gulp.task('two', ['one'], function() {
  console.log('two is doen);
});
```

### gulp.watch()

`gulp.watch()`用来监视文件的变化，如果当文件发生变化时，我们可以利用它来执行响应的任务，例如文件枷锁等。
`gulp.wath(glob, [, opts], tasks)`
**glob**为要监视的文件匹配模式
**opts**为一个可选的配置对象
**tasks**为文件变化后要执行的任务，为一个数组

```js
gulp.task('uglify', function() {
  // do something
});
gulp.task('reload', function() {
  // do something
});
gulp.watch('js/**/*.js', ['uglify', 'reload']);
```

`gulp.watch()`还有另一个用法：`gulp.wath(glob, [, opts], cb)`

**cb**参数为一个函数。每当监视的文件发生变化时，就会条用这个函数，并且会给它传入一个对象，该对象包含了文件变化的一些信息，type属性为变化的类型，可以是`added`，`changed`，`deleted`。`path`属性为发生变化的文件的路径。

```js
gulp.wath('js/**.*.js', function(event) {
  console.log(event.type);  // 变化的类型
  console.log(event.path);  // 变化的文件路径
});
```

----------

## 课时52 gulp插件

### 复制单个文件

任务需要把我们项目里的app下的index.html这个文件，复制到一个叫dist的目录里，这个dist目录表示的是distribution，也就是正式发布版。

### 复制多个文件

创建一个任务，把 imgs 目录里的文件复制到 dist这个目录下

### 组合任务

在创建 gulp 任务的时候，我们可以去给任务指定它依赖的其他任务
比如，我们创建了三个任务，`copu-html` `copy-imgs` `copy-other`。
我们想再创建一个 `build` 的任务，这个任务依赖这三个任务。

### 监听任务

使用 gulp 的 watch 方法，我们可以监听一些文件，当这些文件发生变化时，立即去执行一些指定的任务。

### gulp插件

gulp提供了一些很实用的接口，但本身不能做太多的事情。
可以读取文件、写入文件以及监控文件等一少部分功能。
其它使用的功能都依靠插件来进行扩展，比如：

- 编译Sass：gulp-sass
- 编译Less：gulp-less
- 合并文件：gulp-concat
- 压缩js文件：gulp.ugligy
- 重命名js文件：gulp-rename
- 优化图像大小：gulp-imagemin
- 压缩css文件：gulp-minify-css
- 创建本地服务器：gulp-connect
- 实时预览：gulp-connect

### 自动加载插件 gulp-load-plugins

`gulp.load-plugins`这个插件能自动帮你加载 `package.json` 文件里的gulp插件。
假设你的package.json文件里的依赖是这样的：

```js
"devDependencies": {
  "gulp": "^3.9.1",
  "gulp-concat": "^2.6.0",
  "gulp-connect": "^2.2.0",
  "gulp-imagemin": "^2.3.0"
}
```
然后我们可以在gulpfile.js中使用gulp-load-plugins来帮助我们加载插件：

```js
var gulp = require('gulp');
// 加载gulp.load-plugins插件并实例化
var $ = require('gulp.load-plugins')();
//之后我们就可以使用gulp-rename和gulp-ruby-sass这连个插件时，就可以使用 $.concat 和 $.connect来代替了，也就是所插件名去掉了 gulp- 前缀，之后再传唤为驼峰命名。
```

- gulp-load-plugins的简单实现

```js
var fs = require('fs');
var gulp = require('gulp');
process.chdir(__dirname);
var $ = load();

// gulp-load-plugins原理函数
function load() {
  var devDeps = JSON.parse(fs.readFileSync('package.json'))['devDependencies'];
  var $ = {};
  for (var attr in devDeps) {
    if (attr.indexOf('gulp-') === 0) {
      $[attr.slice(5)] = require(attr);
    }
  }
  return $;
}

gulp.task('default', function() {
  gulp.src('app/*.js')
      .pipe($.concat('all.js')) // 因为是合并文件，必须制定新文件的名字
      .pipe(gulp.dest('dest'));
});
```

- 成功后会输出：

```bash
╰─$ gulp
[23:36:14] Using gulpfile ~/Git/zhufeng-node-practice/lesson53_gulp_plugins/load_plugin/gulpfile.js
[23:36:14] Starting 'default'...
[23:36:14] Finished 'default' after 5.55 ms
```

### 自动编译less插件 gulp-less

```js
var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less',function(){
    return gulp.src('app/less/*.less').pipe(less()).pipe(gulp.dest('dist/css'));
});

gulp.task('default',['less']);
```

### 自动编译sass插件 gulp-sass

安装gulp-sass前需要安装ruby。

```js
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass',function(){
    return gulp.src('app/sass/*.scss').pipe(sass()).pipe(gulp.dest('dist/css'));
});

gulp.task('default',['sass']);
```

### 运行本地服务器插件 gulp-connect

```js
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('copy-html',function(){
    gulp.src('app/index.html')//指定源文件
        .pipe(gulp.dest('dist'))//拷贝到dist目录
        .pipe(connect.reload());//通知浏览器重启
});

gulp.task('watch',function(){
    gulp.watch('app/index.html',['copy-html']);//当index.html文件变化时执行copy-html任务
});

gulp.task('server',function(){
    connect.server({
        root:'dist',//服务器的根目录
        port:8080, //服务器的地址，没有此配置项默认也是 8080
        livereload:true//启用实时刷新的功能
    });
});
gulp.task('default',['server','watch']);//运行此任务的时候会在8080上启动服务器
```

> gulp-connect的livereload自动化新功能使用了WebSocket功能

### 压缩JS gulp-concat & gulp-uglify

- 使用`gulp-concat`合并js
- 使用`gulp-uglify`压缩js

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('uglify', function() {
  return gulp.src(['app/js/*.js', '!app/js/*.tmp.js'])
    .pipe(concat('app.js'))       // 把多个js文件合并成一个文件
    .pipe(uglify())               // 对合并后的app.js文件进行压缩
    .pipe(gulp.dest('dest/js'));  // 输出到目标目录
});

gulp.task('default', ['gulify']);
```

### 压缩html gulp-minify-html

```js
var gulp = require('gulp');
var minifyHtml = require('gulp-minify-html');

gulp.task('minify-html', function() {
  gulp.src('src/*.html')      // 要压缩的html
    .pipe(minifyHtml())       // 进行压缩
    .pipe(gulp.dest('dist/html'));  // 输出到目标目录
});
```

### 重命名、压缩css gulp-rename gulp-minify-css'

把处理好的文件存放到指定的位置之前，我们可以先给它重命名。

```js
var gulp = require('gulp');
var less = require('gulp-less');
var minify = require('gulp-minify-css');
var rename = require('gulp-rename');
gulp.task('less',function(){
    return gulp.src('app/less/*.less')
        .pipe(less())
        //.pipe(gulp.dest('dist/css'))
        .pipe(minify())
        .pipe(rename(function (path) {
            //path.dirname += "/ciao";//目录
            path.basename += ".min";//文件名
            //path.extname = ".css" //扩展名
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('default',['less']);
```

### 压缩图片 gulp.imagemin

```js
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('imagemin',function(){
    return gulp.src('app/imgs/**/*.{jpg,png}')//指定要压缩的图片
        .pipe(imagemin()) //进行图片压缩
        .pipe(gulp.dest('dist'));//输出目的地
});

gulp.task('default',['imagemin']);
```

### js代码检查 gulp-jshint

----------

## 课时54 gulp插件

### yeoman

yeoman帮助我们创建项目，提供更好的工具来使我们的项目变出花样。

yeoman提供generator系统，一个generator使一个插件，在我们的一个完整项目上使用`yo`命令时，会运行该generator。通过这些官方的Generator，推出了Yeoman工作流，工作流时一个健壮、有自己特色的客户端堆栈，包含能快速构建漂亮的网络应用的工具和框架。Yeoman提供了负责开始项目开发的一切，没有任何让人头疼的手工配置。

采用模块化结构，Yeoman利用几个开源社区网站学习到的成功和教训，亿确保栈开发人员越来越智能的进行开发。基于良好的文档基础以及深思熟虑的项目构建过程，Yeoman提供测试和其他更多技术，因此开发人员可以更专注于解决方案而不用去担心其他小事。

Yeoman主要提供了三个工具：脚手架(yo)，构建工具(grunt)，包管理器(bower)。这三个工具是分别独立开发的，但是需要配合使用，来实现我们更高效的工作流模式。

- 安装Yeoman `npm install -g yo`

- 安装"webapp"生成器 `npm install -g generator-gulp-webapp`

- 使用Yeoman的“webapp”模板生成项目 `yo gulp-webapp`

----------

## 课时55 es6

> es6已经刷得很6了，就整多余的了。

- let
- const
- template
- arrow function
- babel
    - `npm i babel-cli` `npm i babel-preset-es2015` `.babelrc`
    - `-o` 出处到一个文件
    - `-w` 提供watch方法
    - `-s` 生成sourcemap
    - `-d` 指定要编译的目录
- class

----------

## 课时56 webpack

> webpack是一个模块打包器。任何静态资源都可以视作模块，然后模块之间也可以相互依赖，通过webpack对模块进行处理后，可以打包成我们想要的静态资源。

- webpack的特点
    - 支持CommonJS和AMD模块，意思也就是我们基本可以无痛迁移旧项目；
    - 支持模块加载器和插件机制，可以对模块灵活定制。特别是`babel-loader`，有效的支持es6；
    - 可以通过配置，打包成多个文件。有效利用浏览器的缓存功能提升性能；
    - 将样式文件和图片等静态资源也可以视为模块进行打包。配合`loader`加载器，可以支持`sass`、`less`等CSS预处理器；
    - 内置有`source map`，即使打包在一起依旧方便调试。

- 安装webpack `npm install webpack -g`
    - webpack -w  提供watchfa方法，实时进行打包更新
    - webpack -p  对打包后的文件j信息压缩
    - webpack -d  提供source map，方便调试
    - webpack --config  以某个config 作为打包
    - webpack --help    更多命令

使用webpack时需要在本地项目中再装一次：`npm install webpack --save-dev`

- 小demo初体验
    - `index.html`
    - `entry.js`
    - `webpack ./entry.js bundle.js`

打包后的输出结果如下：

```bash
╭─jerry@JerrydeiMac  ~/Git/zhufeng-node-practice/lesson56_webpack  ‹master*›
╰─$ webpack ./entry.js bundle.js
Hash: bbc16003c6e82717a367
Version: webpack 3.6.0
Time: 36ms
    Asset    Size  Chunks             Chunk Names
bundle.js  2.5 kB       0  [emitted]  main
   [0] ./entry.js 24 bytes {0} [built]
```

> 说实话，这个webpack的这个bundle思想5年前我在.net平台就用了，只是人家闭源，自由度低点，但思路一样了。

### 模块依赖

- `webpack` 会分析入口文件，解析包含依赖关系的各个文件
- 这些文件(模块)都打包到 `bundle.js` 文件中
- `webpack` 会给每个模块分配一个唯一的 `id`(0,1,2,3,4) 并通过这个 `id` 索引和访问模块
- 页面启动是时先执行 `entry.js` 代码，其它的模块会在 `require` 时懒加载

### loader加载器

- webpack 本身只能处理JavaScript模块，如果要处理其它类型的文件，就需要 `loader` 进行转换；
- Loader 可以理解为模块和资源的转换器，可以转换任何类型的模块；
- Loader 可以通过管道方式链式调用，每个 `loader` 可以把资源转换成任意格式并传递给下一个 `loader` ，但是最后一个`loader` 必须返回`JavaScript`；
- Loader 可以接受参数，以此来传递配置项给 loader
- Loader 可以通过 `npm` 安装
- Loader 可以通过文件扩展名(或正则表达式)绑定不同的加载器

### 加载css文件

- 安装css的loader：
    - `npm install css-loader style-loader`
    - 首先将 `style.css` 也堪称一个模块
    - `css-loader` 来读取它
    - `style-loader` 把它插入到页面中

```js
// entry.js
require('!style-loader!css-loader!./style.css');
document.write('hello');
```

- 以上demo原理解读：
    1. webpack将万物都模块来看待，所有就有了我们的`require()`引入
    2. 跟 `gulp` 原理一样，第一行代码文件流是从又往左流的：首先最后边读取`style.css`文件，然后经过`css-loader` 进行转换，再经过 `style-loader` 转换成可以加载js代码，最后丢该webpack就行了

```bash
╭─jerry@JerrydeiMac  ~/Git/zhufeng-node-practice/lesson56_webpack  ‹master*›
╰─$ webpack ./entry.js bundle.js                                            2 ↵
Hash: 5ca73bf3c1cb9cf0ccac
Version: webpack 3.6.0
Time: 216ms
    Asset   Size  Chunks             Chunk Names
bundle.js  18 kB       0  [emitted]  main
   [0] ./entry.js 132 bytes {0} [built]
   [1] ./node_modules/style-loader!./node_modules/css-loader!./style.css 996 bytes {0} [built]
   [2] ./node_modules/css-loader!./style.css 188 bytes {0} [built]
    + 3 hidden modules
```

### 配置文件demo

- webpack在执行的时候可以通过制定的配置
- 默认情况下会指向当前目录中的 `webpack.config.js`
- 配置文件是一个 node.js 模块，返回一个 json 格式的配置信息对象
- 添加配置文件

```js
module.exports = {
  entry: "./entry.js", // 设置打包的入口文件，每有一个键值对，就是一个入口文件
  output: { // 配置打包结果的输出
    path: __dirname,       // 定义输出的文件夹
    filename: "bundle.js" // 定义了打包结果文件的名称
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
};

// 需要在entry.js加入
// require('./style.css');
```

### webpack插件

插件的使用一般是在webpack的配置信息`plugins`选项中指定，我们可以向生成的打包文件头部插入一些信息。

```js
var webpack = require('webpack');

// config
  plugins: [ new webpack.BannerPlugin('// 写店点注释要这么麻烦?') ]
```

### webpack url-loader

- `url-loader`会将样式中引用到文件(图片)转为模块来处理
    - `limit`参数可以指定文件长度小于限制时(单位 bytes)可以返回一个`Data Url`的base64编码
    - `mimetype`参数可以文件格式(通过后缀)

```js
module: {
    rules: [
      // 如果文件长度小于4000 bytes时返回Data Url
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=4000' }
    ]
}
```

### 别名

别用的作用是把用户的一个请求重定向到另一个路径。图方便了！

```js
// config
resolve: {
  alias: {
    jquery: ".lib/js/jquery.js"
  }
}

// 此后如果再entry.js中使用就可以直接
require("jquery");
```

### expose-loader

- 如果想在前台用打包的jquery需要把jquery暴露出来(如果不用expose处理，单单`require('jquery')`前台是没法用的)
    - `npm install expose-loader --save-dev`

- 把`$`作为别名为jqyery的编码暴露到全局上下文中
    - `require('expose-loader?$!jquery')`
    - 再一次体现了流思想，从右到左的方向
    - 1.导入`jquery`文件流; 2.绑定`$`对象上; 3.流向`expose-loader`中; 4.最后流到前台js的全局对象上

### 使用es6

- `npm i babel-core --save-dev`
- `npm i babel-loader --save-dev`
- `npm i babel-preset-es2015 --save-dev`

```js
module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        // query:loader参数的第二种使用方式;第一种是直接?limit=1000
        query: { compact: false, presets: ['es2015] }
      }
    ]
}
```
### 打包成多个文件

- entry属性可以打包成一个对象，而对象名也就是key回座位下面output的filename属性的[name]

```js
module.exports = {
  entry: {
    bundle1: './entry1.js',
    bundle2: './entry2.js'
  },
  output: {
    path: __dirname,
    filename: '[name].js' // 因为有多个入口，输出也需多个出口
    // [name] === entry[key]
  }
}
```

### 公共模块

我们利用插件就可以智能提取公共部分，以提供我们浏览器的缓存复用

```js
plugins: [
  new webpack.optimize.CommonsChunkPlugin('common.js')
]
```

- **我们需要手工在html上去加载common.js，并且是必须要最先加载！**

### gulp

使用gulp和webpack混合使用

```js
var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

gulp.task('webpack', function(callback) {
  var myConfig = Object.create(webpackConfig);
  webpack(myConfig, function (err, stats) {
      callback();
  });
});

gulp.task('default', function() {
  gulp.watch('./**', ['webpack']);
});
```

### webpack-dev-server

- `npm install webpack-dev-server -g`

----------

## 课时57 es6

- 模块：ES6在言语规格的层面上，实现了模块功能
    - export 导出接口
    - import 导入接口
    - 一个模块就是一个独立的文件。该文件内部的所有变量，外部都无法获取
    - 如果你希望外部能读取模块内部的某个变量，就必须使用export关键字输出该变量

- import
    - 其他JS文件就可以通过import命令加载这个模块
    - import命令接收一个对象，里面指定要从其他模块导入的变量名
    - 模块的整体加载  `import * as util from '.util';`
    - export default 命令为导出模块指定的默认输出 `export default function(){}` `import abc from exportDefault;`
    - export default 对应的 import语句不需要使用大括号，不适用小export default对应的import语句需要使用大括号
    - 一个模块只能有一个默认的输出

- export
    - 导出变量
    - 导出变量为一个对象
    - 函数或类(class)

- Iterator 迭代器

简单模拟ES6中的迭代器

```js
'use strict'
function say(words) {
  var i = 0;
  return {
    next: function() {
      return {
        value: words[i],
        done: i++ >= words.length
      }
    }
  }
}

var says = say(['hello', 'world']);
console.log(says.next());  // {value: 'hello', doen: 'false'}
console.log(says.next());  // {value: 'world', doen: 'false'}
console.log(says.next());  // {value: 'undefined', doen: 'true'}
```

- Generator 生成器
    - `yield`好比`put`变量到一个返回结果的数组里，`.next()`时按序返回

```js
function* say() {
  yield 'a';
  yield 'b';
}

var says = say();
console.log(says.next());  // {value: "a", done: false}
console.log(says.next());  // {value: "b", done: false}
console.log(says.next());  // {value: undefined, done: true}
```

----------

## 课时57 pug

> 话说jade因为版权改pug了

- 特点
    1. 不同层级元素之间通过缩进进行分隔，标签名和内容之间要加空格
    2. 编译模板 `pug index.jade`
    3. `pug -P -w index.jade`
    4. div标签名可以省略
    5. `|`后跟直接显示的文本
    6. pug中也可以只用html正规标签
    7. 单行注释`//`，块注释`//-`

```pug
doctype html
html
    head
        title Pug Document
        style.
            body {color:red}
        script.
            var name = 'jerry shi'
    body
        h1#myh1.myclass.myclass2(data-xname='myname',data-xage="6") jerry shi
        #testDiv.testDiv
            a(href="http://jerryshi.com") my blog
            input(name='name', type='text', value='blog')
            #content(style="border:1px solid red;")
                | hello
                input(value='hello')
                <input value='world'>
                | world
            #content2
                // i am a comment
                //-
                    i am buffer comment
                    test
                    test2
```

- 模板使用变量
    - `-` 表示模板内的对象，可在模板内任意引用 

```pug
html
    head
        title Pug Document
        style.
            body {color:red}
        script.
            var name = 'jerry shi'
        - var lesson = 'node.js'
    body
        h1 #{lesson.toUpperCase() + "like"}
```

- 使用外部传递的数据源
    - `pug -P -w index.jade -O obj.json`

> 剩下的看官网文档了，意思不有啊！

----------

##59 项目构建

- `npm install express-generator -g`
- `express mock-server`
- install
- webpack中在js中`require('module-name')`时，不能省略`-loader`后缀

----------

## 课时60 初始化首页

后续教程不看了，毕竟对angular就没打算学。

----------




  [1]: http://static.zybuluo.com/szy0syz/xj1bef58jsvxsmsmc9ps6fnt/node-require-logic.png
  [2]: http://static.zybuluo.com/szy0syz/uomz7siv193etc4d65tu1g4n/node-module-find-files.png
  [3]: http://static.zybuluo.com/szy0syz/e84ucok5rm265ybau1al8h85/node-stream-readable.png
  [4]: http://static.zybuluo.com/szy0syz/hrhqghcddn7xvdxdg6wo3hxf/node-writeStream-drain.png
  [5]: http://static.zybuluo.com/szy0syz/6fljk5vzqpcpd4anihvfxz2u/node-stream-pipe.png
  [6]: http://static.zybuluo.com/szy0syz/5hxd38laenzk9qn9az9ivzvm/image.png
  [7]: http://static.zybuluo.com/szy0syz/2p7xq7i734p7ncbqe8k5uoyq/8.tcp%E5%BB%BA%E7%AB%8B%E8%BF%9E%E6%8E%A5%E7%9A%84%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B.png
  [8]: http://static.zybuluo.com/szy0syz/abv0suczg8rglrarvcc6as4c/9.tcp%E5%9B%9B%E6%AC%A1%E9%80%80%E5%87%BA.png
  [9]: http://static.zybuluo.com/szy0syz/yw5vk4ehui2w64xrcb094y03/12.tcp%E4%BC%A0%E8%BE%93%E7%A4%BA%E4%BE%8B.png
  [10]: http://static.zybuluo.com/szy0syz/dv0kdqlxfhpabxpsipdl7y2f/http%E6%8A%93%E5%8C%85.jpg
  [11]: http://static.zybuluo.com/szy0syz/07t218mlc69y5lk2m4xzwmyn/tcp%E6%8A%93%E5%8C%85.jpg
  [12]: http://static.zybuluo.com/szy0syz/owlfck6o8go5aehyw0lskykr/connect-middleware.png
  [13]: http://static.zybuluo.com/szy0syz/mqgonnyhrzyx4b5ufoh2h42x/glup%20&%20grunt%20diff.png
  [14]: http://static.zybuluo.com/szy0syz/cnuz7dli90giqe66vyhlkeq2/image.png

