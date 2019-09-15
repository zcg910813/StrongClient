<template>
  <div class="appMain">
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip">
          <el-select v-model="coach" placeholder="请选择教练" @change="coachSearch" clearable>
            <el-option
              v-for="item in coachs"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-select v-model="place" placeholder="请选择场地" style="margin: 0 20px;" @change="placeSearch" clearable>
            <el-option
              v-for="item in places"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-form-item>
            <el-button @click="beforeDate" size="mini">前一天</el-button>
            <el-date-picker
              @change=dateChange
              v-model="date"
              type="date"
              :editable='false'
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
            <el-button @click="afterDate" size="mini">后一天</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-modal">
      <el-table
        :data='orderCourseData'
        border
        style="width: 100%">
        <el-table-column
          prop="courseName"
          width='100'
          label="课程名称">
        </el-table-column>
        <el-table-column
          label="教练">
          <template slot-scope="scope">
            {{scope.row.coachName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="roomName"
          label="场地">
        </el-table-column>
        <el-table-column
          prop="beginTime"
          label="上课时间"
          >
        </el-table-column>
        <el-table-column
          prop="maxNum"
          label="可预约人数">
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          label="已预约人数">
        </el-table-column>
        <el-table-column
          label="操作"
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click='courseOrder(scope.row)'>预约</el-button>
            <el-button type="primary" size="mini" class="Orange" @click='viewAppointment(scope.row)'>查看预约列表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :total="count"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next, sizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        >
      </el-pagination>
    </div>
    <CourseOrder v-if='CourseOrderShow' :courseOrderData='courseOrderData'></CourseOrder>
  </div>
</template>
<script>
import { format } from 'date-fns'
import { queryLeague } from '@/api/grouplesson'
import { getPlaceList } from '@/api/place'
import { getCoachData } from '@/api/data'
import CourseOrder from '../components/CourseOrder'
export default {
  components: {
    CourseOrder
  },
  data () {
    return {
      name: '',
      number: '',
      date: '',
      CourseOrderShow: false,
      orderCourseData: [],
      coach: undefined,
      coachs: [],
      place: undefined,
      places: [],
      curPage: 1,
      pageCount: 10,
      count: 0,
      coachList: []
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  mounted () {
  },
  created () {
    this.date = new Date()
    this.getgrouplessonquery()
    getCoachData({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        this.coachList = res.data.coachs
        this.coachs = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
    getPlaceList({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.res.allRoomInfo
        this.places = data.map(o => { return {name: o.name, uid: o.uid} })
      }
    })
  },
  methods: {
    coachSearch (e) {
      if (e === null) {
        this.coach = undefined
      } else {
        this.coach = e
      }
      this.getgrouplessonquery()
    },
    placeSearch (e) {
      if (e === null) {
        this.place = undefined
      } else {
        this.place = e
      }
      this.getgrouplessonquery()
    },
    dateChange (e) {
      if (e === null) {
        this.date = format(new Date(), 'YYYY-MM-DD')
      } else {
        this.date = e
      }
      this.getgrouplessonquery()
    },
    getgrouplessonquery () {
      queryLeague({
        curPage: this.curPage,
        pageCount: this.pageCount,
        date: format(this.date, 'YYYY-MM-DD'),
        coachId: this.coach,
        roomId: this.place,
        weekdate: format(this.date, 'YYYY-MM-DD')
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data
          this.orderCourseData = data.result
          this.count = data.count
        }
      })
    },
    courseOrder (e) {
      this.courseOrderData = e
      this.CourseOrderShow = true
    },
    CourseOrderCloseEvent () {
      this.CourseOrderShow = false
    },
    viewAppointment (e) {
      this.$router.push({name: 'viewAppointment', params: {viewADataId: e.id}})
      localStorage.setItem('viewADataId', e.id)
    },
    beforeDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1))
      this.getgrouplessonquery()
    },
    afterDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1))
      this.getgrouplessonquery()
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getgrouplessonquery()
    },
    handleSizeChange (pageCount) {
      this.pageCount = pageCount
      this.getgrouplessonquery()
    }
  }
}
</script>
