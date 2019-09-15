<template>
  <div>
    <div class="add-store-btn">
      <el-button type="primary" class="btn-width-auto" @click='BatchCourse'>批量排课</el-button>
      <el-button class="btn-width-auto" @click='copyCourse'>复制排课</el-button>
      <el-button class="btn-width-auto" disabled>打印课表</el-button>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件:" class="search-term search-tip">
          <el-select v-model="coach" placeholder="请选择教练" @change="coachSearch" clearable>
            <el-option
              v-for="item in coachs"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="arrange-course">
      <div class="change-week">
        <span @click='prevWeek'>上一周</span>
        <h3>{{currentYear + '-' + currentMonth}}</h3>
        <span @click='nextWeek'>下一周</span>
      </div>
      <el-row >
        <el-col class="list_title" :span='4' v-for="item in courseList" :key="item.id" :style='{color: item.textColor}'>
          <span class="week" :style='{color: item.textColor}'>{{item.week}}</span>
          <div class="line-box">
            <h3 class="day" :style="{background: item.bgColor}">{{item.day | format}}</h3>
            <ul>
              <li class="list_course" v-for="curs in item.courseDetail" :key="curs.id"  :style="{background: item.bgColor}">
                <ul @click='HandleCourseDetail(curs)'>
                  <span class='circle'></span>
                  <li><span>{{curs.beginTime}}</span><span>{{curs.courseName}}</span></li>
                  <li><span>{{curs.coachName}}</span><span>{{curs.roomName}}</span></li>
                </ul>
              </li>
            </ul>
            <el-button ghost class="el-button" @click='addSingleCourse(item)'>添加排课</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
    <addSingleCourse v-if='addSingleCourseShow' :addCourseData='addCourseData' :currentStoreInfo='currentStoreInfo'></addSingleCourse>
    <CopyClass v-if='CopyClassShow' :courseList='courseList'></CopyClass>
  </div>
</template>
<script>
import { format } from 'date-fns'
import CopyClass from '@/components/CopyClass'
import { getCoachData } from '@/api/data'
// import { queryStore } from '@/api/vipcard'
import { fetchAllVenue } from '@/api/venue'
import addSingleCourse from '../AddSingleCourse'
import { queryLeagueHandle } from '@/async/grouplesson'
Date.prototype.format = function (fmt) { // eslint-disable-line
  var o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}
export default {
  components: {
    addSingleCourse,
    CopyClass
  },
  data () {
    return {
      coach: '',
      coachs: [],
      courseList: [
        {
          index: 1,
          week: '周一',
          day: '10-08',
          textColor: '#86becc',
          bgColor: '#effcff',
          courseDetail: []
        },
        {
          index: 2,
          week: '周二',
          day: '10-08',
          textColor: '#ceaa71',
          bgColor: '#fef7ec',
          courseDetail: []
        },
        {
          index: 3,
          week: '周三',
          day: '10-08',
          textColor: '#db8d8d',
          bgColor: '#feecec',
          courseDetail: []
        },
        {
          index: 4,
          week: '周四',
          day: '10-08',
          textColor: '#8098c3',
          bgColor: '#eff4fd',
          courseDetail: []
        },
        {
          index: 5,
          week: '周五',
          day: '10-08',
          textColor: '#ceaa71',
          bgColor: '#fef7ec',
          courseDetail: []
        },
        {
          index: 6,
          week: '周六',
          day: '10-08',
          textColor: '#86becc',
          bgColor: '#effcff',
          courseDetail: []
        },
        {
          index: 0,
          week: '周日',
          day: '10-08',
          textColor: '#8098c3',
          bgColor: '#eff4fd',
          courseDetail: []
        }
      ],
      currentYear: '',
      currentMonth: '',
      addSingleCourseShow: false,
      dayParam: '',
      currentFirstDate: '',
      currentStoreInfo: [],
      curPage: 1,
      pageCount: 10000,
      allLessons: [],
      courseDetailShow: false,
      CopyClassShow: false,
      currentDate: '',
      today: ''
    }
  },
  mounted () {
    this.getTime()
    fetchAllVenue().then(res => {
      this.$store.commit('setLoading', false)
      let cur = res.data.res.allStores.filter((o) => { return o.storeID === localStorage.getItem('storeid') })
      this.currentStoreInfo = cur[0]
    })
    getCoachData({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        this.coachs = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
  },
  created () {
    this.today = new Date()
    this.today = format(this.today, 'YYYY-MM-DD')
    this.getAllTheClasses()
    this.setDate(new Date())
  },
  methods: {
    coachSearch (e) {
      if (e === null) {
        this.coach = undefined
      } else {
        this.coach = e
      }
      this.getAllTheClasses()
    },
    getAllTheClasses () {
      this.today = new Date()
      this.today = format(this.today, 'YYYY-MM-DD')
      queryLeagueHandle({
        // date: this.today,
        count: 10000,
        coachId: this.coach,
        weekdate: format(this.today, 'YYYY-MM-DD')
      }).then(res => {
        if (res.code === 200) {
          for (let j = 0; j < this.courseList.length; ++j) {
            this.courseList[j].courseDetail = []
          }
          let info = res.data.result
          for (let i = 0; i < info.length; ++i) {
            let weekid = this.dayChangeWeek(info[i].courseDate)
            for (let j = 0; j < this.courseList.length; ++j) {
              if (weekid === this.courseList[j].index) {
                this.courseList[j].courseDetail.push(info[i])
              }
            }
          }
        }
      })
    },
    copyCourse () {
      this.CopyClassShow = true
    },
    CopyClassCloseEvent () {
      this.CopyClassShow = false
    },
    getTime () {
      let date = new Date()
      let week = date.getDay()
      let minus = week ? week - 1 : 6
      date.setDate(date.getDate() - minus)
      for (let i = 0; i < 7; ++i) {
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        let d = date.getDate()
        let weekDay = y + '-' + m + '-' + d
        this.currentYear = new Date(weekDay).format('yyyy')
        this.currentMonth = new Date(weekDay).format('MM')
        weekDay = new Date(weekDay).format('yyyy-MM-dd')
        let weekindex = date.getDay()
        for (let index = 0; index < this.courseList.length; ++index) {
          if (weekindex === this.courseList[index].index) {
            this.courseList[index].day = weekDay
          }
        }
        date.setDate(date.getDate() + 1)
      }
    },
    setDate (date) {
      var week = date.getDay()
      date = this.addDate(date, week * -1)
      this.currentFirstDate = new Date(date)
      for (var i = 0; i < this.courseList.length; i++) {
        let d = this.addDate(date, 1)
        d = new Date(d).format('yyyy-MM-dd')
        if (i === 0) {
          this.courseList[i].day = date.format('yyyy-MM-dd')
          this.today = this.courseList[i].day
          this.currentMonth = new Date(d).format('MM')
        } else {
          this.courseList[i].day = d
        }
      }
    },
    prevWeek () {
      this.setDate(this.addDate(this.currentFirstDate, -7))
      queryLeagueHandle({
        count: 10000,
        coachId: this.coach,
        weekdate: this.today
      }).then(res => {
        if (res.code === 200) {
          for (let j = 0; j < this.courseList.length; ++j) {
            this.courseList[j].courseDetail = []
          }
          let info = res.data.result
          for (let i = 0; i < info.length; ++i) {
            let weekid = this.dayChangeWeek(info[i].courseDate)
            for (let j = 0; j < this.courseList.length; ++j) {
              if (weekid === this.courseList[j].index) {
                this.courseList[j].courseDetail.push(info[i])
              }
            }
          }
        }
      })
    },
    nextWeek () {
      this.setDate(this.addDate(this.currentFirstDate, 7))
      queryLeagueHandle({
        count: 10000,
        coachId: this.coach,
        weekdate: this.today
      }).then(res => {
        if (res.code === 200) {
          for (let j = 0; j < this.courseList.length; ++j) {
            this.courseList[j].courseDetail = []
          }
          let info = res.data.result
          for (let i = 0; i < info.length; ++i) {
            let weekid = this.dayChangeWeek(info[i].courseDate)
            for (let j = 0; j < this.courseList.length; ++j) {
              if (weekid === this.courseList[j].index) {
                this.courseList[j].courseDetail.push(info[i])
              }
            }
          }
        }
      })
    },
    addDate (date, n) {
      date.setDate(date.getDate() + n)
      return date
    },
    queryCurrentDate () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let strDate = year + '-' + month + '-' + day
      this.queryLeagueHandle(strDate)
    },
    dayChangeWeek (strdate) {
      let date = new Date(strdate)
      let week = date.getDay()
      return week
    },
    HandleCourseDetail (ev) {
      this.$router.push({name: 'classSchedule', params: {courseDetail: ev, currentStoreInfo: this.currentStoreInfo}})
      localStorage.setItem('courseDetail', ev)
      localStorage.setItem('currentStoreInfo', this.currentStoreInfo)
    },
    courseCopyOneHandle (item) {
      this.copyDailog = true
      this.copyDetail.sourceDate = item.courseDate
    },

    courseLotdelHandle (item) {
      // console.log(item)
    },
    addSingleCourse (e) {
      this.addCourseData = e
      this.addSingleCourseShow = true
    },
    addSingleCourseCloseEvent () {
      this.addSingleCourseShow = false
    },
    BatchCourse () {
      this.$router.push({name: 'batchCourse'})
    }
  },
  filters: {
    format (time) {
      if (time === '' || time === undefined) return ''
      return String(time).substr(8)
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../assets/css/course.styl'
</style>
