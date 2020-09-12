# 高级 / 资深前端面试

## 前端组件库设计原则

* 颗粒度考量：单一职能可以是的组件可以复用，但是太过于追求单一职能又会导致组件库过于零碎，上手成本高，我们可以考虑适当的单一职能+组件分层解决这个问题。
* 通用性考量：一般将组件分为 UI组件和业务组件，其中业务组件如果只是在一个项目中可能用到的特殊业务就不适合放到组件库中。
* 技术选型：选择团队熟悉并且在当前项目组应用的技术栈
  * CSS框架：Less、Sass 和 StyledComponent
  * JS框架：Typescript 方便实现 ClassComponent 并且对数据结构可控
  * 打包工具：Webpack
  * 代码检测：TSLint Airbnb
  * Commit 规范：Angular 团队规范
  * 测试框架：Jest
  * 持续继承：Gitlab CI
  * 快速启动脚手架：create-vue-app

## Redux 和 Vuex 的深度区别

* Redux 三大原则：
  * 单一数据源（一个 Redux 应用只有一个 store），也是单向数据流 
  * state 只读
  * 使用纯函数（Reducer）来修改 state
* Vuex 三大原则：
  * 应用层级的状态应该集中到单个 store 对象中
  * 提交 mutation 是改变状态的唯一方法，并且这个过程是同步的
  * 异步逻辑都应该封装到 action 中

#### 异步操作

* Redux 得益于中间件机制，利用 redux-thunk，可以将异步逻辑放到 `action creator` 中，通过 `action creator` 做一个控制反转，给 `action creator` 传入 `dispatch` 作为参数，就可以 `dispatch action` 了。 
* Vuex 是用 `mutation` 来对应 `Redux` 的 `action`，另外 `Vuex` 创造来一个 `action` 方法来提交 `mutation`，在 action方法中执行异步操作，获取结果后通过提交 `mutation` 来实现 `state` 的修改。

参考：[Redux 和 Vuex 的对比](https://juejin.im/post/5d6a6997e51d4561a54b69f6)

## Redux-Thunk

redux-thunk 可以 dispatch 函数，这个函数用于生成 action，所以在这个函数李 我们可以进行异步 操作，等异步的结果出来后在放到 action 里面将这个 action 用 dispatch 出去。 原本通过 dispatch 来分发 action，现在是异步 action 即 action creator 掌握了控制权调用 dispatch，所以叫做控制反转。

## 微任务、宏任务与Event-Loop

* 宏任务: 一套任务
* 微任务
* EventLoop

### 代码执行顺序

```javascript
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})
```

`console.log(2)`

复制代码 `setTimeout` 就是作为宏任务来存在的，而 `Promise.then` 则是具有代表性的微任务，上述代码的执行顺序就是按照序号来输出的。 所有会进入的异步都是指的事件回调中的那部分代码 也就是说 `new Promise` 在实例化的过程中所执行的代码都是同步进行的，而 `then` 中注册的回调才是异步执行的。 在同步代码执行完成后才回去检查是否有异步任务完成，并执行对应的回调，而微任务又会在宏任务之前执行。 所以就得到了上述的输出结论`1、2、3、4`。

## Vue 与 React 的区别

### 相似之处

* 创造前端富应用
* 只有框架骨架

### 相同点

#### Virtual DOM

Vue2.0 与 React 都是用了 Virtual DOM

Virtual DOM 虚拟 DOM 树：改变真实的DOM状态远比改变一个 JavaScript 对象的开销大得多 Virtual DOM 映射真实DOM的 JavaScript 对象，当一项被加进这个虚拟DOM 对象时，一个函数会计算新旧VirtualDOM 之间的差异并反应在真实DOM上。计算差异的算法是高性能框架的秘密，React和 Vue 在这块的实践有所不同。

Vue 在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树 React 每当应用的状态被改变时，全部组件都会重新渲染。当然可以通过 shouldComponentUpdate 生命周期控制，vue 将此视为默认优化

如果应用中，大量UI需要不断变化，那么很适合Virtual DOM。但如果更新元素并不频繁，那么 VirtualDOM 并不一定适用，性能可能不如直接操纵 DOM

* 构建工具
* 配套框架
* Props
* 鼓励适用组件化

### 主要区别

* 社区：React 的社区会大于 Vue
* 开发模式：React本身是严格的 View 层，MVC模式；Vue则是MVVM模式的一种实现方式。
* 数据绑定：Vue借鉴了 angular 采用双向数据绑定；React 则采用单向数据绑定
* 数据渲染：对于大规模数据渲染，React 要 高于 Vue一些，但是对于小轻量的，vue 的确更高效
* 数据更新
  * React
    * 手动添加 shouldComponentUpdate 来避免冗余 v-dom re-render 的情况
    * Components 尽可能使用 PureRenderMixin ，然后采用 Redux 结构 + Immutable.js

