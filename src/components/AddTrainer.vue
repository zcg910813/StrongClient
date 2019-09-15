<template>
  <div id="dialog">
    <el-dialog title="添加教练" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content add-trainer">
          <el-form ref="form">
            <el-form-item label="上传图片" class="coach-add">
              <el-upload
                :action="updateUrl"
                list-type="picture-card"
                :on-success="updateSuccess"
                :on-change='deleteMessage'
                :headers="headers">
                <img :src="uploadFile" alt="" v-if='uploadFileShow' style="width: 100%;height: 100%;display: inline-block;">
                <i v-else class="el-icon-plus avatar-uploader-icon" style='position: absolute; top: 50%; left: 50%;transform: translate(-50%, -50%); display: inline-block;'></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="split-tip"><i>*</i>姓 名 </span>
              <el-input v-model="name" placeholder="请输入姓名" @input="deleteMessage"></el-input>
            </el-form-item>
            <el-form-item label="temp" class="sex-radio-group">
              <span slot="label" class="split-tip"><i>*</i>性 别 </span>
              <el-radio-group v-model="sex" @change='deleteMessage'>
                <el-radio label="boy">男</el-radio>
                <el-radio label="girl">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="split-tip"><i>*</i>电 话 </span>
              <el-input v-model="tel" placeholder="请输入电话" maxlength="11" @input="deleteMessage"></el-input>
            </el-form-item>
            <el-form-item label="教练类型" class="sex-radio-group">
              <el-radio-group v-model="type" @change='deleteMessage'>
                <el-radio label="1">私人教练</el-radio>
                <el-radio label="2">团课教练</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="显示权重">
              <el-input v-model="weight" placeholder="请输入权重" @input="deleteMessage"></el-input>
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
import update from '@/update'
import { addCoach } from '@/api/coach'
export default {
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      name: '',
      tel: '',
      sex: 'boy',
      type: '1',
      weight: '',
      updateUrl: update.uploadUrl,
      uploadFile: '',
      uploadFileShow: false,
      headers: {Authorization: `Bearer ${this.$cookies.get('token')}`},
      disabled: false
    }
  },
  created () {
  },
  methods: {
    updateSuccess (res) {
      this.uploadFile = res.data.fileurl
      this.uploadFileShow = true
    },
    confirm () {
      this.disabled = true
      if (!this.name) {
        this.tipControl('请输入姓名')
      } else if (!this.sex) {
        this.tipControl('请选择性别')
      } else if (!this.tel) {
        this.tipControl('请输入电话')
      } else if (this.weight && !/^[0-9]*$/.test(this.weight)) {
        this.tipControl('权重格式不正确')
      } else {
        addCoach({
          name: this.name,
          cellphone: this.tel,
          sex: this.sex === 'boy' ? '1' : '2',
          coachType: this.type,
          allowCourse: [],
          position: '教练',
          images: this.uploadFile,
          weight: this.weight
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '添加教练成功'
            })
            this.$parent.getAllCoachData()
          } else {
            this.tipControl(res.errMsg)
          }
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
      this.$parent.addTrainerCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/Controller.styl'
</style>
