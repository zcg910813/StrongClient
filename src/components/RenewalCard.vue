<template>
  <div class="appMain">
    <el-row :gutter="12" class="buying">
      <el-col :span="24">
        <el-card shadow="hover">
          <el-form label-width="125px" class='member-buy-cards'>
            <el-form-item label="会员卡类型">
              <el-radio-group v-model="cardType" size="small" @change='handleCardChange'>
                <el-radio-button label="期限卡" :disabled="qxDis"></el-radio-button>
                <el-radio-button label="次卡" :disabled="ckDis"></el-radio-button>
                <el-radio-button label="储值卡" :disabled="czDis"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="绑定会员">
              <span>{{memberInfoParams[0]}}</span>
            </el-form-item>
            <el-form-item label="当前到期时间" v-if='memberInfoParams[2] === 1'>
              <span>{{time}}</span>
            </el-form-item>
            <el-form-item label="当前剩余次数" v-if='memberInfoParams[2] === 2'>
              <span>{{param}}</span>
            </el-form-item>
            <el-form-item label="当前余额" v-if='memberInfoParams[2] === 3'>
              <span>{{param}}</span>
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
              <div class="buycard-tip" v-if='memberInfoParams[2] === 1'>有效期(天): {{days}} <span>售价(元): {{price}}</span></div>
              <div class="buycard-tip" v-else-if='memberInfoParams[2] === 2'>充值次数(次): {{param}} <span>售价(元): {{price}}</span><span>有效期(天): {{days}}</span></div>
              <div class="buycard-tip" v-else>充值金额(元): {{param}} <span>售价(元): {{price}}</span><span>有效期(天): {{days}}</span></div>
            </el-form-item>
            <el-form-item label="续卡后到期时间" v-if="memberInfoParams[2] === 1">
              <span>{{calDate}}</span>
            </el-form-item>
            <el-form-item label="续卡后次数" v-if='memberInfoParams[2] === 2'>
              <span>{{param + this.memberInfoParams[3]}}</span>
            </el-form-item>
            <el-form-item label="续卡后金额" v-if='memberInfoParams[2] === 3'>
              <span>{{param}}</span>
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
            <el-button type="primary" @click="confirm" :disabled="disabled">确定</el-button>
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
import { addRenewalCard } from '@/api/buyvipcard'
export default {
  data () {
    return {
      cardType: '',
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
      qxDis: true,
      ckDis: true,
      czDis: true,
      memberInfoParams: [],
      time: '',
      calDate: '',
      memberCardId: '',
      cards: [],
      disabled: false
    }
  },
  created () {
    getAllWorker({
      curPage: 1,
      pageCount: 10000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.employees
        this.belongs = data.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
    if (this.$route.params.MemberId) {
      this.memberid = this.$route.params.MemberId
    } else {
      this.memberid = localStorage.getItem('MemberId')
    }
    if (this.$route.params.list) {
      this.memberInfoParams = this.$route.params.list
    } else {
      this.memberInfoParams = localStorage.getItem('cardParams').split(',')
    }

    this.time = format(this.memberInfoParams[1], 'YYYY-MM-DD')
    let k = this.memberInfoParams[2]
    if (k === 1) {
      this.qxDis = false
      this.cardType = '期限卡'
      getMemberCard({
        pageCount: 1000,
        curPage: 1
      }).then(res => {
        if (res.code === 200) {
          let data = res.data.res.allCards
          this.cards = data.filter(o => { return o.cardsubtype === 1 })
          this.names = this.cards.map(item => { return {name: item.cardname, uid: item.uid} })
        }
      })
    } else if (k === 2) {
      this.ckDis = false
      this.cardType = '次卡'
      getMemberCard({
        pageCount: 1000,
        curPage: 1
      }).then(res => {
        if (res.code === 200) {
          let data = res.data.res.allCards
          this.cards = data.filter(o => { return o.cardsubtype === 2 })
          this.names = this.cards.map(item => { return {name: item.cardname, uid: item.uid} })
        }
      })
    } else {
      this.czDis = false
      this.cardType = '储值卡'
      getMemberCard({
        pageCount: 1000,
        curPage: 1
      }).then(res => {
        if (res.code === 200) {
          let data = res.data.res.allCards
          this.cards = data.filter(o => { return o.cardsubtype === 3 })
          this.names = this.cards.map(item => { return {name: item.cardname, uid: item.uid} })
        }
      })
    }
  },
  methods: {
    dateChange () {
      this.getExpirationDate = format(addDays(this.date, this.days), 'YYYY-MM-DD')
    },
    change (e) {
      this.tipMessage = ''
      if (e === 'custom') {
        this.customDateShow = true
      } else {
        this.customDateShow = false
      }
    },
    getCardDetail (idx) {
      this.tipMessage = ''
      this.disabled = false
      queryVipCardDetails(idx).then(res => {
        let data = res.data.res
        this.memberCardId = data.uid
        this.days = data.validity
        this.price = data.price
        this.purchase = data.purchase
        this.onsale = data.onsale
        this.param = data.param
        this.afterCardDate = format(addDays(this.ExpirationTime, this.days), 'YYYY-MM-DD')
        this.calDate = format(addDays(this.time, this.days), 'YYYY-MM-DD')
      })
    },
    handleCardChange (e) {
      this.tipMessage = ''
      this.disabled = false
      if (e === '期限卡') {
        this.limitTipShow = true
        this.subCardShow = false
      } else if (e === '次卡') {
        this.limitTipShow = false
        this.subCardShow = true
      } else {
        this.limitTipShow = false
        this.subCardShow = false
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
        this.tipControl('请选择会员卡')
      } else if (!this.payType) {
        this.tipControl('请选择支付方式')
      } else {
        addRenewalCard({
          vipcardmapid: this.memberInfoParams[4],
          vipcardid: this.memberCardId,
          volume: this.discount,
          payment: this.payType,
          ascription: this.belong,
          remark: this.remark
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.$router.push({name: 'memberCard'})
            this.$message({
              type: 'success',
              message: '续卡成功'
            })
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
