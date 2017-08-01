# What the f*ck JavaScript?

> A list of funny and tricky examples of JavaScript.

JavaScript is a great language. It has a simple syntax, large ecosystem and, what is the most important, great community.

At the same time, all we know that JavaScript is a quite funny language with tricky parts. Some of them can quickly turn our everyday job into hell, some of them can make us laugh out loud.

# 👀 Examples

## `[]` is equal `![]`

Array is equal not array:

```js
[] == ![] // -> true
```
- '==' 会进行强制类型转换
- 还原表达式：`[] == !new Boolean([])` -> `[] == false` --> true
- 到了这步，我以为是`new Boolean([]) == false` --> false, 我靠，怎么回事，竟然错了。好吧，我乖乖去看ecma262~~
