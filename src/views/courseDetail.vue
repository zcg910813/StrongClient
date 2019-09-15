<template>
  <div class="appMain">
    <div class="self-course-detail">
      <div class="add-store-btn">
        <el-button type="primary" class="btn-width-auto" @click='editInfo'>编辑信息</el-button>
        <el-button class="btn-width-auto" @click='deleteCourseBtn'>删除课程</el-button>
      </div>
      <el-row :gutter="12" class="detail">
        <el-col :span="24">
          <el-card shadow="hover">
            <div class="info">
              <div>
                <div>
                  <img :src="selfCourseData.coverUrl" alt="">
                </div>
              </div>
              <ul class="course-info">
                <li><h3>{{selfCourseData.coursename}}</h3></li>
                <li><span>单节时长: </span><span>{{selfCourseData.coursetime}}</span></li>
                <li><span>可约人数:</span> <span>{{selfCourseData.maxcoursemember}}</span></li>
                <li><span>最少上课人数:</span> <span>{{selfCourseData.mincoursemember}}</span></li>
                <li><span>课程描述:</span> <span>{{selfCourseData.remark}}</span></li>
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
                <img :src="selfCourseData.coverUrl" alt="">
                <div class="all">
                  <h3>所有照片</h3>
                  <ul v-if='imgUrl.length > 0'>
                    <li v-for='(item, index) in imgUrl' :key='item'><img @click='showPic(index)' :src="item" alt=""></li>
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
import { queryCourseOneInfo, deleteCourse } from '@/api/course'
export default {
  components: {
    ImageView
  },
  data () {
    return {
      activeName: 'coursePicture',
      courseId: '',
      selfCourseData: [],
      show: false,
      imgUrl: [],
      bigImgUrl: []
    }
  },
  created () {
    if (this.$route.params.courseId) {
      this.courseId = this.$route.params.courseId
    } else {
      this.courseId = localStorage.getItem('courseId')
    }
    queryCourseOneInfo(this.courseId).then(res => {
      if (res.code === 200) {
        this.selfCourseData = res.data.oneCourseInfo
        this.imgUrl = res.data.oneCourseInfo.images
      }
    })
  },
  methods: {
    showPic (index) {
      queryCourseOneInfo(this.courseId).then(res => {
        this.selfCourseData = res.data.oneCourseInfo
        this.imgUrl = this.selfCourseData.images
        this.show = true
        this.bigImgUrl = []
        this.bigImgUrl.push(this.imgUrl.slice(index, index + 1)[0])
      })
    },
    editInfo () {
      this.$router.push({name: 'addCourse', params: {courseId: this.courseId}})
      localStorage.setItem('courseId', this.courseId)
    },
    deleteCourseBtn () {
      deleteCourse({courseIds: this.courseId}).then(res => {
        if (res.code === 200) {
          this.$router.push({name: 'course'})
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    },
    handleClick () {},
    hideImageView () {
      this.show = false
    }
  }
}
</script>
