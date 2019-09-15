<template>
  <div class="appMain">
    <div class="add-course">
      <el-form ref="form">
        <el-form-item label="temp">
          <span slot="label"><i>*</i>课程封面</span>
          <div class="upload-logo update-picture-post">
            <el-upload
              @change='deleteMessage'
              :action="updateUrl"
              list-type="picture-card"
              :headers="headers"
              :on-remove="removeUrlList"
              :on-success="success"
              :on-change="deleteMessage"
              >
              <img :src="uploadFile" alt="" v-if='uploadFileShow' style="width: 100%;height: 100%;display: inline-block;">
              <i v-else class="el-icon-plus avatar-uploader-icon" style='position: absolute; top: 50%; left: 50%;transform: translate(-50%, -50%); display: inline-block;'></i>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="temp">
          <span slot="label"><i>*</i>课程名称</span>
          <el-input v-model="name" placeholder="请输入课程名称" @input="ChangeEvent"></el-input>
        </el-form-item>
        <el-form-item label="课程有效期">
          <el-input v-model="term" placeholder="请输入私教课有效时长" @input="ChangeEvent">
            <template slot="append">天</template>
          </el-input>
          <span style="line-height: 35px;"><i class="el-icon-warning no-limit"></i>不填表示不限时长</span>
        </el-form-item>
        <el-form-item label="temp">
          <span slot="label"><i>*</i>单节时长</span>
          <el-input v-model="chapter" placeholder="请输入单节有效时长" @input="ChangeEvent">
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="temp">
          <span slot="label"><i>*</i>单节售价</span>
          <el-input v-model="price" placeholder="请输入单节课售价" @input="ChangeEvent">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="课程描述" class="quill-editor-item">
          <div>
            <quill-editor
              ref="myQuillEditor"
              :options="editorOption"
              @change="onEditorReady($event)">
              >
            </quill-editor>
          </div>
        </el-form-item>
        <el-form-item label='上传图片' class="update-url-list" style="margin-top: 20px;">
          <el-upload
            v-model='updateUrlList'
            :action="updateUrl"
            list-type="picture-card"
            :headers='headers'
            @change="deleteMessage"
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
              <li v-for='(item, index) in imgUrl' :key='index'><img @click='showPic(index)' :src="item" alt=""><i class="el-icon-circle-close" @click='deleteCurrentImg(index)'></i></li>
            </ul>
          </div>
        </el-form-item>
      </el-form>
      <div class="tipMessage tip-color" style='text-align: left; text-indent: 80px;'>{{tipMessage}}</div>
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
import update from '@/update'
import { addPrivate, queryPrivateDetails, editPrivate } from '@/api/persongroup'
export default {
  components: {
    ImageView
  },
  data () {
    return {
      uploadFile: '',
      updateUrlList: '',
      uploadFileList: [],
      name: '',
      term: '',
      chapter: '',
      price: '',
      content: '',
      dialogImageUrl: '',
      updateUrl: update.uploadUrl,
      dialogVisible: false,
      editorOption: {
        placeholder: '请输入内容'
      },
      tipMessage: '',
      headers: {Authorization: `Bearer ${this.$cookies.get('token')}`},
      selfCourseUid: null,
      uploadFileShow: false,
      imgUrl: [],
      bigImgUrl: [],
      show: false,
      disabled: false
    }
  },
  created () {
    if (this.$route.params.selfCourseUid) {
      this.selfCourseUid = this.$route.params.selfCourseUid
    } else {
      this.selfCourseUid = localStorage.getItem('selfCourseUid')
    }
    if (this.selfCourseUid !== 'null') {
      this.uploadFileShow = true
      queryPrivateDetails({
        uid: this.selfCourseUid
      }).then(res => {
        if (res.code === 200) {
          let data = res.data.res
          this.uploadFile = data.cover
          this.name = data.privatename
          this.term = data.validity
          this.chapter = data.param
          this.price = data.price
          this.remark = data.remark
          this.imgUrl = JSON.parse(data.images)
        }
      })
    } else {
      this.uploadFileShow = false
    }
  },
  methods: {
    ChangeEvent () {
      this.tipMessage = ''
      this.disabled = false
    },
    showPic (index) {
      queryPrivateDetails({
        uid: this.selfCourseUid
      }).then(res => {
        this.selfCourseData = res.data.res
        this.imgUrl = JSON.parse(res.data.res.images)
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
      this.dialogVisible = true
    },
    updateSuccessList (res) {
      this.uploadFileList.push(res.data.fileurl)
      for (let i of this.imgUrl) {
        this.uploadFileList.push(i)
      }
    },
    success (res) {
      this.uploadFile = res.data.fileurl
      this.uploadFileShow = true
    },
    removeUrlList () {
      this.uploadFile = ''
      this.uploadFileShow = false
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    cancel () {
      this.$router.push({name: 'course'})
    },
    onEditorReady (quill) {
      this.tipMessage = ''
      this.disabled = false
      this.content = quill.text
    },
    confirm () {
      this.disabled = false
      if (!this.uploadFile) {
        this.tipControl('请上传封面')
      } else if (!this.name) {
        this.tipControl('请输入名称')
      } else if (this.term && !/^[0-9]*$/.test(this.term)) {
        this.tipControl('课程有效期格式不正确')
      } else if (!this.chapter) {
        this.tipControl('请输入单节时长')
      } else if (!/^[0-9]*$/.test(this.chapter)) {
        this.tipControl('单节时长格式不正确')
      } else if (!this.price) {
        this.tipControl('请输入单节售价')
      } else if (!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.price)) {
        this.tipControl('单节售价格式不正确')
      } else {
        if (this.selfCourseUid === 'null' || this.selfCourseUid === undefined) {
          addPrivate({
            cover: this.uploadFile,
            privatename: this.name,
            validity: this.term,
            param: this.chapter,
            price: this.price,
            remark: this.content,
            images: this.uploadFileList
          }).then(res => {
            this.disabled = false
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '添加私教课成功'
              })
              this.$router.push({name: 'selfCourse'})
            } else {
              this.tipControl(res.errMsg)
            }
          })
        } else {
          editPrivate({
            uid: this.selfCourseUid,
            cover: this.uploadFile,
            privatename: this.name,
            validity: this.term,
            param: this.chapter,
            price: this.price,
            remark: this.content,
            images: this.uploadFileList.length === 0 ? this.imgUrl : this.uploadFileList
          }).then(res => {
            this.disabled = false
            if (res.code === 200) {
              this.$router.push({name: 'selfCourse'})
              this.$message({
                type: 'success',
                message: '编辑私教课成功'
              })
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
  },
  mounted () {
  }
}
</script>

<style lang='stylus' scoped>
@import '../../assets/css/course.styl'
</style>
