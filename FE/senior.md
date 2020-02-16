# 高级前端工程师面试题

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
