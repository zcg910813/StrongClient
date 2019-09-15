<template>
  <div id="dialog">
    <el-dialog title="团课排课" :visible.sync="dialogForm" width="450" center @closed='closed'>
      <div class='membercard'>
        <el-form label-width="110px" class='member-card'>
          <el-form-item label="场馆">
            <span>{{currentStoreInfo.storeName}}</span>
          </el-form-item>
          <el-form-item label="temp">
            <span slot="label" class="indent"><i>*</i>场地选择</span>
            <el-select v-model="place" placeholder="请选择" @change='deleteMessage'>
              <el-option
                v-for="item in places"
                :key="item.uid"
                :label="item.name"
                :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="temp">
            <span slot="label" class="indent"><i>*</i>教练</span>
            <el-select v-model="coachType" placeholder="请选择" @change='deleteMessage'>
              <el-option
                v-for="item in coachTypes"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="temp">
            <span slot="label" class="indent"><i>*</i>课程</span>
            <el-select v-model="course" placeholder="请选择" @change='courseChange'>
              <el-option
                v-for="item in courses"
                :key="item.uid"
                :label="item.name"
                :value="item.uid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="temp" class="time-control">
            <span slot="label" class="indent"><i>*</i>上课时间</span>
            <el-time-select
              placeholder="起始时间"
              @input="deleteMessage"
              v-model="startTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00'
              }">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              @input="deleteMessage"
              v-model="endTime"
              :picker-options="{
                start: '00:00',
                step: '00:30',
                end: '24:00',
                minTime: startTime
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item label="可预约人数">
            <span>{{maxMember}}人</span>
          </el-form-item>
          <el-form-item label="最少上课人数">
            <span>{{minMember}}人</span>
          </el-form-item>
          <el-form-item label="课程时间">
            <span>{{addCourseData.day}}</span>
          </el-form-item>
          <el-form-item label="课程时间">
            <el-checkbox v-model="timeSelect">立即开放预约</el-checkbox>
          </el-form-item>
          <el-form-item label="temp">
            <span slot="label" class="indent"><i>*</i>预约限制</span>
            <el-checkbox-group v-model="orderLimit" @change="deleteMessage">
              <el-checkbox v-for="item in orderLimitData" :label="item.uid" :key="item.uid" :value='item.uid' @change='limitChange'>{{item.name}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="tipMessage tip-color" style="text-indent: 30px">{{tipMessage}}</div>
        <div class="dialog-footer">
          <el-button @click="dialogForm = false">取消</el-button>
          <el-button type="primary" @click="confirm" :disabled="disabled">确定</el-button>
        </div>
      </div>
  </el-dialog>
  </div>
</template>
<script>
import { addDays, format } from 'date-fns'
import { getMemberCard } from '@/api/vipcard'
import { getCourse } from '@/api/course'
import { getCoachData } from '@/api/data'
import { getPlaceList } from '@/api/place'
import { addGroupLesson } from '@/api/grouplesson'
export default {
  props: ['currentStoreInfo', 'addCourseData'],
  data () {
    return {
      dialogForm: true,
      tipMessage: '',
      timeSelect: true,
      place: '',
      places: [],
      coachType: '',
      coachTypes: [],
      course: '',
      courses: [],
      orderLimit: [],
      orderLimitData: [],
      startTime: '',
      endTime: '',
      courseInfo: [],
      endDate: '',
      maxMember: 0,
      minMember: 0,
      disabled: false
    }
  },
  mounted () {
    getPlaceList({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.res.allRoomInfo
        for (let v of data) {
          this.places.push({name: v.name, uid: v.uid})
        }
      }
    })
    getCoachData({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        for (let v of res.data.coachs) {
          this.coachTypes.push({name: v.name + ' ' + '(' + v.cellphone + ')', id: v.id})
        }
      }
    })
    getCourse({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.coursesInfo.allCourse
        this.courseInfo = data
        for (let q of data) {
          this.courses.push({name: q.coursename, uid: q.uid})
        }
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
    limitChange () {
    },
    courseChange (e) {
      this.tipMessage = ''
      this.disabled = false
      let currentCourseData = this.courseInfo.filter((o) => { return o.uid === e })
      this.maxMember = currentCourseData[0].maxcoursemember
      this.minMember = currentCourseData[0].mincoursemember
      this.endDate = format(addDays(this.addCourseData.day, currentCourseData[0].coursetime), 'YYYY-MM-DD')
    },
    confirm () {
      this.disabled = true
      if (!this.place) {
        this.tipControl('请选择场地')
      } else if (!this.coachType) {
        this.tipControl('请选择教练')
      } else if (!this.course) {
        this.tipControl('请选择课程')
      } else if (!this.startTime) {
        this.tipControl('请输入可预约起始时间')
      } else if (!this.endTime) {
        this.tipControl('请输入可预约结束时间')
      } else if (this.orderLimit.length === 0) {
        this.tipControl('请选择预约限制')
      } else {
        let week = []
        week.push(this.addCourseData.week)
        if (week[0] === '周一') {
          week[0] = [1]
        }
        if (week[0] === '周二') {
          week[0] = [2]
        }
        if (week[0] === '周三') {
          week[0] = [3]
        }
        if (week[0] === '周四') {
          week[0] = [4]
        }
        if (week[0] === '周五') {
          week[0] = [5]
        }
        if (week[0] === '周六') {
          week[0] = [6]
        }
        if (week[0] === '周日') {
          week[0] = [0]
        }
        addGroupLesson({
          courseId: this.course,
          coachId: this.coachType,
          roomId: this.place,
          allowCards: this.orderLimit,
          minNum: this.minMember,
          maxNum: this.maxMember,
          beginDate: this.addCourseData.day,
          endDate: this.addCourseData.day,
          dates: [{
            beginTime: this.startTime,
            endTime: this.endTime,
            weeks: week[0]
          }]
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.dialogForm = false
            this.$message({
              type: 'success',
              message: '排课成功'
            })
            this.$parent.getAllTheClasses()
          } else {
            this.tipControl(res.errMsg)
          }
        })
      }
    },
    handleChange (val) {
    },
    closed () {
      this.$parent.addSingleCourseCloseEvent()
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
      this.disabled = false
    }
  }
}
</script>
