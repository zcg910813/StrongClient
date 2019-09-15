<template>
    <div class="app-main" v-loading.body.lock="loading" element-loading-text="拼命加载中">
        <div class="box-wrap">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
  name: 'box',
  data () {
    return {
    }
  },
  props: ['currentPage', 'crumbs'],
  computed: {
    loading () {
      return this.$store.state.users.loading
    }
  }
}
</script>
<style lang='stylus'>
.app-main
  height 100%
  -webkit-box-sizing border-box
  box-sizing border-box
  overflow auto
  overflow-x hidden
  position relative
  background-color #F8F8F9
.box-wrap
  // box-shadow 0 2px 4px rgba(0, 0, 0, 0.25)
  padding 20px
  min-height 95%
  padding-top 0
</style>
