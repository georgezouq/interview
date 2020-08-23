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
