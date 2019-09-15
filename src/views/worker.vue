<template>
  <div class="appMain">
    <div class="tabpane-modal">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="工作人员" name="worker"></el-tab-pane>
        <el-tab-pane label="职位与权限" name="position"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="add-store-btn">
      <el-button type="primary" @click="addWorker" v-if='workerShow'>添加工作人员</el-button>
      <el-button type="primary" @click="addPosition" v-else>添加职位</el-button>
    </div>
    <div class="center-top-modal" v-if='workerShow'>
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip search-term">
          <el-select v-model="position" placeholder="请选择职位" @change="positionSearch" clearable>
            <el-option
              v-for="item in positionData"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-form-item class="member-card-input">
            <!-- <el-input placeholder="可以输入姓名、电话进行搜索" v-model="name" class="input-with-select input150">
              <el-button slot="append" icon="el-icon-search"></el-button>
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
        </el-form-item>
      </el-form>
    </div>
    <div class="manager"  v-if='workerShow'>
      <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <span>超级管理员</span>
            <span>admin</span>
            <span>1888888888</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <el-button type='text' @click='adminDetail' :disabled="adminDetailAbled">详情</el-button>
            <!-- <span @click='adminChange'>变更</span> -->
          </div>
        </el-col>
      </el-row>
    </div>
    <div v-else class="title-modal">
      <h3>职位</h3>
    </div>
    <div class="table-modal" v-if='activeName === "worker"'>
      <el-tabs v-model="activesName" @tab-click="handlesClick">
        <el-tab-pane label="在职" name="stay"><h5>工作人员数量: {{stayCount}}</h5></el-tab-pane>
        <el-tab-pane label="离职" name="leave"><h5>工作人员数量: {{stayCount}}</h5></el-tab-pane>
      </el-tabs>
    </div>
    <div class="table-modal">
      <el-table
        :data='workerShow ? workerData : positionData'
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          :label="workerShow ? '姓名' : '职位名称'">
        </el-table-column>
        <el-table-column
          :label="workerShow ? '性别' : '管理范围'">
          <template slot-scope="scope">
            <span v-if='workerShow'>{{scope.row.sex === '1' ? '男' : '女'}}</span>
            <span v-else>1</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cellphone"
          label="手机号"
          v-if='workerShow'>
        </el-table-column>
        <el-table-column
          label="职务"
          v-if='workerShow'>
          <template slot-scope="scope">
            {{scope.row.positionname ? scope.row.positionname : '-'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click='detail(scope)' v-if='workerShow'>详情</el-button>
            <div v-else>
              <el-button type="primary" size="mini" class="DoderBlue" @click='detailRole(scope)'>编辑</el-button>
              <el-button type="primary" size="mini" class="OrangeRed" @click='deleteRole(scope)'>删除</el-button>
              <!-- <el-button type="primary" size="mini" class="green" @click='PermissionSet(scope)'>权限设置</el-button> -->
            </div>
            <el-button type="primary" size="mini" class="OrangeRed" v-if='tip === true' @click='recover(scope.row)'>恢复</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :total="workerShow ? workerTotal : positionData.length"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next, sizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        >
      </el-pagination>
    </div>
    <addWorker v-if='addWorkerShow'></addWorker>
    <AddPosition v-if='addPositionShow' :role='role'></AddPosition>
  </div>
</template>
<script>
import { resumeOffice } from '@/api/person'
import { searchDate } from '@/api/sign'
import { getAllRole, deleteRole } from '@/api/role'
import { getAllWorker } from '@/api/data'
import AddWorker from '@/components/AddWorker.vue'
import AddPosition from '@/components/AddPosition.vue'
export default {
  name: 'worker',
  components: {
    AddWorker,
    AddPosition
  },
  data () {
    return {
      activeName: 'worker',
      name: undefined,
      number: '',
      data: '',
      workerData: [],
      position: undefined,
      positionData: [],
      addWorkerShow: false,
      options: [],
      value: '',
      workerShow: true,
      addPositionShow: false,
      pageCount: 10,
      curPage: 1,
      workerTotal: 0,
      roleId: '',
      role: '',
      memberSignin: [],
      loading: false,
      activesName: 'stay',
      tip: false,
      stayCount: 0,
      leaveCount: 0,
      stayShow: true,
      leaveOffice: false,
      adminDetailAbled: true
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    this.getAllRole()
    this.getAllWorker()
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
          this.getAllWorker()
        }
      })
    },
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
      this.getAllWorker()
    },
    positionSearch (e) {
      if (e === null) {
        this.position = undefined
      } else {
        this.position = e
      }
      this.getAllWorker()
    },
    getAllWorker () {
      getAllWorker({
        curPage: this.curPage,
        pageCount: this.pageCount,
        position: this.position,
        uid: this.name,
        leaveOffice: this.stayShow === true ? this.leaveOffice : !this.leaveOffice
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          this.workerData = res.data.employees
          this.stayCount = res.data.count
        }
      })
    },
    getAllRole () {
      getAllRole({
        pageCount: this.pageCount,
        curPage: this.curPage
      }).then(res => {
        this.positionData = res.data.data
      })
    },
    addWorker () {
      this.addWorkerShow = true
    },
    addWorkerCloseEvent () {
      this.addWorkerShow = false
    },
    addPosition () {
      this.role = ''
      this.addPositionShow = true
    },
    addPositionCloseEvent () {
      this.addPositionShow = false
    },
    detailRole (e) {
      this.role = e.row
      this.addPositionShow = true
    },
    // PermissionSet (e) {
    //   this.$router.push({name: 'permissionSet', params: {workerRoleInfo: e.row}})
    //   localStorage.setItem('workerRoleInfo', e.row)
    // },
    handleClick (e) {
      switch (e.name) {
        case 'worker':
          this.workerShow = true
          break
        case 'position':
          this.workerShow = false
          break
        default:
          break
      }
    },
    adminDetail () {
      // this.$router.push({name: 'workerDetail'})
    },
    detail (e) {
      // this.$router.push({name: 'workerDetail', params: {workerDetailId: e.row.id}})
      // localStorage.setItem('workerDetailId', e.row.id)
      this.$router.push({name: 'workerDetail', params: {PersonneList: [e.row.id, e.row.name, e.row.sex, e.row.cellphone, e.row.positionname, e.row.images]}})
      localStorage.setItem('PersonneList', [e.row.id, e.row.name, e.row.sex, e.row.cellphone, e.row.positionname, e.row.images])
    },
    adminChange () {
      this.$router.push({name: 'adminChange'})
    },
    deleteRole (evl) {
      this.$confirm(`无法删除该身份。请在【场馆管理】-【工作人员】中删除所有该身份的工作人员后，才可删除该身份。`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole({
          roleId: evl.row.uid
        }).then(res => {
          if (res.code === 200) {
            this.getAllRole()
            this.$message({
              type: 'success',
              message: '删除成功'
            })
          } else {
          }
        })
      }).catch(() => {
      })
    },
    handlesClick (e) {
      switch (e.name) {
        case 'stay':
          this.stayShow = true
          this.tip = false
          this.getAllWorker()
          break
        case 'leave':
          this.stayShow = false
          this.tip = true
          this.getAllWorker()
          break
        default:
          break
      }
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getAllRole()
      this.getAllWorker()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getAllRole()
      this.getAllWorker()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/Controller.styl'
</style>
