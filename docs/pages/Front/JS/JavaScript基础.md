## 数据类型的分类和判断

* 基本(值)类型
  * Number ----- 任意数值 -------- typeof
  * String ----- 任意字符串 ------ typeof
  * Boolean ---- true/false ----- typeof
  * undefined --- undefined ----- typeof   ===
  * null -------- null ---------- ===
* 对象(引用)类型
  * Object ----- typeof/instanceof
  * Array ------ instanceof
  * Function ---- typeof

2. 判断

  * typeof:

    * 可以区别: 数值, 字符串, 布尔值, undefined, function
    * 不能区别: null与对象, 一般对象与数组

  * instanceof

    * 专门用来判断对象数据的类型: Object, Array与Function

  * ===

    * 可以判断: undefined和null

    typeof 的结果是小写字母的字符串

## 数据,变量, 内存的理解

* 什么是数据?

  * 在内存中可读的, 可传递的保存了特定信息的'东东'
  * 一切皆数据, 函数也是数据
  * 在内存中的所有操作的目标: 数据

* 什么是变量?

  * 在程序运行过程中它的值是允许改变的量
  * 一个变量对应一块小内存, 它的值保存在此内存中  

* 什么是内存?

  * 内存条通电后产生的存储空间(临时的)
  * 一块内存包含2个方面的数据
    * 内部存储的数据
    * 地址值数据
  * 内存空间的分类
    * 栈空间: 全局变量和局部变量
    * 堆空间: 对象 

* 内存,数据, 变量三者之间的关系

  * 内存是容器, 用来存储不同数据
  * 变量是内存的标识, 通过变量我们可以操作(读/写)内存中的数据  

  ```js
  // 2个引用变量指向同一个对象, 通过一个引用变量修改对象内部数据, 另一个引用变量也看得见
  var obj1 = {}
  var obj2 = obj1
  obj2.name = 'Tom'
  console.log(obj1.name)
  function f1(obj) {
    obj.age = 12
  }
  f1(obj2)
  console.log(obj1.age)
  
  // 2个引用变量指向同一个对象,让一个引用变量指向另一个对象, 另一个引用变量还是指向原来的对象
  var obj3 = {name: 'Tom'}
  var obj4 = obj3
  obj3 = {name: 'JACK'}
  console.log(obj4.name)
  function f2(obj) {
    obj = {name: 'Bob'}
  }
  f2(obj4)
  console.log(obj4.name)
  
  ```

  在js调用函数时传递变量参数时, 是值传递还是引用传递

  * 只有值传递, 没有引用传递, 传递的都是变量的值, 只是这个值可能是基本数据, 也可能是地址(引用)数据
  * 如果后一种看成是引用传递, 那就值传递和引用传递都可以有

```js
function f(a) {
    console.log(a)
  }
  var n = 4
  f(n) //传递的是n的值 --->值传递

  function f2(a) {
    a.name = 'zhangsan'
  }
  n = {}
  f2(n) // 传递的是n指向的对象 ---> 引用传递   ???
  console.log(n.name)
```

JS引擎如何管理内存?

    1. 内存生命周期
    
    1). 分配需要的内存
    2). 使用分配到的内存
    3). 不需要时将其释放/归还
    
    2. 释放内存
    
    * 为执行函数分配的栈空间内存: 函数执行完自动释放
    * 存储对象的堆空间内存: 当内存没有引用指向时, 对象成为垃圾对象, 垃圾回收器后面就会回收释放此内存

```js
var obj = {}
  obj = null // ?

  function fn () {
    var a = 3
    var b = {}
  }
  fn()
```

## 对象的理解和使用

* 什么是对象?

  * 多个数据(属性)的集合
  * 用来保存多个数据(属性)的容器

* 属性组成:

  * 属性名 : 字符串(标识)
  * 属性值 : 任意类型

* 属性的分类:

  * 一般 : 属性值不是function  描述对象的状态
  * 方法 : 属性值为function的属性  描述对象的行为

* 特别的对象

  * 数组: 属性名是0,1,2,3之类的索引
  * 函数: 可以执行的

* 如何操作内部属性(方法)

  * .属性名

  * ['属性名']: 属性名有特殊字符/属性名是一个变量

  ```js
  // 创建对象
  var p = {
    name: 'Tom',
    age: 12,
    setName: function (name) {
      this.name = name
    },
    setAge: function (age) {
      this.age = age
    }
  }
  
  // 访问对象内部数据
  console.log(p.name, p['age'])
  p.setName('Jack')
  p['age'](23)
  console.log(p['name'], p.age)
  ```

  什么时候必须使用['属性名']的方式?

  * 属性名不是合法的标识名
  * 属性名不确定

```js
// 创建对象
  var p = {}

/*一: 属性名不是合法的标识名*/
  /*需求: 添加一个属性: content-type: text/json */
  //  p.content-type = 'text/json' //不正确
  p['content-type'] = 'text/json'

/*二: 属性名不确定*/
  var prop = 'xxx'
  var value = 123
  // p.prop = value  //不正确
  p[prop] = value
  console.log(p['content-type'], p[prop])
```

## 函数的理解和使用

* 什么是函数?

  * 用来实现特定功能的, n条语句的封装体
  * 只有函数类型的数据是可以执行的, 其它的都不可以

* 为什么要用函数?

  * 提高复用性
  * 便于阅读交流

* 函数也是对象

  * `instanceof Object===true`
  * 函数有属性: `prototype`
  * 函数有方法: `call()/apply()`
  * 可以添加新的属性/方法

* 函数的3种不同角色

  * 一般函数 : 直接调用
  * 构造函数 : 通过new调用
  * 对象 : 通过`.`调用内部的属性/方法

* 函数中的this

  * 显式指定谁: `obj.xxx()`

  * 通过call/apply指定谁调用: `xxx.call(obj)`

  * 不指定谁调用: xxx()  : `window`

  * 回调函数: 看背后是通过谁来调用的: window/其它

    

    如何确定this的值?

  * test()

  * obj.test()

  * new test()

  * test.call(obj)

```js
 function Person(color) {
    console.log(this)
    this.color = color;
    this.getColor = function () {
      console.log(this)
      return this.color;
    };
    this.setColor = function (color) {
      console.log(this)
      this.color = color;
    };
  }

  Person("red"); //this是谁?

  var p = new Person("yello"); //this是谁?

  p.getColor(); //this是谁?

  var obj = {};
  p.setColor.call(obj, "black"); //this是谁?

  var test = p.setColor;
  test(); //this是谁?

  function fun1() {
    function fun2() {
      console.log(this);
    }

    fun2(); //this是谁?
  }
  fun1();
```

  ```js
  function showInfo (age) {
    if(age<18) {
      console.log('未成年, 再等等!')
    } else if(age>60) {
      console.log('算了吧!')
    } else {
      console.log('刚好!')
    }
  }
  //调用
  showInfo(17)
  showInfo(22)

  /*
   函数也是对象
   */
  function fn() {

  }
  console.log(fn instanceof Object) // 是Object类型的实例
  console.log(fn.prototype) // 内部有属性
  console.log(fn.call) // 内部有方法
  fn.t1 = 'zhangsan' // 可以添加属性
  fn.t2 = function () { // 可以添加方法
    console.log('t2() '+this.t1)
  }
  fn.t2()
  ```

* 匿名函数自调用:

  ```
  (function(w, obj){
    //实现代码
  })(window, obj)
  ```

  * 专业术语为: IIFE (Immediately Invoked Function Expression) 立即调用函数表达式	

* 隐藏内部实现

  * 不污染外部命名空间	

  ```js
  (function (i) {
    var a = 4
    function fn() {
      console.log('fn ', i+a)
    }
    fn()
  })(3)
  ```

* 回调函数的理解

  * 什么函数才是回调函数?
    * 你定义的
    * 你没有调用
    * 但它最终执行了(在一定条件下或某个时刻)
  * 常用的回调函数
    * dom事件回调函数
    * 定时器回调函数
    * ajax请求回调函数(后面讲解)
    * 生命周期回调函数(后面讲解)

  ```js
  //1. DOM事件函数
  var btn = document.getElementById('btn')
  btn.onclick = function () {
    alert(this.innerHTML)
  }
  
  //2. 定时器函数
  setInterval(function () {
    alert('到点啦!')
  }, 2000)
  ```

##### 原型和原型链

 所有函数都有一个特别的属性: `prototype` : 显式原型属性

 所有实例对象都有一个特别的属性: `__proto__` : 隐式原型属性

原型对象中有一个属性constructor, 它指向函数对象

```js
console.log(Date.prototype, typeof Date.prototype)
// {constructor: ƒ, toString: ƒ, toDateString: ƒ, toTimeString: ƒ, toISOString: ƒ, …} 'object'
function fn() {

}
console.log(fn.prototype, typeof fn.prototype) // {constructor: ƒ} 'object'

// 原型对象中有一个属性constructor, 它指向函数对象
console.log(Date.prototype.constructor===Date)  // true
console.log(fn.prototype.constructor===fn)   // true
```

给原型对象添加属性；

```js
function F() {}
F.prototype.age = 12 //添加属性
F.prototype.setAge = function (age) { // 添加方法
    this.age = age
}
// 创建函数的实例对象
var f = new F()
console.log(f.age) // 12
f.setAge(23)
console.log(f.age) // 23
```

 显式原型与隐式原型的关系

  函数的prototype: 定义函数时被自动赋值, 值默认为{}, 即用为原型对象

  实例对象的`__proto__`: 在创建实例对象时被自动添加, 并赋值为构造函数的prototype值

  原型对象即为当前实例对象的父对象

```js
function Fn() {
}
var fn = new Fn()
console.log(Fn.prototype, fn.__proto__)  // {constructor: ƒ} {constructor: ƒ}
console.log(Fn.prototype===fn.__proto__)  // true

Fn.prototype.test = function () {
    console.log('test()')  // test()
}
fn.test()



```

 原型链

  所有的实例对象都有`__proto__`属性, 它指向的就是原型对象

  这样通过`__proto__`属性就形成了一个链的结构---->原型链

  当查找对象内部的属性/方法时, js引擎自动沿着这个原型链查找

  当给对象属性赋值时不会使用原型链, 而只是在当前对象中进行操作

访问一个对象的属性时，

1. 先在自身属性中查找，找到返回
2. 如果没有, 再沿着`__proto__`这条链向上查找, 找到返回
3. 如果最终没找到, 返回undefined

```js
function Fn() {
    this.test1 = function () {
        console.log('test1()')  // test1()
    }
}
Fn.prototype.test2 = function () {
    console.log('test2()')  // test2()
}
var fn = new Fn()

fn.test1()
fn.test2()
console.log(fn.toString())  // [object Object]

fn.test3()  // Uncaught TypeError: fn.test3 is not a function
```

1. 读取对象的属性值时: 会自动到原型链中查找

2. 设置对象的属性值时: 不会查找原型链, 如果当前对象中没有此属性, 直接添加此属性并设置其值

3. 方法一般定义在原型中, 属性一般通过构造函数定义在对象本身上

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.setName = function (name) {
    this.name = name;
}
Person.prototype.sex = '男';

var p1 = new Person('Tom', 12)
p1.setName('Jack')
console.log(p1.name, p1.age, p1.sex)  // Jack 12 男
p1.sex = '女'
console.log(p1.name, p1.age, p1.sex)  // Jack 12 女

var p2 = new Person('Bob', 23)  
console.log(p2.name, p2.age, p2.sex) // Bob 23 男
```

如果prototype属性上有属性，在对象上定义相同名字的属性；此时会发生生命；

会显示这个对象上最近定义的属性

不同的实例对象去修改同一个属性；最后以自己属性上的为准；其他修改了无用



instanceof是如何判断的?

表达式: A instanceof B

如果B函数的显式原型对象在A对象的原型链上, 返回true, 否则返回false

Function是通过new自己产生的实例

```js
function Foo() {  }
var f1 = new Foo();
console.log(f1 instanceof Foo);  // true
console.log(f1 instanceof Object);  // true

//案例2
console.log(Object instanceof Function)   // true
console.log(Object instanceof Object) // true
console.log(Function instanceof Object) // true
console.log(Function instanceof Function) // true
function Foo() {}
console.log(Object instanceof  Foo);   // false
```

测试

```js
 var A = function() {

  }
  A.prototype.n = 1

  var b = new A()

  A.prototype = {
    n: 2,
    m: 3
  }

  var c = new A()
  console.log(b.n, b.m, c.n, c.m)  // 1 undefined 2 3
```

```js
var F = function(){};
Object.prototype.a = function(){
    console.log('a()')
};
Function.prototype.b = function(){
    console.log('b()')
};
var f = new F();
f.a() // a()
f.b()  //Uncaught TypeError: f.b is not a function
F.a() // a()
F.b() // b()
```

原型链继承

方式1: 原型链继承

1. 套路

1. 定义父类型构造函数

2. 给父类型的原型添加方法

3. 定义子类型的构造函数

4. 创建父类型的对象赋值给子类型的原型

5. 将子类型原型的构造属性设置为子类型

6. 给子类型原型添加方法

7. 创建子类型的对象: 可以调用父类型的方法

2. 关键

1. 子类型的原型为父类型的一个实例对象

```js
//父类型
function Supper() {
    this.supProp = 'Supper property'
}
Supper.prototype.showSupperProp = function () {
    console.log(this.supProp)
}

//子类型
function Sub() {
    this.subProp = 'Sub property'
}

// 子类型的原型为父类型的一个实例对象
Sub.prototype = new Supper()
// 让子类型的原型的constructor指向子类型
Sub.prototype.constructor = Sub
Sub.prototype.showSubProp = function () {
    console.log(this.subProp)
}

var sup = new Supper();
console.log(sup);
var sub = new Sub()
sub.showSupperProp()
// sub.toString()
sub.showSubProp()

console.log(sub)  // Sub


```

方式2: 借用构造函数继承(假的)

1. 套路:

1. 定义父类型构造函数

2. 定义子类型构造函数

3. 在子类型构造函数中调用父类型构造

2. 关键:

1. 在子类型构造函数中通用call()调用父类型构造函数

```js
function Person(name, age) {
    this.name = name
    this.age = age
}
function Student(name, age, price) {
    Person.call(this, name, age)  // 相当于: this.Person(name, age)
    /*this.name = name
    this.age = age*/
    this.price = price
}

var s = new Student('Tom', 20, 14000)
console.log(s);
console.log(s.name, s.age, s.price)
```

方式3: 原型链+借用构造函数的组合继承

1. 利用原型链实现对父类型对象的方法继承

2. 利用super()借用父类型构建函数初始化相同属性

```js
function Person(name, age) {
    this.name = name
    this.age = age
}
Person.prototype.setName = function (name) {
    this.name = name
}

function Student(name, age, price) {
    Person.call(this, name, age)  // 为了得到属性
    this.price = price
}
Student.prototype = new Person() // 为了能看到父类型的方法
Student.prototype.constructor = Student //修正constructor属性
Student.prototype.setPrice = function (price) {
    this.price = price
}

var s = new Student('Tom', 24, 15000)
console.log(s);
s.setName('Bob')
s.setPrice(16000)
console.log(s.name, s.age, s.price)
```



## 执行上下文与执行上下文栈

 变量提升与函数提升

  变量提升: 在变量定义语句之前, 就可以访问到这个变量(undefined)

  函数提升: 在函数定义语句之前, 就执行该函数

  先有变量提升, 再有函数提升

```js
// 输出什么?

var a = 4
function fn () {
    console.log(a)  // undefined
    var a = 5
    }
fn()
/*变量提升*/
console.log(a1) //可以访问, 但值是undefined
/*函数提升*/
a2() // 可以直接调用

var a1 = 3
function a2() {
    console.log('a2()')  // a2
}
```



 理解

  执行上下文: 由js引擎自动创建的对象, 包含对应作用域中的所有变量属性

  执行上下文栈: 用来管理产生的多个执行上下文

 分类:

  全局: window

  函数: 对程序员来说是透明的

 生命周期

  全局 : 准备执行全局代码前产生, 当页面刷新/关闭页面时死亡

  函数 : 调用函数时产生, 函数执行完时死亡

 包含哪些属性:

  全局 : 

   用var定义的全局变量  ==>undefined

   使用function声明的函数  ===>function

   this  ===>window

  函数

   用var定义的局部变量  ==>undefined

   使用function声明的函数  ===>function

   this  ===> 调用函数的对象, 如果没有指定就是window 

   形参变量  ===> 对应实参值

   arguments ===>实参列表的伪数组

 执行上下文创建和初始化的过程

  全局:

   在全局代码执行前最先创建一个全局执行上下文(window)

   收集一些全局变量, 并初始化

   将这些变量设置为window的属性

  函数:

   在调用函数时, 在执行函数体之前先创建一个函数执行上下文

   收集一些局部变量, 并初始化

   将这些变量设置为执行上下文的属性

```js
 console.log(a1)  // undefined
  console.log(a2)   // function a2() {}
  console.log(a3)   // function a3() {}
  console.log(this)  // window

  var a1 = 3
  var a2 = function () {
    console.log('a2()')
  }
  function a3() {
    console.log('a3()')
  }
  a4 = 4

  function fn(x, y) {
    console.log(x, y)   // undefined undefined
    console.log(b1)   // undefined
    console.log(b2)   // function b2 (){}
    console.log(arguments)  // Argument length: 0
    console.log(this)   // window
    var b1 = 5
    function b2 () {
    }
    b3 = 6
  }
  fn() 
```

1. 在全局代码执行前, JS引擎就会创建一个栈来存储管理所有的执行上下文对象

2. 在全局执行上下文(window)确定后, 将其添加到栈中(压栈)

3. 在函数执行上下文创建后, 将其添加到栈中(压栈)

4. 在当前函数执行完后,将栈顶的对象移除(出栈)

5. 当所有的代码执行完后, 栈中只剩下window

```js
var a = 10
var bar = function (x) {
    var b = 5
    foo(x + b)              //3. 进入foo执行上下文
}
var foo = function (y) {
    var c = 5
    console.log(a + c + y)   // 30
}
bar(10)                    //2. 进入bar函数执行上下文
```

依次输出什么?

整个过程中产生了几个执行上下文?

```js
console.log('global begin: '+ i)
  var i = 1
  foo(1);
  function foo(i) {
    if (i == 4) {
      return;
    }
    console.log('foo() begin:' + i);
    foo(i + 1);
    console.log('foo() end:' + i);
  }
  console.log('global end: ' + i)
/* 
global begin: undefined
foo() begin:1
foo() begin:2
foo() begin:3
foo() end:3
foo() end:2
foo() end:1
global end: 1
*/
```

测试

```js
// 先预处理变量, 后预处理函数
function a() {}
var a;
console.log(typeof a)  // function

```

```js
// 变量预处理, in操作符  
if (!(b in window)) {
    var b = 1;
  }
  console.log(b)
```



```js
// 预处理, 顺序执行
var c = 1
  function c(c) {
    console.log(c)
    var c = 3
  }
console.log(c) // undefined
```



## 作用域与作用域链

  作用域: 一块代码区域, 在编码时就确定了, 不会再变化

  作用域链: 多个嵌套的作用域形成的由内向外的结构, 用于查找变量

 分类: 全局、  函数；  js没有块作用域(在ES6之前)

```js
var a = 10,
      b = 20
  function fn(x) {
    var a = 100,
        c = 300;
    console.log('fn()', a, b, c, x)  // fn() 100 20 300 10
    function bar(x) {
      var a = 1000,
          d = 400
      console.log('bar()', a, b, c, d, x)   // 第一次  bar() 1000 20 300 400 100  第二次  bar() 1000 20 300 400 200
    } 

    bar(100)
    bar(200)
  }
  fn(10)
```



 作用

  作用域: 隔离变量, 可以在不同作用域定义同名的变量不冲突

  作用域链: 查找变量

 区别作用域与执行上下文

  作用域: 静态的, 编码时就确定了(不是在运行时), 一旦确定就不会变化了

  执行上下文: 动态的, 执行代码时动态创建, 当执行结束消失

  联系: 执行上下文环境是在对应的作用域中的

 全局上下文环境==>全局作用域

函数上下文环境==>对应的函数使用域

```js
//   1. 有几个作用域?  2. 产生过几个上下文环境对象?

var a = 10,
    b = 20
function fn(x) {
    var a = 100,
        c = 300;
    console.log('fn()', a, b, c, x)
    function bar(x) {
        var a = 1000,
            d = 400
        console.log('bar()', a, b, c, d, x)
    }

    bar(100)
    bar(200)
}
fn(10)
```

1. 理解

 \* 多个上下级关系的作用域形成的链, 它的方向是从下向上的(从内到外)

 \* 查找变量时就是沿着作用域链来查找的

2. 查找一个变量的查找规则

 \* 在当前作用域下的执行上下文中查找对应的属性, 如果有直接返回, 否则进入2

 \* 在上一级作用域的执行上下文中查找对应的属性, 如果有直接返回, 否则进入3

 \* 再次执行2的相同操作, 直到全局作用域, 如果还找不到就抛出找不到的异常

```js
var a = 2;
function fn1() {
    var b = 3;
    function fn2() {
        var c = 4;
        console.log(c);   // 4
        console.log(b);  // 3
        console.log(a);   // 2
        console.log(d);  // Uncaught ReferenceError: d is not defined
    }

    fn2();
}
fn1();
```

```js
var x = 10;
  function fn() {
    console.log(x);   // 10
  }
  function show(f) {
    var x = 20;
    f();
  }
  show(fn);
```

```js
var fn = function () {
    console.log(fn)  
    // ƒ () { console.log(fn) }
}
fn()

var obj = {
    fn2: function () {
        console.log(fn2)   // Uncaught ReferenceError: fn2 is not defined
    }
}
obj.fn2()
```



## 闭包

 理解:

  当嵌套的内部函数引用了外部函数的变量时就产生了闭包

  通过chrome工具得知: 闭包本质是内部函数中的一个对象, 这个对象中包含引用的变量属性

 作用:

  延长局部变量的生命周期

  让函数外部能操作内部的局部变量

产生条件

函数嵌套

内部函数引用了外部函数的数据(变量/函数)

 写一个闭包程序

 ```js
function fn1() {
    var a = 2;
    function fn2() {
        a++;
        console.log(a);
    }
    return fn2;
}
var f = fn1();
f();
f();
 ```

```html

<button>测试1</button>
<button>测试2</button>
<button>测试3</button>
```

```js
var btns = document.getElementsByTagName('button')
//利用闭包
for (var i = 0,length=btns.length; i < length; i++) {
    (function (j) {
        var btn = btns[j]
        btn.onclick = function () {
            alert('第'+(j+1)+'个')
        }
    })(i)
}
```

常见的闭包

```js
// 1. 将函数作为另一个函数的返回值
function fn1() {
    var a = 2
    function fn2() {
        a++
        console.log(a)
    }
    return fn2
}
var f = fn1()
f() // 3
f() // 4

// 2. 将函数作为实参传递给另一个函数调用
function showDelay(msg, time) {
    setTimeout(function () {
        alert(msg)
    }, time)
}
showDelay('zhangsan', 2000)

```

 闭包应用

```js
// 1. 将函数作为另一个函数的返回值
function fn1() {
    var a = 2
    function fn2() {
        a++
        console.log(a)
    }
    return fn2
}
var f = fn1()
f() // 3
f() // 4

// 2. 将函数作为实参传递给另一个函数调用
function showDelay(msg, time) {
    setTimeout(function () {
        alert(msg)
    }, time)
}
showDelay('atguigu', 2000)
```

1. 使用函数内部的变量在函数执行完后, 仍然存活在内存中(延长了局部变量的生命周期)

2. 让函数外部可以操作(读写)到函数内部的数据(变量/函数)

问题:

1. 函数执行完后, 函数内部声明的局部变量是否还存在?  一般是不存在, 存在于闭中的变量才可能存在

2. 在函数外部能直接访问函数内部的局部变量吗? 不能, 但我们可以通过闭包让外部操作它

```js
 function fn1() {
  var a = 2
  function fn2() {
   a++
   console.log(a)
   // return a
  }
  function fn3() {
   a--
   console.log(a)
  }
  return fn3
 }
 var f = fn1()
 f() // 1
 f() // 0
```

```js
function fn1() {
    //此时闭包就已经产生了(函数提升, 内部函数对象已经创建了)
    var a = 2
    function fn2 () {
        a++
        console.log(a)
    }
    return fn2
}
var f = fn1()
f() // 3
f() // 4
f = null //闭包死亡(包含闭包的函数对象成为垃圾对象)
```

闭包的应用2 : 定义JS模块

 \* 具有特定功能的js文件

 \* 将所有的数据和功能都封装在一个函数内部(私有的)

 \* 只向外暴露一个包信n个方法的对象或函数

 \* 模块的使用者, 只需要通过模块暴露的对象调用方法来实现对应的功能

```js
<script type="text/javascript" src="myModule.js"></script>
<script type="text/javascript">
  var module = myModule()
  module.doSomething()
  module.doOtherthing()
</script>
```

myModule.js

```js
function myModule() {
    //私有数据
    var msg = 'My atguigu'
    //操作数据的函数
    function doSomething() {
        console.log('doSomething() '+msg.toUpperCase())
    }
    function doOtherthing () {
        console.log('doOtherthing() '+msg.toLowerCase())
    }

    //向外暴露对象(给外部使用的方法)
    return {
        doSomething: doSomething,
        doOtherthing: doOtherthing
    }
}

```

闭包的应用2 : 定义JS模块

 \* 具有特定功能的js文件

 \* 将所有的数据和功能都封装在一个函数内部(私有的)

 \* 只向外暴露一个包信n个方法的对象或函数

 \* 模块的使用者, 只需要通过模块暴露的对象调用方法来实现对应的功能

```js
<script type="text/javascript" src="myModule2.js"></script>
<script type="text/javascript">
  myModule2.doSomething()
  myModule2.doOtherthing()
</script>
```

myModule2.js

```js
(function () {
    //私有数据
    var msg = 'My atguigu'
    //操作数据的函数
    function doSomething() {
        console.log('doSomething() '+msg.toUpperCase())
    }
    function doOtherthing () {
        console.log('doOtherthing() '+msg.toLowerCase())
    }

    //向外暴露对象(给外部使用的方法)
    window.myModule2 = {
        doSomething: doSomething,
        doOtherthing: doOtherthing
    }
})()
```

1. 缺点
  * 函数执行完后, 函数内的局部变量没有释放, 占用内存时间会变长
  * 容易造成内存泄露
2. 解决
  * 能不用闭包就不用
  * 及时释放

```js

  function fn1() {
    var arr = new Array[100000]
    function fn2() {
      console.log(arr.length)
    }
    return fn2
  }
  var f = fn1()
  f()

  f = null //让内部函数成为垃圾对象-->回收闭包
```



测试

```js
//代码片段一
var name = "The Window";
var object = {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};
alert(object.getNameFunc()());  //?  the window


//代码片段二
var name2 = "The Window";
var object2 = {
    name2 : "My Object",
    getNameFunc : function(){
        var that = this;
        return function(){
            return that.name2;
        };
    }
};
alert(object2.getNameFunc()()); //?  my object


```

```js
function fun(n,o) {
    console.log(o)
    return {
        fun:function(m){
            return fun(m,n)
        }
    }
}
var a = fun(0)
a.fun(1)
a.fun(2)
a.fun(3)//undefined,0,0,0

var b = fun(0).fun(1).fun(2).fun(3)//undefined,0,1,2

var c = fun(0).fun(1)
c.fun(2)
c.fun(3)//undefined,0,1,1
```

对象创建模式

方式一: Object构造函数模式

 \* 套路: 先创建空Object对象, 再动态添加属性/方法

 \* 适用场景: 起始时不确定对象内部数据

 \* 问题: 语句太多

  ```js

  // 一个人: name:"Tom", age: 12
  // 先创建空Object对象
  var p = new Object()
  p = {} //此时内部数据是不确定的
  // 再动态添加属性/方法
  p.name = 'Tom'
  p.age = 12
  p.setName = function (name) {
    this.name = name
  }

  //测试
  console.log(p.name, p.age)
  p.setName('Bob')
  console.log(p.name, p.age)
  ```

方式二: 对象字面量模式

 \* 套路: 使用{}创建对象, 同时指定属性/方法

 \* 适用场景: 起始时对象内部数据是确定的

 \* 问题: 如果创建多个对象, 有重复代码

```js
var p = {
    name: 'Tom',
    age: 12,
    setName: function (name) {
        this.name = name
    }
}

//测试
console.log(p.name, p.age)
p.setName('JACK')
console.log(p.name, p.age)

var p2 = {  //如果创建多个对象代码很重复
    name: 'Bob',
    age: 13,
    setName: function (name) {
        this.name = name
    }
}
```

方式三: 工厂模式

套路: 通过工厂函数动态创建对象并返回

适用场景: 需要创建多个对象

问题: 对象没有一个具体的类型, 都是Object类型

```js
function createPerson(name, age) { //返回一个对象的函数===>工厂函数
    var obj = {
        name: name,
        age: age,
        setName: function (name) {
            this.name = name
        }
    }

    return obj
}


// 创建2个人
var p1 = createPerson('Tom', 12)
var p2 = createPerson('Bob', 13)
console.log(p1);
// p1/p2是Object类型

function createStudent(name, price) {
    var obj = {
        name: name,
        price: price
    }
    return obj
}
var s = createStudent('张三', 12000)
// s也是Object
```

方式四: 自定义构造函数模式

套路: 自定义构造函数, 通过new创建对象

适用场景: 需要创建多个类型确定的对象

问题: 每个对象都有相同的数据, 浪费内存

```js
//定义类型
function Person(name, age) {
    this.name = name
    this.age = age
    this.setName = function (name) {
        this.name = name
    }
}
var p1 = new Person('Tom', 12)
p1.setName('Jack')
console.log(p1.name, p1.age)
console.log(p1 instanceof Person)

function Student (name, price) {
    this.name = name
    this.price = price
}
var s = new Student('Bob', 13000)
console.log(s instanceof Student)

var p2 = new Person('JACK', 23)
console.log(p1, p2)

```

方式六: 构造函数+原型的组合模式

套路: 自定义构造函数, 属性在函数中初始化, 方法添加到原型上

适用场景: 需要创建多个类型确定的对象

```js
function Person(name, age) { //在构造函数中只初始化一般函数
    this.name = name
    this.age = age
}
Person.prototype.setName = function (name) {
    this.name = name
}

var p1 = new Person('Tom', 23)
var p2 = new Person('Jack', 24)
console.log(p1, p2)

```

线程机制与事件机制

```
1. 进程：程序的一次执行, 它占有一片独有的内存空间
2. 线程： CPU的基本调度单位, 是程序执行的一个完整流程
3. 进程与线程
   一个进程中一般至少有一个运行的线程: 主线程
   一个进程中也可以同时运行多个线程, 我们会说程序是多线程运行的
   一个进程内的数据可以供其中的多个线程直接共享
   多个进程之间的数据是不能直接共享的
4. 浏览器运行是单进程还是多进程?
   有的是单进程
     firefox
     老版IE
   有的是多进程
     chrome
     新版IE
5. 如何查看浏览器是否是多进程运行的呢?
   任务管理器==>进程
6. 浏览器运行是单线程还是多线程?
   都是多线程运行的
```

```
1. 什么是浏览器内核?
   支持浏览器运行的最核心的程序
2. 不同的浏览器可能不太一样
   Chrome, Safari: webkit
   firefox: Gecko
   IE: Trident
   360,搜狗等国内浏览器: Trident + webkit
3. 内核由很多模块组成
   html,css文档解析模块 : 负责页面文本的解析
   dom/css模块 : 负责dom/css在内存中的相关处理
   布局和渲染模块 : 负责页面的布局和效果的绘制
   布局和渲染模块 : 负责页面的布局和效果的绘制

   定时器模块 : 负责定时器的管理
   网络请求模块 : 负责服务器请求(常规/Ajax)
   事件响应模块 : 负责事件的管理
```
## 线程与进程
 进程:
   程序的一次执行, 它占有一片独有的内存空间
   可以通过windows任务管理器查看进程
 线程:
   是进程内的一个独立执行单元
   是程序执行的一个完整流程
   是CPU的最小的调度单元
 关系
   一个进程至少有一个线程(主)
   程序是在某个进程中的某个线程执行的

## 浏览器内核模块组成
 主线程
   js引擎模块 : 负责js程序的编译与运行
   html,css文档解析模块 : 负责页面文本的解析
   DOM/CSS模块 : 负责dom/css在内存中的相关处理 
   布局和渲染模块 : 负责页面的布局和效果的绘制(内存中的对象)
 分线程
   定时器模块 : 负责定时器的管理
   DOM事件模块 : 负责事件的管理
   网络请求模块 : 负责Ajax请求

## js线程
 js是单线程执行的(回调函数也是在主线程)
 H5提出了实现多线程的方案: Web Workers
 只能是主线程更新界面

## 定时器问题:
 定时器并不真正完全定时
 如果在主线程执行了一个长时间的操作, 可能导致延时才处理
    
## 事件处理机制(图)
 代码分类
   初始化执行代码: 包含绑定dom事件监听, 设置定时器, 发送ajax请求的代码
   回调执行代码: 处理回调逻辑
 js引擎执行代码的基本流程: 
   初始化代码===>回调代码
 模型的2个重要组成部分:
   事件管理模块
   回调队列
 模型的运转流程
   执行初始化代码, 将事件回调函数交给对应模块管理
   当事件发生时, 管理模块会将回调函数及其数据添加到回调列队中
   只有当初始化代码执行完后(可能要一定时间), 才会遍历读取回调队列中的回调函数执行
    
## H5 Web Workers
 可以让js在分线程执行
 Worker
  ```
  var worker = new Worker('worker.js');
  worker.onMessage = function(event){event.data} : 用来接收另一个线程发送过来的数据的回调
  worker.postMessage(data1) : 向另一个线程发送数据
  ```
 问题:
   worker内代码不能操作DOM更新UI
   不是每个浏览器都支持这个新特性
   不能跨域加载JS

 svn版本控制
 svn server
1. 定时器真是定时执行的吗?

  定时器并不能保证真正定时执行

  一般会延迟一丁点(可以接受), 也有可能延迟很长时间(不能接受)

2. 定时器回调函数是在分线程执行的吗?

  在主线程执行的, js是单线程的

```js

document.getElementById('btn').onclick = function () {
    var start = Date.now()
    console.log('启动定时器前...')
    setTimeout(function () {
        console.log('定时器执行了', Date.now()-start)
    }, 200)
    console.log('启动定时器后...')

    // 做一个长时间的工作
    for (var i = 0; i < 1000000000; i++) {

    }
}
```

```
1. 如何证明js执行是单线程的?
   setTimeout()的回调函数是在主线程执行的
   定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行
2. 为什么js要用单线程模式, 而不用多线程模式?
   JavaScript的单线程，与它的用途有关。
   作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。
   这决定了它只能是单线程，否则会带来很复杂的同步问题

3. 代码的分类:
   初始化代码
   回调代码
4. js引擎执行代码的基本流程
   先执行初始化代码: 包含一些特别的代码   回调函数(异步执行)
     设置定时器
     绑定事件监听
     发送ajax请求
   后面在某个时刻才会执行回调代码
```

```js
setTimeout(function () {
    console.log('timeout 2222')
    alert('22222222')
}, 2000)
setTimeout(function () {
    console.log('timeout 1111')
    alert('1111111')
}, 1000)
setTimeout(function () {
    console.log('timeout() 00000')
}, 0)
function fn() {
    console.log('fn()')
}
fn()

console.log('alert()之前')
alert('------') //暂停当前主线程的执行, 同时暂停计时, 点击确定后, 恢复程序执行和计时
console.log('alert()之后')
```

```
1. 所有代码分类
   初始化执行代码(同步代码): 包含绑定dom事件监听, 设置定时器, 发送ajax请求的代码
   回调执行代码(异步代码): 处理回调逻辑
2. js引擎执行代码的基本流程:
   初始化代码===>回调代码
3. 模型的2个重要组成部分:
   事件(定时器/DOM事件/Ajax)管理模块
   回调队列
4. 模型的运转流程
   执行初始化代码, 将事件回调函数交给对应模块管理
   当事件发生时, 管理模块会将回调函数及其数据添加到回调列队中
   只有当初始化代码执行完后(可能要一定时间), 才会遍历读取回调队列中的回调函数执行
```

```js
function fn1() {
    console.log('fn1()')
}
fn1()
document.getElementById('btn').onclick = function () {
    console.log('点击了btn')
}
setTimeout(function () {
    console.log('定时器执行了')
}, 2000)
function fn2() {
    console.log('fn2()')
}
fn2()
```

web works

```
1. H5规范提供了js分线程的实现, 取名为: Web Workers
2. 相关API
   Worker: 构造函数, 加载分线程执行的js文件
   Worker.prototype.onmessage: 用于接收另一个线程的回调函数
   Worker.prototype.postMessage: 向另一个线程发送消息
3. 不足
   worker内代码不能操作DOM(更新UI)
   不能跨域加载JS
   不是每个浏览器都支持这个新特性
```

```html
<input type="text" placeholder="数值" id="number">
<button id="btn">计算</button>
```



```js
 // 1 1 2 3 5 8    f(n) = f(n-1) + f(n-2)
  function fibonacci(n) {
    return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2)  //递归调用
  }
  // console.log(fibonacci(7))
  var input = document.getElementById('number')
  document.getElementById('btn').onclick = function () {
    var number = input.value
    var result = fibonacci(number)
    alert(result)
  }

```



测试2

```js
var input = document.getElementById('number')
document.getElementById('btn').onclick = function () {
    var number = input.value

    //创建一个Worker对象
    var worker = new Worker('worker.js')
    // 绑定接收消息的监听
    worker.onmessage = function (event) {
        console.log('主线程接收分线程返回的数据: '+event.data)
        alert(event.data)
    }

    // 向分线程发送消息
    worker.postMessage(number)
    console.log('主线程向分线程发送数据: '+number)
}
```

works.js

```js
function fibonacci(n) {
  return n<=2 ? 1 : fibonacci(n-1) + fibonacci(n-2)  //递归调用
}

console.log(this)
this.onmessage = function (event) {
  var number = event.data
  console.log('分线程接收到主线程发送的数据: '+number)
  //计算
  var result = fibonacci(number)
  postMessage(result)
  console.log('分线程向主线程返回数据: '+result)
  // alert(result)  alert是window的方法, 在分线程不能调用
  // 分线程中的全局对象不再是window, 所以在分线程中不可能更新界面
}
```





模块化: 封装一些数据以及操作数据的函数, 向外暴露一些行为

  循环遍历加监听

  JS框架(jQuery)大量使用了闭包

 缺点:

  变量占用内存的时间可能会过长

  可能导致内存泄露

  解决:

   及时释放 : f = null; //让内部函数对象成为垃圾对象

## 内存溢出与内存泄露

1. 内存溢出

  一种程序运行出现的错误

  当程序运行需要的内存超过了剩余的内存时, 就出抛出内存溢出的错误

2. 内存泄露

 占用的内存没有及时释放

 内存泄露积累多了就容易导致内存溢出

 常见的内存泄露:

 意外的全局变量

 没有及时清理的计时器或回调函数

闭包

  ```js
// 1. 内存溢出
  var obj = {}
  for (var i = 0; i < 10000; i++) {
    obj[i] = new Array(10000000)
    console.log('-----')
  }

  // 2. 内存泄露
    // 意外的全局变量
  function fn() {
    a = new Array(10000000)
    console.log(a)
  }
  fn()

   // 没有及时清理的计时器或回调函数
  var intervalId = setInterval(function () { //启动循环定时器后不清理
    console.log('----')
  }, 1000)

  // clearInterval(intervalId)

    // 闭包
  function fn1() {
    var a = 4
    function fn2() {
      console.log(++a)
    }
    return fn2
  }
  var f = fn1()
  f()
  ```

