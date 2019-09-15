<template>
  <div id="dialog">
    <el-dialog title="私教预约消假" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content perslAport">
          <el-form ref="form" class="set-selfcourse">
            <!-- <div class="notice">
              <p><span>注: </span> 在指定周期内会员无法再预约该教练的私教课程</p>
              <p>已经预约的课程不会取消, 请处理好会员交接事宜</p>
            </div> -->
            <el-form-item label="教 练" class="coach-tip">
              <span>{{this.coachInfo.name}}</span>
            </el-form-item>
            <el-form-item label="请假时间" class="picker-time">
              <span>{{this.coachInfo.pauseWorkBeginDate + '~' + this.coachInfo.pauseWorkEndDate}}</span>
              <!-- <el-date-picker
                v-model="start"
                type="date"
                placeholder="开始时间" @change="focus" :picker-options="pickerBeginDateAfter">
              </el-date-picker>&nbsp;&nbsp;至&nbsp;&nbsp;
              <span class="outDateStart" v-if="outDateStart">请设置课程开始时间</span>
              <el-date-picker
                v-model="end"
                type="date"
                placeholder="结束时间" @change="focus" :picker-options="pickerBeginDateBefore">
              </el-date-picker>
              <span class="outDateEnd" v-show="outDateEnd">请设置课程结束时间</span>
            </el-form-item> -->
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="margin-top: 30px;">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { pauseworktimeupdate } from '@/api/coach'
export default {
  props: ['coachInfo'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true
      // pickerBeginDateBefore: {
      //   disabledDate: (time) => {
      //     let beginDateVal = this.start
      //     if (beginDateVal) {
      //       return time.getTime() < beginDateVal
      //     }
      //   }
      // },
      // pickerBeginDateAfter: {
      //   disabledDate: (time) => {
      //     let beginDateVal = this.end
      //     if (beginDateVal) {
      //       return time.getTime() > beginDateVal
      //     }
      //   }
      // },
      // outDateStart: false,
      // outDateEnd: false,
      // start: '',
      // end: ''
    }
  },
  created () {
  },
  methods: {
    confirm () {
      pauseworktimeupdate({
        id: this.coachInfo.id,
        pauseWorkBeginDate: '',
        pauseWorkEndDate: ''
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '消假成功',
            duration: 1000
          })
          this.dialogVisible = false
          this.$parent.getCoachData()
        } else {
          throw res
        }
      })
    },
    cancel () {
      this.dialogVisible = false
    },
    closed () {
      this.$parent.removeVacationEventClose()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
