<template>
  <div id="dialog">
    <el-dialog title="教练签到" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="预约人数">
              <span>11人</span>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>实到人数</span>
              <el-input v-model="signInData.orderNumber" placeholder="请输入实到会员数量" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="temp" class="signin-coach">
              <span slot="label"><i>*</i>记录人</span>
              <!-- <el-input v-model="signinCoach" placeholder="请输入签到教练" v-if='defaultCoach' @input='deleteMessage'></el-input> -->
              <el-select v-model="payee" placeholder="请选择">
                <el-option
                  v-for="item in payees"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid"
                  @input='deleteMessage'>
                </el-option>
              </el-select>
              <!-- <span class="change" @click="change" v-if='defaultCoach'>更改</span> -->
            </el-form-item>
            <el-form-item label="备 注" class="remark">
              <el-input v-model="remark" placeholder="请输入内容" @input='deleteMessage'></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style='text-indent: 30px'>{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { addLeague } from '@/api/grouplesson'
import { getAllWorker } from '@/api/data'
export default {
  props: ['signInData'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      signinCoach: '',
      payee: '',
      payees: [],
      remark: '',
      defaultCoach: true
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
    change () {
      this.defaultCoach = false
    },
    confirm () {
      if (this.signInData.orderNumber === '') {
        this.tipControl('请输入实到会员数量')
      } else if (!this.payee) {
        this.tipControl('请选择记录人')
      } else {
        addLeague({
          id: this.signInData.id,
          currentNumber: this.signInData.orderNumber,
          recordPersonId: this.payee,
          remark: this.remark,
          device: 1
        }).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '教练签到成功'
            })
            this.$parent.getGroupLessonQuery()
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
      this.$parent.coachSigninCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
