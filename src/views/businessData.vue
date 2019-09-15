<template>
  <div class="appMain">
    <div class="add-store-btn">
      <!-- <el-button type="primary" class="btn-width-auto">导入Excel</el-button> -->
      <export-excel :list="list" :tHeader="tHeader" :tValue="tValue" :filename='tName'></export-excel>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip search-term">
          <el-select v-model="belong" placeholder="全部业绩归属" clearable @change='byAscriptionSearch'>
            <el-option
              v-for="item in belongs"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-select v-model="type" placeholder="全部支付方式" @change='byPayTypeSearch' clearable>
            <el-option
              v-for="item in types"
              :key="item.value"
              :label="item.label"
              :value="item.value">
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
        </el-form-item>
        <span @click='reset' class="screen">清空筛选条件</span>
      </el-form>
    </div>
    <div class="amount-tip">
      <p class="member-card-total">合计金额: <span>{{amount}}</span></p>
    </div>
    <div class="table-modal">
      <el-table
        :data='businessData.slice((currentPage - 1) * pageLength, currentPage * pageLength)'
        border
        style="width: 100%">
        <el-table-column
          prop="ordernumber"
          width='160'
          label='订单号'>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          width='160'
          label='成交时间'>
        </el-table-column>
        <el-table-column
          prop="goodsname"
          label='购买商品号'>
        </el-table-column>
        <el-table-column
          prop="username"
          width='150'
          label='消费人'
          >
        </el-table-column>
        <!-- <el-table-column
          prop="operation"
          label='消费类型'>
        </el-table-column> -->
        <el-table-column
          label='支付方式'>
          <template slot-scope="scope">
            <span v-if='scope.row.payment === 1'>现金</span>
            <span v-else-if='scope.row.payment === 2'>微信</span>
            <span v-else-if='scope.row.payment === 3'>支付宝</span>
            <span v-else-if='scope.row.payment === 4'>刷卡</span>
            <span v-else>其他</span>
          </template>
        </el-table-column>
        <el-table-column
          label='业绩归属'>
            <template slot-scope="scope">
              {{mans.find((o) => o.uid === Number(scope.row.ascription)) ? mans.find((o) => o.uid === Number(scope.row.ascription)).name : '-'}}
            </template>
          <span></span>
        </el-table-column>
        <!-- <el-table-column
          prop="returntime"
          label="操作人">
        </el-table-column> -->
        <el-table-column
          label="备注">
          <template slot-scope="scope">
            {{scope.row.remark ? scope.row.remark : '-'}}
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination
        background
        :total="businessData.length"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next, sizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange">
      </el-pagination> -->
      <el-pagination background layout="total, prev, pager, next, sizes" :pageLength="pageLength" :currentPage.sync="currentPage" :total="businessData.length" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
import ExportExcel from '../components/ExportExcel'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { getAllWorker, getMemberData, getCoachData } from '@/api/data'
import { getBusinessData } from '@/api/finance'
export default {
  components: {
    ExportExcel
  },
  data () {
    return {
      options: [],
      businessData: [],
      value: '',
      belong: undefined,
      belongs: [],
      type: undefined,
      types: [
        {
          value: 2,
          label: '微信'
        },
        {
          value: 3,
          label: '支付宝'
        },
        {
          value: 1,
          label: '现金'
        },
        {
          value: 4,
          label: '刷卡'
        },
        {
          value: 5,
          label: '其他'
        }
      ],
      date: '',
      curPage: 1,
      pageCount: 10000,
      ascription: '',
      payment: '',
      startTime: undefined,
      endTime: undefined,
      amount: 0,
      count: 0,
      belongList: [],
      list: [],
      tHeader: [],
      tValue: [],
      tName: '营业流水',
      currentPage: 1,
      pageLength: 10,
      mans: [],
      coachs: []
    }
  },
  created () {
    let today = new Date()
    let startMonth = startOfMonth(today)
    let endMonth = endOfMonth(today)
    this.date = [format(startMonth, 'YYYY-MM-DD'), format(endMonth, 'YYYY-MM-DD')]
    this.startTime = this.date[0]
    this.endTime = this.date[1]
    // this.date = [format(new Date(), 'YYYY-MM-DD'), format(addDays(new Date(), 7), 'YYYY-MM-DD')]
    // this.startTime = this.date[0]
    // this.endTime = this.date[1]
    getMemberData().then(res => {
      this.$store.commit('setLoading', false)
      if (res.code === 200) {
        let data = res.data.allMembers.allMembers
        this.belongList = data
        this.belongs = data.map(o => { return {name: o.username + ' ' + '(' + o.cellphone + ')', uid: o.uid} })
      }
    })
    getAllWorker({
      curPage: 1,
      pageCount: 10000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.employees
        this.belongs = data.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
        getCoachData({
          pageCount: 1000,
          curPage: 1
        }).then(res => {
          if (res.code === 200) {
            this.coachs = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
            this.mans = this.belongs.concat(this.coachs)
          }
        })
      }
    })
    this.getBusinessData()
  },
  mounted () {
    // this.date = new Date()
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  },
  methods: {
    currentChange (currentPage) {
      this.currentPage = currentPage
    },
    byAscriptionSearch (v) {
      if (v === null) {
        this.belong = undefined
      } else {
        this.belong = v
      }
      this.getBusinessData()
    },
    byPayTypeSearch (p) {
      if (p === null) {
        this.type = undefined
      } else {
        this.type = p
      }
      this.getBusinessData()
    },
    dateChange (t) {
      if (t === null) {
        this.startTime = undefined
        this.endTime = undefined
      } else {
        this.startTime = t[0]
        this.endTime = t[1]
      }
      this.getBusinessData()
    },
    getBusinessData () {
      getBusinessData({
        curPage: this.curPage,
        pageCount: this.pageCount,
        ascription: this.belong,
        payment: this.type,
        stime: this.startTime,
        etime: this.endTime
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.businessData = data.allInfos
          this.amount = data.total
          this.count = data.count
          if (this.businessData.length > 0) {
            this.tHeader = ['订单号', '成交时间', '购买商品号', '消费人', '消费类型', '支付方式', '业绩归属', '操作人', '备注']
            this.tValue = ['ordernumber', 'createdAt', 'goodsname', 'username', 'operation', 'payment', 'ascription', 'returntime', 'remark']
            this.list = this.businessData
          } else {
            this.list = []
          }
        }
      })
    },
    reset () {
      this.belong = undefined
      this.type = undefined
      this.date = undefined
      this.getBusinessData()
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getBusinessData()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getBusinessData()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/monyReport.styl'
</style>
