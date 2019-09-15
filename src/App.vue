<template>
  <div id="app" class="layout-guid">
     <router-view v-if='isRouterAlive'></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
}
</script>
<style lang='stylus'>
@import './assets/css/index.styl'
@import './assets/css/common.styl'
</style>
