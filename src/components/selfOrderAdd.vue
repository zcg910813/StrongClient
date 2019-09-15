<template>
  <div id="dialog">
    <el-dialog title="私教课预约" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>预约日期</span>
              <el-date-picker
                @input="deleteMessage"
                v-model="date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" style='word-spacing: 26px;'><i>*</i>会 员</span>
              <el-select
                v-model="name"
                filterable
                remote
                clearable
                reserve-keyword
                placeholder="搜索会员名称或手机号"
                :remote-method="remoteMethod"
                @change='selectChange'
                :loading="loading">
                <el-option
                  v-for="(item, idx) in memberSignin"
                  :key="idx"
                  :label="item.username + (item.cellphone ? '(' + item.cellphone + ')' : '')"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>预约教练</span>
              <el-select v-model="coach" placeholder="请选择教练" @change='deleteMessage'>
                <el-option
                  @input='deleteMessage'
                  v-for="item in coachs"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>选择课程</span>
              <el-select v-model="course" placeholder="请选择课程" @change='deleteMessage'>
                <el-option
                  @input='deleteMessage'
                  v-for="item in courses"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>预约时间</span>
              <el-time-select
                @input="deleteMessage"
                v-model="time"
                :picker-options="{
                  start: '09:00',
                  step: '00:30',
                  end: '18:00'
                }"
                placeholder="选择预约时间">
              </el-time-select>
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
import { format } from 'date-fns'
import { queryMemberPrivate } from '@/api/person'
// import { QueryAllBPCard } from '@/api/buyvipcard'
import { searchDate, querySigninTable } from '@/api/sign'
import { getCoachData } from '@/api/data'
import { getAllRole } from '@/api/role'
import { ordercoach } from '@/api/coach'
export default {
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      date: '',
      coach: '',
      coachs: [],
      name: '',
      course: '',
      courses: [],
      time: '',
      uid: '',
      username: '',
      loading: false,
      memberSignin: []
    }
  },
  created () {
    getAllRole({
      pageCount: this.pageCount,
      curPage: this.curPage
    }).then(res => {
      this.positions = res.data.data
    })
    getCoachData({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        this.coachs = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
    // QueryAllBPCard({
    //   pageCount: 1000,
    //   curPage: 1
    // }).then(res => {
    //   this.courses = res.data.res.allInfos.map(o => { return {name: o.privates.privatename, uid: o.uid} })
    // })
  },
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        searchDate({search: query}).then(res => {
          this.memberSignin = []
          if (res) {
            if (res.data.res.data.suggestions.length > 0) {
              this.loading = false
              this.memberSignin = res.data.res.data.suggestions
            }
          }
        })
      } else {
        this.memberSignin = []
      }
    },
    selectChange (e) {
      this.tipMessage = ''
      let members = this.memberSignin.filter((o) => { return o.uid === e })
      this.uid = members[0].uid
      this.username = members[0].username
      // this.uid = this.memberSigninData.find(uid => { return uid }).uid
      this.searchedShow = true
      querySigninTable({uid: this.uid}).then(res => {
        if (res.data.res.vJsonVec.length === 0) {
          this.course = ''
        } else {
          this.memberInfo = res.data
          this.vJsonVec = res.data.res.vJsonVec
        }
      })
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
    },
    change () {
      this.tipMessage = ''
    },
    confirm () {
      if (!this.date) {
        this.tipControl('请选择预约日期')
      } else if (!this.name) {
        this.tipControl('请选输入会员')
      } else if (!this.coach) {
        this.tipControl('请选择教练')
      } else if (!this.course) {
        this.tipControl('请选择课程')
      } else if (!this.time) {
        this.tipControl('请选择时间')
      } else {
        ordercoach({
          coachId: this.coach,
          cardId: this.course,
          time: this.time,
          date: format(this.date, 'YYYY-MM-DD'),
          uid: this.uid,
          membername: this.username
        }).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.$parent.getCoachData()
            this.$message({
              type: 'success',
              message: '预约成功'
            })
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
      this.$parent.selfOrderAddCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
