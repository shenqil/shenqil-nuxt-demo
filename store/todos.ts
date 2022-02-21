
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
