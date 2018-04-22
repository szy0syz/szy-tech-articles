# 前端JavaScript面试技巧

[TOC]

## 第1章 课程简介

## 第2章 JS基础知识（上）

```js
// 值类型 //
var a = 100
var b = a
a = 200
console.log(b) // 100

// 引用类型 //
var c = {age:20}
var b = a
b.age = 21
console.log(a.age)  // 21
```

引用类型包括：对象、数组、函数。引用类型可以无限制的扩展属性。

### typeof运算符

```js
typeof undefined // undefined
typeof 'abc'  // string
typeof 123  // number
typeof true  // boolean
typeof {}  // object
typeof []  // object
typeof null  // object
typeof console.log  // function
```

JavaScript中共有 6 种基本数据类型：Undefined、Null、Boolean、Number、String、Symbol

* 触发强制类型转换
  * 字符串拼接
  * == 运算符 `null == undefined // true`
  * if 语句
  * 逻辑运算 把变量强制转换为Boolean `!!a`

何时用===和==

`if(obj.a == null){} // 等于 obj.a === null || obj.a === undefined`

也就是说，除了想判断某对象属性是否为null时用==，其它场景都用===

### JS中的内置函数

* Object
* Array
* Boolean
* Number
* String
* Fcuntion
* Date
* RegExp
* Error
* Math

他们都是类的构造函数，数据封装类对象。

值类型和引用类型：一个是值得拷贝，另一个是内存指针地址的拷贝。

### 如何理解JSON

JSON 只不过是一个 JS 对象而已
JSON.stringify({a:10, b:20})
JSON.parse('{"a":"1","b":"2"}')

### 原型和原型链

* `var a = {}` 其实是 `var a = new Object()` 的语法糖
* `var a = []` 其实是 `var a = new Array()` 的语法糖
* `function Foo() {}` 其实是 `var Foo = new Function(...)` 的语法糖
* 使用 instanceof 判断一个函数是否是一个变量的构造函数 `arr1 instanceof Array`

### 原型规则和示例

原型的五条规则：

* 所有的引用类型（数据、对象、函数），都具有对象特性，即可以自由扩展属性(除了 “null” 以外)
* 所有的引用类型（数据、对象、函数），都有一个`__proto__`(隐式原型)属性，其地址指向一个普通的对象
* 所有的函数，都有一个`prototype`(显示原型)属性其属性值也是一个普通的对象
* 所有的引用类型（数据、对象、函数），`__prpto__`隐式原型属性都指向它的构造函数的`prototype`属性
* 当视图得到一个对象的属性时，吐过这个对象本身没有这个属性，那么就会去它的`__proto__`隐式原型(即它的构造函数的`prototype`)中寻找

`Foo.prototype.__proto__ === Object.prototype`


## 第3章 JS基础知识（中）




## 第4章 JS基础知识（下）




## 第5章 JS-Web-API（上）




## 第6章 JS-Web-API（下）




## 第7章 开发环境




## 第8章 运行环境



