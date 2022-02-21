
export default function ({ $axios, redirect }:any, inject:any) {
  console.log('axios plugins', Date.now())
  // 可以创建新的实例，然后inject到context上
  const api = $axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 6000
  })
  inject('api', api)

  // // 也可以快速注册拦截器
  // $axios.onRequest((config:any) => {
  //   console.log('Making request to ' + config.url)
  // })

  // $axios.onError((error:any) => {
  //   const code = parseInt(error.response && error.response.status)
  //   if (code === 400) {
  //     redirect('/400')
  //   }
  // })
}
