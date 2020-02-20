# JS 面试题

### 写一个方法把下划线命名转换成大驼峰命名

```js
function toCamel(str) {
  str = str.replace(/(\w)/, (match, $1) => `${$1.toUpperCase()}`)
  while(str.match(/\w_\w/)) {
    str = str.replace(/(\w)(_)(\w)/, (match, $1, $2, $3) => `${$1}${$3.toUpperCase()}`)
  }
  return str
}
```

### 去掉字符串最后一个指定字符

```js
const removeLastTarget = (str, target) => {
  const tmpArr = str.split('')
  tmpArr.splice(str.lastIndexOf(target), target.length)
  return tmpArr.join()
}
```

方法二

```js
String.prototype.reverse = function () {
  return this.split('').reverse().join('')
}

String.prototype.removeFirstChar = function (m) {
    return this.replace(m, '')
}

const string = 'emamam, your string'
const removedChar = 'm'
string.reverse().removeFirstChar(removedChar).reverse()
```

### 闭包的作用

闭包是在某个作用域内定义的函数，它可以访问这个作用域内的所有变量。闭包作用域链通常包括三个部分：

- 函数本身作用域。
- 闭包定义时的作用域。
- 全局作用域。

闭包常见用途：

- 创建特权方法用于访问控制
- 事件处理程序及回调

### CSS3 新增伪类

- `:first-child` `:last-child` 表示子元素结构关系
- `:nth-child()` `:nth-last-child()` 用来控制奇数、偶数行的
- `:first-of-type` `:last-of-type` 表示一组兄弟元素中其类型的第一个元素
- `:nth-of-type` `:nth-last-of-type` 匹配那些在相同兄弟节点中的位置与模式
- `root` html跟元素
- `:not()` 否定选择器
- `:only-child` 只有一个子元素才会生效　
- `:empty` 选择连空格都没有的元素　

### Let 与 Var 的区别

- let 声明只在当前代码块内，var 的声明会被提升到全局中
- let 不可重复声明

##### 为什么 var 可以重复声明

编译器会对代码进行拆解，他会使用LHS 和 RHS 查询解析 = 左右两边的代码。当引擎执行 `var head = 2`的时候，他会首先执行 `var head` 声明变量，声明时会到作用域中查找是否有 `head` 这个变量，如果没有，则新建一个变量命名为 `head`。如果有，则将变量赋值为2
[参考](https://www.cnblogs.com/neil080320/p/6529679.html)

### CommonJS 中的 require/exports 和 ES6 中的 import/export 有何区别

- CommonJS 的 require 加载时执行，缓存本地，而import 在执行时执行，不会缓存
- CommonJS 的 module 代表整个模块，`module.exports` 代表模块的输出，所有在 require 的时候实际上 require 的是 module 的 exports 属性
    export 命令是对外的接口，必须与模块内部变量建立一对一关系。

### 一行代码实现数组去重　

```js
[...new Set([1,2,33,2,1,2,33])]
```

### 如何判断两个对象相等

1. 递归遍历
2. JSON.stringify

### 前端性能优化

- 算法优化
- CDN
- 图片压缩
- 使用浏览器缓存
- 图片懒加载
- 页面滚动加载
- JS、CSS、HTML 等文件压缩
- 开启web服务器的 gzip
- 使用 nginx 反向代理
- 减少 DOM 操作

### Object.defineProperty(obj, prop, descriptor)

- obj 对象
- prop 要定义活修改的属性的名称
- descriptor 将定义活修改的属性描述符

### Set 与 数组 的区别 

- 数组是有序的列表，Set 是无序的
- Set 成员值都是唯一的

Set中的对象引用都是强化类型，并不会允许垃圾回收，ES6中引入 WeakSet，允许从内存中清除不再需要的被这些集合所引用的对象。

### Set 和 Map  的区别

- Set 类似数组，不过他的所有成员值都是唯一的
- Map 类似对象，是键值对，但是键的范围不限于字符串，各种类型的值都可以作为键

### Object、Map 的区别

![Object、Map 的区别](../images/object-map.png)

### WeakMap 和 Map 的区别

- Map 的键可以是任意类型，而 WeakMap 的键只能是 对象类型
- WeakMap 不能包含无引用对象，如果没有引用，则会被垃圾回收立即清除
- WeakMap 对象不可枚举，无法获取大小

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

### JS 防抖和节流 debounce Throttle

Debounce 防抖：在事件最后一次触发 n 毫秒之内执行事件，不管事件曾被触发过多少次。
Throttle 节流：事件在第一次触发后 n 毫秒内，不论事件是否继续被触发，都执行。

- [参考](https://juejin.im/entry/59aacd04518825242c423fa0): 浅谈throttle以及debounce的原理和实现

#### 代码实现

```js
const base = function (fn, wait, debounce) {
  let timer
  return function() {
    let context = this, args = arguments
    if (debounce && timer) clearTimeout(timer)
    if (debounce || !timer) {
      timer = setTimeout(function () {
        timer = null
        fn.apply(context, args)
      }, wait)
    }
  }
}

const debounce = function (fn, wait) {
  base(fn, wait, true)
}

const throttle = function (fn, wait) {
  base(fn, wait, false)
}
```

### Promise 

##### 状态

- pending: 等待
- fulfilled：执行
- onRejected：拒绝

状态只在第一次修改时有效，之后状态 immutable

##### 基本过程

- 初始化一个Promise对象的时候，状态为pending，会立即执行传入的参数
- 传入的方法有两个参数  onFulfilled 和 onReject
- 执行 then 函数注册回调处理数组
- Promise 里的关键是必须保证，then方法传入的参数，必须在then方法被调用的那一轮事件循环之后的新执行栈中执行

#### 代码实现

##### 构造函数

```js
function Promise(fn) {
  this._state = 0
  this._value = null
  this._defereds = []

  try {
    fn(value => {
      resolve(this, value)
    }, reason => {
      reject(this, reason)
    })
  } catch(e) {
    reject(this, e)
  }
}
```

##### then 方法

- 实力化空的 `Promise` 对象用来返回
- 构造 `then(..)` 注册回调处理函数结构体
- 判断当前 `promise` 状态，`pending` 状态存储延迟处理对象 `deferred`，非 `pending` 状态执行 `onResolve` / `onReject` 回调

```js
Promise.prototype.then = function(onResolved, onRejected) {
  const res = new Promise(function() {})
  var deferred = new Handler(onResolved, onRejected, res)

  if (this._state === 0) {
    this._defereds.push(deferred)
    return res
  }

  handleResolved(this, deferred)
  return res
}
```

**QA: 为何要返回新的Promise 对象：因为在then 中会改变Promise的状态，但是Promise对象的状态应该是不可改变的**
- handleResolved： 根据当前 `Promise` 的状态，异步执行 `resolve` 活 `reject`

##### Handler 函数封装存储 `onResolved` `onRejected` 函数和新生成 `promise` 对象

```js
function Handler(onResolved, onRejected, promise) {
  this.onResolved = typeof onResolved === 'function' ? onResolved: null
  this.onRejected = typeof onRejected === 'function' ? onRejected: null
  this.promise = promise
}
```

##### Resolve 函数

resolve(promise, x)

- 如果 `Promise` 和 `x` 指向同一个对象，则忽略
- 如果 `x` 为 `Promise`，则使得 当前 `promise` 接受 `x` 的状态
- 如果 `then` 是函数，将 `x` 作为函数的作用域 `this` 调用
- 如果 `x` 不为对象或函数，以 `x` 为参数执行 `promise`

```js
function resolve(data) {
  function fn() {
    const { then } = data
    if (then && typeof then === 'function' ) {
      then.call()
    }
  }

  setTimeout(fn, 0)
}
```

### CommonJS / AMD / CMD / ES6

#### CommonJS

NodJS  是 CommonJS 规范的主要实践者，以同步的方式加载模块。在服务器端，模块文件都存在本地磁盘，读取非常快所以不会出问题。

四个重要变量对模块化提供支持:

- `module`: 代表模块
- `exports`：module.exports 代表模块输出
- `require`：引入模块
- `global`：全局

#### AMD 和 require.js

AMD 采用异步方式加载模块，模块的加载不影响它后面的语句运行，所有依赖与这个模块的语句都定义在一个回调函数中，等加载完成后，这个回调函数才会运行。

require.js 的 AMD 实现

- require.config() 指定引用路径
- define() 定义模块
- require() 引入模块
- require.config()

#### CMD 和 sea.js

CMD 是另一种js模块化方案，它与AMD很类似，不同点在于：AMD 推崇依赖前置、提前执行，CMD推崇依赖就近 、延迟执行。

```js
// AMD
define(['a', 'b', 'c'], function(a, b, c) {

})

//  CMD
define(function(require, exports, module) {
    var a = require('./a');
})
```

#### ES6 Module

ES6 在语言层面实现了模块功能，用起来非常简单，主要由两个命令构成 export 和 import

ES6  与 CommonJS 模块的差异

1. CommonJS输出 的 是值的拷贝 ES6 模块输出的是引用
2. CommonJS 模块是运行时加载，ES6是编译时输出接口


### ES6

#### ES6 在字符串层面做了哪些优化

1. 优化：增加了字符串模版 \`AA${aa}AA\`
2. 升级：增加了 inclouds() 方法及 startsWith endsWith padStart padEnd repeat

#### ES6 的 Proxy

Proxy 用来改变JS 默认的一些语言行为，包括拦截默认的 get/set 方法，使的 JS 的使用自由度更高

```js
function createMyOwnObj() {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {})
      })
    } 
  })
}

let myObj = createMyOwnObj()

myObj.hahaha.then(result => {
	console.log(result) //你的hahaha运气不错，成功了
}).catch(error => {
	console.log(error) //你的hahaha运气不行，失败了
})
``` 

#### ES6 的 Reflect

#### Iterator 是什么

Set/Map 不能使用 for 循环遍历，为了实现遍历，官方提供一个Iterator 接口

Iterator标准的具体实现是Iterator遍历器。Iterator标准规定，所有部署了key值为[Symbol.iterator]，且[Symbol.iterator]的value是标准的Iterator接口函数(标准的Iterator接口函数: 该函数必须返回一个对象，且对象中包含next方法，且执行next()能返回包含value/done属性的Iterator对象)的对象，都称之为可遍历对象，next()后返回的Iterator对象也就是Iterator遍历器。

```js
let obj = {
  data: ['hello', 'world'],
  [Symbol.iterator]() {
    const self = this
    let index = 0
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          }
        } else {
          return { value: undefined, done: true }
        } 
      } 
    }
  }
}
```

#### for...in 和 for...of 的区别

#### Class / extends 有什么用

ES6 的 class 可以看作只是一个 ES5生成实例对象的构造函数的语法糖，让对象原型写法更清晰，对象是梨花是一种面向对象编程。Class 类 可以通过 extends 实现继承。

- 类内部定义的所有方法都是不可枚举的
- ES6 的 class 类必须用 new 命令操作
- ES6 的 class 类不存在变量提升，必须先定义class 之后才能实例化
- ES5 的继承，实质是创造子类的实例对象 this，然后在将父类的属性和方法，加到this 上。ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面，（所以必须先调用super 方法），然后在用子类的构造函数修改 this
