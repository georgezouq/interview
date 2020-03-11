## VUE

### 对Vue 的理解

- 不完全的MVVM
- 双向数据绑定 Object.defineProperties + 发布订阅模式

- 优点
    - 低耦合
    - 可重用性
    - 可测试

### 什么是 MVVM

    MVVM Model-View-ViewModel 是一种设计思想，可以在Model 中定义数据修改和 操作的业务逻辑；View 代表 UI组件，他负责将数据模型转化成 UI 展现出来，ViewModel 是一个同步 View 和 Model 的对象。

- 在 MVVM 架构下，View 和 Model 之间并没有直接的联系，而是通过 ViewModel 进行交互，Model 和 ViewModel 之间的交互是双向的，因此 View 数据的变化会同步到 Model 中，而 Model 数据也会立即反应到 View 上。
- ViewModel 通过双向数据绑定把 View 层 和 Model 层链接了起来，而View 和 Model 之间的同步工作完全是自动的，无需人为干涉，因此开发者只需关注业务逻辑，不需要手动操作DOM，不需要关注数据状态的同步问题，负责的数据状态维护完全由 MVVM 来统一管理

### Vue 的优点是什么

- 低耦合
- 可重用性
- 可测试

### Vue 生命周期

- 创建前后：beforeCreate 阶段，vue实例的挂载元素 el 和 数据对象data 都为 undefined，还未初始化，在 created 阶段，vue实例的数据对象 data 有了，el 还没有
- 载入前后：在 beforeMount 阶段，vue 实例的 $el 和 data 都初始化来，但还是挂载之前为虚拟的dom节点，data.message 还未替换。在 mounted 阶段，vue 实例挂载完成，data.message 成功渲染
- 更新前后
- 销毁前后

- beforeCreated
- created
- beforeMounted
- mounted
- beforeDistory
- destory

### Vue 2 中 两个兄弟组件之间都有哪些通讯方式

- VUEX
- Event Hub

### vuex有哪几种属性？

有五种，分别是 State、 Getter、Mutation 、Action、 Module

- state：存储数据，存储状态；在根实例中注册了store 后，用 this.$store.state 来访问；对应vue里面的data；存放数据方式为响应式，vue组件从store中读取数据，如数据发生变化，组件也会对应的更新。
- getter：可以认为是 store 的计算属性，它的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。
- mutation：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
- action：包含任意异步操作，通过提交 mutation 间接更变状态。
- module：将 store 分割成模块，每个模块都具有state、mutation、action、getter、甚至是嵌套子模块。

### vuex的State特性是？

一、Vuex就是一个仓库，仓库里面放了很多对象。其中state就是数据源存放地，对应于与一般Vue对象里面的data

二、state里面存放的数据是响应式的，Vue组件从store中读取数据，若是store中的数据发生改变，依赖这个数据的组件也会发生更新

三、它通过mapState把全局的 state 和 getters 映射到当前组件的 computed 计算属性中

### vuex的Getter特性是？

一、getters 可以对State进行计算操作，它就是Store的计算属性

二、 虽然在组件内也可以做计算属性，但是getters 可以在多组件之间复用

三、 如果一个状态只在一个组件内使用，是可以不用getters

### vuex的Mutation特性是？

一、Action 类似于 mutation，不同在于：

二、Action 提交的是 mutation，而不是直接变更状态。

三、Action 可以包含任意异步操作

### Vue.js中ajax请求代码应该写在组件的methods中还是vuex的actions中？

一、如果请求来的数据是不是要被其他组件公用，仅仅在请求的组件内使用，就不需要放入vuex 的state里。

二、如果被其他地方复用，这个很大几率上是需要的，如果需要，请将请求放入action里，方便复用，并包装成promise返回，在调用处用async await处理返回的数据。如果不要复用这个请求，那么直接写在vue文件里很方便。

### 不用Vuex会带来什么问题？

一、可维护性会下降，你要想修改数据，你得维护三个地方

二、可读性会下降，因为一个组件里的数据，你根本就看不出来是从哪来的

三、增加耦合，大量的上传派发，会让耦合性大大的增加，本来Vue用Component就是为了减少耦合，现在这么用，和组件化的初衷相背。

### Vue 双向绑定的实现原理

通过　`Object.defineProperty` 实现对象的 get 和 set 方法实现数据劫持。结合 `发布 / 订阅者模式` 实现。

```js
var Book = {}
var name = '';
Object.defineProperty(Book, 'name', {
  set: function (value) {
    name = value;
    console.log('你取了一个书名叫做' + value);
  },
  get: function () {
    return '《' + name + '》'
  }
})
 
Book.name = 'vue权威指南';  // 你取了一个书名叫做vue权威指南
console.log(Book.name);  // 《vue权威指南》
```

- 监听器 Observer：劫持并坚挺所有属性，如果有变动，通知订阅者
- 订阅者 Watcher： 可以收到属性的变化通知，并执行相应的函数，从而更新视图
- 解析器 Compile ：可以扫描和解析每个节点的相关指令，并根据初始化模版数据以及初始化相应的订阅器

##### 实现双向数据绑定

- 在页面元素 `button` 中绑定 `{{count}}`
- 在编译过程是，针对这个 `button` 会产生一个 `Watcher(vm, exp, cb(newValue,oldValue))`，vm 是 `Vue` 对象，`exp` 是数据绑定的数据；cb 的逻辑是用来更新页面
- 实现发布订阅模式，Watcher初始化的时候会将 Dep.target 设置为this，也就是watcher自己，同时会触发 count 的 getter 方法，getter里面会调用 Dep 的 depend 方法，depend 方法会调用 Watcher 的 addDep 方法，addDep 方法就是将 Watcher 自己存放在 Dep 的事件池里面。


### Vue 核心原理

- 响应式： 数据变化监听和双向数据绑定
- 模版引擎：如何解析模版
- 渲染： Vue 如何将监听到的数据变化和解析后的 HTML 进行渲染

### 双向绑定 Proxy 比 definedProperty

##### 实现双向绑定的方法：

- KnockoutJS 观察者模式的双向绑定
- Ember 基于数据模型的双向绑定
- Angular 基于脏检查的双向绑定
- Vue defineProperties 和 Proxy

##### 数据劫持实现双向数据绑定

```jsx harmony
// 遍历对象,对其属性值进行劫持
Object.keys(data).forEach(function(key) {
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function() {
      console.log('get');
    },
    set: function(newVal) {
      // 当属性值发生变化时我们可以进行额外操作
      console.log(`大家好,我系${newVal}`);
      say(newVal);
    },
  });
});
```

优势

1. 无需显示调用
2. 可精确得知变化数据

##### 实现思路

1、 利用 Proxy 和 Object.defineProperty 生成的 Observer 针对对象/对象属性进行劫持，在属性发生变化后通知订阅者
2、 解析器 Compile 解析模版中的 Directive 指令，收集指令所依赖的方法和数据，等待数据变化然后进行渲染
3、 Watcher 属于 Observer 和 Compile 的桥梁，他将接收到的 Observer 产生的数据变化，并根据 Compile 提供的指令进行视图渲染，使得数据变化促使视图变化

##### definedProperty 的缺陷

- Object.definedProperty 无法实现对数据元素修改的监听，Vue 之前的版本是重写了 数组的 push、pop、shift、unshift、splice、sort、reverse 方法，但是 `vm.items[index] = newValue` 这种是无法监测的。Proxy 可以
- Object definedProperty 只能劫持对象的属性，那么我们需要对每个对象的每个属性进行遍历，如果属性值也是对象则需要深度遍历

##### Proxy 的 特点

Proxy 在ES6 中被提出，他在目标对象之间架设了一层`拦截`，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

- Proxy 可以直接监听对象而非属性

```jsx harmony
const input = document.getElementById('input');
const p = document.getElementById('p');
const obj = {};

const newObj = new Proxy(obj, {
  get: function(target, key, receiver) {
    console.log(`getting ${key}!`);
    return Reflect.get(target, key, receiver);
  },
  set: function(target, key, value, receiver) {
    console.log(target, key, value, receiver);
    if (key === 'text') {
      input.value = value;
      p.innerHTML = value;
    }
    return Reflect.set(target, key, value, receiver);
  },
});

input.addEventListener('keyup', function(e) {
  newObj.text = e.target.value;
});
```

- Proxy 可以直接监听数组的变化

```jsx harmony
let obj = { a: 1, b: 2, c: [1,2,3, {d:1, t:2}] }

let newProxy = new Proxy(obj, { 
  get: (target, key, receiver) => {
    console.log('get'); 
    return Reflect.get(target, key, receiver) 
  }, 
  set: (target, key, value, receiver) => { 
    console.log(target, key, value, receiver); return Reflect.set(target, key, value, receiver); } 
})
```
