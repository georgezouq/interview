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
