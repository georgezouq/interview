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
