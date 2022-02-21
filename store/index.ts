// state 每次客户端请求都会创建一个全新的
export const state = () => ({
  visitsNumber: 0
})

export const mutations = {
  increment (state:any, number:number) {
    state.visitsNumber = number
  }
}

export const actions = {
  async nuxtServerInit (store:any, context:any) {
    console.log('nuxtServerInit', Date.now())

    // 每次初始化都调用接口
    // const res = await context.$api.get('/visits')
    // const { visitsNumber } = res.data
    store.commit('increment', 1)
  }
}
