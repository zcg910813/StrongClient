<template>
  <div class="header">
    <div class="grid-content bg-purple">
      <img src="../assets/img/logo.png" alt="">
    </div>
    <div class="grid-content bg-purple store-select">
      <span v-if='storesInfo.length === 0' class="no-storeTitle">暂无场馆</span>
      <el-select v-model="value" placeholder="请选择" @change="changeStore" v-else>
        <el-option
          v-for="item in storesInfo"
          :key="item.storeID"
          :label="item.storeName"
          :value="item.storeName">
        </el-option>
      </el-select>
    </div>
    <div class="grid-content bg-purple">
      <el-dropdown trigger="click" @command="handleCommand" placement='bottom-start'>
        <span class="el-dropdown-link">
          {{user}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { queryStore } from '../api/vipcard'
import { fetchAllVenue } from '@/api/venue'
export default {
  name: 'Header',
  inject: ['reload'],
  data () {
    return {
      value: '',
      user: localStorage.getItem('username'),
      storesInfo: []
    }
  },
  mounted () {
    fetchAllVenue().then(res => {
      this.storesInfo = res.data.res.allStores
      if (res.data.res.allStores.length === 0) {
      } else {
        const storeid = localStorage.getItem('storeid')
        if (storeid === null || storeid === undefined) {
          this.value = this.storesInfo[0].storeName
        } else {
          let currentStore = this.storesInfo.filter((v) => { return v.storeID === storeid })
          let current = currentStore.find((v) => { return v.storeID })
          this.value = current.storeName
        }
      }
    })
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    changeStore (v) {
      const temp = this.storesInfo.filter((o) => { return o.storeName === v })
      let changeStoreId = temp.find((o) => { return o.storeID })
      this.reload()
      localStorage.setItem('storeid', changeStoreId.storeID)
    },
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
        default:
          break
      }
    },
    logout () {
      this.$router.replace({
        path: 'login'
      })
      this.$cookies.remove('token')
      localStorage.removeItem('storeid')
    }
  }
}
</script>
<style scoped lang='stylus'>
@import '../assets/css/header.styl'
</style>
