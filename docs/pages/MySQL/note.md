

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

