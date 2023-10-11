## 原生函数

常用的原生函数有：`String()`、`Number()`、`Boolean()`、 `Array()`、`Object()`、`Function()`、 `RegExp()`、 `Date()`、 `Error()`、`Symbol()`——ES6中新加入的！

原生函数可以被当作构造函数来使用，但其构造出来的对象可能会和我们设想的有所出入

```js
var a = new String("abc")
typeof a; // "object" 而非"Stirng"
a instanceof String; // true;
Object.prototype.toString.call(a) // "[Object String]"
```

通过构造函数（如`new String("abc")`）创建出来的是**封装了基本类型值（如"abc"）的封装对象**。

`typeof`在这里返回的是对象类型的**子类型**。

可以这样来查看封装对象：

```js
console.log(a)
// 输出：
/* String {'a'}
    0: "a"
    length: 1
    [[Prototype]]: String
    [[PrimitiveValue]]: "a"
*/
```

所以：`new String("abc")`创建的是字符串"abc"的**封装对象**，而非基本类型值"abc"。

### 内部属性

所有`typeof`返回值为"object"的对象（如数组）都包含一个内部属性`[[Class]]`，这个属性无法直接访问，一般通过`Object.prototype.toString(..)`来查看

```js
Object.prototype.toString.call([1,2,3])  // "[object Array]"
```

数组的内部`[[Class]]`属性值是"Array"

>  多数情况下，对象的内部`[[Class]]`属性和创建该对象的内建原生构造函数相对应，但并非总是如此

对于基本类型的值尔而言：比如null和undefined

```JS
Object.prototype.toString.call(null)  // "[object Null]"
Object.prototype.toString.call(undefined)  // "[object Undefined]"
```

虽然`Null()`和`Undefined()`这样的原生构造函数并不存在，但是内部`[[Class]]`属性值仍然是`"Null"`和`"Undefined"`

看看其他类型的值：

```js
Object.prototype.toString.call(42)  // "[object Number]"
Object.prototype.toString.call(true)  // "[object Boolean]"
```

### 封装对象包装

由于基本类型值没有`.length`和`.toString()`这样的属性和方法，需要通过封装对象才能访问，此时JavaScript会自动为基本类型值包装（box或者wrap）一个封装对象

```js
var a = "abc"
a.length // 3
a.toUpperCase() // "ABC"
```

在平时进行`for`循环时，我们要用到`a.length`，开始浏览器就会直接使用封装对象来，使用封装对象的`.length`

对于Boolean:

```js
var a = new Boolean(false)
if(!a) {
    consolel.log(',..')// 执行不到这里
}
```

为`false`创建了一个封装对象，然而该对象是真值；

对于其他基本类型，都可以自行封装，但不建议这样做；

```js
var a = "abc";
var b = new String(a)
var c = Object(a)
typeof a;// "string"
typeof b; // "object"
typeof c;//"object"

b instanceof String true
c instanceof String true

Object.prototype.toString.call(b); //"[object String]"
```

### 拆封

如果想要得到封装对象中的基本类型值，可以使用`valueOf()`函数

```js
var a = new String("abc")
var b = new String(42)

a.valueOf(); // "abc"
b.valueOf()  // 42
```

在需要用到封装对象中的基本类型值的地方会发生隐式拆封

```js
var a = new String("abc")
var b = a+"" // b的值为"abc"
typeof a; // "object"
typeof b; // "string"
```

## 原生函数作为构造函数

关于数组`（array）`、对象`（object）`、函数`（function）`和正则表达式，我们通常喜欢以常量的形式来创建它们。实际上，使用常量和使用构造函数的效果是一样的

应该尽量避免使用构造函数，除非十分必要，因为它们经常会产生意想不到的结果

Array：

```js
var a = new Array(1,2,3)
var b = [1,2,3]
//他们都打印出  [1,2,3]
```

构造函数带不带`new`都可以，不带时会被自动补上

`Array`构造函数只写一个参数且为数字时，会被当做数组预设的长度

数组并没有预设长度这个概念。这样创建出来的只是一个空数组，只不过它的`length`属性被设置成了指定的值

对于下面的代码，在不同的浏览器不尽相同：

```js
var a = new Array(3)
a.length // 3
var b = [undefined,undefined,undefined]
```

a在当前版本的Chrome中显示为`[empty × 3]`，而b则显示为`[undefined, undefined, undefined]`。

通过下述方式来创建包含`undefined`单元:

```js
var a = Array.apply(null, {length: 3})
a // [undefined,undefined,undefined]
```

于是`Array.apply(..)`调用`Array(..)`函数，并且将`{ length: 3 }`作为函数的参数

假设在`apply(..)`内部该数组参数名为arr, for循环就会这样来遍历数组：`arr[0]`、`arr[1]`、`arr[2]`。然而，由于`{ length: 3 }`中并不存在这些属性，所以返回值为undefined

我们执行的实际上是`Array(undefined, undefined,undefined)`，所以结果是单元值为`undefined`的数组，而非空单元数组

```js
a.join("-"); // "--"
a; // [undefined, undefined, undefined]
a.map(function(v,i) {return i})  // [0, 1, 2]
```

`map`在遍历的时候，根据数组中是否存在值进行遍历的

`join`在执行的时候，`join(..)`首先假定数组不为空，然后通过length属性值来遍历其中的元素。而map(..)并不做这样的假定

**Object(..)、Function(..)和RegExp(..)**

实际情况中没有必要使用`new Object()`来创建对象，因为这样就无法像常量形式那样一次设定多个属性，而必须逐一设定

强烈建议使用常量形式`（如/^a＊b+/g）`来定义正则表达式，这样不仅语法简单，执行效率也更高，因为`JavaScript`引擎在代码执行前会对它们进行预编译和缓存

### 原生原型

原生构造函数有自己的`.prototype`对象，如`Array.prototype`、`String.prototype`等

将字符串值封装为字符串对象之后，就能访问`String.prototype`中定义的方法

### 将原型作为默认值

`Function.prototype`是一个空函数，`RegExp.prototype`是一个“空”的正则表达式（无任何匹配），而`Array.prototype`是一个空数组。对未赋值的变量来说，它们是很好的默认值

其他构造函数的原型包含它们各自类型所特有的行为特征，比如`Number#tofixed(..)`

**所有的函数**都可以调用`Function.prototype`中的`apply(..)`、`call(..)`和`bind(..)`

简单标量基本类型值，比如"abc"，如果要访问它的`length`属性或`String.prototype`方法，`JavaScript`引擎会自动对该值进行封装（即用相应类型的封装对象来包装它）来实现对这些属性和方法的访问

有些原生原型`（native prototype）`并非普通对象那么简单：

```js
typeof Function.prototype // "function"
Function.prototype  // 空函数

```

我们甚至可以修改它们

```js
Array.isArray(Array.prototype);// true
Array.prototype.push(1,2,3)
Array.prototype; // [1,2,3]
需要将Array.prototype设置回空，否则会导致问题
Array.prototype.length = 0;
```

