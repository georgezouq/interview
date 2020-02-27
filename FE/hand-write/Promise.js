function Promise(fn) {
  this._state = 'pending'
  this.value = null
  this.onFulfilled = null

  function resolve(data) {
    this.onFulfilled()
  }

  function reject(error) {

  }

  try {
    fn(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  this.onFulfilled = onFulfilled()
  return new Promise(fn)
}

Promise.prototype.catch = function(onError) {

}

Promise.prototype.finally = function() {

}

Promise.prototype.all = function(error) {

}
