# Node搭建后台服务器

使用express搭建简单的后台服务器

## 文件大致的框架

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




