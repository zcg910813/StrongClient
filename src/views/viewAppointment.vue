<template>
  <div class="appMain">
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item>
          <!-- <el-input placeholder="输入学员名称或电话" v-model="name" class="input-with-select input150">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
          <el-select
            v-model="name"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="输入学员名称或电话"
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
        <el-form-item class="screen-term">
          <el-button @click="beforeDate" size="mini">前一天</el-button>
          <el-date-picker
            v-model="date"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-button @click="afterDate" size="mini">后一天</el-button>
      </el-form>
    </div>
    <div class="table-modal">
      <el-table
        :data='signinList'
        border
        style="width: 100%">
        <el-table-column
          prop="membername"
          width='85'
          label="学员名称">
        </el-table-column>
        <el-table-column
          prop="coursename"
          label="预约课程">
        </el-table-column>
        <el-table-column
          prop="coursetime"
          label="上课时间">
        </el-table-column>
        <el-table-column
          label="签到时间" value-format="yyyy-MM-dd">
          <template slot-scope="scope">
            {{scope.row.signdate}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          class-name="operate">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" class="DoderBlue" @click='signin(scope.row)' :disabled="Number(scope.row.status) === 2 || Number(scope.row.status) === 0">{{Number(scope.row.status) === 2 || Number(scope.row.status) === 0 ? '已签到' : '签到'}}</el-button>
              <el-button type="danger" size="mini" class="OrangeRed" @click='cancel(scope.row)' :disabled="Number(scope.row.status) === 0">取消预约</el-button>
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
        @size-change="handleSizeChange">
      </el-pagination>
    </div>
    <Signin v-if='signinShow'></Signin>
  </div>
</template>
<script>
// import { format } from 'date-fns'
import { searchDate } from '@/api/sign'
import { OrderGroup, deleteordergroup } from '@/api/ordergroup'
import { grouplessonquery } from '@/api/grouplesson'
export default {
  data () {
    return {
      name: '',
      number: '',
      date: '',
      signinList: [],
      signinShow: false,
      viewAData: [],
      curPage: 1,
      pageCount: 10,
      count: 0,
      memberSignin: [],
      loading: false
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  },
  created () {
    this.date = new Date()
    if (this.$route.params.viewADataId) {
      this.viewADataId = this.$route.params.viewADataId
    } else {
      this.viewADataId = localStorage.getItem('viewADataId')
    }
    this.grouplessonquery()
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
      this.name = e
      this.grouplessonquery()
    },
    grouplessonquery () {
      grouplessonquery({
        curPage: this.curPage,
        pageCount: this.pageCount,
        groupLessonId: this.viewADataId
      }).then(res => {
        if (res.code === 200) {
          let data = res.data
          this.signinList = data.retdata
          this.count = data.count
        }
      })
    },
    signin (e) {
      this.$confirm(`确认会员已经到达场馆`, '团课会员签到', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        OrderGroup({
          ids: [e.id]
        }).then(res => {
          if (res.code === 200) {
            this.grouplessonquery()
          }
        })
      }).catch(_ => {
      })
    },
    beforeDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1))
    },
    afterDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1))
    },
    cancel (e) {
      this.$confirm(`确认取消${e.membername}会员的${e.coursename}课预约吗？`, '取消签到', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(_ => {
        deleteordergroup({
          groupLessonId: e.groupLessonId,
          uid: e.memberId
        }).then(res => {
          if (res.code === 200) {
            this.grouplessonquery()
          }
        })
      }).catch(_ => {
      })
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.grouplessonquery()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.grouplessonquery()
    }
  }
}
</script>
