<template>
  <div id="dialog">
    <el-dialog title="取消预约" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form" class="course-signinList">
            <el-form-item label="上课会员">
              <span>{{cancelData.username}}</span>
            </el-form-item>
            <el-form-item label="课 程" class="course">
              <span>{{cancelData.cardName}}</span>
            </el-form-item>
            <el-form-item label="上课教练" class="signin-coach">
              <span>{{cancelData.coachname}}</span>
            </el-form-item>
            <el-form-item label="预约时间">
              <span>{{cancelData.totalSignNumber}}次</span>
            </el-form-item>
            <p class="cancel-order" style="font-size: 12px;">取消预约后, 课程会返还给会员, 预约记录作废</p>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">关闭</el-button>
            <el-button type="primary" @click="confirm">取消预约</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { cancelPrivateTable } from '@/api/sign'
export default {
  props: ['cancelData'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      name: '',
      course: '',
      coach: '',
      amount: ''
    }
  },
  created () {
  },
  methods: {
    confirm () {
      cancelPrivateTable({
        id: this.cancelData.id
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '已经取消预约'
          })
          this.$parent.getQueryOrderCoach()
        }
      })
    },
    cancel () {
      this.dialogVisible = false
    },
    closed () {
      this.$parent.CancelOrderCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
