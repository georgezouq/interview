# Java Interview

### 1.什么是Java虚拟机？为什么Java被称作是“平台无关的编程语言”？

**Java虚拟机是一个可以执行Java字节码的虚拟机进程。**Java源文件被编译成能被Java虚拟机执行的字节码文件。

Java被设计成允许应用程序可以运行在任意的平台，而不需要程序员为每一个平台单独重写或者是重新编译。Java虚拟机让这个变为可能，因为它知道底层硬件平台的指令长度和其他特性。

### 2.JDK和JRE的区别是什么？

**Java运行时环境(JRE)是将要执行Java程序的Java虚拟机。**它同时也包含了执行applet需要的浏览器插件。

**Java开发工具包(JDK)是完整的Java软件开发包，包含了JRE，**编译器和其他的工具(比如：JavaDoc，Java调试器)，可以让开发者开发、编译、执行Java应用程序。

### 3.”static”关键字是什么意思？Java中是否可以覆盖(override)一个private或者是static的方法？

“static”关键字表明一个成员变量或者是成员方法可以在没有所属的类的实例变量的情况下被访问。

Java中static方法不能被覆盖，因为方法覆盖是基于运行时动态绑定的，而static方法是编译时静态绑定的。static方法跟类的任何实例都不相关，所以概念上不适用。

### 4.是否可以在static环境中访问非static变量？

static变量在Java中是属于类的，它在所有的实例中的值是一样的。当类被Java虚拟机载入的时候，会对static变量进行初始化。如果你的代码尝试不用实例来访问非static的变量，编译器会报错，因为这些变量还没有被创建出来，还没有跟任何实例关联上。

### 5.Java支持的数据类型有哪些？什么是自动拆装箱？

Java语言支持的8中基本数据类型是：

- byte
- short
- int
- long
- float
- double
- boolean
- char

**自动装箱是Java编译器在基本数据类型和对应的对象包装类型之间做的一个转化。**比如：把int转化成Integer，double转化成double，等等。反之就是自动拆箱。

### 6.Java中的方法覆盖(Overriding)和方法重载(Overloading)是什么意思？

Java中的方法重载发生在同一个类里面两个或者是多个方法的方法名相同但是参数不同的情况。与此相对，**方法覆盖是说子类重新定义了父类的方法。**方法覆盖必须有相同的方法名，参数列表和返回类型。覆盖者可能不会限制它所覆盖的方法的访问。

### 7.Enumeration和Iterator接口的区别？

**Enumeration的速度是Iterator的两倍，也使用更少的内存。**Enumeration是非常基础的，也满足了基础的需要。但是，与Enumeration相比，Iterator更加安全，因为当一个集合正在被遍历的时候，它会阻止其它线程去修改集合。

迭代器取代了Java集合框架中的Enumeration。**迭代器允许调用者从集合中移除元素，而Enumeration不能做到。**为了使它的功能更加清晰，迭代器方法名已经经过改善。

### 8.为何没有像Iterator.add()这样的方法，向集合中添加元素？

语义不明，已知的是，Iterator的协议不能确保迭代的次序。然而要注意，ListIterator没有提供一个add操作，它要确保迭代的顺序。

### 9.为何迭代器没有一个方法可以直接获取下一个元素，而不需要移动游标？

它可以在当前Iterator的顶层实现，但是它用得很少，如果将它加到接口中，每个继承都要去实现它，这没有意义。

### 10.Iterater和ListIterator之间有什么区别？

（1）我们可以使用Iterator来遍历Set和List集合，而ListIterator只能遍历List。

（2）Iterator只可以向前遍历，而LIstIterator可以双向遍历。

（3）ListIterator从Iterator接口继承，然后添加了一些额外的功能，比如添加一个元素、替换一个元素、获取前面或后面元素的索引位置。

### 11.遍历一个List有哪些不同的方式？

```java
List<String> strList = new ArrayList<>();

//使用for-each循环

for(String obj : strList) {

    System.out.println(obj);
}

//using iterator

Iterator<String> it = strList.iterator();

while(it.hasNext()){

    String obj = it.next();
    
    System.out.println(obj);
}
```

使用迭代器更加线程安全，因为它可以确保，在当前遍历的集合元素被更改的时候，它会抛出ConcurrentModificationException。

### 12.通过迭代器fail-fast属性，你明白了什么？

每次我们尝试获取下一个元素的时候，**Iterator fail-fast属性检查当前集合结构里的任何改动。如果发现任何改动，它抛出ConcurrentModificationException。**Collection中所有Iterator的实现都是按fail-fast来设计的（ConcurrentHashMap和CopyOnWriteArrayList这类并发集合类除外）。

### 13.fail-fast与fail-safe有什么区别？

Iterator的fail-fast属性与当前的集合共同起作用，因此它不会受到集合中任何改动的影响。

Java.util包中的所有集合类都被设计为fail-fast的，而java.util.concurrent中的集合类都为fail-safe的。

Fail-fast迭代器抛出ConcurrentModificationException，而fail-safe迭代器从不抛出ConcurrentModificationException。

14.在迭代一个集合的时候，如何避免ConcurrentModificationException？

在遍历一个集合的时候，我们可以使用并发集合类来避免ConcurrentModificationException，比如使用CopyOnWriteArrayList，而不是ArrayList。

### 15、Math.round(11.5)等於多少? Math.round(-11.5)等於多少?

Math类中提供了三个与取整有关的方法：ceil、floor、round，这些方法的作用与它们的英文名称的含义相对应，

例如：

ceil的英文意义是天花板，该方法就表示向上取整，Math.ceil(11.3)的结果为12,Math.ceil(-11.3)的结果是-11；

floor的英文意义是地板，该方法就表示向下取整，Math.floor(11.6)的结果为11,Math.floor(-11.6)的结果是-12；

最难掌握的是round方法，它表示“四舍五入”，算法为Math.floor(x+0.5)：

即将原来的数字加上0.5后再向下取整，所以，Math.round(11.5)的结果为12，Math.round(-11.5)的结果为-11。

### 16、下面的代码有什么不妥之处?

if(username.equals(“zxx”){}

int x = 1;

return x==1?true:false;

### 17、请说出作用域public，private，protected，以及不写时的区别

这四个作用域的可见范围如下表所示。

说明：如果在修饰的元素上面没有写任何访问修饰符，则表示friendly。

作用域 当前类同一package子孙类其他package

public √ √ √ √

protected √ √ √ ×

friendly √ √ × ×

private √ × × ×

备注：只要记住了有4种访问权限，4个访问范围，然后将全选和范围在水平和垂直方向上分别按排从小到大或从大到小的顺序排列，就很容易画出上面的图了。

### 18、Overload和Override的区别。Overloaded的方法是否可以改变返回值的类型?

Overload是重载的意思，Override是覆盖的意思，也就是重写。
重载Overload表示同一个类中可以有多个名称相同的方法，但这些方法的参数列表各不相同（即参数个数或d类型不同）。

重写Override表示子类中的方法可以与父类中的某个方法的名称和参数完全相同，通过子类创建的实例对象调用这个方法时，将调用子类中的定义方法，这相当于把父类中定义的那个完全相同的方法给覆盖了，这也是面向对象编程的多态性的一种表现。子类覆盖父类的方法时，只能比父类抛出相同或更少的异常(父类抛出的异常的子异常)，因为子类可以解决父类的一些问题，不能比父类有更多的问题。子类方法的访问权限只能比父类的相等或更大，不能更小。如果父类的方法是private类型，那么，子类则不存在覆盖的限制，相当于子类中增加了一个全新的方法。

至于Overloaded的方法是否可以改变返回值的类型这个问题，要看你倒底想问什么呢？这个题目很模糊。如果几个Overloaded的方法的参数列表不一样，它们的返回者类型当然也可以不一样。但我估计你想问的问题是：如果两个方法的参数列表完全一样，是否可以让它们的返回值不同来实现重载Overload。这是不行的，我们可以用反证法来说明这个问题，因为我们有时候调用一个方法时也可以不定义返回结果变量，即不要关心其返回结果，例如，我们调用map.remove(key)方法时，虽然remove方法有返回值，但是我们通常都不会定义接收返回结果的变量，这时候假设该类中有两个名称和参数列表完全相同的方法，仅仅是返回类型不同，java就无法确定编程者倒底是想调用哪个方法了，因为它无法通过返回结果类型来判断。

override可以翻译为覆盖，从字面就可以知道，它是覆盖了一个方法并且对其重写，以求达到不同的作用。对我们来说最熟悉的覆盖就是对接口方法的实现，在接口中一般只是对方法进行了声明，而我们在实现时，就需要实现接口声明的所有方法。除了这个典型的用法以外，我们在继承中也可能会在子类覆盖父类中的方法。在覆盖要注意以下的几点：

覆盖的方法的标志必须要和被覆盖的方法的标志完全匹配，才能达到覆盖的效果；

覆盖方法的返回值必须和被覆盖的方法的返回值一致；

覆盖的方法所抛出的异常必须和被覆盖方法的所抛出的异常一致，或者是其子类；

被覆盖的方法不能为private，否则在其子类中只是新定义了一个方法，并没有对其进行覆盖。

overload对我们来说可能比较熟悉，可以翻译为重载，它是指我们可以定义一些名称相同的方法，通过定义不同的输入参数来区分这些方法，然后再调用时，VM就会根据不同的参数样式，来选择合适的方法执行。在使用重载要注意以下的几点：

在使用重载时只能通过不同的参数样式。例如，不同的参数类型，不同的参数个数，不同的参数顺序（当然，同一方法内的几个参数类型必须不一样，例如可以是fun(int,float)，但是不能为fun(int,int)）；

不能通过访问权限、返回类型、抛出的异常进行重载；

方法的异常类型和数目不会对重载造成影响；

对于继承来说，如果某一方法在父类中是访问权限是priavte，那么就不能在子类对其进行重载，如果定义的话，也只是定义了一个新方法，而不会达到重载的效果。

### 19、构造器Constructor是否可被override?

构造器Constructor不能被继承，因此不能重写Override，但可以被重载Overload。

### 20、接口是否可继承接口?抽象类是否可实现(implements)接口?抽象类是否可继承具体类(concrete class)?抽象类中是否可以有静态的main方法？

接口可以继承接口。抽象类可以实现(implements)接口，抽象类是可以继承具体类。抽象类中可以有静态的main方法

备注：只要明白了接口和抽象类的本质和作用，这些问题都很好回答，你想想，如果你是java语言的设计者，你是否会提供这样的支持，如果不提供的话，有什么理由吗？如果你没有道理不提供，那答案就是肯定的了。

只有记住抽象类与普通类的唯一区别就是不能创建实例对象和允许有abstract方法。
