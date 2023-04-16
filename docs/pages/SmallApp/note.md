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





## Canvas绘制，保存图片，分享

### 小程序用Canvas绘制卡片

```html
<canvas 
  bindlongtap="operateSelect"
  bind:select="onSelectShare"
  bind:close="onCloseShare"
  style='width:{{clientWidth}}px; height:{{clientHeight}}px' 
  class="canvasImage" 
  type="2d" 
  id="myCanvas">
</canvas>
```

```js
// 开始绘制
draweCanvas() {
    var that = this;
    //  canvans的宽高   文字距左  图片距左的位置  
    let clientWidth = 0, clientHeight = 0, textLeft = 30, imageLeft = 430
    wx.getSystemInfo({
      success: (result) => {
        clientWidth = result.windowWidth - 60
        clientHeight = 180
        imageLeft = result.windowWidth + 50
          
         // 根据屏幕尺寸来绘制canvas
        this.setData({
          clientWidth,
          clientHeight
        })
      },
    })
    // 获取Canvas元素实例
    const query = wx.createSelectorQuery()
    query.select('#myCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        // Canvas实例
        this.canvasRef = res[0].node
        const ctx = this.canvasRef.getContext('2d')
        
        // 获取屏幕像素比
        const dpr = wx.getSystemInfoSync().pixelRatio
        
        // 通过屏幕像素比来计算Canvas宽度
        this.canvasRef.width = res[0].width * dpr - 60
        this.canvasRef.height = res[0].height * dpr
        

        // 创建一个图片对象
        const img = this.canvasRef.createImage()
        
        // 加载图片
        img.onload = () => {
          this._img = img

          // 背景
          ctx.drawImage(img, 0, 0, this.canvasRef.width, this.canvasRef.height);
            
           
          ctx.font = '33px sans-serif';
          ctx.fillText("志愿者证", textLeft + 80, 70);

          ctx.font = '22px sans-serif';
          ctx.fillText("姓名           性别", textLeft, this.canvasRef.height - 220);
          ctx.font = '24px sans-serif';
          ctx.fillText("张三       男", textLeft, this.canvasRef.height - 185);

          ctx.font = '22px sans-serif';
          ctx.fillText("志愿者编号", textLeft, this.canvasRef.height - 120);
          ctx.font = '24px sans-serif';
          ctx.fillText("622621199032345823", textLeft, this.canvasRef.height - 85);

          ctx.font = '22px sans-serif';
          ctx.fillText("全国志愿者联合会", textLeft, this.canvasRef.height - 30);

		// 加载二维码
          img.onload = () => {
            
            ctx.drawImage(img, imageLeft + 30, 240, 96, 96);
            // 加载头像
            img.onload = () => {
              
              ctx.drawImage(img, imageLeft + 30, 40, 100, 100);
              // 加载logo
              img.onload = () => {
                ctx.drawImage(img, 30, 30, 70, 70);
                // 获取canvas的base64格式的图片
                this.personCardImaage = this.canvasRef.toDataURL();
              }
              img.src = '../../static/images/logo.png'
            }
            img.src = '../../static/images/touxiang.png'

          }
          img.src = '../../static/images/qrcode.png'
        }
        img.src = '../../static/images/true3.png'
      })
  },
```

#### 分享 保存  收藏

```js
operateSelect() {
    let that = this;
    const canvas = that.canvasRef
    // 将Canvas图像转换为临时路径
    wx.canvasToTempFilePath({
        canvas,
        fileType: "jpg", // 图片类型
        quality: 1,  // 图片质量
        success: (res) => {
            const imgUrl = res.tempFilePath  //得到临时路径
            // 图片的弹框
            wx.showShareImageMenu({
                path: imgUrl
            })
        }
    })
}
```

#### 总结

Canvas绘制的图像,可以通过`wx.canvasToTempFilePath`得到一个临时路径,可以通过`this.canvasRef.toDataURL()`获取到一个base64格式的图片

保存canvas上图片的另一种写法

```js
saveImg() {
    let that = this;
    wx.showLoading({
        title: '生成中...',
    })
    wx.canvasToTempFilePath({
        canvas: that.canvasRef,
        x: 0,
        y: 0,
        width: that.canvasWidth * 2,
        height: that.clientHeight * 2,
        destWidth: that.clientWidth * 2,
        destHeight: that.clientHeight * 2,
        success: res => {
            wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: res => {
                    wx.showModal({
                        title: "保存成功！",
                        content: "图片已保存到本地相册",
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                console.log(123);
                            }
                        }
                    })
                },
                fail: err => {
                    console.log(err)
                }
            })
        },
        fail: err => {
            console.log(err)
        }
    })
    setTimeout(() => {
        wx.hideLoading()
    }, 1000)

},
```

canvas画法

```js
testCanvas() {
    const ctx = wx.RenderingContext('myCanvas')
    Canvas.getContext('2d')
    // Draw coordinates
    ctx.arc(100, 75, 50, 0, 2 * Math.PI)
    ctx.setFillStyle('#EEEEEE')
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(40, 75)
    ctx.lineTo(160, 75)
    ctx.moveTo(100, 15)
    ctx.lineTo(100, 135)
    ctx.setStrokeStyle('#AAAAAA')
    ctx.stroke()

    ctx.setFontSize(12)
    ctx.setFillStyle('black')
    ctx.fillText('0', 165, 78)
    ctx.fillText('0.5*PI', 83, 145)
    ctx.fillText('1*PI', 15, 78)
    ctx.fillText('1.5*PI', 83, 10)

    // Draw points
    ctx.beginPath()
    ctx.arc(100, 75, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('lightgreen')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(100, 25, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('blue')
    ctx.fill()

    ctx.beginPath()
    ctx.arc(150, 75, 2, 0, 2 * Math.PI)
    ctx.setFillStyle('red')
    ctx.fill()

    // Draw arc
    ctx.beginPath()
    ctx.arc(100, 75, 50, 0, 1.5 * Math.PI)
    ctx.setStrokeStyle('#333333')
    ctx.stroke()

    ctx.draw()
  },
```



#### 使用错误的写法

```js
// 下载文件  url不能为base64  否则为无效的url   
wx.downloadFile({
    url: that.personCardImaage,
    success: (res) => {
        console.log('that.personCardImaage,', that.personCardImaage,);
        wx.showShareImageMenu({
            path: res.tempFilePath
        })
    },
    fail: (error) => {
        console.log('that.personCardImaage,', that.personCardImaage,);
    }
})
```

Vue通过canvas绘制卡片

```vue
<template>
  <div class="mainBox">
    <img :src="reDrawQcodeSrc" alt="" />
  </div>
</template>
<script>
import aaaa from '../../assets/aaaa.png'
import logo from '../../assets/logo.png'
export default {
  data() {
    return {
      qrcode:
        "https://cdn.pixabay.com/photo/2016/12/13/05/15/puppy-1903313_960_720.jpg",
      userPhoneId: "月半周",
      reDrawQcodeSrc: "",
    };
  },
  mounted() {
    this.reDrawQcode();
  },
  methods: {
    // 重绘图片-背景图与二维码的组合
    reDrawQcode() {
      // 可视窗口宽度
      let pageWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
      // 可视窗口高度
      let pageHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
      console.log("pageWidth", pageWidth);
      console.log("pageHeight", pageHeight);
      // 背景图片
      let imgBg = new Image();
      imgBg.src = aaaa;
      imgBg.crossOrigin = "Anonymous";
      imgBg.onload = () => {
        // 创建画布
        let canvas = document.createElement("canvas");
        // 规定画布大小
        canvas.width = pageWidth; // 画布宽度占满屏幕
        canvas.height = (canvas.width * imgBg.height) / imgBg.width; // 画布根据背景图宽高比等比例方法或缩小
        console.log("canvas.width1", canvas.width);
        console.log("canvas.height1", canvas.height);
        let context = canvas.getContext("2d");
        // 绘制背景图
        context.drawImage(imgBg, 0, 0, canvas.width, canvas.height);
        // 二维码图片
        let imgQcode = new Image();
        imgQcode.src = this.qrcode + "?time=" + new Date().valueOf(); // 模拟接口获取二维码，绘制线上图片
        imgQcode.crossOrigin = "Anonymous";
        imgQcode.onload = () => {
          let left = canvas.width * 0.2; // 二维码宽度设定为总宽的 60%，设定左侧空隙为 20% 使其水平居中
          let top = canvas.height * 0.8 - canvas.width * 0.6;
          // 绘制二维码
          context.drawImage(
            imgQcode,
            left,
            top,
            canvas.width * 0.6,
            canvas.width * 0.6
          );
          // 绘制文字
          //设置填充文字样式
          context.font = "16px Microsoft Yahei";
          context.fillStyle = "#ffffff";
          //设置文字及其位置
          context.fillText(
            this.userPhoneId + "的二维码",
            canvas.width * 0.23,
            canvas.height * 0.2
          );
          // 用户头像-圆形
          let imgHead = new Image();
          imgHead.src = logo;
          imgHead.crossOrigin = "Anonymous";
          imgHead.onload = () => {
            let circle = {
              left: canvas.width * 0.13,
              top: canvas.height * 0.2,
              radio: canvas.width * 0.065,
            };
            // 绘制圆形区域
            context.arc(circle.left, circle.top, circle.radio, 0, 2 * Math.PI);
            context.clip();
            context.fill();
            context.drawImage(
              imgHead,
              circle.left - circle.radio,
              circle.top - circle.radio,
              circle.radio * 2,
              circle.radio * 2
            );
            let base64 = canvas.toDataURL("image/png"); // 将 canvas 画布转换成 base64 码
            this.reDrawQcodeSrc = base64; // 赋值给 img 标签
          };
        };
      };
    },
  },
};
</script>

```

