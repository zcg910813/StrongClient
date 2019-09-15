<template>
  <div class="wrapper">
    <app-header></app-header>
    <SideBar></SideBar>
    <div class="contentPage">
      <Box v-loading="loading" element-loading-text="拼命加载中">
        <router-view></router-view>
      </Box>
    </div>
  </div>
</template>
<script>
import appHeader from '../components/Header.vue'
import SideBar from '../components/SideBar.vue'
import Box from '../components/Box.vue'
export default {
  name: 'index',
  components: { appHeader, SideBar, Box },
  data () {
    return {
      loading: false
    }
  },
  methods: {}
}
</script>
<style lang='stylus'>
.wrapper
  height 100%
  box-sizing border-box
  padding-top 60px
.contentPage
  position relative
  height 100%
  margin-left 205px
  .appMain
    height 100%
    -webkit-box-sizing border-box
    box-sizing border-box
    overflow auto
    overflow-x hidden
    position relative
    padding 0 30px
</style>
