# 算法

### 用递归算法实现，数组长度为5且元素的随机数在2-32之间不重复的值

```js
let arr = giveRandomNumber([], 5, 32, 2)
console.log('arr:', arr)

function giveRandomNumber(arr, length, max, min) {
  const random = Math.floor(Math.random() * (max - min) + 1) + min
  !arr.includes(random) && arr.push(random)
  return arr.length === length ?  arr : giveRandomNumber(arr, length, max, min)
}
```

### 写一个方法去掉空格

方法一 Regex：

```js
string.replace(/\s/g, '')
```

方法二 Split：

```js
const a = (str) => str.split(' ').join('')
```

### 二分查找

很简单，就是控制好左侧和右侧的指针，然后使用中间的跟 target 对比。如果一致 就是当前中间值，如果小 则说把左侧指针移动到中间指针后一个，继续前面的操作

#### 递归

```js
let data = [12, 24, 32, 43, 52, 61, 74]
function splitFind(arr, target) {
  const time = arr.length / 2
  const first = arr[time]

  for (let i = 0; i < arr.length; i++) {
  
  }
}

console.log('result:', splitFind(data, 61))
```

#### 循环

```js
var search = function(nums, target) {
    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        let half = left + Math.floor((right - left) / 2)
        let cur = nums[half]

        if (cur === target) return half
        if (cur > target) {
            right = half - 1;
        } else if (cur < target) {
            left = half + 1
        }
    }

    return -1
}
```

### 找出数组中连续重复的元素的起始索引

```js
var arr = [1,2,3,9,9,9,9,6,7,8,10,10,10,15]
var dic = {}
for (k in arr){
     if (!dic[arr[k]]){dic[arr[k]] = [k]}
     else{dic[arr[k]][1] = k}
 }
for (k in dic){if (dic[k].length==1){delete(dic[k])}}

console.log(dic)
// { '9': [ '3', '6' ], '10': [ '10', '12' ] }
```

### 斐波那契数列

简单实现（极其容易内存溢出）

```js
function Fibonacci(n) {
  if (n <= 1) { return n }
  return Fibonacci(n-2) + Fibonacci(n-1)
}
```

尾递归实现（简单，安全）

```js
function Fibonacci(n, ac1 = 1, ac2 = 1) {
    if (n <= 1) { return ac2 }
    return Fibonacci(n - 1, ac2, ac1 + ac2)
}
```

循环实现

```js
function Fibonacci(n) {
  let ac1 = 1, ac2 = 1

  for (let i = 2; i < n; i++) {
    [ac1, ac2] = [ac2, ac1 + ac2]
  }

  return ac2
}
```

yield 实现

```js
function* FibonacciGenerator() {
  let ac1 = 1, ac2 = 1
  while(true) {
    [ac1, ac2] = [ac2, ac1 + ac2]
    yield ac2
  }
}

function Fibonacci(n) {
  if (n === 1 || n === 2) return 1

  let res = 0
  const generator = FibonacciGenerator()

  for (let i = 2; i < n; i ++) {
    res = generator.next()
  }
  return res.value
}
```


        if (curX < n || curY < m) {
            if (flag) {
                if (curY === 0) {
                    flag = false
                    curX += 1
                } else {
                    curX += 1
                    curY -= 1
                }
            } else {
                if (curX === 0) {
                    flag = true
                    curY += 1
                } else {
                    curX -= 1
                    curY += 1
                }
            }
        } else {
            if (flag) {
                if ()
            }
        }

### 动态规划

动态规划可以看作是与递归相反的技术

递归：从顶部开始将问题分解，通过解决掉所有分解出的小问题的方式，来解决整个问题
动态规划：从底部开始解决问题，将所有的小问题解决掉，然后合并成一个解决方案，从而解决掉大问题


var postorderTraversal = function(root) {
    let res = []
    if (!root) return res

    let loop = function(tree) {
        tree.left && loop(tree.left)
        tree.right && loop(tree.right)
        res.push(tree.val)
    }
    loop(root)
    return res
};
