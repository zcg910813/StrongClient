<template>
  <div class="appMain">
    <div class="add-store-btn">
      <el-button type="primary" @click="signin">签到</el-button>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item>
          <el-select
            v-model="name"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="姓名/电话/实体卡号"
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
        <el-form-item>
          <el-input placeholder="手牌号码" v-model="tel" class="input-with-select input150">
            <el-button slot="append" icon="el-icon-search" @click='handleCard'></el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="beforeDate" size="mini">前一天</el-button>
          <el-date-picker
            v-model="date"
            type="date"
            :editable='false'
            @change='dateChange'
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-button @click="afterDate" size="mini">后一天</el-button>
      </el-form>
    </div>
    <div class="table-modal">
      <el-table
        :data='memberSigninData'
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          width='85'
          label="会员卡"
          prop="cardname">
          <!-- <template slot-scope="scope"> -->
            <!-- <span v-if='scope.row.cardname === "1"'>期限卡</span>
            <span v-else-if='scope.row.cardname === "2"'>次卡</span>
            <span v-else>储值卡</span> -->
          <!-- </template> -->
        </el-table-column>
        <el-table-column
          prop="type"
          label="签到方式">
          <template slot-scope="scope">
            {{scope.row.signin === '1' ? '手动签到' : ''}}
          </template>
        </el-table-column>
        <el-table-column
          prop="sigintime"
          label="签到时间"
          >
        </el-table-column>
        <el-table-column
          prop="num"
          label="更衣柜号码">
           <template slot-scope="scope">
            {{scope.row.returntime ? scope.row.returntime : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="handcard"
          label="手牌号码">
          <template slot-scope="scope">
            {{scope.row.handcardid ? scope.row.handcardid : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="returntime"
          label="归还时间">
          <template slot-scope="scope">
            {{scope.row.returntime ? scope.row.returntime : '--'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          class-name="operate">
          <!-- <el-button type="primary" size="mini" class="DoderBlue">归还</el-button> -->
          <template slot-scope="scope">
              <el-button type="danger" size="mini" class="OrangeRed" v-if='Number(scope.row.status) === 1' @click='cancel(scope, scope.$index)'>取消</el-button>
              <el-button type="primary" size="mini" v-else disabled>取消</el-button>
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
    <Signin v-if='signinShow'></Signin>
  </div>
</template>
<script>
// import { format } from 'date-fns'
import Signin from '../components/Signin'
import { getSigninTable, cancelSigninTable, searchDate } from '@/api/sign'
export default {
  components: {
    Signin
  },
  data () {
    return {
      name: undefined,
      tel: undefined,
      date: '',
      signinShow: false,
      memberSignin: [],
      memberSigninData: [],
      loading: false,
      rowDisabled: false,
      curPage: 1,
      pageCount: 10,
      count: 0,
      uid: ''
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    this.date = new Date()
    this.getData()
  },
  mounted () {
  },
  methods: {
    getData () {
      getSigninTable({
        curPage: this.curPage,
        pageCount: this.pageCount,
        date: this.date,
        memberid: this.name,
        handcardid: this.tel
      }).then(res => {
        this.$store.commit('setLoading', false)
        let data = res.data.res
        this.memberSigninData = data.allInfos
        this.count = data.count
      })
    },
    dateChange (e) {
      if (e === null) {
        this.date = undefined
      } else {
        this.date = e
      }
      this.getData()
    },
    handleCard () {
      if (this.tel === null) {
        this.tel = undefined
      } else {
        this.tel = this.tel
      }
      this.getData()
    },
    signin () {
      this.signinShow = true
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
      this.getData()
    },
    beforeDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() - 1))
      this.getData()
    },
    afterDate () {
      this.date = new Date(this.date.setDate(this.date.getDate() + 1))
      this.getData()
    },
    signinCloseEvent () {
      this.signinShow = false
    },
    cancel (e, idx) {
      this.$confirm(`取消签到后，次卡的次数会返还，该条签到数据失效，是否确认取消签到？`, '取消签到提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelSigninTable({uid: e.row.uid}).then(res => {
          if (res.code === 200) {
            this.rowDisabled = true
            this.getData()
          }
        })
      }).catch(() => {
      })
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getData()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getData()
    }
  }
}
</script>
