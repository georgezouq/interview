# Webpack

## 有哪些常见的 Loader

* ts-loader
* babel-loader
* sass-loader
* css-loader
* vue-loader

## 有哪些常见的 Plugin

* VueLoaderPlugin
* MiniCssExtractPlugin
* ignore-plugin 忽略文件
* html-webpack-plugin 简化 HTML 文件的创建

## Loader 和 Plugin 的区别

* Loader 本质上是一个函数，在其中接收到内容进行转换，返回转换后的结果。因为 webpack 只认识 JS，所以 Loader 就成了翻译官，对其他类型的资源进行转译。
* Plugin 插件，基于事件流框架 Tapable，插件可以拓展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出很多事件，Plugin 可以监听这些事件，在何时的时机通过 Webpack 提供的 API 改变输出的结果。
* Loader 在 module.rules 中配置，作为模块解析规则，类型为数组
* Plugin 在 plugins 中单独配置，类型为数组。

## Webpack 构建流程

* 初始化参数：配置文件 和  Shell 语句中读取与合并
* 开始编译：根据上一步参数初始化得到 Compiler 对象，加载所有配置的插件，执行对象的 run 开始执行编译。
* 确定入口：根据配置中的 entry 找出所有的入口文件。
* 编译模块：从入口触发，调用所有配置的 Loader 对模块进行编译，找出该模块依赖的模块，在递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
* 完成模块编译：经过Loader 翻译完所有模块后，得到每个模块被翻译后的最终内容以及他们之间的依赖关系
* 输出资源：根据入口 和 模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表。
* 输出完成：

