<template>
  <div id="dialog">
    <el-dialog :title="this.OrderCoachInfo[0] === 'handleSignin' ? '手动签到' : '私教课签到'" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form" class="course-signinList">
            <el-form-item label="上课会员">
              <el-select
                :disabled="disabled"
                v-model="courseMember"
                filterable
                remote
                reserve-keyword
                placeholder="请输入会员名称或电话"
                :remote-method="remoteMethod"
                @change='selectChange'
                :loading="loading">
                <el-option
                  v-for="(item, i) in memberSigninData"
                  :key="i"
                  :label="item.username + (item.cellphone ? '(' + item.cellphone + ')' : '')"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="课 程" class="course" v-if='courseShow'>
              <el-select v-model="course" placeholder="请选择" @change="courseChange" :disabled="disabled">
                <el-option
                  v-for="(item, idx) in courses"
                  :key="idx"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="temp" class="signin-coach" v-if='coachShow'>
              <span slot="label"><i>*</i>签到教练</span>
              <!-- <el-input v-model="coach" placeholder="请输入签到教练" v-if='defaultCoach' @input="deleteMessage"></el-input> -->
              <el-select v-model="coachSel" placeholder="请选择" @change="coachChange" :disabled="disabled">
                <el-option
                  v-for="item in coachSels"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
              <span class="change" @click="change" v-if='defaultCoach'>更改</span>
            </el-form-item>
            <el-form-item label="消课次数">
              <span>{{account}}次</span>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 30px">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { queryMemberPrivate } from '@/api/person'
import { getCoachData } from '@/api/data'
import { searchDate, confirmPrivateTable } from '@/api/sign'
export default {
  props: ['OrderCoachInfo'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      course: '',
      courses: [],
      coach: '',
      coachSel: '',
      coachSels: [],
      account: 1,
      defaultCoach: false,
      loading: false,
      memberSigninData: [],
      uid: '',
      memberid: '',
      courseMember: '',
      memberId: '',
      memberName: '',
      courseId: '',
      courseName: '',
      coachSelId: '',
      coachSelName: '',
      disabled: false,
      courseShow: false,
      coachShow: false
    }
  },
  created () {
    if (this.OrderCoachInfo[0] === 'handleSignin') {
      this.courseShow = false
      this.coachShow = false
      this.disabled = false
    } else {
      this.courseShow = true
      this.coachShow = true
      this.disabled = true
      this.memberId = this.OrderCoachInfo[1]
      this.memberName = this.OrderCoachInfo[2]
      this.courseMember = this.memberName
      this.courseId = this.OrderCoachInfo[3]
      this.courseName = this.OrderCoachInfo[4]
      this.course = this.courseName
      this.coachSelId = this.OrderCoachInfo[5]
      this.coachSelName = this.OrderCoachInfo[6]
      this.coachSel = this.coachSelName
    }
  },
  methods: {
    getCoachData () {
      getCoachData({
        pageCount: 1000,
        curPage: 1
      }).then(res => {
        if (res.code === 200) {
          this.coachSels = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
        }
      })
    },
    courseChange (e) {
      this.tipMessage = ''
      this.course = e
      this.disabled = false
    },
    coachChange (idx) {
      this.tipMessage = ''
      this.coachSel = idx
      this.disabled = false
    },
    change () {
      this.defaultCoach = false
    },
    remoteMethod (query) {
      if (query !== '') {
        searchDate({search: query}).then(res => {
          this.memberSigninData = []
          if (res) {
            if (res.data.res.data.suggestions.length > 0) {
              this.loading = false
              this.memberSigninData = res.data.res.data.suggestions
            }
          }
        })
      } else {
        this.memberSigninData = []
      }
    },
    selectChange (e) {
      this.tipMessage = ''
      this.coachShow = true
      this.courseShow = true
      this.courseMember = e
      queryMemberPrivate({
        memberid: e,
        curPage: 1,
        pageCount: 10000
      }).then(res => {
        if (res.code === 200) {
          let data = res.data.res.allInfos
          this.courses = data.map(o => { return {name: o.privates.privatename, uid: o.uid} })
        }
      })
      this.getCoachData()
    },
    confirm () {
      if (!this.coachSel) {
        this.tipControl('请先模糊查询会员名称或电话')
      } else if (!this.course) {
        this.tipControl('请先去给该会员购私教课')
      } else {
        confirmPrivateTable({
          memberid: this.courseMember === this.memberName ? this.memberId : this.courseMember,
          cardId: this.courseName === this.course ? this.courseId : this.course,
          coachid: this.coachSelName === this.coachSel ? this.coachSelId : this.coachSel,
          number: this.account
        }).then(res => {
          if (Number(res.code) === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: this.OrderCoachInfo[0] === 'handleSignin' ? '手动签到成功' : '私教课签到成功'
            })
            this.$parent.getQueryOrderCoach()
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
      this.$parent.CourseSinginCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
