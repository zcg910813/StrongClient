<template>
  <div id="dialog">
    <el-dialog title="复制排课" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content copy-class">
          <P>将{{this.courseList[0].day + '至' + this.courseList[6].day}}的课程复制到</P>
          <el-checkbox v-for="(item, index) in othersWeeks" :key="item.id" @change="copycheckBoxHandle(index)">{{ item }}</el-checkbox>
          <div class="tipMessage tip-color" style="text-indent: 100px;">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { copyLeagueHandle } from '@/async/grouplesson'
export default {
  props: ['courseList'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      name: '',
      sex: 'boy',
      tel: '',
      position: '',
      positions: [],
      othersWeeks: [],
      MondayList: [],
      copyDate: {
        sourceDate: '',
        targetDate: []
      },
      disabled: false
    }
  },
  created () {
    this.copyDate.sourceDate = this.courseList[0].day
    this.othersWeeks = []
    this.MondayList = []
    let oDate = new Date(this.courseList[0].day)
    let week = oDate.getDay()
    let minus = week ? week - 1 : 6
    oDate.setDate(oDate.getDate() - minus)
    let MondayTime = ''
    let SundayTime = ''
    let allTime = ''
    let flag = '(本周)'
    for (let i = 1; i < 9; ++i) {
      let y = oDate.getFullYear()
      let m = oDate.getMonth() + 1
      let d = oDate.getDate()
      if (i % 2 === 0) {
        SundayTime = y + '-' + m + '-' + d
        if (i !== 2) {
          flag = ''
        }
        SundayTime = new Date(SundayTime).format('yyyy-MM-dd')
        MondayTime = new Date(MondayTime).format('yyyy-MM-dd')
        allTime = MondayTime + '至' + SundayTime + ' ' + flag
        this.othersWeeks.push(allTime)
        oDate.setDate(oDate.getDate() + 1)
      } else {
        MondayTime = y + '-' + m + '-' + d
        MondayTime = new Date(MondayTime).format('yyyy-MM-dd')
        this.MondayList.push(MondayTime)
        oDate.setDate(oDate.getDate() + 6)
      }
    }
    this.othersWeeks.splice(0, 1)
    this.MondayList.splice(0, 1)
  },
  methods: {
    change () {
      this.tipMessage = ''
    },
    copycheckBoxHandle (index) {
      this.tipMessage = ''
      this.disabled = false
      for (let i = 0; i < this.MondayList.length; ++i) {
        if (i === index) {
          for (let j = 0; j < this.copyDate.targetDate.length; ++j) {
            if (this.copyDate.targetDate[j] === this.MondayList[i]) {
              this.copyDate.targetDate.splice(j, 1)
              return
            }
          }
        }
      }
      this.copyDate.targetDate.push(this.MondayList[index])
    },
    confirm () {
      this.disabled = true
      if (this.copyDate.targetDate.length === 0) {
        this.tipControl('请选择将课程复制到的日期')
      } else {
        copyLeagueHandle(this.copyDate).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '复制成功'
            })
            this.copyCourseModel = false
            this.$parent.getAllTheClasses()
            this.$parent.getTime()
          } else {
            this.tipControl(res.errMsg)
          }
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
      this.$parent.CopyClassCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
