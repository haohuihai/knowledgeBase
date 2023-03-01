# JavaScript的6种继承方式

**在面向对象的编程里面，继承也是很重要的一部分**
对于继承：A对象通过继承B对象，就可以直接拥有B对象的所有属性和方法，用于代码的复用，提升开发效率。

## 一、原型链的继承

原型链是比较常见的一种继承，其中涉及的构造函数、原型和实例，三者之间存在着一定的关系；
每一个构造函数都有一个原型对象（prototype），原型对象又包含一个指向构造函数的指针`__proto__`，而实例，包含一个原型对象的执政。
先来了解几个关键词：构造函数、实例对象、原型对象

```javascript
function Animal(){	//构造函数（Animal）
    this.name = 'cat';
}
//每一个构造函数都有一个原型对象(prototype)
//可以打印一下看看这个原型对象里面都是什么
console.log(Animal.prototype)//{constructor: ƒ}一个简单的constructor函数
Animal.prototype.color = 'white';
var cat1 = new Animal();//通过new关键字，可以生成一个实例对象，该实例对象默认继承Animal的所有属性和方法，包括原型对象上的属性和方法
console.log(cat1.name);//"cat"
console.log(cat1.color);//"white"
//（1）如果在Animal里面有color属性，那么会输出prototype中的属性还是Animal中的
//在Animal里面定义一个color
function Animal(){
    this.name = 'cat';
    this.color = 'black';
}
console.log(cat1.color)//此时会输出"black"
//（2）如果在实例对象里面定义了color属性，这时访问的时哪个里面的属性呢
cat1.color = 'black and white';
console.log(cat1.color);//此时会输出"black and white"
//总结（1）：当实例对象访问一个属性的时候，它首先会在自身查找有没有color属性，没有继续查找，谁new出的它现在谁上查找，找不到在谁的原型对象上查找。


//在定义一个实例对象cat2
var cat2 = new Animal();
console.log(cat2.name)//此时也会输出cat，这个很正常
console.log(cat2.color)//结果是"black"，自身没有，在Animal里面查找，
//此时在对象原型里面定义一个属性age
Animal.prototype.age = 15;
console.log(cat1.age);//15
console.log(cat2.age);//15
//然后cat2修改这个age
cat2.__proto__.age = 10;
//cat2和cat1访问
console.log(cat1.age);//10
console.log(cat2.age);//10
//总结（2）当实例对象本身没有某个属性或方法的时候，它会到原型对象去寻找该属性或方法。原型对象上添加一个age属性， 所有实例对象都共享了该属性。
//原型对象的作用，就是定义所有实例对象共享的属性和方法。这也是它被称为原型对象的原因，而实例对象可以视作从原型对象衍生出来的子对象。---阮一峰老师的总结
//这里有一个__proto__，打印一下看看
console.log(cat2.__proto == Animal.prototype)//true
//可以看到他是指向Animal.prototype

```

**回到继承**
看下面的例子

```javascript
  function Parent1() {
    this.name = 'parent1';
    this.play = [1, 2, 3]
  }
  function Child2() {
    this.type = 'child2';
  }
  Child2.prototype = new Parent1();
  console.log(new Child2());

  var s1 = new Child2();
  var s2 = new Child2();
  s1.play.push(4);
  console.log(s1.play, s2.play);
//当两个实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化，这就是使用原型链继承方式的一个缺点。
```

## 二、构造函数继承（借助call）


```javascript
function Parent1(){
    this.name = 'parent1';
  }

  Parent1.prototype.getName = function () {
    return this.name;
  }

  function Child1(){
    Parent1.call(this);
    this.type = 'child1'
  }

  let child = new Child1();
  console.log(child);  // 没问题
//Child1 {name: "parent1", type: "child1"}
//	name:"parent1"
//	type:"child1"
  console.log(child.getName());  // 会报错-->child.getName is not a function
```

child 在控制台显示，除了 Child 1 的属性 type 之外，也继承了 Parent 1 的属性 name。这样写的时候子类虽然能够拿到父类的属性值，解决了第一种继承方式的弊端，但问题是，父类原型对象中一旦存在父类之前自己定义的方法，那么子类将无法继承这些方法。
**总结：**构造函数实现继承的优缺点，它使父类的引用属性不会被共享，优化了第一种继承方式的弊端；
缺点：只能继承父类的实例属性和方法，不能继承原型属性或者方法。

## 第三种：组合继承（前两种组合）

```javascript
 		function Parent3(){
 			this.name = 'parent3';
 			this.play = [1,2,3];

 		}
 		Parent3.prototype.getName = function (){
 			return this.name
 		}
 		// Parent3:{
 		// 	this.name = 'parent3';
 		// 	this.play = [1,2,3];
 		// 	prototype:{
 		// 		getName:function(){
 		// 			return name;
 		// 		}
 		// 	}
 		// }
 		function Child3(){
            //第二次调用
 			Parent3.call(this);
 			this.type = 'child3'
 		}
 		//Parent3.call(this);//操作后打印原型对象是如下结果
 		// Child3:{
 		// 	this.name = 'parent3',
 		// 	this.play = [1,2,3],
 			
 		// 	this.type = 'child3',
 		// }
 		// 这里在Parent3.prototype上定义的getName方法并没有被赋上去
 		// prototype:{
 		// 		getName:function(){
 		// 			return name;
 		// 		}
 		// 	},
		//第一次调用
 		Child3.prototype = new Parent3();
 		Child3.prototype.constructor = Child3;
 		// console.log(new Child3());
 		var s3 = new Child3();
 		var s4 = new Child3();
 		s3.play.push(4);
 		console.log(s3.play, s4.play);  // 不互相影响
 	 	console.log(s3.getName()); // 正常输出'parent3'
  		console.log(s4.getName()); // 正常输出'parent3'
```

## 第四种：原型式继承

这里提到的就是 ES5 里面的 Object.create 方法，这个方法接收两个参数：一是用作新对象原型的对象、二是为新对象定义额外属性的对象（可选参数）。

```javascript
	let parent4 = {
			name:'parent4',
			friends: ["p1", "p2", "p3"],
		    getName: function() {
		      return this.name;
		    }
		}
		let person4 = Object.create(parent4);
		person4.name = "tom";
 		person4.friends.push("jerry");

 		let person5 = Object.create(parent4);
  		person5.friends.push("lucy");
  		console.log(person4.name);//tom
		console.log(person4.name === person4.getName());//true
		console.log(person5.name);//parent4
		console.log(person4.friends);//["p1","p2","p3","jerry","lucy"]
		console.log(person5.friends);//["p1","p2","p3","jerry","lucy"]
```

## 五、寄生式继承

使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，添加一些方法，这样的继承方式就叫作寄生式继承。其优缺点和原型式继承一样，但是对于普通对象的继承方式来说，寄生式继承相比于原型式继承，还是在父类基础上添加了更多的方法。

```javascript
let parent5 = {
    name: "parent5",
    friends: ["p1", "p2", "p3"],
    getName: function() {
      return this.name;
    }
  };

  function clone(original) {
    let clone = Object.create(original);
    clone.getFriends = function() {
      return this.friends;
    };
    return clone;
  }

  let person5 = clone(parent5);

  console.log(person5.getName());//parent5
  console.log(person5.getFriends());//["p1", "p2", "p3"]
```

person5 通过 clone 的方法，增加了 getFriends 的方法，从而使 person5 这个普通对象在继承过程中又增加了一个方法，这样的继承方式就是寄生式继承。

## 六、寄生组合式继承

解决普通对象的继承问题的 Object.create 方法，在前面这几种继承方式的优缺点基础上进行改造，得出了寄生组合式的继承方式，这也是所有继承方式里面相对最优的继承方式，代码如下。

```javascript
  function clone (parent, child) {
    // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  }

  function Parent6() {
    this.name = 'parent6';
    this.play = [1, 2, 3];
  }
   Parent6.prototype.getName = function () {
    return this.name;
  }
  function Child6() {
    Parent6.call(this);
    this.friends = 'child5';
  }

  clone(Parent6, Child6);

  Child6.prototype.getFriends = function () {
    return this.friends;
  }

  let person6 = new Child6();
  console.log(person6);//Child6 {name: "parent6", play: Array(3), friends: "child5"}
  console.log(person6.getName());//parent6
  console.log(person6.getFriends());//child5
```

种寄生组合式继承方式，基本可以解决前几种继承方式的缺点，较好地实现了继承想要的结果，同时也减少了构造次数，减少了性能的开销。可以看到 person6 打印出来的结果，属性都得到了继承，方法也没问题，可以输出预期的结果。

## ES6 的 extends 关键字实现逻辑

```javascript
class Person {
  constructor(name) {
    this.name = name
  }
  // 原型方法
  // 即 Person.prototype.getName = function() { }
  // 下面可以简写为 getName() {...}
  getName = function () {
    console.log('Person:', this.name)
  }
}
class Gamer extends Person {
  constructor(name, age) {
    // 子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    super(name)
    this.age = age
  }
}
const asuna = new Gamer('Asuna', 20)
asuna.getName() // 成功访问到父类的方法
```











