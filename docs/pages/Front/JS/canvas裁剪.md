功能

显示图片(背景为黑色)

滚轮滚动图片放大缩小

可支持鼠标拖动

框选



放大缩小是对canvas放大缩小吗？

将图片放在canvas上面

操作canvas?



实现步骤如下：

1. 定义一个canvas标签。

这里有个很重要的地方，就是这个width和height一定要写，否则不能实现。同时，画布的宽高只能用这个方法写，css设置有问题。大家可以试试。

2.初始化canvas,以及其他所需对象。

```js
var canvas, context;

var img,//图片对象

    imgIsLoaded,//图片是否加载完成;

    imgX = 0,

    imgY = 0,

    imgScale = 1;

(function int() {

                 canvas = document.getElementById('bargraphCanvas'); //画布对象

                 context = canvas.getContext('2d');//画布显示二维图片

                 loadImg();

                })();
```



3.定义一个image对象并设置好它的onload事件和src属性。

```js
function loadImg () {
    img = new Image();
    img.onload = function () {
        undefined

        imgIsLoaded = true;

        drawImage();
    }

    img.src = '../../Content/images/mayday.jpg';
}
```



4.调用canvas的draw方法。

```js
function drawImage () {
    undefined

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(

        img, //规定要使用的图像、画布或视频。

        0, 0, //开始剪切的 x 坐标位置。

        img.width, img.height, //被剪切图像的高度。

        imgX, imgY,//在画布上放置图像的 x 、y坐标位置。

        img.width * imgScale, img.height * imgScale //要使用的图像的宽度、高度

    );
}
```



这里要介绍下canvas的drawImage方法，参考w3school，drawImage是可以实现图片的裁剪功能，参数的含义以及是否必填如下：

** img 规定要使用的图像、画布或视频。

** sx 可选。开始剪切的 x 坐标位置。

** sy 可选。开始剪切的 y 坐标位置。

** swidth 可选。被剪切图像的宽度。

** sheight 可选。被剪切图像的高度。

** x 在画布上放置图像的 x 坐标位置。

** y 在画布上放置图像的 y 坐标位置。

** width 可选。要使用的图像的宽度。(伸展或缩小图像)

** height 可选。要使用的图像的高度。(伸展或缩小图像)

5.到这里，如果代码没有问题的话，图片就可以成功地在canvas中显示了。下面就是实现放大、缩小、平移操作。在初始化canvas的同时也初始化其事件，如下：

```js
 /*事件注册*/

function canvasEventsInit () {
    canvas.onmousedown = function (event) {
        var pos = windowToCanvas(event.clientX, event.clientY); //坐标转换，将窗口坐标转换成canvas的坐标

        canvas.onmousemove = function (evt) { //移动

            canvas.style.cursor = 'move';

            var posl = windowToCanvas(evt.clientX, evt.clientY);

            var x = posl.x - pos.x;

            var y = posl.y - pos.y;

            pos = posl;

            imgX = x;

            imgY = y;

            drawImage(); //重新绘制图片

        };

        canvas.onmouseup = function () {
            canvas.onmousemove = null;
            canvas.onmouseup = null;
            canvas.style.cursor = 'default';
        };
    };
    canvas.onmousewheel = canvas.onwheel = function (event) { //滚轮放大缩小

        var pos = windowToCanvas(event.clientX, event.clientY);
        event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltalY * (-40)); //获取当前鼠标的滚动情况

        if (event.wheelDelta > 0) {
            imgScale *= 2;
            imgX = imgX * 2 - pos.x;
            imgY = imgY * 2 - pos.y;
        } else {
            imgScale /= 2;
            imgX = imgX * 0.5 pos.x * 0.5;
            imgY = imgY * 0.5 pos.y * 0.5;
        }
        drawImage(); //重新绘制图片
    };

}
```



/*坐标转换*/

```js
function windowToCanvas(x,y) {
   var box = canvas.getBoundingClientRect(); //这个方法返回一个矩形对象，包含四个属性：left、top、right和bottom。分别表示元素各边与页面上边和左边的距离

	return {
            x: x - box.left - (box.width - canvas.width) / 2,

            y: y - box.top - (box.height - canvas.height) / 2

     };

}
```

