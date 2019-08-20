> 构建一个通用的 react 项目架构模板

## 1.使用`create-react-app`新建项目.

## 2.删除多余文件,保留`App.js`和`index.js`即可.

## 3.新建项目文件结构:

-   `components` 公共组件
-   `pages` 逻辑页面,一般为路由页面
-   `utils` 工具函数库
-   `store` 状态管理库
-   `router.js` 页面路由

## 4. 安装插件

-   `axios`,`qs`模块. http 请求库
-   `node-sass`,`sass-loader`. `sass`支持.
-   `babel-plugin-react-css-modules`: 用于更简便的`css-modules`书写方案.此插件要安装到开发模式.
-   `postcss-scss`: 使`react-css-modules`识别`scss`.
-   `sass-resources-loader`: 使用`scss`全局资源(样式和公共变量).
-   `babel-plugin-transform-decorators-legacy`: `es-next`装饰器支持.
-   安装`babel-preset-x`.主要是新的 es7 语法支持.
    `yarn add babel-preset-env babel-preset-react babel-preset-es2015 babel-preset-stage-0 -D`

## 5.解压`webpack`配置

```
yarn eject
```

## 6.配置`webpack`

### 6.1 首先是`react-css-modules`部分

这里有两个部分需要修改. 第一个是对`.js`文件的处理,让`jsx`中的引用到`css-modules`的元素获得处理过(hash)的`className`. 第二个是对`.scss`文件的处理, 将所有的`.scss`文件进行重编译并添加的到 html 文档的`head`里面.

1.在`/config/webpack.config.dev.js`中, 找到`module.exports.module.rules.oneOf`, 再找到`test: /\.(js|jsx|mjs)$/`所在的对象.在`options`选项中添加相应的`plugins`:

```
plugins: [
    [
        'react-css-modules',
        {
            // 类名hash规则
            generateScopedName: '[local]-[hash:base64:10]',
            filetypes: {
                // 对 .scss 文件进行支持
                '.scss': { syntax: 'postcss-scss' }
            },
            // 属性映射名称,在jsx中使用到
            attributeNames: { classes: 'className', activeClass: 'activeClassName' }
        }
    ]
]
```

2.直接暴力修改原来的`test: /\.css$/`为`test: /\.scss$/`. 然后在`css-loader`的`options`中添加两个属性:

```
options: {
    // 开启css-modules
    modules: true,
    importLoaders: 1,
    // 类名hash规则
    localIdentName: '[local]-[hash:base64:10]'
}
```

> 这里要注意. 上述两个部分的'类名 hash 规则'必须一致. 否则编译后不会提示报错,但是没有效果.

### 6.2 全局 scss 资源

只需要在刚才的`test: /\.scss$/`中,添加两个 loader 即可:

```
{
    require.resolve('sass-loader'),
    {
        loader: 'sass-resources-loader',
        options: {
            resources: path.resolve(__dirname, '../src/assets/global-styles.scss')
        }
    }
}
```

这里的`__dirname`指的是代码所在的当前文件,即`webpack.config.dev.js`这个文件.后面的路径既是基于当前路径的相对路径.

## 7.在组件中使用 react-css-modules

在组件中只需直接引入`.scss`文件,其实同时可以引入多个,但我偏不.

```
import './styles.scss'
```

然后在`jsx`中添加`classes`属性. `classes`这个属性的名称是可以定制的.属性的值是字符串. 写法和传统的 css 类名一样.

```
<div classes="the-text">something</div>
```

## 8.mobx

### 8.1 安装插件

```
yarn add mobx mobx-react
yarn add babel-plugin-transform-decorators-legacy -D  //装饰器插件
```

### 8.2 配置.

添加`preset`和`plugin`,还是刚刚的那个`test: /\.(js|jsx|mjs)$/`,在`options`里面添加:

```
options: {
    presets: ['env', 'react', 'es2015', 'stage-0'],
    plugins: [
        'transform-decorators-legacy',
    ]
}
```

> 这里要注意,在`plugins`中有多个插件时,`transform-decorators-legacy`必须放在第一个,否则没有效果.

### 8.3 开始使用 mobx

> mobx 自身没有规范关于 store 的写法,虽然有一些推荐写法,但还是不全.鄙人自己写一个.

在`utils`文件夹中新建`mobx-store.js`.在其中定义 store 的写法.

在`store`文件夹中定义每个子模块时继承`StoreModule`这个类即可.关于`store`部分的写法,请听鄙人娓娓道来.

1. 根级 store 怎么写
2. 各个子 store 模块怎么写
3. 如果把 store 注入到项目
4. 组件中如何引用(过滤)

## 9.规范资源别名(alias)

主要是为了更方便地引用资源.在`webpack.config.dev.js`中,找到`alias`:

```
{
    '@': path.resolve(__dirname, './src')
}
```

使用别名后, vscode 会无法跟踪文件. 在项目根目录添加`jsconfig.json`文件来解决这个问题:

```
// /jsconfig.json

{
    "compilerOptions": {
        "baseUrl": "./",
        "paths": {
            "@/*": ["src/*"]
        },
        // 允许使用装饰器@
        "experimentalDecorators": true
    }
}
```

## 10.设置打包资源路径

默认打包的时候, 在编译出来的`index.html`里面, 所有引用的路径都是以`/`开头的. 这会导致无法直接运行打包好的项目. 其实只要将`/`改为`./`即可. 但是手动改毕竟不方便, 可以在配置中修改:

找到`/config/paths.js`中的这行代码

```
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/')
```

然后将`/`改为`./`就可以了.

## 11.使用 axios

axios 是目前基于`XMLHttpRequest`封装的比较健全和稳定的库. `fetch`还很新,相应的库还不是很健全.但未来必定成为主要技术.
安装依赖:

```
yarn add axios -D //主文件
yarn add qs -D //这是一个模块,帮助axios把参数转换为后端可以识别的数据格式
```

添加鄙人写的 axios api 的工具文件. 放在`/src/utils/aixos.js`

使用的时候,引用`get`,`post`,`all`这些方法即可,参数怎么写,看官网.

## 12.模块分组打包

项目打包时, 默认将所有组件打包成一个 js 文件. 如果项目比较打的时候, 首次加载 js 时会因文件过大, 导致加载很慢.
最好的方案是: 将使用的组件分类成不同的模块, 每个模块在应用使用时再加载, 做到按需加载的目的.
每个模块基本按照路由来划分, 公共组件也单独分成一类.
使用到的插件: `react-loadable`, 这个插件可以让组件通过异步加载. 使用到的知识点: `webpack chunk`. 这个知识点参考自 [vue-router 路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

首先安装插件

```
yarn add react-loadable
```

在引入组件时, 不直接使用这种方法引入:

```
import MyComp from './MyComp'
```

而是这样引入

```
import Loadable from 'react-loadable'

const MyComp = Loadable({
    loader: () = > import('./MyComp'),
    loading: () = > <div>Loading...</div>
})
```

如果有多个组件需要按需加载, 将这些组件打包到同一个 js 文件中. 这样需要定义一个包分组名称, 然后将组件打包到这个分组中.

```
const MyComp = Loadable({
    loader: () = > import(/* webpackChunkName: "my-component-group" */ './MyComp'),
    loading: () = > <div>Loading...</div>
})

const MyCompTwo = Loadable({
    loader: () = > import(/* webpackChunkName: "my-component-group" */ './MyCompTwo'),
    loading: () = > <div>Loading...</div>
})
```

这样, `MyComp`和`MyCompTwo`这两个组件就会被统一打包到名为`my-component-group`的 js 中.

## 13.关闭自动导入

`vscode` 编辑器会在用户输入相应的模块名,包名,方法名,变量名时,会自动导入相同名称的资源. 但是很多时候这个功能会有错误, 所以建议不要使用这个功能.
编辑器设置:

```
// 禁用自动导入
"typescript.autoImportSuggestions.enabled": false
```

## 14.打包项目时禁用`console`

只需在`/config/webpack.config.prod.js`找到`new webpack.optimize.UglifyJsPlugin`后,修改:

```
compress: {
    warnings: false,
    comparisons: false,
    drop_console: false, //禁用 console
    drop_debugger: false //禁用 debugger
},
```

## 15.打包时禁用'source map'

```
// /config/webpack.config.prod.js

const shouldUseSourceMap = false
```

## 最后

以上就是目前 react 项目模板的一些内容.
关于`webpack`的配置是在开发模式下的,生产模式要另外配置,也就是 CtrlC+CtrlV 的事情.

## 使用

```
git clone https://gitee.com/darcrandex/react-project-template.git your-project-name
cd your-project-name
npm install
npm start
```
