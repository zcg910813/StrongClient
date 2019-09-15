<template>
  <div id="dialog">
    <el-dialog title="更换教练" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="课程名称">
              <span>{{this.priName}}</span>
            </el-form-item>
            <el-form-item label="剩余次数">
              <span>{{this.priNum}}</span>
            </el-form-item>
            <el-form-item label="到期时间">
              <span>{{String(this.priTime).substr(0, 10) === '9999-12-31' ? '无限期' : this.priTime}}</span>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>更换教练</span>
              <el-select v-model="coachType" placeholder="请选择上课教练" @change='deleteMessage'>
                <el-option
                  v-for="item in coachTypes"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 30px;">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCoachData } from '@/api/data'
import { changeCoach } from '@/api/coach'
export default {
  props: ['priName', 'priNum', 'priTime', 'priId', 'oldCoach', 'privateid', 'memberid'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      coachType: '',
      coachTypes: []
    }
  },
  created () {
    getCoachData({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        for (let v of res.data.coachs) {
          this.coachTypes.push({name: v.name + ' ' + '(' + v.cellphone + ')', id: v.id})
        }
      }
    })
  },
  methods: {
    change () {
      this.tipMessage = ''
    },
    confirm () {
      if (!this.coachType) {
        this.tipControl('请选择教练')
      } else {
        changeCoach({
          uid: this.priId,
          oldCoach: this.oldCoach,
          newCoach: this.coachType,
          privateid: this.privateid,
          memberid: this.memberid
        }).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '更改教练成功'
            })
            this.$parent.getCourseData()
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
      this.$parent.changeCoachEventClose()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
