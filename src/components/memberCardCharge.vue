<template>
  <div id="dialog">
    <el-dialog title="会员卡扣费" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="绑定会员">
              <span>{{memberCardChargeParams[3]}}</span>
            </el-form-item>
            <el-form-item label="当前有效期" v-if='cardType === 1'>
              <span>{{createDate + '至' + endDate}}</span>
            </el-form-item>
            <el-form-item label="temp" v-if='cardType === 1'>
              <span slot="label"><i>*</i>扣费天数</span>
              <el-input v-model="days" placeholder="请输入扣费天数" @input='deleteMessage'>
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
            <el-form-item label="有效期至" v-if='cardType === 1'>
              <span>{{endDate}}</span>
            </el-form-item>
            <el-form-item label="当前剩余次数" v-if='cardType === 2'>
              <span>{{memberCardChargeParams[4]}}</span>
            </el-form-item>
            <el-form-item label="当前剩余金额" v-if='cardType === 3'>
              <span>{{memberCardChargeParams[5]}}</span>
            </el-form-item>
            <el-form-item label="temp" v-if='cardType === 2'>
              <span slot="label"><i>*</i>扣费次数</span>
              <el-input v-model="num" placeholder="请输入扣费次数" @input='deleteMessage'>
              </el-input>
            </el-form-item>
            <el-form-item label="temp" v-if='cardType === 3'>
              <span slot="label"><i>*</i>扣费金额</span>
              <el-input v-model="amount" placeholder="请输入扣费金额" @input='deleteMessage'>
              </el-input>
            </el-form-item>
            <el-form-item label="剩余次数" v-if='cardType !== 1'>
              <span>{{memberCardChargeParams[4]}}</span>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="remark" placeholder="请输入内容" @input='deleteMessage'></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 50px;">{{tipMessage}}</div>
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
import { Charge } from '@/api/buyvipcard'
export default {
  props: ['memberCardChargeParams'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      days: '',
      num: '',
      amount: '',
      param: '',
      remark: '',
      createDate: '',
      endDate: '',
      cardType: ''
    }
  },
  created () {
    this.createDate = format(this.memberCardChargeParams[0], 'YYYY-MM-DD')
    this.endDate = format(this.memberCardChargeParams[1], 'YYYY-MM-DD')
    this.cardType = this.memberCardChargeParams[2]
  },
  methods: {
    change () {
      this.tipMessage = ''
    },
    confirm () {
      if (this.cardType === 1 ? !this.days : '') {
        this.tipControl('请输入扣费天数')
      } else if (this.cardType === 2 ? !this.num : '') {
        this.tipControl('请输入扣费次数')
      } else if (this.cardType === 3 ? !this.amount : '') {
        this.tipControl('请输入扣费金额')
      } else {
        if (this.cardType === 1) {
          this.param = this.days
        } else if (this.cardType === 2) {
          this.param = this.num
        } else {
          this.param = this.amount
        }
        Charge({
          vipcardmapid: this.memberCardChargeParams[6],
          param: this.param,
          remark: this.remark
        }).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '扣费成功'
            })
            this.$parent.QueryAllBVCard()
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
      this.$parent.memberCardChargeCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
