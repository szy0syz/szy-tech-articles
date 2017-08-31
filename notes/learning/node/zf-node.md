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

----------


  [1]: http://static.zybuluo.com/szy0syz/xj1bef58jsvxsmsmc9ps6fnt/node-require-logic.png
  [2]: http://static.zybuluo.com/szy0syz/uomz7siv193etc4d65tu1g4n/node-module-find-files.png
  [3]: http://static.zybuluo.com/szy0syz/e84ucok5rm265ybau1al8h85/node-stream-readable.png

