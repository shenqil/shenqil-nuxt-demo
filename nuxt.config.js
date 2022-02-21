/* eslint-disable @typescript-eslint/no-unused-vars */
export default {
  target: 'server', // server(默认), static
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-demo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/axios',
    '@/plugins/antd-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  // 路由中间件
  router: {
    middleware: 'router.middleware'
  },

  // 服务端中间件
  serverMiddleware: [
    { path: '/visits', handler: '~/server-middleware/visitsNumber.ts' }
  ],

  hooks: {
    render: {
      before (context) {
        console.log('render-before', Date.now())
      },
      setupMiddleware (context) {
        console.log('render-setupMiddleware', Date.now())
      },
      errorMiddleware (context) {
        console.log('render-errorMiddleware', Date.now())
      },
      resourcesLoaded (context) {
        console.log('render-resourcesLoaded', Date.now())
      },
      done (context) {
        console.log('render-done', Date.now())
      },
      routeContext (context) {
        console.log('render-routeContext', Date.now())
      },
      route (context) {
        console.log('render-route', Date.now())
      },
      routeDone (context) {
        console.log('render-routeDone', Date.now())
      }
    }
  }
}
