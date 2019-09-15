<template>
  <div id="dialog">
    <el-dialog title="添加工作人员" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>姓名: </span>
              <el-input v-model="name" placeholder="请输入姓名" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="temp" class="sex-radio-group">
              <span slot="label"><i>*</i>性别: </span>
              <el-radio-group v-model="sex" @change='change'>
                <el-radio label="boy">男</el-radio>
                <el-radio label="girl">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>电话: </span>
              <el-input v-model="tel" placeholder="请输入电话" maxlength="11" @input='deleteMessage'></el-input>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>职位: </span>
              <el-select v-model="position" placeholder="请选择" @change='deleteMessage'>
                <el-option
                  @input='deleteMessage'
                  v-for="item in positions"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
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
import { getAllRole } from '@/api/role'
import { addEmployee } from '@/api/person'
export default {
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      name: '',
      sex: 'boy',
      tel: '',
      position: '',
      positions: [],
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
      if (!this.name) {
        this.tipControl('请输入姓名')
      } else if (!/^[\u4e00-\u9fa5]{0,}$/.test(this.name)) {
        this.tipControl('姓名格式不正确')
      } else if (!this.sex) {
        this.tipControl('请选择性别')
      } else if (!this.tel) {
        this.tipControl('请输入电话')
      } else if (!this.position) {
        this.tipControl('请选择职位')
      } else {
        addEmployee({
          name: this.name,
          cellphone: this.tel,
          sex: this.sex === 'boy' ? '1' : '2',
          position: this.position
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '添加工作人员成功'
            })
            this.$parent.getAllWorker()
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
      this.$parent.addWorkerCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
