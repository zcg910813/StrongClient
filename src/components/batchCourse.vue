<template>
  <div id="dialog">
    <el-dialog title="批量请假" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="会 员 卡" class='memberCard'>
              <span>已选  {{checkList.length}}  张</span>
            </el-form-item>
            <!-- <el-form-item label="temp" class="sex-radio-group">
              <span slot="label"><i>*</i>请假事由</span>
              <el-input v-model="reson" placeholder="请输入请假事由" @input='deleteMessage'></el-input>
            </el-form-item> -->
            <el-form-item label="temp">
              <span slot="label"><i>*</i>请假日期</span>
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
import { BatchLeave } from '@/api/buyvipcard'
export default {
  props: ['checkList'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      disabled: false,
      date: ''
    }
  },
  created () {
  },
  methods: {
    confirm () {
      BatchLeave({
        uids: this.checkList.map(o => { return o.uid }),
        leavestarttime: this.date[0],
        leaveendtime: this.date[1]
      }).then(res => {
        if (res.code === 200) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '批量请假成功'
          })
          this.$parent.QueryAllBVCard()
          this.$parent.checkList = []
        }
      })
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
      this.$parent.batchCourseEventClose()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
