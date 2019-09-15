<template>
  <div class="appMain">
    <div class="add-store-btn">
      <el-button class="btn-width-auto" @click='cancel'>取消</el-button>
      <el-button type="primary" class="btn-width-auto" @click='confirm'>保存修改</el-button>
    </div>
    <div>
      <div class="title-modal">
        <h3>职位</h3>
        <p>管理范围</p>
      </div>
      <div class="managePermission">
        <div>
          <el-radio v-model="manage" label="1">管理名下会员</el-radio>
          <el-radio v-model="manage" label="2">管理全部会员</el-radio>
        </div>
      </div>
    </div>
    <div class="permission">
      <el-row :gutter="12">
        <el-col :span="24">
          <el-card shadow="hover">
            <div class="level-title">
              <h6 class="title">一级模块</h6>
              <h6 class="title">二级模块</h6>
              <h6 class="title">三级模块</h6>
              <h6 class="title">操作权限</h6>
            </div>
            <div class="permission-set">
              <div class='same-height'>
                <div class="equal">
                  <el-menu default-active="1">
                    <el-menu-item v-for="(item,index) in data" :index="item.id" :key="index"  @click='click(item)'>
                      <template slot="title">
                        <span>{{item.label}}</span>
                      </template>
                    </el-menu-item>
                  </el-menu>
                </div>
                <div class="equal two">
                  <div>
                    {{erji}}
                  </div>
                </div>
              </div>
              <div class="same-control">
                <div class='same-height' v-for='item in sanji' :key='item.id'>
                  <div class="equal three">
                    <div>
                      <p>{{item.label}}</p>
                    </div>
                  </div>
                  <div class="equal four">
                    <div >
                      <el-checkbox-group v-model='posit' @change="checkboxChange">
                        <el-checkbox  v-for='i in item.position' :label='i.label' :key='i.id' :value='i.id'></el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getRoles } from '@/api/acl'
import { getRoleResource, editRole } from '@/api/role'
export default {
  data () {
    return {
      manage: '1',
      workerRoleInfo: '',
      data: [
        {
          id: '1',
          label: '场馆列表',
          children: [
            {
              id: '1-1',
              label: '场馆列表',
              position: [
                {
                  id: '1-11',
                  label: '查：查看场馆列表',
                  router: {
                    home: [
                      'manage/queryAllStores'
                    ]
                  },
                  type: 'get'
                }
              ]
            }
          ]
        },
        {
          id: '2',
          label: '工作台',
          children: [
            {
              id: '2-1',
              label: '会员签到',
              position: [
                {
                  id: '2-11',
                  label: '查：查看签到会员数据',
                  router: {
                    memberSignin: [
                      'signin/'
                    ]
                  },
                  type: 'get'
                },
                {
                  id: '2-12',
                  label: '会员签到：添加会员签到数据',
                  router: {
                    memberSignin: [
                      'signin/memberSignin'
                    ]
                  },
                  type: 'add'
                },
                {
                  id: '2-13',
                  label: '操作：取消签到，领取、归还手牌',
                  router: {
                    memberSignin: [
                      'signin/cancelMemSignin'
                    ]
                  },
                  type: 'delete'
                }
              ]
            },
            {
              id: '2-2',
              label: '教练签到',
              position: [
                {
                  id: '2-21',
                  label: '查：查看教练签到数据',
                  router: {
                    memberSignin: [
                      'coach/query'
                    ]
                  },
                  type: 'get'
                },
                {
                  id: '2-22',
                  label: '操作：签到、签退',
                  router: {
                    memberSignin: [
                      'coach/query'
                    ]
                  },
                  type: 'get'
                },
                {
                  id: '2-23',
                  label: '取消签到',
                  router: {
                    memberSignin: [
                      'coach/query'
                    ]
                  },
                  type: 'get'
                }
              ]
            },
            {
              id: '2-3',
              label: '私教消课',
              position: [
                {
                  id: '2-31',
                  label: '查：查看私教消课数据',
                  router: {
                    memberSignin: [
                      'coach/queryOrderCoach'
                    ]
                  },
                  type: 'get'
                },
                {
                  id: '2-32',
                  label: '增加：进行手动签到'
                },
                {
                  id: '2-33',
                  label: '操作：到签到、签退'
                },
                {
                  id: '2-34',
                  label: '取消签到：取消签到操作'
                }
              ]
            },
            {
              id: '2-4',
              label: '预约体验',
              position: [
                {
                  id: '2-41',
                  label: '查：查看预约体验数据'
                },
                {
                  id: '2-42',
                  label: '增加：添加预约体验数据'
                },
                {
                  id: '2-43',
                  label: '操作：预约体验人员签到'
                }
              ]
            },
            {
              id: '2-5',
              label: '团课预约',
              position: [
                {
                  id: '2-51',
                  label: '查：查看团课预约数据'
                },
                {
                  id: '2-52',
                  label: '操作：进行团课的预约操作'
                },
                {
                  id: '2-53',
                  label: '查看预约：查看团课预约列表'
                },
                {
                  id: '2-54',
                  label: '团课预约取消：进行团课的预约操作'
                }
              ]
            },
            {
              id: '2-6',
              label: '定金',
              position: [
                {
                  id: '2-61',
                  label: '查：查看定金数据'
                },
                {
                  id: '2-62',
                  label: '操作：定金退款'
                }
              ]
            },
            {
              id: '2-7',
              label: '押金',
              position: [
                {
                  id: '2-71',
                  label: '查：查看定金数据'
                },
                {
                  id: '2-72',
                  label: '操作：押金退款'
                }
              ]
            }
          ]
        },
        {
          id: '3',
          label: '会员管理',
          children: [
            {
              id: '3-1',
              label: '会员',
              position: [
                {
                  id: '3-11',
                  label: '查：会员数据查看'
                },
                {
                  id: '3-12',
                  label: '增：添加会员'
                },
                {
                  id: '3-13',
                  label: '删：会员数据删除'
                },
                {
                  id: '3-14',
                  label: '编辑：会员数据编辑'
                },
                {
                  id: '3-15',
                  label: '导入导出：会员数据导入导出'
                },
                {
                  id: '3-16',
                  label: '指派：指派会籍、销售教练、上课教练'
                },
                {
                  id: '3-17',
                  label: '定金/押金：收取定金押金'
                },
                {
                  id: '3-18',
                  label: '绑定手环'
                },
                {
                  id: '3-19',
                  label: '租柜：租柜和退柜'
                },
                {
                  id: '3-20',
                  label: '赠送体验卡'
                },
                {
                  id: '3-21',
                  label: '购买会员卡：购买会员卡操作'
                },
                {
                  id: '3-22',
                  label: '购买私教课：购买私教课操作'
                },
                {
                  id: '3-23',
                  label: '跟进：写跟进'
                },
                {
                  id: '3-24',
                  label: '积分调整：调整积分'
                }
              ]
            },
            {
              id: '3-2',
              label: '会员卡',
              position: [
                {
                  id: '3-31',
                  label: '查：查看会员卡数据'
                },
                {
                  id: '3-32',
                  label: '增加：添加会员卡类型'
                },
                {
                  id: '3-33',
                  label: '操作：停用会员卡'
                },
                {
                  id: '3-34',
                  label: '编辑：编辑会员卡数据'
                },
                {
                  id: '3-35',
                  label: '导入导出：会员卡数据导入导出'
                }
              ]
            },
            {
              id: '3-3',
              label: '会员卡购买',
              position: [
                {
                  id: '3-41',
                  label: '查看：购买数据查看'
                },
                {
                  id: '3-42',
                  label: '操作：请假、停卡、恢复、续卡'
                },
                {
                  id: '3-43',
                  label: '导入导出：会员卡购买数据导入导出'
                }
              ]
            }
          ]
        },
        {
          id: '4',
          label: '课程管理',
          children: [
            {
              id: '4-1',
              label: '团课',
              position: [
                {
                  id: '4-11',
                  label: '查：查看团课数据'
                },
                {
                  id: '4-12',
                  label: '增：添加团课课程'
                },
                {
                  id: '4-13',
                  label: '删：删除团课课程'
                },
                {
                  id: '4-14',
                  label: '编辑：编辑团课课程数据'
                }
              ]
            },
            {
              id: '4-2',
              label: '团课排课',
              position: [
                {
                  id: '4-21',
                  label: '查：查看团课排课数据'
                },
                {
                  id: '4-22',
                  label: '增：添加排课数据、批量添加排课，复制排课'
                },
                {
                  id: '4-23',
                  label: '删：删除排课数据'
                },
                {
                  id: '4-24',
                  label: '打印课表：打印排课课表'
                }
              ]
            },
            {
              id: '4-3',
              label: '团课预约限制',
              position: [
                {
                  id: '4-31',
                  label: '查看：查看团课预约限制'
                },
                {
                  id: '4-32',
                  label: '编辑：编辑团课预约限制内容'
                }
              ]
            },
            {
              id: '4-4',
              label: '私教课',
              position: [
                {
                  id: '4-41',
                  label: '查：查看私教课数据'
                },
                {
                  id: '4-41',
                  label: '增：添加私教课种类'
                },
                {
                  id: '4-41',
                  label: '删：删除私教课课程'
                },
                {
                  id: '4-41',
                  label: '编辑：编辑私教课课程数据'
                }
              ]
            },
            {
              id: '4-5',
              label: '私教预约',
              position: [
                {
                  id: '4-51',
                  label: '查：查看私教课排课数据'
                },
                {
                  id: '4-52',
                  label: '增：私教课预约'
                },
                {
                  id: '4-53',
                  label: '取消：取消私教课预约'
                },
                {
                  id: '4-54',
                  label: '请假：私教请假'
                },
                {
                  id: '4-55',
                  label: '设置：私教预约设置'
                }
              ]
            },
            {
              id: '4-6',
              label: '私教课预约限制',
              position: [
                {
                  id: '4-61',
                  label: '查看：查看私教课预约限制'
                },
                {
                  id: '4-62',
                  label: '编辑：编辑私教课预约限制内容'
                }
              ]
            }
          ]
        },
        {
          id: '5',
          label: '场馆管理',
          icon: 'iconfont icon-set1',
          children: [
            {
              id: '5-1',
              label: '工作人员',
              position: [
                {
                  id: '5-11',
                  label: '查：查看工作人员数据'
                },
                {
                  id: '5-12',
                  label: '增：添加工作人员'
                },
                {
                  id: '5-13',
                  label: '离职：将工作人员设为离职'
                },
                {
                  id: '5-14',
                  label: '编辑：编辑工作人员数据'
                },
                {
                  id: '5-15',
                  label: '超级管理员变更：变更超级管理员'
                }
              ]
            },
            {
              id: '5-2',
              label: '工作人员-职位权限',
              position: [
                {
                  id: '5-21',
                  label: '查：查看工作人员权限数据'
                },
                {
                  id: '5-22',
                  label: '增：添加工作人员职位'
                },
                {
                  id: '5-23',
                  label: '编辑：编辑工作人员职位'
                },
                {
                  id: '5-24',
                  label: '删除：删除工作人员职位'
                }
              ]
            },
            {
              id: '5-3',
              label: '教练',
              position: [
                {
                  id: '5-31',
                  label: '查：查看教练人员数据'
                },
                {
                  id: '5-32',
                  label: '增：添加教练人员'
                },
                {
                  id: '5-33',
                  label: '离职：将工作人员设为离职'
                },
                {
                  id: '5-34',
                  label: '编辑：编辑工作人员数据'
                }
              ]
            },
            {
              id: '5-4',
              label: '教练-职位权限',
              position: [
                {
                  id: '5-41',
                  label: '查：查看教练权限数据'
                },
                {
                  id: '5-42',
                  label: '编辑：编辑教练职位'
                }
              ]
            }
          ]
        },
        {
          id: '6',
          label: '财务报表',
          children: [
            {
              id: '6-1',
              label: '营业流水',
              position: [
                {
                  id: '5-15',
                  label: '超级管理员变更：变更超级管理员'
                }
              ]
            },
            {
              id: '6-2',
              label: '会员卡销售报表',
              position: [
                {
                  id: '5-15',
                  label: '超级管理员变更：变更超级管理员'
                }
              ]
            },
            {
              id: '6-3',
              label: '私教课销售报表',
              position: [
                {
                  id: '5-15',
                  label: '超级管理员变更：变更超级管理员'
                }
              ]
            },
            {
              id: '6-4',
              label: '私教课消课报表',
              position: [
                {
                  id: '5-15',
                  label: '超级管理员变更：变更超级管理员'
                }
              ]
            },
            {
              id: '6-5',
              label: '可视化图表',
              position: [
                {
                  id: '5-15',
                  label: '超级管理员变更：变更超级管理员'
                }
              ]
            }
          ]
        },
        {
          id: '7',
          label: '系统设置',
          children: [
            {
              id: '7-1',
              label: '场馆信息',
              position: [
                {
                  id: '5-15',
                  label: '超级管理员变更：变更超级管理员'
                }
              ]
            },
            {
              id: '7-2',
              label: '场地信息',
              position: [
                {
                  id: '5-15',
                  label: '超级管理员变更：变更超级管理员'
                }
              ]
            }
          ]
        }
      ],
      erji: '',
      sanji: [],
      permissionDefault: [],
      permissionList: [],
      checkList: [],
      current: '',
      posit: [],
      curPage: 1,
      pageCount: 10,
      resourcesArr: [],
      permissionArr: [],
      labelArray: [],
      positionArray: [],
      labelIdx: '',
      a: {},
      passRouter: []
    }
  },
  created () {
    getRoles({
      curPage: this.curPage,
      pageCount: this.PageCount
    }).then(res => {
      console.log(res)
    })
    if (this.$route.params.workerRoleInfo) {
      this.workerRoleInfo = this.$route.params.workerRoleInfo
    } else {
      this.workerRoleInfo = localStorage.getItem('workerRoleInfo')
    }
    getRoleResource(this.workerRoleInfo).then(res => {
      console.log(res)
    })
    this.erji = this.data[0].label
    this.sanji = this.data[0].children
    var data = this.data
    data.map(v => v.children).map(v => v.map(v => {
      if (v.position !== undefined && v.position[0] !== undefined) {
        v = v.position
        this.positionArray = v
      }
      return v.map(v => {
        if (v.label !== undefined && v !== undefined) {
          v = v.label
          this.posit.push(v)
        }
        return v
      })
    }
    ))
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    checkboxChange (e) {
      this.labelArray = e

      for (let i = 0; i < e.length; i++) {
        this.labelIdx = e[i]
        var data = this.data
        data.map(v => v.children).map(v => v.map(v => {
          v = v.position
          this.positionArray = v
          this.positionArray.filter(o => {
          })
        }))
      }
    },
    cancel () {
      this.$router.go(-1)
    },
    click (e) {
      this.erji = e.label
      this.sanji = e.children
    },
    confirm () {
      var arr = []
      this.data.map(o => o.children).map(o => o.map(o => {
        return o.position.map(o => {
          for (let q = 0; q < this.posit.length; q++) {
            if (o.label === this.posit[q]) {
              if (o.router === undefined) {
                return
              }
              let a = o.router
              arr.push(a)
            }
          }
        })
      }))
      for (var i = 0; i < arr.length - 1; i++) {
        if (Object.keys(arr[i])[0] === Object.keys(arr[i + 1])[0]) {
          var routerValue = arr[i + 1][Object.keys(arr[i + 1])[0]][0]
          var routerValueArr = arr[i][Object.keys(arr[i])[0]]
          routerValueArr.push(routerValue)
          arr.splice(i, 1)
          i--
        }
      }
      editRole({
        roleId: this.workerRoleInfo.uid,
        name: this.workerRoleInfo.name,
        isAdmin: this.workerRoleInfo.isAdmin,
        resources: arr,
        permissions: this.permissionArr
      }).then(res => {
                // console.log(res)
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/permission.styl'
</style>
