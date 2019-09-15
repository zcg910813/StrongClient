<template>
  <div class="app-side">
    <div @click='intoStore' class="venue" :class="isActive === true ? 'define-active' : ''">
      <i class="iconfont icon-kaikuang"></i>场馆列表</div>
    <div @click='intoHomeSuvery' v-if='sideIsShow !== null' class='venue' :class="isHomeNav ? 'define-active' : ''">
      <i class="iconfont icon-gaikuang"></i>
      首页概况</div>
    <el-menu :default-active="current" :router="true" :unique-opened="true" class="el-menu-demo" v-if='sideIsShow !== null'>
      <el-submenu v-for="(item,index) in data" :index="item.id" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span >{{item.label}}</span>
        </template>
        <template v-for="(i,index2) in item.children">
          <el-menu-item :key="index2" :index="i.router">{{i.label}}</el-menu-item>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: 'SideBar',
  data () {
    return {
      isActive: true,
      isHomeNav: false,
      sideIsShow: localStorage.getItem('storeid'),
      data: [
        {
          id: '1',
          label: '工作台',
          icon: 'iconfont icon-gongzuotai',
          children: [
            {
              id: '1-1',
              label: '会员签到',
              router: '/memberSignin'
            },
            {
              id: '1-2',
              label: '教练签到',
              router: '/coachSignin'
            },
            {
              id: '1-3',
              label: '私教消课',
              router: '/removeCourse'
            },
            {
              id: '1-4',
              label: '预约体验',
              router: '/orderExperience'
            },
            {
              id: '1-5',
              label: '团课预约',
              router: '/orderCourse'
            },
            {
              id: '1-6',
              label: '押金定金',
              router: '/payCash'
            }
          ]
        },
        {
          id: '2',
          label: '会员管理',
          icon: 'iconfont icon-MemberCentre',
          children: [
            {
              id: '2-1',
              label: '会员',
              router: '/member'
            },
            {
              id: '2-2',
              label: '会员卡',
              router: '/memberCard'
            }
          ]
        },
        {
          id: '3',
          label: '课程',
          icon: 'iconfont icon-buffer',
          children: [
            {
              id: '3-1',
              label: '团课',
              router: '/course'
            },
            {
              id: '3-2',
              label: '私教课',
              router: '/selfCourse'
            }
          ]
        },
        {
          id: '4',
          label: '场馆管理',
          icon: 'iconfont icon-set1',
          children: [
            {
              id: '4-1',
              label: '工作人员',
              router: '/worker'
            },
            {
              id: '4-2',
              label: '教练',
              router: '/trainer'
            }
          ]
        },
        {
          id: '5',
          label: '财务报表',
          icon: 'iconfont icon-baobiao',
          children: [
            {
              id: '5-1',
              label: '营业流水',
              router: '/businessData'
            },
            {
              id: '5-2',
              label: '会员卡销售报表',
              router: '/salesReport'
            },
            {
              id: '5-2',
              label: '私教课销售报表',
              router: '/privateSaleReport'
            },
            {
              id: '5-4',
              label: '私教课消课报表',
              router: '/removeCourseReport'
            }
            // {
            //   id: '5-5',
            //   label: '可视化图表',
            //   router: '/financialChart'
            // }
          ]
        },
        {
          id: '6',
          label: '系统设置',
          icon: 'iconfont icon-setman',
          children: [
            {
              id: '6-1',
              label: '场管信息',
              router: '/venueInfo'
            },
            {
              id: '6-2',
              label: '场地管理',
              router: '/venueManage'
            },
            {
              id: '6-3',
              label: '智能硬件',
              router: '/hardWare'
            }
            // {
            //   id: '6-3',
            //   label: '短信通知',
            //   router: '/messageNotice'
            // }
          ]
        }
        // {
        //   id: '7',
        //   label: '智能健身房',
        //   icon: 'iconfont icon-intelligence2',
        //   router: '/venueInfo'
        // }
      ]
    }
  },
  mounted () {
  },
  watch: {
    current () {
      if (this.$route.path === '/home') {
        this.isActive = true
        this.isHomeNav = false
      } else if (this.$route.path === '/homeSurvey') {
        this.isActive = false
        this.isHomeNav = true
      } else {
        this.isActive = false
        this.isHomeNav = false
      }
    }
  },
  computed: {
    current () {
      var arr = this.$route.path.split('/')
      if (arr.length > 2) {
        arr.pop()
        return arr.join('/')
      } else {
        let _t = this
        if (this.$route.path !== '/home' && this.$route.path !== '/homeSurvey') {
          _t.isActive = false
          _t.isHomeNav = false
        }
        return this.$route.path
      }
    }
  },
  methods: {
    intoStore () {
      this.isActive = true
      this.isHomeNav = false
      this.$router.push({name: 'home'})
      // localStorage.setItem('storeid', null)
    },
    intoHomeSuvery () {
      this.isHomeNav = true
      this.isActive = false
      this.$router.push({name: 'homeSurvey'})
    }
  }
}
</script>
<style scoped lang='stylus'>
@import '../assets/css/side.styl'
</style>
