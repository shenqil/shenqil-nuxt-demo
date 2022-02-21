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
  name: 'MenuLayout',
  middleware: ['layout.middware']
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
