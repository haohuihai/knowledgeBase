Node概述

 Node基于谷歌的V8引擎(JS解释器)，运行在服务器端的语言，基于JS。

 http://nodejs.org  英文官网

 http://nodejs.cn 中文

 **对比JS和NODEJS**

 (1)JS运行在浏览器端，存在兼容性的问题；NodeJS运行在服务器端，不存在兼容性问题。

 (2)两者都有内置(ES)对象、自定义对象、宿主对象(根据执行环境的不同)

 (3)JS用于网页中的交互效果，NodeJS用于服务器端操作，例如：创建web服务器、操作数据库...

**NodeJS的执行方式**

 脚本模式 `node 01.js`

 交互模式

  node 回车 进入交互模式

  两次ctrl+c或者输入 .exit  退出交互模式

**NodeJS特点及应用**

支持数万个并发连接

应用于基础社交网络的大规模web应用

**全局对象**

 **NodeJS: global**

 在交互模式下，声明的变量和创建的函数都是全局对象下的，可以使用global来访问，例如 var a=1;  global.a

 在脚本模式下，文件中声明的变量和创建的函数不是全局对象下的，不能使用global来访问

 **JS: window**

 在浏览器下，文件中声明的变量和创建的函数是全局对象下的，可以使用window来访问，例如 `var a=1; window.a`

 (1)console对象

  global.console.log() 打印日志

  global.console.info()  打印消息

  global.console.warn()  打印警告

  global.console.error()  打印错误

  global.console.time('自定义字符串');  开始计时

  global.console.timeEnd('自定义字符串');  结束计时

 (2)process

  当前计算机的进程

  process.arch  查看当前CPU的架构  X64

  process.platform  查看当前的操作系统  win32

  process.env  查看当前的环境变量有哪些

  process.version  查看当前nodejs的版本号

  process.pid 查看当前的进行编号

  process.kill(编号)  杀死某个编号的进程

 (3)Buffer

  缓冲区：在内存中存储数据的区域，存储网络传输时的资源。

  创建buffer

```js
var buf=Buffer.alloc(5, 'abcde');
```

  将buffer数据转为普通字符串

   ```js
buf.toString()
   ```

创建两个buffer区域，分别存储两个数字，计算两个数字相加。

```js
var buf1=Buffer.alloc(2,'12');
var buf2=Buffer.alloc(1,'5');
console.log(buf1,buf2);
var num1=buf1.toString();
var num2=buf2.toString();
console.log(Number(num1)+Number(num2));
```

**模块系统**

 模块是一个预定义好的功能体，在NodeJS下，每一个文件都是一个模块。

 在NodeJS下分为自定义模块、核心模块(官方提供)、第三方模块

 在NodeJS下，一个文件就是一个模块，文件中的代码默认是被一个构造函数所包含。文件中的函数和变量都不能被直接使用

下面的代码都是NodeJS自动为每个文件添加的

```js
(function(exports,require,module,__filename,__dirname){ 程序编写的代码})
```

**__filename** 当前文件的完整路径和文件名称

**__dirname** 当前文件的完整路径

**require** 是一个函数，用于引入模块  `require('./index.js')`

**module** 指代当前的模块 module.exports  当前模块导出的对象（公开的内容），可以供其它的模块使用的属性和方法。

**exports** 等价于module.exports

|          | 以路径开头                                                   | 不以路径开头                                                 |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 文件模块 | require('./circle.js')常用于用户自定义模块，如果后缀名是js是可以省略的 | require('url')常用于引入官方提供的核心模块                   |
| 目录模块 | require('./Animal')会在当前目录下的Animal中寻找package.json文件中的main属性对应的值，如果不存在该文件，则自动寻找index.js | require('Animal')要求引入的目录出现在node_modules中，如果找不到，则会到上一级目录查找，直到顶层。常用于第三方模块。 |

**第三方模块**

安装方式：`npm install package`

**核心模块**

是NodeJS官方提供的模块，可以直接引入，不需要创建。

**查询字符串模块——querystring**

```js
const querystring=require('querystring');
```

查询字符串：浏览器向服务器发送请求，传递数据的一种方式

协议，域名(IP)，端口；比如

` http://www.baidu.com:880/map.html?lid=5&name=dell`

`parse() ` 将查询字符串解析为对象

`stringify()  `将对象转为查询字符串

 ```js
//引入查询字符串模块
const querystring=require('querystring');
var str='lid=5&name=dell';
//使用查询字符串模块解析为对象
var obj=querystring.parse(str);
console.log(obj);
// {
// 	lid:5,
// 	name:dell
// }

var emp={
  eid:1,
  ename:'tom',
  salary:8000
}
//将对象转为查询字符串，为了将数据发送给服务器端
var str2=querystring.stringify(emp);
console.log(str2);
// 'eid=1&ename=tom&salary=8000'

var str3='ie=utf-8&f=8&rsv_bp=0&rsv_idx=1&tn=baidu&wd=电脑';
var obj3=querystring.parse(str3);
console.log(obj3);
{
  ie: 'utf-8',
  f: '8',
  rsv_bp: '0',
  rsv_idx: '1',
  tn: 'baidu',
  wd: '电脑'
}

 ```



**Url模块**

parse()  将URL解析为对象

protocol  协议

hostname  主机(域名/ip地址)

port  端口

pathname  文件在服务器上的路径

query 查询字符串

format()  将对象转换成url

query属性对应的是对象格式

```js
//引入url模块
const url=require('url');
var str='http://www.codeboy.com:80/web1811/index.html?name=tom&id=23';
//将url解析为对象
var obj=url.parse(str);
console.log(obj);
//协议，主机，端口，文件路径，查询字符串
var obj2={
    protocol:'http',
    hostname:'www.codeboy.com',
    port:80,
    pathname:'/web1811/index.html',
    query:{name:'tom',id:23} //使用对象
}

//将对象转换成url
var str2=url.format(obj2);
console.log(str2);
// http://www.codeboy.com:80/web1811/index.html?name=tom&id=23
```

综合：

```js
//引入url模块
const url=require('url');
//引入查询字符串模块
const querystring=require('querystring');
var str='https://www.tmooc.cn:3000/course/web.html?cname=js&price=5000';
//先获取到查询字符串
var obj=url.parse(str);
var query=obj.query;
//从查询字符串中获取数据
var obj2=querystring.parse(query);
console.log(obj2);
// { cname: 'js', price: '5000' }
```

**全局函数**

`parseInt/parseFloat/encodeURI/decodeURI/isNaN/ isFinite/eval`

定时器 `let timer = setTimeout(callback, time)`、`let timer = setInterval(callback, time)`

清除定时器  `clearTimeout(timer)`、`clearInterval(timer)`

立即执行定时器： `process.nextTick(回调函数)`

看下列的执行顺序：

```js
setTimeout(() => {
    console.log('setTimeout')
},0)
//立即执行定时器
//后执行
console.log('1212')
var timer=setImmediate(()=>{
    console.log('立即执行');
});
//先执行
process.nextTick(()=>{
    console.log('tick');
});
console.log('33333')


结果：
1212
33333
tick
setTimeout
立即执行
```



**文件系统模块**

用于操作服务器的文件(目录)，创建目录、删除目录、读取目录、创建文件、删除文件、写入文件....

 (1)创建目录

```js
fs.mkdir(path, callback)
fs.mkdirSync(path)
```

 (2)移除目录

```js
fs.rmdir(path, callback)
```

 (3)读取目录

 ```js
fs.readdir(path, callback)  —— 异步
fs.readdirSync(path)    —— 同步
 ```

**对比同步和异步的区别**

 同步会阻止后续代码的执行，只有执行完以后才会执行后续代码；是通过返回值来获取结果。

 异步不会阻止后续代码的执行，在整个程序的最后执行，是通过回调函数来获取结果。常用于一些比较耗时的操作。

 (4)写入文件

```js
fs.writeFile(path, data, callback)
```

 如果文件不存在，则会创建文件，然后写入数据；如果文件已经存在，则会清空文件的内容，然后写入

> callback的格式

```js
(err, result) => {

}
```

 (5)删除文件

```js
fs.unlink(path, callback)/unlinkSync(path)
```

 (6)判断文件是否存在

```js
fs.existsSync(path)
```

 (7)追加写入数据

```js
fs.appendFile(path,data,callback)

fs.appendFileSync(path,data)
```

  如果文件不存在会创建文件，如果文件已经存在，会在末尾追加写入数据。

 (4)读取文件

```js
fs.readFile(path, callback)/fs.readFileSync(path)
```

  读取的数据格式为buffer

**http协议**

 是浏览器和web服务器之间的通信协议

 (1)通用头信息

  Request URL: 请求的URL，向服务器端获取的内容

  Request Method: 请求的方法  常用的有 get/post  get获取内容，post常用于向服务器端传递安全较高数据

  Status Code: 响应的状态码

  ```
2**: 服务器成功的响应

3**: 响应的重定向，跳转到另一个URL

4**: 客户端错误

5**: 服务器错误
  ```

  Remote Address: 请求的服务器的IP地址和端口号

 (2)响应头信息

  Connection: keep-alive; 连接的方式：持续连接

  Content-Type: 响应的文件类型

  Transfer-Encoding: 响应时的传输方式，chunked（分段传输）

 (3)请求头信息

  Accpet: 客户端接受的文件类型有哪些

  Connection: 客户端和服务器端的连接方式

  User-Agent: 客户端使用的浏览器

 (4)请求主体

  可有可无，浏览器端向服务器端传递的数据

3.http模块

 可以模拟浏览器向服务器端发送请求；也可以创建web服务器

 (1)模拟浏览器

```
 http.get( url, callback ) 
 url 请求的url 
 callback  是回调函数，用来获取服务器端的响应  
 res 响应的对象  
 res.statusCode  响应的状态码  
 res.on('data', (buf)=>{    
 通过事件来获取服务器端响应的数据，当有数据传递的时候，自动调用回调函数，把数据放入到buf中，格式为buffer  
 })
```

```JS
const http=require('http');
http.get('http://www.weather.com.cn/data/sk/101010100.html',(res)=>{
    console.log(res);
    console.log(res.statusCode);
    res.on('data',(buf)=>{
        console.log(buf.toString());
    });
});
```

 (2)创建web服务器

```
 var server=http.createServer()  //创建web服务器 
 server.listen(3000)  //分配端口，监听3000端口的变化 
 server.on('request', (req,res)=>{   }) 
 接收浏览器的请求，是事件的形式，一旦有请求，自动执行  
 req  请求的对象   
 url 请求的URL，用于告诉服务器要获取的内容   
 method  请求的方法，直接在地址栏输入默认都是get   
 headers  请求的头信息  
 res 响应的对象   
 writeHead(状态码, { }) 设置响应的状态码和头信息；如果要跳转需要设置Location属性。  
 write() 将响应的数据发送到浏览器中   
 end() 结束响应 
```

```JS
const http=require('http');
//创建web服务器
var server=http.createServer();
//监听端口
server.listen(3000);
//接收浏览器的请求
server.on('request',(req,res)=>{
  //根据请求的URL，来获取响应的内容
  var url=req.url;
  console.log(url);
  switch(url){
    case '/login':
	  res.write('this is login page');
	  break;
	case '/member':
      res.write('this is member page');
	  break;
	case '/':
	  res.writeHead(302,{
	    Location:'/member'
	  });
	  break;
	default:
      res.write('404 not founbd');
  }
  //以上所有的响应，最终都需要结束响应
  res.end();
});
```

4.express框架

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

 (1)路由

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

5.路由器

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

6.中间件

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



2.MySQL模块

 增  INSERT INTO emp VALUES(NULL,'tom'....);

 删  DELETE FROM emp WHERE eid=5;

 改  UPDATE emp SET ename='tom',sex='1' WHERE eid=5;

 查  SELECT * FROM emp;

 mysql.exe -h127.0.0.1 -P3306 -uroot -p

 (1)普通连接

```JS
var connection=mysql.createConnection({ }); 
创建连接对象，传递mysql服务器的IP地址/域名,端口,用户名,密码,使用的数据库
connection.connect();  执行连接
connection.query(sql,callback)   sql要执行的SQL语句， callback回调函数，获取SQL语句结果。connection.end(); 执行完所有的SQL语句，关闭连接。
```

```JS
//引入mysql模块
const mysql=require('mysql');
//1.普通连接
//1.1创建连接
var connection=mysql.createConnection({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'',
    database:'test'  //使用的数据库
});
//1.2执行连接
connection.connect();
//执行SQL语句
connection.query('SELECT * FROM person',(err,result)=>{
    if(err) throw err;
    console.log(result);
});
//关闭连接

```

 (2)使用连接池

```JS
 var pool=mysql.createPool({ }); 
创建连接池对象，传递mysql服务器的IP地址/域名,端口,用户名,密码,使用的数据库,设置连接池的大小(connectionLimit) pool.query(sql,callback)  sql执行的SQL语句，callback回调函数，获取SQL语句的执行结果。
```

```JS
const mysql=require('mysql');
//2.使用连接池
//创建连接池对象
var pool=mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'root',
    database:'xz',
    connectionLimit:20  //设置连接池的数量
});
//执行SQL语句

// pool.query('SELECT * FROM emp WHERE eid=2',(err,result)=>{
//   if(err) throw err;
//   console.log(result);
// });

//插入数据
// pool.query(`INSERT INTO emp VALUES(NULL,'apache',1,'1999-7-1',8800,30)`,(err,result)=>{
//   if(err) throw err;
//   console.log(result);
// })

//使用占位符的形式设置SQL语句中的值
//可以防止SQL注入
// pool.query(`INSERT INTO emp VALUES(?,?,?,?,?,?)`,[null,'java',0,'1998-3-2',5400,10],(err,result)=>{
//   if(err) throw err;
//   console.log(result);
// });;
// var emp={
//   eid:null,
//   ename:'html',
//   sex:1,
//   birthday:'1995-12-25',
//   salary:6100,
//   deptId:30
// };
//直接使用对象的方式插入数据
// pool.query('INSERT INTO emp SET ?',[emp],(err,result)=>{
//   if(err) throw err;
//   console.log(result);
// });

// pool.query('UPDATE emp SET birthday=?,salary=? WHERE eid=?',['2000-1-1','7500',19],(err,result)=>{
//   if(err) throw err;
//   //console.log(result);
//   //判断是否更改成功
//   if(result.affectedRows>0){
//     console.log('修改成功');
//   }else{
//     console.log('修改失败');
//   }
// });


pool.query('DELETE FROM shop WHERE shopid=?',[4],(err,result)=>{
    if(err) throw err;
    if(result.affectedRows>0){
        console.log('删除成功');
    }else{
        console.log('删除失败');
    }
})
```

