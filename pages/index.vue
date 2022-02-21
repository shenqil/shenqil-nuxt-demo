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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  middleware (context) {
    console.log('home 匿名middleware', Date.now())
  },
  // 只会在服务端执行
  async asyncData ({ store }) {
    console.log('home asyncData', Date.now())

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
