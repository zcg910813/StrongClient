<template>
  <div class="appMain">
    <div class="add-membe">
      <el-card class="box-card" shadow="hover">
        <el-form ref="member_register" @keydown.enter.native="handleSubmit" label-position="right" class="member-details">
          <el-form-item label="temp">
            <span slot="label"><i>*</i>私教课选择</span>
            <el-input disabled v-model='privateData[2]'></el-input>
            <p class="font-tip"><span>单节售价(元):  {{price}}</span><span>有效期(天):  {{privateData[4]}}</span></p>
          </el-form-item>
          <el-form-item prop="username" label="temp">
            <span slot="label"><i>*</i>购买节数</span>
            <el-input size="small" placeholder="请输入购买节数" v-model="number" @input="deleteMessage"/>
          </el-form-item>
          <el-form-item prop="username" label="合计金额">
            <span>{{price * number}}元</span>
          </el-form-item>
          <!-- <el-form-item label="temp" class="sex-radio-group">
            <span slot="label"><i>*</i>开卡时间</span>
            <el-radio-group v-model="timeType" @change='change'>
              <el-radio label="immed">立即开卡</el-radio>
              <el-radio label="custom">自定义开卡</el-radio>
            </el-radio-group>
          </el-form-item> -->
          <!-- <el-form-item label="temp" v-if='customDateShow'>
            <span slot="label"><i>*</i>自定义开卡日期</span>
            <el-date-picker
              @input='deleteMessage'
              v-model="date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择">
            </el-date-picker>
            <div class="buycard-tip">到期时间: {{privateData[3]}}</div>
          </el-form-item> -->
          <!-- <el-form-item label="temp">
            <span slot="label"><i>*</i>到期时间</span>
            <span>{{privateData[3]}}</span>
          </el-form-item> -->
          <el-form-item label="temp">
            <span slot="label"><i>*</i>支付方式</span>
            <el-select v-model="payType" @change='deleteMessage'>
              <el-option v-for="item in payTypes" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售教练">
            <el-select v-model="saleCoach" @change='deleteMessage'>
              <el-option v-for="item in saleCoachs" :value="item.uid" :key="item.uid" :label="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择折扣">
            <template>
              <el-input-number v-model="discount" controls-position="right" @change="deleteMessage" :min="0.1" :step="0.05" :max="1"></el-input-number>
            </template>
            <p class="font-tip">实收价格(元): {{(price * number * (discount)).toFixed(2)}}</p>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input v-model="remark" @input="deleteMessage" type="textarea" placeholder="请输入备注信息"></el-input>
          </el-form-item>
        </el-form>
        <div class="tipMessage tip-color">{{tipMessage}}</div>
        <div class="dialog-footer clearfix">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm" :disabled="disabled">确定购买</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { RenewalPrivate } from '@/api/course'
import { getAllPrivates } from '@/api/persongroup'
export default {
  data () {
    return {
      price: 0,
      days: 0,
      number: '',
      // timeType: 'immed',
      // date: '',
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
      saleCoach: '',
      saleCoachs: [],
      discount: 1,
      remark: '',
      tipMessage: '',
      memberid: '',
      customDateShow: false,
      getDisabled: true,
      disabled: false,
      privateData: [],
      curPriData: []
    }
  },
  created () {
    if (this.$route.params.list) {
      this.privateData = this.$route.params.list
    } else {
      this.privateData = localStorage.getItem('list')
    }
    this.priCourse = this.privateData[2]
    getAllPrivates({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.res.allCards
        this.curPriData = data.filter((o) => { return o.privatename === this.privateData[2] })
        this.price = this.curPriData[0].price
        this.days = this.curPriData[0].validity
      }
    })
  },
  methods: {
    change (e) {
      this.tipMessage = ''
      this.disabled = false
      if (e === 'custom') {
        this.customDateShow = true
      } else {
        this.customDateShow = false
      }
    },
    confirm () {
      this.disabled = true
      if (!this.priCourse) {
        this.tipControl('请选择私教课')
      } else if (!this.number) {
        this.tipControl('请输入购买节数')
      } else if (this.customDateShow === true ? !this.date : '') {
        this.tipControl('请选择自定义开卡日期')
      } else if (!this.payType) {
        this.tipControl('请选择支付方式')
      } else {
        RenewalPrivate({
          privatemapid: this.privateData[0],
          privateid: this.privateData[1],
          param: this.number,
          price: this.price,
          volume: this.discount,
          payment: this.payType,
          ascription: this.saleCoach,
          remark: this.remark
        }).then(res => {
          if (res.code === 200) {
            this.$router.go(-1)
            this.$message({
              type: 'success',
              message: '续课成功'
            })
          }
        })
      }
    },
    cancel () {
      this.$router.go(-1)
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
      this.disabled = false
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/member.styl'
</style>
