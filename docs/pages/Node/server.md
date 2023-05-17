
::: slot doclist
[[toc]]
:::

# express框架

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

# Node搭建后台服务器

使用express搭建简单的后台服务器

## 目录框架

> server
>
> > api    对数据库操作的文件
> > config  各种通用的配置，比如数据库配置等等
> > db 数据库连接
> > lib
> > routes 路由层
> > routesController  对路由的操作
> > utlis  工具类的封装
> > whiteList  白名单放在该目录下
> > index.js  入口文件

## 开始搭建

使用`npm init  -y`初始化一个package.json文件(为什么安装？)
使用`npm install express --save`
测试是否安装成功
在index.js文件搭建服务器
index.js

```javascript
let express = require('express');//导入express框架
let app = express();//定义app实例
app.get('/',(req,res)=>{//定义一个测试路由
    res.send('测试成功')
})
app.listen(8084,()=>{//监听端口号
    console.log('server starting  on 8084')
})

```

启动服务：`nodemon index.js` 

[^nodemon]: 可在检测到目录中的文件更改时通过自动重新启动节点应用程序来帮助开发基于node.js的应用程序,是替换包装的node,全局安装方式：`npm install -g nodemon`

浏览器地址栏输入：localhost:8084，可以看到测试成功
**服务器的配置**
这里将服务器的端口号、地址，配置在config配置层里面
config下新建config.js

```javascript
//config.js
//导出服务器的配置
exports.serverOptions = {
	host:'http://localhost',//地址
	port:8084//端口
}
```

index.js文件的配置

```javascript
global.__basename = __dirname;//dirname是当前项目的绝对路径
//config面的文件好多地方都会用到，导入到index.js文件里面
global.config = require(__basename + '/config/config.js');
app.listen(config.serverOptions.port,()=>{//监听端口号
    console.log('server starting  on 8084')
})
```

重新访问：看到 "测试成功" 说明配置正确
**路由的配置**
在routes文件夹下新建routes.js文件，routesController下新建routesController.js文件
这里将路由接口放在routes.js文件里面，将路由的处理逻辑放在routesController.js文件下

routes.js路由层的配置

```javascript
//导入路由控制器层
let routesController = require(__basename + '/routesController/routesController.js');
module.exports = (app) => {
    app.get('/register',routesController.register);
}

```

routesController.js控制器层的配置

```javascript
//routesController.js
class RoutesController {
    register(req,res){
        console.log("req=>",req.body);
        res.send("访问=>"+req.body.url+"路径");
    }
}
//导出实例
module.exports = new RoutesController();

```

index.js层的配置

```javascript
//将路由导入到index.js入口文件
//index.js
//导入路由
let routes = require(__basename + '/routes/routes.js');
//加载路由
routes(app);
//处理一下报错信息的拦截
//处理404
app.use((req, res) => {
  res.status(404).send('找不到资源');
})

//处理500
app.use((err, req, res) => {
  if (err) {
    res.status(500).send('后台服务器出错');
  } 
})
```

浏览器输入：`http://localhost:8084/register`返回注册成功
路由配置完成。
**数据库的配置**
数据库使用Sequelize框架进行搭建数据库
sequelize文档，点击[这里](https://www.sequelize.com.cn/ )
在config.js中配置mysql数据库的连接信息：

```javascript
//mysql数据库配置
exports.mysqlOptions = {
    database :'tour',//数据库名称
    username:'root',//用户名
    password:'root',//连接密码
    host:'localhost',//连接地址
    dialect:'mysql',//连接数据库类型
    timezone:'+08:00',//设置时区
    pool:{//连接池的配置
        max:10,//最大连接数
        min:0,//最小连接数
        acquire:30000,//连接超时时间(ms)
        idle:1000//闲置时间(ms)
    }
}
```

连接配置详细说明，参考[这里](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-constructor-constructor)
在db文件夹下创建连接数据库的文件connect.js
根据下面方式进行连接

```javascript
//导入sequelize模块
let Sequelize = require('sequelize');

//导出连接
module.exports = new Sequelize(config.mysqlOptions.database, config.mysqlOptions.username, config.mysqlOptions.password, {
  //连接地址
  host: config.mysqlOptions.host,
  //连接数据库类型
  dialect: config.mysqlOptions.dialect,
  //时区
  timezone: config.mysqlOptions.timezone,
  //数据库连接池
  pool: config.mysqlOptions.pool

})
```

index.js中导入

```javascript
//导入数据库连接
global.sequelize = require(__basename + '/db/connect.js');
```

此时数据库的配置配置完成，下面需要创建模型来创建表格
在db文件夹下创建model文件夹，在model文件夹创建user.js文件，在user.js里面创建user表格

```javascript
//导入sequelize
let Sequelize = require('sequelize');
//获取模型类型
let Model = Sequelize.Model;
//创建user模型，同时继承Model
class User extends Model{}
//定义模型结构，映射为数据表结构
User.init({
    //定义数据表字段
    //表id
    id:{
         type: Sequelize.INTEGER.UNSIGNED,//数据类型：INTEGER整型，UNSIGNED无符号
        allowNull:false,//是否为空
        primaryKey:true//是否为主键
        autoIncrement:true,//是否自增
        comment:'表id'//说明
    },
    //用户id
    userId: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: '',//默认值为空
        comment: '用户id'
    },
  //邮箱
    email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: '',
        comment: '邮箱'
    },
    //昵称
    nickname: {
        type: Sequelize.STRING(30),
        allowNull: false,
        defaultValue: '',
        comment: '昵称'
    },
  //密码
  password: {
    type: Sequelize.STRING(32),
    allowNull: false,
    defaultValue: '',
    comment: '密码'
  }
},{
  // 默认为类的名称，即在这种情况下为`User`。 这将控制自动生成的`foreignKey`（外键）的名称和关联命名
  modelName: 'user',
  //是否添加时间戳属性 (updatedAt, createdAt)
  timestamps: true,
  //是否开启假删除(逻辑删除), 真删除(物理删除)
  //不实际删除数据库记录，而是设置一个新 deletedAt 属性，其值为当前日期
  paranoid: true,
  //自动设置字段为蛇型（以_方式命名）命名规则
  underscored: true,
  //是否禁止修改表名
  //默认情况下，sequelize 会自动将所有传递的模型名称转换为复数形式。
  freezeTableName: true,
  //连接实例
  sequelize
})
//force: true, 如果存在该表，则先删除该表，再创建新表，否则直接创建新表
//force: false, 如果存在该表，则不创建新表，否则创建新表
User.sync({force: false});
//导出模型
module.exports = User;
```

创建完表之后，为了不在index.js中多次导入不同的模型，可以创建一个model.js模型来，将所有的模型存放在model.js里面，然后在导入到index.js里面
model.js

```javascript
//用户模型
let User = require(__basename + '/db/model/user.js');
//导出模型
module.exports = {
  User
}
```

在index.js中导入model模型

```javascript
//导入模型
global.Model = require(__basename + '/db/model/model.js');
```

刷新xz数据库，打开表可以发现创建了一个表user，此时user表为空表
数据库的相关操作配置完成，具体查看官方文档
服务器搭建好，数据库已连接，路由信息配置好，接下来要做一个通过邮箱进行注册的功能
**注册模块**
前端页面搭建非常简单，通过jQuery发起注册请求
呐，最简单不过了：

```html
输入用户名：<input type="text" id="uname"> <br>
输入密码：<input type="text" id="pwd"><br>
输入邮箱：<input type="text" id="email"><br>
<button id="register">注册</button>
 <script src="./jquery-3.4.1.min.js"></script>
```

随便找一个jquery.js文件，并引入到这个html里面



