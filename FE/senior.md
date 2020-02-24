# 高级前端工程师面试题


### bind 函数实现

```js
Function.prototype.bind = function(oThis) {
  if (typeof this !== 'function') {
    throw new TypeError(`${this} is not callable`)
  }

  const arg = Array.prototype.slice(arguments, 1)
  const self = this
  const func = function() {}

  const bindFunc =  function () {
    // instanceof 为了防止 new 的时候报错
    return this.apply(this instanceof func ? self : oThis, arg.concat(arguments))
  }

  func.prototype = self.prototype
  bindFunc.prototype = new func()

  return bindFunc
}
```

### Call 函数实现
 
```js
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}

// 测试一下
var value = 2;

var obj = {
    value: 1
}

function bar(name, age) {
    console.log(this.value);
    return {
        value: this.value,
        name: name,
        age: age
    }
}

bar.call2(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
```

### apply的模拟实现

```js
Function.prototype.apply = function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}
```

### 微任务、宏任务与Event-Loop

- 宏任务: 一套任务
- 微任务
- EventLoop

#### 代码执行顺序

```js
setTimeout(_ => console.log(4))

new Promise(resolve => {
  resolve()
  console.log(1)
}).then(_ => {
  console.log(3)
})
```

`console.log(2)`

复制代码 `setTimeout` 就是作为宏任务来存在的，而 `Promise.then` 则是具有代表性的微任务，上述代码的执行顺序就是按照序号来输出的。
所有会进入的异步都是指的事件回调中的那部分代码
也就是说 `new Promise` 在实例化的过程中所执行的代码都是同步进行的，而 `then` 中注册的回调才是异步执行的。
在同步代码执行完成后才回去检查是否有异步任务完成，并执行对应的回调，而微任务又会在宏任务之前执行。
所以就得到了上述的输出结论`1、2、3、4`。

### Vue 与 React 的区别

#### 相似之处

- 创造前端富应用
- 只有框架骨架

#### 相同点

##### Virtual DOM

Vue2.0 与 React 都是用了 Virtual DOM

Virtual DOM 虚拟 DOM 树：改变真实的DOM状态远比改变一个 JavaScript 对象的开销大得多
Virtual DOM 映射真实DOM的 JavaScript 对象，当一项被加进这个虚拟DOM 对象时，一个函数会计算新旧VirtualDOM 之间的差异并反应在真实DOM上。计算差异的算法是高性能框架的秘密，React和 Vue 在这块的实践有所不同。

Vue 在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树
React 每当应用的状态被改变时，全部组件都会重新渲染。当然可以通过 shouldComponentUpdate 生命周期控制，vue 将此视为默认优化

如果应用中，大量UI需要不断变化，那么很适合Virtual DOM。但如果更新元素并不频繁，那么 VirtualDOM 并不一定适用，性能可能不如直接操纵 DOM

- 构建工具
- 配套框架
- Props
- 鼓励适用组件化

#### 主要区别

- 社区：React 的社区会大于 Vue
- 开发模式：React本身是严格的 View 层，MVC模式；Vue则是MVVM模式的一种实现方式。
- 数据绑定：Vue借鉴了 angular 采用双向数据绑定；React 则采用单向数据绑定
- 数据渲染：对于大规模数据渲染，React 要 高于 Vue一些，但是对于小轻量的，vue 的确更高效
- 数据更新
    - React
        - 手动添加 shouldComponentUpdate 来避免冗余 v-dom re-render 的情况
        - Components 尽可能使用 PureRenderMixin ，然后采用 Redux 结构 + Immutable.js
        


