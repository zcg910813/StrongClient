<template>
  <div id="dialog">
    <el-dialog title="水费时长" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>添加时长</span>
              <el-input v-model="time" placeholder="请输入水费时长" @input='deleteMessage'>
                <template slot="append">分钟</template>
              </el-input>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>收费金额</span>
              <el-input v-model="amount" placeholder="请输入收费金额" maxlength="11" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>收款方式</span>
              <el-select v-model="type" placeholder="请选择支付方式" @change='deleteMessage'>
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
import { getAllRole } from '@/api/role'
import { BuyWater } from '@/api/member'
export default {
  props: ['paramsPass'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      time: '',
      amount: '',
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
      disabled: false
    }
  },
  created () {
    getAllRole({
      pageCount: this.pageCount,
      curPage: this.curPage
    }).then(res => {
      this.positions = res.data.data
    })
  },
  methods: {
    change () {
      this.tipMessage = ''
      this.disabled = false
    },
    confirm () {
      this.disabled = true
      if (!this.time) {
        this.tipControl('请输入水费时长')
      } else if (!this.amount) {
        this.tipControl('请输入收费金额')
      } else if (!this.type) {
        this.tipControl('请选择收款方式')
      } else {
        BuyWater({
          memberid: this.paramsPass.uid,
          water: this.time,
          price: this.amount,
          payment: this.type
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '购买水费成功'
            })
            this.$parent.queryMemberInfo()
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
      this.disabled = false
    },
    cancel () {
      this.dialogVisible = false
    },
    closed () {
      this.$parent.BuyWaterCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
