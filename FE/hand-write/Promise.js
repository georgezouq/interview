function Promise(fn) {
  this._state = 'pending'
  this.value = null

  function resolve(data) {

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

}

Promise.prototype.catch = function(onError) {

}

Promise.prototype.finally = function() {

}

Promise.prototype.all = function(error) {

}
