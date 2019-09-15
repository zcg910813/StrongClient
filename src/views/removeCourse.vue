<template>
  <div class="appMain">
    <div class="add-store-btn">
      <el-button type="primary" @click="handleSignin">手动签到</el-button>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip">
          <el-select v-model="coach" placeholder="请选择教练" @change='coachSelect'>
            <el-option
              v-for="item in coachs"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="name"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="学员名称或手机号"
            :remote-method="remoteMethod"
            @change='selectChange'
            :loading="loading">
            <el-option
              v-for="(item, idx) in memberSignin"
              :key="idx"
              :label="item.username + (item.cellphone ? '(' + item.cellphone + ')' : '')"
              :value="item.uid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="beforeDate" size="mini">前一天</el-button>
          <el-date-picker
            v-model="date"
            type="date"
            :editable='false'
            @change='dateChange'
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-button @click="afterDate" size="mini">后一天</el-button>
      </el-form>
    </div>
    <div class="table-modal">
      <el-table
        :data='removeCourseData'
        border
        style="width: 100%">
        <el-table-column
          prop="username"
          width='100'
          label="学员姓名">
        </el-table-column>
        <el-table-column
          prop="cardName"
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="coachname"
          label="上课教练">
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="预约时间">
        </el-table-column>
        <el-table-column
          prop="totalSignNumber"
          label="扣除次数"
          >
        </el-table-column>
        <el-table-column
          label="签到时间">
          <template slot-scope="scope">
            {{scope.row.signDate ? scope.row.signDate : '-'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="singletime"
          label="课程时长(分钟)">
        </el-table-column>
        <el-table-column
          label="签退时间">
          <template slot-scope="scope">
            {{scope.row.signOkDate ? scope.row.signOkDate : '-'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width='210'
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click='signin(scope.row)' :disabled="Number(scope.row.status) >= 1 || Number(scope.row.orderStatus) === 3">签到</el-button>
            <el-button type="primary" size="mini" class="Orange" @click='signout(scope.row)' :disabled="Number(scope.row.status) >= 2 || Number(scope.row.orderStatus) === 3">签退</el-button>
            <el-button type="danger" size="mini" class="OrangeRed" @click='cancel(scope.row)' :disabled="Number(scope.row.status) >= 3 || Number(scope.row.orderStatus) === 3">取消</el-button>
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
    <CourseSingin v-if='CourseSinginShow' :OrderCoachInfo='OrderCoachInfo'></CourseSingin>
    <CourseSignOut v-if='CourseSignOutShow' :signOutData='signOutData'></CourseSignOut>
    <CancelOrder v-if='CancelOrderShow' :cancelData='cancelData'></CancelOrder>
  </div>
</template>
<script>
import {format} from 'date-fns'
import { queryOrderCoach } from '@/api/coach'
import { getCoachData } from '@/api/data'
import CourseSingin from '../components/CourseSingin'
import CourseSignOut from '../components/CourseSignOut'
import CancelOrder from '../components/CancelOrder'
import { searchDate } from '@/api/sign'
export default {
  components: {
    CourseSingin,
    CourseSignOut,
    CancelOrder
  },
  data () {
    return {
      name: '',
      number: '',
      date: '',
      CourseSinginShow: false,
      removeCourseData: [],
      coach: '',
      coachs: [],
      count: 0,
      curPage: 1,
      pageCount: 10,
      OrderCoachInfo: [],
      CourseSignOutShow: false,
      memberSignin: [],
      loading: false,
      CancelOrderShow: false
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  },
  mounted () {
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
    this.date = new Date()
    this.getQueryOrderCoach()
  },
  methods: {
    remoteMethod (query) {
      if (query !== '') {
        searchDate({search: query}).then(res => {
          this.memberSignin = []
          if (res) {
            if (res.data.res.data.suggestions.length > 0) {
              this.loading = false
              this.memberSignin = res.data.res.data.suggestions
            }
          }
        })
      } else {
        this.memberSignin = []
      }
    },
    selectChange (e) {
      if (e === null) {
        this.name = undefined
      } else {
        this.name = e
      }
      this.getQueryOrderCoach()
    },
    coachSelect (e) {
      if (e === null) {
        this.coachId = undefined
      } else {
        this.coachId = e
      }
      this.getQueryOrderCoach()
    },
    dateChange (e) {
      if (e === null) {
        this.date = format(new Date(), 'YYYY-MM-DD')
      } else {
        this.date = e
      }
      this.getQueryOrderCoach()
    },
    getQueryOrderCoach () {
      queryOrderCoach({
        curPage: this.curPage,
        pageCount: this.pageCount,
        date: format(this.date, 'YYYY-MM-DD'),
        coachId: this.coach
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data
          this.removeCourseData = data.result
          this.count = data.count
        }
      })
    },
    handleSignin () {
      this.OrderCoachInfo = ['handleSignin']
      this.CourseSinginShow = true
    },
    signin (e) {
      this.OrderCoachInfo = ['removeCourse', e.pdmemberid, e.username, e.privateId, e.cardName, e.orderCoachId, e.ordercoachname]
      this.CourseSinginShow = true
    },
    signout (e) {
      this.signOutData = e
      this.CourseSignOutShow = true
    },
    CourseSignOutCloseEvent () {
      this.CourseSignOutShow = false
    },
    cancel (e) {
      this.cancelData = e
      this.CancelOrderShow = true
    },
    CancelOrderCloseEvent () {
      this.CancelOrderShow = false
    },
    beforeDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1))
      this.getQueryOrderCoach()
    },
    afterDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1))
      this.getQueryOrderCoach()
    },
    CourseSinginCloseEvent () {
      this.CourseSinginShow = false
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
    }
  }
}
</script>
