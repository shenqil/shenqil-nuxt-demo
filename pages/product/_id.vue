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
