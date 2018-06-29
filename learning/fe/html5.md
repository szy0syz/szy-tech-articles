# HTML5学习笔记

## 标签和元素变化

### DOCTYPE

XHTML
```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

HTML5
```html
<!DOCTYPE html>
```

### 文档编码

XHTML：

```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
```

HTML5 ：

```html
<meta charset="UTF-8" />
```

### 标签结尾

在XHTML中每个标签都必需结束，在HTML5中对于一些标签不再是必要的，详情如下：

    li dt dd p rt rp optgroup option colgroup thead tbody tfoot tr td th

自结束的标签最后的/也不再必要

    img input br hr 等

### 具有boolean值的属性

对于具有boolean值的属性，例如disable和readonly等只写属性不写属性值时值为true

```html
<input type="checkbox" checked >
<input type="checkbox" checked="checked" >
<input type="checkbox" checked="" >
```

### 省略属性值的引号

属性值可以用单引号或者双引号，在属性值不包括<、>、=、'、"时可以忽略引号

```html
<input type=text >
```

### 新增元素

| 元素        | 描述   |
| :---   | :---  |
| canvas     | 标签定义图形，比如图表和其他图像。该标签基于 JavaScript 的绘图 API |
| audio        |   定义音频内容   |
|video	|定义视频（video 或者 movie）|
|source	|定义多媒体资源 `<video>` 和 `<audio>` |
|embed	|定义嵌入的内容，比如插件|
|track	|为诸如 `<video>` 和 `<audio>` 元素之类的媒介规定外部文本轨道|
|datalist	|定义选项列表。与 input 元素配合使用该元素，来定义input |可能的值|
|keygen	|规定用于表单的密钥对生成器字段|
|output	|定义不同类型的输出，比如脚本的输出|
|article	|定义页面正文内容|
|aside	|定义页面内容之外的内容|
|bdi	|设置一段文本，使其脱离其父元素的文本方向设置|
|command	|定义命令按钮，比如单选按钮、复选框或按钮|
|details	|用于描述文档或文档某个部分的细节|
|dialog	|定义对话框，比如提示框|
|summary	|标签包含 details 元素的标题|
|figure	|规定独立的流内容（图像、图表、照片、代码等等）|
|figcaption	|定义 \<figure\> 元素的标题|
|footer	|定义 section 或 document 的页脚|
|header	|定义了文档的头部区域
|mark	|定义带有记号的文本
|meter	|定义度量衡。仅用于已知最大和最小值的度量
|nav	|导航
|progress	|定义任何类型的任务的进度
|ruby	|定义 ruby 注释（中文注音或字符）
|rt	|定义字符（中文注音或字符）的解释或发音
|rp	|在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容|
|section	|定义文档中的节（section、区段）|
|time	|定义日期或时间|
|wbr	|规定在文本中的何处适合添加换行符|

### input 新增type

- email
- url
- number
- range
- Date Picker
  - Date
  - month
  - week
  - time
  - datatime

### 移除的元素

- 能被CSS替代的元素
   1. basefont
   2. big
   3. center
   4. font
   5. s
   6. u
   7. tt
   8. strike

- 不再使用frame框架
   1. frame
   2. frameset
   3. noframes

- 其它
  1. rb => ruby
  2. acronym => abbr
  3. dir => ul
  4. isindex => input
  5. listing => pre
  6. xmp => code
  7. nextid => CUIDS
  8. plaintext => text/plain 

### 新增属性

- 全局属性
  1. contentEditable
  2. designMode
  3. hidden
  4. spellcheck
  5. tabindex

- 表单相关
  1. autofocus
  2. placeholder
  3. form
  4. required
  5. formaction, formenctype, formmethod, formtarget, formnovalidate
  6. novalidate

- 链接相关
  1. a和area新增`media`
  2. link新增`sizes`属性
  3. base新增`target`属性
  4. area新增hreflang和rel

- 其它
  1. ol新增 reversed 
  2. meta新增 charset
  3. menu新增 type和label
  4. style新增 scoped
  5. script新增 async
  6. html新增 manifest
  7. iframe新增sandbox， seamless， srcdoc

- 废弃的属性

[废弃的元素和属性](http://www.cnblogs.com/TomXu/archive/2011/12/17/2269168.html)

- 参考

[HTML 参考手册](http://www.w3school.com.cn/tags/)
  
    
