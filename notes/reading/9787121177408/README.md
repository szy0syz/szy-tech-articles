![9787121177408](../../../static/img/9787121177408.jpg)

# 《JavaScript语言精粹》

## 第一章：精华

- JAvaScript优化的想法包括函数、弱类型、动态对象和富有表现力的对象字面量表示法。而其糟糕的想法包括基于全局变量的编程模型。

----------

## 第二章：语法

### 空白

```javascript
/*
    var rm_a = /a*/.macth(s);
*/
```

> 在JavaScript里，最好别用`/* */`包裹注释，因为如果注释里出现正则表达式刚好闭合了注释就完蛋了~

### 数字

- JavaScript只有一个数字类型。它在内部被表示为64位的浮点数，和Java的double数字类型一样。因它没有分离出整数类型，所以1和1.00的值相同。这提供了很大的方便，因为它是完全避免了短整型的溢出问题，你只要知道它是一种数字。
- NaN是一个数值，它表示一个不能产生正常结果的运算结果。NaN不等于任何值，包括它自己，判断用isNaN(number1)检测NaN。
- Infinity表示所有大于1.79769313486231570e+308的值。

### 字符串

- JavaScript再被创建时，Unicode时一个16位的字符集，所以JavaScript中的所有字符都是16位的。
- JavaScript中没有字符类型，要表示只需创建仅包含一个字符的字符串即可。
- 字符串是不可变的。一旦字符串被创建，就永远无法改变它。但你可以很容易`+`运算符连接其他字符串来创建一个新字符串。两个包含着完全相同字符且字符顺序也相同的字符串被认为是相同字符串。证明如下：

```javascript
'c' + 'a' + 't' === 'cat'   // -> true
```

### 语句

- 代码块是包在一对花括号中的一组语句。不想其他许多语言，JavaScript中的代码块不会创建新作用域，因此变量应该被定义在函数的头部，而不是代码块中。(联想到了立即执行函数IIFE)
- 以下列出的值都背当做 *假* `false`：
  - `flase`
  - `null`
  - `undefined`
  - 空字符串`' '`
  - 数字 `0`
  - 数值 `NaN`
- 除了以上的其他所有值都被当做 *真* `true`，包括`true`、字符串`false`，以及所有对象。
- 在使用`for ... in`枚举一个对象的私有(自身)属性时，应加一道筛选

```javascript
for (myvar in obj) {
    if (obj.hasOwnProperty(myvar)) {
        ...
    }
}
```

- JavaScript中不允许在`return`和`break`关键字和标签之间换行。
- 一个expression语句可以给一个或者多个变量或者成员赋值，或调用一个方法，或从对象中删除一个属性。

### 表达式

- `typeof`运算符产生的值有'number'、'string'、'boolean'、'undefined'、'function'和'object'六种。如果运算数是一个数组或者null，那么结果是'object'，这其实是不对的。

> 关于null为什么是typeof结果是对象原因，因为当时作者设计时，寄存器最高的那三位000表示类型，而000正好表示空，就演变为空对象null，所以null就是对象类型。

- `/`除运算符可能会产生一个非整数结果，即使两个运算数都是整数。
- 如果第1个运算数的值为假，那么逻辑且运算符`&&`产生第1个运算数的值，否则产生第2个运算数的值。
- 如果第1个运算数的值为真，那么逻辑或运算符`||`产生第1个运算数的值，否则产生第2个运算数的值。

----------

## 第三章：对象

- 对象是属性的容器，其中每个属性都有用名字和值。属性值可以是除了`undefined`以外的任何值。
- JavaScript中的对象都是无类型(class-free)的。他对新的属性名字和属性值都没有限制。对象适合用于汇集和管理数据，对象也可以包含其他对象，所以它们可以容易地表示成梳妆或者图形结构。

### 索引

- JavaScript的标识符中包含连接符(-)是不合法的，但允许包含下划线(_)。

### 引用

```javascript
// a,b,c每个都引用一个不同的空对象
var a = {}, b = {}, c = {};  
// a,b,c都引用同一个的空对象
a = b = c = {};
```

### 原型

- 原型连接只有在检索值时才被用到。如果查到对象的某个属性，先在对象自有属性中查找，若没有就往上一个原型的属性中查找，以此类推，最后找到终点Object.prototype。如果想要的属性完全不存在于原型链中，那么结果就是`undefined`值。这个过程称为*委托*。

### 删除

`delete`运算符可以用来删除对象的属性。删除对象的属性可能会让来自原型链中的属性透现出来：

```javascript
another_stooge.nickname;  // 'jerry' 

// 删除 another_stooge 的 nickname属性，从来暴露出原型上的nickname属性
delete another_stooge.nickname;

another_stooge.nickname;  // 'szy0syz' 
```

### 减少全局变量污染

- 只要把全局性的资源都纳入一个命名空间下，你的程序与其他应用程序、组件或类库之间发生冲突的可能性就会显著降低。

----------

## 第四章：函数

 > 函数包含一组语句，它们是JavaScript的基础模块单元，用于代码复用、信息隐藏和组合调用。函数用于指定对象的行为。一般来说，所谓编程，就是将一组需求分解成一组函数与数据结构的技能。

### 函数对象

- JavaScript中函数就是对象。对象是“名/值”对的集合并 拥有一个连到原型对象的隐藏连接。对象字面量产生的对象连接到`Object.prototype`。函数对象连接到`Function.prototype`(该原型对象本身也连接到`Object.prototype`)。每个函数在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码。

> 来来来，哥来解读下这段话，说说心得，要不然真成抄书的了。

这段话解释了一个原理“函数的三种角色”：函数、对象和类。以后哪个再说JS中最大就是`Object`我就跟谁急，原理图在下面。最后那句又引出了函数的编译机制，如果定义一个函数，在当前作用域预解释时会立马定义并声明，然后把函数体代码转成字符串存成堆内存地址返回到当前作用，最后执行函数也就是将堆内存生成一个新作用域。

![img1][1]

- 因为函数是对象，所以他们可以向任何其他的值一样被使用。函数可以保存在变量、对象和数组中。函数可以被当做参数传递给其他函数，函数也可以再返回函数，而且函数是对象，所以函数可以拥有方法，*当然也可以添加属性*。
  - 最后那句话是我加的，真的可以，我在用Vanilla.js实现兼用IE6~8的事件库时就体会过了，第一眼看是懵的，第二眼看就喜欢上了。

### 调用

- 调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了已声明的形参外，每个函数还接收两个附加的参数：`this`和`arguments`。参数this在面向对象编程中非常重要，它的值取决于调用模式。JavaScript一共有4中调用模式：方法调用模式。函数调用模式。构造器调用模式和apply调用模式(call去哪里了？)。这些模式在如何初始化关键参数this上存在差异。

### 方法调用模式

- this被绑定到该对象上

### 函数调用模式

- 此模式调用函数时，this被绑定到了全局对象。这是语言设计上的一个错误。倘若语言设计正确，应该当内部函数被调用时，this应该仍然被绑定到外部函数的this变量。这个设计错误的后果就是方法不能利用内部函数来帮助它工作，因为内部函数的this被绑定了错误的值，所以不能共享方法对对象的访问权。解决办法可以用bind之类的方法改变内部函数的this值，也可以在外层函数定义that接收this地址然后通过作用域链访问到外层函数的this。

### 构造器调用模式

- 如果在一个函数前面带上new来调用，那么背地里将会创建一个连接到该函数的prototype成员的新对象，同时this会绑定到哪个新对象上(正常是返回给你，就算你不写return，它也返回给你)。作者并不推荐用此方法。

### Apply调用模式

- 因为JavaScript是一门函数式的面向对象编程语言，所以函数可以拥有方法。

### 参数

- `arguments`是类数组(array-like)对象。

### 异常

- 异常是干扰程序的正常流程的不寻常(但并非完全是出乎意料的)的事故。

### 扩展类型的功能

- JavaScript允许给语言的基本类型扩展功能，例如`Object.prototype`，扩展后不仅所有对象可用，连函数、数组、字符串、数字、正则和布尔值都能用。

- JavaScript缺少一个溢出字符串首尾空白的方法，加一个呗，原理和我整理Vanilla.js里的一样嘛：

```javascript
String.method('trim', function () {
    return this.replace(/^\s+|\s+$/, '')
}) // 好严谨，我当时只匹配空白，没把什么制表符各种算进去。
```

- 基于类型的原型是公用结构，所以在类库混用时务必小心。一个保险的做法就是只在确认没有该方法时才添加它。

### 递归

- 递归函数就是会直接或间接地调用自身的一中函数。递归是一中强大的编程技术，它把一个问题分解为一组相似的子问题，每个都用一个寻常解去解决。一般来说，一个递归函数调用自身去解决它的子问题。

- 递归函数可以非常高效地操作树形结构，比如浏览器端的文档对象模型(DOM)，每次递归调用时处理指定的树的一小段。*ES6中已经明确提出尾递归优化，再也不用担心栈溢出。*

### 作用域 

- 在编程语言中，*作用域*控制着变量和参数的可见性和生命周期。JavaScript仅有函数作用域，而缺少块级作用域，所以最好就是在函数体的顶部声明函数中可能用到的所有变量。

### 闭包

- 作用域的作用是内部函数可以访问定义它们的外部函数参数和变量(除了this和arguments)！说实话前面这句话翻译的有点难理解，换种说法：**作用域的作用是内部函数可以访问到外部函数的参数和变量。**


```javascript
var myObject = (function () {
    var val = 0;
    
    return {
        increment: function (inc) {
            val += typeof inc === 'number' ? inc : 1;
        }
        getValue: function () {
            return val; // 外层作用域的val
        }
    }
})()
```
 > 这里栗子有点简单了，本来不想写了，为了基础么再来走一遭：
   1. 在全局作用域预解释时定义myObject；
   2. 开始赋值myObject，不管是啥IIFE，先给你整个作用域摆那，把该预解释的做了，然后返回一个对象，此时这个对象偏偏要用作用域链方式拉了根线牵着外层作用域的val，所以外层作用域用完也不能销毁，直到myObject不用了；
   3. 这个时候好玩了，每次用myObject对象是，方法里的val变量会从国作用域链那val值，然后进行各种操作；
   4. 总结一下，也就是把val搞成一个私有属性，值可以访问和累加它。

```javascript
var fade = function (node) {
    var level = 1;
    var step = function () {
      var hex = level.toString(16);
      node.style.backgroundColor = '#FFFF' + hex + hex;
      if (level < 15) {
        level += 1;
        setTimeout(step, 100);
      }
    };
    setTimeout(step, 100);
};
// 让当前页面body的背景色从黄色设置为白色
fade(document.body);
```

 > 上例表达了用闭包创建一个不销毁的作用域，然后将属性持续保留。

### 回调

- 函数使得对不连续事件的处理变得更容易。回调-->异步

### 模块

- 模块是一个提供接口雀隐藏状态与实现的函数或对象。为什么我会想到了下面这张图？真是一图胜千言。

![image.png-381.6kB][2]

- 模块模式利用了函数作用域和闭包来创建被绑定对象与私有成员的关联。模块模式的一般形式是：一个定义了私有变量和函数的函数；利用闭包创建可以访问私有变量和函数的的特权函数；最后返回这个特权函数，或者把它保存到一个可访问到的地方。

> 上面这段话我来翻译：模块模式的一般形式是：一个定义了私有变量和方法的函数；利用闭包创建可以访问私有变量和私有方法的作用域地址(函数)返回给接收者；最后这个接收者可以通过嵌套的作用域访问到这个"上层作用域"里的变量或者方法。实际就是不销毁。

- 使用模块模式就可以摒弃全局变量的使用。它出尽了信息隐藏和其他优秀的设计实践。对于应用程序的封装，或者构造其他单例对象，模块模式非常有效。

> 其实模块模式让我有感触的是一次写自己的动画库时候，一开始禁用闭包去实现，给每个元素自身设置动画计时器ID时，因为没法保证这个变量一定执行你期望的地址，所有动画老实跳来跳出的，也就是你的计时器ID没保存对地方，所以清不掉，才导致动画跳。有了模块模式，将动画库构造成一个类，内部函数里全部用this.xx来保存动画ID，妥妥的，不会保存飞掉，确保了动画的质量。

### 柯里化Curry

- 柯里化，也称为“局部套用”，是把多参数函数转换为一系列单参数函数并进行调用的技术。

```javascript
var add1 = add.curry(1);
cosnole.log(add1(6)) // -> 7
// 简单来说，搬来是add(1,6) -> 被柯里化后为add1(6)

// 实现柯里化
Function.method('curry', function () {
    var slice = Array.prototype.slice,
        args = slice.apply(arguments),
        that = this;
    return function () {
        return that.apply(null, args.concat(slilce.apply(arguments)));
    }
})
```

----------

## 第五章：继承

JavaScript是一门弱类型语言，从不需要类型转换。对象继承关系变得无关紧要。对于一个对象来说重要的是它能做什么，而不是它从哪里来。

### 伪类

- 当一个函数对象呗创建时，Function构造器产生的函数对象会运行以下类似的代码：

```javascript
this.prototype = { constructor: this };
```

- 新函数对象被赋予一个prototype熟悉，它的值是一个包含constructor熟悉且属性值为该新函数的对象(这个属性存的其实是该新函数的堆内存)。这个prototype对象是存放继承特征的地方。
- 当采用构造器调用模式，即用new前缀去调用一个函数时，函数的执行方式会被改变。我们可以在Function类的原型上简单模拟一个方法：

```javascript
// 事件new关键字的功能
Function.method('new', function () {
    // 创建一个新对象，它继承自构造函数的原型对象，用Object类的create方法
    vat that = Object.create(this.prototype)
    
    // 调用构造函数，绑定 this  到新对象上
    var other = this.apply(that, arguments) //在这里开始实例化一个类
    
    // 如果other不是一个对象，就直接返回上面的that
    return (typeof other === 'object' && other) || that
})

// 用的使用就这样
Person.new({name: 'jerry', age: '20'})
```

### 原型

- 在一个纯粹的原型模式中，我们会摒弃类，转而专注于对象。基于原型的继承：一个新对象可以继承一个旧对象的属性。

### 函数化

- JavaScript中创建一个对象的几种方法：
  1. 对象字面量法
  2. 用new去实例化一个类得到新的实例对象
  3. Object.create()
  4. 执行一个返回对象的函数

### 部件

> 总的来说第五章，相对抽象，看一遍肯定不行，得用更多时间去推敲。部件这小结的例子很不错。

```javascript
var eventuality = function (that) {
    var registry = {};

    this.fire = function (event) {
        // 在一个对象上触发一个事件。该事件可以是一个包含事件名称的字符串，
        // 或者是一个拥有包含事件名称的type属性的对象。
        // 通过 'on' 方法注册的时间处理程序中匹配事件名称的函数将被调用。
        var array,
            func,
            handler,
            i,
            type = typeof event === 'string' ? event : event.type;
        // 上面的声明声明方式很整洁啊，get~
        
        // 如果这个事件存在一组事件处理程序，那么遍就遍历它们并按顺序依次执行
        if (registry.hasOwnProperty[type]) {
            array = registry[type]
            for (i=0; i < array.length; i +=1) {
                handler = array[i]
                
                // 每个处理程序包含一个方法和一组可选的参数
                // 如果该方法是一个字符串形式的名字，那么找到该函数
                func = handler.method;
                if (typeof func === 'string') {
                    func = this[func];
                }

                // 调用一个处理程序。如果该条目包含参数，那么传递它们过去。否者，传递该事件对象。
                func.apply(this, handler.parameters || [event]);
            }
        }
        return this;
    };
    that.on = function (type, method, parameters) {
        // 注册一个事。构造一条处理程序条目。将它插入到处理程序数组中，
        // 如果这种类型的时间还存在，那就构造一个。
        var handler = {
            method: method,
            parameters: parameters
        };
        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler);
        } else {
            registry[type] = [handler];
        }
        return this;
    };
    return that;
}
```

- 我们可以在任何单独的对象上调用eventuality，授权它事件处理方法。我们也可以赶在that被返回前在构造函数中调用它`eventuality(that)`。如果我们想要eventuality访问该对象的私有状态，而已把私有成员集my传递给它。

----------

## 第六章：数组

> **数组是一段线性分配的内存，它通过整数计算偏移并访问其中的元素。*但JavaScript没有想此类数组一样的数据结构！***

### 数组字面量

- 在大多语言中，一个数组的所有元素都要求是相同类型。JavaScript允许数组包含任意混合类型的值：

```javascript
var misc = [
    'string', 98.64, true, false, null, undefined,
    ['nested', 'array'], {object: true}, NaN, Infinity
];  // misc.length  --> 10
```
### 长度

- JavaScript数组的length是没有上届的。若用大于或等于当前length的数字作为下表来存储一个元素，那么length值会被增大以容纳新元素，不会发生数组越界错误。
- length属性的值时这个数组的最大整数属性名加1，他不一定定于数组里的属性的个数。
- 如果把length设小将导致所有下标大于等于新length的属性被删除。

### 删除

- 由于JavaScript的数组其实就是对象，所以用delete运算符而已用来从数组中移除元素。但不幸的是，那么会在数组中留下一个空洞。这是因为排在被删除元素之后的元素仍然保留着它们最初的属性，而我们想要的结果却是递减后面每个元素的属性。解决办法：splice。

----------

## 第七章：正则表达式

>  正则学的还算扎实，这章刚才作为复习。

### 匹配URL的例子

```javascript
var parse_url = /^(?:([A-Za-z]+:))?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;

var url = "http://www.ora.com:80/goodparts?q#fragment";

var result = pasre_url.exec(url);

var names = ['url', 'scheme', 'slash', 'host', 'post', 'path', 'query', 'hash'];

var blanks = '      ', i;

for (var i = 0; i < names.length; i += 1) {
    document.writeln(names[i] + ':' + blanks.substring(names[i].length), result[i]);
}

// url:    http://www.ora.com:80/goodparts?q#fragment
// scheme: http
// slash:  //
// host:   www.ora.com
// port:   80
// path:   goodparts
// query:  q
// hasg:   fragment
```

### 匹配数字的例子

```javascript
var parse_number = /^-?\d+(?:\.\d*)?(?:e[+\-]?\d+)?$/i

var test = function (num) {
    document.writeln(parse_number.test(num));
};

test("1")           // true
test("number")      // flase
test("98.6")        // true
test("123.1.86.11") // false
test("123.45E-67")  // true
test("123.45D-67")  // false
```

### 结构

- ~~用正则表达式字面量创建RegExp对象时共享同一个单例~~。就这点而言，书上是错的，chrme-59.0.3071.115中已经***不再共享同一单例！***

```javascript
function make_a_matcher() {
    return /a/gi;
}

var x = make_a_matcher();
var y = make_a_matcher();

x.lastIndex = 10;
console.log(y.lastIndex) // 0
```

### 元素

- 正则表达式分支
  - 一个正则表达式分支分支包含一个或多个正则表达式序列。这些序列被`|`字符分隔。如果这些序列中的任何一项符合匹配条件，那么这个选择就被匹配。它蚕食按顺序依次匹配这些序列项。
  - yes~~~~很好的解释了正则的懒惰性！


- 正则表达式序列
  - 一个正则表达式序列包含一个或多个正则表达式因子。每个因子能选择是否跟随一个量词，这个量词决定着这个因子被允许出现的次数。如果没有指定这个量词，那么该因子只会被匹配一次。 
  
- 正则表达式因子
  - 一个正则表达式因子可以是一个字符、一个由圆括号包围的组、一个字符类，或者是一个转移序列。除了控制字符和特殊字符以外，所有字符都会被按照字面处理。
  - `\ / [ ] () { } ? + * | . ^ $`这些字符按照字面去匹配，那么必须用一个`\`转义字符前缀进行转义。
  - 一个未被转义的`.`会匹配除行结束符以外的任何字符。

![js-Good-Parts-regex_factor (1).png-25.3kB][3]

- 正则表达式转义
  - 反斜杠字符在正则表达式因子中与其在字符串中一样均表示转义，但在正则因子中稍有不同。
  - 正则的转义包含：`\b`表示退格符；`\d`等同[0-9]，它匹配一个数字；`\d`则表示与其相反的`^[0-9]`

![js-Good-Parts-regex_escape.png-50.6kB][4]

> 画完老爷子的这个‘铁路’图，我才发现老爷子真的超级牛，把计算机思想都给体现出来，而且构图还把正则转义的知识点全覆盖，拽呀！我得把之前的铁路图全手画补上。

### 元素-正则表达式分组


### 元素-正则表达式字符集


### 元素-正则表达式字符转义


### 元素-正则表达式量词

![js-Good-Parts-regex_quamtifier.png-19.1kB][5]

- 正则表达式因子可以用一个正则表达式量词后缀来决定这个因子应该被匹配的次数。
  - `?`等同于`{0,1}`，`*`等同于`{0,}`，`+`则等同于`{1,}`
  - 如果只有一个量词，表示趋向于进行贪婪性匹配，即匹配尽可能多的副本直至达到上限。如果这个量词附加一个后缀`?`，则表示趋向于进行非贪婪匹配，即只匹配必要的副本就好。但一般情况下最好坚持使用贪婪性匹配。

## 总结

> 内容紧凑，知识点密集，排版仅仅有100页，堪称完美！


  [1]: http://ofx24fene.bkt.clouddn.com//img/book/prototype_chain_final.svg
  [2]: http://static.zybuluo.com/szy0syz/tec435v48u8km68xr6zszb0e/image.png
  [3]: http://static.zybuluo.com/szy0syz/zhc291pqg5ievvgramt3tlyy/js-Good-Parts-regex_factor%20%281%29.png
  [4]: http://static.zybuluo.com/szy0syz/5iycj66am1qijm0x5szdjzwu/js-Good-Parts-regex_escape.png
  [5]: http://static.zybuluo.com/szy0syz/oznyx2csgidw9c4dex2wuody/js-Good-Parts-regex_quamtifier.png
  