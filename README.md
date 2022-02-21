# 1. 初探
# 1.1 先创建项目,执行 `yarn create nuxt-app nuxt-demo`
![屏幕截图 2022-02-19 141642.png](https://upload-images.jianshu.io/upload_images/25820166-dbb73248e25edea9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
#1.2 执行`npm run dev`
![屏幕截图 2022-02-19 144539.png](https://upload-images.jianshu.io/upload_images/25820166-3e0efc1f4edde562.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
***

# 2.router
+ nuxt 会根据 pages 文件内容自动生产路由
+ nuxt 会根据所有路线自动拆分代码
+ 创建四个路由home,login,product,productDetail,其中productDetail是product子路由,productDetail是动态路由
+ 这里我们主要看product和productDetail的创建，其他路由类似
+ product 页面
```JavaScript
//pages\product.vue
<template>
  <div>
    <div>
      Produt page
    </div>
    <div>
      <NuxtLink to="/product/id1">
        产品1
      </NuxtLink>
      <NuxtLink to="/product/id2">
        产品2
      </NuxtLink>
      <NuxtLink to="/product/id3">
        产品3
      </NuxtLink>
    </div>
    <div>
      <NuxtChild />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProdutPage'
})
</script>
```
+ productIndex 页面，这个页面在没有子路由匹配时显示在`<nuxt/>`上
```javascript
// pages\product\index.vue
<template>
  <div />
</template>
```
+ ProductDetail 页面
```javascript
// pages\product\_id.vue
<template>
  <div>
    ProductDetail - {{ id }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductDetail',
  computed: {
    id () {
      return this.$route.params?.id || ''
    }
  }
})
</script>
```
+ 最终展示
![image.png](https://upload-images.jianshu.io/upload_images/25820166-1673472b34456903.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
***
# 3.layout
+ 创建 layouts
+ 没有定义布局属性页面走layout 里面的default.vue
+ 新建menu.vue布局
+ 在需要用到layout的组件增加 `layout: 'menu'`
+ 
```javascript
// layouts\menu.vue
<template>
  <div class="menu-layout">
    <div class="menu">
      <div>导航栏</div>
      <NuxtLink to="/">
        Home
      </NuxtLink>
      <NuxtLink to="/login">
        Login
      </NuxtLink>
      <NuxtLink to="/product">
        Product
      </NuxtLink>
    </div>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MenuLayout'
})
</script>

<style scoped>
.menu-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-content: center;
}

.menu {
  width: 200px;
  height: 100%;
  display: flex;
  flex-flow: column;
}

.container {
  display: flex;
  flex-grow: 1;
}
</style>
```
+ 显示最终结果
![image.png](https://upload-images.jianshu.io/upload_images/25820166-238ededb8e2bf27a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
***

# 4.store
+ 默认不激活，当目录store里面包含一个不是隐藏的文件或文件的README.md文件,则自动激活
+ index.js 作为**根模块**,其他文件则转换为 **命名空间模块**
+ 根模块
```
// store\index.ts

// state 每次客户端请求都会创建一个全新的
export const state = () => ({
  visitsNumber: 0
})

export const mutations = {
  increment (state:any) {
    state.visitsNumber++
  }
}
```
+ 命名空间模块
```
// store\todos.ts

// 每次客户端请求都会创建一个全新的 state
export const state = () => ({
  curTime: 0
})

export const mutations = {
  changeTime (state:any, time:number) {
    state.curTime = time
  }
}

export const actions = {
  async getTime ({ commit }:any) {
    // 模拟接口请求
    const time = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(Date.now())
      }, 1000)
    })

    commit('changeTime', time)

    return time
  }
}
```
+ 使用与spa的vue是一样的，只不过每次客户端请求，都会先在服务端初始化一份全新的state内容，保证数据隔离，然后传给客户端接管
```
// pages\index.vue

<template>
  <div>
    HomePage

    <p>
      访问次数:{{ visitsNumber }}
    </p>

    <p>
      vuex储存时间:{{ curTime }}
      <a-button type="primary" @click="handleClick">
        本地改变时间
      </a-button>
    </p>

    <p>
      接口调用时间:{{ time }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default Vue.extend({
  name: 'IndexPage',
  layout: 'menu',
  // 只会在服务端执行
  async asyncData ({ store }) {
    // 模拟接口请求和store方法调用
    const time = await store.dispatch('todos/getTime')

    return {
      time
    }
  },
  data () {
    return {
      time: 0
    }
  },
  computed: {
    ...mapState(['visitsNumber']),
    ...mapState('todos', ['curTime'])
  },
  methods: {
    ...mapActions('todos', ['getTime']),
    handleClick () {
      this.getTime()
    }
  }

})
</script>

```
+ 最终结果
![image.png](https://upload-images.jianshu.io/upload_images/25820166-4dbe690143d3a9d5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
***

# 5. middleware
+ 1.执行顺序 `nuxt.config.js` （按文件内的顺序）> 匹配的布局 > 匹配的页面
+ 类型有三种
  + `Router Middleware` 配置在 `nuxt.config.js`
  + `命名中间件` 在middleware目录下的文件名称,然后在特定布局或页面中增加 `middleware: ['auth', 'stats']`属性来使用这些中间件
  + `匿名中间件` 布局或页面中,middleware为匿名函数或者匿名函数数组

+ **Router Middleware** 
```
// middleware\router.middleware.ts
// 可以是异步的
export default function ({ route }:any) {
  console.log(route.path, 'router.middleware')
}
```
```
// nuxt.config.js
  router: {
    middleware: 'router.middleware'
  }
```

+ **命名中间件**
```
// middleware\layout.middware.ts
// 可以是异步的
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function ({ store, redirect }:any) {
  console.log('layout.middware')
}
```
```
// layouts\menu.vue
export default Vue.extend({
  middleware: ['layout.middware']
})
```

+ **匿名中间件**
```
// pages\index.vue
  middleware (context) {
    console.log('home 匿名middleware')
  },
```
***

# 6.serverMiddleware
+ 在服务器端运行，可用于服务器特定任务，例如处理 API 请求或服务资产
+ 如果中间件不是最后一个，不要忘记在最后调用 next！
+ 我们可以用serverMiddleware 模拟服务器本请求的次数
+ 
```
// server-middleware\visitsNumber.ts
let visitsNumber = 0

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function (req:any, res:any) {
  res.setHeader('Content-Type', 'application/json')
  res.write(JSON.stringify({ visitsNumber: visitsNumber++ }))
  res.end()
}
```
+ 
```
// nuxt.config.js

  // 服务端中间件
  serverMiddleware: [
    { path: '/visits', handler: '~/server-middleware/visitsNumber.ts' }
  ]
```
***
# 7.axios
+ `https://axios.nuxtjs.org/usage`
+ 在 `asyncData` 的`context`,`created,mounted,actions`的`this`上都可以拿到`$axios`
+ 我们可以定义一个axios的插件,创建自己的axios
```
// plugins\axios.ts

export default function ({ $axios, redirect }:any, inject:any) {
  console.log('axios plugins')
  // 可以创建新的实例，然后inject到context上
  const api = $axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 6000
  })
  inject('api', api)
}
```
+ 添加axios插件
```
// nuxt.config.js

  plugins: [
    '@/plugins/axios',
  ],
```
+ 每次客户端请求调用`context.$api.get('/visits')`,http请求带服务器的中间件，服务器中间件会将请求次数加1并返回
```
// store\index.ts

export const actions = {
  async nuxtServerInit (store:any, context:any) {
    console.log('nuxtServerInit')

    // 每次初始化都调用接口
    const res = await context.$api.get('/visits')
    const { visitsNumber } = res.data
    store.commit('increment', visitsNumber)
  }
}
```

+ 最终结果
![image.png](https://upload-images.jianshu.io/upload_images/25820166-83588068cff69c52.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
***

+ 8.生命周期
![de48ca.png](https://upload-images.jianshu.io/upload_images/25820166-1e519d37185fe308.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

+ 加上日志，看看打印结果
![企业微信截图_16453572626066.png](https://upload-images.jianshu.io/upload_images/25820166-128d4104d303f524.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
+ plugins > nuxtServerInit > middleware (nuxt.config > layout > page) > asyncData > render-routeContext > render-route > render-routeDone
+ 每次请求都是这个顺序
***









