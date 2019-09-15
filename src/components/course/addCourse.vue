<template>
  <div class="appMain">
    <div class="add-course">
      <el-form>
        <el-form-item label="temp">
          <span slot="label"><i>*</i>课程封面</span>
          <div class="dialog-content">
            <div class="upload-logo update-picture-post">
              <el-upload
                :action="updateUrl"
                list-type="picture-card"
                :on-remove='removeUrlList'
                :on-success="updateSuccess"
                :on-change='handleChange'
                :headers="headers"
                >
                <img :src="uploadFile" alt="" v-if='uploadFileShow' style="width: 100%;height: 100%;display: inline-block;">
                <i v-else class="el-icon-plus avatar-uploader-icon" style='position: absolute; top: 50%; left: 50%;transform: translate(-50%, -50%); display: inline-block;'></i>
              </el-upload>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="temp">
          <span slot="label"><i>*</i>课程名称</span>
          <el-input v-model="name" placeholder="请输入课程名称" @input="ChangeEvent"></el-input>
        </el-form-item>
        <el-form-item label="temp">
          <span slot="label"><i>*</i>课程时长</span>
          <el-input v-model="time" placeholder="请输入课程时长" @input="ChangeEvent">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="temp">
          <span slot="label"><i>*</i>可预约人数</span>
          <el-input v-model="amount" placeholder="请输入可预约的最多人数" @input="ChangeEvent">
            <template slot="append">人</template>
          </el-input>
        </el-form-item>
        <el-form-item label="temp">
          <span slot="label"><i>*</i>最少上课人数</span>
          <el-input v-model="min" placeholder="请输入最少上课人数" @input="ChangeEvent">
            <template slot="append">人</template>
          </el-input>
        </el-form-item>
        <el-form-item label="课程详情">
          <div>
            <quill-editor
              ref="qc"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorReady($event)">
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item label='上传图片' class="update-url-list" style='margin-top: 20px'>
          <el-upload
            v-model='updateUrlList'
            :action="updateUrl"
            list-type="picture-card"
            :headers='headers'
            :on-success="updateSuccessList"
            :on-preview="handlePictureCardPreview"
            >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div class="pic-list">
            <ul>
              <li v-for='(item, index) in imgUrl' :key='item'><img @click='showPic(index)' :src="item" alt=""><i class="el-icon-circle-close" @click='deleteCurrentImg(index)'></i></li>
            </ul>
          </div>
        </el-form-item>
      </el-form>
      <div class="tipMessage tip-color" style="text-align: left;text-indent: 50px;">{{tipMessage}}</div>
      <div class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm" :disabled="disabled">确定</el-button>
      </div>
    </div>
    <transition name="slide-fade" class="fadeView">
      <div v-if="show">
        <image-view
          :imgArr="bigImgUrl"
          :showImageView="true"
          v-on:hideImage="hideImageView">
        </image-view>
      </div>
    </transition>
  </div>
</template>
<script>
import ImageView from '../imageView'
import { addCourse, queryCourseOneInfo, updateCourse } from '@/api/course'
import update from '@/update'
export default {
  components: {
    ImageView
  },
  data () {
    return {
      dialogVisible: false,
      uploadFile: '',
      getPicUrl: '',
      updateUrlList: [],
      name: '',
      time: '',
      amount: '',
      min: '',
      updateUrl: update.uploadUrl,
      editorOption: {
        placeholder: '请输入内容'
      },
      tipMessage: '',
      dialogImageUrl: '',
      headers: {Authorization: `Bearer ${this.$cookies.get('token')}`},
      courseId: null,
      uploadFileShow: false,
      show: false,
      imgUrl: [],
      bigImgUrl: [],
      detailContent: '',
      disabled: false
    }
  },
  mounted () {
    if (this.$route.params.courseId) {
      this.courseId = this.$route.params.courseId
    } else {
      this.courseId = localStorage.getItem('courseId')
    }
    if (this.courseId !== 'null') {
      this.uploadFileShow = true
      queryCourseOneInfo(this.courseId).then(res => {
        let data = res.data.oneCourseInfo
        this.uploadFile = data.coverUrl
        this.name = data.coursename
        this.time = data.coursetime
        this.amount = data.maxcoursemember
        this.min = data.mincoursemember
        this.detailContent = data.remark
      })
    } else {
      this.uploadFileShow = false
    }

    queryCourseOneInfo(this.courseId).then(res => {
      if (res.code === 200) {
        this.selfCourseData = res.data.oneCourseInfo
        this.imgUrl = res.data.oneCourseInfo.images
      }
    })
  },
  methods: {
    ChangeEvent () {
      this.tipMessage = ''
      this.disabled = false
    },
    showPic (index) {
      queryCourseOneInfo(this.courseId).then(res => {
        this.selfCourseData = res.data.oneCourseInfo
        this.imgUrl = this.selfCourseData.images
        this.show = true
        this.bigImgUrl = []
        this.bigImgUrl.push(this.imgUrl.slice(index, index + 1)[0])
      })
    },
    hideImageView () {
      this.show = false
    },
    deleteCurrentImg (idx) {
      this.imgUrl.splice(idx, 1)
      this.updateUrlList = this.imgUrl
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
    },
    handleChange (file) {
      this.tipMessage = ''
    },
    updateSuccess (res) {
      this.uploadFile = res.data.fileurl
      this.uploadFileShow = true
    },
    updateSuccessList (res) {
      this.updateUrlList.push(res.data.fileurl)
      for (let i of this.imgUrl) {
        this.updateUrlList.push(i)
      }
    },
    removeUrlList (file) {
      this.uploadFile = ''
      this.uploadFileShow = false
    },
    onEditorBlur (quill) {
    },
    onEditorFocus (quill) {
    },
    onEditorReady (quill) {
      this.tipMessage = ''
      this.disabled = false
      this.detailContent = quill.text
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    cancel () {
      this.$router.go(-1)
    },
    confirm () {
      this.disabled = true
      if (!this.uploadFile) {
        this.tipControl('请上传课程封面')
      } else if (!this.name) {
        this.tipControl('请输入课程名称')
      } else if (!this.time) {
        this.tipControl('请输入课程时长')
      } else if (!/^[0-9]*$/.test(this.time)) {
        this.tipControl('课程时长格式不正确')
      } else if (!this.amount) {
        this.tipControl('请输入可预约人数')
      } else if (!/^[0-9]*$/.test(this.amount)) {
        this.tipControl('可预约人数格式不正确')
      } else if (!this.min) {
        this.tipControl('请输入最少上课人数')
      } else if (!/^[0-9]*$/.test(this.min)) {
        this.tipControl('最少上课人数不正确')
      } else {
        if (this.courseId === 'null') {
          addCourse({
            coverUrl: this.uploadFile,
            coursename: this.name,
            coursetime: this.time,
            maxcoursemember: this.amount,
            mincoursemember: this.min,
            images: this.updateUrlList,
            remark: this.detailContent
          }).then(res => {
            this.disabled = false
            if (res.code === 200) {
              this.$router.push({name: 'course'})
            } else {
              this.tipControl(res.errMsg)
            }
          })
        } else {
          updateCourse({
            courseId: this.courseId,
            coverUrl: this.uploadFile,
            coursename: this.name,
            coursetime: this.time,
            maxcoursemember: this.amount,
            mincoursemember: this.min,
            images: this.updateUrlList,
            remark: this.detailContent
          }).then(res => {
            if (res.code === 200) {
              this.$router.push({name: 'course'})
            } else {
              this.tipControl(res.errMsg)
            }
          })
        }
      }
    }
  },
  computed: {
    // editor () {
    //   return this.$refs.myQuillEditor.quill
    // }
  }
}
</script>

<style lang='stylus' scoped>
@import '../../assets/css/course.styl'
</style>
