## **json对象**

JSON(JavaScript Object Notation) 是一种轻量级的数据交换格式，我们称之为JavaScript对象表示法。使用JSON进行数据传输的优势之一。表示方法为键值对，key：value。

```json
var myjson={
    k1:v1,
    k2:v2,
    k3:v3
}
```

获取方式

```json
v1 == myjson.k1 
v2 == myjson.k2
```

Json一般就是被当做一个配置单用；

**两种结构写法**

 在JSON中，有两种结构：对象和数组

对象写法：

```json


var myjson={
	a:'数据1',
    b:'数据2',
    c:'数据3',
    d:null,
    f:1234,
    d:true,
    e:function(){
        return '我是json对象的结构'
    }
 }

 alert(myjson.c);

 alert(myjson.e)

 alert(myjson.e());


```

 在JSON中，有两种结构：对象和数组

数组写法

```json
var json = { 
    'total':3,
    'people':
    [
        {
            "username":"刘德华",
            "age":55,
            "address":"香港",
            "QQ":"123456789"
        }
    ]
}
```
**json值获取**

json名.属性

```json
var aaa = { 
    name: "栓柱儿",
    age:"23" 
}
aaa.name  == "栓柱儿"
aaa.age =="23"
```

**Json遍历**

1. 利用 for···in语句

for...in 语句用于遍历数组或者对象的属性（对数组或者对象的属性进行循环操作）。

即for in用来列举对象的显示成员（自定义成员）

```json
for (变量 in 对象){
  // code
}
```

**“变量”**用来指定变量，指定的变量可以是数组元素，也可以是对象的属性。

```json
for( var i in json){
    box.style[i] = json[i];
}
```