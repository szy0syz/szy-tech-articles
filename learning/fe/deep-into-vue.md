# Vue.js 源码全方位深入解析 收藏   

## 第一章

## 认识Flow

在代码文件最前面加 `/*@flow*/`，表示该文件需要被检测。

安装 `npm i -g flow-bin`

### 工作方式

* **类型判断** ：通过变量的使用上下文来推断出变量类型，然后根据这些推断来检查类型。
* **类型注释**：事先注释好我们期待的类型，Flow 会基于这些注释来判断。

### 类型判断

```js
function add(x: number, y: number): number {
  return x + y
}

var arr: Array<number> = [1, 2, 3]

class Bar {
  x: string;                  // x 是字符串
  y: string | number | void;  // y 可以是字符串或者数字或者不传
  z: boolean;

  constructor(x: string, y: string | number | void) {
    this.x = x
    this.y = y
    this.z = false
  }
}
```

## Vue.js 源码目录设计
