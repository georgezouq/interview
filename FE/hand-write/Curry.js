/**
 * 柯里化
 * @param args
 * @returns {*}
 */

function add(...args) {
  return args.reduce((current, sum) => sum += current)
}

let curry = (fn, ...args) => {
  let len = fn.length
  return (...rest) => {
    let allArgs = args.slice(0)
    console.log('allArgs:', allArgs, 'len:', len)
    allArgs.push(...rest)
    if (rest.length) {
      return curry.call(this, fn, ...allArgs)
    } else {
      return fn.apply(this, allArgs)
    }
  }
}

const curryAdd = curry(add,2);
const sum = curryAdd(3)(4)(5)()

console.log(sum) // 14
