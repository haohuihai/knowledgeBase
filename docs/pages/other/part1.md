# 比较React和Vue

相同点

1) 都有组件化开发和Virtual DOM

2) 都支持props进行父子组件间数据通信

3) 都支持数据驱动视图, 不直接操作真实DOM, 更新状态数据界面就自动更新

4) 都支持服务器端渲染

5) 都有支持native的方案,React的React Native,Vue的Weex

**不同点**

1) 数据绑定: vue实现了数据的双向绑定,react数据流动是单向的

2) 组件写法不一样, React推荐的做法是 JSX , 也就是把HTML和CSS全都写进JavaScript，1) Vue推荐的做法是webpack+vue-loader的单文件组件格式,即html,css,js写在同一个文件

3) state对象在react应用中不可变的,需要使用setState方法更新状态;在vue中,state对象不是必须的,数据由data属性在vue对象中管理

4)virtual DOM不一样,vue会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树.而对于React而言,每当应用的状态被改变时,全部组件都会重新渲染,所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制

5) React严格上只针对MVC的view层,Vue则是MVVM模式

# Redux管理状态的机制



基本理解：

1) redux是一个独立专门用于做状态管理的JS库, 不是react插件库

2) 它可以用在react, angular, vue等项目中, 但基本与react配合使用

3) 作用: 集中式管理react应用中多个组件共享的状态和从后台获取的数据

工作原理：

![image-20220710094154020](C:\Users\EDZ\AppData\Roaming\Typora\typora-user-images\image-20220710094154020.png) 

使用扩展：

1) 使用react-redux简化redux的编码

2) 使用redux-thunk实现redux的异步编程

3) 使用Redux DevTools实现chrome中redux的调试

4)使用dva

# 说说Vue组件间通信方式

**通信种类：**

父组件向子组件通信

子组件向父组件通信

隔代组件间通信

兄弟组件间通信

**实现通信方式：**

1) props

2) vue自定义事件

3) 消息订阅与发布

4) vuex

5) slot

**方式1：**props

1) 通过一般属性实现父向子通信

2) 通过函数属性实现子向父通信

3) 缺点: 隔代组件和兄弟组件间通信比较麻烦

**方式2：** vue自定义事件

1) vue内置实现, 可以代替函数类型的props

a. 绑定监听: <MyComp @eventName="callback"

b. 触发(分发)事件: this.$emit("eventName", data)

2) 缺点: 只适合于子向父通信

**方式3：**消息订阅与发布

1) 需要引入消息订阅与发布的实现库, 如: pubsub-js

a. 订阅消息: PubSub.subscribe('msg', (msg, data)=>{})

b. 发布消息: PubSub.publish(‘msg’, data)

2) 优点: 此方式可用于任意关系组件间通信

**方式4：** vuex

1) 是什么: vuex是vue官方提供的集中式管理vue多组件共享状态数据的vue插件

2) 优点: 对组件间关系没有限制, 且相比于pubsub库管理更集中, 更方便

**方式5：**slot

1) 是什么: 专门用来实现父向子传递带数据的标签

a. 子组件

b. 父组件

2) 注意: 通信的标签模板是在父组件中解析好后再传递给子组件的

# Vuex管理状态的机制

理解：

1) 是什么: Vuex 是一个专为 Vue.js 应用程序开发的状态管理的vue插件

2) 作用: 集中式管理vue多个组件共享的状态和从后台获取的数据

工作原理：



![image-20220710094903290](C:\Users\EDZ\AppData\Roaming\Typora\typora-user-images\image-20220710094903290.png) 



# 说说Vue的MVVM实现原理

**理解：**

1) Vue作为MVVM模式的实现库的2种技术

a. 模板解析

b. 数据绑定

2) 模板解析: 实现初始化显示

a. 解析大括号表达式

b. 解析指令

3) 数据绑定: 实现更新显示

a. 通过数据劫持实现

**原理结构图**

![image-20220710095208437](C:\Users\EDZ\AppData\Roaming\Typora\typora-user-images\image-20220710095208437.png) 

# JS

## 通过获取设备像素比来设置html的fontSize的大小

```js
// 约定：

// 1rem = 16px

var box = document.getElementById('box');



// 获取设备像素比

var dpr = window.devicePixeRatio;

// 屏幕缩放比例

var scale = 1 / dpr;

// 获取屏幕宽度  单位是px

var width = document.documentElement.clientWidth;

// 获取meta标签

var metaNode = document.querySelector('meta[name="viewport"]')

// 设置初始缩放比例

metaNode.setAttribute('content','width=device-width,initial-scale='+scale+',user-saclable=no')

// 给html设置字体大小

var htmlNode = document.querySelector('html');

htmlode.style.fontSize = width/16*dpr + 'px';

// width/16  将屏幕宽度转换为rem来计算  即屏幕宽度是多少rem。
```

简单的rem适配：

```js
//获取屏幕宽度

var width = document.documentElement.clientWidth;

//获取html

var htmlNode = document.querySelector('html');

//设置html字体大小

htmlNode.style.fontSize = width/16 + 'px';
```



**设备像素比：**

上面的例子对应`html`和`css`

```html
<div id="box"></div>
```

```css
*{
  margin: 0;
  padding: 0;
}
#box{
  width: 8rem;
  height: 8rem;
  border: 1px solid #000000;
}
```



***\*通过css适配来监听\****



```css
*{
  margin: 0;
  padding: 0;
}

#box{
  width: 200px;
  height: 200px;
  position: relative;
}
#box:after{
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background: #000000;
}

@media screen and ( -webkit-min-device-pixel-ratio:2 ) {
  #box:after{
    transform: scaleY(0.5);
  }
}

@media screen and ( -webkit-min-device-pixel-ratio:3 ) {
  #box:after{
    transform: scaleY(0.333333333333);
  }
}
```



**## CSS实现三角形**

```css
* {
  margin: 0;
  padding: 0;
}
#box {
  width: 0px;
  height: 0px;
  border: 100px solid transparent;
  border-top-color: deeppink;
  border-left-color: deeppink;
}
```



**## 背景图片的距离**



```css
* {
  margin: 0;
  padding: 0;
}
#box{
  width: 100px;
  height: 200px;
  background: pink;
  padding: 100px;
  border: 80px solid blue;
  background-image: url("img/1.png");
  background-repeat: no-repeat;
  background-origin: content-box;
  background-position: -50px 0;
}
```





![image-20220710111054556](C:\Users\EDZ\AppData\Roaming\Typora\typora-user-images\image-20220710111054556.png) 



***\*background-origin\****



background-Origin属性指定background-position属性应该是相对位置。



| 值      | 描述              |

| :---------- | :----------------------------- |

| padding-box | 背景图像***\*填充框\****的相对位置  |

| border-box  | 背景图像边***\*界框\****的相对位置  |

| content-box | 背景图像的***\*相对位置的内容框\**** |



**## 闭包**



**## 微任务和宏任务**



**## 变量提升**



![image-20220328231504360](C:\Users\EDZ\AppData\Roaming\Typora\typora-user-images\image-20220328231504360.png)



![image-20220328231712947](C:\Users\EDZ\AppData\Roaming\Typora\typora-user-images\image-20220328231712947.png) 



![image-20220328231948192](C:\Users\EDZ\AppData\Roaming\Typora\typora-user-images\image-20220328231948192.png) 



登录代码，指代考察拦截器



先路由守卫，路由跳转，在拦截器



**## 如何解决跨域**



**### 什么是跨域？**



浏览器出于安全的考虑，有同源策略，也就是说如果协议，域名，或者端口有一个不同，就会出现跨域；



**### 怎么解决？**





***\*JSONP\****



利用`<script>`标签没有跨域限制的漏洞。通过`<script> `标签指向一个需要访问的地址，并提供一个回调函数



接收数据；



\```html

<script> src="http://domin/api?param1=a&param2=b$vallback=jsop"</script>

\```



\```js

function jsonp(data) {

  console.log(data)

}

\```



JSONP使用简单且兼容性不错，但只适用与get请求



对多个使用JSONP的，可以封装一个方法：



\```js



\```





***\*后端设置\****



***\*nginx代理\****





内置类型：



基本类型：



null、undefined、boolean、number、string、symbol



NaN属于number类型，NaN不等于自身。



对象类型：



在使用过程中会遇到深浅拷贝



\```js

let a = {name: 'FE'}

let b = a;

b.name = 'FE'

console.log(a.name) // EF

\```



**# TypeOf**



typeof对于基本类型，除了null都可以显示正确的类型



\```js

typeof '1' // string

typeof 1 // number



\```



typeof 对于对象，除了function 其余都显示object



\```js

typeof [] // object

typeof {} // 'object'

typeof console.log // function

\```



typeof 对于null，



\```js

typeof null // object

\```



原因： JS在最初的版本中，使用的是32位的系统，为了性能考虑使用地位存储变量的类型信息，000开头代表对像，而null是全零，所以判断为了object



如果想正确获得变量类型，可以通过下面



\```js

Object.prototype.toString.call(xx) // [object Type]

\```



**# 类型转换**



**## 什么是事件代理**

































**### Shell** 



Shell脚本一般指的是以.sh为后缀的脚本



Linux 的 Shell 种类众多，常见的有：



\- Bourne Shell（/usr/bin/sh或/bin/sh）



在一般情况下，人们并不区分 Bourne Shell 和 Bourne Again Shell，所以，像 ***\*#!/bin/sh\****，它同样也可以改为 ***\*#!/bin/bash\****。



***\*#!\**** 告诉系统其后路径所指定的程序即是解释此脚本文件的 Shell 程序。



打开文本编辑器(可以使用 vi/vim 命令来创建文件)，新建一个文件 test.sh，扩展名为 sh（sh代表shell），扩展名并不影响脚本执行，见名知意就好，如果你用 php 写 shell 脚本，扩展名就用 php 好了。



**### 运行 Shell 脚本有两种方法：**