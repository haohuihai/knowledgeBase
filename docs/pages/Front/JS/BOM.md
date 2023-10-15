## BOM  (浏览器对象模型)

由浏览器提供的用于处理文档之外的所有内容的其他对象

有以下API

- navigator
- screen
- location
- frames
- history
- XMLHttpRequest
.....

### 三大特性

#### 特性一 **offset**

offset这个单词本身是--偏移，补偿，位移的意思。

js中有一套方便的获取元素尺寸的办法就是`offset`；

**offset常用属性**

`offsetWidth`  `offsetHeight`

得到对象的宽度和高度(自己的，与他人无关)

`offsetWidth = width+padding+border`

`offsetLeft`  `offsetTop`

返回距离上级盒子（带有定位）左边的位置

如果父级都没有定位则以`body` 为准

`offsetLeft `从父亲的`padding` 开始算  父亲的`border `不算

**offsetParent**

1、返回该对象的父级 （带有定位）

 如果当前元素的父级元素没有进行CSS定位 （`position`为`absolute`或`relative`，`fixed`）， offsetParent为body。

2、如果当前元素的父级元素中有CSS定位 （`position`为`absolute`或`relative`，`fixed`）， `offsetParent`取最近的那个父级元素。

**offsetTop 和 style.top 的区别**

1)、最大区别在于` offsetLeft `可以返回没有**定位** 盒子 的距离左侧的位置。 而 style.top 不可以

2)、`offsetTop` 返回的是数字，而 `style.top` 返回的   是字符串，除了数字外还带有单位：px。

3)、`offsetTop` 只读，而` style.top `可读写。

4)、如果没有给 HTML 元素指定过 top 样式，则  style.top 返回的是空字符串。

#### 特性二**scroll**

主要包括：

1、`scrollWidth` / `scrollHeight` 内容的宽高

IE67可以比盒子小。 IE8+火狐谷歌不能比盒子小

2、`scrollLeft` / `scrollTop`

被卷去的左侧和头部（浏览器无法显示的左/头部）

 一般调用`document.body.scrollTop`:

3、`onscroll` 滚动事件(`window.onscroll = fun...`)

```js
// 第一种
window.addEventListener('scroll', function() {
  document.getElementById('showScroll').innerHTML = window.pageYOffset + 'px';
});

// 第二种

windpw.onscroll = function() {
    
}
```

屏幕每滚动一次，哪怕只有1像素都会触发这个事件。这样就可以用来检测屏幕滚动了。 

**兼容问题**

> 未声明 DTD（谷歌只认识他）（IE9+认识他）document.body.scrollTop
>
> 已经声明DTD（IE678只认识他）(IE9+任何时候)
>
>   document.documentElement.scrollTop
>
> 火狐/谷歌/ie9+以上支持的(不管DTD)
>
>   window.pageYOffset

**Html基本结构访问方法**

获取`title`、`body`、`head`、`html`标签

`document.title` --- 文档标题；

`document.head` --- 文档的头标签

`document.body` --- 文档的body标签；

`document.documentElement `--- 这个很重要

它表示文档的`html`标签， 也就是说，基本结构当中的`html`标签并不是通过`document.html `去访问的，而是`document.documentElement` 。

为了兼容，不管有没有 DTD，可以使用如下代码：

```js
var scrollTop = window.pageYOffset || document.documentElement.scrollTop   || document.body.scrollTop； 
var scrollTop = document.documentElement.scrollTop + document.body.scrollTop；
```

**滚动到指定坐标**

`window.scrollTo()`

方法可把内容滚动到指定的坐标。

格式：

```js
scrollTo(xpos, ypos)

// xpos 必需。要在窗口文档显示区左上角显示的文档的 x 坐标。

// ypos 必需。要在窗口文档显示区左上角显示的文档的 y 坐标
```

**事件对象event**

再触发DOM上的某个事件时，会产生一个事件对象event，这个对象中包含着所有与事件有关的信息。所有浏览器都支持event对象，但支持的方式不同。

比如鼠标操作时候，会添加鼠标位置的相关信息到事件对象中。（类似Date）

普通浏览器支持` event`（传参）

ie 678 支持 `window.event`（无参）

**使用方法**

```js
box.onclick = function(event|| asdf){
 // event || asdf对时间对象event的操作
}
```

` event`内部分装了很多关于键盘和鼠标的触动事件时候的信息。

普通浏览器支持 event（任意参数）

ie 678 支持 `window.event`（内置，无参）

**event属性**

`clientX / clientY` ：当前窗口的左上角为基准点

`pageX / pageY`：低版本浏览器（IE67）不支持  以当前文档的左上角为基准点  

`screenX / screenY` ：当前屏幕的左上角为基准点

`PageY / pageX`： 鼠标位于整个网页页面的顶部和左侧部分的距离。（页面）

`ScreenY / screenX`：鼠标位于屏幕的上方和左侧的距离。（屏幕）

`ClientX / clientY`： 鼠标位于浏览器的左侧和顶部的距离。（浏览器大小和位置）

PageY和pageX的兼容写法（很重要）

在页面位置就等于 = 看得见的 + 看不见的

```js
pageY/ pageX = event.clientY / clientX + scroll().top / scroll().left
```

**鼠标拖拽效果**

常用事件：

```
onmouseover 鼠标经过

onmouseenter  鼠标进入

onmouseleave  

onmouseout 鼠标离开

onmousedown 鼠标按下

onmouseup 鼠标弹起

onmousemove 鼠标移动（1px也触动）
```

**清除选中的内容**

```js
window.getSelection 
    ? window.getSelection().removeAllRanges() 
	: document.selection.empty();
```

 IE9、Firefox、Safari、Chrome和Opera支持：`window.getSelection()`

IE9以下支持：`document.selection `

**防止滚动**

我们如何使某些东西变成不可滚动？

我们不能通过在 `onscroll` 监听器中使用 `event.preventDefault()` 来阻止滚动，因为它会在滚动发生 **之后** 才触发。

但是我们可以在导致滚动的事件上，例如在 pageUp 和 pageDown 的 `keydown` 事件上，使用 `event.preventDefault()` 来阻止滚动。

如果我们向这些事件中添加事件处理程序，并向其中添加 `event.preventDefault()`，那么滚动就不会开始。

启动滚动的方式有很多，使用 CSS 的 `overflow` 属性更加可靠。



#### 特性三**client**

包括：

1、`clientWidth` 获取网页可视区域宽度（两种用法）

  ` clientHeight` 获取网页可视区域高度（两种用法）

调用者不同，意义不同：

盒子调用：指盒子本身。

body/html调用：可视区域大小。 

2、`clientX`    鼠标距离可视区域左侧距离（event调用）

  	` clientY`    鼠标距离可视区域上侧距离（event调用）

3、`clientTop` 盒子的上`border`

​    `clientLeft` 盒子的左`border`

**三大特性的区别**

区别1：（offset/scroll/client宽高）

```
clientWidth = width + padding

clientHeight = height + padding

offsetWidth = width + padding + border

offsetHeight = height + padding + border

scrollWidth  = 内容宽度（不包含border）

scrollHeight = 内容高度（不包含border）
```

区别2：（offset/scroll/client上下）

`offsetTop / offsetLeft `：

 调用者：任意元素。(盒子为主)

 作用：距离父系盒子中带有定位的距离。

`scrollTop / scrollLeft`：(盒子也可以调用，必须有滚动条)

 调用者：`document.body.scrollTop/.....(window)`

 作用：浏览器无法显示的部分（被卷去的部分）。

`clientY / clientX`:（`clientTop/clientLeft` 值的是`border`）

 调用者：event.clientX(event)

 作用：鼠标距离浏览器可视区域的距离（左、上）。



标准模式（有DTD）（“CSS1Compat”）

```
document.documentElement.clientWidth

document.documentElement.clientHeight
```

怪异模式 （没有DTD）

```
document.body.clientWidth

document.body.clientHeight
```

**window.onresize**

`onresize `事件会在窗口或框架被调整大小时发生

区分：

 1.`window.onscroll`    屏幕滑动

 2.`window.onresize`    浏览器大小变化

 3.`window.onload`      页面加载完毕

 4.`div.onmousemove`  鼠标在盒子上移动

 （注意：不是盒子移动！！！）

**冒泡机制**

事件冒泡: 当一个元素上的事件被触发的时候，比如说鼠标点击了一个按钮，同样的事件将会在那个元素的所有祖先元素中被触发。这一过程被称为事件冒泡；这个事件从原始元素开始一直冒泡到DOM树的最上层。

**事件传播阶段**

事件传播的三个阶段是：捕获、冒泡和目标阶段

事件捕获阶段：事件从最上一级标签开始往下查找，直到捕获到事件目标(target)。

事件冒泡阶段：事件从事件目标(target)开始，往上冒泡直到页面的最上一级标签。

**冒泡顺序**

IE 6.0: 

```
div -> body -> html -> document
```

其他浏览器:

```
div -> body -> html -> document -> window
```

不是所有的事件都能冒泡。以下事件不冒泡：`blur`、`focus`、`load`、`unload`、`onmouseenter`、`onmouseleave`

**阻止冒泡**

w3c的方法是：（火狐、谷歌、IE11）：` event.stopPropagation()`

IE10以下则是使用：`event.cancelBubble = true`

兼容代码如下：

```js
 var event = event || window.event;
 if(event && event.stopPropagation){
      event.stopPropagation();
 }else{
      event.cancelBubble = true;
 }
```

**隐藏模态框**

判断当前对象

IE678       ` event.srcElement`（事件源）

火狐/谷歌等  ` event.target`（事件源）

兼容写法获取元素ID：

```js
var event = event || window.event;

var targetId = event.target ? event.target.id : event.srcElement.id;
```

