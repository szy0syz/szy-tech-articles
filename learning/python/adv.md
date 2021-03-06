# Python3入门与进阶

从基础语法开始，体会Pythone语言之美

## 第1章 Python入门导学

### 1.1 导学

Python是最近新兴的流行语言

Python并不是一门新兴语言，它诞生于上世纪90年代初。随着大数据于人工智能的流行，Python逐步的流行了起来。

Python像一个技术的润滑剂，大多数互联网公司或多或少都会用到。

已超过C#，仅次于Jaca、C和C++

最新版为 Python 3.6

原生爬虫：用最基础的Python语法编写一个爬虫，巩固知识，用实战理解爬虫原理

Python特点：

* 简洁：`Life is short, I use Pythone.` 人生苦短，我用Python
* Pythonic： 很-Python  例如交换变量：`x,y = y,x`
* 非常易于学习，万金油
* 美与哲学

Pythone应用场景：

* 爬虫
* 大数据
* AI
* 测试
* Web
* 脚本书里

Python子禅：

* Simple is better than complex  简洁胜于复杂
* Now is better than never. Although never is often better than **right** now.  做也许好过不做，但不假思索就动手做还不如不做。

### 1.2 Python特点

1. Python是一门编程语言，它只是众多编程语言中的一种
2. 语法简洁、优雅、编写的程序易于理解
3. 跨平台，Windows、Linux以及MacOS
4. 易于学习。站在非计算机角度来讲，单从解决问题的工具来讲，Python确实比C++、 Java、JavaScript等语言要易于学习和掌握
5. 极为强大而丰富的标准库与第三方库
6. Python是面向对象的语言

### 1.3 我为什么喜欢Python

* 简洁、灵活、优雅、哲学 （Python子禅）
* 易于上手难于精通
* Python即有动态脚本的特性，又有面向对象的特性，具有自己特点

### 1.4 Python的缺点

**慢**，相比较C、C++、Java，运行效率较慢

编译型语言（C、C++）、解释型语言（JavaScript、Python）

运行效率和开发效率，鱼与熊掌不可兼得

不能拿汇编和C开发一个Web

合适的才是最好的（应用场景）

### 1.5 一个经典误区

世界不是只有Web，还有很多问题需要使用编程来解决。不要把思维局限在Web上，这只是编程的一个应用方向

举例：几年前统计，世界上70%的网站都用PHP写的，但在当年编程语言流行排行榜PHP仅占2%

### 1.6 Python能做什么

* 爬虫
* 大数据与数据分析（Spark）
* 自动化运维与自动化测试
* Web开发：Flask、Django
* 机器学习：TensorFlow
* 胶水语言：混合其他如C++、Java等来编程。能把用其他语言制作的各种模块（尤其是C/C++）很轻松地结合在一起

当你遇到问题时，随手拿起Python，编写一个工具，这才是 Python的正确打开方式

### 1.7 课程特点

基础语法：是任何语言的基础，只有熟练掌握，才能灵活运用语言，写出高效、优美、简洁的代码

Pythonic：Pythone的语法是非常灵活的且有别具一格。学习语言就要学习它的风格、特点，这才是语言的精粹。Python尤为如此。Pythonic示例，交换变量：`a,b = b,a`

Python高性能与优化：同样的一个功能，可以有数个乃至数十种写法，但每种写法的性能与美观度各不相同。选择性能最高又易于理解的写法才是正确的。

数据结构：我们会尝试用Python来实现一些常见的数据结构。什么事扎实的编程功底？数据结构才是基础。

**框架太多、类库太多、技术太多。让我们回归语言的本质，享受语言本身的纯粹之美。**

## 第3章 理解什么是写代码与Python的基本类型

* Python中`//`双斜杠表示整除

* Python中bool布尔类型的值首字母必须大写：True、False，否则报语法错误！
* Python中Bool布尔类型算是Number数值类型的一个子类。`bool(99) -> True` `bool(0) --False`
