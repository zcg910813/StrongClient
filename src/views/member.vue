<template>
  <div class="appMain">
    <div class="add-store-btn">
      <Import-excel :importExcelAbled='importExcelAbled'></Import-excel>
      <export-excel :list="list" :tHeader="tHeader" :tValue="tValue" :filename='tName'></export-excel>
      <el-button type="primary" @click='addMember'>添加会员</el-button>
    </div>
    <div class="center-top-modal">
      <el-form ref="form">
        <el-form-item label="筛选条件:" class="search-term search-tip">
          <el-select v-model="from" placeholder="来源信息" @change='fromChange' clearable>
            <el-option
              v-for="item in froms"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="belong" placeholder="所属会籍" @change='belongSearch' clearable>
            <el-option
              v-for="item in belongs"
              :key="item.uid"
              :label="item.name"
              :value="item.uid">
            </el-option>
          </el-select>
          <el-select v-model="sex" placeholder="性别" @change='sexSearch' clearable>
            <el-option
              v-for="item in sexIncludes"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="coach" placeholder="所属教练" @change='coachSearch' clearable>
            <el-option
              v-for="item in coachs"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
            <el-select
              v-model="name"
              filterable
              remote
              clearable
              reserve-keyword
              placeholder="请输入会员名称或电话"
              :remote-method="remoteMethod"
              @change='selectChange'
              :loading="loading">
              <el-option
                v-for="(item, i) in memberSignin"
                :key="i"
                :label="item.username + (item.cellphone ? '(' + item.cellphone + ')' : '')"
                :value="item.uid">
              </el-option>
            </el-select>
          <span @click='reset' class="screen" style='margin-left: 20px;'>清空筛选条件</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-modal">
      <el-tabs value='all' @tab-click="handleClick" >
        <el-tab-pane label="全部会员" name="all"><h5>会员数量: {{count}}</h5></el-tab-pane>
        <el-tab-pane label="有效会员" name="effective"><h5>有效会员: {{count}}</h5></el-tab-pane>
        <el-tab-pane label="潜在会员" name="potential"><h5>潜在会员: {{count}}</h5></el-tab-pane>
        <el-tab-pane label="过期会员" name="overdue"><h5>过期会员: {{count}}</h5></el-tab-pane>
        <el-tab-pane label="体验卡会员" name="experience"><h5>体验卡会员: {{count}}</h5></el-tab-pane>
        <el-tab-pane label="租柜会员" name="cabinet"><h5>租柜会员: {{count}}</h5></el-tab-pane>
        <el-tab-pane label="请假会员" name="leaveMember"><h5>请假会员: {{count}}</h5></el-tab-pane>
      </el-tabs>
      <el-table :data='members.slice((currentPage - 1) * pageLength, currentPage * pageLength)' border style="width: 100%" id='exportTab'>
        <el-table-column prop="username" width='90' label="会员名称"></el-table-column>
        <el-table-column label="性别" width='65'>
          <template slot-scope="scope">
              {{scope.row.sex}}
          </template>
        </el-table-column>
        <el-table-column :label="effectiveShow === true ? '归属教练' : '会员卡'" v-if='leaveMemberShow'>
          <template slot-scope="scope">
              <span v-if='effectiveShow === true'>{{scope.row.coachname ? scope.row.coachname : '-'}}</span>
              <span v-else v-for='(i, idx) in scope.row.cardname' :key='idx'>{{idx !==scope.row.cardname.length-1 ? i + '、' : i}}</span>
          </template>
        </el-table-column>
        <el-table-column label='请假开始时间' prop='leavestarttime' v-if='!leaveMemberShow'></el-table-column>
        <el-table-column label='请假结束时间' prop='leaveendtime' v-if='!leaveMemberShow'></el-table-column>
        <el-table-column label="归属会籍" v-if='effectiveShow && leaveMemberShow'>
          <template slot-scope="scope">
            <!-- {{belongData.find((o) => o.id === Number(scope.row.belong)) ? belongData.find((o) => o.id === Number(scope.row.belong)).name : '-'}} -->
            {{scope.row.belong}}
          </template>
        </el-table-column>
        <el-table-column prop="cellphone" label="手机号" width='120' v-if='leaveMemberShow'></el-table-column>
        <el-table-column label="来源" v-if='leaveMemberShow'>
          <template slot-scope="scope">
            {{scope.row.from}}
          </template>
        </el-table-column>
        <el-table-column label="生日" width='120'>
          <template slot-scope="scope">
              {{scope.row.birthday ? scope.row.birthday : '-'}}
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="注册时间" width='160'></el-table-column>
        <el-table-column
          label="操作"
          width='210'
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click.stop='detail(scope.row)'>详情</el-button>
            <el-button type="primary" size="mini" class="Orange" @click.stop='edit(scope.row)'>编辑</el-button>
            <!-- <el-button type="danger" size="mini" class="OrangeRed" @click.stop='deleteMember(scope.row)'>删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background layout="total, prev, pager, next, sizes" :pageLength="pageLength" :currentPage.sync="currentPage" :total="members.length" @current-change="currentChange"></el-pagination>
    </div>
  </div>
</template>
<script>
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
import ImportExcel from '../components/ImportExcel'
import ExportExcel from '../components/ExportExcel'
import { searchDate } from '@/api/sign'
import { getCoachData, getMemberData, getAllWorker } from '@/api/data'
import { queryEffectiveHandle, queryPotentialHandle, expiredMemberHandle, experienceMemberHandle, cabinetMemberHandle, HandleleaveMemberData } from '@/async/members'
export default {
  components: {
    ExportExcel,
    ImportExcel
  },
  data () {
    return {
      activeName: 'all',
      number: '',
      data: '',
      options: [],
      value: '',
      members: [],
      count: 0,
      name: undefined,
      from: undefined,
      froms: [
        {
          value: 1,
          label: '会籍带客'
        },
        {
          value: 2,
          label: '朋友介绍'
        },
        {
          value: 3,
          label: '网络广告'
        },
        {
          value: 4,
          label: '传单广告'
        },
        {
          value: 5,
          label: '场馆招牌'
        },
        {
          value: 6,
          label: '手机注册'
        },
        {
          value: 7,
          label: '自然到店'
        },
        {
          value: 8,
          label: '营销活动'
        }
      ],
      belong: undefined,
      belongs: [],
      date: '',
      sex: undefined,
      sexIncludes: [
        {
          value: '1',
          label: '男'
        },
        {
          value: '2',
          label: '女'
        }
      ],
      coach: undefined,
      coachs: [],
      searchData: {
        param: '',
        curPage: 1,
        pageCount: 10000
      },
      effectiveShow: true,
      clubList: [],
      belongData: [],
      memberSignin: [],
      loading: false,
      tName: '全部会员',
      list: [],
      tHeader: [],
      tValue: [],
      currentPage: 1,
      pageLength: 10,
      leaveMemberShow: true,
      importExcelAbled: true
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    getAllWorker({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data
        this.belongData = data.employees
        for (let v of data.employees) {
          this.belongs.push({name: v.name + ' ' + '(' + v.cellphone + ')', uid: v.id})
        }
      }
    })
    this.getAllMember()
    getCoachData({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      if (res.code === 200) {
        for (let v of res.data.coachs) {
          this.coachs.push({name: v.name + ' ' + '(' + v.cellphone + ')', id: v.id})
        }
      }
    })
  },
  mounted () {
    this.date = new Date()
    this.effectiveShow = true
    this.leaveMemberShow = true
  },
  methods: {
    currentChange (currentPage) {
      this.currentPage = currentPage
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
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
      this.getAllMember()
    },
    reset () {
      this.name = undefined
      this.state = undefined
      this.from = undefined
      this.belong = undefined
      this.date = undefined
      this.sex = undefined
      this.coach = undefined
      this.getAllMember()
    },
    fromChange (e) {
      if (e === null) {
        this.from = undefined
      } else {
        this.from = e
      }
      this.getAllMember()
    },
    belongSearch (e) {
      if (e === null) {
        this.belong = undefined
      } else {
        this.belong = e
      }
      this.getAllMember()
    },
    sexSearch (e) {
      if (e === null) {
        this.sex = undefined
      } else {
        this.sex = e
      }
      this.getAllMember()
    },
    coachSearch (e) {
      this.coach = e
      this.getAllMember()
    },
    detail (e) {
      this.$router.push({name: 'memberInfoDetail', params: {memberDetailParamId: e.uid}})
      localStorage.setItem('memberDetailParamId', e.uid)
    },
    handleClick (tab) {
      if (tab.name === this.activeName) { return }
      this.activeName = tab.name
      this.queryMemberHandle()
      if (tab.name === 'effective' || tab.name === 'overdue') {
        this.effectiveShow = false
      } else {
        this.effectiveShow = true
      }
      if (tab.name === 'leaveMember') {
        this.leaveMemberShow = false
      } else {
        this.leaveMemberShow = true
      }
    },
    getAllMemberData () {
      getMemberData({
        curPage: this.searchData.curPage,
        pageCount: 10000
      }).then(res => {
        this.$store.commit('setLoading', false)
        if (res.code === 200) {
          let data = res.data.allMembers
          this.members = data.allMembers
          this.count = data.count
        }
      })
    },
    getAllMember () {
      getMemberData({
        curPage: this.searchData.curPage,
        pageCount: this.searchData.pageCount,
        from: this.from,
        belong: this.belong,
        sex: this.sex,
        coach: this.coach,
        uid: this.name
      }).then(res => {
        this.$store.commit('setLoading', false)
        if (res.code === 200) {
          let data = res.data.allMembers
          this.members = data.allMembers
          this.count = data.count
          this.tName = '全部会员'
          this.tHeader = ['会员名称', '性别', '归属教练', '归属会籍', '手机号', '来源', '生日', '注册时间']
          this.tValue = ['username', 'sex', 'coachname', 'belong', 'cellphone', 'from', 'birthday', 'createdAt']
          for (var i = 0; i < this.members.length; i++) {
            let temp1 = this.members[i].sex === 1 ? '男' : '女'
            let temp2 = this.members[i].coachname === '' || this.members[i].coachname === undefined ? '-' : this.members[i].coachname
            let temp3 = this.belongData.find((o) => o.id === Number(this.members[i].belong)) ? this.belongData.find((o) => o.id === Number(this.members[i].belong)).name : '-'
            let temp4
            if (this.members[i].from === '1') {
              temp4 = '会籍带客'
            } else if (this.members[i].from === '2') {
              temp4 = '朋友介绍'
            } else if (this.members[i].from === '3') {
              temp4 = '网络广告'
            } else if (this.members[i].from === '4') {
              temp4 = '传单广告'
            } else if (this.members[i].from === '5') {
              temp4 = '场馆招牌'
            } else if (this.members[i].from === '6') {
              temp4 = '手机注册'
            } else if (this.members[i].from === '7') {
              temp4 = '自然到店'
            } else if (this.members[i].from === '8') {
              temp4 = '营销活动'
            } else {
              temp4 = '-'
            }

            this.members[i].sex = temp1
            this.members[i].coachname = temp2
            this.members[i].belong = temp3
            this.members[i].from = temp4
            this.list = this.members
          }
        }
      })
    },
    queryMemberHandle () {
      if (this.activeName === 'all') {
        this.$store.commit('setLoading', true)
        this.getAllMember()
      } else if (this.activeName === 'effective') {
        this.$store.commit('setLoading', true)
        queryEffectiveHandle(this.searchData).then(res => {
          if (res.code === 200) {
            this.$store.commit('setLoading', false)
            let data = res.data.allMembers
            this.members = data.infoVec
            this.count = data.count
            this.tName = '有效会员'
            this.tHeader = ['会员名称', '性别', '会员卡', '手机号', '来源', '生日', '注册时间']
            this.tValue = ['username', 'sex', 'cardname', 'cellphone', 'from', 'birthday', 'createdAt']
            for (var i = 0; i < this.members.length; i++) {
              let temp1 = this.members[i].sex === 1 ? '男' : '女'
              let temp2
              if (this.members[i].from === '1') {
                temp2 = '会籍带客'
              } else if (this.members[i].from === '2') {
                temp2 = '朋友介绍'
              } else if (this.members[i].from === '3') {
                temp2 = '网络广告'
              } else if (this.members[i].from === '4') {
                temp2 = '传单广告'
              } else if (this.members[i].from === '5') {
                temp2 = '场馆招牌'
              } else if (this.members[i].from === '6') {
                temp2 = '手机注册'
              } else if (this.members[i].from === '7') {
                temp2 = '自然到店'
              } else if (this.members[i].from === '8') {
                temp2 = '营销活动'
              } else {
                temp2 = '-'
              }

              this.members[i].sex = temp1
              this.members[i].from = temp2
              this.list = this.members
            }
          }
        })
      } else if (this.activeName === 'potential') {
        this.$store.commit('setLoading', true)
        queryPotentialHandle(this.searchData).then(res => {
          if (res.code === 200) {
            this.$store.commit('setLoading', false)
            if (res.data.allMembers.infoVec.length > 0) {
              let data = res.data.allMembers
              this.members = data.infoVec
              this.count = data.count
              this.tName = '潜在会员'
              this.tHeader = ['会员名称', '性别', '归属教练', '归属会籍', '手机号', '来源', '生日', '注册时间']
              this.tValue = ['username', 'sex', 'coachname', 'belong', 'cellphone', 'from', 'birthday', 'createdAt']
              for (var i = 0; i < this.members.length; i++) {
                let temp1 = this.members[i].sex === 1 ? '男' : '女'
                let temp2 = this.members[i].coachname === '' || this.members[i].coachname === undefined ? '-' : this.members[i].coachname
                let temp4
                if (this.members[i].from === '1') {
                  temp4 = '会籍带客'
                } else if (this.members[i].from === '2') {
                  temp4 = '朋友介绍'
                } else if (this.members[i].from === '3') {
                  temp4 = '网络广告'
                } else if (this.members[i].from === '4') {
                  temp4 = '传单广告'
                } else if (this.members[i].from === '5') {
                  temp4 = '场馆招牌'
                } else if (this.members[i].from === '6') {
                  temp4 = '手机注册'
                } else if (this.members[i].from === '7') {
                  temp4 = '自然到店'
                } else if (this.members[i].from === '8') {
                  temp4 = '营销活动'
                } else {
                  temp4 = '-'
                }

                this.members[i].sex = temp1
                this.members[i].coachname = temp2
                this.members[i].from = temp4
                this.list = this.members
              }
            } else {
              this.members = []
              this.list = []
              this.count = 0
            }
          }
        })
      } else if (this.activeName === 'overdue') {
        this.$store.commit('setLoading', true)
        expiredMemberHandle(this.searchData).then(res => {
          if (res.code === 200) {
            this.$store.commit('setLoading', false)
            if (res.data.allMembers.infoVec.length > 0) {
              let data = res.data.allMembers
              this.members = data.infoVec
              this.count = data.count
              this.tName = '过期会员'
              this.tHeader = ['会员名称', '性别', '会员卡', '手机号', '来源', '生日', '注册时间']
              this.tValue = ['username', 'sex', 'cardname', 'cellphone', 'from', 'birthday', 'createdAt']
              for (var i = 0; i < this.members.length; i++) {
                let temp1 = this.members[i].sex === 1 ? '男' : '女'
                let temp4
                if (this.members[i].from === '1') {
                  temp4 = '会籍带客'
                } else if (this.members[i].from === '2') {
                  temp4 = '朋友介绍'
                } else if (this.members[i].from === '3') {
                  temp4 = '网络广告'
                } else if (this.members[i].from === '4') {
                  temp4 = '传单广告'
                } else if (this.members[i].from === '5') {
                  temp4 = '场馆招牌'
                } else if (this.members[i].from === '6') {
                  temp4 = '手机注册'
                } else if (this.members[i].from === '7') {
                  temp4 = '自然到店'
                } else if (this.members[i].from === '8') {
                  temp4 = '营销活动'
                } else {
                  temp4 = '-'
                }

                this.members[i].sex = temp1
                this.members[i].from = temp4
                this.list = this.members
              }
            } else {
              this.members = []
              this.list = []
              this.count = 0
            }
          }
        })
      } else if (this.activeName === 'experience') {
        this.$store.commit('setLoading', true)
        experienceMemberHandle(this.searchData).then(res => {
          if (res.code === 200) {
            this.$store.commit('setLoading', false)
            if (res.data.allMembers.infoVec.length > 0) {
              this.members = res.allMembers.infoVec
              this.count = res.allMembers.count
              this.tName = '体验卡会员'
              this.tHeader = ['会员名称', '性别', '归属教练', '归属会籍', '手机号', '来源', '生日', '注册时间']
              this.tValue = ['username', 'sex', 'coachname', 'belong', 'cellphone', 'from', 'birthday', 'createdAt']
              for (var i = 0; i < this.members.length; i++) {
                let temp1 = this.members[i].sex === 1 ? '男' : '女'
                let temp2 = this.members[i].coachname === '' || this.members[i].coachname === undefined ? '-' : this.members[i].coachname
                let temp3 = this.belongData.find((o) => o.id === Number(this.members[i].belong)) ? this.belongData.find((o) => o.id === Number(this.members[i].belong)).name : '-'
                let temp4
                if (this.members[i].from === '1') {
                  temp4 = '会籍带客'
                } else if (this.members[i].from === '2') {
                  temp4 = '朋友介绍'
                } else if (this.members[i].from === '3') {
                  temp4 = '网络广告'
                } else if (this.members[i].from === '4') {
                  temp4 = '传单广告'
                } else if (this.members[i].from === '5') {
                  temp4 = '场馆招牌'
                } else if (this.members[i].from === '6') {
                  temp4 = '手机注册'
                } else if (this.members[i].from === '7') {
                  temp4 = '自然到店'
                } else if (this.members[i].from === '8') {
                  temp4 = '营销活动'
                } else {
                  temp4 = '-'
                }

                this.members[i].sex = temp1
                this.members[i].coachname = temp2
                this.members[i].belong = temp3
                this.members[i].from = temp4
                this.list = this.members
              }
            } else {
              this.members = []
              this.list = []
              this.count = 0
            }
          }
        })
      } else if (this.activeName === 'cabinet') {
        this.$store.commit('setLoading', true)
        cabinetMemberHandle(this.searchData).then(res => {
          if (res.code === 200) {
            this.$store.commit('setLoading', false)
            if (res.data.info.length > 0) {
              this.members = res.allMembers.infoVec
              this.count = res.allMembers.count
              this.tName = '租柜会员'
              this.tHeader = ['会员名称', '性别', '归属教练', '归属会籍', '手机号', '来源', '生日', '注册时间']
              this.tValue = ['username', 'sex', 'coachname', 'belong', 'cellphone', 'from', 'birthday', 'createdAt']
              for (var i = 0; i < this.members.length; i++) {
                let temp1 = this.members[i].sex === 1 ? '男' : '女'
                let temp2 = this.members[i].coachname === '' || this.members[i].coachname === undefined ? '-' : this.members[i].coachname
                let temp3 = this.belongData.find((o) => o.id === Number(this.members[i].belong)) ? this.belongData.find((o) => o.id === Number(this.members[i].belong)).name : '-'
                let temp4
                if (this.members[i].from === '1') {
                  temp4 = '会籍带客'
                } else if (this.members[i].from === '2') {
                  temp4 = '朋友介绍'
                } else if (this.members[i].from === '3') {
                  temp4 = '网络广告'
                } else if (this.members[i].from === '4') {
                  temp4 = '传单广告'
                } else if (this.members[i].from === '5') {
                  temp4 = '场馆招牌'
                } else if (this.members[i].from === '6') {
                  temp4 = '手机注册'
                } else if (this.members[i].from === '7') {
                  temp4 = '自然到店'
                } else if (this.members[i].from === '8') {
                  temp4 = '营销活动'
                } else {
                  temp4 = '-'
                }

                this.members[i].sex = temp1
                this.members[i].coachname = temp2
                this.members[i].belong = temp3
                this.members[i].from = temp4
                this.list = this.members
              }
            } else {
              this.members = []
              this.list = []
              this.count = 0
            }
          }
        })
      } else if (this.activeName === 'leaveMember') {
        this.$store.commit('setLoading', true)
        HandleleaveMemberData(this.searchData).then(res => {
          if (res.code === 200) {
            this.$store.commit('setLoading', false)
            if (res.data.info.infoVec.length > 0) {
              this.members = res.data.info.infoVec
              this.count = res.data.info.count
              this.tName = '请假会员'
              this.tHeader = ['会员名称', '性别', '请假开始时间', '请假结束时间', '手机号', '生日', '注册时间']
              this.tValue = ['username', 'sex', 'leavestarttime', 'leaveendtime', 'cellphone', 'birthday', 'createdAt']
              for (var i = 0; i < this.members.length; i++) {
                let temp1 = this.members[i].sex === 1 ? '男' : '女'
                let temp2 = this.members[i].leavestarttime === '' || this.members[i].leavestarttime === undefined ? '-' : this.members[i].leavestarttime
                let temp3 = this.members[i].leaveendtime === '' || this.members[i].leaveendtime === undefined ? '-' : this.members[i].leaveendtime
                this.members[i].sex = temp1
                this.members[i].leavestarttime = temp2
                this.members[i].leaveendtime = temp3
                this.list = this.members
              }
            } else {
              this.members = []
              this.list = []
              this.count = 0
            }
          }
        })
      }
    },
    addMember () {
      this.$router.push({name: 'addMember', params: {addMemberId: null}})
      localStorage.setItem('addMemberId', null)
    },
    edit (val) {
      this.$router.push({name: 'addMember', params: {addMemberId: val.uid}})
      localStorage.setItem('addMemberId', val.uid)
    },
    // deleteMember (val) {
    //   this.$confirm('确定要删除该会员信息吗?', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     deleteMembers({uids: [val.uid]}).then(res => {
    //       this.getAllMember()
    //     })
    //   })
    // },
    handleCurrentChange (curPage) {
      this.searchData.curPage = curPage
      this.getAllMember()
    },
    handleSizeChange (pageSize) {
      this.searchData.pageCount = pageSize
      this.getAllMember()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/member.styl'
</style>
