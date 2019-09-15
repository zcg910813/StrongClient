<template>
  <div id="dialog">
    <el-dialog title="上传人脸ID照片" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content face-dialog">
        <p><i class="el-icon-warning"></i>请保证五官清晰可见，避免佩戴帽子、墨镜、口罩等物件，保证光线充足。</p>
        <div class="shoot">
          <div class="control-upload">
            <div class="uploaded-img">
              <img src="" alt="">
            </div>
            <!-- <video id="video"></video>
            <canvas id="canvas"></canvas>
            <el-button id="btn" @click='get' v-if='btnShow'>拍照</el-button> -->
          </div>
          <div class="right">
            <p>照片支持JPG、PNG格式</p>
            <p>大小不超过5M</p>
            <el-upload
              v-model="uploadFile"
              class="upload-demo"
              :action="updateUrl"
              :on-success="uploadeSuccess"
              list-type="picture-card"
              :headers="headers"
              :on-preview="handlePreview"
              :before-upload='beforeUpload'
              :on-remove="handleRemove">
              <el-button type='primary'>从电脑上选择</el-button>
            </el-upload>
            <el-dialog :visible.sync="dialogVisibleShow" :modal='false' custom-class='uploadFileDialog'>
              <img width="100%" :src="uploadFile" alt="">
            </el-dialog>
            <!-- <el-button plain @click='phone'>用摄像头拍摄</el-button> -->
            <el-button plain disabled>用摄像头拍摄</el-button>
          </div>
        </div>
        <div class="tipMessage tip-color">{{tipMessage}}</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm">确认上传</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import update from '@/update'
export default {
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      updateUrl: update.uploadUrl,
      headers: {Authorization: `Bearer ${this.$cookies.get('token')}`},
      uploadFile: [],
      dialogVisibleShow: false,
      canvas: '',
      video: '',
      btn: '',
      context: '',
      streaming: false,
      width: '',
      height: '',
      btnShow: false
    }
  },
  mounted () {

  },
  created () {
    // let canvas = document.querySelector('canvas')
    // canvas.setAttribute('width', 0)
    // canvas.width = 0
    // canvas.height = 0
  },
  methods: {
    // phone () {
    //   this.btnShow = true
    //   this.canvas = document.querySelector('canvas')
    //   this.video = document.querySelector('video')
    //   this.btn = document.querySelector('button')
    //   this.context = this.canvas.getContext('2d')
    //   this.width = 476
    //   this.height = 0
    //   this.streaming = false
    //   let video = document.querySelector('video')
    //   navigator.mediaDevices.getUserMedia({ video: true }).then((stream, selector) => {
    //     this.video.srcObject = stream
    //     this.video.play()
    //   })
    //   this.$nextTick(_ => {
    //     video.addEventListener('canplay', function (ev) {
    //       if (ev.type === 'canplay') {
    //         let video = document.querySelector('video')
    //         let canvas = document.querySelector('canvas')
    //         let width = 476
    //         this.height = video.videoHeight / (video.videoWidth / width)
    //         video.setAttribute('width', width)
    //         video.setAttribute('height', this.height)
    //         canvas.setAttribute('width', width)
    //         canvas.setAttribute('height', this.height)
    //       }
    //     })
    //   })
    // },
    get () {
      if (!this.streaming) {
        this.context.drawImage(this.video, 0, 0, 235, 230)
      }
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    uploadeSuccess (res) {
      this.uploadFile.push(res.data.fileurl)
    },
    handleRemove () {
    },
    handlePreview (file) {
      this.tipMessage = ''
      this.dialogImageUrl = file.url
      this.dialogVisibleShow = true
    },
    beforeUpload () {
      this.tipMessage = ''
    },
    cancel () {
      this.dialogVisible = false
    },
    confirm () {
      if (!this.uploadFile) {
        this.tipControl('请上传头像或拍摄头像')
      }
    },
    closed () {
      this.$parent.faceCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/Controller.styl'
</style>
