<template>
  <div id="dialog">
    <el-dialog title="短信发送" width='600px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content recover-dialog">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>接收对象</span>
              <el-input v-model="receiver" placeholder="请输入储柜编号" @input='deleteMessage'></el-input>
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
import { updateNotifyMsg } from '@/async/members'
export default {
  props: ['paramsPass'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      receiver: ''
    }
  },
  created () {
  },
  methods: {
    confirm () {
      if (!this.receiver) {
        this.tipControl('请输入储柜编号')
      } else {
        this.$confirm(`确定添加${this.paramsPass.username}收取押金记录吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateNotifyMsg({
            memberid: this.paramsPass.uid,
            notifymsg: this.receiver
          }).then(res => {
            if (res) {
              this.$message({
                type: 'success',
                message: '发送成功'
              })
              this.dialogVisible = false
            } else {
              throw res
            }
          })
        }).catch(() => {
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
      this.$parent.SendMessageCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
