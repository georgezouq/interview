/**
 * 节流防抖函数
 *
 * 都依赖一个基础的方法 base，节流和防抖的区别在于是否在新一轮请求的时候清除定时器，防抖需要清除定时器以实现在最后一次调用的 wait 秒内执行
 *
 * @param fn
 * @param wait
 * @param debounce
 * @returns {function(...[*]=)}
 */

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
