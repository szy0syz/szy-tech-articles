# CSS3学习笔记

## 文本

### text-overflow

文本溢出时的样式

1. clip: 隐藏超出文本
2. ellipsis: 超出部分使用省略号

```css
overflow: hidden;
text-overflow: clip;
```

对于省略号效果还需要其它属性配合

```css
overflow:hidden;
text-overflow:ellipsis;
white-space: nowrap;
```

### 文本换行

- `word-wrap`: 允许长单词或 URL 地址换行到下一行
  1. normal: 只在允许的断字点换行
  2. break-word: 在长单词或 URL 地址内部进行换行

- `word-break`: 规定自动换行的处理方法
  1. normal 使用浏览器默认的换行规则
  2. break-all 允许在单词内换行
  3. keep-all 只能在半角空格或连字符处换行

- `white-space`: 设置如何处理元素内的空白
  1. normal 默认。连续空白会被浏览器忽略
  2. pre 空白会被浏览器保留。其行为方式类似 HTML 中的 标签
  3. nowrap 文本不会换行，文本会在在同一行上继续，直到遇到标签为止
  4. pre-wrap 保留空白符序列，但是正常地进行换行
  5. pre-line 合并空白符序列，但是保留换行符
  6. inherit 规定应该从父元素继承 white-space 属性的值

- text-shadow

    text-shadow: 颜色(Color)  x轴(X Offset) y轴(Y Offset) 模糊半径(Blur)
    text-shadow: x轴(X Offset) y轴(Y Offset)  模糊半径(Blur)  颜色(Color)
    
和box-shdow很像，可以设置偏移、颜色、阴影大小：

    text-shdow: 2px 2px 3px #333;

可以写多个`，`隔开：

    text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 40px #ff00de, 0 0 70px #ff00de;

----------

## 动画

### 初次遇见`animation`

- 今天高仿猎豹浏览器官网时，第一次学习使用`animation`，果断记录下来。使用原理步骤大概分为：
  - 首先定义动画具体怎么运动的：`@keyframes 动画名称`，这里的大括号里又分from和to两个样式，分别设置改元素从动画开始到动画结束时的具体形状样式
  - 然后定义动画时间和方式：在某个选择器中定义动画运动时间等`animation: navhover 0.2s linear 0s 1 normal;`，这里第一个参数就是动画名称。
  - 最后在JS或别的方式触发这个样式即可触发动画！

```css
.nav-main a i.nav-hover {
    display: block;
    animation-name: navhover;
    -webkit-animation: navhover 0.2s linear 0s 1 normal;
    -moz-animation: navhover 0.2s linear 0s 1 normal;
    animation: navhover 0.2s linear 0s 1 normal;
    background: rgba(0, 0, 0, 0.1);
    color: #fff;
}

@-webkit-keyframes navhover {
    from {
        opacity: 0;
        -webkit-transform: scale(0, 1);
    }
    to {
        opacity: 1;
        -webkit-transform: scale(1, 1);
    }
}

@-moz-keyframes navhover {
    from {
        opacity: 0;
        -moz-transform: scale(0, 1);
    }
    to {
        opacity: 1;
        -moz-transform: scale(1, 1);
    }
}

@keyframes navhover {
    from {
        opacity: 0;
        transform: scale(0, 1);
    }
    to {
        opacity: 1;
        transform: scale(1, 1);
    }
}
```

