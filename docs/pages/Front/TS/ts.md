
::: slot doclist
[[toc]]
:::

## TS 介绍

1. 是js的超集（JS有的TS都有）
2. 在JS基础之上，为JS添了类型支持

JS 的类型系统存在“先天缺陷”，JS 代码中绝大部分错误都是类型错误

从编程语言的动静来区分，TypeScript 属于静态类型的编程语言，JS 属于动态类型的编程语言。

 静态类型：编译期做类型检查； 动态类型：执行期做类型检查。 

代码编译和代码执行的顺序：1 编译 2 执行

对于 JS 来说：需要等到代码真正去执行的时候才能发现错误。

对于 TS 来说：在代码编译的时候（代码执行前）就可以发现错误。

 并且，配合 VSCode 等开发工具，TS 可以提前到在编写代码的同时就发现代码中的错误，减少找 Bug、改 Bug 时间

上述描述用代码来形容：

```js
// JS
function add(x, y) {
	return x + y;
}
```

上面这段JS代码，在编译的时候是不会发现错误的，只有在调用的时候才去判断是否存在错误；错误发现的晚。

看看TS代码：

```typescript
// TS
function add(x:number,y:number):number {
  return x + y
}
add('1','1');
```


<img :src="$withBase('/images/image-20220524195042457.png')" >


能够看到，TS在我们进行编码的时候就能捕获错误，及早的发现错误，而不是在执行的时候才去发现错误；

TS配合VSCode等强大的开发工具，提供了代码补全、接口提示、跳转到定义、代码重构等能力，可以提高开发效率，

总的来说，TS在写法上对一些函数参数、返回值、数据类型等做了严格的限制，并及早的抛出错误；

TypeScript也属于弱类型语言，

类型系统按照「是否允许隐式类型转换」来分类，可以分为强类型和弱类型

比如`console.log(1+'1') // 11` 运行时数字 `1` 会被隐式类型转换为字符串 `'1'`，加号 `+` 被识别为字符串拼接

TypeScript 可以和 JavaScript 共存，这意味着 JavaScript 项目能够渐进式的迁移到 TypeScript。

由于上述种种因素，TypeScript适用于任何规模的项目

## TS 初级

### 使用工具

当然，TS不像JS那样随便建一个html或js文件就能运行，因为Node/浏览器不认识TS代码，需要先将TS代码转换为JS代码才能运行。

<img :src="$withBase('/images/image-20220524200252488.png')" >


这里有两个方法去执行TS代码：

（1）安装编译TS的工具包

```js
// 全局安装TS包
npm i -g typescript
```

验证： `tsc -v` 看是否存在版本号来判断是否安装成功

（2）使用TS官方提供的web编译器

https://www.typescriptlang.org/play

**下面的所有演示基于TS官方提供的编译器编写：**

### 基础介绍

#### 常用类型

**JS已有类型：**

原始类型： number/string/boolean/null/undefined/symbol

对象类型：object(数组、对象、函数等)

**TS新增类型：**

联合类型、自定义类型、接口、元组、字面量类型、枚举、void、any等

#### 原始类型

原始类型完全按照JS中类型的名称来写的

```typescript
let age:number = 18 // 数值
let myName: string = 'liu' // 字符串
let isLoading:boolean = false // boolean值
let isNull: null = null // null
let isUndefined: undefined = undefined // undefined

// 在TS中，用void表示空值，void表示没有任何返回指定函数
function funvoid(): void{
    console.log('void')
}
// 等...
```

在这里，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量。

```typescript
let age:number = null
```

但是void不能赋给任何任何类型的变量

```typescript
let isVoid:void

let age: number = isVoid

// 会报错
//Type 'void' is not assignable to type 'number'.
```

#### 数组类型

数组类型的写法：`<Type>[]`

```typescript
let numbers: number[] = [1, 2, 3]
```

上面代码表示数组中包含数字类型的数组，其他类型的不被允许

```typescript
let arr: (number | string)[] = [1, 2, '3']
```

上面的代码表示可以包含数组或字符串类型的数组，其他类型的不被允许



上面定义了的类型，在对数组进行操作的时候也被限制

比如：

```typescript
arr.push('1')
// 会报下列错误
// Argument of type 'string' is not assignable to parameter of type 'number'.
```

也就是说，只要数组定义了什么类型，他在以后的所有操作中都严格按照那种类型

<span style="color: #1890ff">其他的可以类推，比如：</span>

```typescript
let arr: (number | string | boolean | object)[] = [1, 3, 4, '4', false, {name: 'lisi'}]
```

<span style="color: red">这里的竖线（|）在TS叫做联合类型（由两个或多个其他类型组成的类型，表示可以是这些类型中的任意一种）</span>

#### 函数类型

函数的类型实际上指的是：函数参数和返回值的类型。 

**函数传参类型**

为函数指定类型的两种方式：

**1 单独指定参数、返回值的类型**

格式如下：

```typescript
function funName(arg1: Type1, arg2: Type2): Type3 {
	// do someting...
}
```

Type1，Type2，Type3代表数据类型，如函数没返回值，Type3为void

<span style="color: #1890ff">例如下面函数：</span>

```typescript
// 函数声明式   有返回值， 返回类型为number
function add(x:number, y:number):number {
	return x + y
}

// 声明式函数   无返回值   通过:void指定
function noReturn(x:number, y:number):void {
    console.log(x + y)
}
```

**2 同时指定参数、返回值的类型**

```typescript
// 函数表达式

const add = function (x:number, y:number):number {
    return x + y
}
// 上面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 add，是通过赋值操作进行类型推论而推断出来的
// 等效于下面的方式
let add: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

当函数作为表达式时，可以通过类似箭头函数形式的语法来为函数添加类型，左侧是函数定义，右侧是输出类型，区别于JS中ES6的箭头函数

**可选参数**

使用函数实现某个功能时，参数可以传也可以不传。这种情况下，在给函数参数指定类型时，就用到可选参数了。 比如，数组的 slice 方法，可以 slice() 也可以 slice(1) 还可以 slice(1, 3)。

```typescript
function mySlice(x?: number, y?: number): void {
	console.log('参数1：', x, '参数2：', y)
}
```

在可选的参数名称后面添加 ?，就表示该参数不是必选参数

<span style="color: red">注意：可选参数只能出现在必选参数的最后，也就是说可选参数后面不能再出现必选参数。</span>


<img :src="$withBase('/images/image-20220524214157285.png')" >


**参数默认值**

在TS中，也可以像JS那样给函数的参数传递默认的值

```typescript
function mySlice(x: number = 1, y?: number): void {
	console.log('参数1：', x, '参数2：', y)
}
// 调用，第一个不传，
mySlice(undefined, 2)
```

在调用函数的时候，如果第一个参数赋值了默认值，调用函数使用其默认值时，则对应的位置传`undefined`

所以，参数里面有默认值时，一般放到所有参数的最后

**函数重载**

重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。

比如：我们需要实现一个函数 `reverse`，输入数字 `123` 的时候，输出反转的数字 `321`，输入字符串 `'hello'` 的时候，输出反转的字符串 `'olleh'`

```typescript
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。

```typescript
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string | void {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

#### 对象类型

JS 中的对象是由属性和方法构成的，而 TS 中对象的类型就是在描述对象的结构（有什么类型的属性和方法）。 对象类型的写法：

格式：

```typescript
let objName: Type = {
	key: value
}
```

在这里，Type表示该对象的类型，对象结构。

<span style="color: red">需要注意：</span>

1 Type中定义的非必须的属性，必须在定义的对象中存在；

<img :src="$withBase('/images/image-20220524214929458.png')" >


sayHi方法在person对象中不存在，但是存在于对象类型中，所以会报错

2 Type中未定义的属性，在定义的对象中不能存在；
<img :src="$withBase('/images/image-20220524214902426.png')" >


isBool定义在了对象中，但不在对象类型中，会报错

<span style="color: #1890ff">正确的代码：</span>

```typescript
let person: {name: string; age: number; sayHi(): void} = {
  name: 'jack',
  age: 13,
  sayHi() {}
}
```

1. 直接使用 {} 来描述对象结构。属性采用属性名: 类型的形式；方法采用方法名(): 返回值类型的形式。

2. 如果方法有参数，就在方法名后面的小括号中指定参数类型（比如：greet(name: string): void）。

3. 在一行代码中指定对象的多个属性类型时，使用 ;（分号）来分隔。

   如果一行代码只指定一个属性类型（通过换行来分隔多个属性类型），可以去掉 ;（分号）。

   方法的类型也可以使用箭头函数形式（比如：{ sayHi: () => void }）。

**对象中的可选属性**

```typescript
let person: {name: string; age?: number; } = {
  name: 'jack',
}
// 参数age可传可不传,可选参数放到最后
```

```typescript
function myAxios(config: {url: string; method?: string}) {
	console.log(config)
}
// method属性可以省略
```

以上就是在对象中如何给对象属性添加类型

####  类型别名

类型别名（自定义类型）：为任意类型起别名。 

简单来讲就是我们自定义一个名称，这个名称代表的就是后面定义类型

比如：当同一类型（复杂）被多次使用时，可以通过类型别名，简化该类型的使用。

```typescript
type CustomArray = (number | string) []
let arr1: CustomArray = ['1','2',2]
let arr2: CustomArray = ['x',4]
```

在这里，使用`type`定义了CustomArray的类型为`(number | string) []`

在后面我们就可以直接使用CustomArray来表示定义好的类型

#### any类型

原则：不推荐使用 any！这会让 TypeScript 变为 “AnyScript”（失去 TS 类型保护的优势）。 因为当值的类型为 any 时，可以对该值进行任意操作，并且不会有代码提示。

```typescript
let obj: any = {x:0}
obj.bar = 100
obj()
const n:number = obj
```

解释：以上操作都不会有任何类型错误提示，即使可能存在错误！

 尽可能的避免使用 any 类型，除非临时使用 any 来“避免”书写很长、很复杂的类型！

 其他隐式具有 any 类型的情况：1 声明变量不提供类型也不提供默认值 2 函数参数不加类型。 

注意：因为不推荐使用 any，所以，这两种情况下都应该提供类型！

### 中级介绍

#### 接口

上面我们使用了`type`去定义了CustomArray对应的某种基本的类型，下面使用`interface`去定义一个对象类型

当一个对象类型被多次使用时，一般会使用**接口（interface）**来描述对象的类型，达到复用的目的。

格式:

```typescript
interface ObjName {
   key1: Type,
   key2: Type,
}
// ObjName自定义名称
```

例如：

```typescript
// 定义一个IPerson名称的对象类型
interface IPerson {
  name: string,
  age: number,
  sayHi():void
}
// 使用
let person:IPerson = {
  name: 'jack',
  age: 12,
  sayHi() {}
}
```

接口名称 IPerson，可以是任意合法的变量名称。

声明接口后，直接使用接口名称作为变量person的类型。

在使用`interface`定义好的对象类型中，其中定义的变量比接口中的变量不能少，也不能多，即赋值的时候，变量的形状必须和接口的形状保持一致；（类型，参数名必须保持一致）



当然上面的规则很死板，下面可以使用某种方法让**变量的形状必须和接口的形状不必一致**

```typescript
interface IPerson {
  name: string,
  age?: number,
  sayHi():void
}
 // 这里让age变成了可选属性
```

```typescript
let person:IPerson = {
  name: 'jack',
  sayHi() {}
}
// 这里的age可传可不传
```



interface（接口）和 type（类型别名）的对比：

相同点：都可以给对象指定类型；都可以允许继承（`type`的继承使用交叉类型）

不同点：
接口，只能为对象指定类型，可以合并重复声明；
类型别名，不仅可以为对象指定类型，实际上可以为任意类型（基本类型，联合类型，交叉类型）指定别名。



```typescript
interface IPerson {
  name: string,
  age: number,
  sayHi():void
}

type IPerson1 = {
  name: string,
  age: number,
  sayHi():void
}

type NumStr = number | string

// 这样使用会报错
interface NumStr1 = number | string
// 'number' only refers to a type, but is being used as a value here.
```



**接口间的继承**

如果两个接口之间有相同的属性或方法，可以将公共的属性或方法抽离出来，通过继承来实现复用。

```typescript
// 定义
interface Ponit1 {
  x: number,
  y: number
}

interface Ponit2 extends Ponit1 {z: number}

// 使用
let person: Ponit2 = {
  x: 1,
  y:2,
  z:3
}
```

使用 extends（继承）关键字实现了接口 Ponit2继承 Ponit1。 继承后，Ponit2就有了 Ponit1的所有属性和方法（此时，Ponit2同时有 x、y、z 三个属性）。

#### 元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象

场景：在地图中，使用经纬度坐标来标记位置信息。 可以使用数组来记录坐标，那么，该数组中只有两个元素，并且这两个元素都是数值类型。

```typescript
let position:number[] = [1,2,3]
```

使用 number[] 的缺点：不严谨，因为该类型的数组中可以出现任意多个数字。 更好的方式：元组（Tuple）。 元组类型是另一种类型的数组，它确切地知道包含多少个元素，以及特定索引对应的类型。

```typescript
let position: [number, number] = [1,2]
```

元组类型可以确切地标记出有多少个元素，以及每个元素的类型。 

该示例中，元素有两个元素，每个元素的类型都是 number



当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项

```typescript
let position:[string,number]
position[0] = '1'
position[1] = 2
```

#### 类型推论

TS 中，某些没有明确指出类型的地方，TS 的类型推论机制会帮助提供类型。 

换句话说：由于类型推论的存在，这些地方，类型注解可以省略不写！ 

发生类型推论的 2 种常见场景：1 声明变量并初始化时 2 决定函数返回值时

<img :src="$withBase('/images/image-20220524224416754.png')" >



TS会自动推断除age为number类型

<img :src="$withBase('/images/image-20220524224525180.png')" >



TS自动推断出函数的返回类型为number

以上这两种情况下，类型注解可以省略不写！



推荐：能省略类型注解的地方就省略（偷懒，充分利用TS类型推论的能力，提升开发效率）。 

技巧：如果不知道类型，可以通过鼠标放在变量名称上，利用 VSCode 的提示来查看类型。

#### 类型断言

有时候你会比 TS 更加明确一个值的类型，此时，可以使用类型断言来指定更具体的类型。

 比如

<img :src="$withBase('/images/image-20220524225702216.png')" >



注意：getElementById 方法返回值的类型是 HTMLElement，该类型只包含所有标签公共的属性或方法，不包含 a  标签特有的 href 等属性。 因此，这个类型太宽泛（不具体），无法操作 href 等 a 标签特有的属性或方法。

解决方式：这种情况下就需要使用类型断言指定更加具体的类型

使用类型断言：

<img :src="$withBase('/images/image-20220524225807879.png')" >


使用 as 关键字实现类型断言。

关键字 as 后面的类型是一个更加具体的类型（HTMLAnchorElement 是 HTMLElement 的子类型）。

通过类型断言，aLink 的类型变得更加具体，这样就可以访问 a 标签特有的属性或方法了。 

技巧：在浏览器控制台，通过 console.dir() 打印 DOM 元素，在属性列表的最后面，即可看到该元素的类型。



#### 字面量类型

思考以下代码，两个变量的类型分别是什么？

```typescript
let str1= 'hello TS'

const str2 = 'hello ts'
```

通过 TS 类型推论机制，可以得到答案： 

1. 变量 str1 的类型为：string。
2. 变量 str2 的类型为：'Hello TS'。

解释：

1. str1 是一个变量（let），它的值可以是任意字符串，所以类型为：string。 
2. str2 是一个常量（const），它的值不能变化只能是 'Hello TS'，所以，它的类型为：'Hello TS'

注意：此处的 'Hello TS'，就是一个字面量类型。也就是说某个特定的字符串也可以作为 TS 中的类型。 

除字符串外，任意的 JS 字面量（比如，对象、数字等）都可以作为类型使用。

#### 联合类型

联合类型表示取值可以为多种类型中的一种

比如

```typescript
let personInfo: string | number
personInfo = 'zs'
personInfo = 12
```

上面表示的是，personInfo可选`string`或者`number`的值



用来表示一组明确的可选值列表

比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个。

```typescript
function changeDirection(direction: 'up' | 'down' | 'left' | 'right') {
	console.log(direction)
}

changeDirection("up")
```

解释：参数 direction 的值只能是 up/down/left/right 中的任意一个。 

优势：相比于 `string` 类型，使用字面量类型更加精确、严谨。



#### 枚举

枚举的功能类似于字面量类型+联合类型组合的功能，也可以表示一组明确的可选值。 

枚举：定义一组命名常量。它描述一个值，该值可以是这些命名常量中的一个。

<img :src="$withBase('/images/image-20220525090836484.png')" >



能够看到传参的时候只能使用字面量类型里面定义的某个变量

- 使用 enum 关键字定义枚举。
- 约定枚举名称、枚举中的值以大写字母开头。
- 枚举中的多个值之间通过 ,（逗号）分隔。 
- 定义好枚举后，直接使用枚举名称作为类型注解。

**数字枚举**

这里我们把枚举成员作为了函数的实参，那他的值是什么呢？

<img :src="$withBase('/images/image-20220525091142783.png')" >


可以看到枚举成员 Up 的值为 0。 

<span style="color: red">注意：枚举成员是有值的，默认为：从 0 开始自增的数值。 </span>

我们把，枚举成员的值为数字的枚举，称为：数字枚举。

比如给枚举成员Up设置数字0，后面其他类型会依次按数字顺序赋值（测试了好像只有数字才会默认赋值，其他不行）

<img :src="$withBase('/images/image-20220525091436774.png')" >



 当然，也可以给枚举中的成员初始化值，手动赋值

<img :src="$withBase('/images/image-20220525091604126.png')" >



可以看到未赋值Right会根据上一个值自动赋值（数字）

<img :src="$withBase('/images/image-20220525091747550.png')" >



非数字会报错，这种情况，Right不知道'4'后面是什么，没有相关顺序性



**字符串枚举**

<img :src="$withBase('/images/image-20220525091950570.png')" >


<span style="color: red">字符串枚举没有自增长行为，因此，字符串枚举的每个成员必须有初始值</span>

枚举是 TS 为数不多的非 JavaScript 类型级扩展（不仅仅是类型）的特性之一。 

因为：其他类型仅仅被当做类型，而枚举不仅用作类型，还提供值（枚举成员都是有值的）。 

也就是说，其他的类型会在编译为 JS 代码时自动移除。但是，枚举类型会被编译为 JS 代码

<img :src="$withBase('/images/image-20220525092237827.png')" >



说明：枚举与前面讲到的字面量类型+联合类型组合的功能类似，都用来表示一组明确的可选值列表。

 一般情况下，推荐使用字面量类型+联合类型组合的方式，因为相比枚举，这种方式更加直观、简洁、高效。

#### typeof

众所周知，JS 中提供了 typeof 操作符，用来在 JS 中获取数据的类型。

```typescript
console.log(typeof 'hello')
// string
```

实际上，TS 也提供了 typeof 操作符：可以在类型上下文中引用变量或属性的类型（类型查询）。

比如：根据已有变量的值，获取该值的类型，来简化类型书写。

```typescript
// 方法一
let p = {x: 1, y: 2}
function formatPoint(point: {x:number;y:number}) {
  console.log(point)
  // { "x": 1, "y": 2} 
}
formatPoint(p)
// 方法二
function formatPoint1(point: typeof p) {
    console.log(point)
    // { "x": 1, "y": 2} 
} 
formatPoint1(p)
```

1. 使用 typeof 操作符来获取变量 p 的类型，结果与第一种（对象字面量形式的类型）相同。 

2. typeof 出现在类型注解的位置（参数名称的冒号后面）所处的环境就在类型上下文（区别于 JS 代码）。 
3. 注意：typeof 只能用来查询变量或属性的类型，无法查询其他形式的类型（比如，函数调用的类型）。

### 高级类型

#### class类

TypeScript 全面支持 ES2015 中引入的 class 关键字，并为其添加了类型注解和其他语法（比如，可见性修饰符等）

<img :src="$withBase('/images/image-20220525111441747.png')" >



根据 TS 中的类型推论，可以知道 Person 类的实例对象 p 的类型是 Person。 

 TS 中的 class，不仅提供了 class 的语法功能，也作为一种类型存在

**初始化实例属性**

```typescript
class Person {
    age: number = 1;
    gender: string = '男'
}
const p = new Person()
```

给类Person声明成员age，并设置类型并赋初始值。

**构造函数**

<img :src="$withBase('/images/image-20220525112321902.png')" >


实参和形参的数据类型需要一致

和函数传参一样，可以使用?来标明可传可不传的变量

<img :src="$withBase('/images/image-20220525112514743.png')" >



1. 在构造函数里面，必须得成员初始化后才可以通过this.age来访问成员

<span style="color: #1890ff">比如：</span>

<img :src="$withBase('/images/image-20220525112715768.png')" >



2. 需要为构造函数指定类型注解，否则会被隐式推断为 any；构造函数不需要返回值类型

<span style="color: #1890ff">比如：</span>
 
<img :src="$withBase('/images/image-20220525112814061.png')" >


**实例方法**
 
<img :src="$withBase('/images/image-20220525113028865.png')" >


方法的类型注解（参数和返回值）与函数用法相同。

**class的继承**

- 继承

类继承的两种方式：1 extends（继承父类） 2 implements（实现接口）。

 说明：JS 中只有 extends，而 implements 是 TS 提供的。
 
<img :src="$withBase('/images/image-20220525113245904.png')" >


可以看到实例dog有两个可用的方法

通过 extends 关键字实现继承。

子类 Dog 继承父类 Animal，则 Dog 的实例对象 dog 就同时具有了父类 Animal 和 子类 Dog 的所有属性和方法

- 实现接口
 
<img :src="$withBase('/images/image-20220525113531053.png')" >


可以看到，接口（interface）中的属性和方法，用来规定Dog类中的属性和方法的；即接口提供类型声明

#### 各类修饰符

类成员可见性：可以使用 TS 来控制 class 的方法或属性对于 class 外的代码是否可见。

可见性修饰符包括：1 public（公有的） 2 protected（受保护的） 3 private（私有的）

**public修饰符**

表示公有的、公开的，公有成员可以被任何地方访问，默认可见性

```typescript
class Animal {
    public move() {
        console.log('Animal')
    }
}
```

在类属性或方法前面添加 public 关键字，来修饰该属性或方法是共有的。 

因为 public 是默认可见性，所以，可以直接省略

**protected修饰符**

表示受保护的，仅对其声明所在类和子类中（非实例对象）可见
 
<img :src="$withBase('/images/image-20220525114627544.png')" >


**private修饰符**

表示私有的，只在当前类中可见，对实例对象以及子类也是不可见的。
 
<img :src="$withBase('/images/image-20220525114900408.png')" >


**readonly修饰符**

除了可见性修饰符之外，还有一个常见修饰符就是：readonly（只读修饰符）。 

readonly：表示只读，用来防止在构造函数之外对属性进行赋值。
 
<img :src="$withBase('/images/image-20220525134700836.png')" >


能够看到name可修改而age不可修改
 
<img :src="$withBase('/images/image-20220525134818157.png')" >


也能够看到，在构造函数；里面可以修改，在实例对象不能修改



使用 readonly 关键字修饰该属性是只读的，注意只能修饰属性不能修饰方法。

注意：属性 age 后面的类型注解（比如，此处的 number）如果不加，则 age 的类型为 18 （字面量类型）

接口或者 {} 表示的对象类型，也可以使用 readonly

#### 类型兼容性

两种类型系统：1 Structural Type System（结构化类型系统） 2 Nominal Type System（标明类型系统）。 TS 采用的是结构化类型系统，也叫做 duck typing（鸭子类型），类型检查关注的是值所具有的形状。

 也就是说，在结构类型系统中，如果两个对象具有相同的形状，则认为它们属于同一类型

函数之间兼容性比较复杂，需要考虑：1 参数个数 2 参数类型 3 返回值类型

**函数参数个数**

```typescript
type F1 = (a: number) => void
type F2 = (a: number, b: number) => void

let f1: F1
let f2: F2

f2 = f1
```

参数少的可以赋值给参数多的，所以，f1 可以赋值给 f2。

```typescript
let arr = ['a', 'b', 'c']

arr.forEach(item => {})
arr.forEach((item, index) => {})
arr.forEach((item, index, array) => {})
```

 数组 forEach 方法的第一个参数是回调函数，该示例中类型为：

```typescript
(value: string, index: number, array: string[]) => void
```

在 JS 中省略用不到的函数参数实际上是很常见的，这样的使用方式，促成了 TS 中函数类型之间的兼容性。  并且因为回调函数是有类型的，所以，TS 会自动推导出参数 item、index、array 的类型

**参数类型**

```typescript
let F1 = (a: number) => 0
let F2 = (b: string) => 0
F2 = F1
// Type '(a: number) => number' is not assignable to type '(b: string) => number'
```

F1和F2两个函数的参数类型不同，其余的都相同，但也不允许赋值



**返回值类型**

```typescript
let F1 = (a: number): string | number => 0
let F2 = (b: number) => '1'
let F3 = (c:number) => false
F1 = F2
// 之所以能够讲F2赋值给F1，是因为F1的返回值是联合类型，类型包括F2的返回类型
F1 = F3
// F3的返回类型是boolea类型，F1的联合类型里面不包括boolean类型，所以不行
```

#### 交叉类型

交叉类型（&）：功能类似于接口继承（extends），用于组合多个类型为一个类型（常用于对象类型）。 比如

```typescript
interface Person {
    name: string
}
interface Contact {
    phone: string
}
type PersonDetail = Person & Contact

let obj:PersonDetail = {
    name: 'jack',
    phone: '123'
}
```

使用交叉类型后，新的类型 PersonDetail 就同时具备了 Person 和 Contact 的所有属性类型。 相当于：

```typescript
type PersonDetail = {name: string, phone: string}
```

**交叉类型（&）和接口继承（extends）的对比**

相同点：都可以实现对象类型的组合。

不同点：两种方式实现类型组合时，对于同名属性之间，处理类型冲突的方式不同。

接口继承会报错（类型不兼容）；交叉类型没有错误，可以简单的理解为

```typescript
fn: (value: string | number) => string
```

#### 泛型

泛型是可以在保证类型安全前提下，让函数等与多种类型一起工作，从而实现复用，常用于：函数、接口、class 中。 

需求：创建一个 id 函数，传入什么数据就返回该数据本身（也就是说，参数和返回值类型相同）

```typescript
function id(value:number):number {return value}
```

比如，id(10) 调用以上函数就会直接返回 10 本身。但是，该函数只接收数值类型，无法用于其他类型。 

为了能让函数能够接受任意类型，可以将参数类型修改为 any。但是，这样就失去了 TS 的类型保护，类型不安全。

```typescript
function id(value:any):any {return value}
```

泛型在保证类型安全（不丢失类型信息）的同时，可以让函数等与多种不同的类型一起工作，灵活可复用。

**创建泛型函数**

```typescript
function id(Type)(value:Type):Type {return value}
```

- 语法：在函数名称的后面添加 <>（尖括号），尖括号中添加类型变量，比如此处的 Type。 

- 类型变量 Type，是一种特殊类型的变量，它处理类型而不是值。 

- 该类型变量相当于一个类型容器，能够捕获用户提供的类型（具体是什么类型由用户调用该函数时指定）。

- 因为 Type 是类型，因此可以将其作为函数参数和返回值的类型，表示参数和返回值具有相同的类型。

- 类型变量 Type，可以是任意合法的变量名称。

**调用泛型函数**

```typescript
function id<Type>(value:Type):Type {
  return value
}

const num = id<number>(10)
```

1. 语法：在函数名称的后面添加 <>（尖括号），尖括号中指定具体的类型，比如，此处的 number。 
2. 当传入类型 number 后，这个类型就会被函数声明时指定的类型变量 Type 捕获到。 
3. 此时，Type 的类型就是 number，所以，函数 id 参数和返回值的类型也都是 number

同样，如果传入类型 string，函数 id 参数和返回值的类型就都是 string。 

这样，通过泛型就做到了让 id 函数与多种不同的类型一起工作，实现了复用的同时保证了类型安全。

```typescript
function id<Type>(value:Type):Type {
  return value
}

const num = id<string>('a')
```

**简化调用函数**

```typescript
function id<Type>(value:Type):Type {
  return value
}

const num = id('a')
```

1. 在调用泛型函数时，可以省略 <类型> 来简化泛型函数的调用。 
2. 此时，TS 内部会采用一种叫做类型参数推断的机制，来根据传入的实参自动推断出类型变量 Type 的类型。 
3. 比如，传入实参 10，TS 会自动推断出变量 num 的类型 number，并作为 Type 的类型。

推荐：使用这种简化的方式调用泛型函数，使代码更短，更易于阅读。 

说明：当编译器无法推断类型或者推断的类型不准确时，就需要显式地传入类型参数。

**泛型约束**

默认情况下，泛型函数的类型变量 Type 可以代表多个类型，这导致无法访问任何属性。 比如，id('a') 调用函数时获取参数的长度：
 
<img :src="$withBase('/images/image-20220527124042807.png')" >


Type 可以代表任意类型，无法保证一定存在 length 属性，比如 number 类型就没有 length。 此时，就需要为泛型添加约束来收缩类型（缩窄类型取值范围）

**添加泛型约束**

添加泛型约束收缩类型，主要有以下两种方式：1 指定更加具体的类型 2 添加约束

1. 指定更加具体的类型

```typescript
function id<Type>(value:Type[]):Type[] {
  console.log(value.length)
  return value
}
```

比如，将类型修改为 Type[]（Type 类型的数组），因为只要是数组就一定存在 length 属性，因此就可以访问了。

2. 添加约束

```typescript
interface ILength {length: number}

function id<Type extends ILength>(value:Type):Type {
  console.log(value.length)
  return value
}

```

1. 创建描述约束的接口 ILength，该接口要求提供 length 属性。 
2. 通过 extends 关键字使用该接口，为泛型（类型变量）添加约束。 
3. 该约束表示：传入的类型必须具有 length 属性。 注意：传入的实参（比如，数组）只要有 length 属性即可，这也符合前面讲到的接口的类型兼容性

泛型的类型变量可以有多个，并且类型变量之间还可以约束（比如，第二个类型变量受第一个类型变量约束）。

比如，创建一个函数来获取对象中属性的值：

```typescript
function getProp<Type,Key extends keyof Type>(obj:Type,key:Key) {
  return obj[key]
}
let person = {name: 'jack',age: 12}
getProp(person, 'name')

```

添加了第二个类型变量 Key，两个类型变量之间使用（,）逗号分隔

keyof 关键字接收一个对象类型，生成其键名称（可能是字符串或数字）的联合类型。

本示例中 keyof Type 实际上获取的是 person 对象所有键的联合类型，也就是：'name' | 'age'。

类型变量 Key 受 Type 约束，可以理解为：Key 只能是 Type 所有键中的任意一个，或者说只能访问对象中存在的属性

**泛型接口**

接口也可以配合泛型来使用，以增加其灵活性，增强其复用性。

```typescript
interface IdFunc<Type> {
  id: (value: Type) => Type
  ids:() => Type[]
}
let obj:IdFunc<number> = {
  id: (value) => {return value},
  ids(){return [1,2,3]}
}
```

在接口名称的后面添加 <类型变量>，那么，这个接口就变成了泛型接口。

接口的类型变量，对接口中所有其他成员可见，也就是接口中所有成员都可以使用类型变量。

使用泛型接口时，需要显式指定具体的类型（比如，此处的 IdFunc）。 

此时，id 方法的参数和返回值类型都是 number；ids 方法的返回值类型是 number[]

实际上，JS 中的数组在 TS 中就是一个泛型接口
 
<img :src="$withBase('/images/image-20220527212021838.png')" >

 
<img :src="$withBase('/images/image-20220527212104870.png')" >


当我们在使用数组时，TS 会根据数组的不同类型，来自动将类型变量设置为相应的类型。

**泛型类**

class 也可以配合泛型来使用

React 的 class 组件的基类 Component 就是泛型类，不同的组件有不同的 props 和 state

创建泛型类：

```typescript
class GenericNumber<NumType> {
  defaultValue: NumType|undefined
  add:((x: NumType,y: NumType) => NumType)|undefined
}
const myNum = new GenericNumber<number>()
myNum.defaultValue = 10

```

类似于泛型接口，在 class 名称后面添加 <类型变量>，这个类就变成了泛型类。

此处的 add 方法，采用的是箭头函数形式的类型书写方式。

在创建 class 实例时，在类名后面通过 <类型> 来指定明确的类型

**泛型工具类型**

它们都是基于泛型实现的（泛型适用于多种类型，更加通用），并且是内置的，可以直接在代码中使用

Partial  Readonly  Pick  Record

**Partial** 

泛型工具类型 - Partial 用来构造（创建）一个类型，将 Type 的所有属性设置为可选。

```typescript
interface Props {
  id: string
  children: number[]
}
type PartialProps = Partial<Props>

```

构造出来的新类型 PartialProps 结构和 Props 相同，但所有属性都变为可选的

**Readonly** 

泛型工具类型 - Readonly 用来构造一个类型，将 Type 的所有属性都设置为 readonly（只读）。
 
<img :src="$withBase('/images/image-20220527212831899.png')" >


构造出来的新类型 ReadonlyProps 结构和 Props 相同，但所有属性都变为只读的

当我们想重新给 id 属性赋值时，就会报错：无法分配到 "id" ，因为它是只读属性。 

**Pick** 

泛型工具类型 - Pick 从 Type 中选择一组属性来构造新类型。

<img :src="$withBase('/images/image-20220527213031912.png')" >


Pick 工具类型有两个类型变量：1 表示选择谁的属性 2 表示选择哪几个属性。

其中第二个类型变量，如果只选择一个则只传入该属性名即可。 

第二个类型变量传入的属性只能是第一个类型变量中存在的属性。 

构造出来的新类型 PickProps，只有 id 和 title 两个属性类型

**Record** 

泛型工具类型 - Record 构造一个对象类型，属性键为 Keys，属性类型为 Type

```typescript
type RecordObj = Record<'a' | 'b' |'c',string[]>

let obj:RecordObj = {
 a: ['1'],
 b: ['2'],
 c: ['3'],
}
```

Record 工具类型有两个类型变量：1 表示对象有哪些属性 2 表示对象属性的类型。

构建的新对象类型 RecordObj 表示：这个对象有三个属性分别为a/b/c，属性值的类型都是 string[]。

#### 索引签名类型

绝大多数情况下，我们都可以在使用对象前就确定对象的结构，并为对象添加准确的类型

使用场景：当无法确定对象中有哪些属性（或者说对象中可以出现任意多个属性），此时，就用到索引签名类型了。

```typescript
interface AnyObject {
  [key: string]:number
}
let obj: AnyObject = {
  a:1,
  b:2
}
```

使用 [key: string] 来约束该接口中允许出现的属性名称。表示只要是 string 类型的属性名称，都可以出现在对象中。

这样，对象 obj 中就可以出现任意多个属性（比如，a、b 等）。

key 只是一个占位符，可以换成任意合法的变量名称。

隐藏的前置知识：JS 中对象（{}）的键是 string 类型的。

在 JS 中数组是一类特殊的对象，特殊在数组的键（索引）是数值类型

并且，数组也可以出现任意多个元素。所以，在数组对应的泛型接口中，也用到了索引签名类型。

```typescript
interface MyArray<T> {
  [n: number]:T
}
let obj: MyArray<number> = [1,2,3]
```

MyArray 接口模拟原生的数组接口，并使用 [n: number] 来作为索引签名类型。

该索引签名类型表示：只要是 number 类型的键（索引）都可以出现在数组中，或者说数组中可以有任意多个元素

同时也符合数组索引是 number 类型这一前提

#### 映射类型

映射类型：基于旧类型创建新类型（对象类型），减少重复、提升开发效率

**联合类型**

```typescript
type ProKeys = 'x' | 'y' | 'z'
type Type1 = {x:number;y:number;z:number}

```

使用映射类型

```typescript
type ProKeys = 'x' | 'y' | 'z'
type Type1 = {[Key in ProKeys]: number}
```

比如，类型 PropKeys 有 x/y/z，另一个类型 Type1 中也有 x/y/z，并且 Type1 中 x/y/z 的类型相同

映射类型是基于索引签名类型的，所以，该语法类似于索引签名类型，也使用了 []。 

Key in PropKeys 表示 Key 可以是 PropKeys 联合类型中的任意一个，类似于 forin(let k in obj)。 

使用映射类型创建的新对象类型 Type2 和类型 Type1 结构完全相同。 

注意：映射类型只能在类型别名中使用，不能在接口中使用

**对象类型**

映射类型除了根据联合类型创建新类型外，还可以根据对象类型来创建

```typescript
type Props = {a:number;b:string;c:number}
type Type3 = {[key in keyof Props]: number}
```

首先，先执行 keyof Props 获取到对象类型 Props 中所有键的联合类型即，'a' | 'b' | 'c'

然后，Key in ... 就表示 Key 可以是 Props 中所有的键名称中的任意一个



实际上，前面讲到的泛型工具类型（比如，Partial）都是基于映射类型实现的

比如，Partial 的实现

```typescript
type Partial<T> = {
  [p in keyof T]?: T[p]
}
type Props = {a:number;b:string;c:boolean}
type PartialProps = Partial<Props>
```

刚刚用到的 T[P] 语法，在 TS 中叫做索引查询（访问）类型

作用：用来查询属性的类型
 
<img :src="$withBase('/images/image-20220527214800805.png')" >


Props['a'] 表示查询类型 Props 中属性 'a' 对应的类型 number。所以，TypeA 的类型为 number。

索引查询类型的其他使用方式：同时查询多个索引的类型
 
<img :src="$withBase('/images/image-20220527214903889.png')" >


使用字符串字面量的联合类型，获取属性 a 和 b 对应的类型，结果为： string | number
 
<img :src="$withBase('/images/image-20220527214943347.png')" >


使用 keyof 操作符获取 Props 中所有键对应的类型，结果为： string | number | boolean

## 类型声明文件

几乎所有的 JavaScript 应用都会引入许多第三方库来完成任务需求。 这些第三方库不管是否是用 TS 编写的，最终都要编译成 JS 代码，才能发布给开发者使用。 我们知道是 TS 提供了类型，才有了代码提示和类型保护等机制。 但在项目开发中使用第三方库时，你会发现它们几乎都有相应的 TS 类型，这些类型是怎么来的呢？

类型声明文件：用来为已存在的 JS 库提供类型信息。

这样在 TS 项目中使用这些库时，就像用 TS 一样，都会有代码提示、类型保护等机制了。

TS 中有两种文件类型：1 .ts 文件 2 .d.ts 文件。

 .ts 文件： 1. 既包含类型信息又可执行代码。 2. 可以被编译为 .js 文件，然后，执行代码。 3. 用途：编写程序代码的地方。

.d.ts 文件： 1. 只包含类型信息的类型声明文件。 2. 不会生成 .js 文件，仅用于提供类型信息。 3. 用途：为 JS 提供类型信息。

.ts 是 implementation（代码实现文件）；.d.ts 是 declaration（类型声明文件）。 如果要为 JS 库提供类型信息，要使用 .d.ts 文件。

在使用 TS 开发项目时，类型声明文件的使用包括以下两种方式： 

1. 使用已有的类型声明文件 
2. 创建自己的类型声明文件。

a.ts

```typescript
import { Props } from './index'
let p1: Props = {
  x: 1,
  y: 2
}
```

b.ts

```typescript
import { Props } from './index'
let p2: Props = {
  x: 10,
  y: 22
}

```

index.d.ts

```typescript
type Props = { x: number; y: number }

export { Props }

```

 #### 使用说明

使用已有的类型声明文件：1 内置类型声明文件 2 第三方库的类型声明文件。

内置类型声明文件：TS 为 JS 运行时可用的所有标准化内置 API 都提供了声明文件。 

比如，在使用数组时，数组所有方法都会有相应的代码提示以及类型信息

```typescript
(method) Array<number>.forEach(callbackfn: (value: number, index: number, array: number[]) => void, thisArg?: any): void
```

实际上这都是 TS 提供的内置类型声明文件

第三方库的类型声明文件：目前，几乎所有常用的第三方库都有相应的类型声明文件。 第三方库的类型声明文件有两种存在形式：1 库自带类型声明文件 2 由 DefinitelyTyped 提供。 

1. 库自带类型声明文件：比如，axios
 
<img :src="$withBase('/images/image-20220527230942844.png')" >


这种情况下，正常导入该库，TS 就会自动加载库自己的类型声明文件，以提供该库的类型声明。

2. 由 DefinitelyTyped 提供

[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped/) 是一个 github 仓库，用来提供高质量 TypeScript 类型声明。 可以通过 npm/yarn 来下载该仓库提供的 TS 类型声明包，这些包的名称格式为：@types/*。 比如，@types/react、@types/lodash 等。 说明：在实际项目开发时，如果你使用的第三方库没有自带的声明文件，VSCode 会给出明确的提示。
 
<img :src="$withBase('/images/image-20220527231051257.png')" >


当安装 @types/* 类型声明包后，TS 也会自动加载该类声明包，以提供该库的类型声明。 补充：TS 官方文档提供了一个[页面](https://www.typescriptlang.org/dt)，可以来查询 @types/* 库

创建自己的类型声明文件：1 项目内共享类型 2 为已有 JS 文件提供类型声明。 

- 项目内共享类型：

如果多个 .ts 文件中都用到同一个类型，此时可以创建 .d.ts 文件提供该类型，实现类型共享。 

操作步骤： 1. 创建 index.d.ts 类型声明文件。 2. 创建需要共享的类型，并使用 export 导出（TS 中的类型也可以使用 import/export 实现模块化功能）。 3. 在需要使用共享类型的 .ts 文件中，通过 import 导入即可（.d.ts 后缀导入时，直接省略）。

- 为已有 JS 文件提供类型声明：

1.在将 JS 项目迁移到 TS 项目时，为了让已有的 .js 文件有类型声明。 2. 成为库作者，创建库给其他人使用。 注意：类型声明文件的编写与模块化方式相关，不同的模块化方式有不同的写法。但由于历史原因，JS 模块化的发展 经历过多种变化（AMD、CommonJS、UMD、ESModule 等），而 TS 支持各种模块化形式的类型声明。这就导致 ，类型声明文件相关内容又多又杂。

 演示：基于最新的 ESModule（import/export）来为已有 .js 文件，创建类型声明文件。 开发环境准备：使用 webpack 搭建，通过 ts-loader 处理 .ts 文件

说明：TS 项目中也可以使用 .js 文件。 说明：在导入 .js 文件时，TS 会自动加载与 .js 同名的 .d.ts 文件，以提供类型声明。 declare 关键字：用于类型声明，为其他地方（比如，.js 文件）已存在的变量声明类型，而不是创建一个新的变量。 1. 对于 type、interface 等这些明确就是 TS 类型的（只能在 TS 中使用的），可以省略 declare 关键字。 2. 对于 let、function 等具有双重含义（在 JS、TS 中都能用），应该使用 declare 关键字，明确指定此处用于类型声明

## React中的应用

### 创建项目

通过React脚手架工具创建

```
npx create-react-app 项目名称 --template typescript
```

创建完之后，项目中比JS项目中增加tsconfig.json配置文件：指定TS的编译选项，（比如，编译时是否移除注释）

React 组件的文件扩展名变为：*.tsx

src 目录中增加了 react-app-env.d.ts：React 项目默认的类型声明文件



在react-app-env.d.ts文件里面会默认存在下面内容

```
/// <reference types="react-scripts" />
```

三斜线指令：指定依赖的其他类型声明文件，types 表示依赖的类型声明文件包的名称

告诉 TS 帮我加载 react-scripts 这个包提供的类型声明

react-scripts 的类型声明文件包含了两部分类型

- react、react-dom、node 的类型

- 图片、样式等模块的类型，以允许在代码中导入图片、SVG 等文件

TS 会自动加载该 .d.ts 文件，以提供类型声明（通过修改 tsconfig.json 中的 include 配置来验证）

**tsconfig配置文件**

tsconfig.json 指定：项目文件和项目编译所需的配置项。

注意：TS 的配置项非常多（100+），以 CRA 项目中的配置为例来学习，其他的配置项用到时查[文档](https://www.typescriptlang.org/tsconfig)即可

tsconfig.json 文件所在目录为项目根目录

tsconfig.json 可以自动生成，命令：tsc --init

除了在 tsconfig.json 文件中使用编译配置外，还可以通过命令行来使用`tsc hello.ts --target es6`



tsc 后带有输入文件时（比如，tsc hello.ts），将忽略 tsconfig.json 文件

tsc 后不带输入文件时（比如，tsc），才会启用 tsconfig.json。

推荐使用：tsconfig.json 配置文件。

#### React 中的常用类型



在不使用 TS 时，可以使用 prop-types 库，为 React 组件提供[类型检查](https://reactjs.org/docs/typechecking-with-proptypes.html)。 

说明：TS 项目中，推荐使用 TypeScript 实现组件类型校验（代替 PropTypes）。 不管是 React 还是 Vue，只要是支持 TS 的库，都提供了很多类型，来满足该库对类型的需求。

注意： 1. React 项目是通过 @types/react、@types/react-dom 类型声明包，来提供类型的。 2. 这些包 CRA 已帮我们安装好（react-app-env.d.ts），直接用即可。 参考资料：[React文档-静态类型检查](https://reactjs.org/docs/static-type-checking.html) 、[React+TS备忘单](https://github.com/typescript-cheatsheets/react)

### 函数组件的类型和属性

```jsx
import ReactDom from 'react-dom'
// 组件属性，可选属性，属性默认值
type Props = {name: string;age?: number;address: string }

const Hello = ({name,age,address = '外星'}: Props) => (
    <div>您好，我叫：{name}，我 {age} 岁了，我在{address}</div>
)
const App = () => (
  <div>
    <Hello name="rose" age={18} />
  </div>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 函数组件事件

```typescript
import ReactDom from 'react-dom'
// 组件属性，可选属性，属性默认值
type Props = {name: string;age?: number;address: string }

const Hello = ({name,age,address = '外星'}: Props) => (
    const onClick = (e:React.MouseEvent<HTMLButtonElement>) => {
    	console.log('赞！', e.currentTarget)
	}
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    	console.log(e.target.value)
  	}
    <div>
    	您好，我叫：{name}，我 {age} 岁了，我在{address}
		<button onClick={onClick}>点赞</button>
      	<input onChange={onChange} />	
	</div>
)
const App = () => (
  <div>
    <Hello name="rose" age={18} />
  </div>
)
ReactDOM.render(<App />, document.getElementById('root'))
```

### 类组件的类型

```jsx
import ReactDOM from 'react-dom'
import React from 'react'

type State = { count: number }
type Props = { message?: string }

// 无 props 无 state
class C1 extends React.Component {}
// 有 props 无 state
class C2 extends React.Component<Props> {}
// 无 props 有 state
class C3 extends React.Component<{}, State> {}
// 有 props、state
class C4 extends React.Component<Props, State> {}

const App = () => <div></div>

ReactDOM.render(<App />, document.getElementById('root'))
```

### 类组件的属性

```jsx
import ReactDOM from 'react-dom'
import React from 'react'

/**
 * class 组件：
 *
 * class 组件的属性和属性默认值
 */

type Props = { name: string; age?: number }
// class Hello extends React.Component<Props> {
//   // 提供属性的默认值
//   static defaultProps: Partial<Props> = {
//     age: 18
//   }

//   render() {
//     const { name, age } = this.props
//     return (
//       <div>
//         你好，我叫：{name}，我 {age} 岁了
//       </div>
//     )
//   }
// }

class Hello extends React.Component<Props> {
  render() {
    // 简化 class 组件的属性默认值
    const { name, age = 20 } = this.props
    return (
      <div>
        你好，我叫：{name}，我 {age} 岁了
      </div>
    )
  }
}

const App = () => (
  <div>
    <Hello name="rose" />
  </div>
)

ReactDOM.render(<App />, document.getElementById('root'))

```



