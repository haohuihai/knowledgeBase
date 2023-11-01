### 类组件

自定义类组件是继承React的Component或PureComponent

通过类组件调用一个render函数，返回自定义标签

```jsx
class Parent extends React.Component {
    render() {
        return <div>我是类组件</div>
    }
}
ReactDOM.render(<Parent />, document.getElementById('root'))
```

这里面用到了`this`，这里的`this`是`Parent`上的实例对象

而`render`是`Parent`原型对象上的

这里在执行`ReactDOM.render`后会去判断是否存在`isCureComponent`参数，存在就是类组件

在类组件中，渲染到页面上的变量，通过`state`对象来定义，修改时使用`setState()`来修改


###  setState()更新状态的2种写法

```
1). setState(updater, [callback]),
    updater为返回stateChange对象的函数: (state, props) => stateChange
    接收的state和props被保证为最新的

2). setState(stateChange, [callback])
    stateChange为对象,
    callback是可选的回调函数, 在状态更新且界面更新后才执行
```

对象方式是函数方式的简写方式

```
如果新状态不依赖于原状态 ===> 使用对象方式
如果新状态依赖于原状态 ===> 使用函数方式
如果需要在setState()后获取最新的状态数据, 在第二个callback函数中读取
```

```jsx
class A extends React.Component {

    state = {
        count: 1
    }

test1 = () => {
    this.setState(state => ({count: state.count + 1}))
    console.log('test1 setState()之后', this.state.count)
}

test2 = () => {
    this.setState({
        count: 3
    })
    console.log('test2 setState()之后', this.state.count)
}

test3 = () => {
    // 在状态更新且界面更新之后回调
    this.setState(state => ({count: state.count + 1}), () => { 
        console.log('test3 setState callback()', this.state.count)
    })
    // 也可以使用下面的写法
     this.setState({count: this.state.count + 1}, () => {
         console.log('test3 setState callback()', this.state.count)
     })
}

render() {
    console.log('A render()')
    return (
        <div>
            <h1>A组件: {this.state.count}</h1>
            <button onClick={this.test1}>A 测试1</button>&nbsp;&nbsp;
            <button onClick={this.test2}>A 测试2</button>&nbsp;&nbsp;
            <button onClick={this.test3}>A 测试3</button>&nbsp;&nbsp;
        </div>
    )
}
}
```

### setState的同步和异步问题

```
  setState()更新状态是异步还是同步的?
      1). 执行setState()的位置?
          在react控制的回调函数中: 生命周期勾子 / react事件监听回调
          非react控制的异步回调函数中: 定时器回调 / 原生事件监听回调 / promise回调 /...
      2). 异步 OR 同步?
          react相关回调中: 异步
          其它异步回调中: 同步

   关于异步的setState()
      1). 多次调用, 如何处理?
          setState({}): 合并更新一次状态, 只调用一次render()更新界面 ---状态更新和界面更新都合并了
          setState(fn): 更新多次状态, 但只调用一次render()更新界面  ---状态更新没有合并, 但界面更新合并了
      2). 如何得到异步更新后的状态数据?
          在setState()的callback回调函数中
```

```jsx
class StateTest extends React.Component {

    state = {
        count: 0,
    }

/*
     react事件监听回调中, setState()是异步更新状态
     */
update1 = () => {

    // 这种方的状态没有被合并，所以count的状态会执行 +1  3次， 页面渲染为合并3次后的值
    console.log('update1 setState()之前', this.state.count)
    this.setState(state => ({count: state.count + 1}))
    console.log('update1 setState()之后', this.state.count)
}

/*
     react生命周期勾子中, setState()是异步更新状态
     */
componentWillMount () {
    console.log('componentWillMount setState()之前', this.state.count)
    this.setState(state => ({count: state.count + 1}))
    console.log('componentWillMount setState()之后', this.state.count)
    
    
  const btn1 = document.getElementById('native-event');
  btn1.addEventListener('click', this.nativeCallback);
}
componentDidMount () {
    console.log('componentDidMount setState()之前', this.state.count)
    this.setState(state => ({count: state.count + 1}))
    console.log('componentDidMount setState()之后', this.state.count)
}

// 原生事件
nativeCallback = () => {
  // s1 s2 s3 都是 1
  const { s1, s2, s3 } = this.state;
  this.setState({ s1: s1 + 1 });
  console.log('after setState s1:', this.state.s1);
  // 输出 2  render 页面渲染 3 次
  this.setState({ s2: s2 + 1 });
  this.setState({ s3: s3 + 1 });
};
/*
    定时器回调 / 原生事件监听回调 / promise回调 /...
     */
update2 = () => {
    setTimeout(() => {
        console.log('setTimeout setState()之前', this.state.count)
        this.setState(state => ({count: state.count + 1}))
        // 页面渲染后执行下面的内容
        console.log('setTimeout setState()之后', this.state.count)
    })
}
update4 = () => {
    Promise.resolve().then(value => {
        console.log('Promise setState()之前', this.state.count)
        this.setState(state => ({count: state.count + 1}))
        // 页面渲染后执行下面的内容
        console.log('Promise setState()之后', this.state.count)
    })
}


update5 = () => {

    console.log('onclick setState()之前', this.state.count)
    this.setState(state => ({count: state.count + 1}))
    console.log('onclick setState()之后', this.state.count)

    console.log('onclick setState()之前2', this.state.count)
    this.setState(state => ({count: state.count + 1}))
    console.log('onclick setState()之后2', this.state.count)

    // 最终渲染的值为上面多次执行后的结果，如果count起始为3  最后执行完页面渲染的值为5
}

update6 = () => {
    console.log('onclick setState()之前', this.state.count)
    this.setState({count: this.state.count + 1})
    console.log('onclick setState()之后', this.state.count)


    console.log('onclick setState()之前2', this.state.count)
    this.setState({count: this.state.count + 1})
    console.log('onclick setState()之后2', this.state.count)

    // 最终渲染的值为合并为一个后执行的值，如果count起始为3  最后执行完页面渲染的值为4
}

update7 = () => {
    console.log('onclick setState()之前', this.state.count)
    this.setState({count: this.state.count + 1})
    console.log('onclick setState()之后', this.state.count)

    console.log('onclick setState()之前2', this.state.count)
    this.setState(state => ({count: state.count + 1}))
    console.log('onclick setState()之后2', this.state.count)

    // 执行多次处理 如果初始值为3，最后渲染的页面值为5
}


render() {
    const {count} = this.state
    console.log('render()', count)
    return (
        <div>
            <h2 ref='count'>{count}</h2>
            <button onClick={this.update1}>更新1</button> ---
            <button onClick={this.update2}>更新2</button> &nbsp;
            <button onClick={this.update4}>更新4</button> ---
            <button onClick={this.update5}>更新5</button> &nbsp;
            <button onClick={this.update6}>更新6</button> &nbsp;
            <button onClick={this.update7}>更新7</button> &nbsp;
        </div>
    )
}
}
```

test

```jsx
class StateTest extends React.Component {

    state = {
        count: 0,
    }

componentDidMount() {
    this.setState({count: this.state.count + 1})
    this.setState({count: this.state.count + 1})
    console.log(this.state.count) // 2 ==> 0

    this.setState(state => ({count: state.count + 1}))
    this.setState(state => ({count: state.count + 1}))
    console.log(this.state.count) // 3 ==> 0

    setTimeout(() => {
        this.setState({count: this.state.count + 1})
        console.log('timeout', this.state.count) // 10 ==> 6

        this.setState({count: this.state.count + 1})
        console.log('timeout', this.state.count) // 12 ==> 7
    }, 0)

    Promise.resolve().then(value => {
        this.setState({count: this.state.count + 1})
        console.log('promise', this.state.count)  // 6 ==>4

        this.setState({count: this.state.count + 1})
        console.log('promise', this.state.count) // 8 ==> 5
    })
}

render() {
    const count = this.state.count
    console.log('render', count)  // 1 ==> 0   4 ==>3   5 ==>4  7 ==>5  9 ==>6  11 ==>7
    return (
        <div>
            <p>{count}</p>
        </div>
    )
}
}
```

### Component和PureComponent

```
  1. Component存在的问题?
      1). 父组件重新render(), 当前组件也会重新执行render(), 即使没有任何变化
      2). 当前组件setState(), 重新执行render(), 即使state没有任何变化

  2. 解决Component存在的问题
      1). 原因: 组件的componentShouldUpdate()默认返回true, 即使数据没有变化render()都会重新执行
      2). 办法1: 重写shouldComponentUpdate(), 判断如果数据有变化返回true, 否则返回false
      3). 办法2: 使用PureComponent代替Component
      4). 说明: 一般都使用PureComponent来优化组件性能

  3. PureComponent的基本原理
      1). 重写实现shouldComponentUpdate()
      2). 对组件的新/旧state和props中的数据进行浅比较, 如果都没有变化, 返回false, 否则返回true
      3). 一旦componentShouldUpdate()返回false不再执行用于更新的render()

  4. 面试题:
      组件的哪个生命周期勾子能实现组件优化?
      PureComponent的原理?
      区别Component与PureComponent?
```

### Key

```
 面试题:
      1). react/vue中的key的作用/内部原理
      2). 为什么列表的key尽量不要用index

   1. 虚拟DOM的key的作用?
      1). 简单的说: key是虚拟DOM对象的标识, 在更新显示时key起着极其重要的作用
      2). 详细的说: 当列表数组中的数据发生变化生成新的虚拟DOM后, React进行新旧虚拟DOM的diff比较
          a. key没有变
              item数据没变, 直接使用原来的真实DOM
              item数据变了, 对原来的真实DOM进行数据更新
          b. key变了
              销毁原来的真实DOM, 根据item数据创建新的真实DOM显示(即使item数据没有变)

   2. key为index的问题
      1). 添加/删除/排序 => 产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低
      2). 如果item界面还有输入框 => 产生错误的真实DOM更新 ==> 界面有问题
      注意: 如果不存在添加/删除/排序操作, 用index没有问题

   3. 解决:
      使用item数据的标识数据作为key, 比如id属性值

   4. 什么时候可以用index作为key
      不能有: 添加/删除/排序
      可以有: 更新元素内部的数据
```

### 组件的实例

1. 字符串形式

```jsx
class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=>{
        const {input1} = this.refs
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        const {input2} = this.refs
        alert(input2.value)
    }
    render(){
        return(
            <div>
                <input ref="input1" type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input ref="input2" onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>
            </div>
        )
    }
}
```

2. 回调函数

```jsx
class Demo extends React.Component{
    //展示左侧输入框的数据
    showData = ()=>{
        const {input1} = this
        alert(input1.value)
    }
    //展示右侧输入框的数据
    showData2 = ()=>{
        const {input2} = this
        alert(input2.value)
    }
    render(){
        return(
            <div>
                <input ref={c => this.input1 = c } type="text" placeholder="点击按钮提示数据"/>&nbsp;
                <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
                <input onBlur={this.showData2} ref={c => this.input2 = c } type="text" placeholder="失去焦点提示数据"/>&nbsp;
            </div>
        )
    }
}
```

3. ref中回调执行次数的问题

```jsx
class Demo extends React.Component{

    state = {isHot:false}

    showInfo = ()=>{
        const {input1} = this
        alert(input1.value)
    }

    changeWeather = ()=>{
        //获取原来的状态
        const {isHot} = this.state
        //更新状态
        this.setState({isHot:!isHot})
    }

    saveInput = (c)=>{
        this.input1 = c;
        console.log('@',c);
    }

	render(){
        const {isHot} = this.state
        return(
            <div>
                <h2>今天天气很{isHot ? '炎热':'凉爽'}</h2>
                {/*<input ref={(c)=>{this.input1 = c;console.log('@',c);}} type="text"/><br/><br/>*/}
                <input ref={this.saveInput} type="text"/><br/><br/>
                <button onClick={this.showInfo}>点我提示输入的数据</button>
                <button onClick={this.changeWeather}>点我切换天气</button>
            </div>
        )
	}
}
```

4. createRef的使用

```jsx
class Demo extends React.Component{
    /* 
				React.createRef调用后可以返回一个容器，该容器可以存储被ref所标识的节点,该容器是“专人专用”的
			 */
myRef = React.createRef()
myRef2 = React.createRef()
//展示左侧输入框的数据
showData = ()=>{
    alert(this.myRef.current.value);
}
//展示右侧输入框的数据
showData2 = ()=>{
    // alert();\this.myRef2.current.value
    this.myRef2.current.value = ''
}
render(){
    return(
        <div>
            <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
            <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
            <input onBlur={this.showData2} ref={this.myRef2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
        </div>
    )
}
}
```

### React的事件处理

```jsx
//创建组件
class Demo extends React.Component{
/* 
(1).通过onXxx属性指定事件处理函数(注意大小写)
	a.React使用的是自定义(合成)事件, 而不是使用的原生DOM事件 —————— 为了更好的兼容性
	b.React中的事件是通过事件委托方式处理的(委托给组件最外层的元素) ————————为了的高效
(2).通过event.target得到发生事件的DOM元素对象 ——————————不要过度使用ref
*/
    
    
//创建ref容器
myRef = React.createRef()
myRef2 = React.createRef()

//展示左侧输入框的数据
showData = (event)=>{
    console.log(event.target);
    alert(this.myRef.current.value);
}

//展示右侧输入框的数据
showData2 = (event)=>{
    alert(event.target.value);
}

render(){
    return(
        <div>
            <input ref={this.myRef} type="text" placeholder="点击按钮提示数据"/>&nbsp;
            <button onClick={this.showData}>点我提示左侧的数据</button>&nbsp;
            <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据"/>&nbsp;
        </div>
    )
}
}
```

## React表单中的受控和非受控

在React官网：

如果一个 `input` 表单元素的值是由 `React `控制，就其称为*受控组件*。当用户将数据输入到受控组件时，会触发修改状态的事件处理器，这时由你的代码来决定此输入是否有效（如果有效就使用更新后的值重新渲染）。如果不重新渲染，则表单元素将保持不变。

一个*非受控组件*，就像是运行在 `React` 体系之外的表单元素。当用户将数据输入到表单字段（例如 input，dropdown 等）时，`React `不需要做任何事情就可以映射更新后的信息。然而，这也意味着，你无法强制给这个表单字段设置一个特定值。

在大多数情况下，你应该使用受控组件。

**非受控组件**

```jsx
//创建组件
class Login extends React.Component{
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this
        alert(`你输入的用户名是：${username.value},你输入的密码是：${password.value}`)
    }
    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input ref={c => this.username = c} type="text" name="username"/>
                密码：<input ref={c => this.password = c} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
```

**受控组件**

```jsx
class Login extends React.Component{

    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

    //保存用户名到状态中
    saveUsername = (event)=>{
        this.setState({username:event.target.value})
    }

    //保存密码到状态中
    savePassword = (event)=>{
        this.setState({password:event.target.value})
    }

    //表单提交的回调
    handleSubmit = (event)=>{
        event.preventDefault() //阻止表单提交
        const {username,password} = this.state
        alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                用户名：<input onChange={this.saveUsername} type="text" name="username"/>
                密码：<input onChange={this.savePassword} type="password" name="password"/>
                <button>登录</button>
            </form>
        )
    }
}
```

### 高阶函数

高阶函数：如果一个函数符合下面2个规范中的任何一个，那该函数就是高阶函数。

​         1.若A函数，接收的参数是一个函数，那么A就可以称之为高阶函数。

​         2.若A函数，调用的返回值依然是一个函数，那么A就可以称之为高阶函数。

​         常见的高阶函数有：Promise、setTimeout、arr.map()等等

### 函数柯里化

函数的柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。 

```javascript
function sum(a){
    return(b)=>{
        return (c)=>{
            return a+b+c
        }
    }
}
```
使用高阶函数-函数柯里化

```jsx
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

//保存表单数据到状态中
saveFormData = (dataType)=>{
    return (event)=>{
        this.setState({[dataType]:event.target.value})
    }
}

//表单提交的回调
handleSubmit = (event)=>{
    event.preventDefault() //阻止表单提交
    const {username,password} = this.state
    alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
}
render(){
    return(
        <form onSubmit={this.handleSubmit}>
            用户名：<input onChange={this.saveFormData('username')} type="text" name="username"/>
            密码：<input onChange={this.saveFormData('password')} type="password" name="password"/>
            <button>登录</button>
        </form>
    )
}
}
```

不使用高阶函数实现方式

```jsx
//创建组件
class Login extends React.Component{
    //初始化状态
    state = {
        username:'', //用户名
        password:'' //密码
    }

//保存表单数据到状态中
saveFormData = (dataType,event)=>{
    this.setState({[dataType]:event.target.value})
}

//表单提交的回调
handleSubmit = (event)=>{
    event.preventDefault() //阻止表单提交
    const {username,password} = this.state
    alert(`你输入的用户名是：${username},你输入的密码是：${password}`)
}
render(){
    return(
        <form onSubmit={this.handleSubmit}>
            用户名：<input onChange={event => this.saveFormData('username',event) } type="text" name="username"/>
            密码：<input onChange={event => this.saveFormData('password',event) } type="password" name="password"/>
            <button>登录</button>
        </form>
    )
}
}
```