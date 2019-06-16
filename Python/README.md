# Python API Interview

# Python基础

### Python 的特点和优点是什么?

Python是一种解释型语言。这就是说，与C语言和C的衍生语言不同，Python代码在运行之前不需要编译。其他解释型语言还包括PHP和Ruby。

Python是动态类型语言，指的是你在声明变量时，不需要说明变量的类型。你可以直接编写类似x=111和x="I'm a string"这样的代码，程序不会报错。

Python非常适合面向对象的编程（OOP），因为它支持通过组合（composition）与继承（inheritance）的方式定义类（class）。Python中没有访问说明符（access specifier，类似C++中的public和private），这么设计的依据是“大家都是成年人了”。

在Python语言中，函数是第一类对象（first-class objects）。这指的是它们可以被指定给变量，函数既能返回函数类型，也可以接受函数作为输入。类（class）也是第一类对象。

Python代码编写快，但是运行速度比编译语言通常要慢。好在Python允许加入基于C语言编写的扩展，因此我们能够优化代码，消除瓶颈，这点通常是可以实现的。numpy就是一个很好地例子，它的运行速度真的非常快，因为很多算术运算其实并不是通过Python实现的。

Python用途非常广泛——网络应用，自动化，科学建模，大数据应用，等等。它也常被用作“胶水语言”，帮助其他语言和组件改善运行状况。

Python让困难的事情变得容易，因此程序员可以专注于算法和数据结构的设计，而不用处理底层的细节。

Python 可以作为编程的入门语言，因为他具备以下特质：

1. 解释性

2. 动态特性

3. 面向对象

4. 语法简洁

5. 开源

6. 丰富的社区资源

实际上 Python 的优点远不止这些，更详细的介绍可以阅读 Introduction to Python（ https://data-flair.training/blogs/python-tutorial/）



### 深拷贝和浅拷贝的区别是什么？


深拷贝是将对象本身复制给另一个对象。这意味着如果对对象的副本进行更改时不会影响原对象。在 Python 中，我们使用 deepcopy（）函数进行深拷贝，使用方法如下：


浅拷贝是将对象的引用复制给另一个对象。因此，如果我们在副本中进行更改，则会影响原对象。使用 copy（）函数进行浅拷贝，使用方法如下：


### 列表和元祖有什么不同？

主要区别在于列表是可变的，元祖是不可变的。看下面的例子：

会出现以下错误提示：

TypeError: ‘tuple’ object does not support item assignment

关于列表和元祖的更多内容参考 Tuples vs Lists（ https://data-flair.training/blogs/python-tuples-vs-lists/）

### 解释 Python 中的三元表达式

在 Python 中我们不需要使用 ? 符号，而是使用如下语法：

[on true] if [expression]else [on false]

如果 [expression] 为真, 则 [on true] 部分被执行。如果表示为假则 [on false] 部分被执行

### Python 中如何实现多线程？

线程是轻量级的进程，多线程允许一次执行多个线程。众所周知，Python 是一种多线程语言，它有一个多线程包。

GIL（全局解释器锁）确保一次执行单个线程。一个线程保存 GIL 并在将其传递给下一个线程之前执行一些操作，这就产生了并行执行的错觉。但实际上，只是线程轮流在 CPU 上。当然，所有传递都会增加执行的开销。

### 解释继承

一个类继承自另一个类，也可以说是一个孩子类/派生类/子类，继承自父类/基类/超类，同时获取所有的类成员（属性和方法）。

继承使我们可以重用代码，并且还可以更方便地创建和维护代码。Python 支持以下类型的继承：

1. 单继承- 一个子类类继承自单个基类

2. 多重继承- 一个子类继承自多个基类

3. 多级继承- 一个子类继承自一个基类，而基类继承自另一个基类

4. 分层继承- 多个子类继承自同一个基类

5. 混合继承- 两种或两种以上继承类型的组合

关于继承的更多内容参考 Python Inheritance（ https://data-flair.training/blogs/python-inheritance/）

### 什么是 Flask？

Flask 是一个使用 Python 编写的轻量级 Web 应用框架，使用 BSD 授权。其 WSGI 工具箱采用 Werkzeug，模板引擎则使用 Jinja2。除了 Werkzeug 和 Jinja2 以外几乎不依赖任何外部库。因为 Flask 被称为轻量级框架。

Flask 的会话会话使用签名 cookie 来允许用户查看和修改会话内容。它会记录从一个请求到另一个请求的信息。但如果要修改会话，则必须有密钥 Flask.secret_key。

我们将在后续的课程中进一步讨论 Flask。

### 如何在 Python 中管理内存?

Python 用一个私有堆内存空间来放置所有对象和数据结构，我们无法访问它。由解释器来管理它。不过使用一些核心 API，我们可以访问一些 Python 内存管理工具控制内存分配。

### 当退出 Python 时是否释放所有内存分配？

答案是否定的。那些具有对象循环引用或者全局命名空间引用的变量，在 Python 退出是往往不会被释放

另外不会释放 C 库保留的部分内容。

### 什么是 Python 字典？

字典是我在 C++和 Java 中没有见过的数据结构，它拥有键-值对

字典是可变的，我们也可以用推导式的方式创建它.

`{25: 5, 16: 4, 9: 3, 4: 2, 1: 1}`

要了解更多字典的内容请点击 Python Dictionaries（ https://data-flair.training/blogs/python-dictionaries/）

### 能否解释一下 *args 和 **kwargs?

如果我们不知道将多少个参数传递给函数，比如当我们想传递一个列表或一个元组值时，就可以使用*args。

当我们不知道将会传入多少关键字参数时，使用**kwargs 会收集关键字参数。

使用 args 和 kwargs 作为参数名只是举例，可以任意替换。

### 什么是负索引？

我们先创建如下列表：

与正索引不同，负索引是从右边开始检索。

同样可以用于列表的切片：

[3, 4, 5, 6, 7]

Q.16. 如何随机打乱列表中元素，要求不引用额外的内存空间？

我们用 random 包中的 shuffle() 函数来实现。

[3, 4, 8, 0, 5, 7, 6, 2, 1]

### 解释 Python 中的 join() 和 split() 函数

join() 函数可以将指定的字符添加到字符串中。

‘1,2,3,4,5’

split() 函数可以用指定的字符分割字符串

[‘1’, ‘2’, ‘3’, ‘4’, ‘5’]

### Python 区分大小写吗？

验证 Python 是否区分大小写的方法是测试 myname 和 Myname 在程序中是不是算同一个标识符。观察以下代码的返回结果：

Myname

NameError: name ‘Myname’ is not defined

如你所见，这里出现了 NameError，所以 Python 是区分大小的语言。

### Python 中标识符的命名规则？

Python 中的标识符可以是任意长度，但必须遵循以下命名规则:

1. 只能以下划线或者 A-Z/a-z 中的字母开头。

2. 其余部分只能使用 A-Z/a-z/0-9。

3. Python 标识符区分大小写。

4. 关键字不能作为标识符。Python 有以下这些关键字：

​​### 如何删除字符串中的前置空格

前置空格是第一个非空格字符前的所有空格，使用 lstrip() 函数来删除.

‘Ayushi ‘

如图这个字符串既包含前置空格也包含后置空格. 调用 lstrip() 函数去除了前置空格。如果想去除后置空格，使用 rstrip() 函数。

‘ Ayushi’

以上是面向 Python 新手的基础题部分。

### Python 面试进阶题

Q. 21 至 Q. 35 是针对有经验者的一些 Python 面试问题及其答案和示例。

Q.21. 如何将字符串转换为小写？

使用 lower() 函数

‘ayushi’

转换为大写用 upper() 函数

‘AYUSHI’

要检查字符串是否为全大写或全小写，使用 isupper() 和 islower() 函数

像 @ 和$这样的字符即满足大写也满足小写。

istitle() 可以检查字符串是否是标题格式。

True

### Python 中的 pass 语句有什么作用？

我们在写代码时，有时可能只写了函数声明而没想好函数怎么写，但为了保证语法检查的正确必须输入一些东西。在这种情况下，我们使用 pass 语句。

类似的 break 语句可以跳出循环。

continue 语句可以跳到下一轮循环。

### 请解释 Python 中的闭包？

如果在一个内部函数里。对在外部作用域（但不是在全局作用域）的变量进行引用，那么内部函数就是一个闭包。

闭包的详细解释请点击 Closures in Python。（https://data-flair.training/blogs/python-closure/）

### 解释 Python 中的//，％和**运算符

//运算符执行地板除法，返回结果的整数部分 (向下取整)。

用/符号除法结果为 3.5。

**符号表示取幂. a**b 返回 a 的 b 次方

1024

% 是取模符号。返回除法后的余数。

### Python 中有多少种运算符，解释算术运算符。

这类面试问题可以判断你的 Python 功底，可以举一些实例来回答这类问题。

在 Python 中我们有 7 中运算符:算术运算符、关系 (比较) 运算符、赋值运算符、逻辑运算符、位运算符、成员运算符、身份运算符。

1. 加号 (+) 将两个对象的值相加。

2. 减号 (-) 将第一个对象的值减去第二个对象的值。

3. 乘号 (*) 将两个对象的值相乘。

4. 除号 (/) 将第一个对象的值除以第二个对象的值。

### 解释 Python 中的关系运算符。

关系运算符用来比较两个对象。

1. 判断小于 (<)：如果符号左边的值比右边小则返回 True。

False

2. 判断大于 (>)：如果符号左边的值比右边大则返回 True。

True

出现上面的错误结果是因为 Python 的浮点运算存在一些 Bug。

3. 判断小于等于 (<=)：如果符号左边的值小于或等于右边则返回 True。

True

4. 大判断于等于 (>=)：如果符号左边的值大于或等于右边则返回 True。

True

5. 判断等于 (==) 如果符号两边的值相等则返回 True。

True

6. 判断不等于 (!=) 如果符号两边的值不等则返回 True。

### 如果判断某个值是否在成员中

使用 in 和 not in 运算符我们可以判断某个值是否在成员中。

### 解释 Python 中的身份运算符

这是非常常见的 Python 面试题，用下面的示例来回答.

is 和 not is 运算符可以判断两个对象是否相同

### 如何获取字典中的所有键？

使用 keys() 来获取字典中的所有键

### 问什么标识符不建议使用下划线开头？

因为在 Python 中以下划线开头的变量为私有变量，如果你不想让变量私有，就不要使用下划线开头。

### 什么是元组的解封装？

首先我们来介绍元组封装：

(3, 4, 5)

将 3，4，5 封装到元组 mytuple 中。

现在我们要将这些值解封装到变量 x，y，z 中

以上是 Python 高级面试问题和答案，新手也可以参考这些问题以获得进阶的 Python 知识。

# 数据结构 设计模式及算法


### 实现冒泡排序

```python
array = [1,2,3,6,5,4]
for i in range(len(array)):
    for j in range(i):
        if array[j] > array[j + 1]:
            array[j], array[j + 1] = array[j + 1], array[j]
print array
```

### 适配器模式

适配器模式是指是一种接口适配技术，它可通过某个类来使用另一个接口与之不兼容的类，运用此模式，两个类的接口都无需改动。

```python
class Target(object):
    def request(self):
        print 'Target request'
class Adaptee(object):
    def specialRequest(self):
        print 'Adaptee specialRequest'
class Adpater(object):
    def __init__(self, adpatee):
        self.adpatee = adpatee
    def request(self):
        self.adpatee.specialRequest()
if __name__ == '__main__':
    objects = []
    a = Target()
    b = Adaptee()
    objects.append(a)
    objects.append(Adpater(b))  #适配接口
    for obj in objects:
        obj.request()       #调用相同接口
```

# 网络相关

### Session机制的缺点


### 可以替代Session的方案


### 是否用过 JWT


### Apache 与 Nginx 的区别


#### nginx 相对 apache 的优点：

轻量级，同样起web 服务，比apache 占用更少的内存及资源

抗并发，nginx 处理请求是异步非阻塞的，支持更多的并发连接，而apache 则是阻塞型的，在高并发下nginx 能保持低资源低消耗高性能

配置简洁

高度模块化的设计，编写模块相对简单

社区活跃

#### apache 相对nginx 的优点：

rewrite ，比nginx 的rewrite 强大

模块超多，基本想到的都可以找到

少bug ，nginx 的bug 相对较多

超稳定

---------- Python 基础


原生 API 使用


​
1
def print_directory_contents(sPath):
2
"""
3
这个函数接受文件夹的名称作为输入参数，
4
返回该文件夹中文件的路径，
5
以及其包含文件夹中文件的路径。
6
"""
​


​
1
def print_directory_contents(sPath):
2
import os
3
for sChild in os.listdir(sPath):
4
    sChildPath = os.path.join(sPath,sChild)
5
    if os.path.isdir(sChildPath):
6
        print_directory_contents(sChildPath)
7
    else:
8
    print sChildPath
​




注解


下面这些是什么意思：@classmethod, @staticmethod, @property？



回答背景知识



这些都是装饰器（decorator）。装饰器是一种特殊的函数，要么接受函数作为输入参数，并返回一个函数，要么接受一个类作为输入参数，并返回一个类。



@标记是语法糖（syntactic sugar），可以让你以简单易读得方式装饰目标对象。





多线程
是否处理过Python多线程相关的问题？ 怎么处理的？


Python并不支持真正意义上的多线程。Python中提供了多线程包，但是如果你想通过多线程提高代码的速度，使用多线程包并不是个好主意。Python中有一个被称为Global Interpreter Lock（GIL）的东西，它会确保任何时候你的多个线程中，只有一个被执行。线程的执行速度非常之快，会让你误以为线程是并行执行的，但是实际上都是轮流执行。经过GIL这一道关卡处理，会增加执行的开销。这意味着，如果你想提高代码的运行速度，使用threading包并不是一个很好的方法。



不过还是有很多理由促使我们使用threading包的。如果你想同时执行一些任务，而且不考虑效率问题，那么使用这个包是完全没问题的，而且也很方便。但是大部分情况下，并不是这么一回事，你会希望把多线程的部分外包给操作系统完成（通过开启多个进程），或者是某些调用你的Python代码的外部程序（例如Spark或Hadoop），又或者是你的Python代码调用的其他代码（例如，你可以在Python中调用C函数，用于处理开销较大的多线程工作）。



为什么提这个问题



因为GIL就是个混账东西（A-hole）。很多人花费大量的时间，试图寻找自己多线程代码中的瓶颈，直到他们明白GIL的存在。





框架


Flask


是否用过 Flask
什么是Flask
Flask 与 Django 的区别 各自优缺点


## ORM

### 什么是 ORM

### 是否用过 SQLAlchemy


