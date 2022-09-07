Vue3常用API

Vue3的API是通过vue导入进行使用的

## setup和defineComponent

setup函数是处于 生命周期函数 beforeCreate 和 Created 两个钩子函数之间的函数

setup函数是 Composition API（组合API）的入口

在setup函数中定义的变量和方法最后都是需要 return 出去的 不然无法再模板中使用

由于在执行 setup函数的时候，还没有执行 Created 生命周期方法，所以在 setup 函数中，无法使用 data 和 methods 的变量和方法

由于我们不能在 setup函数中使用 data 和 methods，所以 Vue 为了避免我们错误的使用，直接将 setup函数中的this修改成了 undefined

setup函数只能是同步的不能是异步的

```vue
<script lang="ts">
    // defineComponent函数,目的是定义一个组件,内部可以传入一个配置对象
    import { defineComponent } from 'vue'

    // 暴露出去一个定义好的组件
    export default defineComponent({
        // 当前组件的名字是App
        name: 'App',
        // setup是组合API中第一个要使用的函数
        setup(){
            const number =10
            return {
                number
            }
        }
    })
</script>
```

上面的组件中用defineComponent包裹了组件;
defineComponent函数，只是对setup函数进行封装，返回options的对象；
defineComponent在TypeScript下，给予了组件 正确的参数类型推断 。
defineComponent 可以接受显式的自定义 props 接口或从属性验证对象中自动推断
defineComponent 可以正确适配无 props、数组 props 等形式
引入 defineComponent() 以正确推断 setup() 组件的参数类型

## ref

ref是一个函数,作用:定义一个响应式的数据,返回的是一个Ref对象,对象中有一个value属性,如果需要对数据进行操作,需要使用该Ref对象调用value属性的方式进行数据的操作

html模版中是不需要使用.value属性的写法

一般用来定义一个基本类型的响应式数据

count 的类型 Ref类型

```vue
<template>
  <h3>{{ count }}</h3>
  <button @click="updateCount">更新数据</button>
</template>
<script>
    import { defineComponent, ref } from 'vue'
    export default defineComponent({
        name: 'App',
        setup(){
            const count = ref(0)
            function updateCount(){
                count.value++
            }
            return {
                count,
                updateCount
            }
        }
    })
</script>
```

## reactive

定义多个数据的响应式

const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象

 响应式转换是“深层的”：会影响对象内部所有嵌套的属性

 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的

```vue
<template>
    <h2>reactive的使用</h2>
    <h3>名字:{{ user.name }}</h3>
    <h3>年龄:{{ user.age }}</h3>
    <h3>性别:{{ user.gender }}</h3>
    <h3>媳妇:{{ user.wife }}</h3>
    <hr />
    <button @click="updateUser">更新数据</button>
</template>

<script lang="ts">
    import { defineComponent, reactive } from 'vue'
    export default defineComponent({
        name: 'App',
        setup() {
            const obj = {
                name: '小明',
                age: 20,
                wife: {
                    name: '小甜甜',
                    age: 18,
                    cars: ['奔驰', '宝马', '奥迪'],
                },
            }
            // user---->代理对象,user---->目标对象
            // user对象的类型是Proxy
            const user = reactive<any>(obj)
            console.log(user)

            const updateUser = () => {
                //使用代理对象的方式来更新数据(响应式数据)
                // user.wife.cars[0] = '玛莎拉蒂'
                // 	我们操作目标对象（obj）是不会引起页面更新渲染的
                obj.gender = '男' // 这种方式,界面没有更新渲染
                user.gender = '男' // 这种方式,界面可以更新渲染,而且这个数据最终也添加到了obj对象上了
            }
            return {
                user,
                updateUser,
            }
        },
    })
</script>

```

如果操作代理对象,目标对象中的数据也会随之变化,同时如果想要在操作数据的时候,界面也要跟着重新更新渲染,那么也是操作代理对象

## 响应式数据的原理Proxy

vue3的响应式是通过Proxy来代理的；

```vue
<script type="text/javascript">
    // 目标对象
    const user = {
        name: '佐助',
        age: 20,
        wife: {
            name: '小樱',
            age: 19
        }
    }
    // 把目标对象变成代理对象
    // 参数1:user---->target目标对象
    // 参数2:handler---->处理器对象,用来监视数据,及数据的操作
    const proxyUser = new Proxy(user, {
        // 获取目标对象的某个属性值
        get(target, prop) {
            console.log('get方法调用了')
            return Reflect.get(target, prop)
        },
        // 修改目标对象的属性值/为目标对象添加新的属性
        set(target, prop, val) {
            console.log('set方法调用了')
            return Reflect.set(target, prop, val)
        },
        // 删除目标对象上的某个属性
        deleteProperty(target, prop) {
            console.log('delete方法调用了')
            return Reflect.deleteProperty(target,prop)
        }
    })

    // 通过代理对象获取目标对象中的某个属性值
    console.log(proxyUser.name)
    // 通过代理对象更新目标对象上的某个属性值
    proxyUser.name = '鸣人'
    console.log(user)
    // 通过代理对象向目标对象中添加一个新的属性
    proxyUser.gender = '男'
    console.log(user)
    delete proxyUser.name
    console.log(user)
    // 更新目标对象中的某个属性对象中的属性值
    proxyUser.wife.name = '雏田'
    console.log(user)

</script>
```

## setup的细节问题

Child

```vue
<template>
  <h2>Child子级组件</h2>
  <h3>msg:{{ msg }}</h3>
  <!-- <h3>count:{{ count }}</h3> -->
  <button @click="emitXxx">分发事件</button>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'Child',
  props: ['msg'],
  // setup细节问题:
  // setup是在beforeCreate生命周期回调之前就执行了,而且就执行一次
  // 由此可以推断出:setup在执行的时候,当前的组件还没有创建出来,也就意味着:组件实例对象this根本就不能用
  // this是undefined,说明,就不能通过this再去调用data/computed/methods/props中的相关内容了
  // 其实所有的composition API相关回调函数中也都不可以

  // setup中的返回值是一个对象,内部的属性和方法是给html模版使用的
  // setup中的对象内部的属性和data函数中的return对象的属性都可以在html模版中使用
  // setup中的对象中的属性和data函数中的对象中的属性会合并为组件对象的属性
  // setup中的对象中的方法和methods对象中的方法会合并为组件对象的方法
  // 在Vue3中尽量不要混合的使用data和setup及methods和setup
  // 一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
  // setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据
  // beforeCreate() {
  //   console.log('beforeCreate执行了')
  // },
  // 界面渲染完毕
  // mounted() {},

  // setup(props,context) {
  setup(props, { attrs, slots, emit }) {
    // props参数,是一个对象,里面有父级组件向子级组件传递的数据,并且是在子级组件中使用props接收到的所有的属性
    // 包含props配置声明且传入了的所有属性的对象
    // console.log(props.msg)
    // console.log(context.attrs)
    // console.log(context.emit)
    // context参数,是一个对象,里面有attrs对象(获取当前组件标签上的所有的属性的对象,但是该属性是在props中没有声明接收的所有的尚需经的对象),emit方法(分发事件的),slots对象(插槽)
    // 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
    // console.log(context.attrs.msg2)
    // console.log('=============')
    console.log('setup执行了', this)

    const showMsg1 = () => {
      console.log('setup中的showMsg1方法')
    }
    // 按钮的点击事件的回调函数
    function emitXxx() {
      // context.emit('xxx','++')
      emit('xxx', '++')
    }
    return {
      showMsg1,
      emitXxx,
      // setup中一般都是返回一个对象,对象中的属性和方法都可以在html模版中直接使用
    }
  },
  // data() {
  //   return {
  //     count: 10,
  //   }
  // },
  // // 界面渲染后的生命周期回调
  // mounted() {
  //   console.log(this)
  // },
  // // 方法的
  // methods: {
  //   showMsg2() {
  //     console.log('methods中的showMsg方法')
  //   },
  // },
})
</script>
```

App

```vue
<template>
  <h2>App父级组件</h2>
  <h3>msg:{{ msg }}</h3>
  <button @click="msg += '==='">更新数据</button>
  <hr />
  <Child :msg="msg" msg2="真香" @xxx="xxx" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
// 引入子级组件Child
import Child from './components/Child.vue'
export default defineComponent({
  name: 'App',
  // 注册组件
  components: {
    Child,
  },

  setup() {
    // 定义一个Ref类型的数据
    const msg = ref('what are you no sha lei')
    function xxx(txt: string) {
      msg.value += txt
    }
    return {
      msg,
      xxx,
    }
  },
})
</script>
```

## ref和reactive的区别

```vue
<template>
  <h2>reactive和ref的细节问题</h2>
  <h3>m1:{{ m1 }}</h3>
  <h3>m2:{{ m2 }}</h3>
  <h3>m3:{{ m3 }}</h3>
  <hr />
  <button @click="update">更新数据</button>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
export default defineComponent({
  name: 'App',
    // 是Vue3的 composition API中2个最重要的响应式API(ref和reactive)
    // ref用来处理基本类型数据, reactive用来处理对象(递归深度响应式)
    // 如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
    // ref内部: 通过给value属性添加getter/setter来实现对数据的劫持
    // reactive内部: 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
    // ref的数据操作: 在js中要.value, 在模板中不需要(内部解析模板时会自动添加.value)

  setup() {
    // 通过ref的方式设置的数据
    const m1 = ref('abc')
    const m2 = reactive({
      name: '小明',
      wife: {
        name: '小红',
      },
    })
    // ref也可以传入对象吗
    const m3 = ref({
      name: '小明',
      wife: {
        name: '小红',
      },
    })
    // 更新数据
    const update = () => {
      // ref中如果放入的是一个对象,那么是经过了reactive的处理,形成了一个Proxy类型的对象
      console.log(m3)
      m1.value += '==='
      m2.wife.name += '==='
      // m3.value.name += '==='
      m3.value.wife.name += '==='
      console.log(m3.value.wife)
    }
    return {
      m1,
      m2,
      m3,
      update,
    }
  },
})
</script>
```



## watch和watchEffect

```vue
<template>
  <h2>计算属性和监视</h2>
  <fieldset>
    <legend>姓名操作</legend>
    姓氏:<input
      type="text"
      placeholder="请输入姓氏"
      v-model="user.firstName"
    /><br />
    名字:<input
      type="text"
      placeholder="请输入名字"
      v-model="user.lastName"
    /><br />
  </fieldset>
  <fieldset>
    <legend>计算属性和监视的演示</legend>
    姓名:<input type="text" placeholder="显示姓名" v-model="fullName1" /><br />
    姓名:<input type="text" placeholder="显示姓名" v-model="fullName2" /><br />
    姓名:<input type="text" placeholder="显示姓名" v-model="fullName3" /><br />
  </fieldset>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  watch,
  ref,
  watchEffect,
} from 'vue'
export default defineComponent({
  name: 'App',
  setup() {
    // 定义一个响应式对象
    const user = reactive({
      // 姓氏
      firstName: '东方',
      // 名字
      lastName: '不败',
    })
    // 通过计算属性的方式,实现第一个姓名的显示
    // vue3中的计算属性
    // 计算属性的函数中如果只传入一个回调函数,表示的是get

    // 第一个姓名:
    // 返回的是一个Ref类型的对象
    const fullName1 = computed(() => {
      return user.firstName + '_' + user.lastName
    })
    // 第二个姓名:
    const fullName2 = computed({
      get() {
        return user.firstName + '_' + user.lastName
      },
      set(val: string) {
        // console.log('=====',val)
        const names = val.split('_')
        user.firstName = names[0]
        user.lastName = names[1]
      },
    })

    // 第三个姓名:
    const fullName3 = ref('')
    // 监视----监视指定的数据
    watch(
      user,
      ({ firstName, lastName }) => {
        fullName3.value = firstName + '_' + lastName
      },
      { immediate: true, deep: true }
    )
    // immediate 默认会执行一次watch,deep 深度监视

    // 监视,不需要配置immediate,本身默认就会进行监视,(默认执行一次)
    // watchEffect(() => {
    //   fullName3.value = user.firstName + '_' + user.lastName
    // })

    // 监视fullName3的数据,改变firstName和lastName
    watchEffect(() => {
      const names = fullName3.value.split('_')
      user.firstName = names[0]
      user.lastName = names[1]
    })

    // watch---可以监视多个数据的
    // watch([user.firstName,user.lastName,fullName3],()=>{
    //   // 这里的代码就没有执行,fullName3是响应式的数据,但是,user.firstName,user.lastName不是响应式的数据
    //   console.log('====')
    // })
    // 当我们使用watch监视非响应式的数据的时候,代码需要改一下
    watch([()=>user.firstName, ()=>user.lastName,fullName3], () => {
      // 这里的代码就没有执行,fullName3是响应式的数据,但是,user.firstName,user.lastName不是响应式的数据
      console.log('====')
    })

    return {
      user,
      fullName1,
      fullName2,
      fullName3,
    }
  },
})
</script>
```



## 生命周期

child

```vue
<template>
  <h2>Child子级组件</h2>
  <h4>msg:{{ msg }}</h4>
  <button @click="update">更新数据</button>
</template>
<script lang="ts">
import { defineComponent, ref,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted } from 'vue'
export default defineComponent({
  name: 'Child',
  // vue2.x中的生命周期钩子
  beforeCreate() {
    console.log('2.x中的beforeCreate...')
  },
  created() {
    console.log('2.x中的created...')
  },
  beforeMount() {
    console.log('2.x中的beforeMount...')
  },
  mounted() {
    console.log('2.x中的mounted...')
  },
  beforeUpdate() {
    console.log('2.x中的beforeUpdate...')
  },
  updated() {
    console.log('2.x中的updated...')
  },
  // vue2.x中的beforeDestroy和destroyed这两个生命周期回调已经在vue3中改名了,所以,不能再使用了
  beforeUnmount() {
    console.log('2.x中的beforeUnmount...')
  },
  unmounted() {
    console.log('2.x中的unmounted...')
  },

  setup() {
    console.log('3.0中的setup')
    // 响应式的数据
    const msg = ref('abc')
    // 按钮点击事件的回调
    const update = () => {
      msg.value += '==='
    }
    onBeforeMount(()=>{
      console.log('3.0中的onBeforeMount')
    })
    onMounted(()=>{
      console.log('3.0中的onMounted')
    })
    onBeforeUpdate(()=>{
      console.log('3.0中的onBeforeUpdate')
    })
    onUpdated(()=>{
       console.log('3.0中的onUpdated')
    })
    onBeforeUnmount(()=>{
       console.log('3.0中的onBeforeUnmount')
    })
    onUnmounted(()=>{
       console.log('3.0中的onUnmounted')
    })



    return {
      msg,
      update,
    }
  },
})
</script>
```

App

```vue
<template>
  <h2>App父级组件</h2>
  <button @click="isShow = !isShow">切换显示</button>
  <hr />
  <Child v-if="isShow" />
</template>
<script lang="ts">
// 引入子级组件Child
import Child from './components/Child.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'App',
  // 注册组件
  components: {
    Child,
  },
  setup() {
    const isShow = ref(true)
    return {
      isShow,
    }
  },
})
</script>
```



## 自定义hook

hooks/useMousePosition.ts

```js
import { onBeforeUnmount, onMounted, ref } from 'vue'
export default function () {
  const x = ref(-1)
  const y = ref(-1)

  // 点击事件的回调函数
  const clickHandler = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  }
  // 页面已经加载完毕了,再进行点击的操作
  // 页面加载完毕的生命周期组合API
  onMounted(() => {
    window.addEventListener('click', clickHandler)
  })
  // 页面卸载之前的生命周期组合API
  onBeforeUnmount(() => {
    window.removeEventListener('click', clickHandler)
  })
  return {
    x,
    y
  }
}
```



hooks/useRequest.ts

```js
import { ref } from 'vue';
// 引入axios
import axios from 'axios'
// 发送ajax的请求
export default function <T>(url: string) {
  // 加载的状态
  const loading = ref(true)
  // 请求成功的数据
  const data = ref<T | null>(null) // 坑
  // 错误信息
  const errorMsg = ref('')
  // 发送请求
  axios.get(url).then(response => {
    // 改变加载状态
    loading.value = false
    data.value = response.data
  }).catch(error => {
    // 改变加载状态
    loading.value = false
    errorMsg.value = error.message || '未知错误'

  })
  return {
    loading,
    data,
    errorMsg
  }
}
```



App

```vue
<template>
  <h2>自定义hook函数操作</h2>
  <h2>x:{{ x }},y:{{ y }}</h2>
  <h3 v-if="loading">正在加载中....</h3>
  <h3 v-else-if="errorMsg">错误信息:{{ errorMsg }}</h3>
  <ul v-else>
    <li>id:{{ data.id }}</li>
    <li>address:{{ data.address }}</li>
    <li>distance:{{ data.distance }}</li>
  </ul>
  <hr />
  <!--数组数据-->
  <ul v-for="item in data" :key="item.id">
    <li>id:{{ item.id }}</li>
    <li>title:{{ item.title }}</li>
    <li>price:{{ item.price }}</li>
  </ul>
</template>
<script lang="ts">
import { defineComponent, watch } from 'vue'
import useMousePosition from './hooks/useMousePosition'
import useRequest from './hooks/useRequest'

// 定义接口,约束对象的类型
interface AddressData {
  id: number;
  address: string;
  distance: string;
}

interface ProductsData {
  id: string;
  title: string;
  price: number;
}
export default defineComponent({
  name: 'App',
  // 需求1:用户在页面中点击页面,把点击的位置的横纵坐标收集起来并展示出来

  setup() {
    const { x, y } = useMousePosition()
    // 发送请求
    // const { loading, data, errorMsg } = useRequest<AddressData>('/data/address.json') // 获取对象数据
    const { loading, data, errorMsg } = useRequest<ProductsData[]>(
      '/data/products.json'
    ) // 获取数组数据

    // 监视
    watch(data, () => {
      if (data.value) {
        console.log(data.value.length)
      }
    })
    return {
      x,
      y,
      loading,
      data,
      errorMsg,
    }
  },
})
</script>
```

## toRefs

```vue
<template>
  <h2>toRefs的使用</h2>
  <!-- <h3>name:{{ state.name }}</h3>
  <h3>age:{{ state.age }}</h3> -->

  <h3>name:{{ name }}</h3>
  <h3>age:{{ age }}</h3>

  <h3>name2:{{ name2 }}</h3>
  <h3>age2:{{ age2 }}</h3>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

function useFeatureX() {
  const state = reactive({
    name2: '自来也',
    age2: 47,
  })
  return {
    ...toRefs(state),
  }
}
export default defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      name: '自来也',
      age: 47,
    })
    // toRefs可以把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
    // const state2 = toRefs(state)
    const { name, age } = toRefs(state)
    // console.log(state2)
    // 定时器,更新数据,(如果数据变化了,界面也会随之变化,肯定是响应式的数据)
    setInterval(() => {
      // state.name += '=='
      // state2.name.value+='==='
      name.value += '==='
      console.log('======')
    }, 1000)

    const { name2, age2 } = useFeatureX()
    return {
      // state,
      // 下面的方式不行啊
      // ...state // 不是响应式的数据了---->{name:'自来也',age:47}
      // ...state2  toRefs返回来的对象
      name,
      age,
      name2,
      age2,
    }
  },
})
</script>
```



## ref获取页面元素

```vue
<template>
  <h2>ref的另一个作用:可以获取页面中的元素</h2>
  <input type="text" ref="inputRef" />
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
export default defineComponent({
  name: 'App',

  // 需求:当页面加载完毕后,页面中的文本框可以直接获取焦点(自动获取焦点)

  setup() {
    // 默认是空的,页面加载完毕,说明组件已经存在了,获取文本框元素
    const inputRef = ref<HTMLElement | null>(null)
    // 页面加载后的生命周期组合API
    onMounted(() => {
      inputRef.value && inputRef.value.focus() // 自动获取焦点
    })
    return {
      inputRef,
    }
  },
})
</script>
```



## shallowReactive 和shallowRef

## readonly和shallowReadonly

## toRef

## customRef

## Fragment

## Teleport

## Suspense

