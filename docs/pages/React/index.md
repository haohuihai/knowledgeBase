## 组件拆分原则：

为什么拆分：

当一个功能在其他地方也有用到时，可将这个功能拆分为一个组件；


拆分使用react书写：
组件使用Hooks 来实现

拆分结果：
一个组件实现一项功能，数据流尽可能使用单项数据流

拆分原则：
虽然不能真正的实现高内聚和低耦合，但可以尽可能的去靠近
api层封装
view视图层封装
逻辑层封装

存在工具类可单独存放
使用propTypes  定义组件传参类型；
定义ref操作组件  暴露方法，父组件可通过方法操作组件数据

```js
static propTypes = {
    name: PropTypes.string
};

```

也可以使用 prop-types 这个库

后续操作：
写README,告诉使用者在使用组件时要注意的事项


## React捕获错误
主要对错误进行捕获:

如果存在错误，则可以显示错误的界面

在类组件中，有两个生命周期可以捕获react的错误，
搭配使用方式
```js
static getDerivedStateFromError(error){
    console.log('@@@',error);
    return {hasError:error}
}
componentDidCatch(){
    console.log('此处统计错误，反馈给服务器，用于通知编码人员进行bug的解决');
}
```

getDerivedStateFromError 是一个纯函数，有需要额外的副作用，可以在componentDidCatch里面操作，比如记录报错日志等信息；
getDerivedStateFromError 返回的是一个对象state， 会直接修改state中的属性值，不需要使用this.setState函数

这里面可以记录一些在上线后，追踪错误信息；

在函数组件中不提供这样的生命周期：

解决方案是自己编写ErrorBoundary组件，并在整个应用程序中使用，或者使用第三方库： react-error-boundary 

## props为什么是只读的

props存在于子父组件的情况下，被用来从父级向子级传递数据；

假如我们可以在子组件修改props，如果这个子组件存在多个地方，
那这个props变得不能维护，不确定是哪里修改了props，但其他地方的组件的props也变得不可预测；

修改props就会存在两个地方，父级和子级，这样导致了子组件的状态不可预测，即props的值不可预测，所以使用单向数据流的方式，在一个统一的地方去管理props


## 在hooks获取数据的方式

hooks中存在useEffect

这个生命周期相当于类组件的
compontDidMount, compontDidUpdate,  componentWillUnMount
```js
useEffect(() => {

    return () => {

    }
}, [])

```

所以可以在useEffect里面获取数据


## useMemo的使用

useMemo是用来缓存计算结果的，当这一次和上一次计算结果相同的时候是不会渲染组件的，



