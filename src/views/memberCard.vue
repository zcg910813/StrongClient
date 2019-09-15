<template>
  <div class="appMain">
    <div class="tabpane-modal">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="会员卡种类" name="card"></el-tab-pane>
        <el-tab-pane label="会员卡" name="cardBuy"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="add-store-btn">
      <Import-excel v-if='!entireShow' :importExcelAbled='importExcelAbled'></Import-excel>
      <!-- <el-button type="primary" @click="signin" class="btn-width-auto" v-if='!entireShow'>导入<i class="el-icon-upload el-icon--right"></i></el-button> -->
      <export-excel :list="list" :tHeader="tHeader" :tValue="tValue" :filename='tName' v-if='!entireShow'></export-excel>
      <el-button @click="cancel" v-if='entireShow'>取消</el-button>
      <el-button type="primary" @click="addMemberCard" v-if='addCardBtnShow'>添加会员卡</el-button>
      <el-button type="primary" @click="entire" v-else>批量请假</el-button>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件" class="search-tip search-term">
          <el-select v-model="memberState" placeholder="会员卡状态" clearable @change='cardSelect' v-if='addCardBtnShow'>
            <el-option
              v-for="item in memberStates"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="state" placeholder="会员卡状态" @change='cardBuyStatus' clearable v-if='!addCardBtnShow'>
            <el-option
              v-for="item in states"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="type" placeholder="会员卡种类" v-if='!addCardBtnShow' @change="cardTypeBuySelect" clearable>
            <el-option
              v-for="item in types"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-form-item v-if='!addCardBtnShow' class="member-card-input">
            <!-- <el-input placeholder="请输入会员名称/电话/会员卡号" v-model="param" class="input-with-select input150">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input> -->
            <el-select
            v-model="name"
            filterable
            remote
            clearable
            reserve-keyword
            placeholder="请输入会员名称/电话/会员卡号"
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
        <span class="screen" v-if='!addCardBtnShow' @click="reset">清空筛选条件</span>
      </el-form>
    </div>
    <div class="amount-tip">
      <p class="member-card-total">会员卡数量: <span>{{addCardBtnShow === true ? getAllMemberCount : memberCardBuyCount}}</span></p>
    </div>
    <div class="table-modal" style="position: relative;">
      <el-table
      ref='tableData'
      :row-key="getRowKeys"
      :fit="true"
      :highlight-current-row="true"
      @selection-change="selsChange"
        :data='addCardBtnShow === true ? getmemberCards.slice((currentPage - 1) * pageLength, currentPage * pageLength) : memberCardBuy.slice((currentPage - 1) * pageLength, currentPage * pageLength)'
        border
        style="width: 100%">
        <el-table-column
          width="55"
          v-if='entireShow'>
          <template slot-scope="scope">
            <label v-if="checkList.find((o) => o.iid === scope.row.iid)" role="checkbox" class="el-checkbox">
              <span aria-checked="mixed" class="el-checkbox__input is-checked checkAllDisabled" >
                <span class="el-checkbox__inner" @click="unselectRow(scope.row)" v-if='scope.row.cardstatus !== 5'></span>
                <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="" v-if='scope.row.cardstatus !== 5'>
                <el-checkbox v-else :disabled='scope.row.cardstatus === 5'></el-checkbox>
              </span>
            </label>
            <label v-else role="checkbox" class="el-checkbox is-checked checkAllDisabled">
              <span aria-checked="mixed" class="el-checkbox__input">
                <span class="el-checkbox__inner" @click="selectRow(scope.row)" v-if='scope.row.cardstatus !== 5'></span>
                <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="" v-if='scope.row.cardstatus !== 5'>
                <el-checkbox v-else :disabled='scope.row.cardstatus === 5'></el-checkbox>
              </span>
            </label>
          </template>
        </el-table-column>
        <el-table-column
          width='200'
          :label="addCardBtnShow === true ? '会员卡' : '会员卡号'">
          <template slot-scope="scope">{{addCardBtnShow === true ? scope.row.cardname : scope.row.entitycardid}}</template>
        </el-table-column>
        <el-table-column
          width='120'
          :label="addCardBtnShow === true ? '状态' : '会员卡名称'">
          <template slot-scope="scope">
            <span>
              <span :style='scope.row.onsale === "正常" ? "" : "color: red"' v-if='addCardBtnShow === true'>{{scope.row.onsale}}</span>
              <span v-else>{{scope.row.vipcards.cardname}}</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          :label="addCardBtnShow === true ? '会员卡类型' : '绑定会员'">
          <template slot-scope="scope">
            <div v-if='addCardBtnShow === true'>
              <!-- <span v-if='scope.row.cardsubtype === 1'>期限卡</span>
              <span v-else-if='scope.row.cardsubtype === 2'>次卡</span>
              <span v-else>储值卡</span> -->
              {{scope.row.cardsubtype}}
            </div>
            <span v-else>{{scope.row.members.pdmembers.username}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="signtime"
          :label="addCardBtnShow === true ? '显示权重' : '生效时间'"
          >
          <template slot-scope="scope">{{addCardBtnShow === true ? scope.row.recommendWeight : scope.row.opencardtime | format}}</template>
        </el-table-column>
        <el-table-column
          prop="num"
          :label="addCardBtnShow === true ? '售价' : '失效时间'">
          <template slot-scope="scope" >{{addCardBtnShow === true ? (scope.row.price ? scope.row.price : '--') : String(scope.row.expirytime).substr(0, 10) === '9999-12-31' ? '无限期' : scope.row.expirytime | format}}</template>
        </el-table-column>
        <!-- <el-table-column
          prop="handcard"
          :label="addCardBtnShow === true ? '创建人' : '余额'">
          <template slot-scope="scope">
            <span v-if='addCardBtnShow === true'>{{scope.row.cardname}}</span>
            <span v-else>
              <span v-if='scope.row.vipcards.cardsubtype === 1'>{{scope.row.curbuy ? scope.row.curbuy + '元' : '-'}}</span>
              <span v-else-if='scope.row.vipcards.cardsubtype === 2'>-</span>
              <span v-else>-</span>
            </span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="handcard"
          label="余额" v-if='addCardBtnShow !== true'>
          <template slot-scope="scope">
            <span v-if='scope.row.vipcards.cardsubtype === 1'>{{scope.row.curbuy ? scope.row.curbuy + '元' : '-'}}</span>
            <span v-else-if='scope.row.vipcards.cardsubtype === 2'>-</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="有效期" v-if='addCardBtnShow !== true'>
          <template slot-scope="scope">
              <span v-if='scope.row.vipcards.cardsubtype === 1'>{{scope.row.validity}}</span>
              <span v-else-if='scope.row.vipcards.cardsubtype === 2'>-</span>
              <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="次数" width='80' v-if='addCardBtnShow !== true'>
          <template slot-scope="scope">
              <span v-if='scope.row.vipcards.cardsubtype === 1'>-</span>
              <span v-else-if='scope.row.vipcards.cardsubtype === 2'>{{scope.row.curbuy ? scope.row.curbuy + '次' : '-'}}</span>
              <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="returntime"
          :label="addCardBtnShow === true ? '创建时间' : '会员卡状态'">
          <template slot-scope="scope">
            <span v-if='addCardBtnShow === true'>{{scope.row.createdAt}}</span>
            <span v-else>
              <span v-if='scope.row.cardstatus === 1'>正常</span>
              <span v-else-if='scope.row.cardstatus === 2' style='color: #f40'>已耗尽</span>
              <span v-else-if='scope.row.cardstatus === 3' style='color: #f40'>已过期</span>
              <span v-else-if='scope.row.cardstatus === 4' style='color: #f40'>过期耗尽</span>
              <span v-else-if='scope.row.cardstatus === 5' style='color: #f40'>请假</span>
              <span v-else-if='scope.row.cardstatus === 6' style='color: #f40'>停卡</span>
              <span v-else-if='scope.row.cardstatus === 8' style='color: #f40'>未开卡</span>
              <!-- <span v-else class="OrangeRed">销卡</span> -->
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="购买时间"
          width='180'
          v-if='!addCardBtnShow'>
          <template slot-scope="scope">
            {{addCardBtnShow === true ? scope.row.returntime : scope.row.createdAt}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width='210' class-name="operate">
          <template slot-scope="scope">
            <span v-if='addCardBtnShow === true'>
              <!-- <el-button type="primary" size="mini" class="DoderBlue" v-if='addCardBtnShow && scope.row.onsale === 1' @click='stopUse(scope.row)'>停用</el-button> -->
              <!-- <el-button type="primary" size="mini" class="DoderBlue" v-if='addCardBtnShow && scope.row.onsale === 2' @click='recoverUse(scope.row)'>恢复</el-button> -->
              <el-button type="primary" size="mini" class="DoderBlue" v-if='addCardBtnShow' @click='stopUse(scope.row)' :disabled="scope.row.onsale === '停用'">停用</el-button>
              <el-button type="primary" size="mini" class="DoderBlue" v-if='addCardBtnShow' @click='recoverUse(scope.row)' :disabled="scope.row.onsale === '正常'">恢复</el-button>
              <el-button type="danger" size="mini" class="OrangeRed" v-if='addCardBtnShow' @click='deleteMemberCard(scope.row)'>删除</el-button>
            </span>
            <span v-else>
              <el-button type="primary" size="mini" class="DoderBlue" @click='continueCard(scope.row)'>续卡</el-button>
              <el-button type="primary" size="mini" class="green" @click='transferCard(scope.row)'>转卡</el-button>
              <el-button type="primary" size="mini" class="Orange" @click='memberCardChargeBtn(scope.row)'>扣费</el-button>
              <el-button type="danger" size="mini" class="OrangeRed" @click='recoverCard(scope.row)' v-if='scope.row.cardstatus === 6'>恢复</el-button>
              <el-button type="danger" size="mini" class="OrangeRed" @click='stopCard(scope.row)' v-else>停用</el-button>

            </span>
          </template>
        </el-table-column>
      </el-table>
      <el-checkbox  @change="selectAll()" class='checkAllDisabled' style='position: absolute; top: 3%; left: 10px; z-index: 99' v-if='entireShow' :disabled='singleDisabled'></el-checkbox>
      <!-- <el-pagination
        background
        v-if='addCardBtnShow === true'
        :total="addCardBtnShow === true ? getAllMemberCount : memberCardBuyCount"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next, sizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        >
      </el-pagination> -->
      <div style="text-align: center;margin: 10px 0;">
        <el-pagination background layout="total, prev, pager, next, sizes" :pageLength="pageLength" :currentPage.sync="currentPage" :total="getmemberCards.length" @current-change="currentChange" v-if='addCardBtnShow === true'></el-pagination>
        <el-pagination background layout="total, prev, pager, next, sizes" :pageLength="pageLength" :currentPage.sync="currentPage" :total="memberCardBuy.length" @current-change="currentChange" v-else></el-pagination>
      </div>
    </div>
    <addMemberCard v-if='addMemberCardShow'></addMemberCard>
    <batchCourse v-if='batchCourseShow' :checkList='checkList'></batchCourse>
    <memberCardCharge v-if='memberCardChargeShow' :memberCardChargeParams='memberCardChargeParams'></memberCardCharge>
  </div>
</template>
<script>
import ImportExcel from '../components/ImportExcel'
import ExportExcel from '../components/ExportExcel'
import { searchDate } from '@/api/sign'
import { QueryAllBVCard, stopCard } from '@/api/buyvipcard'
import { getMemberCard, updateVonsale, RecoveryCard } from '@/api/vipcard'
import { deleteVipCardHandle } from '@/async/vipcards'
import addMemberCard from '@/components/addMemberCard'
import batchCourse from '@/components/batchCourse'
import memberCardCharge from '@/components/memberCardCharge'
// import batchCourseVue from './batchCourse.vue'
export default {
  components: {
    addMemberCard,
    memberCardCharge,
    batchCourse,
    ExportExcel,
    ImportExcel
  },
  data () {
    return {
      activeName: 'card',
      addCardBtnShow: true,
      name: undefined,
      number: '',
      data: '',
      options: [],
      value: '',
      getRowKeys (row) {
        return row.iid
      },
      memberState: undefined,
      memberStates: [
        {
          value: 1,
          name: '正常'
        },
        {
          value: 2,
          name: '已耗尽'
        },
        {
          value: 3,
          name: '已过期'
        },
        {
          value: 4,
          name: '过期耗尽'
        },
        {
          value: 5,
          name: '请假'
        },
        {
          value: 6,
          name: '停卡'
        },
        {
          value: 8,
          name: '未开卡'
        }
      ],
      state: undefined,
      states: [
        {
          value: 1,
          name: '正常'
        },
        {
          value: 2,
          name: '已耗尽'
        },
        {
          value: 3,
          name: '已过期'
        },
        {
          value: 4,
          name: '过期耗尽'
        },
        {
          value: 5,
          name: '请假'
        },
        {
          value: 6,
          name: '停卡'
        },
        {
          value: 8,
          name: '未开卡'
        }
      ],
      type: undefined,
      types: [
        {
          uid: 1,
          name: '期限卡'
        },
        {
          uid: 2,
          name: '次卡'
        },
        {
          uid: 3,
          name: '储值卡'
        }
      ],
      param: '',
      addMemberCardShow: false,
      entireShow: false,
      getmemberCards: [],
      getAllMemberCount: 0,
      memberCardBuyCount: 0,
      memberCardBuy: [],
      curPage: 1,
      pageCount: 10000,
      memberCardChargeShow: false,
      memberSignin: [],
      loading: false,
      sels: [],
      batchCourseShow: false,
      checkList: [],
      currentPage: 1,
      pageLength: 10,
      singleDisabled: false,
      tName: '会员卡种类',
      list: [],
      tHeader: [],
      tValue: [],
      importExcelAbled: true
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  mounted () {
    this.getMemberCardList()
  },
  created () {
    this.importExcelAbled = true
  },
  methods: {
    currentChange (currentPage) {
      this.currentPage = currentPage
    },
    selectAll () {
      if (this.checkList.length === 0) {
        let list = []
        for (let i of this.memberCardBuy) {
          list.push(i)
        }
        this.checkList = list
      } else {
        this.checkList = []
      }
    },
    selectRow (row) {
      let result = this.checkList.find(o => o.iid === row.iid)
      if (!result) {
        this.checkList.push(row)
      }
    },
    unselectRow (row) {
      let idx = this.checkList.findIndex(o => o.iid === row.iid)
      if (idx !== -1) {
        this.checkList.splice(idx, 1)
      }
    },
    selsChange (sels) {
      this.sels = sels
    },
    cardSelect (e) {
      if (e === null) {
        this.memberState = undefined
      } else {
        this.memberState = e
      }
      this.getMemberCardList()
    },
    cardBuyStatus (e) {
      if (e === null) {
        this.state = undefined
      } else {
        this.state = e
      }
      this.QueryAllBVCard()
    },
    cardTypeBuySelect (e) {
      if (e === null) {
        this.type = undefined
      } else {
        this.type = e
      }
      this.QueryAllBVCard()
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
      this.QueryAllBVCard()
    },
    continueCard (r) {
      this.$router.push({name: 'RenewalCard', params: {list: [r.members.pdmembers.username, r.expirytime, r.vipcards.cardsubtype, r.curbuy, r.uid]}})
      localStorage.setItem('cardParams', [r.members.pdmembers.username, r.expirytime, r.vipcards.cardsubtype, r.curbuy, r.uid])
    },
    transferCard (v) {
      this.$router.push({name: 'transferCard', params: {list: ['memberCard', v.vipcards.cardname, v.entitycardid, v.vipcards.cardsubtype, v.totalbuy, v.curbuy, v.expirytime, v.opencardtime, v.uid, v.memberid]}})
      localStorage.setItem('list', ['memberCard', v.vipcards.cardname, v.entitycardid, v.vipcards.cardsubtype, v.totalbuy, v.curbuy, v.expirytime, v.opencardtime, v.uid, v.memberid])
    },
    memberCardChargeBtn (v) {
      this.memberCardChargeParams = [v.createdAt, v.expirytime, v.vipcards.cardsubtype, v.members.pdmembers.username, v.curbuy, v.totalbuy, v.uid]
      this.memberCardChargeShow = true
    },
    memberCardChargeCloseEvent () {
      this.memberCardChargeShow = false
    },
    stopCard (e) {
      this.$confirm(`停用后会员卡无法继续使用, 确认是否停止使用?`, '会员卡停用提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        stopCard({
          vipcardmapid: e.uid
        }).then(res => {
          if (res) {
            this.QueryAllBVCard()
            this.$message({
              type: 'success',
              message: '停用成功'
            })
          }
        })
      }).catch(() => {
      })
    },
    recoverCard (e) {
      RecoveryCard({
        vipcardmapid: e.uid
      }).then(res => {
        if (res.code === 200) {
          this.QueryAllBVCard()
          this.$message({
            type: 'success',
            message: '恢复成功'
          })
        }
      })
    },
    QueryAllBVCardData () {
      this.$store.commit('setLoading', true)
      QueryAllBVCard({
        curPage: 1,
        pageCount: 10000
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.memberCardBuy = data.allInfos
          this.memberCardBuyCount = data.count
        }
      })
    },
    QueryAllBVCard () {
      QueryAllBVCard({
        curPage: 1,
        pageCount: 10000,
        memberid: this.name,
        cardsubtype: this.type,
        cardstatus: this.state
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          data.allInfos.map(v => {
            v.cardname = v.vipcards.cardname
            v.username = v.members.pdmembers.username
          })
          this.memberCardBuy = data.allInfos
          this.memberCardBuyCount = data.count
          this.tName = '会员卡'
          this.tHeader = ['会员卡号', '会员卡名称', '绑定会员', '生效时间', '失效时间', '余额', '有效期', '次数', '会员卡状态', '购买时间']
          this.tValue = ['entitycardid', `cardname`, 'username', 'opencardtime', 'expirytime', 'curbuy', 'validity', 'curbuy', 'cardstatus', 'createdAt']
          for (let i = 0; i < this.memberCardBuy.length; i++) {
            let temp2 = this.memberCardBuy[i].validity ? this.memberCardBuy[i].validity + '天' : '-'
            this.memberCardBuy[i].validity = temp2
            this.list = this.memberCardBuy
          }
          // singleDisabled
          for (let i = 0; i < this.memberCardBuy.length; i++) {
            if (Number(this.memberCardBuy[i].cardstatus) === 5) {
              this.singleDisabled = true
              return
            } else {
              this.singleDisabled = false
            }
          }
        }
      })
    },
    getMemberCardListData () {
      getMemberCard({
        pageCount: 10000,
        curPage: this.curPage
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.getmemberCards = data.allCards
        }
      })
    },
    getMemberCardList () {
      getMemberCard({
        pageCount: this.pageCount,
        curPage: this.curPage,
        onsale: this.memberState
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.getmemberCards = data.allCards
          this.getAllMemberCount = data.count
          this.tName = '会员卡种类'
          this.tHeader = ['会员卡', '状态', '会员卡类型', '显示权重', '售价', '创建时间']
          this.tValue = ['cardname', 'onsale', 'cardsubtype', 'recommendWeight', 'price', 'createdAt']
          for (let i = 0; i < this.getmemberCards.length; i++) {
            let temp1 = this.getmemberCards[i].onsale === 1 ? '正常' : '停用'
            this.getmemberCards[i].onsale = temp1
            let temp2
            if (this.getmemberCards[i].cardsubtype === 1) {
              temp2 = '期限卡'
            } else if (this.getmemberCards[i].cardsubtype === 2) {
              temp2 = '次卡'
            } else {
              temp2 = '储值卡'
            }
            this.getmemberCards[i].cardsubtype = temp2
            this.list = this.getmemberCards
            // <span v-if='scope.row.cardsubtype === 1'>期限卡</span>
            //   <span v-else-if='scope.row.cardsubtype === 2'>次卡</span>
            //   <span v-else>储值卡</span>
          }
          // this.types = data.allCards.map(item => { return {name: item.cardname, uid: item.uid} })
        }
      })
    },
    signin () {},
    addMemberCard () {
      this.addMemberCardShow = true
    },
    entire () {
      if (this.entireShow === true) {
        var servids = this.checkList.map(item => item.iid)
        if (servids.length === 0) {
          this.$alert('请选择要请假的人员', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          })
        } else {
          this.batchCourseShow = true
          this.singleDisabled = true
        }
      } else {
        this.entireShow = true
      }
    },
    batchCourseEventClose () {
      this.batchCourseShow = false
    },
    cancel () {
      this.entireShow = false
      this.$nextTick(_ => {
        this.$refs.tableData.clearSelection()
      })
    },
    stopUse (e) {
      this.$confirm(`停用后不可以再购买该会员卡`, '是否停用该会员卡？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateVonsale({
          uid: e.uid,
          onsale: 2
        }).then(res => {
          if (res.code === 200) {
            this.getMemberCardList()
            this.$message({
              type: 'success',
              message: '停用成功'
            })
          }
        })
      }).catch(() => {
      })
    },
    recoverUse (e) {
      updateVonsale({
        uid: e.uid,
        onsale: 1
      }).then(res => {
        if (res.code === 200) {
          this.getMemberCardList()
          this.$message({
            type: 'success',
            message: '恢复成功'
          })
        }
      })
    },
    deleteMemberCard (e) {
      this.$confirm(`已经有会员购买的会员卡无法删除`, '确认要删除这张会员卡吗？', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVipCardHandle([e.uid]).then(res => {
          if (res.code === 200) {
            this.getMemberCardList()
          }
        })
      }).catch(() => {
      })
    },
    getData () {},
    handleClick (el) {
      switch (el.name) {
        case 'card':
          this.addCardBtnShow = true
          this.importExcelAbled = true
          // this.getMemberCardList()
          this.entireShow = false
          this.reset()
          break
        case 'cardBuy':
          this.addCardBtnShow = false
          this.importExcelAbled = false
          // this.QueryAllBVCard()
          this.reset()
          break
        default:
          break
      }
    },
    addMemberCardEventClose () {
      this.addMemberCardShow = false
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getMemberCardList()
      this.QueryAllBVCard()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getMemberCardList()
      this.QueryAllBVCard()
    },
    reset () {
      this.state = undefined
      this.type = undefined
      this.name = undefined
      this.memberState = undefined
      if (this.activeName === 'card') {
        this.$store.commit('setLoading', true)
        this.getMemberCardList()
      } else {
        this.$store.commit('setLoading', true)
        this.QueryAllBVCard()
      }
    }
  },
  filters: {
    format (time) {
      if (time === '' || time === undefined) return ''
      return String(time).substr(0, 10)
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/member.styl'
</style>
