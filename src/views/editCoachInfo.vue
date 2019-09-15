<template>
  <div class="appMain face-main">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="worker-info">
            <div>
              <el-upload
                style="position: relative;"
                v-model='uploadFile'
                :action="updateUrl"
                list-type="picture-card"
                :on-success="updateSuccess"
                :on-change='deleteMessage'
                :headers="headers"
                >
                <img :src="img" alt="" v-if='uploadFileShow'>
                <i v-else class="el-icon-plus avatar-uploader-icon" style='position: absolute; top: 50%; left: 50%;transform: translate(-50%, -50%); display: inline-block;'></i>
              </el-upload>
            </div>
            <div class="info-detail">
              <el-form ref="form">
                <el-form-item label="temp">
                  <span slot="label"><i>*</i>姓<span style='margin: 0 15px'></span>名</span>
                  <el-input v-model="name" placeholder="请输入姓名" @input="deleteMessage"></el-input>
                </el-form-item>
                <el-form-item label="temp">
                  <span slot="label"><i>*</i>性<span style='margin: 0 15px'></span>别</span>
                  <el-radio-group v-model="sex" size="medium" @change='deleteMessage'>
                    <el-radio-button label="1" >男</el-radio-button>
                    <el-radio-button label="2">女</el-radio-button>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="temp">
                  <span slot="label"><i>*</i>手<span style='margin: 0 8px;'>机</span>号</span>
                  <el-input v-model="tel" placeholder="请输入手机号" maxlength="11" @input="deleteMessage"></el-input>
                </el-form-item>
                <el-form-item label="temp">
                  <span slot="label"><i>*</i>教练类型</span>
                  <el-select v-model="coachType" placeholder="请选择" @change="deleteMessage">
                    <el-option
                      v-for="item in coachTypes"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
              <div class="tipMessage tip-color" style='text-indent: 35px'>{{tipMessage}}</div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
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
import Face from '../components/Face.vue'
// import { getCoachData } from '@/api/data'
import { updateCoach } from '@/api/coach'
export default {
  components: {
    Face
  },
  data () {
    return {
      uploadFile: '',
      img: '',
      updateUrl: update.uploadUrl,
      uploadFileShow: false,
      headers: {Authorization: `Bearer ${this.$cookies.get('token')}`},
      name: '',
      sex: '1',
      tel: '',
      coachType: '',
      courseDetailList: [],
      coachTypes: [
        {
          value: '1',
          name: '团课教练'
        },
        {
          value: '2',
          name: '私课教练'
        }
      ],
      tipMessage: '',
      faceShow: false,
      disabled: false
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    if (this.$route.params.courseDetailList) {
      this.courseDetailList = this.$route.params.courseDetailList
    } else {
      this.courseDetailList = localStorage.getItem('courseDetailList').split(',')
    }
    if (this.courseDetailList !== null) {
      this.$store.commit('setLoading', false)
      this.img = this.courseDetailList[5][0]
      this.name = this.courseDetailList[1]
      this.sex = this.courseDetailList[2]
      this.tel = this.courseDetailList[3]
      this.coachType = this.courseDetailList[4] === '1' ? '团课教练' : '私课教练'
      if (this.img !== undefined && this.img.length >= 1) {
        this.uploadFileShow = true
      }
    }
    // getCoachData({
    //   coachId: this.courseDetailList
    // }).then(res => {
    //   let data = res.data.coachs[0]
    //   this.name = data.name
    //   this.sex = data.sex
    //   this.tel = data.cellphone
    //   this.coachType = data.coachType === '1' ? '团课教练' : '私课教练'
    //   this.img = data.images
    //   if (this.img.length >= 1) {
    //     this.uploadFileShow = true
    //   }
    // })
  },
  methods: {
    updateSuccess (res) {
      this.uploadFile = res.data.fileurl
      this.uploadFileShow = true
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
      this.disabled = false
    },
    confirm () {
      this.disabled = true
      if (!this.name) {
        this.tipControl('请输入姓名')
      } else if (!this.sex) {
        this.tipControl('请选择性别')
      } else if (!this.tel) {
        this.tipControl('请输入手机号')
      } else if (!/^(0|86|17951)?(1[3-9][0-9])[0-9]{8}$/.test(this.tel)) {
        this.tipControl('手机号格式不正确')
      } else if (!this.coachType) {
        this.tipControl('请选择教练类型')
      } else {
        let _t = this
        updateCoach({
          id: _t.courseDetailList[0],
          name: _t.name,
          sex: _t.sex,
          cellphone: _t.tel,
          coachType: _t.coachType === '团课教练' ? '1' : '2',
          allowCourse: [],
          position: '教练',
          images: _t.uploadFile
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.$router.push({name: 'trainer'})
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
