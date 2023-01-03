# 网络安全

### 基于XSS攻击, 窃取Cookie信息, 并冒充他人身份。

1. 方法一： 给Cookie添加HttpOnly属性, 这种属性设置后, 只能在http请求中传递, 在脚本中, document.cookie无法获取到该Cookie值. 对XSS的攻击, 有一定的防御值. 但是对网络拦截, 还是泄露了.
2. 方法二： 在cookie中添加校验信息, 这个校验信息和当前用户外置环境有些关系,比如ip,user agent等有关. 这样当cookie被人劫持了, 并冒用, 但是在服务器端校验的时候, 发现校验值发生了变化, 因此要求重新登录, 这样也是种很好的思路, 去规避cookie劫持.
3. 方法三： cookie中session id的定时更换, 让session id按一定频率变换, 同时对用户而言, 该操作是透明的, 这样保证了服务体验的一致性.

### rel='noopener noreferrer'

1. 当您的页面链接至使用 target="_blank" 的另一个页面时，新页面将与您的页面在同一个进程上运行。 如果新页面正在执行开销极大的 JavaScript，您的页面性能可能会受影响。

2. target="_blank"也是一个安全漏洞。新的页面可以通过window.opener 访问您的窗口对象，并且它可以使用 window.opener.location = newURL将您的页面导航至不同的网址。

[来源: rel='noopener noreferrer' 知多少](https://juejin.cn/post/6844904116892745735)