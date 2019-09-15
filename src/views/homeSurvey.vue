/* eslint-disable no-undef */
<template>
  <div class='appMain'>
    <div class='count'>
      <el-row :gutter="12">
        <el-col :span="12">
          <el-card shadow="never">
            <h3>今日客流<span> {{flowCount.count ? flowCount.count : 0}} </span>人</h3>
            <div class='count-info'>
              <span>训练<strong> {{flowCount.trainCount ? flowCount.trainCount : 0}} </strong>人</span>
              <span>私教<strong> {{flowCount.signPrivateLessonDayCount ? flowCount.signPrivateLessonDayCount : 0}} </strong>人</span>
              <span>到店体验<strong> {{flowCount.expTodayCount ? flowCount.expTodayCount : 0}} </strong>人</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="never" class='count-info-right'>
            <div>
              <span>今日新售卡<strong> {{sellCardNum.cardCountByDay ? sellCardNum.cardCountByDay : 0}} </strong>张</span>
              <span>本月新售卡<strong> {{sellCardNum.cardCountByMonth ? sellCardNum.cardCountByMonth : 0}} </strong>张</span>
            </div>
            <div>
              <span>今日新售私教<strong> {{sellCardNum.courseCountByDay ? sellCardNum.courseCountByDay : 0}} </strong>节</span>
              <span>本月新售私教<strong> {{sellCardNum.courseCountByMonth ? sellCardNum.courseCountByMonth : 0}} </strong>节</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class='chart'>
     <el-col :span="6">
        <el-card shadow="hover">
          <div class='chart-cont'>
            <div>
              <h1>{{salesVolume.average !== undefined ? salesVolume.average : '0'}}</h1>
              <p>近30天日均销售额</p>
            </div>
            <div class='list-title'>销售</div>
          </div>
          <div ref="chartSales" :class="className" :style="{width: width, height: height}"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class='chart-cont'>
            <div>
              <h1>{{newMember.average  !== undefined ? newMember.average : '0'}}</h1>
              <p>近30天日均新增会员</p>
            </div>
            <div class='list-title'>新增会员</div>
          </div>
          <div ref="chartMember" :class="className" :style="{width: width, height: height}"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <div class='chart-cont'>
            <div>
              <h1>{{passengerFlow.average  !== undefined ? passengerFlow.average : '0'}}</h1>
              <p>近30天日均客流</p>
            </div>
            <div class='list-title'>客流</div>
          </div>
          <div ref="chartPassenger" :class="className" :style="{width: width, height: height}"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="min-height:217px;">
          <div class='chart-cont'>
            <div>
              <h1>{{privateCourse.average  !== undefined ? privateCourse.average : '0'}}</h1>
              <p>近30天日均消课私教数</p>
            </div>
            <div class='list-title'>私教</div>
          </div>
          <div ref="chartPrivate" :class="className" :style="{width: width, height: height}"></div>
        </el-card>
      </el-col>
    </div>
    <div class='record'>
      <el-row :gutter="12">
        <el-col :span="4">
          <el-card shadow="never" class='card1'>
            <i class="el-icon-s-opportunity" style="color: #99a9bf; font-size: 26px; display: inline-block;width: 100%;text-align: center;"></i>
            <p style="text-align: center;line-height: 24px">智能运营</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never" class='card2'>
            <p>生日祝福</p>
            <p>{{statistics.birthdayReminder ? statistics.birthdayReminder : 0}} 人</p>
            <span><strong>{{currentMonth}}</strong>月生日</span>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never" class='card3'>
            <p>续会提醒</p>
            <p>{{statistics.shipReminder ? statistics.shipReminder : 0 }} 人</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never" class='card4'>
            <p>续课提醒</p>
            <p>{{statistics.classReminder ? statistics.classReminder : 0}} 人</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never" class='card5'>
            <p>懒惰提醒</p>
            <p>{{statistics.lazyReminder ? statistics.lazyReminder : 0}} 人</p>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card shadow="never" class='card6'>
            <p>潜在会员</p>
            <p>{{statistics.queryPotential ? statistics.queryPotential : 0}} 人</p>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="order">
      <el-row :gutter="12">
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix title">
              <div>
                <h3>私教预约</h3>
                <p>未签到<span>{{privateData.unSignCount}}</span>节/ 总预约{{privateData.totalCount}}节</p>
              </div>
              <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-arrow-right"></i></el-button>
            </div>
            <div class="order-item item">
              <el-table
                :data="privateData.data"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                  label="姓名"
                  align='center'>
                  <template slot-scope="scope">
                    {{members.filter((o) => o.uid === scope.row.memberId) && members.length !== 0 ? members.filter((o) => o.uid === scope.row.memberId)[0].username : '-'}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="coachName"
                  label="教练"
                  align='center'
                  >
                </el-table-column>
                <el-table-column
                  prop="orderDate"
                  align='center'
                  label="预约时间"
                  sortable>
                </el-table-column>
                <el-table-column
                  align='center'
                  label="状态">
                  <template slot-scope="scope">
                    <span v-if='scope.row.orderStatus === 0'>可约</span>
                    <span v-else-if='scope.row.orderStatus === 1'>课满</span>
                    <span v-else>请假</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix title">
              <div>
                <h3>团课课表</h3>
                <p>未上课<span>{{groupCourse.unSignCount}}</span>节/ 总排课{{groupCourse.totalCount}}节</p>
              </div>
              <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-arrow-right"></i></el-button>
            </div>
            <div class="order-item item">
              <el-table
                border
                stripe
                :data="groupCourse.data"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                  prop="courseName"
                  label="课程名称"
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="beginTime"
                  label="预约时间"
                  align='center'
                  sortable
                  >
                </el-table-column>
                <el-table-column
                  prop="coachName"
                  align='center'
                  label="教练"
                  sortable>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix title">
              <div>
                <h3>预约到访</h3>
                <p>未到访<span>{{visitData.unSignCount}}</span>人/ 总预约{{visitData.totalCount}}人</p>
              </div>
              <el-button style="float: right; padding: 3px 0" type="text"><i class="el-icon-arrow-right"></i></el-button>
            </div>
            <div class="order-item item">
              <el-table
                :data="visitData.data"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                  prop="name"
                  label="姓名"
                  align='center'>
                </el-table-column>
                <el-table-column
                  prop="ordertime"
                  align='center'
                  label="预约时间"
                  sortable>
                </el-table-column>
                <el-table-column
                  align='center'
                  label="状态">
                  <template slot-scope="scope">
                    {{scope.row.status}}
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang='stylus' scoped>
@import '../assets/css/homeSurvey.styl'
</style>
<script>
import { getMemberData } from '@/api/data'
import { getPrivateTable, getGroupTable, getExprienceTable, getRemindInfo, getSalesCard, getSalesCount, privateChart, memberChart, getFlowCount, getVolumeCount } from '@/api/home'
export default {
  name: 'HelloWorld',
  props: {
    className: {
      type: String,
      default: 'resizeClassName'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '220px'
    }
  },
  data () {
    return {
      currentMonth: '',
      flowCount: {},
      salesVolume: {},
      newMember: {},
      passengerFlow: {},
      privateCourse: {},
      statistics: {},
      sellCardNum: {},
      privateTable: [
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '教练',
          key: 'age',
          align: 'center'
        },
        {
          title: '预约时间',
          key: 'ordertime',
          align: 'center',
          sortable: true
        },
        {
          title: '状态',
          key: 'status',
          align: 'center'
        }
      ],
      courseTable: [
        {
          title: '课程名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '预约时间',
          key: 'ordertime',
          align: 'center',
          sortable: true
        },
        {
          title: '教练',
          key: 'status',
          align: 'center'
        }
      ],
      visitTable: [
        {
          title: '姓名',
          key: 'name',
          align: 'center'
        },
        {
          title: '预约时间',
          key: 'ordertime',
          align: 'center',
          sortable: true
        },
        {
          title: '状态',
          key: 'status',
          align: 'center',
          render: (h, params) => {
            let texts = ''
            if (params.row.status === 1) {
              texts = '签到'
            } else if (params.row.status === 2) {
              texts = '签退'
            } else if (params.row.status === 3) {
              texts = '取消签到'
            }
            return h('div', {
              props: {}
            }, texts)
          }
        }
      ],
      privateData: {},
      groupCourse: {},
      visitData: {},
      members: []
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  mounted () {
    getMemberData({
      curPage: 1,
      pageCount: 10000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.allMembers
        this.members = data.allMembers
      }
    })
    this.currentMon()
    getSalesCard().then(res => {
      if (res) {
        this.$store.commit('setLoading', false)
        this.sellCardNum = res.data
      }
    })
    getSalesCount().then(res => {
      if (res) {
        this.flowCount = res.data
      }
    })
    getFlowCount().then(res => {
      if (res) {
        this.passengerFlow = res.data
        this.passengerFlow.keys = res.data.dateVec
        this.passengerFlow.values = res.data.dataVec
        this.drawPassenger()
      }
    })
    getVolumeCount().then(res => {
      if (res) {
        this.salesVolume = res.data
        this.salesVolume.xData = res.data.dateVec
        this.salesVolume.yData = res.data.dataVec
        this.canvas()
      }
    })
    privateChart().then(res => {
      if (res) {
        this.privateCourse = res.data.privateLesson
        this.drawPrivate()
      }
    })
    memberChart().then(res => {
      if (res) {
        this.newMember = res.data
        this.newMember.xData = res.data.dateVec
        this.newMember.yData = res.data.dataVec
        this.drawMember()
      }
    })
    getRemindInfo().then(res => {
      this.statistics = res.data
    })
    // 表格1
    getPrivateTable().then(res => {
      if (res) {
        this.privateData = res.data
      }
    })
    // 表格2
    getGroupTable().then(res => {
      if (res) {
        this.groupCourse = res.data
      }
    })
    // 表格3
    getExprienceTable().then(res => {
      if (res) {
        this.visitData = res.data
      }
    })
  },
  methods: {
    currentMon () {
      const date = new Date()
      const month = date.getMonth() + 1
      this.currentMonth = month
    },
    canvas () {
      let chartSales = this.$echarts.init(this.$refs.chartSales)
      chartSales.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        xAxis: {
          show: true,
          data: this.salesVolume.xData
          // axisLabel: {interval: 0, rotate: -30}
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '销售额',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: 'rgb(255, 70, 131)'
          },
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(255, 158, 68)'
            }, {
              offset: 0,
              color: 'rgb(255, 70, 131)'
            }])
          },
          data: this.salesVolume.yData
        }]
      })
    },
    drawMember () {
      let chartMember = this.$echarts.init(this.$refs.chartMember)
      chartMember.setOption({
        tooltip: {},
        xAxis: {
          show: true,
          data: this.newMember.xData
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '新增会员',
          type: 'bar',
          color: '#f66d7d',
          data: this.newMember.yData
        }]
      })
      window.addEventListener('resize', () => {
        chartMember.resize()
      })
    },
    drawPassenger () {
      let chartPassenger = this.$echarts.init(this.$refs.chartPassenger)
      chartPassenger.setOption({
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        xAxis: {
          show: true,
          data: this.passengerFlow.keys
        },
        yAxis: {
          show: false
        },
        series: [{
          name: '客流',
          type: 'line',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          itemStyle: {
            color: '#2d8cf0'
          },
          areaStyle: {
            color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: 'rgb(92, 173, 255)'
            }, {
              offset: 1,
              color: '#2d8cf0'
            }])
          },
          data: this.passengerFlow.values
        }]
      })
      window.addEventListener('resize', () => {
        chartPassenger.resize()
      })
    },
    drawPrivate () {
      let chartPrivate = this.$echarts.init(this.$refs.chartPrivate)
      chartPrivate.setOption({
        tooltip: {},
        xAxis: {
          show: true,
          data: this.privateCourse.keys,
          inverse: true
        },
        yAxis: {
          show: false,
          type: 'value'
        },
        series: [{
          name: '私教消课',
          type: 'bar',
          color: '#0093ff',
          data: this.privateCourse.values
        }]
      })
      window.addEventListener('resize', () => {
        chartPrivate.resize()
      })
    }
  }
}
</script>
