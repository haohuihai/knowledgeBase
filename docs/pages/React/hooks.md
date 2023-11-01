>  以下案例默认已安装react，react-dom等依赖

## JSX的渲染方式

jsx语法创建虚拟dom渲染到页面上，可以通过两种方式

1. **ReactDOM.render()**

```jsx
//1.创建虚拟DOM
const VDOM = (
    <h1 id="title">
    	<span>Hello,React</span>
    </h1>
)
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM, document.getElementById('test'))
```

2. **React.createElement()**

```jsx
//1.创建虚拟DOM
const VDOM = React.createElement('h1', { id:'title' }, 
                                 React.createElement('span',{},'Hello,React'))
//2.渲染虚拟DOM到页面
ReactDOM.render(VDOM, document.getElementById('test'))
```

`createElement() `  这个API在React18 中已经过时了 的使用:

`createElement() `的目的是创建一个React元素， 可以传入一个组件，也可以传入 type、props 和 children来创建一个元素

关于JSX语法

```
1.定义虚拟DOM时，不要写引号。
2.标签中混入JS表达式时要用{}。
3.样式的类名指定不要用class，要用className。
4.内联样式，要用style={{key:value}}的形式去写。
5.只有一个根标签
6.标签必须闭合
7.标签首字母
    (1).若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错。
    (2).若大写字母开头，react就去渲染对应的组件，若组件没有定义，则报错。
```



**state**

### 函数组件

在函数组件中是不存在`this`的，函数组件中的`babel`开启了严格模式

```jsx
function Function(){
    return <div>我是类组件</div>
}

ReactDOM.render(<Function/>, document.getElementById('root'))
```

对于函数组件，`React.render`在执行之后，会去判断`<Function />`的类型。通过`typeof `来判断，是function类型，所以走函数组件的逻辑

### Props

对`Props`进行限制方式，设置类型，设置默认值

`Props`是单向流动，让父组件修改传给子组件，

类组件中，构造器是否接收`props`，是否传递给`super`，取决于：是否希望在构造器中通过`this`访问`props`，可以通过`super(props)`来接收



使用state的原因：

为什么不用变量：

在react中，变量不会触发页面重新渲染；

在函数组件内外定义变量的区别：

在下一次更新重新渲染子组件的时候，变量会被置为原来初始化的值；

在函数内定义的变量，修改后，由于其他原因，重新渲染后，修改后的变量会会到初始值；

在函数内定义的变量，修改后，由于其他原因，重新渲染，修改后的变量不会变为初始值


相同点： 
但两者都不会引发页面重新渲染；
函数内定义的变量在重新触发渲染后，会回到初始值
函数外定义的变量在重新触发渲染后，不会会到初始值


结论：

我们不能通过定义变量使页面重新渲染；

在Hooks里面存在一个API，useRef();

useRef()是定义在函数内的，useRef()定义的变量，在组件渲染后不会回到初始值，那这个和函数外定义的变量有什么区别？；

每当组件重新渲染时（例如当你设置 state 时），所有局部变量都会从头开始初始化

### 看看useRef的使用；

希望记住组件的某些信息，但不想触发组件的重新渲染，可以使用useRef();

用法；

```jsx

const ref = useRef(0)

```

useRef()函数返回的是一个对象；供ref使用；

```json
{
    current: 0 
}
```

对象中属性current的值为定义useRef时传递的参数，current可被读、写

现在，上面的例子ref指向的是一个数字，但我们可以指向任何值，包括组件，


> 当一条信息用于渲染时，将它保存在 state 中。当一条信息仅被事件处理器需要，并且更改它不需要重新渲染时，使用 ref 可能会更高效。


** 在渲染期间读取ref是不可靠的； **



使用场景：

1. 定义一个在渲染期间保留信息的情况(定时器、不需要渲染的某个标志、记录操作对象等)；
2. 获取DOM对象，用于操作DOM


react所遵循的原则：

不要在渲染过程中读取或写入 ref.current

这句话说明了，我们不要将ref用于渲染的数据，react不会监听ref变化处理，即React 不会关心你对 ref 或其内容做了什么。


（1）在使用到定时器时

```jsx
import { useState, useRef } from 'react';

export default function Stopwatch() {
  const [startTime, setStartTime] = useState(null);
  const [now, setNow] = useState(null);
  const intervalRef = useRef(null);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    clearInterval(intervalRef.current);

    // 保存当前定时器实例
    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    clearInterval(intervalRef.current);
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>时间过去了： {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        开始
      </button>
      <button onClick={handleStop}>
        停止
      </button>
    </>
  );
}

```

（2）来看看在操作DOM使用，我们指向一个标签，用于获取标签的DOM对象

再React中，我们要操作DOM，之前可以使用 `document.xxx`;

现在我们只需要`useRef()`指向dom元素,页面渲染的时候，

`props.onClick()` 是在父元素用于修改子元素dom设置的方法；

```jsx
import React from"react";

function Child(props) {
   const useRefChild = React.useRef('useRef初始值')
    
    const childChange = () => {
      props.onClick()
      useRefChild.current.style = 'color: red;'
    }
    console.log('useRefChild.current', useRefChild.current);

    return (
      <>
        <button onClick={childChange}>改标题</button>
        <h1 ref={useRefChild}>{props.name}</h1>
      </>
    );
}


export default React.memo(Child)

```

上面的方法能正常返回dom元素；


下面使用函数之外的常量来代替ref的使用；

```jsx
import React from"react";

let outerVar = {current: null};
function Child(props) {
  let innerVar = 40;

    const childChange = () => {
      innerVar = 200
      props.onClick()
      outerVar.current.style = 'color: red;'
    }

    console.log('outerVar: ',outerVar, 'innerVar:', innerVar);
    return (
      <>
        <button onClick={childChange}>改标题</button>
        <h1 ref={outerVar}>{props.name}</h1>
      </>
    );
}

export default Child;
```
可以看到，函数外的常量无论是基本数据，还是指向了dom，都可在组件重新渲染的时候保留信息

那么使用ref还说使用常量呢，经过测试；
两者在使用时没有太大的区别，但是我们应该使用useRef(),这事React官方提供的，在组件重新渲染期间保留数据的方式；

结论：

函数外的常量和ref  在定义变量时未发现不同的地方；

函数内定义常量是错误的，因为每次渲染后都会重置回去；

ref官方说是一种应急方案；

可以像使用state一样来使用ref

主要用于不触发渲染的场景

上面说了变量和useRef()的使用与区别；下面说说useState()及内部的原理；


### useState()






