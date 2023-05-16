## express框架

 基于NodeJS，用于构建web服务器的框架。

 官网：www.expressjs.com.cn

 安装：`npm  install  express`

```js
const express=require('express');
//引入下载的模块 
var server=express();  
//创建web服务器 
server.listen(3000); 
//监听3000端口
```

### 路由

  浏览器向web服务器发送请求，web服务器会根据请求的URL和请求的方法来做出响应

`  res.send() `

 响应文本，每个路由中只能使用一次send，路由里面如果不写，页面请求将一直是挂起状态

```JS
//引入第三方模块express
const express=require('express');
//创建web服务器
var app=express();
//监听端口
app.listen(3000);

//路由
//使用get方法获取url为/login的内容
//get:请求的方法，可以使用post等...
//第1个参数：请求的url
//第2个参数：响应的内容
app.get('/login',(req,res)=>{
  console.log('获取了login的请求');
  //res是响应的对象
  res.send('这是登录的页面');
});
```

 (1)响应对象——res

` res.send()` 发送文本，只能响应一次；如果是数字会认为是状态码

` res.sendFile()` 发送文件到浏览器，必须使用绝对路径`(__dirname) `

` res.redirect()`  响应的重定向(跳转)

 (2)请求对象(req)

`  req.method ` 获取请求的方法

` req.url`  获取请求的url

 `req.headers`获取请求的头信息

`req.query` 获取请求时，以查询字符串传递数据，返回对象

 `req.params`获取路由传递的数据，返回对象

(3)post和get请求

 get请求以查询字符串形式传递数据，服务器使用req.query获取数据，结果是对象；

 post请求是通过表单提交方法传递数据，服务器端通过事件形式来获取数据(后期会有简单方法)

```js
req.on('data', (buf)=>{ 
    获取的结果是buffer数据，转成普通字符串后变成了查询字符串，需要使用查询字符串模块解析为对象
});
```

示例：

```js
//创建web服务器
const express=require('express');
var server=express();
server.listen(3000);
//通过表单传递数据到服务器端
//请求方法：get，请求的url：/login
server.get('/login',(req,res)=>{
    //发送文件mylogin.html到浏览器
    res.sendFile(__dirname+'/mylogin.html');
});
//根据表单中请求来写对应的路由
//请求方法：get，请求的url：/mylogin
server.get('/mylogin',(req,res)=>{
    //获取get方法请求的数据————查询字符串
    res.send('登录成功，用户名：'+req.query.uname);
});
//请求方法：post，请求url：/myreg
server.post('/myreg',(req,res)=>{
  //获取post请求的数据
  //以事件的形式，如果有数据传递自动执行
  req.on('data',(buf)=>{
	//buf，服务器端获取的数据为buffer
	//转换成普通字符串后为  查询字符串
	//将查询字符串解析为对象
    var str=buf.toString();
	var obj=querystring.parse(str);
  });
  res.send('注册成功');
});

//请求方法：get，请求的url：/detail
// :lid接收浏览器传递数据，名称为lid
server.get('/detail/:lid',(req,res)=>{
    //获取浏览器端传递的数据
    console.log(req.params);
    res.send('这是商品详情');
});
// /shopping/500/dell
server.get('/shopping/:price/:title',(req,res)=>{
    console.log(req.params);
});
```

(4)使用路由传递数据——路由传参

 设置路由中接收

```js
server.get('/detail/:lid', (req,res)=>{  
    // :lid 设置数据的名称  req.params  //获取路由传递的数据，格式为对象 
})
```

 浏览器传递数据：` http://127.0.0.1:3000/detail/5`

### 路由器

 路由在使用过程中，不同的模块可能出现相同的URL，把同一个模块下的所有路由挂载到特定的前缀。

 例如：商品模块下的路由挂载到product，访问形式/product/list，用户模块下的路由挂载到user，访问形式/user/list

 路由器就是自定义模块(js文件)，把同一个模块下的路由放到一起。

```JS
const express=require('express');
var router=express.Router();  //创建空的路由器对象
router.get('/list', (req,res)=>{}); //往路由器中添加路由
module.exports=router; //导出路由器
```

 在web服务器下使用路由器

```JS
const productRouter=require('./product.js');
//引入路由器模块
server.use('/product', productRouter);
//把路由器挂载到 /product下，访问形式 /product/list
```

### 中间件

 中间件的作用为主要的业务逻辑所服务

 分为应用级中间件、路由级中间件、内置中间件、第三方中间件、错误级中间件

 (1)应用级中间件

  每一个中间件就是调用一个函数，需要配合其他的中间件或者路由使用

`  server.use( callback )`  拦截所有的路由

 `server.use( '/reg', callback );`拦截特定的路由

```JS
const express=require('express');
var server=express();
server.listen(3000);

//中间件
server.use((req,res,next)=>{
    console.log('验证了数据');
    //res.send('验证未通过');
    //下一步:调用下一个中间件或者进行主要业务逻辑
    next();
});
//路由
server.get('/reg',(req,res,next)=>{
    res.send('注册成功');
    //调用后边的中间件
    next();
});
//添加路由  get  /detail
server.get('/detail',(req,res,next)=>{
    res.send('这是详情');
    next();
});
//中间件
server.use((req,res)=>{
    console.log('记录了日志');
});
let num=0;
server.use('/view',(req,res,next)=>{
    num++;//数字加1
    //num的数据类型是非数字，++会转为数值型
    next();
});
```

 (2)内置中间件

```js
server.use(express.static('目录'))
```

  把静态资源文件托管到某一个目录，如果浏览器请求静态资源，则自动到这个目录下查找。

```js
const express=require('express');
var server=express();
server.listen(3000);
//托管静态资源(html,css,js,图像...)到public目录下，如果浏览器请求静态资源，自动就会到public下寻找
server.use(express.static('./public/'));

```

(3).第三方中间件body-parser

 可以将post请求的数据解析为对象

```js
const bodyParser=require('body-parser');
server.use(bodyParser.urlencoded({ extended:false}));
urlencoded  将post请求的数据解析为对象
extended:false  不适用第三方的qs模块，而是使用核心模块querystring将数据解析为对象
```

```js
const express=require('express');
//引入body-parser中间件
const bodyParser=require('body-parser');
var server=express();
server.listen(3000);
//托管静态资源到public
server.use(express.static('./public'));
//使用body-parser中间件，将post请求的数据解析为对象
//extended 是否要使用扩展qs模块解析为对象
//如果是false，不使用qs，而去使用querystring模块 
server.use(bodyParser.urlencoded({
    extended:false
}));
//路由
server.post('/mylogin',(req,res)=>{
    //获取post请求的数据，前提需要配置好中间件
    console.log(req.body);
    res.send('登录成功');
});
```

## 模块机制

我们平时使用JS在写后端代码的时候，会用`require()`来导入外部模块的内容，使用`module.export = {}` 或`exports const a = 1`来导出模块，可是为什么我们会使用者两个来作为导入导出，使用`require()`在导入时候都能导入什么文件，在导入导出的过程中发生了什么，其底层实现原理到底是什么，下面的内容将会逐一介绍；

CommonJS的出现

起初的JS，主要在浏览器端使用，在Web1.0的时候，只有对DOM、BOM的支持，到2.0 开始出现HTML5，使得JS可以使用浏览器端提供更强大的API，而对于JS本身，并没有太多的标准出现，主要有下面一些问题：

1. 没有模块系统
2. 标准库很少
3. 没有标准接口
4. 缺乏包管理系统

而CommonJS规范出现，主要就是解决JS没有标准的问题，开始对CommonJS的期望是：

1. 服务端JavaScript应用程序
2. 命令行工具
3. 桌面图形界面应用程序
4. 混合应用

发展到现在，很多期望已实现，其中包含模块、二进制、I/O流等的发展为JS作为服务的提供了丰富的工具，npm模块系统的出现更是为JS提供了强大的包管理系统

### CommonJS的模块规范

CommonJS对模块的定义分为模块引用、模块定义、模块标识

**模块引用**

```js
var math = require('math')
```

require作为接收一个模块的方法来引入外部的模块，`math`作为一个标识来表示外部模块的名称

**模块定义**

在一个模块当中，存在着`exports`和`module`的属性，我们通过他们可以将当前模块导出出去，供外部引用

导出

```js
// math.js
exports.add = function () {
    var sum = 0, i = 0, args = arguments, l = args.length
    while(i < l) {
        sum += args[i++]
    }
    return sum;
}
```

导入

```js
// main.js
var math = require('./math')
exports.increment = function(val) {
    return math.add(val, 1)
}
```

**模块标识**

模块标识是传递给`require()`方法中的参数，必须是小驼峰命名的字符串，或以`.`、`..` 开头的相对路径，或者决定路径，文件名后缀可以没有`.js`

CommonJS构建的这套模块导出和引入机制使得用户完全不必考虑变量污染，每个模块就是单独的空间，互不干扰

### Node模块的实现

在引入一个模块，需要经历3个步骤

1. 路径分析
2. 文件定位
3. 编译执行

而模块分为了核心模块和文件模块

核心模块部分在Node源代码的编译过程中，编译进了二进制执行文件。在Node进程启动时，部分核心模块就被直接加载进内存中，所以这部分核心模块引入时，文件定位和编译执行这两个步骤可以省略掉，并且在路径分析中优先判断，所以它的加载速度是最快的。

文件模块则是在运行时动态加载，需要完整的路径分析、文件定位、编译执行过程，速度比核心模块慢

**优先从缓存加载**

Node会对引入过的模块进行缓存，缓存的是编译和执行之后的对象

不论是核心模块还是文件模块，`require()`方法对相同模块的二次加载都采用缓存优先的方式，而不同的是核心模块的缓存检查先于文件模块的缓存检查

**路径分析和文件定位**

一、首先是**对标识符的分析**，标识符有多种形式，在分析路径的时候也会有差异

模块标识主要分为以下几类：

- 核心模块，http、fs、path等
- `.`或`..`开通的相对路径文件模块
- 以`/`开头的绝对路径模块
- 非路径形式的文件模块，如自定义的connect模块

1. 核心模块

核心模块的优先级**仅次于**缓存加载，它在Node的源代码编译过程中已被编译为二进制代码，加载过程最快

如果用户自定义模块和核心模块命名冲突，将加载失败，用户命名模块需要和核心模块不能重名

2. 路径形式的文件模块

以`．`、`.．`和/开始的标识符，这里都被当做文件模块来处理。在分析文件模块时，`require()`方法会将路径转为真实路径，并以真实路径作为索引，将编译执行后的结果存放到缓存中，以使二次加载时更快，速度慢于核心模块

3. 自定义模块

它是一种特殊的文件模块，可能是一个文件或者包的形式，这类模块的查找是最费时的，也是所有方式中最慢的一种；

模块路径是Node在定位文件模块的具体文件时制定的查找策略，具体表现为一个路径组成的数组

比如打印当前的文件路径

```js
// main.js
console.log(module.paths);
```

执行`node main.js`，打印如下

```shell
[
  'E:\\project\\knowledgebase\\node_modules',
  'E:\\project\\node_modules',
  'E:\\node_modules'
]
```

模块路径的生成规则如下所示。
当前文件目录下的node_modules目录。

 父目录下的node_modules目录。

父目录的父目录下的node_modules目录。

沿路径向上逐级递归，直到根目录下的node_modules目录。

它的生成方式与JavaScript的原型链或作用域链的查找方式十分类似。在加载的过程中，Node会逐个尝试模块路径中的路径，直到找到目标文件为止。可以看出，当前文件的路径越深，模块查找耗时会越多，这是自定义模块的加载速度是最慢的原因

二、对文件定位

从缓存加载的优化策略使得二次引入时不需要路径分析、文件定位和编译执行的过程，大大提高了再次加载模块时的效率

1. 文件扩展名分析

require()在分析标识符的过程中，会出现标识符中不包含文件扩展名的情况。

CommonJS模块规范也允许在标识符中不包含文件扩展名，这种情况下，Node会按`.js`、`.json`、`.node`的次序补足扩展名，依次尝试。在尝试的过程中，需要调用fs模块同步阻塞式地判断文件是否存在。因为Node是单线程的，所以这里是一个会引起性能问题的地方。小诀窍是：如果是`.node`和`．json`文件，在传递给`require()`的标识符中带上扩展名，会加快一点速度。另一个诀窍是：同步配合缓存，可以大幅度缓解Node单线程中阻塞式调用的缺陷

2. 目录分析和包

在分析标识符的过程中，require()通过分析文件扩展名之后，可能没有查找到对应文件，但却得到一个目录，这在引入自定义模块和逐个模块路径进行查找时经常会出现，此时Node会将目录当做一个包来处理。在这个过程中，Node对CommonJS包规范进行了一定程度的支持。

首先，Node在当前目录下查找`package.json`（CommonJS包规范定义的包描述文件），通过`JSON.parse()`解析出包描述对象，从中取出main属性指定的文件名进行定位。如果文件名缺少扩展名，将会进入扩展名分析的步骤。而如果main属性指定的文件名错误，或者压根没有`package.json`文件，Node会将`index`当做默认文件名，然后依次查找`index.js`、`index.json`、`index.node`。如果在目录分析的过程中没有定位成功任何文件，则自定义模块进入下一个模块路径进行查找。如果模块路径数组都被遍历完毕，依然没有查找到目标文件，则会抛出查找失败的异常

### 模块编译