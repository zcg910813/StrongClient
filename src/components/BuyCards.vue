<template>
  <div class="appMain">
    <el-row :gutter="12" class="buying">
      <el-col :span="24">
        <el-card shadow="hover">
          <el-form label-width="125px" class='member-buy-cards'>
            <el-form-item label="会员卡类型">
              <el-radio-group v-model="cardType" size="small" @change='handleCardChange'>
                <el-radio-button label="期限卡"></el-radio-button>
                <el-radio-button label="次卡"></el-radio-button>
                <el-radio-button label="储值卡"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="indent"><i>*</i>会员卡选择</span>
              <el-select v-model="name" placeholder="请选择会员卡名称" @change='getCardDetail'>
                <el-option
                  v-for="item in names"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
              <div class="buycard-tip" v-if='limitTipShow'>有效期(天): {{days}} <span>售价(元): {{price}}</span></div>
              <div class="buycard-tip" v-else-if="subCardShow">充值次数(次): {{param}} <span>售价(元): {{price}}</span><span>有效期(天): {{days}}</span></div>
              <div class="buycard-tip" v-else>充值金额(元): {{param}} <span>售价(元): {{price}}</span><span>有效期(天): {{days}}</span></div>
            </el-form-item>
            <el-form-item label="temp" class="sex-radio-group">
              <span slot="label"><i>*</i>开卡时间</span>
              <el-radio-group v-model="timeType" @change='change'>
                <el-radio label="immed">立即开卡</el-radio>
                <el-radio label="custom">自定义开卡</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="temp" v-if='customDateShow'>
              <span slot="label"><i>*</i>自定义开卡日期</span>
              <el-date-picker
                @change='dateChange'
                @input='deleteMessage'
                v-model="date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择">
              </el-date-picker>
              <div class="buycard-tip">到期时间: {{getExpirationDate}}</div>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="indent"><i>*</i>支付方式</span>
              <el-select v-model="payType" placeholder="请选择支付方式" @change='deleteMessage'>
                <el-option
                  v-for="item in payTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="indent"><i>*</i>实体卡号</span>
              <el-input v-model="cardNum" placeholder="请输入实体卡号" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="选择折扣">
              <el-input-number v-model="discount" controls-position="right" @change="handleChange" :min="0.1" :step="0.05" :max="1"></el-input-number>
              <div class="buycard-tip">实收价格(元): {{(price * (discount)).toFixed(2)}}</div>
            </el-form-item>
            <el-form-item label="业绩归属">
              <el-select v-model="belong" placeholder="请选择业绩归属" @cheng='deleteMessage'>
                <el-option
                  v-for="item in belongs"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="成交方式">
              <el-select v-model="type" placeholder="请选择成交方式" @change='deleteMessage'>
                <el-option
                  v-for="item in types"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input v-model="remark" type='textarea' placeholder="请输入内容" @input="deleteMessage"></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color">{{tipMessage}}</div>
          <div class="dialog-footer" style='text-align: left; margin: 0 0 30px 120px'>
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确定开卡</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { addDays, format } from 'date-fns'
import { getAllWorker } from '@/api/data'
import { getMemberCard, queryVipCardDetails } from '@/api/vipcard'
import { memberButVipCardHandle } from '@/async/buyvipcard'
export default {
  data () {
    return {
      cardType: '期限卡',
      name: '',
      names: [],
      timeType: 'immed',
      date: '',
      payType: '',
      payTypes: [
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
      cardNum: '',
      discount: 1,
      belong: '',
      belongs: [],
      type: '',
      types: [
        {
          id: 1,
          label: '预约到店'
        },
        {
          id: 2,
          label: '客人介绍'
        },
        {
          id: 3,
          label: '电话咨询'
        },
        {
          id: 4,
          label: '自然到访'
        },
        {
          id: 5,
          label: '会籍带客'
        }
      ],
      remark: '',
      tipMessage: '',
      limitTipShow: true,
      subCardShow: false,
      memberid: '',
      customDateShow: false,
      param: 0,
      days: 0,
      price: 0,
      onsale: 0,
      cardParams: '',
      continueBuyCard: false,
      getExpirationDate: '-',
      afterCardDate: '-',
      vipcardId: '',
      cards: [],
      disabled: false
    }
  },
  created () {
    if (this.$route.params.MemberId) {
      this.memberid = this.$route.params.MemberId
    } else {
      this.memberid = localStorage.getItem('MemberId')
    }
    getMemberCard({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.res.allCards
        this.cards = data
        let cardTypes = this.cards.filter(o => { return o.cardsubtype === 1 })
        this.names = cardTypes.map(item => { return {name: item.cardname, uid: item.uid} })
      }
    })
    getAllWorker({
      curPage: 1,
      pageCount: 10000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.employees
        this.belongs = data.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
  },
  methods: {
    dateChange () {
      this.getExpirationDate = format(addDays(this.date, this.days), 'YYYY-MM-DD')
      this.disabled = false
    },
    change (e) {
      this.tipMessage = ''
      if (e === 'custom') {
        this.customDateShow = true
      } else {
        this.customDateShow = false
      }
      this.disabled = false
    },
    getCardDetail (idx) {
      this.tipMessage = ''
      queryVipCardDetails(idx).then(res => {
        let data = res.data.res
        this.days = data.validity
        this.price = data.price
        this.purchase = data.purchase
        this.onsale = data.onsale
        this.param = data.param
        this.vipcardId = data.uid
        this.afterCardDate = format(addDays(this.ExpirationTime, this.days), 'YYYY-MM-DD')
      })
    },
    handleCardChange (e) {
      this.tipMessage = ''
      if (e === '期限卡') {
        this.limitTipShow = true
        this.subCardShow = false
        let cardTypes = this.cards.filter(o => { return o.cardsubtype === 1 })
        this.names = cardTypes.map(item => { return {name: item.cardname, uid: item.uid} })
      } else if (e === '次卡') {
        this.limitTipShow = false
        this.subCardShow = true
        let cardTypes = this.cards.filter(o => { return o.cardsubtype === 2 })
        this.names = cardTypes.map(item => { return {name: item.cardname, uid: item.uid} })
      } else {
        this.limitTipShow = false
        this.subCardShow = false
        let cardTypes = this.cards.filter(o => { return o.cardsubtype === 3 })
        this.names = cardTypes.map(item => { return {name: item.cardname, uid: item.uid} })
      }
    },
    handleChange (val) {
      this.disabled = false
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
      this.disabled = false
    },
    cancel () {
      this.$router.go(-1)
    },
    confirm () {
      this.disabled = true
      if (!this.name) {
        this.tipControl('请选择会员卡名称')
      } else if (!this.timeType) {
        this.tipControl('请选择开卡时间')
      } else if (this.customDateShow === true ? !this.date : '') {
        this.tipControl('请选择自定义开卡日期')
      } else if (!this.payType) {
        this.tipControl('请选择支付方式')
      } else if (!this.cardNum) {
        this.tipControl('请输入实体卡号')
      } else if (!/^[0-9]*$/.test(this.cardNum)) {
        this.tipControl('实体卡号应为数字')
      } else {
        memberButVipCardHandle({
          memberid: this.memberid,
          vipcardid: this.vipcardId,
          opencardtime: this.date ? this.date : new Date(),
          payment: this.payType,
          entitycardid: this.cardNum,
          volume: this.discount,
          ascription: this.belong,
          deal: this.type ? this.type : 0,
          remark: this.remark
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.$router.go(-1)
          } else {
            this.tipControl(res.errMsg)
          }
        })
      }
    },
    continueBuyCardBtn () {
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
