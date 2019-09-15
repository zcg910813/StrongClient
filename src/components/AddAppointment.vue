<template>
  <div id="dialog">
    <el-dialog title="预约添加" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>会员姓名</span>
              <el-input v-model="name" placeholder="请输入会员姓名" @input="changeEvent"></el-input>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>会员电话</span>
              <el-input v-model="tel" placeholder="请输入会员电话" @input="changeEvent" maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="temp" class="signin-coach">
              <span slot="label"><i>*</i>预约会籍</span>
              <el-select v-model="from" placeholder="请选择预约会籍">
                <el-option
                  @input="changeEvent"
                  v-for="item in froms"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>预约时间</span>
              <el-date-picker
                @input="changeEvent"
                v-model="date"
                type="date"
                :editable='false'
                value-format="yyyy-MM-dd"
                placeholder="请选择预约时间">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style='text-indent: 30px'>{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllWorker } from '@/api/data'
import { addExperience } from '@/api/experience'
export default {
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      name: '',
      tel: '',
      from: '',
      froms: [],
      date: '',
      defaultCoach: true,
      disabled: false,
      sDate: '',
      eDate: ''
    }
  },
  created () {
    getAllWorker({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.employees
        this.froms = data.map(item => { return {label: item.name + ' ' + '(' + item.cellphone + ')', value: item.id} })
      }
    })
  },
  methods: {
    changeEvent () {
      this.tipMessage = ''
      this.disabled = false
    },
    change () {
      this.defaultCoach = false
    },
    confirm () {
      this.disabled = true
      if (!this.name) {
        this.tipControl('请输入会员姓名')
      } else if (!this.tel) {
        this.tipControl('请输入会员电话')
      } else if (!this.from) {
        this.tipControl('请选择预约会籍')
      } else if (!this.date) {
        this.tipControl('请选择预约时间')
      } else {
        addExperience({
          name: this.name,
          phone: this.tel,
          employeeId: this.from,
          ordertime: this.date
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '预约添加成功'
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
      this.$parent.AddAppointmentCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
