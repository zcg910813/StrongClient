<template>
  <div id="dialog">
    <el-dialog title="签退" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form" class="course-signinList">
            <el-form-item label="上课会员">
              <span>{{signOutData.username}}</span>
            </el-form-item>
            <el-form-item label="课 程" class="course">
              <span>{{signOutData.cardName}}</span>
            </el-form-item>
            <el-form-item label="签到教练" class="signin-coach">
              <span>{{signOutData.coachname}}</span>
            </el-form-item>
            <el-form-item label="消课次数">
              <span>{{signOutData.totalSignNumber}}次</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确认签退</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { checkBackPrivateTable } from '@/api/sign'
export default {
  props: ['signOutData'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      name: '',
      course: '',
      coach: '',
      amount: '',
      disabled: false
    }
  },
  created () {
  },
  methods: {
    confirm () {
      this.disabled = true
      checkBackPrivateTable({
        id: this.signOutData.id
      }).then(res => {
        this.disabled = false
        if (res.code === 200) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '签退成功'
          })
          this.$parent.getQueryOrderCoach()
        } else {
          this.$message({
            type: 'warning',
            message: res.errMsg
          })
        }
      })
    },
    cancel () {
      this.dialogVisible = false
    },
    closed () {
      this.$parent.CourseSignOutCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
