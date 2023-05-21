---
tags:
  - CSS
  - 主题
  - 索引
---
::: slot doclist
[[toc]]
:::

#### 样式表书写位置

1. 内嵌样式

```css
<head>
	<style>
		样式表书写内容
	</style>
</head> 
```

2. 外链

```html
<link href="css文件路径" type="text/css" ref="stylesheet"/>
```

3. 行内

```html
<div style="width: 200px"></div>
```

### 选择器

选择器 {属性:值； 属性:值;}

#### 基础选择器

**标签选择器：**

标签{属性：值;}

特点：标签选择器定义之后，会将页面所有的元素都执行这个标签样式。

```css
div {}
```

**类选择器：**

.名称{属性:值;}

一个标签可以调用多个类选择器。

多个标签可以调用同一个类选择器。

```css
.box {
	color:red
}
```

```html
<div class="box box1">类选择器</div>
```

**id选择器：**

一个ID选择器在一个页面只能调用一次。

```css
#box2 {
	color:red
}
```

```html
<div class="box" id="box2">类选择器</div>
```

**通配符选择器：**

`* {属性:值}`

给所有的标签都使用相同的样式。

```css
* {
	box-boxing: 
}
```

#### 复合选择器

两个或者两个以上的基础选择器通过不同的方式连接在一起

交集选择器：

标签+类（ID）选择器{属性：值；}

即要满足使用了某个标签，还要满足使用了类（id）选择器。

```css
div .box {
	color:red;
}
div #box {
	color: green;
}
```

```css
<div class="box">类box</div>
<div id="box">idbox</div>
```

**后代选择器：**

选择器+空格+选择器{属性：值;}

后代选择器首选要满足包含（嵌套）关系。

父集元素在前边，子集元素在后边。

特点：无限制隔代。

只要能代表标签，标签、类选择器、ID选择器自由组合。

**子代选择器：**

选择器>选择器{属性:值;}

选中直接下一代元素。

```css
div > span {
	color: red;
}
p > span {
	color: green;
}
```

```
<div>
	<p><span>p下的span</span></p>
	<span>div下的span</span>
</div>
```

**并集选择器：**

选择器+，+选择器+，选择器{属性:值;}

#### 属性选择器

| 选择器        | 含义                                |
| ------------- | ----------------------------------- |
| E[attr]       | 存在attr属性即可                    |
| E[attr=val]   | 属性值完全等于val                   |
| E[attr\*=val] | 属性值里包含val字符并且在“任意”位置 |
| E[attr^=val]  | 属性值里包含val字符并且在“开始”位置 |
| E[attr$=val]  | 属性值里包含val字符并且在“结束”位置 |

#### 伪类

除了以前学过的:link、:active、:visited、:hover，CSS3又新增了其它的伪类选择器。

1、结构(位置)伪类

以某元素（E）相对于其父元素或兄弟元素的位置来获取无素；

| 选择器                | 含义                            |
| --------------------- | ------------------------------- |
| E:first-child         | 其父元素的第1个子元素           |
| E:last-child          | 其父元素的最后1个子元素         |
| E:nth-child(n)        | 其父元素的第n个子元素           |
| E:nth-last-child(n)   | 其父元素的第n个子元素（倒着数） |
| E:root                | 文档的根元素                    |
| E:empty               | 无子元素的元素                  |
| E:first-letter        | 元素的首字母                    |
| E:first-line          | 元素的首行                      |
| E:only-child          | 父元素仅有该元素的元素          |
| E:nth-of-type(n)      | 标签中指定顺序索引的标签        |
| E:nth-last-of-type(n) | 标签中指定逆序索引的标签        |
| E:first-of-type       | 标签中为首的标签                |
| E:last-of-type        | 标签中为尾标签                  |
| E:only-of-type        | 元素仅有该标签的标签            |

n遵循线性变化，其取值0、1、2、3、4、... 

n可是多种形式：nth-child(2n+0)、nth-child(2n+1)、nth-child(-1n+3)等；

> 指E元素的父元素，并对应位置的子元素必须是E

目标伪类

E:target 结合锚点进行使用，处于当前锚点的元素会被选中；

排除伪类

E:not(selector) 除selector（任意选择器）外的元素会被选中；

#### 伪元素

1、E::first-letter文本的第一个单词或字（如中文、日文、韩文等）

2、E::first-line 文本第一行；

3、E::selection 可改变选中文本的样式；

4、E::before和E::after

在E元素内部的开始位置和结束位创建一个元素，该元素为行内元素，且必须要结合content属性使用。

E:after、E:before 在旧版本里是伪元素，CSS3的规范里“:”用来表示伪类，“::”用来表示伪元素，但是在高版本浏览器下E:after、E:before会被自动识别为E::after、E::before，这样做的目的是用来做兼容处理。

#### 状态伪类

| 选择器         | 描述                   |
| -------------- | ---------------------- |
| E:target       | 当前锚点的元素         |
| E:read-write   | 可读可写的表单元素     |
| E:blank        | 输入为空的表单元素     |
| E:current()    | 浏览中的元素           |
| E:link         | 未访问的链接元素       |
| E:visited      | 已访问的链接元素       |
| E:focus        | 输入聚焦的表单元素     |
| E:required     | 输入必填的表单元素     |
| E:valid        | 输入合法的表单元素     |
| E:invalid      | 输入非法的表单元素     |
| E:in-range     | 输入范围以内的表单元素 |
| E:out-of-range | 输入范围以外的表单元素 |
| E:checked      | 选项选中的表单元素     |
| E:optional     | 选项可选的表单元素     |
| E:enabled      | 事件启用的表单元素     |
| E:disabled     | 事件禁用的表单元素     |
| E:read-only    | 只读的表单元素         |
| E:past()       | 已浏览的元素           |
| E:future()     | 未浏览的元素           |

#### 条件伪类

| 选择器   | 描述                           |
| -------- | ------------------------------ |
| E:lang() | 基于元素语言来匹配页面元素     |
| E:dir()  | 匹配特定文字书写方向的元素     |
| E:has()  | 匹配包含指定元素的元素         |
| E:is()   | 匹配指定选择器列表里的元素     |
| E:not()  | 用来匹配不符合一组选择器的元素 |

### 文本元素

属性：

`font-size:16px`  ;  文字大小

`font-weight: 700`	;  值从100-900，文字粗细

`font-family`:微软雅黑;  文本的字体

`font-style: normal | italic`;    normal 默认值  italic   斜体

`line-height`: 行高

`text-shadow`，可分别设置偏移量、模糊度、颜色（可设透明度）。

```css
text-shadow: 2px 2px 2px #CCC;
1、水平偏移量 正值向右 负值向左；

2、垂直偏移量 正值向下 负值向上；

3、模糊度是不能为负值；
```

文本属性连写

```
font: font-style font-weight  font-size/line-height  font-family;
```

> font:后边写属性的值。一定按照书写顺序。文本属性连写文字大小和字体为必写项。Font:italic 700 16px/40px  微软雅黑;

`text-align`: 水平位置

`text-indent`：首行缩进

`text-decoration`：下划线

`letter-spacing`：属性增加或减少字符间的空白

`word-spacing`：属性增加或减少字与字之间的空白  (英文里面表示单词之间的空白)

`white-space`：设置或检索对象内文本显示方式， 

```css
white-space:normal ；默认处理方式

white-space:nowrap ；　强制在同一行内显示所有文本，直到文本结束或者遭遇br标签对象才换行。
```

`text-overflow `: 设置或检索是否使用一个省略标记（...）标示对象内文本的溢出

```css
text-overflow : clip ；不显示省略标记（...），而是简单的裁切 

text-overflow：ellipsis ； 当对象内文本溢出时显示省略标记（...）
```

超出省略的常用代码

```css
/*1. 先强制一行内显示文本*/
white-space: nowrap;
/*2. 超出的部分隐藏*/
overflow: hidden;
/*3. 文字用省略号替代超出的部分*/
text-overflow: ellipsis;
```

**行高**

`line-height`

浏览器默认文字大小

浏览器默认文字大小：16px

行高：是基线与基线之间的距离

行高=文字高度+上下边距

| **单独给一个标签设置行高** | **结果**             |
| -------------------------- | -------------------- |
| 如果行高单位是px           | 行高与文字大小无关   |
| 如果行高单位是em           | 行高=文字大小*行高值 |
| 如果行高单位是 %           | 同上                 |
| 如果行高没有单位           | 同上                 |

一行文字行高和父元素高度一致的时候，垂直居中显示。

**行高的单位**

| 行高单位 | 文字大小 | 值   |
| -------- | -------- | ---- |
| 20px     | 20px     | 20px |
| 2em      | 20px     | 40px |
| 150%     | 20px     | 30px |
| 2        | 20px     | 40px |

总结:单位除了像素以为，行高都是与文字大小乘积。

| 行高单位 | 父元素文字大小 | 子元素文字大小 | 行高 |
| -------- | -------------- | -------------- | ---- |
| 40px     | 20px           | 30px           | 40px |
| 2em      | 20px           | 30px           | 40px |
| 150%     | 20px           | 30px           | 30px |
| 2        | 20px           | 30px           | 60px |

| **给父元素设置行高** | **子元素行高结果**                                 |
| -------------------- | -------------------------------------------------- |
| 行高单位是px         | 行高=父元素行高                                    |
| 行高单位是em         | 行高=父元素文字大小*行高值（与子元素文字大小无关） |
| 行高单位是%          | 同上                                               |
| 行高单位无           | **行高=子元素文字大小\*行高值**                    |

总结:不带单位时，行高是和子元素文字大小相乘，em和%的行高是和父元素文字大小相乘。行高以像素为单位，就是定义的行高值。

**垂直对齐**

- 有宽度的块级元素居中对齐，是margin: 0 auto;
- 让文字居中对齐，是 text-align: center;

但是我们从来没有讲过有垂直居中的属性。

vertical-align 垂直对齐，它只针对于**行内元素**或者**行内块元素**

![image-20230220220136547](./images/image-20230220220136547.png) 

```css
vertical-align : baseline |top |middle |bottom 
```

vertical-align 不影响块级元素中的内容对齐，它只针对于**行内元素**或者**行内块元素**，

特别是行内块元素， **通常用来控制图片/表单与文字的对齐**。

与图片结合的对齐方式

![image-20230220220302512](./images/image-20230220220302512.png) 



### 颜色

**颜色的显示方式：**

直接写颜色的名称： "red"

十六进制显示颜色： 前2为代表红色，中间2位代表绿色，后边2位代表蓝色

rgb：rgb(110,110,110)

rgba： rgba(110,110,110,0.2)，0.2为透明度。0-1之间，0为完全透明，1为不透明

新增了RGBA、HSLA模式，其中的A 表示透明度通道，即可以设置颜色值的透明度，相较opacity，它们不具有继承性，即不会影响子元素的透明度。

所示为颜色表示方法：

Red、Green、Blue、Alpha即RGBA

Hue、Saturation、Lightness、Alpha即HSLA

不同的颜色表示方法其取值也不相同，具体如下：

```
R、G、B 取值范围0~255

H 色调 取值范围0~360，0/360表示红色、120表示绿色、240表示蓝色

S 饱和度 取值范围0%~100%

L 亮度 取值范围0%~100%

A 透明度 取值范围0~1
```

RGBA、HSLA可应用于所有使用颜色的地方。

关于CSS透明度：

1、opacity只能针对整个盒子设置透明度，子盒子及内容会继承父盒子的透明度；

2 、transparent 不可调节透明度，始终完全透明

### 盒子模型

所谓盒子模型就是把HTML页面中的元素看作是一个矩形的盒子，也就是一个盛装内容的容器。每个矩形都由元素的内容、内边距（padding）、边框（border）和外边距（margin）组成。

CSS3中可以通过box-sizing 来指定盒模型，即可指定为content-box、border-box，这样我们计算盒子大小的方式就发生了改变。

可以分成两种情况：

1、box-sizing: border-box  盒子大小为 width

2、box-sizing: content-box  盒子大小为 width + padding + border



![image-20220624065351549](./images/image-20220624065351549.png) 

css中盒子模型由三部分组成: 边框（border） 内边距（padding） 外边距（margin） 



**边框**  border

```css
border-top-style:  solid  实线 
dotted  点线
dashed  虚线

border-top-color:  边框颜色

border-top-width:  边框粗细
```

四个边框值相同的写法

```css
border: 12px solid red;
```

边框合并   border-collapse:collapse;

**获取焦点**

```
.username {
	border: 0 none;去掉边框
	outline-style: none;去掉轮廓线
	background: #ccc
}
.username:focus {
	background: red
}
```

label  for  id    获取光标焦点

```html
<label for="username">用户名：</label><input type='text' class="username" id="username">
```

| 轮廓线       | outline-style:none  取消轮廓线 |
| ------------ | ------------------------------ |
| 获取焦点     | :focus 获取鼠标光标状态        |
| 取消表单边框 | border:0 none;      兼容性好   |
| label标签    | `<label for="ID名">`   友好性  |

**内边距**

Padding-left  |  right   |  top  |  bottom

padding连写

```css
Padding: 20px;  上右下左内边距都是20px

Padding: 20px 30px;  上下20px  左右30px

Padding: 20px  30px  40px;  上内边距为20px  左右内边距为30px  下内边距为40

Padding:  20px  30px  40px  50px;  上20px 右30px  下40px  左  50px
```

内边距撑大盒子的问题:

影响盒子宽度的因素

1. 内边距影响盒子的宽度
2. 边框影响盒子的宽度

> 盒子的宽度=定义的宽度+边框宽度+左右内边距

继承的盒子一般不会被撑大:

包含（嵌套）的盒子，如果子盒子没有定义宽度，给子盒子设置左右内边距，一般不会撑大盒子。

**外边距**

用法与padding一样，margin对盒子宽度不会有影响

margin-left  | right  |  top  |  bottom

外边距连写

```css
margin: 20px;   上下左右外边距20PX

margin: 20px 30px;  上下20px  左右30px

margin: 20px  30px  40px;   上20px  左右30px  下  40px

margin: 20px  30px  40px  50px; 上20px  右30px  下40px  左50px
```

垂直方向外边距合并

外边距合并（叠加）是一个相当简单的概念。
简单地说，外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。
当一个元素出现在另一个元素上面时，第一个元素的下外边距与第二个元素的上外边距会发生合并。

两个盒子垂直一个设置上外边距，一个设置下外边距，取的设置较大的值。

边距合并问题只发生在块级元素之间

嵌套的盒子外边距塌陷

解决方法:  1  给父盒子设置边框

​      			2  给父盒子overflow:hidden;  BFC  格式化上下文

**标准流初体验**

![image-20220624070109347](./images/image-20220624070109347.png) 

![image-20220624070114821](./images/image-20220624070114821.png) 

标准流：块级元素纵向有序排列，行内块（行内）元素横向有序排列

### 浮动

语法：float:left  |  right

设置了浮动的元素，脱离标准流

浮动特点

1：浮动找浮动，不浮动找不浮动
2：浮动只影响后面的元素
3：浮动以元素顶部为基准对齐
4：浮动可是实现模式转换（span 设置浮动可以设置宽高）
5：让块级元素在一行显示

当父容器没有设置高度，里面的盒子没有设置浮动的情况下会将父容器的高度撑开。一旦父容器中的盒子设置浮动，脱离标准文档流，父容器立马没有高度，下面的盒子会跑到浮动的盒子下面。出现这种情况，我们需要清除浮动

**清除浮动的方式**

1：给父容器设置高度

2：通过设置`clear`

- left：不允许左侧有浮动元素（清除左侧浮动的影响）
- right  不允许右侧有浮动元素（清除右侧浮动的影响）
- both   同时清除左右两侧浮动的影响

3：给父容器设置 `overflow`

可以给父级添加： overflow为 hidden| auto| scroll  都可以实现

4：通过伪元素  

 ```CSS
.clearfix:after{
    content:"";
    height:0; line-height:0;
    visibily:hidden;
    clear:both;
    display:block;
}
.clearfix{
    zoom:1    　　　为了兼容IE浏览器
}
 ```

5: 使用双伪元素清除浮动

```css
.clearfix:before,.clearfix:after { 
  content:"";
  display:table; 
}
.clearfix:after {
 clear:both;
}
.clearfix {
  *zoom:1;
}
```



**Overflow**

overflow 属性规定当内容溢出元素框时发生的事情。

| 属性              | 描述                                                     |
| ----------------- | -------------------------------------------------------- |
| overflow: visible | 默认值。内容不会被修剪，会呈现在元素框之外。             |
| overflow: hidden  | 内容会被修剪，并且其余内容是不可见的。                   |
| overflow: scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容。 |
| overflow: auto    | 如果内容被修剪，则浏览器会显示滚动条以便查看其余的内容。 |

### 定位

定位是通过定位模式 + 偏移量使得本应该在标准流当中的盒子发生位置上的变化

| **语法**           | **介绍** |
| ------------------ | -------- |
| position: static   | 静态定位 |
| position: absolute | 绝对定位 |
| position: relative | 相对定位 |
| position: fixed    | 固定定位 |

1. 绝对定位（absloute）

- 是元素以带有定位的父级元素来移动位置 
- 当一个盒子包含在另一个盒子中，父盒子未设置定位，子盒子以浏览器左上角为基准设置位置； 当父盒子设置定位，子盒子以父盒子左上角为基准设置位置
- 绝对定位绝对不占空间位置（与浮动一样）
- 绝对定位可是实现模式转换

2. 相对定（relative)

- 相对定位以元素自身的位置为基准设置位置

- 相对定位占位置

- 一般子元素设置相对定位，父元素设置绝对定位（子绝父相）

3. 固定定位（fixed）

- 固定定位不占位置

4. 静态定位（static）
   按照标准流的显示方式    取消定位：position:static
   
   只认**浏览器的可视窗口** —— `浏览器可视窗口 + 边偏移属性` 来设置元素的位置；
   
   不随滚动条滚动

**水平居中**

步骤：1 设置父盒子为相对定位
           2 设置子盒子left值为父盒子宽度一半
           3  设置子盒子左边距为自己宽度一半

总结：margin: 0 auto 只能让在标准流的盒子居中

```
规范：
1：行内元素尽量里面包含行内元素
	不推荐:   <a href=”#”>   <h2> 标题 </h2 ></a>

2: 有些块级元素不能包含其他块级元素
    标题标签，段落标签不能包含div
    尤其是P标签不能包含div
```

由于浮动、定位都脱离了标准流，会对网页布局造成一定的影响，在以后的网页布局中优先考虑：标准流，浮动，定位

在使用**绝对定位**时要想实现水平居中，可以按照下图的方法：

1. `left: 50%;`：让**盒子的左侧**移动到**父级元素的水平中心位置**；
2. `margin-left: -100px;`：让盒子**向左**移动**自身宽度的一半**。

**使用margin-left: auto  规避脱标**

margin: 0 auto         居中对齐的由来

margin-left: auto     让盒子左侧充满
margin-right: auto    让盒子右侧充满

![image-20220624230446628](./images/image-20220624230446628.png) 

规避脱标流之 让图片和文字垂直对齐

使用 vertical-align:middle  让行内，行内块元素设置垂直距离

vertical-align:middle  常与 display:inline-block 配合使用， 表格对此属性最敏感

![image-20220624230535041](./images/image-20220624230535041.png) 

### 可见性

| 属性               | **作用**         |
| ------------------ | ---------------- |
| overflow：hidden   | 隐藏超出的那部分 |
| display：none      | 不显示元素       |
| visibility:hidden; | 不显示元素       |

特点总结：
 display: none        元素隐藏不占位置
overflow: hidden;  将超出部分的元素隐藏
visibility: hidden;    元素隐藏占位置

**overflow**

| 属性值  |                                            |
| ------- | ------------------------------------------ |
| visible | 不剪切内容也不添加滚动条                   |
| hidden  | 不显示超过对象尺寸的内容，超出的部分隐藏掉 |
| scroll  | 不管超出内容否，总是显示滚动条             |
| auto    | 超出自动显示滚动条，不超出不显示滚动条     |

使用text-indent移除文字

使用padding撑开盒子，overflow：hidden 移除内容

### 鼠标样式

设置或检索在对象上移动的鼠标指针采用何种系统预定义的光标形状。

| 属性值          | 描述       |
| --------------- | ---------- |
| **default**     | 小白  默认 |
| **pointer**     | 小手       |
| **move**        | 移动       |
| **text**        | 文本       |
| **not-allowed** | 禁止       |

### 边框

#### 边框圆角

border-radius

圆角处理时，脑中要形成圆、圆心、横轴、纵轴的概念，正圆是椭圆的一种特殊情况。

分别设置横纵轴半径，以“/”进行分隔，遵循“1，2，3，4”规则，“/”前面的1~4个用来设置横轴半径（分别对应横轴1、2、3、4位置 ），“/”后面1~4个参数用来设置纵轴半径（分别对应纵轴1、2、3、4位置 ）。

支持简写模式，具体如下：

1、border-radius: 10px; 表示四个角的横纵轴半径都为10px；

2、border-radius: 10px 5px; 表示1和3角横纵轴半径都为10px，2和4角横纵轴半径为5px；

3、border-radius: 10px 5px 8px; 表示1角模纵轴半径都为10px，2和4角横纵轴半径都为8px，3角的横纵轴半径都为8px；

4、border-radius: 10px 8px 6px 4px; 表示1角横纵轴半径都为10px，表示2角横纵轴半径都为8px，表示3角横纵轴半径都为6px，表示4角横纵轴半径都为6px；

#### 边框阴影

box-shadow

与文字阴影类似，可分别设置盒子阴影偏移量、模糊度、颜色（可设透明度）。

如box-shadow: 5px 5px 5px #CCC

1、水平偏移量 正值向右 负值向左；

2、垂直偏移量 正值向下 负值向上；

3、模糊度是不能为负值；

4、inset可以设置内阴影；

> 设置边框阴影不会改变盒子的大小，即不会影响其兄弟元素的布局。可以设置多重边框阴影，实现更好的效果，增强立体感，符合渐进增强

#### 边框图片

border-image

设置的图片将会被“切割”成九宫格形式，然后进行设置。

最少“4刀”便可以将一个图片切成9部分，“切割”完成后生成虚拟的9块图形，

将一个盒子想象是由9部分组成的，分别是左上角、上边框、右上角、右边框、右下角、下边框、左下角、左边框、中间，那么浏览器会将切割好的9张虚拟图片分别对应到盒子的各个部分上。

其中四个角位置、形状保持不变，中心位置水平垂直两个方向平铺或拉伸，

```
border-image-source 指定图片路径

border-image-repeat    指定裁切好的虚拟图片的平铺方式

a) round会自动调整尺寸，完整显示边框图片

b) repeat 单纯平铺,多余部分，会被“裁切”而不能完整显示。

3border-image-slice

4border-image-width
```

### 轮廓线 outline

 是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。 

```css
 outline : outline-color ||outline-style || outline-width 
```

 但是我们都不关心可以设置多少，我们平时都是去掉的。 li  

最直接的写法是 ：  outline: 0;   或者  outline: none;

```html
 <input  type="text"  style="outline: 0;"/>
```



**CSS 精灵工作原理**
CSS 精灵其实是将网页中的一些背景图像整合到一张大图中（精灵图）。然而，各个网页元素通常只需要精灵图中不同位置的某个小图，要想精确定位到精灵图中的某个小图，就需要使用CSS的`background-image`、`background-repeat`和`background-position`属性进行背景定位，其中最关键的是使用`background-position`属性精确地定位。

精灵图用法总结：
1：精灵图只能用打开的方式，不能使用导入得方式打开
2：使用精灵图的时候注意坐标位置的正负取值

| 元字符 | 含义       | 示例                                                         |
| ------ | ---------- | ------------------------------------------------------------ |
| []     | 全部可选项 | `padding: [<length> | <percentage>]{1, 4}`                   |
| \|\|   | 并列       | `border: <line-width> || <line-style> || <color>`            |
| \|     | 多选一     | position: static \| relative \| absolute \| fixed            |
| ?      | 0个或1个   | `box-shadow: none | <shadow>[, <shadow>]* <shadow>: inset? && <length>{2, 4} && <color>?` |
| *      | 0个或多个  |                                                              |
| {}     | 范围       |                                                              |

### 背景

 **1、background-size**

通过background-size设置背景图片的尺寸，就像我们设置img的尺寸一样，在移动Web开发中做屏幕适配应用非常广泛。

**其参数设置如下：**

- 可以设置长度单位(px)或百分比（设置百分比时，参照盒子的宽高）

- 设置为cover时，会自动调整缩放比例，保证图片始终填充满背景区域，如有溢出部分则会被隐藏。

- 设置为contain会自动调整缩放比例，保证图片始终完整显示在背景区域。 

**2、background-origin**

通过background-origin可以设置背景图片定位(background-position)的参照原点。

**参数设置如下：**

- border-box以边框做为参考原点；

- padding-box以内边距做为参考原点；

- content-box以内容区做为参考点；

**3、background-clip**

通过background-clip，可以设置对背景区域进行裁切，即改变背景区域的大小。

**其参数设置如下：**

- border-box裁切边框以内为背景区域；

- padding-box裁切内边距以内为背景区域；

- content-box裁切内容区做为背景区域；

**4、多背景**

以逗号分隔可以设置多背景，可用于自适应布局

**5、背景其他属性**

| 背景属性    | 默认值      | 可选                                        | 描述                 |
| ----------- | ----------- | ------------------------------------------- | -------------------- |
| -color      | transparent | 各种颜色值                                  | 背景颜色             |
| -image      | none        | none \| url                                 | 背景图片             |
| -repeat     | repeat      | repeat \| no-repeat \| repeat-x \| repeat-y | 背景平铺             |
| -position   |             | length \|\| length  position \|\| position  | 背景定位             |
| -attachment |             | scroll \| fixed                             | 背景是滚动的还是固定 |

**background-position**

- 必须先指定background-image属性
- position 后面是x坐标和y坐标。 可以使用方位名词或者 精确单位。
- 如果指定两个值，两个值都是方位名字，则两个值前后顺序无关，比如left  top和top  left效果一致
- 如果只指定了一个方位名词，另一个值默认居中对齐。
- 如果position 后面是精确坐标， 那么第一个，肯定是 x  第二的一定是y
- 如果只指定一个数值,那该数值一定是x坐标，另一个默认垂直居中
- 如果指定的两个值是 精确单位和方位名字混合使用，则第一个值是x坐标，第二个值是y坐标

**background-attachment**

- scroll  背景图像是随对象内容滚动

- fixed: 背景图像固定

**背景简写**

```css
background: transparent url(image.jpg) repeat-y  scroll center top ;
```

### 图片

我们可以给图片设置圆角（`border-radius`）、阴影(`text-shadow`)、边框(`border`)

如果你需要自由缩放图片，且图片放大的尺寸不大于其原始的最大值，则可使用以下代码

```css
img {
    max-width: 100%;
    height: auto;
}
```

**图片滤镜**

 `filter` 属性用为元素添加可视效果

修改所有图片的颜色为黑白 (100% 灰度):

```css
img {
    -webkit-filter: grayscale(100%);
    filter: grayscale(100%);
}
```



### 渐变

渐变是CSS3当中比较丰富多彩的一个特性，通过渐变我们可以实现许多炫丽的效果，有效的减少图片的使用数量，并且具有很强的适应性和可扩展性。

####  线性渐变

linear-gradient线性渐变指沿着某条直线朝一个方向产生渐变效果，是从黄色渐变到绿色。

**1、必要的元素：**

借助Photoshop总结得出线性渐变的必要元素

```
a、方向

b、起始色

c、终止色

d、渐变距离
```

**2、关于方向**

设置渐变方向，可以用关键字如to top、to right，也可以用角度（正负值均可）如45deg、-90deg等，当以角度做为参数时，0deg从下往上，90deg从左向右，进而可以推算出180deg从上向下。

> 我们可以设置渐变的起始点，这个起始点的值可以是百分比形式，这个百分比在没有设置background-size时，是相对于盒子大小的，当设置了background-size时则是相对于background-size的。

#### 径向渐变

radial-gradient径向渐变指从一个中心点开始沿着四周产生渐变效果

**1、必要的元素：**

```
a) 辐射范围即圆半径 

b) 中心点 即圆的中心

c) 渐变起始色

d) 渐变终止色

e) 渐变范围
```

**2、关于中心点**

中心位置参照的是盒子的左上角，例如background-image: radial-gradient(120px at 0 0 yellow green)其圆心点为左上角，background-image: radial-gradient(120px at 0 100% yellow green)其圆心为左下角。

**3、关于辐射范围**

其半径可以不等，即可以是椭圆，如background-image: radial-gradient(120px 100px at 0 0 yellow green)会是一个椭圆形（横轴120px、纵轴100px）的渐变。

###  过渡

transition属性拆解如下表：

| 属性                       | 示例 | 含义         |
| -------------------------- | ---- | ------------ |
| transition-property        |      | 设置过渡属性 |
| transition-duration        |      | 设置过渡时间 |
| transition-timing-function |      | 设置过渡速度 |
| transition-delay           |      | 设置过渡延时 |

###  2D转换

转换是CSS3中具有颠覆性的特征之一，可以实现元素的位移、旋转、变形、缩放，甚至支持矩阵方式，配合过渡和即将学习的动画知识，可以取代大量之前只能靠Flash才可以实现的效果。

1、移动 translate(x, y) 可以改变元素的位置，x、y可为负值；

a) 移动位置相当于自身原来位置

b)  y轴正方向朝下

c) 除了可以像素值，也可以是百分比，相对于自身的宽度或高度

2、缩放 scale(x, y) 可以对元素进行水平和垂直方向的缩放，x、y的取值可为小数；

3、旋转 rotate(deg) 可以对元素进行旋转，正值为顺时针，负值为逆时针；

a) 当元素旋转以后，坐标轴也跟着发生的转变

b) 调整顺序可以解决，把旋转放到最后

4、倾斜 skew(deg, deg) 可以使元素按一定的角度进行倾斜，可为负值，第二个参数不写默认为0。

5、矩阵matrix() 把所有的2D转换组合到一起，需要6个参数（了解）。

[关于矩阵的学习资料](http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-矩阵/comment-page-2/)

6、transform-origin可以调整元素转换的原点



我们可以同时使用多个转换，其格式为：transform: translate() rotate() scale() ...等，其顺序会影响转换的效果。

###  3D转换

**1、左手坐标系**

伸出左手，让拇指和食指成“L”形，大拇指向右，食指向上，中指指向前方。这样我们就建立了一个左手坐标系，拇指、食指和中指分别代表X、Y、Z轴的正方向。

**2、CSS中的3D坐标系**

CSS3中的3D坐标系与上述的3D坐标系是有一定区别的，相当于其绕着X轴旋转了180度，

**3、左手法则**

左手握住旋转轴，竖起拇指指向旋转轴正方向，正向就是其余手指卷曲的方向。

**4、透视（perspective）**

电脑显示屏是一个2D平面，图像之所以具有立体感（3D效果），其实只是一种视觉呈现，通过透视可以实现此目的。

透视可以将一个2D平面，在转换的过程当中，呈现3D效果。

**注：并非任何情况下需要透视效果，根据开发需要进行设置。**

**perspective有两种写法**

a) 作为一个属性，设置给父元素，作用于所有3D转换的子元素

 b) 作为transform属性的一个值，做用于元素自身

**5、理解透视距离**

透视会产生“近大远小”的效果

**6、3D呈现（transform-style）**

设置内嵌的元素在 3D 空间如何呈现，这些子元素必须为转换原素。

flat：所有子元素在 2D 平面呈现

preserve-3d：保留3D空间

3D元素构建是指某个图形是由多个元素构成的，可以给这些元素的父元素设置transform-style: preserve-3d来使其变成一个真正的3D图形。

**7、backface-visibility**

设置元素背面是否可见

[**参考文档**](http://isux.tencent.com/css3/index.html?transform)

###  动画

动画是CSS3中具有颠覆性的特征之一，可通过设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。

#### CSS3动画库

animate.css

**1、必要元素：**

a、通过@keyframes指定动画序列；

b、通过百分比将动画序列分割成多个节点；

c、在各节点中分别定义各属性

d、通过animation将动画应用于相应元素；

**2、关键属性**

a、animation-name设置动画序列名称

b、animation-duration动画持续时间

c、animation-delay动画延时时间

d、animation-timing-function动画执行速度，linear、ease等

e、animation-play-state动画播放状态，running、paused等

f、animation-direction动画逆播，alternate等

g、animation-fill-mode动画执行完毕后状态，forwards、backwards等

h、animation-iteration-count动画执行次数，inifinate等

i、steps(60) 表示动画分成60步完成

**参数值的顺序：**

关于几个值，除了名字，动画时间，延时有严格顺序要求其它随意

## 布局

### 伸缩布局

主轴：Flex容器的主轴主要用来配置Flex项目，默认是水平方向

侧轴：与主轴垂直的轴称作侧轴，默认是垂直方向的

方向：默认主轴从左向右，侧轴默认从上到下

主轴和侧轴并不是固定不变的，通过flex-direction可以互换。

**1、必要元素：**

a、指定一个盒子为伸缩盒子 display: flex

b、设置属性来调整此盒的子元素的布局方式 例如 flex-direction

c、明确主侧轴及方向

d、可互换主侧轴，也可改变方向

**2、各属性详解**

a、flex-direction调整主轴方向（默认为水平方向）

b、justify-content调整主轴对齐

c、align-items调整侧轴对齐

d、flex-wrap控制是否换行

e、align-content堆栈（由flex-wrap产生的独立行）对齐

f、flex-flow是flex-direction、flex-wrap的简写形式

g、flex子项目在主轴的缩放比例，不指定flex属性，则不参与伸缩分配

h、order控制子项目的排列顺序，正序方式排序，从小到大

### 多列布局

类似报纸或杂志中的排版方式，上要用以控制大篇幅文本。

分几列
-webkit-column-count:3;
分割线
-webkit-column-rule:1px dashed red;
设置列间距
-webkit-column-gap:60px;
列宽度
-webkit-column-width: 400px;

### 网格布局

