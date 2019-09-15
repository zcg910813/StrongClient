<template>
  <div class="appMain">
    <h3 class="title">短信</h3>
    <div class="message-notice">
      <div>
        <h3>剩余短信条数</h3>
        <h1>10000</h1>
      </div>
      <div>
        <el-button type="primary">短信充值</el-button>
        <span>短信充值记录</span>
      </div>
    </div>
  </div>
</template>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
<script>
export default {
  data () {
    return {}
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  }
}
</script>
