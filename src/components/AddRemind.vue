<template>
  <div id="dialog">
    <el-dialog title="添加提醒" width='600px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content recover-dialog">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>内容</span>
              <el-input v-model="content" type='textarea' placeholder="请输入提醒内容" @input='deleteMessage'></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 50px;">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
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
      content: '',
      disabled: false
    }
  },
  created () {
  },
  methods: {
    confirm () {
      this.disabled = true
      if (!this.content) {
        this.tipControl('请输入提醒内容')
      } else {
        this.$confirm(`确定添加${this.paramsPass.username}提醒吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          updateNotifyMsg({
            memberid: this.paramsPass.uid,
            notifymsg: this.content
          }).then(res => {
            this.disabled = false
            if (res) {
              this.dialogVisible = false
              this.$message({
                type: 'success',
                message: '添加成功'
              })
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
      this.$parent.AddRemindCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
