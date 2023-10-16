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

React生命周期

