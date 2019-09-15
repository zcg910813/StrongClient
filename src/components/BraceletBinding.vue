<template>
  <div id="dialog">
    <el-dialog title="手环绑定" width='600px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content recover-dialog">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>手环编号 </span>
              <el-input v-model="number" placeholder="请输入手环编号" @input='deleteMessage'></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 45px;">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { bindingRfid } from '@/async/members'
export default {
  props: ['paramsPass'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      number: '',
      disabled: false
    }
  },
  created () {
  },
  methods: {
    confirm () {
      this.disabled = true
      if (!this.number) {
        this.tipControl('请输入手环编号')
      } else {
        this.$confirm(`确定添加${this.paramsPass.username}手环编号吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bindingRfid({
            memberid: this.paramsPass.uid,
            RFID: this.number
          }).then(res => {
            this.disabled = false
            if (res) {
              this.dialogVisible = false
              this.$parent.queryMemberInfo()
              this.$message({
                type: 'success',
                message: '手环编号绑定成功'
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
      this.$parent.BraceletBindingCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
