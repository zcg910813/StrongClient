<template>
  <div id="dialog">
    <el-dialog title="预约签到" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>会员姓名</span>
              <el-input v-model="name" placeholder="请输入会员姓名" disabled></el-input>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input v-model="remark" type='textarea' placeholder="请输入备注信息"></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style='text-indent: 30px;'>{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确认签到</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { enterExperience } from '@/api/experience'
export default {
  props: ['orderName', 'orderId'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      name: '',
      remark: '',
      defaultCoach: true
    }
  },
  created () {
    this.name = this.orderName
  },
  methods: {
    change () {
      this.defaultCoach = false
    },
    confirm () {
      if (!this.name) {
        this.tipControl('请输入会员姓名')
      } else {
        enterExperience({
          id: this.orderId,
          remark: this.remark
        }).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '预约体检签到成功'
            })
            this.$parent.getexperienceData()
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
    },
    closed () {
      this.$parent.orderSigninCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
