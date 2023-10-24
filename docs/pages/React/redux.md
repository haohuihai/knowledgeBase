### 只使用redux

安装包：

```
"react-redux": "^7.0.3",
"redux": "^4.0.1",
"redux-devtools-extension": "^2.13.8",
"redux-thunk": "^2.3.0"
```

创建redux目录

定义方法常量：

`sction-types.js`

```js
/*
包含n个action type常量名称的模块
 */
export const INCREMENT = 'increment'
export const DECREMENT = 'decrement'
```

定义`store`仓库

`store.js`

```js
/*
redux最核心的管理对象: store
 */
import {createStore} from 'redux'

import reducer from './reducer'

export default createStore(reducer) // 创建store对象内部会第一次调用reducer()得到初始状态值
```

创建具体操作函数

`action.js`

```js
/*
包含n个用来创建action的工厂函数(action creator)
 */
import {INCREMENT, DECREMENT} from './action-types'

/*
增加的action
 */
export const increment = number => ({type: INCREMENT, data: number})/*

减少的action
 */
export const decrement = number => ({type: DECREMENT, data: number})
```



连接页面和`store`

`reduces.js`

```js
/*
reducer函数模块: 根据当前state和指定action返回一个新的state
 */
import {INCREMENT, DECREMENT} from './action-types'

/*
管理count状态数据的reducer
 */
export default function count(state=1, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.data
    case DECREMENT:
      return state - action.data
    default:
      return state
  }

}
```

页面注入：

```html
ReactDOM.render(<App store={store}/>, document.getElementById('root'))
```





