<template>
  <div class="appMain">
    <div class="tabpane-modal">
      <el-tabs v-model="titleChange" @tab-click="handleChangeMenu">
        <el-tab-pane label="教练成员" name="trainer"></el-tab-pane>
        <!-- <el-tab-pane label="教练权限管理" name="trainerLimit"></el-tab-pane> -->
      </el-tabs>
    </div>
    <div class="add-store-btn extra">
      <el-button type="primary" @click="addTrainer">添加教练</el-button>
    </div>
    <div class="table-modal">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="在职" name="stay"><h5>教练数量: {{trainerStayCount}}</h5></el-tab-pane>
        <el-tab-pane label="离职" name="leave"><h5>教练数量: {{trainerLeaveCount}}</h5></el-tab-pane>
      </el-tabs>
      <el-table
        :data='stayShow === true ? trainerStayData : trainerLeaveData'
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="教练">
          <template slot-scope="scope">
              <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="性别">
          <template slot-scope="scope">
              <span>{{scope.row.sex === 1 ? '男' : '女'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cellphone"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="weight"
          label="显示权重"
          v-if='stayShow'>
        </el-table-column>
        <el-table-column
          label="教练类型">
          <template slot-scope="scope">
              <span>{{scope.row.coachType === '1' ? '团课教练' : '私课教练'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width='130'
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click='detail(scope)'>详情</el-button>
            <el-button type="primary" size="mini" class="OrangeRed" v-if='tip === true' @click='recover(scope.row)'>恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :total="stayShow ? trainerStayCount : trainerLeaveCount"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next, sizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        >
      </el-pagination>
    </div>
    <addTrainer v-if='addTrainerShow'></addTrainer>
  </div>
</template>
<script>
import { getCoachData } from '@/api/data'
import { resumeOffice } from '@/api/coach'
import AddTrainer from '../components/AddTrainer'
export default {
  components: {
    AddTrainer
  },
  data () {
    return {
      titleChange: 'trainer',
      activeName: 'stay',
      name: '',
      number: '',
      data: '',
      trainerLeaveData: [],
      trainerStayData: [],
      trainerStayCount: 0,
      trainerLeaveCount: 0,
      stayShow: true,
      addTrainerShow: false,
      curPage: 1,
      pageCount: 10,
      leaveOffice: false,
      tip: false
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    this.getAllCoachData()
  },
  methods: {
    recover (idx) {
      resumeOffice({
        id: idx.id
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '恢复成功'
          })
          this.getAllCoachData()
        }
      })
    },
    getAllCoachData () {
      getCoachData({
        pageCount: this.pageCount,
        curPage: this.curPage,
        leaveOffice: this.stayShow === true ? this.leaveOffice : !this.leaveOffice
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          this.trainerStayData = res.data.coachs
          this.trainerStayCount = res.data.count
          this.trainerLeaveData = res.data.coachs
          this.trainerLeaveCount = res.data.count
        }
      })
    },
    addTrainer () {
      this.addTrainerShow = true
    },
    addTrainerCloseEvent () {
      this.addTrainerShow = false
    },
    handleChangeMenu (e) {
      if (e.name === 'trainerLimit') {
        this.$router.push({name: 'coachPermissionSet'})
      }
    },
    handleClick (el) {
      switch (el.name) {
        case 'stay':
          this.stayShow = true
          this.getAllCoachData()
          this.tip = false
          break
        case 'leave':
          this.stayShow = false
          this.getAllCoachData()
          this.tip = true
          break
        default:
          break
      }
    },
    detail (e) {
      this.$router.push({name: 'coachDetail', params: {courseDetailList: [e.row.id, e.row.name, e.row.sex, e.row.cellphone, e.row.coachType, e.row.images]}})
      localStorage.setItem('courseDetailList', [e.row.id, e.row.name, e.row.sex, e.row.cellphone, e.row.coachType, e.row.images])
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getAllCoachData()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getAllCoachData()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/Controller.styl'
</style>
