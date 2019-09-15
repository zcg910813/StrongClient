<template>
  <div id="dialog">
    <el-dialog title="私教预约请假" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content perslAport">
          <el-form ref="form" class="set-selfcourse">
            <div class="notice">
              <p><span>注: </span> 在指定周期内会员无法再预约该教练的私教课程</p>
              <p>已经预约的课程不会取消, 请处理好会员交接事宜</p>
            </div>
            <el-form-item label="教 练" class="coach-tip">
              <span>{{coachNames}}</span>
            </el-form-item>
            <el-form-item label="temp" class="picker-time">
              <span slot="label"><i>*</i>持续时间</span>
              <el-date-picker
                v-model="start"
                type="date"
                placeholder="开始时间" @change="focus" :picker-options="pickerBeginDateAfter">
              </el-date-picker>&nbsp;&nbsp;~&nbsp;&nbsp;
              <span class="outDateStart" v-if="outDateStart">请设置课程开始时间</span>
              <el-date-picker
                v-model="end"
                type="date"
                placeholder="结束时间" @change="focus" :picker-options="pickerBeginDateBefore">
              </el-date-picker>
              <span class="outDateEnd" v-show="outDateEnd">请设置课程结束时间</span>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 50px;">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
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
  props: ['coachID', 'coachNames', 'recoverSingle'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = this.start
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.end
          if (beginDateVal) {
            return time.getTime() > beginDateVal
          }
        }
      },
      outDateStart: false,
      outDateEnd: false,
      start: '',
      end: ''
    }
  },
  created () {
  },
  methods: {
    change () {
      this.tipMessage = ''
    },
    confirm () {
      if (!this.start) {
        this.tipControl('请选择开始时间')
      } else if (!this.end) {
        this.tipControl('请选择结束时间')
      } else {
        pauseworktimeupdate({
          id: this.coachID,
          pauseWorkBeginDate: this.start,
          pauseWorkEndDate: this.end
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: this.recoverSingle === 'recover' ? '恢复成功' : '请假成功',
              duration: 1000
            })
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '私教预约请假成功'
            })
            this.$parent.getCoachData()
          } else {
            throw res
          }
        }).catch(res => {
          this.tipControl(res.errMsg)
        })
      }
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    cancel () {
      this.dialogVisible = false
    },
    closed () {
      this.$parent.perslApotLeaveCloseEvent()
    },
    focus () {
      this.tipMessage = ''
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
