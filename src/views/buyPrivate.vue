<template>
  <div class="appMain">
    <div class="add-membe">
      <el-card class="box-card buy-private" shadow="hover">
        <el-form ref="member_register" @keydown.enter.native="handleSubmit" label-position="right" class="member-details">
          <el-form-item label="temp">
            <span slot="label"><i>*</i>私教课选择</span>
            <el-select v-model="priCourse" @change='getPircourseData' placeholder="请选择私教课" :disabled="getDisabled">
              <el-option v-for="item in priCourses" :value="item.uid" :key="item.uid" :label="item.value"></el-option>
            </el-select>
            <p class="font-tip"><span>单节售价(元):  {{price}}</span><span>有效期(天):  {{days}}</span></p>
          </el-form-item>
          <el-form-item prop="username" label="temp">
            <span slot="label"><i>*</i>购买节数</span>
            <el-input size="small" placeholder="请输入购买节数" v-model="number" @input="deleteMessage"/>
          </el-form-item>
          <el-form-item prop="username" label="合计金额">
            <span>{{price * number}}元</span>
          </el-form-item>
          <el-form-item label="temp">
            <span slot="label"><i>*</i>上课教练</span>
            <el-select v-model="teachCoach" @change='deleteMessage' :disabled="getDisabled">
              <el-option v-for="item in teachCoachs" :value="item.uid" :key="item.uid" :label="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="temp" class="sex-radio-group" v-if='!getDisabled'>
            <span slot="label"><i>*</i>开课时间</span>
            <el-radio-group v-model="timeType" @change='change'>
              <el-radio label="immed">立即开课</el-radio>
              <el-radio label="custom">自定义开课</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="temp" v-if='customDateShow'>
            <span slot="label"><i>*</i>自定义开课日期</span>
            <el-date-picker
              @change='dateChange'
              @input='deleteMessage'
              v-model="date"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="请选择">
            </el-date-picker>
            <div class="buycard-tip">到期时间: {{ExpireDate}}</div>
          </el-form-item>
          <el-form-item label="temp">
            <span slot="label"><i>*</i>支付方式</span>
            <el-select v-model="payType" @change='deleteMessage'>
              <el-option v-for="item in payTypes" :value="item.value" :key="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售教练">
            <el-select v-model="saleCoach" @change='deleteMessage'>
              <el-option v-for="item in saleCoachs" :value="item.uid" :key="item.uid" :label="item.name"></el-option>
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
import { getCoachData } from '@/api/data'
import { addDays, format } from 'date-fns'
import { buyPriCourse } from '@/api/buyvipcard'
import { getAllPrivates, queryPrivateDetails } from '@/api/persongroup'
export default {
  data () {
    return {
      priCourse: '',
      priCourses: [],
      price: 0,
      days: 0,
      number: '',
      teachCoach: '',
      teachCoachs: [],
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
      saleCoach: '',
      saleCoachs: [],
      discount: 1,
      remark: '',
      tipMessage: '',
      memberid: '',
      privateid: '',
      customDateShow: false,
      getDisabled: false,
      ExpireDate: '--',
      disabled: false
    }
  },
  created () {
    if (this.$route.params.MemberId) {
      this.memberid = this.$route.params.MemberId
    } else {
      this.memberid = localStorage.getItem('MemberId')
    }
    if (this.$route.params.belongCoach) {
      this.priCourse = this.$route.params.belongCoach
    } else {
      this.priCourse = localStorage.getItem('belongCoach')
    }
    if (this.$route.params.courseName) {
      this.teachCoach = this.$route.params.courseName
    } else {
      this.teachCoach = localStorage.getItem('courseName')
    }
    if (this.belongCoach && this.courseName !== '') {
      this.getDisabled = true
    } else {
      this.getDisabled = false
    }
    getAllPrivates({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        for (let v of res.data.res.allCards) {
          this.priCourses.push({value: v.privatename, uid: v.uid})
        }
      }
    })
    getCoachData({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        this.teachCoachs = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
        this.saleCoachs = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
  },
  methods: {
    dateChange () {
      this.ExpireDate = format(addDays(this.date, this.days), 'YYYY-MM-DD')
    },
    change (e) {
      this.tipMessage = ''
      this.disabled = false
      if (e === 'custom') {
        this.customDateShow = true
      } else {
        this.customDateShow = false
      }
    },
    getPircourseData (idx) {
      this.tipMessage = ''
      this.disabled = false
      this.privateid = idx
      queryPrivateDetails({uid: idx}).then(res => {
        this.price = res.data.res.price
        this.days = res.data.res.validity
      })
    },
    confirm () {
      this.disabled = true
      if (!this.priCourse) {
        this.tipControl('请选择私教课')
      } else if (!this.number) {
        this.tipControl('请输入购买节数')
      } else if (!/^[0-9]*$/.test(this.number)) {
        this.tipControl('购买节数格式不正确')
      } else if (this.number < 1) {
        this.tipControl('购买节数应为大于1的数值')
      } else if (!this.teachCoach) {
        this.tipControl('请选择上课教练')
      } else if (this.customDateShow === true ? !this.date : '') {
        this.tipControl('请选择自定义开卡日期')
      } else if (!this.payType) {
        this.tipControl('请选择支付方式')
      } else {
        buyPriCourse({
          memberid: this.memberid,
          privateid: this.privateid,
          number: this.number,
          coachid: this.teachCoach,
          opencardtime: this.date ? this.date : new Date(),
          payment: this.payType,
          ascription: this.saleCoach,
          volume: this.discount,
          remark: this.remark
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '购买成功'
            })
            this.$router.go(-1)
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
