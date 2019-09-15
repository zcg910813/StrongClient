<template>
  <div class="appMain">
    <div class="tabpane-modal course-start">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="团课" name="course">
          <courseArrange></courseArrange>
        </el-tab-pane>
        <el-tab-pane label="团课排课" name="courseArrange">
          <course></course>
        </el-tab-pane>
        <el-tab-pane label="团课预约限制" name="courseLimit">
          <courseLimit></courseLimit>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
// import {  } from ''
import courseArrange from '@/components/course/courseArrange'
import course from '@/components/course/course'
import courseLimit from '@/components/course/courseLimit'
export default {
  components: {
    courseArrange,
    course,
    courseLimit
  },
  data () {
    return {
      activeName: 'course'
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  methods: {
    signin () {},
    getData () {},
    handleClick (e) {
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/course.styl'
</style>
