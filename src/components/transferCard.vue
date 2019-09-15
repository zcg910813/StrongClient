<template>
  <div class="appMain">
    <div class="add-membe">
      <el-card class="box-card" shadow='hover'>
        <el-form ref="member_register" @keydown.enter.native="handleSubmit" label-position="right" class="member-details">
          <el-form-item label="当前会员卡">
            <span>{{name}}  (卡号: {{cardNum}})</span>
          </el-form-item>
          <el-form-item label="当前有效期" v-if='status === 1'>
            <span>{{effDate}}</span>
          </el-form-item>
          <el-form-item label="当前次数" v-if='status === 2'>
            <span>总次数{{amount}}次，剩余次数{{curBuy}}次</span>
          </el-form-item>
          <el-form-item label="当前金额" v-if='status === 3'>
            <span>总金额{{amount}}元，剩余金额{{curBuy}}元</span>
          </el-form-item>
           <el-form-item label="当前有效期" v-if='status !== 1'>
            <span>{{expiryTime}}</span>
          </el-form-item>
          <el-form-item label="剩余天数">
            <span v-if='status === 1'>{{getDays}}</span>
            <span v-else-if='status === 2'>永久</span>
            <span v-else>{{getDays}}</span>
          </el-form-item>
          <el-form-item label="剩余次数" v-if='status === 2'>
            <span>{{amount + (curBuy)}}</span>
          </el-form-item>
          <el-form-item label="剩余金额" v-if='status === 3'>
            <span>{{amount.toFixed(2)}}</span>
          </el-form-item>
          <el-form-item label="转出会员">
            <span>{{name}}</span>
          </el-form-item>
          <p style='color: red; text-indent: 25px;margin-bottom: 10px'>会员卡一经转出, 之前共享使用该卡的成员将不可再使用该会员卡</p>
          <el-form-item label="temp">
            <span slot="label"><i>*</i>转入会员</span>
            <!-- <el-input size="small" placeholder="请输入姓名/电话/实体卡号" v-model="newMember" @input="deleteMessage"/> -->
            <el-select
              v-model="newMember"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入姓名/电话/实体卡号"
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
            <span slot="label"><i>*</i>售价</span>
            <el-input size="small" placeholder="请输入售价" v-model="price" @input="deleteMessage"/>
          </el-form-item>
          <el-form-item label="temp">
            <span slot="label"><i>*</i>支付方式</span>
            <el-select v-model="type" @change='deleteMessage'>
              <el-option v-for="item in types" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="temp">
            <span slot="label"><i>*</i>成交时间</span>
            <el-date-picker
              :editable='false'
              @input="deleteMessage"
              v-model="date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="订单备注">
            <el-input v-model="remark" @input="deleteMessage" type="textarea" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div class="tipMessage tip-color" style='padding-left: 20px;'>{{tipMessage}}</div>
        <div class="dialog-footer clearfix">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getSigninTable, searchDate } from '@/api/sign'
import { distanceInWordsStrict, format } from 'date-fns'
import zhCN from 'date-fns/locale/zh_cn'
import { transferCard } from '@/api/buyvipcard'
export default {
  data () {
    return {
      tipMessage: '',
      newMember: '',
      date: '',
      price: '',
      type: '',
      types: [
        {
          value: 2,
          label: '微信'
        },
        {
          value: 3,
          label: '支付宝'
        },
        {
          value: 1,
          label: '现金'
        },
        {
          value: 4,
          label: '刷卡'
        },
        {
          value: 5,
          label: '其他'
        }
      ],
      remark: '',
      cardInfo: {},
      getDays: '',
      memberSignin: [],
      loading: false,
      path: '',
      name: '',
      cardNum: '',
      status: '',
      effDate: '',
      amount: '',
      curBuy: '',
      expiryTime: ''
    }
  },
  created () {
    if (this.$route.params.list) {
      this.cardInfo = this.$route.params.list
    } else {
      this.cardInfo = localStorage.getItem('list').split(',')
    }
    this.name = this.cardInfo[1]
    this.cardNum = this.cardInfo[2]
    this.status = this.cardInfo[3]
    this.effDate = this.cardInfo[6]
    this.amount = this.cardInfo[4]
    this.curBuy = this.cardInfo[5]
    this.expiryTime = this.cardInfo[6]
    let star = format(this.cardInfo[7], 'YYYY-MM-DD')
    let end = format(this.cardInfo[6], 'YYYY-MM-DD')
    this.getDays = distanceInWordsStrict(star, end, {locale: zhCN, unit: 'd'})
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
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    cancel () {
      this.$router.go(-1)
    },
    confirm () {
      if (!this.newMember) {
        this.tipControl('请输入转入会员')
      } else if (!this.price) {
        this.tipControl('请输入售价')
      } else if (!this.type) {
        this.tipControl('请选择支付方式')
      } else if (!this.date) {
        this.tipControl('请选择成交时间')
      } else {
        transferCard({
          vipcardmapid: this.cardInfo[8],
          memberid: this.newMember,
          price: this.price,
          payment: this.type,
          volume: this.discount,
          remark: this.remark
        }).then(res => {
          if (res.code === 200) {
            this.$router.push({name: 'memberCard'})
            this.$message({
              types: 'success',
              message: '转卡成功'
            })
          }
        })
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/member.styl'
</style>
