<template>
  <div class="appMain">
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件:" class="search-term search-tip">
          <el-select v-model="state" placeholder="请选择教练状态" @change='coachStateSelect' clearable>
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="screen-term">
          <el-button @click="beforeDate" size="mini">前一天</el-button>
          <el-date-picker
            @change="dateChange"
            v-model="date"
            type="date"
            :editable='false'
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-button @click="afterDate" size="mini">后一天</el-button>
        <el-button type="primary" size="mini" style="float: right" @click.stop='order'>私教预约</el-button>
      </el-form>
    </div>
    <div class="table-modal">
      <el-table :data='selfOrderData' border style="width: 100%">
        <el-table-column type="selection" width="55" v-if='batchShow'></el-table-column>
        <el-table-column prop="name" label="教练名称"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-if='scope.row.orderStatus === 0'>可约</span>
            <span v-else-if='scope.row.orderStatus === 1'>课满</span>
            <span v-else>请假</span>
          </template>
        </el-table-column>
        <el-table-column prop="" label="可预约时间">
          <template slot-scope="scope">
            {{scope.row.workTime}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="请假时间">
          <template slot-scope="scope">
            {{scope.row.pauseWorkBeginDate === 'Invalid date' ? '-' : scope.row.pauseWorkBeginDate + ' ~ ' + scope.row.pauseWorkEndDate}}
          </template>
        </el-table-column>
        <el-table-column label="上课上限">
          <template slot-scope="scope">
            {{scope.row.dailyLessonNumLimit}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width='210' class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click.stop='set(scope.row)'>设置</el-button>
            <el-button type="primary" size="mini" class="Orange" @click.stop='leave(scope.row)' :disabled='scope.row.pauseWorkEndDate !== "Invalid date" && scope.row.pauseWorkEndDate !== ""'>请假</el-button>
            <el-button type="danger" size="mini" class="OrangeRed" @click='removeVa(scope.row)' :disabled='scope.row.pauseWorkEndDate === "Invalid date" || scope.row.pauseWorkEndDate === ""'>消假</el-button>
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
    <SetSelfCourse v-if='setShow' :setData='setData'></SetSelfCourse>
    <selfOrderAdd v-if='selfOrderAddShow'></selfOrderAdd>
    <perslApotLeave v-if='perslApotLeaveShow' :coachID='coachID' :coachNames='coachNames' :recoverSingle='recoverSingle'></perslApotLeave>
    <removeVacation v-if='removeVacationShow' :coachInfo='coachInfo'></removeVacation>
  </div>
</template>
<script>
import removeVacation from '@/components/removeVacation'
import perslApotLeave from '@/components/perslApotLeave'
import { format } from 'date-fns'
import SetSelfCourse from '@/components/SetSelfCourse'
import selfOrderAdd from '@/components/selfOrderAdd'
import { getCoachData } from '@/api/data'
export default {
  components: {
    SetSelfCourse,
    selfOrderAdd,
    perslApotLeave,
    removeVacation
  },
  data () {
    return {
      state: undefined,
      states: [
        {
          value: 3,
          name: '可约'
        },
        {
          value: 1,
          name: '课满'
        },
        {
          value: 2,
          name: '请假'
        }
      ],
      value: '',
      date: '',
      options: [],
      selfOrderData: [],
      setShow: false,
      curPage: 1,
      pageCount: 10,
      count: 0,
      selfOrderAddShow: false,
      dateValue: '',
      batchShow: false,
      perslApotLeaveShow: false,
      removeVacationShow: false,
      curDate: '',
      recoverSingle: '',
      setData: []
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  },
  mounted () {
    this.curDate = new Date()
    this.curDate = format(this.curDate, 'YYYY-MM-DD')
    this.date = new Date()
    this.getCoachData()
  },
  methods: {
    coachStateSelect (e) {
      if (e === null) {
        this.state = undefined
      } else {
        this.state = e
      }
      this.getCoachData()
    },
    getCoachData () {
      getCoachData({
        curPage: this.curPage,
        pageCount: this.pageCount,
        date: format(this.date, 'YYYY-MM-DD'),
        workType: this.state
      }).then(res => {
        if (res.code === 200) {
          this.selfOrderData = res.data.coachs
          this.count = res.data.count
        }
      })
    },
    dateChange (e) {
      if (e === null) {
        this.date = undefined
      } else {
        this.date = e
      }
      this.getCoachData()
    },
    beforeDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1))
      this.getCoachData()
    },
    afterDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1))
      this.getCoachData()
    },
    memberInfoDetail (e) {
      this.$router.push({name: 'memberInfoDetail', params: {memberid: e.uid}})
    },
    set (e) {
      this.setData = e
      this.setShow = true
    },
    setCloseEvent () {
      this.setShow = false
    },
    perslApotLeaveCloseEvent () {
      this.perslApotLeaveShow = false
    },
    removeVa (e) {
      this.coachInfo = e
      this.removeVacationShow = true
    },
    removeVacationEventClose () {
      this.removeVacationShow = false
    },
    leave (e) {
      this.coachNames = e.name
      this.coachID = e.id
      this.perslApotLeaveShow = true
    },
    recover (e) {
      this.recoverSingle = 'recover'
      this.coachNames = e.name
      this.coachID = e.id
      this.perslApotLeaveShow = true
    },
    order () {
      this.selfOrderAddShow = true
    },
    selfOrderAddCloseEvent () {
      this.selfOrderAddShow = false
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getCoachData()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getCoachData()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../../assets/css/course.styl'
</style>
