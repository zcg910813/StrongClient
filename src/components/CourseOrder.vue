<template>
  <div id="dialog">
    <el-dialog title="团课预约" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>会员姓名</span>
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
            <el-form-item label="课程名称">
              <span>21天减脂团课</span>
            </el-form-item>
            <el-form-item label="上课时间">
              <span>{{this.courseOrderData.beginTime}}</span>
            </el-form-item>
            <el-form-item label="课程时长">
              <span>{{this.courseOrderData.endTime}}</span>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 30px">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确认预约</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { grouplessonOrder } from '@/api/grouplesson'
import { searchDate, getSigninTable } from '@/api/sign'
import { queryJob } from '@/api/person'
export default {
  props: ['courseOrderData'],
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
      defaultCoach: true,
      memberSignin: [],
      loading: false,
      type: '',
      types: []
    }
  },
  created () {
    queryJob().then(res => {
      this.positions = res.data
    })
  },
  methods: {
    cardChange () {
      this.tipMessage = ''
    },
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
      this.name = e
      // let members = this.memberSignin.filter((o) => { return (o.username + o.cellphone) === e })
      // this.uid = members[0].uid
      this.searchedShow = true
      getSigninTable({
        curPage: this.curPage,
        pageCount: this.pageCount,
        memberid: this.uid
      }).then(res => {
        this.$store.commit('setLoading', false)
        let data = res.data.res
        this.memberSigninData = data.allInfos
        this.count = data.count
      })
    },
    change () {
      this.defaultCoach = false
    },
    confirm () {
      if (!this.name) {
        this.tipControl('请输入会员姓名')
      } else {
        grouplessonOrder({
          groupLessonId: this.courseOrderData.id,
          uid: this.name,
          vipcardmapid: this.type
        }).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '预约成功'
            })
            this.$parent.getgrouplessonquery()
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
      this.$parent.CourseOrderCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
