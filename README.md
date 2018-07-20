# mes-2.x

MES系统重构项目

## Build Setup

``` bash
# create project
vue init webpack projectName

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# 2018.05.10 新增 express
cd express 

node index.js
```

## Install Plugins

``` bash
# dependencies
npm install axios element-ui vuex fontawesome

# devDependencies
npm install --save-dev stylus stylus-loader babel-plugin-component express mockjs
```

## Project Tree

```
static  // 静态资源文件，
  |
  ├─ images/ 
  |
 src    // 开发目录文件 
  |
  ├─ main.js
  |
  ├─ assets/
  │    │
  │    └─ images/
  │    │
  │    └─ scripts/
  │    │
  │    └─ styles/
  │
  ├─ router/
  │
  ├─ store/
  │
  └─ components/
       │
       └─ element-ui/ // 按需加载的 Element-ui 组件
       │
       └─ packages/ // 自定义组件
       │
       └─ views/ // 模块组件
       │
       └─ index.vue
```

## Another

README.md中记录的大部分都是该项目中遇到过的问题。相关的代码规范与使用说明，都在对应的文件目录下，如css代码规范在styles文件夹下，javascript代码规范在scripts文件夹下。

## 关于代码上传

> 可能会发生 .babelrc, .postcssrc.js 等文件忽略上传，导致 npm run dev 时候抛出‘Error: No PostCSS Config found in’错误

## 纪要

## Setting

build>webpack.base.conf.js
``` javascript
 resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),

        // 新增部分
        'assets': resolve('src/assets'),
        'components': resolve('src/components'),
        'router': resolve('src/router'),
        'store': resolve('src/store')
    }
}
```

.babelrc
``` json

// 引入插件 babel-plugin-component 后新增的配置，在 element-ui 官网有详细说明
{
    "presets": [
        [
            "env", 
            {
                "modules": false,
                "targets": {
                    "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                }
            }
        ],
        "stage-2"
    ],
    "plugins": [
        "transform-vue-jsx", 
        "transform-runtime", 
        [
            "component", 
            [
                {
                    "libraryName": "element-ui",
                    "styleLibraryName": "theme-chalk"
                }
            ]
        ]
    ]
}
```

## Vue组件生命周期

```
1. beforeCreate 
2. created
3. beforeMount
4. Mounted
5. beforeUpdate
6. Updated
7. activated
8. deactivated
9. beforeDestroy
10. destroyed
11. errorCaptured

```

## Vue 事件修饰符

```html
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

## 懒加载组件

```js
const index = resolve => require(['path/component.vue'], resolve);

// reuqire 函数中的路径加载的是组件文件，而不是js文件。
```

## 自定义组件

```js
// 注册组件
import package from './path';

const layoutPageage = [ package ]

function install (Vue){
    if(install.installed){
        return
    }

    layoutPageage.map(package => Vue.component(package.name, package))
}
```

> 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。

```jsx
// component
{
    Vue.component('al-title', {
        props: ['value'],
        computed:{
            computedValue: function(){
                return this.value ? 'haha' : 'hehe'
            }
        }
        template:
            `
            <p>{{computedValue}}</p>
            `
    })
}

// 局部注册组件
import dialogComponent from './'

export default {
    components:{
        'dialog-name': dialogComponent
    }
}

// 如果一个原始的值传入且需要进行转换。最好使用 computed 计算。

// use 
<al-title v-model="name"/>

// 同
<al-title v-bind:value='name'/>

// 子组件传递数据给父组件
{
    this.$emit('input', bindValue)
}
```

## 加入 express [ 尝试 ]

> 吐槽: 太天真了，调试了一晚上才拿到了数据；

```js
// npm install express --save-dev
// 详情请查询官方文档

// 关于跨域代理

// 1、./config/index.js
proxyTable : {
    '/': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
        pathRewrite: {
            '^/': ''
        },
    }
}

// 2、express/index.js
const server = express();

server.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");　
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

```

## 加入Vuex

> Vuex 中文文档与思否(segmentfault)参考地址[https://segmentfault.com/a/1190000009404727] 

> Vuex 适合解决大型单页项目中的组件通信问题，但不能处理数据共享问题，例如页面刷新后无法保留Vuex.state中的数据。

```js
{
    State: {
        //
    },
    Getter: {
        //
    },
    Mutation: {
        //
    },
    Module:{
        //
    },

    Action: {
        /**
         * Action 类似于 mutation，不同在于：
         * Action 提交的是 mutation，而不是直接变更状态。
         * Action 可以包含任意异步操作。
         * Action 通过 store.dispatch 方法触发：
         * this.$store.dispatch('handler')
         * / 
    }
}
```

## 各模块下的 dialog 组件

```js
// 父组件引入
import dialogName from './path';

export default{
    components: {
        'dialog-name': dialogName
    },
}

// 子组件接收
export default{    
    name: 'dialog-name',
    props: ['params'],
    computed: {
        visible: {
            get: function() {
                return this.$store.state.dialog.dialogVisible
            },
            set: function(val) {
                this.$store.commit('computedVisible', val);
            }
        }
    },
    watch: {
        visible(val) {
            val && this.doSomething();
        }
    }
}
```

```html
<!-- 父组件引入 -->
<dialog-name v-if="visible" :params="dialogParams"/>

<!-- 全屏dialog -->
<template>
    <div class="al-dialog__group" v-show="visible">
        <el-dialog
            :modal="false"
            :title="dialogTitle"
            :visible.sync="visible"
            :fullscreen="true"
            @close="closeDialog">
            
        </el-dialog>
    </div>
</template>

<!-- 带遮罩层的dialog -->
<template>
    <div class="al-dialog__group" v-show="visible">
        <el-dialog
            :title="dialogTitle"
            :visible.sync="visible"
            :fullscreen="true"
            :modal-append-to-body="false"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            @close="closeDialog">
        </el-dialog>
    </div>
</template>
```

## throw error

```
Error in render: "TypeError: _self.$scopedSlots.default is not a function"
v-if 设置 key
```