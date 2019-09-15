<template>
  <div class="appMain financialChat">
    <div class="add-store-btn">
      <h3>场馆收入</h3><el-button type="primary" class="btn-width-auto">导出Excel</el-button>
    </div>
    <div class="amount">
      <el-row :gutter="12">
        <el-col :span="18">
          <el-card shadow="hover">
            <div class="amount-tip">
              <span class="title">总收入</span>
            </div>
            <div class="am-probably p2">
              <el-row>
                <el-col :span="7" class="income">
                  <div class="grid-content bg-purple">
                    <h3>0.00 <span>元</span></h3>
                    <p>销售总收入</p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple-light">
                    <div id='courseSale' style='width: 100%; height: 130px'></div>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="grid-content bg-purple">
                    <div id='cardSale' style='width: 100%; height: 130px'></div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
        </el-col>
      </el-row>
    </div>
    <div class="income">
      <el-row :gutter="12">
        <el-col :span="18">
          <el-card shadow="hover">
            <div class="amount-tip">
              <span class="title">会员卡销售收入</span>
            </div>
            <div class="am-probably p2">
              <el-row>
                <el-col :span="16">
                  <div class="grid-content bg-purple-light">
                    <div>
                      <div id='saleIncomeActive' style='width: 100%; height: 300px'></div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple">
                    <div id='saleIncomeType' style='width: 100%; height: 300px'></div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="income">
      <el-row :gutter="12">
        <el-col :span="14">
          <el-card shadow="hover">
            <div class="amount-tip">
              <span class="title">课程消耗</span>
            </div>
            <div class="am-probably p2">
              <el-row>
                <el-col :span="9">
                  <div class="grid-content bg-purple-light">
                    <div>
                      <div class="grid-content bg-purple">
                        <h3>0.00 <span>元</span></h3>
                        <p>销售总收入</p>
                      </div>
                      <div class="grid-content bg-purple">
                        <h3>0.00 <span>元</span></h3>
                        <p>销售总收入</p>
                      </div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="15">
                  <div class="grid-content bg-purple">
                    <div id='courseConsume' style='width: 100%; height: 300px'></div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getAmount } from '@/api/finance'
export default {
  data () {
    return {

    }
  },
  mounted () {
    getAmount().then(res => {
      console.log(res)
    })
    this.drawPoint()
    this.cardSale()
    this.saleIncomeActive()
    this.saleIncomeType()
    this.courseConsume()
  },
  methods: {
    drawPoint () {
      let dom = this.$echarts.init(document.getElementById('courseSale'))
      dom.setOption({
        color: ['#00CCE6', '#EEEEEE'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   x: 'left',
        //   y: 'top',
        //   right: 10,
        //   top: 30,
        //   left: 'left',
        //   data: ''
        // },
        series: [
          {
            name: 'name',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['20%', '50%'],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            avoidLabelOverlap: false,
            data: [
              {value: 335, name: '1'},
              {value: 310, name: '2'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    cardSale () {
      let dom = this.$echarts.init(document.getElementById('cardSale'))
      dom.setOption({
        color: ['#7D8CE4', '#EEEEEE'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        // legend: {
        //   orient: 'vertical',
        //   x: 'left',
        //   y: 'top',
        //   right: 10,
        //   top: 30,
        //   left: 'left',
        //   data: ''
        // },
        series: [
          {
            name: 'name',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['20%', '50%'],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            avoidLabelOverlap: false,
            // itemStyle: {
            //   normal: {
            //     label: {
            //       show: false // 隐藏标示文字
            //     },
            //     labelLine: {
            //       show: false // 隐藏标示线
            //     }
            //   }
            // },
            data: [
              {value: 335, name: '1'},
              {value: 310, name: '2'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      })
    },
    saleIncomeActive () {
      let dom = this.$echarts.init(document.getElementById('saleIncomeActive')) // 初始化画布
      var xAxisData = []
      var data1 = []
      var data2 = []
      for (var i = 0; i < 60; i++) {
        xAxisData.push('类目' + i)
        data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
        data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5)
      }
      dom.setOption({
        title: {
          text: '按行为',
          textStyle: {
            color: '#ccc',
            fontWeight: 'lighter',
            fontFamily: 'san-serif',
            fontSize: 15
          },
          textAlign: 'center',
          subtextStyle: {
            color: 'green',
            fontStyle: 'normal',
            fontWeight: 'lighter',
            fontFamily: 'san-serif',
            fontSize: 12
          },
          left: 'center'
        },
        // legend: {
        //   data: ['bar', 'bar2'],
        //   align: 'left'
        // },
        // toolbox: {
        // // y: 'bottom',
        //   feature: {
        //     magicType: {
        //       type: ['stack', 'tiled']
        //     },
        //     dataView: {},
        //     saveAsImage: {
        //       pixelRatio: 2
        //     }
        //   }
        // },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          silent: false,
          splitLine: {
            show: false
          }
        },
        yAxis: {
        },
        series: [{
          name: 'bar',
          type: 'bar',
          data: data1,
          animationDelay: function (idx) {
            return idx * 10
          }
        }, {
          name: 'bar2',
          type: 'bar',
          data: data2,
          animationDelay: function (idx) {
            return idx * 10 + 100
          }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
          return idx * 5
        }
      })
      // 自适应
      setTimeout(function () {
        window.onresize = function () {
          dom.resize()
          dom.resize()
        }
      }, 200)
    },
    saleIncomeType () {
      let dom = this.$echarts.init(document.getElementById('saleIncomeType'))
      dom.setOption({
        color: ['#00CCE6', '#FFB200', '#5365D3'],
        title: {
          text: '按卡类型',
          textStyle: {
            color: '#ccc',
            fontWeight: 'lighter',
            fontFamily: 'san-serif',
            fontSize: 15
          },
          textAlign: 'center',
          subtextStyle: {
            color: 'green',
            fontStyle: 'normal',
            fontWeight: 'lighter',
            fontFamily: 'san-serif',
            fontSize: 12
          },
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 20,
          data: ''
        },
        series: [
          {
            name: 'name',
            type: 'pie',
            radius: ['40%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: true,
                  lineStyle: {color: '#3c4858'}
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                textColor: '#000'
              }
            },
            data: [
              {value: 1, name: '储值卡'},
              {value: 2, name: '次卡'},
              {value: 3, name: '期限卡'}
            ],
            color: ['#51CEC6', '#FFB703', '#5FA0FA']
          }
        ]
      })
    },
    courseConsume () {
      let dom = this.$echarts.init(document.getElementById('courseConsume'))
      dom.setOption({
        color: ['#00CCE6', '#FFB200', '#5365D3'],
        title: {
          text: '按卡类型',
          textStyle: {
            color: '#ccc',
            fontWeight: 'lighter',
            fontFamily: 'san-serif',
            fontSize: 15
          },
          textAlign: 'center',
          subtextStyle: {// 副标题内容的样式
            color: 'green', // 绿色
            fontStyle: 'normal', // 主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
            fontWeight: 'lighter', // 可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
            fontFamily: 'san-serif', // 主题文字字体，默认微软雅黑
            fontSize: 12// 主题文字字体大小，默认为12px
          },
          left: 'center' // left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right',如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: 20,
          data: ''
        },
        series: [
          {
            name: 'name', // tooltip提示框中显示内容
            type: 'pie', // 图形类型，如饼状图，柱状图等
            radius: ['40%', '50%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: true,
                  lineStyle: {color: '#3c4858'}
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                textColor: '#000'
              }
            },
            data: [
              {value: 1, name: '储值卡'},
              {value: 2, name: '次卡'},
              {value: 3, name: '期限卡'}
            ],
            color: ['#51CEC6', '#FFB703', '#5FA0FA']
          }
        ]
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../assets/css/Chart.styl'
</style>
