<template>
  <el-dialog title="签到确认" width='520px' :visible.sync="dialogVisible" center :close-on-cspanck-modal="closeOnCspanckModal" @closed="closed">
    <div class="dialog-content signin-search">
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
    </div>
    <div class="search-spanst" v-if='searchedShow'>
      <div class="info" v-for='e in memberInfo' :key='e.memberid'>
        <div><img src="" alt=""></div>
        <ul class="pornal-info">
          <li><span>姓名:</span><span>{{e.name}}</span></li>
          <li><span>年龄:</span><span>{{e.age}}</span></li>
          <li><span>性别:</span><span>{{e.sex === 1 ? '男' : '女'}}</span></li>
          <li><span>归属会籍:</span><span>{{e.ascription}}</span></li>
          <li><span>手机号:</span><span>{{e.cellphone}}</span></li>
          <li><span>生日:</span><span>{{e.birthday}}</span></li>
          <li><span>备注:</span><span>{{e.remark}}</span></li>
        </ul>
      </div>
      <div class="purchase-card">
        <div v-if='vJsonVec.length === 0' class="no-carddata">
          <p>该会员暂未购会员卡</p>
        </div>
        <div v-else>
          <ul v-for='v in vJsonVec' :key='v.vipcardmapid'>
            <el-radio-group
              v-model="singCard">
              <el-radio @change='checkboxChange' :label="v.vipcardmapid">
                <li v-if='Number(v.subtype) ===1'>期限卡</li>
                <li v-if='Number(v.subtype) ===2'>次卡</li>
                <li v-if='Number(v.subtype) ===3'>储值卡</li>
                <li>剩余{{v.surplus}}<span v-if='Number(v.subtype) === 1'>天</span><span v-else-if='Number(v.subtype) === 2'>次</span><span v-else>元</span></li>
                <li>截止{{v.expirytime | formatTime}}</li>
              </el-radio>
            </el-radio-group>
          </ul>
        </div>
      </div>
      <div class="Hand-number-add">
        <el-form v-for='(item, i) in numberList' :key='i'>
          <el-form-item :label="item.label">
            <el-input v-model="item.number" @input="deleteMessage" :autosize="{minRows:4,maxRows:6}" placeholder="请输入手牌号"></el-input>
            <el-button @click='addCard' size="mini" type="primary" v-if='i==0'>添加</el-button>
            <div v-else>
              <el-button @click='addCard' size="mini" type="primary">添加</el-button>
              <el-button @click='deleteCard(i)' size="mini">删除</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="tipMessage tip-color">{{tipMessage}}</div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm" :disabled="disabled">确认签到</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { format } from 'date-fns'
import { searchDate, querySigninTable, addSigninTable } from '@/api/sign'
// import { queryMemberInfo } from '@/api/member'
export default {
  data () {
    return {
      dialogVisible: true,
      closeOnCspanckModal: true,
      value: '',
      name: '',
      memberSignin: [],
      loading: false,
      states: [],
      searchedShow: false,
      number: '',
      tipMessage: '',
      uid: '',
      memberInfo: [],
      numberList: [{label: '手牌号', number: ''}],
      vJsonVec: [],
      numberData: [],
      vipcardmapid: '',
      singCard: '',
      disabled: false
    }
  },
  mounted () {
    this.spanst = this.states.map(item => {
      return { value: item, label: item }
    })
  },
  methods: {
    checkboxChange (e) {
      this.singCard = e
      this.disabled = false
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
      this.disabled = false
      let members = this.memberSignin.filter((o) => { return o.uid === e })
      this.uid = members[0].uid
      this.searchedShow = true
      querySigninTable({uid: this.uid}).then(res => {
        this.memberInfo = res.data
        this.vJsonVec = res.data.res.vJsonVec
      })
    },
    closed () {
      this.$parent.signinCloseEvent()
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
      this.disabled = false
    },
    addCard () {
      this.numberList.push({label: '手牌号', number: ''})
    },
    deleteCard (idx) {
      this.numberList.splice(idx, 1)
    },
    cancel () {
      this.dialogVisible = false
    },
    confirm () {
      this.disabled = true
      if (this.vJsonVec.length === 0) {
        this.tipControl('请先购买会员卡')
      } else if (!this.singCard) {
        this.tipControl('请选择有效会员卡')
      } else {
        addSigninTable({
          vipcardmapid: this.singCard,
          number: this.numberList.length,
          signin: 1,
          handcardid: this.numberList.map(o => { return o.number })
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.$store.commit('setLoading', false)
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '签到确认成功'
            })
            this.$parent.getData()
          }
        })
      }
    }
  },
  filters: {
    formatTime (time) {
      if (time === '' || time === undefined) return ''
      var date = time
      return format(date, 'YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
