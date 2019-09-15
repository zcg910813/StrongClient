<template>
  <div class="appMain">
    <div class="member-info-detail">
      <el-row :gutter="12">
        <el-col :span="24">
          <el-card shadow="hover">
            <div class="nav-list">
              <div @click='edit'>
                <span @mouseout="hover = ''" @mouseover="hover = 'edit'">
                  <img src="../assets/img/01.png" alt="" v-if="hover !== 'edit'">
                  <img src="../assets/img/011.png" alt="" v-else>
                </span>
                <span>编辑</span>
              </div>
              <!-- <div>
                <span @mouseout="hover = ''" @mouseover="hover = 'appoint'">
                  <el-dropdown placement='bottom' @click='handleAppoint'>
                    <div>
                      <img src="../assets/img/02.png" alt="" v-if="hover !== 'appoint'">
                      <img src="../assets/img/022.png" alt="" v-else>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item name='from'>指派会籍</el-dropdown-item>
                      <el-dropdown-item name='trainer'>指派跟进教练</el-dropdown-item>
                      <el-dropdown-item name='courseTrainer'>指派上课教练</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
                <span>指派</span>
              </div> -->
              <div>
                <div class='act'>
                  <img src="../assets/img/04.png" alt="">
                </div>
                <span>指派</span>
              </div>
              <div>
                <span @mouseout="hover = ''" @mouseover="hover = 'despoint'">
                  <el-dropdown placement='bottom' @command='handleDespointControl'>
                    <div>
                      <img src="../assets/img/03.png" alt="" v-if="hover !== 'despoint'">
                      <img src="../assets/img/033.png" alt="" v-else>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command='recover'>收押金</el-dropdown-item>
                      <el-dropdown-item command='despoint' disabled>押金</el-dropdown-item>
                      <el-dropdown-item command='returnDes'>收定金</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
                <span>订金/押金</span>
              </div>
              <!-- <div @click='RentCupboard'>
                <span @mouseout="hover = ''" @mouseover="hover = 'rent'">
                  <img src="../assets/img/04.png" alt="" v-if="hover !== 'rent'">
                  <img src="../assets/img/044.png" alt="" v-else>
                </span>
                <span>租柜</span>
              </div> -->
              <div>
                <div class='act'>
                  <img src="../assets/img/04.png" alt="">
                </div>
                <span>租柜</span>
              </div>
              <div>
                <span @mouseout="hover = ''" @mouseover="hover = 'others'">
                  <el-dropdown placement='bottom' @command='handleOthersControl'>
                    <div>
                      <img src="../assets/img/05.png" alt="" v-if="hover !== 'others'">
                      <img src="../assets/img/055.png" alt="" v-else>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command='rfid'>绑定/修改手环编号</el-dropdown-item>
                      <el-dropdown-item command='print' disabled>打合同</el-dropdown-item>
                      <el-dropdown-item command='message' disabled>发信息</el-dropdown-item>
                      <el-dropdown-item command='remind' disabled>写提醒</el-dropdown-item>
                      <el-dropdown-item command='follow'>写跟进</el-dropdown-item>
                      <el-dropdown-item command='integral' disabled>调积分</el-dropdown-item>
                      <el-dropdown-item command='water'>购买水费</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
                <span>其他操作</span>
              </div>
              <div>
                <span @mouseout="hover = ''" @mouseover="hover = 'buy'">
                  <el-dropdown placement='bottom' @command='handleBuyCards'>
                    <div>
                      <img src="../assets/img/06.png" alt="" v-if="hover !== 'buy'">
                      <img src="../assets/img/066.png" alt="" v-else>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command='memberCard'>买会员卡</el-dropdown-item>
                      <el-dropdown-item command='priCourse'>买私教课</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
                <span>购卡/私教课</span>
              </div>
              <!-- <div>
                <span @mouseout="hover = ''" @mouseover="hover = 'give'">
                  <img src="../assets/img/07.png" alt="" v-if="hover !== 'give'">
                  <img src="../assets/img/077.png" alt="" v-else>
                </span>
                <span>赠体验卡</span>
              </div> -->
              <div>
                <div class='act'>
                  <img src="../assets/img/07.png" alt="">
                </div>
                <span>赠体验卡</span>
              </div>
              <div @click='signinBtn'>
                <span @mouseout="hover = ''" @mouseover="hover = 'singin'">
                  <img src="../assets/img/08.png" alt="" v-if="hover !== 'singin'">
                  <img src="../assets/img/088.png" alt="" v-else>
                </span>
                <span>签到</span>
              </div>
              <div @click='selfOrderBtn'>
                <span @mouseout="hover = ''" @mouseover="hover = 'appo'">
                  <img src="../assets/img/09.png" alt="" v-if="hover !== 'appo'">
                  <img src="../assets/img/098.png" alt="" v-else>
                </span>
                <span>约课</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="12" class="member-info">
      <el-col :span="24">
        <el-card shadow="hover" class="">
          <div class='member-card'>
            <i class="_ctl_bRaduis"></i>
            <i class="_ctl_sRaduis"></i>
            <span><img src="../assets/img/02.png" alt=""></span>
          </div>
          <ul :model='info' class="member-lists">
            <li><span>会员姓名: {{info.username}}</span><span>手环编号: {{info.RFID ? info.RFID : '暂无'}}</span></li>
            <li><span>身份证号: {{info.idcard ? info.idcard : '暂无'}}</span><span>会籍归属: {{info.belong ? (belongData.find((o) => o.id === Number(info.belong)) ? belongData.find((o) => o.id === Number(info.belong)).name : '') : '暂无'}}</span></li>
            <li><span>出生日期: {{info.birthday ? info.birthday : '暂无'}}</span><span>注册日期: {{info.createdAt}}</span></li>
            <li><span>联系电话: {{info.cellphone ? info.cellphone : '无'}}</span><span>水费剩余: {{info.water ? info.water : 0}}分钟</span></li>
            <li><span>备注信息: {{info.remark ? info.remark : '暂无备注信息'}}</span><span>用户标签: {{info.tags ? info.tags : '暂无标签'}}</span></li>
          </ul>
        </el-card>
      </el-col>
    </el-row>
    <div class="detail-list">
      <el-row :gutter="12">
        <el-col :span="24">
          <el-card shadow="hover">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="会员分析" name="first">
                <el-row class="member-analysis">
                  <el-col :span="18">
                    <div class="grid-content bg-purple">
                      <div class="number">
                        <div>
                          <h3>近30天训练频率</h3>
                          <h1>{{frequency}} <span>天/次</span></h1>
                        </div>
                        <div>
                          <h3>近30天私教频率</h3>
                          <h1>{{priFrequency}} <span>天/节</span></h1>
                        </div>
                      </div>
                      <div class="singin-calendar">
                        <div id="calendar">
                          <h1>签到日历</h1>
                          <div class="month">
                            <ul>
                              <li class="year-month">
                                <div class="arrow" @click="pickPre(currentYear,currentMonth)">❮</div>
                                <span class="choose-year">{{ currentYear }}年</span>
                                <span class="choose-month">{{ currentMonth }}月</span>
                                <div class="arrow" @click="pickNext(currentYear,currentMonth)">❯</div>
                              </li>
                              <li class="session">总共场次 <span>{{count}}天</span></li>
                            </ul>
                          </div>
                          <ul class="weekdays">
                            <li>周一</li>
                            <li>周二</li>
                            <li>周三</li>
                            <li>周四</li>
                            <li>周五</li>
                            <li>周六</li>
                            <li>周日</li>
                          </ul>
                          <ul class="days">
                            <li  v-for="(dayobject,index) in days" :key="index">
                              <span v-if="dayobject.day.getMonth()+1 != currentMonth" class="other-month">{{ dayobject.day.getDate() }}</span>
                              <span v-else>
                                <span :class="dayobject.active == 'private'?'activep':dayobject.active=='member'?'activem':''">{{ dayobject.day.getDate() }}</span>
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                      <div>
                        <span>合同汇总</span>
                        <h1>￥{{contract}}</h1>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="会员卡列表" name="second">
                <div class="table-modal">
                  <el-table :data='memberCardData' border style="width: 100%">
                    <el-table-column label="会员卡类型" width='100'>
                      <template slot-scope="scope">
                          <span v-if='scope.row.cardsubtype === 1'>期限卡</span>
                          <span v-else-if='scope.row.cardsubtype === 2'>次卡</span>
                          <span v-else>储值卡</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="cardname" label="会员卡名称"></el-table-column>
                    <el-table-column prop="entitycardid" label="会员卡号" width='150'></el-table-column>
                    <el-table-column label="有效期">
                      <template slot-scope="scope">
                          <span v-if='scope.row.cardsubtype === 1'>{{scope.row.validity ? scope.row.validity + '天' : '-'}}</span>
                          <span v-else-if='scope.row.cardsubtype === 2'>-</span>
                          <span v-else>-</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="余额" width='80'>
                      <template slot-scope="scope">
                          <span v-if='scope.row.cardsubtype === 1'>-</span>
                          <span v-else-if='scope.row.cardsubtype === 2'>-</span>
                          <span v-else>{{scope.row.curbuy ? scope.row.curbuy + '元' : '-'}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="次数" width='80'>
                      <template slot-scope="scope">
                          <span v-if='scope.row.cardsubtype === 1'>-</span>
                          <span v-else-if='scope.row.cardsubtype === 2'>{{scope.row.curbuy ? scope.row.curbuy + '次' : '-'}}</span>
                          <span v-else>-</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="截止时间" width='160'>
                      <template slot-scope="scope">
                        {{String(scope.row.expirytime).substr(0, 10) === '9999-12-31' ? '无限期' : scope.row.expirytime}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="cardname" label="成员人数"></el-table-column>
                    <el-table-column prop="username" label="状态">
                      <template slot-scope="scope">
                        <span v-if='scope.row.cardstatus === 1'>正常</span>
                        <span v-else-if='scope.row.cardstatus === 2' style='color: #f40'>已耗尽</span>
                        <span v-else-if='scope.row.cardstatus === 3' style='color: #f40'>已过期</span>
                        <span v-else-if='scope.row.cardstatus === 4' style='color: #f40'>过期耗尽</span>
                        <span v-else-if='scope.row.cardstatus === 5' style='color: #f40'>请假</span>
                        <span v-else-if='scope.row.cardstatus === 6' style='color: #f40'>停卡</span>
                        <span v-else-if='scope.row.cardstatus === 8' style='color: #f40'>未开卡</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="详情"></el-table-column>
                    <el-table-column prop="username" label="操作" class-name="operate" width='210'>
                      <template slot-scope="scope">
                        <el-button type="primary" size="mini" class="DoderBlue" @click='continueCard(scope.row)'>续卡</el-button>
                        <el-button type="primary" size="mini" class="green" @click='transferCard(scope.row)'>转卡</el-button>
                        <el-button type="primary" size="mini" class="Orange" @click='memberCardChargeBtn(scope.row)'>扣费</el-button>
                        <el-button type="danger" size="mini" class="OrangeRed" @click='stopCard(scope.row)'>停用</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="合同订单" name="third">
                <div class="table-modal">
                  <el-table :data='contractOrderData' border style="width: 100%">
                    <el-table-column prop="ordernumber" label="合同编号"></el-table-column>
                    <el-table-column prop="updatedAt" label="最新编辑时间"></el-table-column>
                    <el-table-column prop="price" label="金额"></el-table-column>
                    <el-table-column label="类型">
                      <template slot-scope="scope">
                        {{Number(scope.row.payment) === 1 ? '会员卡' : '私教课'}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="描述"></el-table-column>
                    <el-table-column prop="ascription" label="业绩归属"></el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="训练记录" name="fourth">
                <div class="table-modal">
                  <el-table :data='members' border style="width: 100%">
                    <el-table-column prop="signdate" label="签到时间"></el-table-column>
                    <el-table-column prop="cardname" label="签到用卡"></el-table-column>
                    <el-table-column prop="number" label="签到人数"></el-table-column>
                    <el-table-column label="签到方式">
                      <template slot-scope="scope">
                        {{scope.row.signin === '1' ? '手动签到' : ''}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="handcardid" label="手牌号"></el-table-column>
                    <el-table-column prop="returntime" label="归还时间"></el-table-column>
                    <el-table-column
                      label="操作"
                      class-name="operate">
                      <template slot-scope="scope">
                          <el-button type="danger" size="mini" class="OrangeRed" v-if='scope.row.status === "1"' @click='cancel(scope, scope.$index)'>取消</el-button>
                          <el-button type="primary" size="mini" v-else disabled>取消</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="约课记录" name="fif">
                <div class="table-modal">
                  <el-table :data='members' border style="width: 100%">
                    <el-table-column prop="openDate" label="开课时间"></el-table-column>
                    <el-table-column prop="courseName" label="课程名称"></el-table-column>
                    <el-table-column prop="coachName" label="上课教练"></el-table-column>
                    <el-table-column prop="cardName" label="预约用卡"></el-table-column>
                    <el-table-column prop="orderNumber" label="预约人数"></el-table-column>
                    <el-table-column label="签到方式">
                      <template slot-scope="scope">
                        <span v-if='scope.row.signType === 1'>未签到</span>
                        <span v-else-if='scope.row.signType === 2'>前台</span>
                        <span v-else-if='scope.row.signType === 3'>扫码</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="私教课记录" name="six">
                <div class="table-modal">
                  <el-table :data='members' border style="width: 100%">
                    <el-table-column prop="cardName" label="课程名称"></el-table-column>
                    <el-table-column prop="coachName" label="上课教练"></el-table-column>
                    <el-table-column prop="totalSignNumber" label="扣除次数"></el-table-column>
                    <el-table-column prop="signDate" label="签到时间"></el-table-column>
                    <el-table-column label="确认方式">
                      <template slot-scope="scope">
                        <span v-if='scope.row.signType === 1'>未签到</span>
                        <span v-else-if='scope.row.signType === 2'>前台</span>
                        <span v-else-if='scope.row.signType === 3'>扫码</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="跟进记录" name="seven">
                <div class="table-modal">
                  <el-table :data='members' border style="width: 100%">
                    <el-table-column prop="createdAt" label="时间"></el-table-column>
                    <el-table-column label="人员">
                      <template slot-scope="scope">
                        {{mans.find((o) => o.uid === Number(scope.row.personnel)) ? mans.find((o) => o.uid === Number(scope.row.personnel)).name : '-'}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark" label="描述"></el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-pagination
      background
      v-if='!analysisShow'
      :total="count"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, prev, pager, next, sizes"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange">
    </el-pagination>
    <Recover v-if='recoverShow' :recoverInfo='recoverInfo'></Recover>
    <returnDes v-if='returnDesShow' :recoverInfo='recoverInfo'></returnDes>
    <RentCupboard v-if='RentCupboardShow' :memberInfos='memberInfos'></RentCupboard>
    <BraceletBinding v-if='BraceletBindingShow' :paramsPass='paramsPass'></BraceletBinding>
    <SendMessage v-if='SendMessageShow' :paramsPass='paramsPass'></SendMessage>
    <AddRemind v-if='AddRemindShow' :paramsPass='paramsPass'></AddRemind>
    <AddFollow v-if='AddFollowShow' :paramsPass='paramsPass'></AddFollow>
    <IntegralAdjust v-if='IntegralAdjustShow' :paramsPass='paramsPass'></IntegralAdjust>
    <BuyWater v-if='BuyWaterShow' :paramsPass='paramsPass'></BuyWater>
    <memberCardCharge v-if='memberCardChargeShow' :memberCardChargeParams='memberCardChargeParams'></memberCardCharge>
  </div>
</template>
<script>
import { getAllWorker, getCoachData } from '@/api/data'
import { stopCard } from '@/api/buyvipcard'
import { cancelSigninTable } from '@/api/sign'
import { updateVonsale } from '@/api/vipcard'
import { orderRecord, signPrivateLessonRecord, queryMemberInfo, ContractOrder, TrainingRecord, FollowUp, getMemberBelongCard, queryMemberSignInfo } from '@/api/member'
import Recover from '../components/Recover'
import ReturnDes from '../components/ReturnDes'
import RentCupboard from '../components/RentCupboard'
import BraceletBinding from '../components/BraceletBinding'
import SendMessage from '../components/SendMessage'
import AddRemind from '../components/AddRemind'
import AddFollow from '../components/AddFollow'
import IntegralAdjust from '../components/IntegralAdjust'
import BuyWater from '../components/BuyWater'
import { getsignInfo } from '@/async/members'
import memberCardCharge from '@/components/memberCardCharge'
export default {
  components: {
    Recover,
    ReturnDes,
    RentCupboard,
    BraceletBinding,
    SendMessage,
    AddRemind,
    AddFollow,
    IntegralAdjust,
    BuyWater,
    memberCardCharge
  },
  data () {
    return {
      hover: '',
      activeName: 'first',
      currentDay: 1,
      currentMonth: 1,
      currentYear: 1970,
      currentWeek: 1,
      days: [],
      count: 0,
      members: [],
      memberCardData: [],
      contractOrderData: [],
      recoverShow: false,
      returnDesShow: false,
      RentCupboardShow: false,
      BraceletBindingShow: false,
      SendMessageShow: false,
      AddRemindShow: false,
      AddFollowShow: false,
      IntegralAdjustShow: false,
      BuyWaterShow: false,
      memberId: '',
      info: [],
      curPage: 1,
      pageCount: 10,
      analysisShow: true,
      frequency: 0,
      priFrequency: 0,
      contract: 0,
      memberCardChargeShow: false,
      belongData: [],
      payees: [],
      coachs: [],
      mans: []
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    if (this.$route.params.memberDetailParamId) {
      this.memberId = this.$route.params.memberDetailParamId
    } else {
      this.memberId = localStorage.getItem('memberDetailParamId')
    }
    getAllWorker({
      curPage: 1,
      pageCount: 10000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.employees
        this.payees = data.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
        getCoachData({
          pageCount: 1000,
          curPage: 1
        }).then(res => {
          if (res.code === 200) {
            this.coachs = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
            this.mans = this.payees.concat(this.coachs)
          }
        })
      }
    })
    this.queryMemberInfo()

    this.initData()
    this.getAnalysisData()
    getAllWorker({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        this.belongData = res.data.employees
      }
    })
  },
  methods: {
    queryMemberInfo () {
      queryMemberInfo(this.memberId).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          this.info = res.data.res
        }
      })
    },
    continueCard (r) {
      this.$router.push({name: 'RenewalCard', params: {list: [this.info.username, r.validity, r.cardsubtype, r.curbuy, r.vipcardmapid]}})
      localStorage.setItem('cardParams', [this.info.username, r.validity, r.cardsubtype, r.curbuy, r.vipcardmapid])
    },
    transferCard (v) {
      this.$router.push({name: 'transferCard', params: {list: ['memberDetail', v.cardname, v.vipcardmapid, v.cardsubtype, v.totalbuy, v.curbuy, v.expirytime, v.opencardtime, v.vipcardmapid, this.memberId]}})
      localStorage.setItem('list', ['memberDetail', v.cardname, v.vipcardmapid, v.cardsubtype, v.totalbuy, v.curbuy, v.expirytime, v.opencardtime, v.vipcardmapid, this.memberId])
    },
    memberCardChargeBtn (v) {
      this.memberCardChargeParams = [v.opencardtime, v.expirytime, v.cardsubtype, this.info.username, v.curbuy, v.totalbuy, v.vipcardmapid]
      this.memberCardChargeShow = true
    },
    memberCardChargeCloseEvent () {
      this.memberCardChargeShow = false
    },
    stopCard (e) {
      stopCard({
        vipcardmapid: e.vipcardmapid
      }).then(res => {
        if (res) {
          this.getMemberCardData()
        }
      })
    },
    cancel (e, idx) {
      this.$confirm(`取消签到后，次卡的次数会返还，该条签到数据失效，是否确认取消签到？`, '取消签到提醒', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelSigninTable({uid: e.row.uid}).then(res => {
          if (res.code === 200) {
            this.$store.commit('setLoading', false)
            this.rowDisabled = true
            this.getTrainingRecordData()
          }
        })
      }).catch(() => {
      })
    },
    signinBtn () {
      this.$router.push({name: 'memberSignin'})
    },
    selfOrderBtn () {
      this.$router.push({name: 'selfCourse'})
    },
    getAnalysisData () {
      queryMemberSignInfo({
        memberId: this.memberId
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data
          this.frequency = data.trainRate
          this.priFrequency = data.privateLessonRate
          this.contract = data.contract
        }
      })
    },
    getMemberCardData () {
      getMemberBelongCard({
        pageCount: this.pageCount,
        curPage: this.curPage,
        param: '',
        memberid: this.memberId
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.memberCardData = data.allInfos
          this.count = data.count
        }
      })
    },
    getContractOrderData () {
      ContractOrder({
        curPage: this.curPage,
        pageCount: this.pageCount,
        memberid: this.memberId
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          this.contractOrderData = res.data.res.allInfos
          this.count = res.data.res.count
        }
      })
    },
    getTrainingRecordData () {
      TrainingRecord({
        curPage: this.curPage,
        pageCount: this.pageCount,
        memberid: this.memberId
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          this.members = res.data.res.allInfos
          this.count = res.data.res.count
        }
      })
    },
    orderRecord () {
      orderRecord({
        curPage: this.curPage,
        pageCount: this.pageCount,
        memberId: this.memberId
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          this.members = res.data.data
          this.count = res.data.count
        }
      })
    },
    signPrivateLessonRecord () {
      signPrivateLessonRecord({
        curPage: this.curPage,
        pageCount: this.pageCount,
        memberId: this.memberId
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          this.members = res.data.data
          this.count = res.data.count
        }
      })
    },
    getFollowUp () {
      FollowUp({
        curPage: this.curPage,
        pageCount: this.pageCount,
        memberid: this.memberId
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.members = data.allInfos
          this.count = data.count
        }
      })
    },
    recoverUse (e) {
      updateVonsale({
        uid: e.uid,
        onsale: 1
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          this.getMemberCardList()
        }
      })
    },
    handleBuyCards (e) {
      switch (e) {
        case 'memberCard':
          this.$router.push({name: 'BuyCards', params: {MemberId: this.memberId}})
          localStorage.setItem('MemberId', this.memberId)
          break
        case 'priCourse':
          this.$router.push({name: 'buyPrivate', params: {MemberId: this.memberId, belongCoach: '', courseName: ''}})
          localStorage.setItem('MemberId', this.memberId)
          localStorage.setItem('belongCoach', '')
          localStorage.setItem('courseName', '')
          break
        default:
          break
      }
    },
    handleAppoint () {},
    RentCupboard () {
      this.memberInfos = this.info
      this.RentCupboardShow = true
    },
    RentCupboardCloseEvent () {
      this.RentCupboardShow = false
    },
    edit () {
      this.$router.push({name: 'addMember', params: {addMemberId: this.memberId}})
      localStorage.setItem('addMemberId', this.memberId)
    },
    handleDespointControl (e) {
      switch (e) {
        case 'recover':
          this.recoverShow = true
          this.recoverInfo = this.info
          break
        case 'returnDes':
          this.returnDesShow = true
          this.recoverInfo = this.info
          break
        default:
          break
      }
    },
    recoverCloseEvent () {
      this.recoverShow = false
    },
    returnDesCloseEvent () {
      this.returnDesShow = false
    },
    handleClick (e) {
      if (e.name === 'first') {
        this.analysisShow = true
      } else {
        this.analysisShow = false
      }
      switch (e.name) {
        case 'first':
          this.getAnalysisData()
          this.$store.commit('setLoading', true)
          break
        case 'second':
          this.getMemberCardData()
          this.$store.commit('setLoading', true)
          break
        case 'third':
          this.getContractOrderData()
          this.$store.commit('setLoading', true)
          break
        case 'fourth':
          this.getTrainingRecordData()
          this.$store.commit('setLoading', true)
          break
        case 'fif':
          this.orderRecord()
          this.$store.commit('setLoading', true)
          break
        case 'six':
          this.signPrivateLessonRecord()
          this.$store.commit('setLoading', true)
          break
        case 'seven':
          this.getFollowUp()
          this.$store.commit('setLoading', true)
          break
        default:
          break
      }
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      switch (this.activeName) {
        case 'second':
          this.getMemberCardData()
          break
        case 'third':
          this.getContractOrderData()
          break
        case 'fourth':
          this.getTrainingRecordData()
          break
        case 'fif':
          this.orderRecord()
          break
        case 'six':
          this.signPrivateLessonRecord()
          break
        case 'seven':
          this.getFollowUp()
          break
        default:
          break
      }
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
    },
    handleOthersControl (e) {
      switch (e) {
        case 'rfid':
          this.paramsPass = this.info
          this.BraceletBindingShow = true
          break
        case 'message':
          this.SendMessageShow = true
          this.paramsPass = this.info
          break
        case 'remind':
          this.AddRemindShow = true
          this.paramsPass = this.info
          break
        case 'follow':
          this.AddFollowShow = true
          this.paramsPass = this.info
          break
        case 'integral':
          this.IntegralAdjustShow = true
          this.paramsPass = this.info
          break
        case 'water':
          this.BuyWaterShow = true
          this.paramsPass = this.info
          break
        default:
          break
      }
    },
    BraceletBindingCloseEvent () {
      this.BraceletBindingShow = false
    },
    SendMessageCloseEvent () {
      this.SendMessageShow = false
    },
    AddRemindCloseEvent () {
      this.AddRemindShow = false
    },
    AddFollowCloseEvent () {
      this.AddFollowShow = false
    },
    IntegralAdjustCloseEvent () {
      this.IntegralAdjustShow = false
    },
    BuyWaterCloseEvent () {
      this.BuyWaterShow = false
    },
    initData (cur) {
      let date
      if (cur) {
        date = new Date(cur)
      } else {
        let now = new Date()
        let d = new Date(this.formatDate(now.getFullYear(), now.getMonth() + 1, 1))
        date = new Date(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      }
      this.currentDay = date.getDate()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      this.currentMonth = this.currentMonth >= 10 ? this.currentMonth : '0' + this.currentMonth
      this.currentWeek = date.getDay()

      this.signInfoDate = this.currentYear + '-' + (this.currentMonth >= 10 ? this.currentMonth : '0' + this.currentMonth)

      if (this.currentWeek === 0) {
        this.currentWeek = 7
      }
      let str = this.formatDate(this.currentYear, this.currentMonth, this.currentDay)
      this.days.length = 0
      for (let i = this.currentWeek - 1; i >= 0; i--) {
        let d = new Date(str)
        d.setDate(d.getDate() - i)
        let dayobject = {}
        dayobject.day = d
        this.days.push(dayobject)
      }
      for (let i = 1; i <= 35 - this.currentWeek; i++) {
        let d = new Date(str)
        d.setDate(d.getDate() + i)
        let dayobject = {}
        dayobject.day = d
        this.days.push(dayobject)
      }
      this.signInfo(this.signInfoDate)
    },
    pickPre (year, month) {
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(0)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    pickNext (year, month) {
      let d = new Date(this.formatDate(year, month, 1))
      d.setDate(35)
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    },
    formatDate (year, month, day) {
      let y = year
      let m = month
      if (m < 10) m = '0' + m
      let d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    },
    signInfo (date) {
      const data = {
        memberId: localStorage['memeberdetail'],
        date: date || ''
      }
      const self = this
      getsignInfo(data).then(res => {
        if (res) {
          if (res.code === 200) {
            self.signInfoObj = res
            for (let t = 0; t < self.days.length; t++) {
              let date = self.days[t].day.getDate() >= 10 ? self.days[t].day.getDate().toString() : '0' + self.days[t].day.getDate()
              for (let i = 0; i < self.signInfoObj.calendar.privateLessonSignData.length; i++) {
                if (date === self.signInfoObj.calendar.privateLessonSignData[i]) {
                  self.days[t].active = 'private'
                }
              }
              for (let s = 0; s < self.signInfoObj.calendar.memberSignData.length; s++) {
                if (date === self.signInfoObj.calendar.memberSignData[s]) {
                  self.days[t].active = 'member'
                }
              }
            }
            if (self.signInfoObj.calendar) {
              this.count = self.signInfoObj.calendar.count
            }
          }
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
