<template>
  <div class="appMain">
    <div class="add-store-btn">
      <export-excel :list="list" :tHeader="tHeader" :tValue="tValue" :filename='tName'></export-excel>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip search-term">
          <el-select v-model="coach" placeholder="全部教练" @change='coachSearch' clearable>
            <el-option
              v-for="item in coachs"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-select v-model="type" placeholder="全部会课程类型" @change='typeSearch' clearable>
            <el-option
              v-for="item in types"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-date-picker
            class="start-end-input-control"
            @change='dateChange'
            v-model="date"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="-"
            :editable='false'
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <!-- <el-input placeholder="请输入会员名称或手机号" v-model="name" class="input-with-select input150">
            <el-button slot="append" icon="el-icon-search" @click='getSearchData'></el-button>
          </el-input> -->
          <el-select
            v-model="name"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入会员名称或手机号"
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
        <span @click='reset' class="screen" style='margin-left: 20px;'>清空筛选条件</span>
      </el-form>
    </div>
    <div class="amount-tip">
      <p class="member-card-total">合计节数: <span>{{total === null ? 0 : total}}</span></p>
    </div>
    <div class="table-modal">
      <el-table
        :data='removeCourseReport.slice((currentPage - 1) * pageLength, currentPage * pageLength)'
        border
        style="width: 100%">
        <el-table-column
          prop="signokdate"
          width='160'
          label='日期时间'>
        </el-table-column>
        <el-table-column
          label='上课教练'>
          <template slot-scope="scope">
            {{coachs.find((o) => o.uid === Number(scope.row.coachname)) ? coachs.find((o) => o.uid === Number(scope.row.coachname)).name : '-'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="privatename"
          label='私教课名称'>
        </el-table-column>
        <el-table-column
          prop="username"
          label='会员名称'
          >
        </el-table-column>
        <el-table-column
          prop="cellphone"
          label='会员手机'>
        </el-table-column>
        <el-table-column
          prop="signnumber"
          label='消课节数'>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, prev, pager, next, sizes" :pageLength="pageLength" :currentPage.sync="currentPage" :total="removeCourseReport.length" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
import ExportExcel from '../components/ExportExcel'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { searchDate } from '@/api/sign'
import { getCoachData } from '@/api/data'
import { getCourse } from '@/api/course'
import { getPDisCourseReport } from '@/api/finance'
export default {
  components: {
    ExportExcel
  },
  data () {
    return {
      options: [],
      removeCourseReport: [],
      coach: undefined,
      coachs: [],
      type: undefined,
      types: [],
      date: '',
      name: undefined,
      curPage: 1,
      pageCount: 1000,
      count: 0,
      total: 0,
      stime: undefined,
      etime: undefined,
      memberSignin: [],
      loading: false,
      list: [],
      tHeader: [],
      tValue: [],
      tName: '私教课销课报表',
      currentPage: 1,
      pageLength: 10
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  },
  mounted () {
    // this.date = new Date()
    this.getPDisCourseReport()
    getCourse({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.coursesInfo.allCourse
        this.types = data.map(o => { return {name: o.coursename, uid: o.uid} })
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
  },
  created () {
    let today = new Date()
    let startMonth = startOfMonth(today)
    let endMonth = endOfMonth(today)
    this.date = [format(startMonth, 'YYYY-MM-DD'), format(endMonth, 'YYYY-MM-DD')]
    this.stime = this.date[0]
    this.etime = this.date[1]
    this.getPDisCourseReport()
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
      this.getPDisCourseReport()
    },
    coachSearch (e) {
      if (e === null) {
        this.coach = undefined
      } else {
        this.coach = e
      }
      this.getPDisCourseReport()
    },
    typeSearch (e) {
      if (e === null) {
        this.type = undefined
      } else {
        this.type = e
      }
      this.getPDisCourseReport()
    },
    getPDisCourseReport () {
      getPDisCourseReport({
        curPage: this.curPage,
        pageCount: this.pageCount,
        coachid: this.coach,
        privateid: this.type,
        memberid: this.name,
        stime: this.stime,
        etime: this.etime
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.removeCourseReport = data.allInfos
          this.count = data.count
          this.total = data.total
          if (this.removeCourseReport.length > 0) {
            this.tHeader = ['日期时间', '上课教练', '私教课名称', '会员名称', '会员手机', '消课节数']
            this.tValue = ['signokdate', 'coachname', 'privatename', 'username', 'cellphone', 'signnumber']
            this.list = this.removeCourseReport
          } else {
            this.list = []
          }
        }
      })
    },
    dateChange (e) {
      if (e === null || e === 'null') {
        this.stime = undefined
        this.etime = undefined
      } else {
        this.stime = e[0]
        this.etime = e[1]
      }
      this.getPDisCourseReport()
    },
    reset () {
      this.coach = undefined
      this.type = undefined
      this.date = undefined
      this.name = undefined
      this.getPDisCourseReport()
    },
    currentChange (currentPage) {
      this.currentPage = currentPage
    },
    getSearchData () {
    },
    handleCurrentChange (curPage) {
      this.searchData.curPage = curPage
    },
    handleSizeChange (pageSize) {
      this.searchData.pageCount = pageSize
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/monyReport.styl'
</style>
