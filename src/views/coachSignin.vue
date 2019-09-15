<template>
  <div class="appMain">
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip">
          <el-select v-model="coach" placeholder="请选择教练" @change='byCoachSearch' clearable>
            <el-option
              v-for="item in coachs"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="screen-term">
          <el-button @click="beforeDate" size="mini">前一天</el-button>
          <el-date-picker
            @change='byDateSearch'
            v-model="date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-button @click="afterDate" size="mini">后一天</el-button>
      </el-form>
    </div>
    <div class="table-modal">
      <el-table
        :data='coachData'
        border
        style="width: 100%">
        <el-table-column
          prop="courseName"
          width='85'
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="courseDate"
          label="上课时间">
        </el-table-column>
        <el-table-column
          prop="coachName"
          label="教练名称">
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          label="预约人数"
          >
        </el-table-column>
        <el-table-column
          prop="currentNumber"
          label="实到人数">
        </el-table-column>
        <el-table-column
          width='200px'
          label="签到时间">
          <template slot-scope="scope">
            {{scope.row.signDate ? scope.row.signDate : '-'}}
          </template>
        </el-table-column>
        <el-table-column
          width='200px'
          label="签退时间">
          <template slot-scope="scope">
            {{scope.row.signOkDate ? scope.row.signOkDate : '-'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          label="操作"
          width='210'
          class-name="operate">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" class="DoderBlue" @click="signin(scope.row)" :disabled="scope.row.status >= 1">签到</el-button>
              <el-button type="primary" size="mini" class="Orange" @click="signout(scope.row)" :disabled="scope.row.status >= 2">签退</el-button>
              <!-- <el-button type="danger" size="mini" class="OrangeRed" @click='cancel(scope.row)'>取消</el-button> -->
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
    <coachSignin v-if='coachSigninShow' :signInData='signInData'></coachSignin>
  </div>
</template>
<script>
import { format } from 'date-fns'
import { getCoachData } from '@/api/data'
import { queryLeague, signLeague } from '@/api/grouplesson'
import coachSignin from '../components/coachSignin'
export default {
  components: {
    coachSignin
  },
  data () {
    return {
      name: undefined,
      number: '',
      date: '',
      coachSigninShow: false,
      coachData: [],
      coach: undefined,
      coachs: [],
      curPage: 1,
      pageCount: 10,
      count: 0
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  mounted () {
    this.getGroupLessonQuery()
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
    this.getGroupLessonQuery()
  },
  methods: {
    byCoachSearch (e) {
      if (e === null) {
        this.coach = undefined
      } else {
        this.coach = e
      }
      this.getGroupLessonQuery()
    },
    byDateSearch (e) {
      if (e === null) {
        this.date = format(new Date(), 'YYYY-MM-DD')
      } else {
        this.date = e
      }
      this.getGroupLessonQuery()
    },
    getGroupLessonQuery () {
      queryLeague({
        curPage: this.curPage,
        pageCount: this.pageCount,
        date: format(this.date, 'YYYY-MM-DD'),
        coachId: this.coach,
        weekdate: format(this.date, 'YYYY-MM-DD')
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data
          this.coachData = data.result
          this.count = data.count
        }
      })
    },
    signin (e) {
      this.signInData = e
      this.coachSigninShow = true
    },
    coachSigninCloseEvent () {
      this.coachSigninShow = false
    },
    beforeDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1))
      this.getGroupLessonQuery()
    },
    afterDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1))
      this.getGroupLessonQuery()
    },
    signout (e) {
      this.$confirm(`确认团课已经完成，需要进行签退操作`, '签退确认', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        signLeague({
          id: e.id,
          currentNumber: e.currentNumber
        }).then(res => {
          if (res.code === 200) {
            this.getGroupLessonQuery()
          }
        })
      }).catch(() => {
      })
    },
    // cancel () {},
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getGroupLessonQuery()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getGroupLessonQuery()
    }
  }
}
</script>
