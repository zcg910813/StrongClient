<template>
  <div class="appMain">
    <div class="tabpane-modal">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="定金" name="set"></el-tab-pane>
        <el-tab-pane label="押金" name="pawn"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip" style="display: flex;">
          <el-select v-model="payee" placeholder="请选择收款人" clearable @change='payeeChange'>
            <el-option
              v-for="item in payees"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-select
            v-model="name"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入姓名/电话/实体卡号"
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
      </el-form>
    </div>
    <div class="table-modal">
      <el-table
        :data='payCashData'
        border
        style="width: 100%">
        <el-table-column
          label="会员名称"
          width='100'>
          <template slot-scope="scope">
            {{scope.row.members.pdmembers.username}}
          </template>
        </el-table-column>
        <el-table-column
          label="金额">
          <template slot-scope="scope">
            {{scope.row.cost}}
          </template>
        </el-table-column>
        <el-table-column
          label="收款人">
          <template slot-scope="scope">
            {{payeeList.find((o) => o.id === Number(scope.row.payee)) ? payeeList.find((o) => o.id === Number(scope.row.payee)).name : '-'}}
          </template>
        </el-table-column>
        <el-table-column
          label="支付方式">
          <template slot-scope="scope">
            <span v-if='scope.row.payment === 1'>现金</span>
            <span v-else-if='scope.row.payment === 2'>微信</span>
            <span v-else-if='scope.row.payment === 3'>支付宝</span>
            <span v-else-if='scope.row.payment === 4'>刷卡</span>
            <span v-else>其他</span>
          </template>
        </el-table-column>
        <el-table-column
          label="收取时间">
          <template slot-scope="scope">
            {{scope.row.chargetime}}
          </template>
        </el-table-column>
        <el-table-column
          label="状态">
          <template slot-scope="scope">
            <span v-if='scope.row.status === "1"'>未使用</span>
            <span v-else-if='scope.row.status === "2"'>已抵扣</span>
            <span v-else>已退款</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备注">
          <template slot-scope="scope">
            {{scope.row.remark}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          class-name="operate">
          <template slot-scope="scope">
            <span v-if='setTableShow'>
              <el-button type="primary" size="mini" class="DoderBlue" @click="refund(scope.row)" v-if='Number(scope.row.status) === 1'>退款</el-button>
              <el-button type="primary" size="mini" v-else-if='Number(scope.row.status) === 2' disabled>退款</el-button>
              <el-button type="primary" size="mini" v-else disabled>退款</el-button>
            </span>
            <span v-else>
              <el-button type="primary" size="mini" class="DoderBlue" @click="depositRefund(scope.row)" v-if='Number(scope.row.status) === 1'>退款</el-button>
              <el-button type="primary" size="mini" v-else-if='Number(scope.row.status) === 2' disabled>退款</el-button>
              <el-button type="primary" size="mini" v-else disabled>退款</el-button>
            </span>
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
    <Refund v-if='refundShow' :list='list'></Refund>
  </div>
</template>
<script>
import { format, addDays } from 'date-fns'
import { getAllWorker } from '@/api/data'
import { searchDate } from '@/api/sign'
import { getAllEarnests, getAllDeposits } from '@/api/member'
import Refund from '../components/Refund'
export default {
  components: {
    Refund
  },
  data () {
    return {
      activeName: 'set',
      name: undefined,
      number: '',
      date: '',
      refundShow: false,
      payCashData: [],
      payee: undefined,
      payees: [],
      payeeList: [],
      setTableShow: true,
      curPage: 1,
      pageCount: 10,
      count: 0,
      memberSignin: [],
      loading: false,
      uid: '',
      sDate: undefined,
      eDate: undefined
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    this.date = [format(new Date(), 'YYYY-MM-DD'), format(addDays(new Date(), 7), 'YYYY-MM-DD')]
    this.sDate = this.date[0]
    this.eDate = this.date[1]
    this.getAllEarnest()
  },
  mounted () {
    // this.date = new Date()
    this.getAllEarnest()
    getAllWorker({
      curPage: 1,
      pageCount: 10000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.employees
        this.payeeList = data
        this.payees = data.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
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
      if (this.activeName === 'set') {
        this.getAllEarnest()
      } else {
        this.getAllDeposit()
      }
    },
    dateChange (e) {
      if (e === null) {
        this.sDate = undefined
        this.eDate = undefined
      } else {
        this.sDate = e[0]
        this.eDate = e[1]
      }
      if (this.activeName === 'set') {
        this.getAllEarnest()
      } else {
        this.getAllDeposit()
      }
    },
    payeeChange (e) {
      if (e === null) {
        this.payee = undefined
      } else {
        this.payee = e
      }
      if (this.activeName === 'set') {
        this.getAllEarnest()
      } else {
        this.getAllDeposit()
      }
    },
    getAllEarnest () {
      getAllEarnests({
        curPage: this.curPage,
        pageCount: this.pageCount,
        payee: this.payee,
        memberid: this.name,
        stime: this.sDate,
        Etime: this.eDate
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.payCashData = data.allInfos
          this.count = data.count
        }
      })
    },
    getAllDeposit () {
      getAllDeposits({
        curPage: this.curPage,
        pageCount: this.pageCount,
        payee: this.payee,
        memberid: this.name,
        stime: this.sDate,
        Etime: this.eDate
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.payCashData = data.allInfos
          this.count = data.count
        }
      })
    },
    handleClick (e) {
      switch (e.name) {
        case 'set':
          this.setTableShow = true
          this.getAllEarnest()
          this.date = [format(new Date(), 'YYYY-MM-DD'), format(addDays(new Date(), 7), 'YYYY-MM-DD')]
          this.sDate = this.date[0]
          this.eDate = this.date[1]
          this.name = undefined
          this.payee = undefined
          break
        case 'pawn':
          this.setTableShow = false
          this.getAllDeposit()
          this.date = [format(new Date(), 'YYYY-MM-DD'), format(addDays(new Date(), 7), 'YYYY-MM-DD')]
          this.sDate = this.date[0]
          this.eDate = this.date[1]
          this.name = undefined
          this.payee = undefined
          break
        default:
          break
      }
    },
    refund (e) {
      this.list = ['refund', e.uid, e.members.pdmembers.username, e.members.pdmembers.cellphone, e.cost, e.payment]
      this.refundShow = true
    },
    depositRefund (e) {
      this.list = ['depositRefund', e.uid, e.members.pdmembers.username, e.members.pdmembers.cellphone, e.cost, e.payment]
      this.refundShow = true
    },
    refundCloseEvent () {
      this.refundShow = false
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getAllEarnest()
      this.getAllDeposit()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getAllEarnest()
      this.getAllDeposit()
    }
  }
}
</script>
