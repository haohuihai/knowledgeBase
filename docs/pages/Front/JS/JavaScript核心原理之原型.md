## 对象

在JS对象中，几乎所有的对象在创建时[[Prototype]]属性都会被赋予一个非空的值，对于下面的代码：

```js
var myObject = {
    a: 2
}
myObject.a  // 2
```

当你试图引用对象的属性时会触发[[Get]]操作，比如`myObject.a`。对于默认的[[Get]]操作来说，第一步是检查对象本身是否有这个属性，如果有的话就使用它。

如果a不在myObject中，就需要使用对象的[[Prototype]]链了

对于默认的[[Get]]操作来说，如果无法在对象本身找到需要的属性，就会继续访问对象的[[Prototype]]链：

```js
var anotherObject = {
	a: 2
}
// 创建一个关联到anotherObject的对象
var myObject = Object.create(anotherObject)
myObject.a  // 2
```

myObject对象的[[Prototype]]关联到了anotherObject。显然myObject.a并不存在，但是尽管如此，属性访问仍然成功地（在anotherObject中）找到了值2



如果anotherObject中也找不到a并且[[Prototype]]链不为空的话，就会继续查找下去。这个过程会持续到找到匹配的属性名或者查找完整条[[Prototype]]链。如果是后者的话，[[Get]]操作的返回值是undefined。

**使用for..in遍历对象时原理和查找[[Prototype]]链类似**，任何可以通过原型链访问到（并且是enumerable）的属性都会被枚举。使用in操作符来检查属性在对象中是否存在时，同样会查找对象的整条原型链（无论属性是否可枚举）

```js
var anotherObject = {
	a: 2
}
// 创建一个关联到anotherObject的对象
var myObject = Object.create(anotherObject)

for(var k in myObject) {
    console.log('found:' + k) // found: a
}

('a' in myObject) // true
```

**Object.prototype**

所有普通的[[Prototype]]链最终都会指向内置的Object.prototype。由于所有的“普通”（内置，不是特定主机的扩展）对象都“源于”（或者说把[[Prototype]]链的顶端设置为）这个Object.prototype对象，所以它包含JavaScript中许多通用的功能

### 一、创建对象的两种方式

**构造函数**

```javascript
var person = new Object();
console.log(person);
```
通过上面创建的对象打印出的结果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210130100307431.png)
在使用构造函数创建的时候，Object后面的括号可以省略，但不提倡；
这样通过new操作符后跟Object构造函数创建的对象就出来了；
此时给他一个name属性：

```javascript
person.name='zhangsan';
console.log(person);
```
得到的结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210130100808910.png)
**关于对象**
对象是一个无序的键值对组合的集合：
这里name 就是一个键，"zhangsan"就是一个这个name的值
（1）对于键：

 1. 能不能使用双引号需要看键是否关键字，符合不符合标识符规则
 2. 当键是关键字的时候，必须给键加引号
 3. 当键是数字的时候，会自动转换为字符串，此时可以不用加引号
 4. 当键开头含有特殊字符的时候，或者不符合标识符规则，此时必须得加双引号

（2）对于值：

 1. 它可以为任何数据类型

对于数据类型：
	①：基本类型：String、Number、Boolean、undefined、null
	②：引用数据：Object(Array，RegExp、Date、Math、Function)
也就是说，对象可以是上面的任何一种类型
如下代码：

```javascript
var person = new Object();
person.isString="String";
person.isArray=[1,2,3,4,'5'];
person.isBoolean=false;
person.isUndefined = undefined;
person.isNull = null;
person.isObject= new Object();
console.log(person);
```
结果如下图所示：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210130102326854.png)

**字面量：**

对于字面量而言：
直接使用`var person = {}`这样就可以创建出一个对象了
看看跟构造函数创建出的有什么不同：

```javascript
var person = new Object();
console.log(person);
var person1 = {};
console.log(person1);
```
打印结果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210130102626905.png)
对于使用对象字面量创建对象的键值集合跟使用构造函数创建的对象是一样的；

### 二、使用对象

给对象集合装东西；
设置属性（这里的属性就是前面提到的键）的时候可以使用`点表示法`，或者`方括号`表示法

```javascript
//点表示法
person.name='张三';
//方括号表示法
person["name"]="李四";
```
设置对象属性时一般使用点表示法，也可以使用方括号来设置，但使用方括号的时候，必须给属性`加引号`（以字符串的方式去设置）；
否则会当作变量来访问
例如：

```javascript
var foo = 'bar';

var obj = {
  foo: 1,
  bar: 2
};

obj.foo  // 1
obj[foo]  // 等同于 obj["bar"]
```
访问引用对象obj的foo属性时，如果使用点运算符，foo就是字符串；如果使用方括号运算符，但是不使用引号，那么foo就是一个变量，指向字符串bar。
方括号运算符内部还可以使用表达式。
```javascript
obj['hello' + ' world']
obj[3 + 3]
```
注意：如果使用方括号设置属性的时候，设置了不符合规范的字符串，这个时候访问的时候也必须使用方括号来访问，不能使用点表示法；
比如：

```javascript
var person = new Object();
person["frist name"]="张三";
// 访问的时候
// 假如使用点表示法这样访问
console.log(person.frist name);
// 或者这样访问
console.log(person."frist name");
//使用方括号访问
console.log(person["frist name"]);
```
结果从上到下分别是；
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210130110022299.png)
所以在设置属性的时候尽量使用点表示法设置，属性的命名也尽量符合规范来命名，访问的时候也尽量使用点号来访问
当属性为数字的时候，必须使用方括号来访问，否则会被当成小数点
给对象设置一个属性，并赋予某一个数据类型的值，就创建了对象的某一个属性；

### 三、访问对象的属性

在访问的对象上的属性的时候可以使用：`Object.keys(obj)`来访问
此时会以数组的形式返回对象的属性

```javascript
var person = {
	name:'王五',
	age:18,
	sex:'男'
};
console.log(Object.keys(person));
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210130120732117.png) 

已经有对象了，还有另外一种给对象定义新的属性或修改现有属性的方法

那就是：**[Object.defineProperties()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)**
他的语法是这样的

```javascript
Object.defineProperties(obj, props)
```
**语法解析**
obj：在其上定义或修改属性的对象。
props有四个数据属性，两个访问器属性
数据属性：
	`configurable：`能否通过delete删除属性从而重新定义属性，能否修改属性的特性，能否把属性修改为访问器属性，默认为false
	`enumerable：`能否通过for-in来循环返回属性，默认为false
	`value：`读取属性值的时候从这个位置读，写入属性的时候把新值写入到这个位置，默认为undefined
	`writable:`表示能否修改属性值，默认为 false
访问器属性	
	`get:`读取属性的时候调用函数，默认为 undefined
	`set:`设置属性的时候调用函数，默认为 undefined

```javascript
var person = {};
//使用writeable
Object.defineProperty(person,'name',{
	writeable:false,
	value:'张三'
});
console.log(person.name);//张三
person.name="李四";
console.log(person.name);//张三

//使用configurable
var person = {};
Object.defineProperty(person,'name',{
	configurable:false,
	value:'王五'
});
console.log(person.name);
person.name="王六";
console.log(person.name);
//将configurable设置完false之后在变回true,在调用Object.defineProperty方法修改除writable之外的方法都会报错
Object.defineProperty(person,'name',{
	configurable:true,//此时会报错 Uncaught TypeError: Cannot redefine property: nameat Function.defineProperty 
	value:'王七'
});
```
```javascript
//构造器属性例子
var book={
    _year:2004,
    edition:1
}
Object.defineProperty(book,"year",{
    get:function(){
        return this._year;
    },
    set:function(newVlue){
        if(newVlue > 2004){
            this._year = newVlue;
            this.edition += newVlue - 2004;
        }
    }
});
book.year = 2005;
console.log(book.edition);//2
```
这里设置属性的就完了；

前面说了使用构造函数来创建对象，这里就说说构造函数模式：
前面创建对象是这样创建的：`var person = new Object()`

我们直到创建对象是通过Object这样的原生构造函数来创建，比如Array等，在运行时会自动出现在执行环境中，我们也可以创建自定义的构造函数，从而可以定义自定义对象的属性和方法，比如new 一个Person实例，也可以象下面那样；

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
    this.sayName = function(){
        console.log(this.name);
    }
}
var  person1 = new Person('张三',18)
var  person2 = new Person('张三',18)
		
```
创建一个Person实例(new 一个对象实例)，要经历以下步骤：

 1. 创建一个新对象
 2. 将构造函数的作用域赋给新对象（this就指向新对象）
 3. 执行构造函数中的代码（为这个新对象添加属性）
 4. 返回新对象

而person1和person2分别保存了Person的一个不同的实例，这两个对象都有constructor(构造函数)属性，指向Person

```javascript
console.log(person1.constructor == Person) //true
console.log(person2.constructor == Person) //true
```
### 四、构造函数当作普通函数

构造函数与普通函数的唯一区别是调用他们的方式不同。任何函数，只要通过new操作符来调用，那它就可以作为构造函数来使用，而任何函数如果不通过new操作符来调用，就跟普通函数没什么区别。
例如：

```javascript
//当作构造函数使用：
var person = new Person("Nichols", 29,"software Engineer");
person.sayName();//"Nichols"
//作为普通函数
var person = Person("Nichols", 29,"software Engineer");
person.sayName()//undefined
window.sayName()//"Nichols"
//在另一个对象的作用域中调用
var o = new Object();
Person.call(o,"Nichols", 29,"software Engineer");
o.sayName();//"Nichols";
```

不使用new 操作符调用Person时，属性和方法被添加进了window对象了（在全局作用域中调用一个函数时，this总是指向Global对象，浏览器中就是window对象，）

## 原型模式

在说原型模式之前看一个例子

```javascript
function Person(name, age){
    this.name = name;
    this.age = age;
    this.sayName = sayName;
}
function sayName(){
    console.log(this.name);
}
var person1 = new Person("张三",18);
var person2 = new Person("李四",20);
// 这样做的目的解决了两个实例对象调用同一个函数的问题

// 缺点：在全局作用域中定义的函数只能被某个对象调用，如果对象需要定义很多方法，那么就需要定义很多全局函数，缺少封装性
		
```
创建的每个函数都有一个原型的属性（prototype），**这个属性是一个指针，指向一个对象，这个对象的用途是包含可以由  特定类型的 所有实例共享的  属性和方法**
简单理解：prototype就是  通过调用构造函数   创建的那个对象实例   的 原型对象

好处：所有对象实例共享它（prototype）所包含的属性和方法。
理解为：不用在构造函数中定义对象实例的信息，将这些信息添加到原型对象中；
**原型也是一个对象**

```javascript

function Person(){
}

Person.prototype.name = "张三";
Person.prototype.age = 18;
Person.prototype.job = "前端工程师";
Person.prototype.sayName = function(){
    console.log(this.name )
};

var person1  = new Person();
person1.sayName()//"张三"
var person2  = new Person();
person2.sayName()//"张三"
console.log(person1.sayName == person2.sayName);//ture

```

将sayName方法和函数添加到Person的prototype中，Person此时成为空的函数，但是也可以通过调用构造函数来创建创建新对象，新对象具有相同的属性和方法，与构造函数模式不同的是，新对象的这些属性和方法，是由所有实例所共享的。
### 一、理解原型对象

无论什么时候，只要创建一个函数，就会为该函数创建一个prototype属性，这个属性指向函数的原型对象
**原型对象**  

```js
prototype: {

}
```

在默认的情况下，所有原型对象都会有的一个constructor(构造函数)，
这个属性是一个指向prototype属性所在函数的**指针**，
简单理解：`Person.prototype.constructor`指向Person；
创建了自定义的构造函数之后，其原型对象默认只会取得constructor属性，其他的方法都是从Object继承来的，
当调用构造函数创建一个新实例之后   `var person1 = new Person()`
该实例的内部将包含一个指针 (内部属性)，指向构造函数的原型对象，这个指针就是   `__proto__` 
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210215120147452.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0hfdW5ncnk=,size_16,color_FFFFFF,t_70)
这个展示了Person构造函数、Person的原型以及Person现有的两个实例之间的关系，Person.prototype指向了原型对象，`Person.prototype.constructor`指回了Person，原型对象中包含了`constructor`之外还添加了其他的属性(name,age,sayName())，

Person的每个实例都包含了一个内部属性(`__proto__`)，该属性仅仅指向`Person.prototype`
所以每个实例的内部属性`__proto__`与构造函数没有直接的关系。
虽然两个实例都不包含属性和方法，但是依然可以调用sayName()方法。这个是通过查找对象属性找到的。
虽然在所有实现中都无法访问到`__proto__`，但是可以通过isPrototypeOf()方法来确定对象之间是否存在这种关系，如果`__proto__`指向调用isPrototypeOf()方法的对象`Person.prototype`，那么这个方法就返回true。

```javascript
console.log(Person.prototype.isPrototypeOf(person1));//true
console.log(Person.prototype.isPrototypeOf(person2));//true
```
这里返回true是因为，person1和person2他们内部都有一个指向Person.prototype的指针。

**getPrototypeOf()**
通过getPrototypeOf()返回实例对象的原型

```javascript
console.log(Object.getPrototypeOf(person1).name)//"张三"；
```
### 二、属性的查找规则

在读取某个对象的属性的时候，先从对象实例本身开始查找，如果找到这个属性，就返回这个属性的值，不会在向下查找，如果没有找到，就继续找指针指向的原型对象`Person.prototype`对象也就是`person1.__proto__`它里面找，如果在这里面找到，就返回该属性的值
简单理解：第一次查找：person1有name属性吗，没有，第二次查找，person1的`__proto__`有name属性吗，有就返回该属性的值


虽然可以访问对象原型中的值，但是不能重写对象原型中的值

如果：在对象实例中添加name，那么在访问的时候这个name属性会屏蔽对象原型中的name属性，即使这个属性值为null，也不会在对象原型中查找该属性了；
也可以通过删除对象实例中的属性，使得访问对象原型中的值
例如：

```javascript
function Person(){}

Person.prototype.name = "张三";
Person.prototype.age = 18;
Person.prototype.job = "前端工程师";
Person.prototype.sayName = function(){
	console.log(this.name )
};


var person1  = new Person();
var person2  = new Person();
console.log(person1.name);//自身的原型对象为空的时候:张三
person1.name = "李四";
console.log(person1.name);//自身的原型对象为添加name属性之后：李四
delete person1.name;
console.log(person1.name);//删除实例对象中的name之后：张三
```
**hasOwnProperty()**
hasOwnProperty()用于检测一个属性是否存在对象实例中；这个方法也是从Object中继承过来的；

```javascript
function Person(){
	this.address  = "北京市";
}

Person.prototype.name = "张三";
Person.prototype.age = 18;
Person.prototype.job = "前端工程师";
Person.prototype.sayName = function(){
	console.log(this.name )
};


var person1  = new Person();
var person2  = new Person();
//开始是原型中的name，不是对象实例中的，这时返回false
console.log(person1.hasOwnProperty("name"));
person1.name = "李四";
//当给对象实例里中添加name属性之后，该属性会屏蔽对象原型中的name，此时返回的是true
console.log(person1.hasOwnProperty("name"));
delete person1.name
//当删除对象实例中的name属性之后，此时查找name属性会在对象原型中查找，这时候返回false
console.log(person1.hasOwnProperty("name"));
//address只在构造函数中有，不在对象原型中定义，此时返回true
console.log(person1.hasOwnProperty("address"));

```

### 三、属性设置和屏蔽

```js
myObject.foo = "bar"
```

myObject对象中包含名为foo的普通数据访问属性，这条赋值语句只会修改已有的属性值

foo不是直接存在于myObject中，[[Prototype]]链就会被遍历，类似[[Get]]操作。如果原型链上找不到foo, foo就会被直接添加到myObject上

如果foo存在于原型链上层，赋值语句myObject.foo ="bar"的行为就会有些不同

> 如果属性名foo既出现在myObject中也出现在myObject的[[Prototype]]链上层，那么就会发生屏蔽

下面我们分析一下如果foo不直接存在于myObject中而是存在于原型链上层时myObject.foo ="bar"会出现的三种情况

1。如果在[[Prototype]]链上层存在名为foo的普通数据访问属性（参见第3章）并且没有被标记为只读（writable:false），那就会直接在myObject中添加一个名为foo的新属性，它是屏蔽属性。

2．如果在[[Prototype]]链上层存在foo，但是它被标记为只读（writable:false），那么无法修改已有属性或者在myObject上创建屏蔽属性。如果运行在严格模式下，代码会抛出一个错误。否则，这条赋值语句会被忽略。总之，不会发生屏蔽。

3．如果在[[Prototype]]链上层存在foo并且它是一个setter（参见第3章），那就一定会调用这个setter。foo不会被添加到（或者说屏蔽于）myObject，也不会重新定义foo这个setter。

大多数开发者都认为如果向[[Prototype]]链上层已经存在的属性（[[Put]]）赋值，就一定会触发屏蔽，但是如你所见，三种情况中只有一种（第一种）是这样的

如果你希望在第二种和第三种情况下也屏蔽foo，那就不能使用=操作符来赋值，而是使用Object.defineProperty(..)

第二种情况可能是最令人意外的，只读属性会阻止[[Prototype]]链下层隐式创建（屏蔽）同名属性。这样做主要是为了模拟类属性的继承。你可以把原型链上层的foo看作是父类中的属性，它会被myObject继承（复制），这样一来myObject中的foo属性也是只读，所以无法创建。但是一定要注意，实际上并不会发生类似的继承复制

有些情况下会隐式产生屏蔽，一定要当心。思考下面的代码

```js
var anotherObject = {
    a: 2
}
var myObject = Object.create(anotherObject)
anotherObject.a // 2
myObject.a // 2
anotherObject.hasOwnProperty("a") // true
myObject.a ++ ;// 隐式屏蔽
anotherObject.a // 2
myObject.a  // 3
myObject.hasOwnProperty("a") // true

```

尽管myObject.a++看起来应该（通过委托）查找并增加anotherObject.a属性，但是别忘了++操作相当于myObject.a = myObject.a + 1。因此++操作首先会通过[[Prototype]]查找属性a并从anotherObject.a获取当前属性值2，然后给这个值加1，接着用[[Put]]将值3赋给myObject中新建的屏蔽属性a，天呐！修改委托属性时一定要小心。如果想让anotherObject.a的值增加，唯一的办法是anotherObject.a++