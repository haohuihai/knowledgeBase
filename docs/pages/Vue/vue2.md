组件通信常用方式

props

eventbus

vuex

自定义事件

边界情况

​		$parent

​		$children

​		$root

​		$refs

​		provide/inject

​	非prop特性

​		$attrs

​		$listeners

**props**

父给子传值

```vue
// child 
props: { msg: String } 
// parent
<HelloWorld msg="Welcome to Your Vue.js App"/>
```

**自定义事件** 子给父传值

```vue
// child 
this.$emit('add', good) 
// parent 
<Cart @add="cartAdd($event)"></Cart>
```

**事件总线**

任意两个组件之间传值常用事件总线 或 vuex的方式

```js
// Bus：事件派发、监听和回调管理 
class Bus { 
    constructor(){ 
        this.callbacks = {} 
    }
    $on(name, fn){ 
        this.callbacks[name] = this.callbacks[name] || [] this.callbacks[name].push(fn) 
    }
    $emit(name, args){ 
        if(this.callbacks[name]){ 
            this.callbacks[name].forEach(cb => cb(args)) 
                                
        } 
    } 
}
// main.js 
Vue.prototype.$bus = new Bus() 
// child1 
this.$bus.$on('foo', handle) 
// child2 
this.$bus.$emit('foo')
```

**vuex**

创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更。

**$parent/$root**

兄弟组件之间通信可通过共同祖辈搭桥，$parent或$root。 

```js
// brother1 
this.$parent.$on('foo', handle) 
// brother2 
this.$parent.$emit('foo')
```

**$children**

父组件可以通过$children访问子组件实现父子通信。

```js
// parent 
this.$children[0].xx = 'xxx'
```

注意：$children不能保证子元素顺序

**$attrs/$listeners**

包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外)，并且可以通过 v- bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

```vue
// child：并未在props中声明foo 
<p>{{$attrs.foo}}</p> 
// parent 
<HelloWorld foo="foo"/>
```

**refs**

获取子节点引用

```vue
// parent 
<HelloWorld ref="hw"/> 
mounted() { 
    this.$refs.hw.xx = 'xxx' 
}
```

**provide/inject**

能够实现祖先和后代之间传值

```js
// ancestor 
provide() { 
    return {foo: 'foo'} 
}
// descendant 
inject: ['foo']
```

## **插槽**

插槽语法是Vue 实现的内容分发 API，用于复合组件开发。该技术在通用组件库开发中有大量应用。

**匿名插槽**

```vue
// comp1 
<div><slot></slot> </div> 
// parent 
<comp>hello</comp>
```

**具名插槽**

将内容分发到子组件指定位置

```vue
// comp2 
<div><slot></slot> <slot name="content"></slot> </div> 
// parent 
<Comp2>
    <!-- 默认插槽用default做参数 --> 
    <template v-slot:default>具名插槽</template> 
    <!-- 具名插槽用插槽名做参数 --> 
    <template v-slot:content>内容...</template> 
</Comp2>
```

**作用域插槽**

分发内容要用到子组件中的数据

```vue
// comp3 
<div><slot :foo="foo"></slot> </div> 
// parent 
<Comp3> 
    <!-- 把v-slot的值指定为作用域上下文对象 --> 
    <template v-slot:default="slotProps"> 来自子组件数据：{{slotProps.foo}} </template> 
</Comp3>
```

## 自定义表单事件

## **实现弹窗组件**