**整体生命周期**

```js
App({
    onLaunch() {},
    onShow() {},
    onHide() {}
})
```



**页面生命周期**

```js
Page({
    onShow() {}, 
    onHide() {},
	onLoad() {},
	onReady() {},
	onUnload() {},
	onReachBottom(){},
	onPullDownRefresh() {},
	onShareAppMessage() {},
})
```

**路由**

标签方式

```js
<navigate to="url?key=value"></navigate>
```

通过标签传的值在onLoad方法中的参数进行接收

编程方式

```js
// 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
wx.navigateTo({
    url: 'test?id=1',
    events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
            console.log(data)
        },
        someEvent: function(data) {
            console.log(data)
        }
    },
    success: function(res) {
        // 通过 eventChannel 向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
    }
})
//test.js
Page({
  onLoad: function(option){
    console.log(option.query)
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
    eventChannel.emit('someEvent', {data: 'test'});
    // 监听 acceptDataFromOpenerPage 事件，获取上一页面通过 eventChannel 传送到当前页面的数据
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data)
    })
  }
})



// 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
wx.redirectTo({
    url: 'test?id=1'
})

// 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
wx.switchTab({
   url: '/index'
})  

// 关闭所有页面，打开到应用内的某个页面
wx.reLaunch({
    url: "test?id=1",
})
```

**数据请求**

```js
wx.request({
    url: "",
    methods: 'POST',
    data: {},
    header: {}
    success() {},
    fail() {}
})
```

**上传资源**