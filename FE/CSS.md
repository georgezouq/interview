# CSS 面试题 

### link 和 @import的区别

1）从属关系的区别：link属于XHTML标签，而@import是CSS提供的语法规则，link除了加载CSS，还可以定义RSS，定义rel连接属性等，@import就只能加载CSS。
2）加载顺序的区别：页面加载时，link会同时被加载，而@import引用的CSS会等页面被加载完后再加载。
3）兼容性的区别：@import只有IE5以上才能被识别，而link是XHTML标签，无兼容问题。
4）DOM可控性区别：通过js操作DOM,可以插入link标签来改变样式；由于DOM方法是基于文档的，无法使用@import方式插入样式
5）权重区别(争议)：可参考：https://www.cnblogs.com/my--sunshine/p/6872224.html

### 圣杯布局 与 双飞翼布局

圣杯布局和双飞翼布局都是为了实现 两侧固定宽度 中间自适应的 三栏式布局方式。这种布局方式比较老，在不考虑兼容的情况下，我们现在使用flex更多一些 

圣杯布局：三栏利用 `float` 和 负 `margin` 并列，利用父容器设置 `padding` 给两侧栏腾出空间
双飞翼布局: 三栏利用 `float` 和负 `margin` 并列，中间栏加一层容器，利用 `margin` 给两栏腾出空间

圣杯布局实现：
```html
  <div class="wrapper1">
      <div class="main">
        <p>bilibili</p>
      </div>
      <div class="left"></div>
      <div class="right"></div>
  </div>
```

```css
  * { padding: 0; margin: 0; }
  .wrapper1 {  padding: 0 60px 0 30px; }
  .wrapper1 .main {
    float: left;
    width: 100%;
    height: 300px;
    background: red;
  }
  .wrapper1 .left {
    float: left;
    width: 30px;
    margin-left: -100%;
    background: blue;
    height: 100px;
    position: relative;
    right: 30px;
  }
  .wrapper1 .right {
    float: left;
    width: 60px;
    margin-left: -60px;
    background: yellow;
    height: 200px;
    position: relative;
    left: 60px;
  }
```
双飞翼布局实现：

```html
    <div class="wrapper2">
      <div class="container">
        <div class="main">
          <p>bilibili</p>
        </div>
      </div>
      <div class="left"></div>
      <div class="right"></div>
    </div>
```

```css
  * { padding: 0; margin: 0; }
  .wrapper2 { min-width: 630px; }
  .wrapper2 .container { float: left; width: 100%; }
  .wrapper2 .container .main { height: 300px; background: red; margin: 0 600px 0 30px; }
  .wrapper2 .left {
    float: left;
    width: 30px;
    background: blue;
    height: 100px;
    margin-left: -100%;
  }
  .wrapper2 .right {
    float: left;
    width: 600px;
    background: yellow;
    height: 200px;
    margin-left: -600px;
  }
```

### CSS3 有哪些新增特性

边框

- border-radius
- box-shadow
- border-image 边框图像

背景

- background-size
- background-origin 背景图片的定位区域
- background-clip 背景图片的绘制区域

渐变 

- linear-gradient 线性渐变
- radial-gradient 径向渐变

文本效果

- word-break
- word-wrap
- text-overview
- text-shadow
- text-wrap
- text-outline
- text-justify

转换

- 2D转换属性
    - transform 2D/3D转换
        - rotate()
        - scale()
        - skew()
        - maxtrix()
        - translate()
        - translateX()
        - translateY()
        - scale()
        - scaleX()
        - scaleY()
    - transform-origin
    
3D转换：

- 3D转换属性：
    - transform
    - transform-origin
    - transform-style
- 3D转换方法
    - translate3d(x,y,z)
    - translateX(x)
    - translateY(y)
    - translateZ(z)
    - scale3d(x,y,z)
    - scaleX(x)
    - scaleY(y)
    - scaleZ(z)
    - rotate3d(x,y,z,angle)
    - rotateX(x)
    - rotateY(y)
    - rotateZ(z)
    - perspective(n)
过渡

- transition

动画

- @Keyframes规则
- animation

弹性盒子(flexbox)
多媒体查询@media

### 页面上隐藏元素的方法有哪些

占位

- opacity: 0 看不见，但是会占据空间。只会引起重绘
- visibility: hidden 页面会渲染只是不显示
- margin-left: -100%
- transform: scale(0)

不占位

- display: none 页面不会渲染，可以减少首屏渲染的时间，但是会引起回流和重绘。
- width: 0; height: 0; overflow: hidden
- z-index: -9999999
- position: relative; left: -100%;

### CSS 选择器有哪些， 哪些属性可以继承

- id 选择器 `#header`
- class 选择器 `.header`
- 标签 选择器 `header`
- 伪类选择器 `::after` `::before`
- 兄弟选择器 `+header`
- 后代选择器 `> header`
- 通配符 `*`

可以继承的属性

- font-size
- font-weight
- font-style
- font-family
- color

inherit属性

### 四种定位的区别

- `static` 是默认值
- `relative` 相对定位 相对于自身原有位置进行偏移，仍处于标准文档流中
- `absolute` 绝对定位 相对于最近的已定位的祖先元素, 有已定位(指 `position` 不是 `static` 的元素)祖先元素, 以最近的祖先元素为参考标准。如果无已定位祖先元素, 以body元素为偏移参照基准, 完全脱离了标准文档流。
- `fixed` 固定定位的元素会相对于视窗来定位,这意味着即便页面滚动，它还是会停留在相同的位置。一个固定定位元素不会保留它原本在页面应有的空隙。
