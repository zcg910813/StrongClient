<template>
  <div class="appMain">
    <div class="self-course-detail">
      <div class="add-store-btn">
        <el-button type="primary" class="btn-width-auto" @click='editInfo'>编辑信息</el-button>
        <el-button class="btn-width-auto">删除课程</el-button>
      </div>
      <el-row :gutter="12" class="detail">
        <el-col :span="24">
          <el-card shadow="hover">
            <div class="info">
              <div>
                <div><img :src="selfCourseData.cover" alt=""></div>
              </div>
              <ul>
                <li><h3>{{selfCourseData.privatename}}</h3></li>
                <li>单节时长: {{selfCourseData.param}}</li>
                <li>课程有效期: {{selfCourseData.validity === 0 ? '无限期' : selfCourseData.validity}}</li>
                <li>单节售价: {{selfCourseData.price}}</li>
                <li>课程描述: {{selfCourseData.remark}}</li>
              </ul>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row :gutter="12" class="detail">
        <el-col :span="24">
          <el-card shadow="hover">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="课程照片" name="coursePicture">
                <h3>封面照片</h3>
                <img :src="selfCourseData.cover" alt="">
                <div class="all">
                  <h3>所有照片</h3>
                  <ul v-if='imgUrl.length > 0'>
                    <li v-for='(item, index) in imgUrl' :key='index'><img @click='showPic(index)' :src="item" alt=""></li>
                  </ul>
                  <div v-else class="no-message">暂无照片</div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
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
<style lang='stylus' scoped>
@import '../assets/css/course.styl'
</style>
<script>
import ImageView from '../components/imageView'
import { queryPrivateDetails } from '@/api/persongroup'
export default {
  components: {
    ImageView
  },
  data () {
    return {
      activeName: 'coursePicture',
      selfCourseUid: '',
      selfCourseData: [],
      imgUrl: [],
      bigImgUrl: [],
      show: false
    }
  },
  created () {
    if (this.$route.params.selfCourseUid) {
      this.selfCourseUid = this.$route.params.selfCourseUid
    } else {
      this.selfCourseUid = localStorage.getItem('selfCourseUid')
    }
    queryPrivateDetails({
      uid: this.selfCourseUid
    }).then(res => {
      if (res.code === 200) {
        this.selfCourseData = res.data.res
        this.imgUrl = JSON.parse(res.data.res.images)
      }
    })
  },
  methods: {
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
    editInfo () {
      this.$router.push({name: 'addSelfCourse', params: {selfCourseUid: this.selfCourseUid}})
      localStorage.setItem('selfCourseUid', this.selfCourseUid)
    },
    handleClick () {}
  }
}
</script>
