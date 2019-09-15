<template>
  <div class="appMain">
    <div class="tabpane-modal course-start">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="私教课种类" name="selfCourse">
          <selfCourse></selfCourse>
        </el-tab-pane>
        <el-tab-pane label="私教预约" name="selfOrder">
          <selfOrder></selfOrder>
        </el-tab-pane>
        <el-tab-pane label="私教预约限制" name="selfLimit">
          <selfLimit></selfLimit>
        </el-tab-pane>
        <el-tab-pane label="会员购课" name="buypricourse">
          <buypricourse></buypricourse>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import selfCourse from '@/components/course/selfCourse'
import selfOrder from '@/components/course/selfOrder'
import selfLimit from '@/components/course/selfLimit'
import buypricourse from '@/components/course/buypricourse'
export default {
  components: {
    selfCourse,
    selfOrder,
    selfLimit,
    buypricourse
  },
  data () {
    return {
      activeName: 'selfCourse'
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  methods: {
    handleClick (e) {}
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/course.styl'
</style>
