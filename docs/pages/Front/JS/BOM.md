•三大家族（offset/scroll/client）

•事件对象/event

​    （事件被触动时，鼠标和键盘的状态）   （通过属性控制）

**第一家族：方便的offset家族**

•offset这个单词本身是--偏移，补偿，位移的意思。

•js中有一套方便的获取元素尺寸的办法就是offset家族；



**offset常用属性**

offsetWidth  offsetHeight

得到对象的宽度和高度(自己的，与他人无关)

offsetWidth = width+padding+border

offsetLeft  offsetTop

返回距离上级盒子（带有定位）左边的位置

如果父级都没有定位则以body 为准

offsetLeft 从父亲的padding 开始算  父亲的border 不算

**offsetParent：**



1、返回改对象的父级 （带有定位）

 如果当前元素的父级元素没有进行CSS定位 （position为absolute或relative，fixed）， offsetParent为body。

2、如果当前元素的父级元素中有CSS定位 （position为absolute或relative，fixed）， offsetParent取最近的那个父级元素。

**offsetTop style.top 的区别**

一、最大区别在于 offsetLeft 可以返回没有定位     盒子 的距离左侧的位置。 而 style.top 不可以

二、offsetTop 返回的是数字，而 style.top 返回的   是字 符串，除了数字外还带有单位：px。

三、offsetTop 只读，而 style.top 可读写。

四、如果没有给 HTML 元素指定过 top 样式，则  style.top 返回的是空字符串。

**动画原理**

盒子本身的位置+步长

•什么是步长??

•var box=document.getElementById('box'); 

```js
**btn.onclick = function()**

**{**

 **//最基本的运动**

 **setInterval('move(box)',30);**

**}**

**//****最初级的匀速运动**

**//** **数学公式****: s=s+s'**

**function move(obj){**

 **obj.style.left=obj.offsetLeft+speed+'px';**

**}**
```

**三个函数**

•Math.ceil()   向上取整

•Math.floor()    向下取整

•Math.round(); 四舍五入

**缓动动画**

   动画原理 = 盒子位置 + 步长。

1.闪动。 （瞬间到达）

2.匀速。 （每次走一样距离）

3.缓动。 （开始特快越走越慢，步长越来越小）

​    （类似刹车，电梯停止，压缩弹簧...）

 好处：

 1.有非常逼真的缓动效果，实现的动画效果更细腻。

 2.如果不清除定时器，物体永远跟着目标在移动。

•因为生活中不仅存在匀速还存在加速和减速，而对我们做页面效果来说，缓动动画更具实际开发意义。

•为什么我们选择从快倒慢，没有选择从慢到快在到慢？或者从慢到快呢？？？

–我们对动画的功能想要达到的目的：赶快到 达目的地，快到达目的地的时候速度放慢。

**缓动动画公式**

   动画原理 = 盒子位置 + 步长（步长越来越小）。

盒子位置 = 盒子本身位置+（目标位置-盒子本身位置）/ 10；

–公式：   leader = leader + (target - leader) / 10;

•盒子位置（改变后）= 盒子位置（改变前）+ 目标位置与盒子位置的差/10

•盒子位置（没有到目标位置之前）+ 目标位置与盒子位置的差 / 10 

​       = 永远到不了目标位置

 例子：把一桶水，倒进另一通，每次倒一半，永远倒不完。

疑问：

–原理：数学算法。其他运动形式其他算法。

–为什么是10？ :  更符合我们的计算，逻辑，审美，人体工程学。

–（实际工作中，领导给我们什么技术，我们就直接用，空余时间研究源码和原理）

**封装问题**

 1.小数只能给定样式，最好不要参与计算。

 （offsetLeft获取值四舍五入取整后计算）

 2.大于0向上取整，小于0向下取整是因为：步长从      大到小，会小于0，大于0的时候向上取整能够取到1，小于零时向下取整才能取到-1（会在9和-9距离的时候出现问题）。

**第二家族：****scroll****家族**

•scroll这个单词本身是--卷页，卷曲的意思。

•主要包括：

–1、scrollWidth/scrollHeight 内容的宽高

•IE67可以比盒子小。 IE8+火狐谷歌不能比盒子小

–2、scrollLeft/scrollTop

•被卷去的左侧和头部（浏览器无法显示的左/头部）

•一般调用document.body.scrollTop:

•1、案例演示scrollWidth和scrollHeight

•2、滑动页面，标题显示卷去了多少

•onscroll 滚动事件(window.onscroll = fun...)

**新事件**

–屏幕每滚动一次，哪怕只有1像素都会触发这个事件。这样就可以用来检测屏幕滚动了。 

–只能有一个写了多个以最后一个为准，同理 window.onload



**兼容问题**

•未声明 DTD（谷歌只认识他）（IE9+认识他）document.body.scrollTop

•已经声明DTD（IE678只认识他）(IE9+任何时候)

  document.documentElement.scrollTop

•火狐/谷歌/ie9+以上支持的(不管DTD)

  window.pageYOffset

**Html基本结构访问方法**

获取title、body、head、html标签

document.title --- 文档标题；

document.head --- 文档的头标签

document.body --- 文档的body标签；

document.documentElement --- 这个很重要

 它表示文档的html标签， 也就是说，基本结构当中的html标签并不是通过document.html 去访问的，而是document.documentElement 。

为了兼容，不管有没有 DTD，可以使用如下代码：

var scrollTop = window.pageYOffset

​        || document.documentElement.scrollTop 

​        || document.body.scrollTop； 

​        var scrollTop = document.documentElement.scrollTop 

​        \+ document.body.scrollTop；



**封装****scroll()**

•案例：利用json封装scroll()

–要求：scroll().top 就能获取卷去头部

 scroll().left就能获取卷去左部

**判断是否声明DTD**

•document.compatMode === "BackCompat"

•BackCompat 未声明

•CSS1Compat 已经声明

•IE678默认识别CSS1Compat ，无论有没有dtd

•注意大小写

**案例**

•1.固定导航栏

•2.跟随广告（盒子动画）

•3.返回顶部小火箭（屏幕跳转）

–封装自己的JQuery

–window.scrollTo(x,y);

**滚动到指定坐标**

window.scrollTo

方法可把内容滚动到指定的坐标。

格式：

scrollTo(xpos,ypos)

xpos 必需。要在窗口文档显示区左上角显示的文档的 x 坐标。

ypos 必需。要在窗口文档显示区左上角显示的文档的 y 坐标

**scroll****家族案例**

•跳跃楼层（跳楼）

100%子盒子会继承父盒子的宽高。父盒子继承body宽高。Body继承html的宽高。

盒子属性：auto:适应盒子自身的宽度或者高度。（对自己负责）

盒子属性：100%:适应盒子父盒子的宽度或者高度。（对爸爸负责）

**事件对象（****event****）**

再触发DOM上的某个事件时，会产生一个事件对象event，这个对象中包含着所有与事件有关的信息。所有浏览器都支持event对象，但支持的方式不同。

比如鼠标操作时候，会添加鼠标位置的相关信息到事件对象中。（类似Date）

普通浏览器支持 event（传参）

ie 678 支持 window.event（无参）

**使用方法**

•box.onclick = function( event||asdf ){

 event||asdf对时间对象event的操作

•}

 event，内部分装了很多关于键盘和鼠标的触动事件时候的信息。

普通浏览器支持 event（任意参数）

ie 678 支持 window.event（内置，无参）

**event属性**

**区别**

clientX/clientY 

当前窗口的左上角为基准点

pageX/pageY低版本浏览器（IE67）不支持

以当前文档的左上角为基准点  

screenX/screenY

当前屏幕的左上角为基准点

![img](file:///C:\Users\HAOHUI~1\AppData\Local\Temp\OICE_F41756E6-C374-40DA-9920-98CEE8CD8F0A.0\msohtmlclip1\01\clip_image002.jpg) 

PageY/pageX: 鼠标位于整个网页页面的顶部和左侧部分的距离。（页面）

ScreenY/screenX: 鼠标位于屏幕的上方和左侧的距离。（屏幕）

ClientX/clientY: 鼠标位于浏览器的左侧和顶部的距离。（浏览器大小和位置）

## 1.1  PageY和pageX的兼容写法（很重要）

在页面位置就等于 = 看得见的+看不见的

pageY/pageX=event.clientY/clientX+scroll().top/scroll().left

**案例**

•1.鼠标跟随

•2.鼠标在盒子中的坐标

•3.放大镜 

注意1：CSS部分要注意：大图片/大盒子 = 小图片/显示部分

注意2：(大图片/大盒子 = 小图片/黄盒子)

大盒子滑动的距离/小盒子滑动的距离 = 大盒子滑倒头/小盒子滑倒头

大盒子滑倒头/小盒子滑倒头（他们的距离如何获取呢？）

```
（大图片-大盒子）（两边各有一伴儿大盒子的距离是没有走的）
（小盒子-小图片）（两边各有一伴儿小盒子的距离是没有走的）
```

注意3：

onmouseover、onmouseout事件给定一个盒子，子元素也会获取这个事件。

替代方法：onmosueenter和onmouseleave.

•4.拖拽案例

•5.模拟滚动条

**鼠标事件**

•鼠标跟随特效

**鼠标拖拽效果**

常用事件：

•onmouseover 鼠标经过

•onmouseenter

•onmouseleave

•onmouseout 鼠标离开

•onmousedown 鼠标按下

•onmouseup 鼠标弹起

•onmousemove 鼠标移动（1px也触动）

**清除选中的内容**

window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

　

 IE9、Firefox、Safari、Chrome和Opera支持：window.getSelection()

IE9以下支持：document.selection 

**模拟垂直滚动条口诀**

动态设置滚动条的高度 scrollBarHeight = 

（ 容器的高度 / 内容的高度*容器的高度 ）

  

滚动条滚动一次  内容移动的距离

(内容的高度 - 容器的高度)  / (容器的高度 - 滚动条的高度)* 滚动条移动的距离

**第三家族：****client用户（****可视区****）**

包括：

1、clientWidth 获取网页可视区域宽度（两种用法）

   clientHeight 获取网页可视区域高度（两种用法）

   调用者不同，意义不同：

 盒子调用：指盒子本身。

 body/html调用：可视区域大小。 

2、clientX    鼠标距离可视区域左侧距离（event调用）

   clientY    鼠标距离可视区域上侧距离（event调用）

\3. clientTop 盒子的上border

   clientLeft 盒子的左border

**三大家族的区别**

区别1：（offset/scroll/client宽高）



clientWidth = width + padding

clientHeight = height + padding

offsetWidth = width + padding + border

offsetHeight = height + padding + border

scrollWidth  = 内容宽度（不包含border）

scrollHeight = 内容高度（不包含border）

区别2：（offset/scroll/client上下）

offsetTop/offsetLeft ：

 调用者：任意元素。(盒子为主)

 嘛作用：距离父系盒子中带有定位的距离。

scrollTop/scrollLeft:(盒子也可以调用，必须有滚动条)

 调用者：document.body.scrollTop/.....(window)

 嘛作用：浏览器无法显示的部分（被卷去的部分）。

clientY/clientX:（clientTop/clientLeft 值的是border）

 调用者：event.clientX(event)

 嘛作用：鼠标距离浏览器可视区域的距离（左、上）。

**client****家族之****:****检浏览器宽****/****高度(可视区域)**

ie9及其以上的版本

window.innerWidth/Height 

标准模式（有DTD）（“CSS1Compat”）

document.documentElement.clientWidth

document.documentElement.clientHeight

怪异模式 （没有DTD）

document.body.clientWidth

document.body.clientHeight

封装：类似scroll();

**案例**

•根据浏览器可视宽度，给定背景色。

–模拟响应式 : 移动版（640）/平板版/PC版（960）

​              移动端      /    PC端

**window.onresize**

onresize 事件会在窗口或框架被调整大小时发生

区分：

 1.window.onscroll    屏幕滑动

 2.window.onresize    浏览器大小变化

 3.window.onload      页面加载完毕

 4.div.onmousemove  鼠标在盒子上移动

 （注意：不是盒子移动！！！）

**了解：****检测屏幕宽度(分辨率)**

window.screen.width

分辨率是屏幕图像的精密度，指显示器所能显示的像素有多少。

   我们的电脑一般：

横向1280个像素点，

纵向960个像素点。



我们看电影的时候是满屏和半屏的，就是这。

**冒泡机制（****event****）**

事件冒泡: 当一个元素上的事件被触发的时候，比如说鼠标点击了一个按钮，同样的事件将会在那个元素的所有祖先元素中被触发。这一过程被称为事件冒泡；这个事件从原始元素开始一直冒泡到DOM树的最上层。

**事件传播阶段**

事件传播的三个阶段是：捕获、冒泡和目标阶段

事件捕获阶段：事件从最上一级标签开始往下查找，直到捕获到事件目标(target)。

事件冒泡阶段：事件从事件目标(target)开始，往上冒泡直到页面的最上一级标签。

**冒泡顺序**

IE 6.0: 

div -> body -> html -> document

其他浏览器:

div -> body -> html -> document -> window



不是所有的事件都能冒泡。以下事件不冒泡：blur、focus、load、unload、onmouseenter

onmouseleave

**阻止冒泡**

w3c的方法是：（火狐、谷歌、IE11）

 event.stopPropagation()

IE10以下则是使用：event.cancelBubble = true

兼容代码如下：



 var event = event || window.event;

 if(event && event.stopPropagation){

​      event.stopPropagation();

 }else{

​      event.cancelBubble = true;

 }

**隐藏模态框**

判断当前对象

IE678        event.srcElement（事件源）

火狐/谷歌等   event.target（事件源）

兼容写法获取元素ID：

var event = event || window.event;

var targetId = event.target ? event.target.id : event.srcElement.id;

**案例**

•1.点击空白处隐藏模态框

•2.事件委托

–(先绑定，后创建的元素没有事件)



–阻止冒泡，阻止自己像父系盒子冒泡。

 所有的泡泡冒泡到阻止位置停止向上冒泡

–event.target是在事件被触动的时候把事件源绑定到event的target属性中。而之前的target是我们自定义的一个变量触动

**缓动框架封装**

•很简单！

一个下午！

战略上藐视敌人,战术上重视敌人！

案例：360/手风琴

**变量属性获取赋值/方法**

•给属性赋值：（既能获取又能赋值）

–div.style.width             单个赋值

–div.style[“width”]   变量赋值



•获取属性值：（只能获取）

–div.currentStyle.width;  IE678 单个获取

–window.getComputedStyle(div,null).width;

–div.currentStyle[“width”];  IE678 变量获取

–window.getComputedStyle(div,null)[“width”];

​     参数1：获取属性的元素。

 参数2：伪元素，C3学习。

**透明度**

•opacity: 0.5; 内容一起透明.(火狐谷歌IE9+)

 取值范围： 0-1

•



•filter: alpha(opacity=50);   IE678(不研究)

​     取值范围： 0-100

**轮播图**

•原理

–第一张左走，另一张也左走。其他不变

•四步法则：

–移动当前的图片（框架）

–判断另一个位置（三元）

–固定另一个位置（属性）

–移动另一张图片（框架）

**旋转木马原理**

•利用已经定义好的arr中的json给定相应图片样式。

•利用数组API调整json前后位置

**for...in...**

•不能乱用。最后只在json中使用。如果在数组中使用，会把数组中的属性也遍历出来