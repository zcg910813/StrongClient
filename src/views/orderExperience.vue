<template>
  <div class="appMain">
    <div class="add-store-btn">
      <el-button type="primary" @click="addAppointment">添加预约</el-button>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip" style="display: flex">
          <el-select v-model="payee" placeholder="请选择会籍" @change='payeeSearch' clearable>
            <el-option
              v-for="item in payees"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <!-- <el-input placeholder="学员名称或手机号" style="margin: 0 20px;" v-model="name" class="input-with-select input150">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input> -->
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
          <el-date-picker
            @change="dateChange"
            v-model="date"
            type="date"
            :editable='false'
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-modal">
      <el-table
        :data='orderExperienceData'
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          width='100'
          label="学员姓名">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话">
        </el-table-column>
        <el-table-column
          label="预约会籍">
          <template slot-scope="scope">
            {{scope.row.name}}
          </template>
        </el-table-column>
        <el-table-column
          prop="ordertime"
          label="预约时间"
          >
        </el-table-column>
        <el-table-column
          prop="enterTime"
          label="到店时间">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          label="操作"
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click='signin(scope.row)' :disabled="scope.row.operaFlag === true">签到</el-button>
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
    <AddAppointment v-if='AddAppointmentShow'></AddAppointment>
    <orderSignin v-if='orderSigninShow' :orderName='orderName' :orderId='orderId'></orderSignin>
  </div>
</template>
<script>
import { searchDate } from '@/api/sign'
import { getAllWorker } from '@/api/data'
import { queryExperience } from '@/api/experience'
import AddAppointment from '../components/AddAppointment'
import orderSignin from '../components/orderSignin'
import { format } from 'date-fns'
export default {
  components: {
    AddAppointment,
    orderSignin
  },
  data () {
    return {
      name: undefined,
      number: '',
      date: '',
      AddAppointmentShow: false,
      orderSigninShow: false,
      orderExperienceData: [],
      payee: undefined,
      payees: [],
      curPage: 1,
      pageCount: 10,
      count: 0,
      memberSignin: [],
      loading: false
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    this.date = new Date()
    this.getexperienceData()
    getAllWorker({
      curPage: 1,
      pageCount: 10000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.employees
        this.payees = data.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
  },
  mounted () {
    this.date = new Date()
  },
  methods: {
    payeeSearch (e) {
      if (e === null) {
        this.payee = undefined
      } else {
        this.payee = e
      }
      this.getexperienceData()
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
      this.getexperienceData()
    },
    dateChange (e) {
      if (e === null) {
        this.date = format(new Date(), 'YYYY-MM-DD')
      } else {
        this.date = e
      }
      this.getexperienceData()
    },
    getexperienceData () {
      queryExperience({
        curPage: this.curPage,
        pageCount: this.pageCount,
        ordertime: format(this.date, 'YYYY-MM-DD'),
        employeeId: this.payee,
        name: this.name
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data
          this.orderExperienceData = data.result
          this.count = data.count
        }
      })
    },
    addAppointment () {
      this.AddAppointmentShow = true
    },
    AddAppointmentCloseEvent () {
      this.AddAppointmentShow = false
    },
    signin (r) {
      this.orderName = r.name
      this.orderId = r.id
      this.orderSigninShow = true
    },
    orderSigninCloseEvent () {
      this.orderSigninShow = false
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getexperienceData()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getexperienceData()
    }
  }
}
</script>
