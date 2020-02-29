const Pending = 'pending'
const Fulfilled  = 'fulfilled'
const Rejected  = 'rejected'

/***
 * Promise 三大法宝
 *
 * 回调函数延迟绑定、回调返回值穿透、错误冒泡
 *
 * @param fn
 * @constructor
 */

function MyPromise(fn) {
  if (!fn) throw new TypeError('Promise resolver undefined is not a function')

  this._state = Pending
  this.value = null
  this.fullfillCallback = []
  this.rejectCallback = []
  const that = this

  function resolve(data) {
    setTimeout(() => {
      if (this._state === Pending) that._state = Fulfilled
      this.value = data

      that.fullfillCallback.forEach((full) => {
        const res = full.call(that, this.value)
        const isPromise = res instanceof MyPromise
        if (res && isPromise) {
          res.resolve.prototype = this.resolve
          return
        }

        if (res) this.value = res
      })
    })
  }

  function reject(error) {
    setTimeout(() => {
      that._state = Rejected
      that.rejectCallback.map((full) => full.call(that, error))
    })
  }

  this.resolve = resolve
  this.reject = reject

  try {
    fn(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  const self = this

  if (!onFulfilled) onFulfilled = value => value
  if (!onRejected) onRejected = error => { throw error }

  switch (this._state) {
    case Pending:
      return new MyPromise((resolve, reject) => {
        this.fullfillCallback.push(() => {
          try {
            const res = onFulfilled(self.value)
            resolve(res)
          } catch(e) {
            reject(e)
          }
        })

        onRejected && this.rejectCallback.push((e) => {
          try {
            const res = onRejected(e)
            resolve(res)
          } catch(newError) {
            reject(newError)
          }
        })
      })
    case Fulfilled:
      return new MyPromise((resolve, reject) => {
        this.fullfillCallback.push(() => {
          try {
            const res = onFulfilled(self.value)
            resolve(res)
          } catch(e) {
            reject(e)
          }
        })
      })
    case Rejected:
      return new Promise((resolve, reject) => {
        this.rejectCallback.push(() => {
          reject()
          const res = onRejected()
        })
      })
  }

  return this
}

MyPromise.resolve = function(data) {
  if (data instanceof MyPromise) return data

  return new MyPromise((resolve, reject) => {
    if (data && data.then && typeof data.then === 'function') {
      data.then(resolve,reject)
    } else {
      resolve(data)
    }
  })
}

MyPromise.reject = function(error) {
  return new Promise((resolve, reject) => {
    reject(error)
  })
}

MyPromise.prototype.catch = function(onReject) {
  console.log('here is the cache')
  return this.then(null, onReject)
}

MyPromise.prototype.finally = function(func) {
  this.then((data) => {
    return Promise.resolve(func(data))
  }, (error) =>  {
    return Promise.reject(func(error))
  })
}

MyPromise.all = function(promises) {
  return new Promise((resolve, reject) => {
    let res = []

    function handle(data) {
      res.push(data)
      if (res.length === promises.length) {
        resolve(res)
      }
    }

    for (let i = 0;i < promises.length; i++) {
      MyPromise.resolve(promises[i]).then(handle).catch(reject)
    }
  })
}
