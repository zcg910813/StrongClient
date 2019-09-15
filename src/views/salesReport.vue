<template>
  <div class="appMain">
    <div class="add-store-btn">
      <!-- <el-button type="primary" class="btn-width-auto">导入Excel</el-button> -->
      <export-excel :list="list" :tHeader="tHeader" :tValue="tValue" :filename='tName'></export-excel>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip search-term">
          <el-select v-model="sale" placeholder="全部销售" @change="saleSelect" clearable>
            <el-option
              v-for="item in sales"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-select v-model="type" placeholder="全部会员卡类型" @change='typeSelect' clearable>
            <el-option
              v-for="item in types"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="payType" placeholder="全部支付方式" @change="payTypeSelect" clearable>
            <el-option
              v-for="item in payTypes"
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
            :editable='false'
            range-separator="-"
            value-format="yyyy-MM-dd"
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
        :data='salesReportData.slice((currentPage - 1) * pageLength, currentPage * pageLength)'
        border
        style="width: 100%">
        <el-table-column
          prop="createdAt"
          width='160'
          label='日期时间'>
        </el-table-column>
        <el-table-column
          label='业绩归属'>
          <template slot-scope="scope">
            {{scope.row.username ? scope.row.username : '--'}}
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="type"
          label='私教课名称'>
        </el-table-column> -->
        <el-table-column
          prop="entitycardid"
          label='会员卡编号'
          >
        </el-table-column>
        <el-table-column
          prop="cardsubtype"
          label='会员卡类型'>
          <template slot-scope="scope">
            <!-- <span v-if='scope.row.cardsubtype === 1'>期限卡</span>
            <span v-else-if='scope.row.cardsubtype === 2'>次卡</span>
            <span v-else>储值卡</span> -->
            {{scope.row.cardsubtype}}
          </template>
        </el-table-column>
        <el-table-column
          prop="cardname"
          label='会员姓名'>
        </el-table-column>
        <el-table-column
          prop="cellphone"
          label='会员手机'>
        </el-table-column>
        <el-table-column
          prop="price"
          label="会员卡价格"
          >
        </el-table-column>
        <el-table-column
          prop="pricediff"
          label="优惠价格"
          >
          <template slot-scope="scope">
            {{scope.row.pricediff}}
          </template>
        </el-table-column>
        <el-table-column
          prop="money"
          label="实收金额"
          >
        </el-table-column>
        <el-table-column
          label="支付方式"
          >
          <template slot-scope="scope">
            <!-- <span v-if='scope.row.payment === 1'>现金</span>
            <span v-else-if='scope.row.payment === 2'>微信</span>
            <span v-else-if='scope.row.payment === 3'>支付宝</span>
            <span v-else-if='scope.row.payment === 4'>刷卡</span>
            <span v-else>其他</span> -->
            {{scope.row.payment}}
          </template>
        </el-table-column>
        <el-table-column
          prop="param"
          label="充值额度(天/元/次)"
          >
        </el-table-column>
        <!-- <el-table-column
          prop="remark"
          label="类型">
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
        :total="count"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next, sizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        >
      </el-pagination> -->
      <el-pagination background layout="total, prev, pager, next, sizes" :pageLength="pageLength" :currentPage.sync="currentPage" :total="salesReportData.length" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
import ExportExcel from '../components/ExportExcel'
import { format, startOfMonth, endOfMonth } from 'date-fns'
import { getAllWorker } from '@/api/data'
// import { getMemberData } from '@/api/data'
import { getSalesReport } from '@/api/finance'
export default {
  components: {
    ExportExcel
  },
  data () {
    return {
      options: [],
      salesReportData: [],
      value: '',
      sale: undefined,
      sales: [],
      type: undefined,
      types: [
        {
          id: 1,
          name: '期限卡'
        },
        {
          id: 2,
          name: '次卡'
        },
        {
          id: 3,
          name: '储值卡'
        }
      ],
      payType: undefined,
      payTypes: [
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
      count: 0,
      amount: 0,
      stime: undefined,
      etime: undefined,
      list: [],
      tHeader: [],
      tValue: [],
      tName: '会员卡销售报表',
      currentPage: 1,
      pageLength: 10
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    let today = new Date()
    let startMonth = startOfMonth(today)
    let endMonth = endOfMonth(today)
    this.date = [format(startMonth, 'YYYY-MM-DD'), format(endMonth, 'YYYY-MM-DD')]
    this.stime = this.date[0]
    this.etime = this.date[1]
    this.getSalesReport()

    // getMemberData().then(res => {
    //   if (res.code === 200) {
    //     let data = res.data.allMembers.allMembers
    //     this.sales = data.map(o => { return {name: o.username + ' ' + '(' + o.cellphone + ')', uid: o.uid} })
    //   }
    // })
    getAllWorker({
      curPage: 1,
      pageCount: 10000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.employees
        this.sales = data.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
      }
    })
  },
  mounted () {
    // this.date = new Date()
  },
  methods: {
    saleSelect (e) {
      if (e === null) {
        this.sale = undefined
      } else {
        this.sale = e
      }
      this.getSalesReport()
    },
    typeSelect (e) {
      if (e === null) {
        this.type = undefined
      } else {
        this.type = e
      }
      this.getSalesReport()
    },
    payTypeSelect (e) {
      if (e === null) {
        this.payType = undefined
      } else {
        this.payType = e
      }
      this.getSalesReport()
    },
    getSalesReport () {
      getSalesReport({
        curPage: this.curPage,
        pageCount: this.pageCount,
        ascription: this.sale,
        cardsubtype: this.type,
        payment: this.payType,
        stime: this.stime,
        etime: this.etime
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.salesReportData = data.allInfos
          this.count = data.count
          this.amount = data.total
          if (this.salesReportData.length > 0) {
            this.tHeader = ['日期时间', '业绩归属', '会员卡编号', '会员卡类型', '会员姓名', '会员手机', '会员卡价格', '优惠价格', '实收金额', '支付方式', '充值额度(天/元/次)', '备注']
            this.tValue = ['createdAt', 'username', 'entitycardid', 'cardsubtype', 'cardname', 'cellphone', 'price', 'pricediff', 'money', 'payment', 'param', 'remark']

            for (let i = 0; i < this.salesReportData.length; i++) {
              let temp1
              if (this.salesReportData[i].cardsubtype === 1) {
                temp1 = '期限卡'
              } else if (this.salesReportData[i].cardsubtype === 2) {
                temp1 = '次卡'
              } else {
                temp1 = '储值卡'
              }
              let temp2
              if (this.salesReportData[i].payment === 1) {
                temp2 = '现金'
              } else if (this.salesReportData[i].payment === 2) {
                temp2 = '微信'
              } else if (this.salesReportData[i].payment === 3) {
                temp2 = '支付宝'
              } else if (this.salesReportData[i].payment === 4) {
                temp2 = '刷卡'
              } else {
                temp2 = '-'
              }
              this.salesReportData[i].cardsubtype = temp1
              this.salesReportData[i].payment = temp2
              this.list = this.salesReportData
            }
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
      this.getSalesReport()
    },
    reset () {
      this.sale = undefined
      this.type = undefined
      this.payType = undefined
      this.date = undefined
      this.getSalesReport()
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getSalesReport()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getSalesReport()
    },
    currentChange (currentPage) {
      this.currentPage = currentPage
    }
  },
  filters: {
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/monyReport.styl'
</style>
