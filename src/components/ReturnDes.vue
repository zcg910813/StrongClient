<template>
  <div id="dialog">
    <el-dialog title="收定金" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content recover-dialog">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>定金金额</span>
              <el-input v-model="amount" placeholder="请输入定金金额" @input='amountChange'></el-input>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="payee"><i>*</i>收款人</span>
              <el-select v-model="payee" placeholder="请选择收款人" @change='payeeChange'>
                <el-option
                  v-for="(item, idx) in payees"
                  :key="idx"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支付方式">
              <el-select v-model="type" placeholder="请选择支付方式" @change='typeChange'>
                <el-option
                  v-for="item in types"
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
          <div class="tipMessage tip-color" style='text-indent: 30px;'>{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllWorker } from '@/api/data'
import { starInsertEarnest } from '@/async/members'
export default {
  props: ['recoverInfo'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      amount: '',
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
      ]
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
    amountChange () {
      this.tipMessage = ''
    },
    payeeChange (e) {
      this.tipMessage = ''
      this.payee = e
    },
    typeChange () {
      this.tipMessage = ''
    },
    confirm () {
      if (!this.amount) {
        this.tipControl('请输入定金金额')
      } else if (!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.amount)) {
        this.tipControl('定金金额格式不正确')
      } else if (!this.payee) {
        this.tipControl('请选择收款人')
      } else {
        starInsertEarnest({
          memberid: this.recoverInfo.uid,
          cost: this.amount,
          payment: this.type,
          payee: this.payee,
          remark: this.remark
        }).then(res => {
          if (res) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '成功收定金'
            })
            this.$router.push({name: 'member'})
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
      this.$message({
        type: 'success',
        message: '取消成功'
      })
    },
    closed () {
      this.$parent.returnDesCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
