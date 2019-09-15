<template>
  <div class="class-schedule">
    <div class="detail">
      <el-row :gutter="12">
        <el-col :span="24">
          <div class="add-store-btn control-btn">
            <el-button type="primary" class="btn-width-auto" @click='editCourse' v-if='DetailsShow'>修改</el-button>
            <el-button type="primary" class="btn-width-auto" @click='confirm' v-else>保存</el-button>
            <el-button class="btn-width-auto" @click='deleteCourse'>删除</el-button>
          </div>
          <el-card shadow="hover">
            <ul>
              <li><span>场馆名称</span><span>{{currentStoreInfo.storeName}}</span></li>
              <li><span>可用场地</span>
                <span v-if='DetailsShow'>{{courseInfo.roomName}}</span>
                <el-select v-model="place" placeholder="场地选择" @change='deleteMessage' v-else>
                  <el-option
                    v-for="item in places"
                    :key="item.uid"
                    :label="item.name"
                    :value="item.uid">
                  </el-option>
                </el-select>
              </li>
              <li><span>教<i style="margin: 0 14px"></i>练</span>
                <span v-if='DetailsShow'>{{courseInfo.coachName}}</span>
                <el-select v-model="coach" placeholder="教练" @change="deleteMessage" v-else>
                  <el-option
                    v-for="item in coachs"
                    :key="item.uid"
                    :label="item.name"
                    :value="item.uid">
                  </el-option>
                </el-select>
              </li>
              <li><span>课<i style="margin: 0 6px; font-style: normal;">程</i>名</span>
                <span v-if='DetailsShow'>{{courseInfo.courseName}}</span>
                <el-select v-model="course" placeholder="课程" @change="deleteMessage" v-else>
                  <el-option
                    v-for="item in courses"
                    :key="item.uid"
                    :label="item.name"
                    :value="item.uid">
                  </el-option>
                </el-select>
              </li>
              <li><span>课程日期</span><span>{{courseInfo.courseDate}}</span></li>
              <li><span>可预约时间</span>
                <span v-if='DetailsShow'>{{courseInfo.beginTime + '-' + courseInfo.endTime}}</span>
                <span v-else>
                  <el-time-select
                    @change="deleteMessage"
                    placeholder="起始时间"
                    v-model="startTime"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '24:00'
                    }">
                  </el-time-select>
                  <el-time-select
                    @change="deleteMessage"
                    placeholder="结束时间"
                    v-model="endTime"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '24:00',
                      minTime: startTime
                    }">
                  </el-time-select>
                </span>
              </li>
              <li><span>开放预约时间</span><span>立即开放预约</span></li>
              <li><span>开放预约卡种</span>
                <span v-if='DetailsShow'>
                  <span v-for='(Q, idx) in orderLimitData' :key='idx'>{{idx !== orderLimitData.length - 1 ? Q.name + '、' : Q.name}}</span>
                </span>
                <span v-else class="member-card">
                  <el-checkbox-group v-model="orderLimit" @change='deleteMessage'>
                    <el-checkbox v-for="item in orderLimitData" :label="item.uid" :key="item.uid" :value='item.uid'>{{item.name}}</el-checkbox>
                  </el-checkbox-group>
                </span>
              </li>
              <div class="tipMessage tip-color">{{tipMessage}}</div>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getPlaceList } from '@/api/place'
import { getCoachData } from '@/api/data'
import { getCourse } from '@/api/course'
import { getMemberCard } from '@/api/vipcard'
import { updateLeagueHandle, deleteLeagueHandle } from '@/async/grouplesson'
export default {
  data () {
    return {
      courseInfo: {},
      currentStoreInfo: [],
      DetailsShow: true,
      place: '',
      places: [],
      coach: '',
      coachs: [],
      course: '',
      courses: [],
      startTime: '',
      endTime: '',
      tipMessage: '',
      orderLimit: [],
      orderLimitData: []
    }
  },
  created () {
    if (this.$route.params.courseDetail) {
      this.courseInfo = this.$route.params.courseDetail
    } else {
      this.courseInfo = localStorage.getItem('courseDetail')
    }
    if (this.$route.params.currentStoreInfo) {
      this.currentStoreInfo = this.$route.params.currentStoreInfo
    } else {
      this.currentStoreInfo = localStorage.getItem('currentStoreInfo')
    }
    this.place = this.courseInfo.roomName
    this.coach = this.courseInfo.coachName
    this.course = this.courseInfo.courseName
    this.startTime = this.courseInfo.beginTime
    this.endTime = this.courseInfo.endTime
    this.coachId = this.courseInfo.coachId
    this.courseId = this.courseInfo.courseId
    getPlaceList({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        this.$store.commit('setLoading', false)
        let data = res.data.res.allRoomInfo
        this.places = data.map(o => { return {name: o.name, uid: o.uid} })
      }
    })
    getCoachData({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        this.coachs = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
    getCourse({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.coursesInfo.allCourse
        this.allCourseInfo = data
        this.courses = data.map(o => { return {name: o.coursename, uid: o.uid} })
      }
    })
    getMemberCard().then(res => {
      if (res.code === 200) {
        let data = res.data.res.allCards
        this.orderLimitData = data.map(item => { return {name: item.cardname, uid: item.uid} })
      }
    })
  },
  methods: {
    editCourse () {
      this.DetailsShow = false
    },
    confirm () {
      if (!this.place) {
        this.tipControl('请选择可用场地')
      } else if (!this.coach) {
        this.tipControl('请选择教练')
      } else if (!this.course) {
        this.tipControl('请选择课程')
      } else if (!this.startTime) {
        this.tipControl('请选择可预约开始时间')
      } else if (!this.endTime) {
        this.tipControl('请选择可预约结束时间')
      } else if (this.orderLimitData.length === 0) {
        this.tipControl('请先添加会员卡')
      } else if (this.orderLimit.length === 0) {
        this.tipControl('请选择可预约卡种')
      } else {
        updateLeagueHandle({
          id: this.courseInfo.id,
          courseId: this.course === this.courseInfo.courseName ? this.courseId : this.course,
          courseDate: this.courseInfo.courseDate,
          beginTime: this.startTime,
          endTime: this.endTime,
          coachId: this.coach === this.courseInfo.coachName ? this.coachId : this.coach,
          roomId: this.courseInfo.roomId,
          minNum: this.courseInfo.minNum,
          maxNum: this.courseInfo.maxNum,
          allowCards: this.orderLimit
        }).then(res => {
          if (res.code === 200) {
            this.$router.push({name: 'course'})
            this.$message({
              type: 'success',
              message: '修改成功'
            })
          }
        })
      }
    },
    deleteCourse () {
      deleteLeagueHandle(this.courseInfo.id).then(res => {
        if (res.code === 200) {
          this.$router.push({name: 'course'})
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        }
      })
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../assets/css/course.styl'
</style>
