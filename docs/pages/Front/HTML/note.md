## data属性

在一个dom元素里面可以添加/修改/删除data-开头的属性，而这个属性我们可以在CSS、JS中取用

```html
<div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth>
  John Doe
</div>
```

他的命名方式是：

在DOM元素上使用-分割`data`和用户自定义的属性，在操作是使用`dataset.`来分割用户后定义的属性

给设置的值永远是一个字符串`dom.dataId = null` 反映到dom上则是`dom.dataId = 'null'`

移除属性，可以使用`delete` ，`delete dataset.id`

设置或修改，我们使用`dataset.`的方式为操作属性值 eg: `dataset.id = 234`

获取值，我们使用`dataset.`的方式 ，eg: `dataset.id`

当除了`data`后面的`-`时，对于其他的`-`在获取或设置或删除时都需要使用驼峰式命名

eg：对上面的操作

```js
const el = document.querySelector('#user');

// el.id === 'user'
// el.dataset.id === '1234567890'
// el.dataset.user === 'johndoe'
// el.dataset.dateOfBirth === ''   驼峰命名

// 设置data属性
el.dataset.dateOfBirth = '1960-10-03';
// Result on JS: el.dataset.dateOfBirth === '1960-10-03'
// Result on HTML: <div id="user" data-id="1234567890" data-user="johndoe" data-date-of-birth="1960-10-03">John Doe</div>

delete el.dataset.dateOfBirth;
// Result on JS: el.dataset.dateOfBirth === undefined
// Result on HTML: <div id="user" data-id="1234567890" data-user="johndoe">John Doe</div>

// 查找是否存在某属性
if (!('someDataAttr' in el.dataset)) {
  el.dataset.someDataAttr = 'mydata';
  // Result on JS: 'someDataAttr' in el.dataset === true
  // Result on HTML: <div id="user" data-id="1234567890" data-user="johndoe" data-some-data-attr="mydata">John Doe</div>
}
```

### drag

`drag` 事件在用户拖动元素或选择的文本时，每隔几百毫秒就会被触发一次。