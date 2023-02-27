# 微信小程序

## 小程序的诞生：

微信开始中的WebView，是移动web的一个入口，从这是，微信有有相关的JS-SDK，它解决了移动端网页能力不足问题，暴露一个微信的接口，使得Web开发者能够拥有更多的能力。

JS-SDK并没有解决使用移动网页遇到的体验不良的问题

微信开发一个解决下面问题的一个系统：

* 快速加载
* 更强大的能力
* 易用且安全的微信数据开放
* 高效和简单的开发

## 小程序和普通网页的区别

网页开发渲染线程和脚本线程是互斥的，导致长时间的脚本运行可能会导致页面失去 响应
在小程序中，将二者分开的，是在不同的线程中（渲染层和逻辑层）。
逻辑层运行在JSCore中，并没有一个完整的浏览器对象，因而缺少相关的DOM API 和 BOM API，这一区分，导致一些库（jQuery，Zepto）不能在小程序中使用。
JSCode的环境与NodeJS环境也不尽相同，所以一些NPM包在小程序中是无法运行的。
⽹⻚开发者的环境是各式各样的浏览器，PC 端需要⾯对 IE、Chrome、QQ浏览器等，在移
动端需要⾯对Safari、Chrome以及 iOS、Android 系统中的各式 WebView 。
⽽⼩程序开发过程中需要⾯对的是两⼤操作系统 iOS 和 Android 的微信客户端，以及⽤于辅助开发的⼩程序开发者⼯具，⼩程序中三⼤运⾏环境也是有所区别的

## 小程序特点

1. 没有 DOM 
2. 组件化开发： 具备特定功能效果的代码集合 
3. 体积小，单个压缩包体积不能大于 2M，否则无法上线 
4. 小程序的四个重要的文件 
   a) *.js  
   b) *.wxml ---> view 结构 ----> html
   c) *.wxss ---> view 样式 -----> css 
   d) *. json ----> view 数据 -----> json 文件 
5. 小程序适配方案: rpx (responsive pixel 响应式像素单位) 
   a) 小程序适配单位： rpx 
   b) 规定任何屏幕下宽度为 750rpx
   c) 小程序会根据屏幕的宽度不同自动计算 rpx 值的大小 
   d) Iphone6 下： 1rpx = 1 物理像素 = 0.5px

## 小程序的配置

├── app.js
├── app.json
├── app.wxss
├── pages
│   │── index
│   │   ├── index.wxml
│   │   ├── index.js
│   │   ├── index.json
│   │   └── index.wxss
│   └── logs
│       ├── logs.wxml
│       └── logs.js
└── utils

## JSON语法

JSON的值只能是以下⼏种数据格式，其他任何格式都会触发报错，例如 JavaScript 中的 undefined。
数字，包含浮点数和整数
字符串，需要包裹在双引号中
Bool值，true 或者 false
数组，需要包裹在⽅括号中 []
对象，需要包裹在⼤括号中 {}
Null
还需要注意的是 JSON ⽂件中⽆法使⽤注释，试图添加注释将会引发报错。

## app.json

app.json是当前小程序的全局配置，包括小程序的所有页面路径，界面表现，网络超时时间，底部tab等

```javascript
{
  "pages":[
    "pages/index/index",
    "pages/logs/logs"
  ],
  "window":{
    "backgroundTextStyle":"light",
    "navigationBarBackgroundColor": "#fff",
    "navigationBarTitleText": "WeChat",
    "navigationBarTextStyle":"black"
  }
}
```

pages字段 —— ⽤于描述当前⼩程序所有⻚⾯路径，这是为了让微信客户端知道当前你的⼩程序
⻚⾯定义在哪个⽬录。
window字段 —— 定义⼩程序所有⻚⾯的顶部背景颜⾊，⽂字颜⾊定义等

## 页面配置

每⼀个⼩程序⻚⾯也可以使⽤同名 .json ⽂件来对本⻚⾯的窗⼝表现进⾏配置，⻚⾯中配置项会覆盖
app.json 的 window 中相同的配置项。

```javascript
{
  "navigationBarBackgroundColor": "#ffffff",
  "navigationBarTextStyle": "black",
  "navigationBarTitleText": "微信接⼝功能演示",
  "backgroundColor": "#eeeeee",
  "backgroundTextStyle": "light"
}
```

## 小程序在运行时

### 渲染层和逻辑层

WXML模板和WXSS样式工作在渲染层，JS脚本工作在逻辑层

渲染层和逻辑层风别由两个线程管理：

渲染层的界⾯使⽤了WebView 进⾏渲染；逻辑层采⽤JsCore线程运⾏JS脚本。⼀个⼩程序存在多个界⾯，所以渲染层存在多个WebView线程，这两个线程的通信会经由微信客户端（下⽂中也会采⽤Native来代指微信客户端）做中转，逻辑层发送⽹络请求也经由Native转发。

### 逻辑层 App Service

⼩程序开发框架的逻辑层使⽤ JavaScript 引擎为⼩程序提供开发者 JavaScript 代码的运⾏环境以及微
信⼩程序的特有功能。逻辑层将数据进⾏处理后发送给视图层，同时接受视图层的事件反馈。
开发者写的所有代码最终将会打包成⼀份 JavaScript ⽂件，并在⼩程序启动的时候运⾏，直到⼩程序
销毁。这⼀⾏为类似 ServiceWorker，所以逻辑层也称之为 App Service

## 小程序的运行机制

**前台/后台状态**

小程序启动后，界面被展示给用户，此时小程序处于前台状态

当用户点击右上角胶囊按钮关闭小程序，或者按了设备上的home键离开微信，小程序并没有终止，而是进入了后台状态，小程序还在运行

当用户再次进入微信或打开小程序，小程序从后台进入前台，如果用户很久没进入小程序，或者系统资源紧张，小程序可能会销毁，既完全终止运行

**冷启动和热启动**

冷启动：如果⽤户⾸次打开，或⼩程序销毁后被⽤户再次打开，此时⼩程序需要重新加载启动，即冷启动

 热启动：如果⽤户已经打开过某⼩程序，然后在⼀定时间内再次打开该⼩程序，此时⼩程序并未被销毁，只是从后台状态进⼊前台状态，这个过程就是热启动。

**⼩程序销毁时机**

当⼩程序进⼊后台，可以会维持⼀⼩段时间的运⾏状态，如果这段时间内都未进⼊前台，⼩程序会被销毁。 当⼩程序占⽤系统资源过⾼，可能会被系统销毁或被微信客户端主动回收

在 iOS 上，当微信客户端在⼀定时间间隔内（⽬前是 5 秒）连续收到两次及以上系统内存告警时，会主动进⾏⼩程序的销毁，并提示⽤户 「该⼩程序可能导致微信响应变慢被终⽌」。
建议⼩程序在必要时使⽤ wx.onMemoryWarning 监听内存告警事件，进⾏必要的内存清理。

**销毁小程序保留页面中的状态**

每当⼩程序可能被销毁之前，⻚⾯回调函数 onSaveExitState 会被调⽤。如果想保留⻚⾯中的状态，
可以在这个回调函数中“保存”⼀些数据，下次启动时可以通过 exitState 获得这些已保存数据。

## 小程序的开发

在JavaScript的基础上增加了一些功能：

* 增加App和Page方法，进行程序注册和页面注册
* 增加getApp和getCurrentPages方法，分别用来获取App实例和当前页面栈
* 提供丰富的API，如微信用户数据，扫一扫，支付等
* 提供模块化能力，每个页面有独立的作用域

**注意：**
⼩程序框架的逻辑层并⾮运⾏在浏览器中，因此 JavaScript 在 web 中⼀些能⼒都⽆法使⽤，如window，document 等。

## app

* 微信客户端在打开⼩程序之前，会把整个⼩程序的代码包下载到本地。紧接着通过 app.json 的pages 字段就可以知道你当前⼩程序的所有⻚⾯路径。
* 写在app.json中 pages 字段的第⼀个⻚⾯就是这个⼩程序的⾸⻚
* 于是微信客户端就把⾸⻚的代码装载进来，通过⼩程序底层的⼀些机制，就可以渲染出这个⾸⻚。
* ⼩程序启动之后，在 app.js 定义的 App 实例的 onLaunch 回调会被执⾏
* 整个⼩程序只有⼀个 App 实例，是全部⻚⾯共享的

```javascript
App({
    onLaunch (options) {
        // Do something initial when launch.
    },
    onShow (options) {
        // Do something when show.
    },
    onHide () {
        // Do something when hide.
    },
    onError (msg) {
        console.log(msg)
    },
    globalData: 'I am global data'
})
```

* 开发者可以通过 getApp ⽅法获取到全局唯⼀的 App 示例，获取App上的数据或调⽤开发者注册在App 上的函数。

```javascript
const appInstance = getApp()
console.log(appInstance.globalData) // I am global data
```

## page

⼩程序⾥边包含了不同类型的⽂件:

* .json 后缀的 JSON 配置⽂件
* .wxml 后缀的 WXML 模板⽂件
* .wxss 后缀的 WXSS 样式⽂件
* .js 后缀的 JS 脚本逻辑⽂件

Page 是⼀个⻚⾯构造器，这个构造器就⽣成了⼀个⻚⾯

在⽣成⻚⾯的时候，⼩程序框架会把 data 数据和 index.wxml ⼀起渲染出最终的结构

在渲染完界⾯之后，⻚⾯实例就会收到⼀个 onLoad 的回调，你可以在这个回调处理你的逻辑。

```javascript
Page({
    data: {
    	text: "This is page data."
    },
    onLoad: function(options) {
    	// ⻚⾯创建时执⾏
    },
    onShow: function() {
    	// ⻚⾯出现在前台时执⾏
    },
    onReady: function() {
    	// ⻚⾯⾸次渲染完毕时执⾏
    },
    onHide: function() {
    	// ⻚⾯从前台变为后台时执⾏
    },
    onUnload: function() {
    	// ⻚⾯销毁时执⾏
    },
    onPullDownRefresh: function() {
    	// 触发下拉刷新时执⾏
    },
    onReachBottom: function() {
    	// ⻚⾯触底时执⾏
    },
    onShareAppMessage: function () {
   		 // ⻚⾯被⽤户分享时执⾏
    },
    onPageScroll: function() {
        // ⻚⾯滚动时执⾏
    },
    onResize: function() {
    	// ⻚⾯尺⼨变化时执⾏
    },
    onTabItemTap(item) {
        // tab 点击时执⾏
        console.log(item.index)
        console.log(item.pagePath)
        console.log(item.text)
    },
    // 事件响应函数
    viewTap: function() {
        this.setData({
          text: 'Set some data for updating view.'
        }, function() {
          // this is setData callback
        })
    },
    // ⾃由数据
    customData: {
    	hi: 'MINA'
    }
})
```

框架的核心是一个响应的数据绑定系统，可以让数据与视图非常简单的保持同步。
数据修改时，只需要在逻辑层修改数据，视图层就会做相应的更新

```html
<!-- This is our View -->
<view> Hello {{name}}! </view>
<button bindtap="changeName"> Click me! </button>

```

```javascript
// Register a Page.
Page({
    data: {
        name: 'WeChat'
    },
    changeName: function(e) {
        // sent data change to view
        this.setData({
          name: 'MINA'
        })
    }
})
```

## 组件

小程序提供了非常丰富的组件，参考官网

## API

为了让开发者可以很⽅便的调起微信提供的能⼒，例如获取⽤户信息、微信⽀付等等，⼩程序提供了很多 API 给开发者去使⽤。需要注意的是：多数 API 的回调都是异步，你需要处理好代码逻辑的异步问题。

```javascript
wx.getLocation({
  type: 'wgs84',
  success: (res) => {
    var latitude = res.latitude // 纬度
    var longitude = res.longitude // 经度
  }
})
```

## 自定义组件

开发者可以将⻚⾯内的功能模块抽象成⾃定义组件，以便在不同的⻚⾯中重复使⽤；也可以将复杂的
⻚⾯拆分成多个低耦合的模块，有助于代码维护。⾃定义组件在使⽤时与基础组件⾮常相似。

开发自定义组件

类似于⻚⾯，⼀个⾃定义组件由 json wxml wxss js 4个⽂件组成。要编写⼀个⾃定义组件，⾸先需要
在 json ⽂件中进⾏⾃定义组件声明（将 component 字段设为 true 可这⼀组⽂件设为⾃定义组件）：

```javascript
{
 	"component": true
}
```

在⾃定义组件的 js ⽂件中，需要使⽤ Component() 来注册组件，并提供组件的属性定义、内部数据和
⾃定义⽅法。组件的属性值和内部数据将被⽤于组件 wxml 的渲染，其中，属性值是可由组件外部传
⼊的。

```javascript
Component({
    properties: {
       // 这⾥定义了innerText属性，属性值可以在组件使⽤时指定
        innerText: {
          type: String,
          value: 'default value',
        }
    },
    data: {
    // 这⾥是⼀些组件内部数据
    someData: {}
    },
    methods: {
    // 这⾥是⼀个⾃定义⽅法
    customMethod: function(){}
    }
})
```

使用自定义组件

使⽤已注册的⾃定义组件前，⾸先要在⻚⾯的 json ⽂件中进⾏引⽤声明。此时需要提供每个⾃定义组
件的标签名和对应的⾃定义组件⽂件路径：

```javascript
{
  "usingComponents": {
    "component-tag-name": "path/to/the/custom/component"
  }
}
```

这样，在⻚⾯的 wxml 中就可以像使⽤基础组件⼀样使⽤⾃定义组件。节点名即⾃定义组件的标签
名，节点属性即传递给组件的属性值。

```html
<view>
  <!-- 以下是对⼀个⾃定义组件的引⽤ -->
  <component-tag-name inner-text="Some text"></component-tag-name>
</view>
```

常⻅的 setData 操作错误

1. 频繁的去 setData
   在我们分析过的⼀些案例⾥，部分⼩程序会⾮常频繁（毫秒级）的去setData，其导致了两个后果：Android 下⽤户在滑动时会感觉到卡顿，操作反馈延迟严重，因为 JS 线程⼀直在编译执⾏渲染，未能及时将⽤户操作事件传递到逻辑层，逻辑层亦⽆法及时将操作处理结果及时传递到视图层； 渲染有出现延时，由于 WebView 的 JS 线程⼀直处于忙碌状态，逻辑层到⻚⾯层的通信耗时上升，视图层收到的数据消息时距离发出时间已经过去了⼏百毫秒，渲染的结果并不实时；
2. 每次 setData 都传递⼤量新数据由setData的底层实现可知，我们的数据传输实际是⼀次 evaluateJavascript 脚本过程，当数据量过⼤时会增加脚本的编译执⾏时间，占⽤ WebView JS 线程，
3. 后台态⻚⾯进⾏ setData当⻚⾯进⼊后台态（⽤户不可⻅），不应该继续去进⾏setData，后台态⻚⾯的渲染⽤户是⽆法感受的，另外后台态⻚⾯去setData也会抢占前台⻚⾯的执⾏

分包

某些情况下，开发者需要将⼩程序划分成不同的⼦包，在构建时打包成不同的分包，⽤户在使⽤时按需进⾏加载。在构建⼩程序分包项⽬时，构建会输出⼀个或多个分包。每个使⽤分包⼩程序必定含有⼀个主包。所谓的主包，即放置默认启动⻚⾯/TabBar ⻚⾯，以及⼀些所有分包都需⽤到公共资源/JS 脚本；⽽分包则是根据开发者的配置进⾏划分。在⼩程序启动时，默认会下载主包并启动主包内⻚⾯，当⽤户进⼊分包内某个⻚⾯时，客户端会把对应分包下载下来，下载完成后再进⾏展示。⽬前⼩程序分包⼤⼩有以下限制：整个⼩程序所有分包⼤⼩不超过 8M单个分包/主包⼤⼩不能超过 2M

使用分包：

├── app.js
├── app.json
├── app.wxss
├── packageA
│   └── pages
│       ├── cat
│       └── dog
├── packageB
│   └── pages
│       ├── apple
│       └── banana
├── pages
│   ├── index
│   └── logs
└── utils

开发者通过在 app.json subpackages 字段声明项⽬分包结构：

```javascript
{
  "pages":[
    "pages/index",
    "pages/logs"
  ],
  "subpackages": [
    {
      "root": "packageA",
      "pages": [
        "pages/cat",
        "pages/dog"
      ]
    }, {
      "root": "packageB",
      "name": "pack2",
      "pages": [
        "pages/apple",
        "pages/banana"
      ]
    }
  ]
}
```

## 打包原则

声明 subpackages 后，将按 subpackages 配置路径进⾏打包，subpackages 配置路径外的⽬录将被打包到 app（主包） 中app（主包）也可以有⾃⼰的 pages（即最外层的 pages 字段）subpackage 的根⽬录不能是另外⼀个 subpackage 内的⼦⽬录tabBar ⻚⾯必须在 app（主包）内

## 小程序适配方案

Iphon6： 1rpx = 1物理像素 = 0.5px

微信官方提供的换算方式：

1. 以iPhone6的物理像素个数为标准: 750;

2. 1rpx = 目标设备宽度 / 750 * px;

3. 注意此时底层已经做了viewport适配的处理，即实现了理想视  口

### rem适配

1. 为什么做 rem 适配 a) 机型太多，不同的机型屏幕大小不一样 b) 需求： 一套设计稿的内容在不同的机型上呈现的效果一致，根据屏幕大小不 同的变化，页面中的内容也相应变化
2. 代码

```javascript
function remRefresh() {
    let clientWidth = document.documentElement.clientWidth; 
    // 将屏幕等分 10 份
    let rem = clientWidth / 10;
    document.documentElement.style.fontSize = rem + 'px';
    document.body.style.fontSize = '12px';
}
window.addEventListener('pageshow', () => {
	remRefresh()
})
// 函数防抖
let timeoutId;
window.addEventListener('resize', () => {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() =>{
    remRefresh()
    }, 300)
})

```

3. 第三方库
   ``lib-flexible + px2rem-loader``

# 小程序相关

## 1.  数据绑定

1. 小程序
   1. data中初始化数据
   2. 修改数据： this.setData()
      1. 修改数据的行为始终是同步的
   3. 数据流： 
      1. 单项： Model ---> View
2. Vue
   1. data中初始化数据
   2. 修改数据: this.key = value
   3. 数据流： 
      1. Vue是单项数据流： Model ---> View
      2. Vue中实现了双向数据绑定： v-model
3. React
   1. state中初始化状态数据
   2. 修改数据: this.setState()
      1. 自身钩子函数中(componentDidMount)异步的
      2. 非自身的钩子函数中(定时器的回调)同步的
   3. 数据流： 
      1. 单项： Model ---> View

## 2. 获取用户基本信息

1. 用户未授权(首次登陆)
   1. button open-type=‘getUserInfo’
2. 用户已经授权(再次登陆)
   1. wx.getUserInfo

## 3. 前后端交互

1. 语法: wx.request()
2. 注意点: 
   1. 协议必须是https协议
   2. 一个接口最多配置20个域名
   3. 并发限制上限是10个
   4. **开发过程中设置不校验合法域名**： 开发工具 ---> 右上角详情 ----> 本地设置 ---> 不校验

## 4. 本地存储

1. 语法: wx.setStorage() || wx.setStorageSync() || .....
2. 注意点： 
   1. 建议存储的数据为json数据
   2. 单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB
   3. 属于永久存储，同H5的localStorage一样

# 扩展内容

## 1. 事件流的三个阶段

1. 捕获: 从外向内
2. 执行目标阶段
3. 冒泡: 从内向外

## 2. 事件委托

1. 什么是事件委托
   1. 将子元素的事件委托(绑定)给父元素
2. 事件委托的好处
   1. 减少绑定的次数
   2. 后期新添加的元素也可以享用之前委托的事件
3. 事件委托的原理
   1. 冒泡
4. 触发事件的是谁
   1. 子元素
5. 如何找到触发事件的对象
   1. event.target
6. currentTarget VS target
   1. currentTarget要求绑定事件的元素一定是触发事件的元素
   2. target绑定事件的元素不一定是触发事件的元素

## 3. 定义事件相关

1. 分类
   1. 标准DOM事件
   2. 自定义事件
2. 标准DOM事件
   1. 举例： click，input。。。
   2. 事件名固定的，事件由浏览器触发
3. 自定义事件
   1. 绑定事件
      1. 事件名
      2. 事件的回调
      3. 订阅方: PubSub.subscribe(事件名，事件的回调)
      4. 订阅方式接受数据的一方
   2. 触发事件
      1. 事件名
      2. 提供事件参数对象， 等同于原生事件的event对象
      3. 发布方: PubSub.publish(事件名，提供的数据)
      4. 发布方是提供数据的一方

  rpx单位是微信小程序中css的尺寸单位，rpx可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。

​    设备	rpx换算px (屏幕宽度/750)	px换算rpx (750/屏幕宽度)

​    iPhone5	1rpx = 0.42px	1px = 2.34px

​    iPhone6	1rpx = 0.5px	1px = 2rpx

​    iPhone6s	1rpx = 0.552px	1px = 1.81rpx

​    微信小程序也支持rem尺寸单位，rem和rpx的换算关系：rem: 规定屏幕宽度为20rem；1rem = (750/20)rpx

