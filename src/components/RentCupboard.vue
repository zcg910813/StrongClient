<template>
  <div id="dialog">
    <el-dialog title="租柜" width='600px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content recover-dialog">
          <el-form ref="form">
            <el-form-item label="temp" class="remark-label">
              <span slot="label"><i>*</i>储物柜编号</span>
              <el-input v-model="number" placeholder="请输入储物柜编号" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="temp" class="sex-radio-group">
              <span slot="label"><i>*</i>租柜类型</span>
              <el-radio-group v-model="type" @change='change'>
                <el-radio label="1">普通租柜</el-radio>
                <el-radio label="2">智能租柜</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="temp" class="remark-label">
              <span slot="label"><i>*</i>储柜费用</span>
                <el-input v-model="amount" placeholder="请输入储柜费用" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>押金金额</span>
              <el-input v-model="cash" placeholder="请输入押金金额" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="payee"><i>*</i>收款人</span>
              <el-select v-model="payee" placeholder="请选择收款人" @change='deleteMessage'>
                <el-option
                  v-for="item in payees"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="截止日期">
              <el-date-picker
                @input='deleteMessage'
                v-model="date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择租柜截止日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="payType" placeholder="请选择支付方式"  @change='deleteMessage'>
                <el-option
                  v-for="item in payTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备 注" class="remark-label">
              <el-input v-model="remark" type='textarea' placeholder="请输入内容" @input='deleteMessage'></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 30px;">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { insertCabinetsHandle } from '@/async/members'
export default {
  props: ['memberInfos'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      type: '1',
      number: '',
      amount: '',
      cash: '',
      payee: '',
      payees: [],
      date: '',
      payType: '',
      remark: '',
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
      disabled: false
    }
  },
  created () {
  },
  methods: {
    change () {
      this.tipMessage = ''
      this.disabled = false
    },
    confirm () {
      this.disabled = true
      if (!this.number) {
        this.tipControl('请输入储物柜编号')
      } else if (!this.type) {
        this.tipControl('请选择租柜类型')
      } else if (!this.amount) {
        this.tipControl('请输入储柜费用')
      } else if (!this.cash) {
        this.tipControl('请输入押金金额')
      } else if (!this.payee) {
        this.tipControl('请选择收款人')
      } else {
        this.$confirm(`确定添加${this.memberInfos.username}收取押金记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          insertCabinetsHandle({
            memberid: this.memberInfos.uid,
            type: this.type,
            number: this.number,
            deadlinetime: this.date,
            cost: this.amount,
            deposit: this.cash,
            payment: this.type,
            payee: this.payee,
            remark: this.remark
          }).then(res => {
            this.disabled = false
            if (res) {
              this.$message({
                type: 'success',
                message: '租柜成功'
              })
              this.dialogVisible = false
            } else {
              throw res
            }
          })
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
      this.disabled = false
    },
    cancel () {
      this.dialogVisible = false
      this.$message({
        type: 'success',
        message: '取消成功'
      })
    },
    closed () {
      this.$parent.RentCupboardCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
