<template>
  <div class="appMain batch">
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <el-form ref="form" class="batch-course">
            <el-form-item label="场馆">
              <span>{{currentStoreInfo.storeName}}</span>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="indent"><i>*</i>教练</span>
              <el-select v-model="coach" placeholder="教练" @change="deleteMessage">
                <el-option
                  v-for="item in coachs"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="indent"><i>*</i>课程</span>
              <el-select v-model="course" placeholder="课程" @change="courseSelect">
                <el-option
                  v-for="item in courses"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label" class="indent"><i>*</i>场地选择</span>
              <el-select v-model="place" placeholder="场地选择" @change='deleteMessage'>
                <el-option
                  v-for="item in places"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="可预约人数">
              <span>{{max}}</span>
            </el-form-item>
            <el-form-item label="最少上课人数">
              <span>{{min}}</span>
            </el-form-item>
            <el-form-item label="课程时间" class="picker-time">
              <el-date-picker
                class="start-end-input-control"
                @change='byDateChange'
                v-model="date"
                type="daterange"
                range-separator="-"
                :editable='false'
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <div class="setting">
              <div class="title">设置上课周期</div>
              <div class="choice-day" v-for='(cor, idx) in courseTerms' :key='idx'>
                <el-form-item label="星期">
                  <el-checkbox-group v-model="cor.weeks" @change='weekChange(cor, idx)'>
                    <el-checkbox label="星期一"></el-checkbox>
                    <el-checkbox label="星期二"></el-checkbox>
                    <el-checkbox label="星期三"></el-checkbox>
                    <el-checkbox label="星期四"></el-checkbox>
                    <el-checkbox label="星期五"></el-checkbox>
                    <el-checkbox label="星期六"></el-checkbox>
                    <el-checkbox label="星期日"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-button type="text" v-if='idx !== 0' class="button-text" @click='deleteCourseTerm(idx)'>删除</el-button>
                <el-form-item label="可预约时间">
                  <el-time-select
                    @input="deleteMessage"
                    placeholder="起始时间"
                    :editable='false'
                    v-model="cor.beginTime"
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '24:00'
                    }">
                  </el-time-select>
                  <el-time-select
                    @input="deleteMessage"
                    placeholder="结束时间"
                    v-model="cor.endTime"
                    :editable='false'
                    :picker-options="{
                      start: '00:00',
                      step: '00:30',
                      end: '24:00',
                      minTime: cor.beginTime
                    }">
                  </el-time-select>
                </el-form-item>
                <p style="color: #f40; font-size: 12px;margin-top 5px;">
                  说明：可预约时间段为  {{cor.weeks.join('、')}}  的 {{(cor.beginTime ? cor.beginTime : '--') + '-' + (cor.endTime ? cor.endTime : '--')}}
                </p>
              </div>
              <el-button type="text" @click='addCourseTerm' class="button-text">+增加课程周期</el-button>
            </div>
            <div class="setting">
              <div class="title">开放预约时间</div>
              <el-form-item>
                <el-checkbox v-model="open">立即开放预约</el-checkbox>
              </el-form-item>
            </div>
            <div class="setting">
              <div class="title">开放预约卡种</div>
              <el-form-item label="temp" v-if='orderLimitData.length > 0' class='batch-cardtype'>
                <span slot="label" class="indent"><i>*</i></span>
                <el-checkbox-group v-model="orderLimit" @change='checkboxChange'>
                  <el-checkbox v-for="item in orderLimitData" :label="item.uid" :key="item.uid" :value='item.uid' @change='limitChange'>{{item.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <span v-else class="no-card-message">请先添加会员卡</span>
            </div>
          </el-form>
          <div class="tipMessage tip-color">{{tipMessage}}</div>
          <div class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确定</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { addGroupLesson } from '@/api/grouplesson'
import { getPlaceList } from '@/api/place'
import { getCoachData } from '@/api/data'
import { getCourse } from '@/api/course'
import { getMemberCard } from '@/api/vipcard'
import { fetchVenue } from '@/api/venue'
export default {
  data () {
    return {
      start: '',
      end: '',
      open: true,
      place: '',
      places: [],
      coach: '',
      coachs: [],
      course: '',
      courses: [],
      tipMessage: '',
      outDateStart: false,
      outDateEnd: false,
      pickerBeginDateBefore: {
        disabledDate: (time) => {
          let beginDateVal = this.start
          if (beginDateVal) {
            return time.getTime() < beginDateVal
          }
        }
      },
      pickerBeginDateAfter: {
        disabledDate: (time) => {
          let beginDateVal = this.end
          if (beginDateVal) {
            return time.getTime() > beginDateVal
          }
        }
      },
      currentStoreInfo: [],
      courseTerms: [
        {
          weeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
        }
      ],
      orderLimit: [],
      orderLimitData: [],
      allCourseInfo: [],
      date: '',
      max: 0,
      min: 0,
      beginTime: '',
      endTime: '',
      disabled: false,
      newWeeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    }
  },
  computed: {
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    getMemberCard().then(res => {
      if (res.code === 200) {
        let data = res.data.res.allCards
        this.orderLimitData = data.map(item => { return {name: item.cardname, uid: item.uid} })
      }
    })
    fetchVenue().then(res => {
      let cur = res.data.res.allStores.filter((o) => { return o.storeID === localStorage.getItem('storeid') })
      this.currentStoreInfo = cur[0]
    })
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
  },
  methods: {
    weekChange (e, index) {
      this.tipMessage = ''
      let weeks = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
      let newWeeks = []
      for (let i in weeks) {
        for (let j in e.weeks) {
          if (weeks[i] === e.weeks[j]) {
            newWeeks.push(e.weeks[j])
          }
        }
      }
      this.courseTerms[index].weeks = newWeeks
    },
    checkboxChange (e) {
      this.tipMessage = ''
      this.disabled = false
    },
    byDateChange (t) {
      this.tipMessage = ''
      this.disabled = false
      this.start = t[0]
      this.end = t[1]
    },
    focus () {
      this.tipMessage = ''
    },
    limitChange () {},
    courseSelect () {
      this.tipMessage = ''
      this.disabled = false
      let currentCourseInfo = this.allCourseInfo.filter(o => { return o.uid === this.course })
      this.max = currentCourseInfo[0].maxcoursemember
      this.min = currentCourseInfo[0].mincoursemember
    },
    cancel () {
      this.$router.push({name: 'course'})
    },
    addCourseTerm () {
      this.courseTerms.push({weeks: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']})
    },
    deleteCourseTerm (i) {
      this.tipMessage = ''
      this.courseTerms.splice(i, 1)
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
      if (!this.place) {
        this.tipControl('请选择场地')
      } else if (!this.coach) {
        this.tipControl('请选择教练')
      } else if (!this.course) {
        this.tipControl('请选择课程')
      } else if (!this.date) {
        this.tipControl('请选择课程时间')
      } else if (this.courseTerms[0].weeks.length === 0) {
        this.tipControl('请选择星期')
      } else if (!this.courseTerms[0].beginTime) {
        this.tipControl('请选择课程预约开始时间')
      } else if (!this.courseTerms[0].endTime) {
        this.tipControl('请选择课程预约结束时间')
      } else if (this.orderLimitData.length === 0) {
        this.tipControl('请先添加会员卡')
      } else if (this.orderLimit.length === 0) {
        this.tipControl('请选择可预约卡种')
      } else {
        let dates = this.courseTerms
        let w = dates.map(o => { return o.weeks })
        for (let i = 0; i < w.length; i++) {
          for (let j = 0; j < w[i].length; j++) {
            let temp = w[i][j]
            if (temp === '星期一') {
              w[i][j] = 1
            }
            if (temp === '星期二') {
              w[i][j] = 2
            }
            if (temp === '星期三') {
              w[i][j] = 3
            }
            if (temp === '星期四') {
              w[i][j] = 4
            }
            if (temp === '星期五') {
              w[i][j] = 5
            }
            if (temp === '星期六') {
              w[i][j] = 6
            }
            if (temp === '星期日') {
              w[i][j] = 0
            }
          }
        }
        addGroupLesson({
          courseId: this.course,
          coachId: this.coach,
          roomId: this.place,
          allowCards: this.orderLimit,
          minNum: this.min,
          maxNum: this.max,
          beginDate: this.start,
          endDate: this.end,
          dates: dates
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.$router.push({name: 'course'})
            this.$message({
              type: 'success',
              message: '添加排课成功'
            })
          } else {
            this.disabled = true
            this.tipControl(res.errMsg)
            let dates = this.courseTerms
            let w = dates.map(o => { return o.weeks })
            for (let i = 0; i < w.length; i++) {
              for (let j = 0; j < w[i].length; j++) {
                let temp = w[i][j]
                if (temp === 1) {
                  w[i][j] = '星期一'
                }
                if (temp === 2) {
                  w[i][j] = '星期二'
                }
                if (temp === 3) {
                  w[i][j] = '星期三'
                }
                if (temp === 4) {
                  w[i][j] = '星期四'
                }
                if (temp === 5) {
                  w[i][j] = '星期五'
                }
                if (temp === 6) {
                  w[i][j] = '星期六'
                }
                if (temp === 0) {
                  w[i][j] = '星期日'
                }
              }
            }
          }
        })
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../assets/css/course.styl'
</style>
