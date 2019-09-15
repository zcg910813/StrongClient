<template>
  <div id='dialog'>
    <el-dialog title="收押金" width='600px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content recover-dialog">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>押金用途</span>
              <el-input v-model="purpose" placeholder="请输入押金用途" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>押金金额</span>
              <el-input v-model="amount" placeholder="请输入押金金额" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="收取时间" >
              <el-date-picker
                @input='deleteMessage'
                v-model="date"
                type="date"
                :editable='false'
                value-format="yyyy-MM-dd"
                placeholder="请选择押金收取时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="type" placeholder="请选择支付方式" @change='deleteMessage'>
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收 款 人" class="payee-title">
              <el-select v-model="payee" placeholder="请选择"  @change='deleteMessage'>
                <el-option
                  v-for="item in payees"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备 注" class="remark-label">
              <el-input v-model="remark" @input='deleteMessage' type='textarea' placeholder="请输入内容"></el-input>
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
import { getAllWorker } from '@/api/data'
import { starInsertDeposit } from '@/async/members'
export default {
  props: ['recoverInfo'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      purpose: '',
      amount: '',
      date: '',
      type: '',
      payee: '',
      payees: [],
      remark: '',
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
        this.payees = data.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
  },
  methods: {
    confirm () {
      this.disabled = true
      if (!this.purpose) {
        this.tipControl('请输入押金用途')
      } else if (!this.amount) {
        this.tipControl('请输入押金金额')
      } else if (!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.amount)) {
        this.tipControl('押金金额格式不正确')
      } else {
        this.$confirm(`确定添加${this.recoverInfo.username}收取押金记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          starInsertDeposit({
            memberid: this.recoverInfo.uid,
            use: this.purpose,
            cost: this.amount,
            payment: this.type,
            time: this.date,
            remark: this.remark,
            payee: this.payee
          }).then(res => {
            this.disabled = false
            if (res) {
              this.dialogVisible = false
              this.$message({
                type: 'success',
                message: '收取押金成功'
              })
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
      this.$parent.recoverCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
