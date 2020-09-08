/**
 * Class 的 Promise 实现
 * 来源: https://mp.weixin.qq.com/s/ZfvNBfeK--Vvd1eW3yvdfQ
 */
(function (window) {
  const PENDDING = 'pendding';
  const FULFILLED = 'fulfilled';
  const REJECTED = 'rejected';
  // 定义MyPromise
  class MyPromise {
    constructor(executor) {
      const self = this;
      self.status = PENDDING;
      self.data = undefined;
      self.callbacks = [];

      function resolve(value) {
        if (self.status !== PENDDING) return;
        self.status = FULFILLED;
        self.data = value;
        // 立即执行异步回调函数
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value);
          })
        })
      }

      function reject(reason) {
        if (self.status !== PENDDING) return;
        self.status = REJECTED;
        self.data = reason;
        setTimeout(() => {
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason);
          })
        })
      }
      executor(resolve, reject)
    }
    // MyPromise原型链上存在then方法
    then(onResolved, onRejected) {
      const self = this;
      // 定义默认回调
      onResolved = typeof onResolved === "function" ? onResolved : value => value;
      onRejected = typeof onRejected === "function" ? onRejected : reason => {
        throw reason
      };
      return new MyPromise((resolve, reject) => { // 每次都返回一个新的Promise对象
        function handle(callback) {
          /*
              1、返回的Promise的结果是由onResolved/onrejected决定的
              2、返回的是Promise对象 (根据执结果决定Promise的返回结果)
              3、返回的不是Promise对象 (该值就是Promise的返回结果)
              4、抛出异常 异常的值为返回的结果
          */
          try {
            const result = callback(self.data);
            if (reject instanceof MyPromise) {
              result.then(value => {
                resolve(value);
              }, reason => {
                reject(reason);
              })
            } else {
              resolve(result);
            }

          } catch (error) {
            reject(error);
          }
        }
        // 首先判断当前状态
        if (self.status === FULFILLED) {
          setTimeout(() => {
            handle(onResolved)
          });

        } else if (self.status === REJECTED) {
          setTimeout(() => {
            handle(onRejected)
          });

        } else if (self.status === PENDDING) {
          self.callbacks.push({
            onResolved() {
              handle(onResolved)
            },
            onRejected() {
              handle(onRejected)
            }
          })
        }
      })
    }
    //MyPromise原型链上存在catch方法
    catch (onRejected) {
      return this.then(null, onRejected);
    }
    //MyPromise实例对象上存在resolve方法
    static resolve(value) {
      if (value instanceof MyPromise) return value;
      return new MyPromise(resolve => resolve(value)) // 返回一个resolved状态的Promise对象
    }
    //MyPromise实例对象上存在reject方法
    static reject(reason) {
      return new MyPromise((resolve, reject) => reject(reason)); // 返回一个reject状态Promise对象
    }
    //MyPromise实例对象上存在all方法
    static all(promises) {
      let promisesCount = 0
      let values = new Array(promises.length);
      return new MyPromise((resolve, reject) => {
        promises.forEach((promise, index) => {
          MyPromise.resolve(promise).then(value => {
            promisesCount++;
            values[index] = value;
            if (promisesCount === promises.length) {
              resolve(values);
            }
          }, reason => {
            reject(reason);
          })
        })
      })
    }
    //MyPromise实例对象上存在race方法
    static race(promises) {
      return new MyPromise((resolve, reject) => {
        promises.forEach(promise => {
          MyPromise.resolve(promise).then(value => {
            resolve(value);
          }, reason => {
            reject(reason)
          })
        })
      })
    }
  }
  window.MyPromise = MyPromise;
})(window)
