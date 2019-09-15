<template>
  <div class="appMain">
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip">
          <el-select v-model="coach" placeholder="请选择上课教练" clearable @change='coachChange'>
            <el-option
              v-for="item in coachs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
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
            placeholder="搜索会员名称或手机号"
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
      </el-form>
    </div>
    <div class="table-modal">
      <el-table
        :data='removeCourseData'
        border
        style="width: 100%">
        <el-table-column
          width='100'
          label="私教课名称">
          <template slot-scope="scope">
            {{scope.row.privates.privatename}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="购买日期">
        </el-table-column>
        <el-table-column
          prop="curbuy"
          label="剩余次数">
        </el-table-column>
        <el-table-column
          label="会员名称">
          <template slot-scope="scope">
            {{scope.row.members.pdmembers.username}}
          </template>
        </el-table-column>
        <el-table-column
          label="电话">
          <template slot-scope="scope">
            {{scope.row.members.pdmembers.cellphone}}
          </template>
        </el-table-column>
        <el-table-column
          label="有效期时间">
          <template slot-scope="scope">
            {{String(scope.row.expirytime).substr(0, 10) === '9999-12-31' ? '无限期' : scope.row.expirytime}}
          </template>
        </el-table-column>
        <el-table-column
          label="上课教练">
          <template slot-scope="scope">
            <!-- {{coachData.find((o) => o.id === Number(scope.row.coach)) ? coachData.find((o) => o.id).name : ''}} -->
            {{scope.row.coachs.name}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width='210'
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click='continuePrivate(scope.row)'>续私教</el-button>
            <el-button type="primary" size="mini" class="Orange" @click='changeCoach(scope.row)'>更改教练</el-button>
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
    <ChangeCoach v-if='changeCoachShow' :priName='priName' :priNum='priNum' :priTime='priTime' :priId='priId' :oldCoach='oldCoach' :privateid='privateid' :memberid='memberid'></ChangeCoach>
  </div>
</template>
<script>
import { differenceInDays } from 'date-fns'
import { getCoachData } from '@/api/data'
import { QueryAllBPCard } from '@/api/buyvipcard'
import { searchDate } from '@/api/sign'
import ChangeCoach from '@/components/ChangeCoach'
export default {
  name: 'buypricourse',
  components: {
    ChangeCoach
  },
  data () {
    return {
      name: undefined,
      number: '',
      date: '',
      removeCourseData: [],
      coach: undefined,
      coachs: [],
      curPage: 1,
      pageCount: 10,
      count: 0,
      memberSignin: [],
      loading: false,
      coachData: [],
      changeCoachShow: false
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    this.getCourseData()
    getCoachData({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        this.coachData = res.data.coachs
        for (let v of res.data.coachs) {
          this.coachs.push({name: v.name + ' ' + '(' + v.cellphone + ')', id: v.id})
        }
      }
    })
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
      this.getCourseData()
    },
    coachChange (e) {
      if (e === null) {
        this.coach = undefined
      } else {
        this.coach = e
      }
      this.getCourseData()
    },
    getCourseData () {
      QueryAllBPCard({
        curPage: this.curPage,
        pageCount: this.pageCount,
        coach: this.coach,
        memberid: this.name
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.removeCourseData = data.allInfos
          this.count = data.count
        }
      })
    },
    continuePrivate (e) {
      this.$router.push({name: 'continuePrivate', params: {list: [e.uid, e.privates.uid, e.privates.privatename, e.expirytime, differenceInDays(e.expirytime, e.opencardtime)]}})
      localStorage.setItem('list', [e.uid, e.privates.uid, e.privates.privatename, e.expirytime, differenceInDays(e.expirytime, e.opencardtime)])
    },
    changeCoach (e) {
      this.priName = e.privates.privatename
      this.priNum = e.curbuy
      this.priTime = e.expirytime
      this.priId = e.uid
      this.oldCoach = e.coach
      this.privateid = e.privateid
      this.memberid = e.memberid
      this.changeCoachShow = true
    },
    changeCoachEventClose () {
      this.changeCoachShow = false
    },
    beforeDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1))
    },
    afterDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1))
    },
    ChangeCoachCloseEvent () {
      this.ChangeCoachShow = false
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getCourseData()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getCourseData()
    }
  },
  filters: {
    format (time) {
      if (time === '' || time === undefined) return ''
      return String(time).substr(0, 2)
    }
  }
}
</script>
