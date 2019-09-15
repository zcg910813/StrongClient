<template>
  <div id="dialog">
    <el-dialog :title="list[0] === 'depositRefund' ? '押金退还' : '定金退还'" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="会员姓名">
              <span>{{list[2]}}</span>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>会员电话</span>
              <span>{{list[3]}}</span>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>退款金额</span>
              <span>{{list[4]}}</span>
            </el-form-item>
            <el-form-item label="temp" class="signin-coach">
              <span slot="label"><i>*</i>退款方式</span>
              <el-select v-model="type" placeholder="请选择" @change='typeChange'>
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确认退款</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { deleteEarnest, deleteDeposit } from '@/api/member'
export default {
  props: ['list'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
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
      ]
    }
  },
  created () {
    if (Number(this.list[5]) === 0) {
      this.type = ''
    } else {
      this.type = this.list[5]
    }
  },
  methods: {
    typeChange (e) {
      this.tipMessage = ''
      this.type = e
    },
    confirm () {
      if (!this.type) {
        this.tipControl('请选择支付方式')
      } else {
        if (this.list[0] === 'refund') {
          deleteEarnest({
            uids: [this.list[1]],
            returntype: this.type
          }).then(res => {
            if (res.code === 200) {
              this.dialogVisible = false
              this.$message({
                type: 'success',
                message: '定金退还成功'
              })
              this.$parent.getAllEarnest()
            }
          })
        } else {
          deleteDeposit({
            uids: [this.list[1]],
            returntype: this.type
          }).then(res => {
            if (res.code === 200) {
              this.dialogVisible = false
              this.$message({
                type: 'success',
                message: '押金退还成功'
              })
              this.$parent.getAllDeposit()
            }
          })
        }
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
      this.$parent.refundCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
