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
  name: 'ProdutPage',
  layout: 'menu'
})
</script>
