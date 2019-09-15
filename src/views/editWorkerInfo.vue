<template>
  <div class="appMain face-main">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="worker-info">
            <div class="update-picture-post">
              <el-upload
                style="position: relative;"
                :action="updateUrl"
                list-type="picture-card"
                :on-success="updateSuccess"
                :on-change='handleChange'
                :headers="headers"
                >
                <img :src="uploadFile" alt="" v-if='uploadFileShow' style="width: 100%;height: 100%;display: inline-block;">
                <i v-else class="el-icon-plus avatar-uploader-icon" style='position: absolute; top: 50%; left: 50%;transform: translate(-50%, -50%); display: inline-block;'></i>
              </el-upload>
            </div>
            <div class="info-detail">
              <el-form ref="form">
                <el-form-item label="temp">
                  <span slot="label"><i>*</i>姓名</span>
                  <el-input v-model="name" placeholder="请输入姓名" @input="deleteMessage"></el-input>
                </el-form-item>
                <el-form-item label="temp">
                  <span slot="label"><i>*</i>性别</span>
                  <el-radio-group v-model="sex" size="medium" @change='deleteMessage'>
                    <el-radio-button label="1" >男</el-radio-button>
                    <el-radio-button label="2">女</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="temp">
                  <span slot="label"><i>*</i>手机号</span>
                  <el-input v-model="tel" placeholder="请输入手机号" maxlength="11" @input="deleteMessage"></el-input>
                </el-form-item>
                <el-form-item label="temp">
                  <span slot="label"><i>*</i>身份</span>
                  <el-select v-model="position" placeholder="请选择" @change='deleteMessage'>
                    <el-option
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
                <el-button type="primary" @click="confirm">确 定</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="face-check">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="check-title">
            <span>人脸识别ID</span>
          </div>
          <div class="add-face">
            <h3>当前人脸</h3>
            <el-button type='primary' @click='face'>添加人脸ID</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <face v-if='faceShow'></face>
  </div>
</template>
<script>
import update from '@/update'
import { getAllRole } from '@/api/role'
// import { getAllWorker } from '@/api/data'
import { updateEmployee } from '@/api/person'
import Face from '../components/Face.vue'
export default {
  components: {
    Face
  },
  data () {
    return {
      uploadFile: '',
      name: '',
      sex: '1',
      tel: '',
      position: '',
      positions: [],
      faceShow: false,
      tipMessage: '',
      PersonneList: [],
      updateUrl: update.uploadUrl,
      headers: {Authorization: `Bearer ${this.$cookies.get('token')}`},
      uploadFileShow: false
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    if (this.$route.params.PersonneList) {
      this.PersonneList = this.$route.params.PersonneList
    } else {
      this.PersonneList = localStorage.getItem('PersonneList').split(',')
    }
    if (this.PersonneList !== 'null') {
      this.$store.commit('setLoading', false)
      this.name = this.PersonneList[1]
      this.sex = this.PersonneList[2]
      this.tel = this.PersonneList[3]
      this.position = this.PersonneList[4]
      this.uploadFile = this.PersonneList[5]
      if (this.uploadFile !== null) {
        this.uploadFileShow = true
      } else {
        this.uploadFileShow = false
      }
      // getAllWorker({
      //   id: this.PersonneList
      // }).then(res => {
      //   this.$store.commit('setLoading', false)
      //   let data = res.data.employees[0]
      //   this.name = data.name
      //   this.sex = data.sex
      //   this.tel = data.cellphone
      //   this.position = data.position
      // })
    }
    getAllRole({
      pageCount: this.pageCount,
      curPage: this.curPage
    }).then(res => {
      this.positions = res.data.data
    })
  },
  methods: {
    updateSuccess (res) {
      this.uploadFile = res.data.fileurl
      this.uploadFileShow = true
    },
    handleChange () {
      this.tipMessage = ''
    },
    face () {
      this.faceShow = true
    },
    faceCloseEvent () {
      this.faceShow = false
    },
    cancel () {
      this.$router.go(-1)
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    confirm () {
      if (!this.name) {
        this.tipControl('请输入姓名')
      } else if (!/^[\u4e00-\u9fa5]{0,}$/.test(this.name)) {
        this.tipControl('姓名格式不正确')
      } else if (!this.sex) {
        this.tipControl('请选择性别')
      } else if (!this.tel) {
        this.tipControl('请输入手机号')
      } else if (!this.position) {
        this.tipControl('请选择身份')
      } else {
        updateEmployee({
          id: this.PersonneList[0],
          name: this.name,
          sex: this.sex,
          cellphone: this.tel,
          position: this.position,
          images: this.uploadFile
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.$router.push({name: 'worker'})
          }
        })
      }
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
