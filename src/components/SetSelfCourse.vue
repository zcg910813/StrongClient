<template>
  <div id="dialog">
    <el-dialog title="设置私教预约" width='620px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form" class="set-selfcourse">
            <el-form-item label="每日最多上课次数">
              <el-input-number v-model="num" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
            </el-form-item>
            <h3>设置上课周期</h3>
            <div class="set-cycle">
              <div>
                <span>星期</span>
                <el-checkbox-group v-model="week">
                  <el-checkbox label="星期一"></el-checkbox>
                  <el-checkbox label="星期二"></el-checkbox>
                  <el-checkbox label="星期三"></el-checkbox>
                  <el-checkbox label="星期四"></el-checkbox>
                  <el-checkbox label="星期五"></el-checkbox>
                  <el-checkbox label="星期六"></el-checkbox>
                  <el-checkbox label="星期日"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="set-self-course">
                <span>可预约时间</span>
                <el-time-select
                  v-model="time"
                  :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '24:00'
                  }"
                  placeholder="选择时间">
                </el-time-select>
                <el-time-select
                  placeholder="结束时间"
                  v-model="endTime"
                  :picker-options="{
                    start: '00:00',
                    step: '00:30',
                    end: '24:00',
                    minTime: time
                  }">
                </el-time-select>
              </div>
              <p class="tip" style="margin-top:6px;font-size: 12px;color: #f40;">
                说明：可预约时间段为{{week.join('、')}}的 {{(time ? time : '-') + '-' + (endTime ? endTime : '--')}}
              </p>
            </div>
          </el-form>
          <div class="tipMessage tip-color">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { worktimeupdate } from '@/api/coach'
export default {
  props: ['setData'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      start: '',
      end: '',
      num: 1,
      endTime: '',
      week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      time: '',
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
      outDateEnd: false,
      outDateStart: false
    }
  },
  created () {
  },
  methods: {
    focus () {
      this.tipMessage = ''
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    handleChange (value) {
      console.log(value)
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    cancel () {
      this.dialogVisible = false
    },
    closed () {
      this.$parent.setCloseEvent()
    },
    confirm () {
      for (let i = 0; i < this.week.length; i++) {
        let temp = this.week[i]
        if (temp === '星期一') {
          this.week[i] = 1
        }
        if (temp === '星期二') {
          this.week[i] = 2
        }
        if (temp === '星期三') {
          this.week[i] = 3
        }
        if (temp === '星期四') {
          this.week[i] = 4
        }
        if (temp === '星期五') {
          this.week[i] = 5
        }
        if (temp === '星期六') {
          this.week[i] = 6
        }
        if (temp === '星期日') {
          this.week[i] = 0
        }
      }
      worktimeupdate({
        id: this.setData.id,
        limit: this.num,
        workTime: this.time + '-' + this.endTime,
        weeks: this.week
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '私教预约成功'
          })
          this.$parent.getCoachData()
        }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/course.styl'
</style>
