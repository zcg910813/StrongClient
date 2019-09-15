<template>
  <div id="dialog">
    <el-dialog title="积分调整" width='600px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content recover-dialog">
          <el-form ref="form">
            <el-form-item label="当前积分">
              <span>3</span>
            </el-form-item>
            <el-form-item label="temp" class="sex-radio-group">
              <span slot="label"><i>*</i>调整方式</span>
              <el-radio-group v-model="type" @change='change'>
                <el-radio label="plus">增加</el-radio>
                <el-radio label="sub">扣除</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>调整积分</span>
              <el-input v-model="integral" type='textarea' placeholder="请输入调整积分" @input="deleteMessage"></el-input>
            </el-form-item>
            <el-form-item label="调整后积分">
              <span>3</span>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="remark" type='textarea' placeholder="请输入内容" @input="deleteMessage"></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 20px;">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
// import { starInsertDeposit } from '@/async/members'
export default {
  props: ['paramsPass'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      type: 'plus',
      integral: '',
      remark: '',
      disabled: false
    }
  },
  created () {
  },
  methods: {
    change () {
      this.tipMessage = ''
    },
    confirm () {
      if (!this.type) {
        this.tipControl('请选择调整方式')
      } else if (!this.integral) {
        this.tipControl('请输入调整积分')
      } else {
        this.$confirm(`确定添加${this.paramsPass.username}调整积分吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '收取押金成功'
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
    },
    cancel () {
      this.dialogVisible = false
      this.$message({
        type: 'success',
        message: '取消成功'
      })
    },
    closed () {
      this.$parent.IntegralAdjustCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
