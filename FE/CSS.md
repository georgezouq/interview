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

### CSS3 新增伪类

- `:first-child` `:last-child` 表示子元素结构关系
- `:nth-child()` `:nth-last-child()` 用来控制奇数、偶数行的
- `:first-of-type` `:last-of-type` 表示一组兄弟元素中其类型的第一个元素
- `:nth-of-type` `:nth-last-of-type` 匹配那些在相同兄弟节点中的位置与模式
- `root` html跟元素
- `:not()` 否定选择器
- `:only-child` 只有一个子元素才会生效　
- `:empty` 选择连空格都没有的元素　

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

### 脱离文档流

元素脱离文档流之后，将不再在文档流中占据空间，而是处于浮动状态（可以理解为漂浮在文档流的上方）。脱离文档流的元素的定位基于正常的文档流，当一个元素脱离文档流后，依然在文档流中的其他元素将忽略该元素并填补其原先的空间。

- float
- absolute
- fixed

###  BFC (Block  Formatting Context  BFC)

Web页面的可视化 CSS渲染的 一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

### 如何理解rem布局

我们用js很容易动态的设置html的font-size恒等屏幕的1/10;我们可以在页面dom ready、resize和屏幕旋转中设置：

```js
document.documentElement.style.fontSize = document.documentElement.clientWidth / 10 + 'px';
```

如何把设计稿的像素单位换成以 rem 为单位呢？可以用一个比例来计算：如设计稿宽度为 750px，某个元素量得 75px，那么：

75px/750px = 计算所得 rem/10rem, 所以计算所得 rem=75px; 所以我们在样式中写 width:1rem；实际宽度是 75px；同理，如果设计稿总宽度是 640px, 则 1rem=64px。

### CSS实现正方形div

要求：宽度随页面拓展

1. vw 单位

1vw = 1% viewport width

```html
<div class="vw">hello</div>
<style>.vw { width: 50%; height: 50vw; background: #ccc; } </style>
```

2. padding-bottom

padding 百分比相对于父元素宽度计算

```html
<div class="placeholder"></div>
<style>.placeholder { width: 100%; padding-bottom: 100%; height: 0; }</style>
```

3. padding-bottom :after absolute

```html
<div class="square">
    <div class="content">
        Hello!
    </div>
</div>

<style>
.square { width: 50% background: #ccc; }
.square:after { content: ""; display: block; padding-bottom: 100%; }
.content { position: absolute; width: 100%; height: 100%; }
</style>
```

### 怎么理解Flex 布局，flex 布局与普通布局有什么区别，什么情况下我们用flex 什么情况下用普通布局

- 传统布局以基于盒子模型，依赖 display、position、float 等属性。对于那些特殊布局非常不方便，比如垂直居中
- Flex 是 FlexBox 的缩写，意为弹性布局，用来为 盒子模型提供最大的灵活性。任意一个容器都可以被指定为 flex 布局。
    - just-content 定义了项目在主轴上的对其方式 
        - flex-end 右对齐；
        - center 居中；
        - space-between 两端对其；
        - space-around 两个项目中间间隔相等
    - align-items 定义项目如何在交叉轴 纵轴对齐
        - baseline 项目第一行文字基线对齐
        - stretch 如果项目未设置高度 或者为 auto，将占满整个容器的高度
    - flex-direction 决定主轴的对齐方向
    - flex-wrap 
        - nowrap 不换行
        - wrap 换行
        - wrap-reverse 换行，第一行在下方
    
### CSS布局方式都有那些

- 传统布局
    - 文档流布局 display 属性
    - 定位布局 position属性
    - 浮动布局 float属性 
- flex 布局
- grid 布局

### FlexBox 和 CSS Grid

[flexbox-vs-css-grid](https://blog.logrocket.com/flexbox-vs-css-grid/)

- FlexBox: 一维布局系统，支持创建 行/列 轴布局。

创建 Flexbox 布局需要首先创建 flex 容器`display:flex;`。每一个在flex容器中的元素都是 flex元素

- CSS Grid：二维布局系统，可以同时处理 行/列。

创建 grid 容器首先创建 grid 容器`display:grid;`
使用 `grid-template-rows` 创建行元素

```css
grid-template-rows: 200px 200px;
```

使用 `grid-template-columns` 创建行元素

```css
grid-template-columns: 200px 200px;
```

###### 不同

- CSS Grid: Layout
- FlexBox: Alignment

### Less 和 Sass 的比较

- Less环境较Sass简单
- Less使用较Sass简单
- 从功能出发，Sass较Less强大
    - sass有变量和作用域。
    - sass有函数的概念；
    - @if @else；@for @each @while @extend @import
    - 数据结构：
      -$list类型 = 数组；
      -$map类型 = object；
- Less 与 Sass 处理机制不一样.前者是通过客户端处理的，后者是通过服务端编译，相比较之下前者解析会比后者慢一点
- 关于变量在Less和Sass中的唯一区别就是Less用@，Sass用$。
