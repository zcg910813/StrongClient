<template>
  <div class="appMain">
      <div class="add-store-btn">
        <el-button type="primary" @click='addStore'>添加场馆</el-button>
      </div>
      <div class='no-data' v-if='storesInfo.length <= 0'>
        <svg viewBox="0 0 1024 1024" width="120" height="120">
            <path d="M624.76 961.298H391.153a6.614 6.614 0 0 1-6.612-6.61 6.61 6.61 0 0 1 6.612-6.606h233.605a6.61 6.61 0 0 1 6.612 6.606 6.612 6.612 0 0 1-6.612 6.61zM601.66 153.254c-7.511 0-14.305-5.153-16.078-12.782l-13.118-56.32c-2.07-8.89 3.458-17.77 12.343-19.84 8.89-2.07 17.771 3.457 19.841 12.343l13.117 56.325c2.07 8.89-3.454 17.77-12.343 19.84a16.75 16.75 0 0 1-3.762 0.434z m183.91 145.25c-1.088 0-2.188-0.104-3.292-0.33l-56.686-11.447c-8.943-1.805-14.73-10.521-12.927-19.467 1.81-8.946 10.525-14.73 19.47-12.925l56.688 11.446c8.941 1.805 14.73 10.525 12.925 19.468-1.588 7.844-8.476 13.256-16.178 13.256zM695.21 184.91c-4.759 0-9.481-2.042-12.749-5.996-5.809-7.037-4.818-17.454 2.215-23.264l48.609-40.159c7.036-5.815 17.448-4.822 23.263 2.214 5.815 7.033 4.818 17.448-2.214 23.264l-48.609 40.158a16.464 16.464 0 0 1-10.515 3.783z m159.61 729.905H465.117l273.162-99.01c16.922-6.132 30.443-18.488 38.076-34.792 7.629-16.305 8.45-34.605 2.318-51.529l-17.71-48.85c-2.174-6.005-8.81-9.11-14.813-6.931-6.006 2.174-9.11 8.81-6.932 14.813l17.704 48.849c4.027 11.116 3.489 23.132-1.521 33.844-5.01 10.706-13.892 18.822-25.008 22.849L422.989 905.483c-11.122 4.026-23.138 3.487-33.845-1.523-10.707-5.014-18.823-13.89-22.85-25.008L196.442 410.341c-8.315-22.94 3.584-48.375 26.53-56.69l307.406-111.428c11.116-4.027 23.132-3.484 33.843 1.526 10.707 5.01 18.823 13.892 22.847 24.99l69.38 192.09c2.17 6.01 8.797 9.12 14.81 6.95 6.005-2.17 9.114-8.798 6.944-14.804L608.816 260.87c-6.133-16.922-18.488-30.443-34.792-38.076-16.306-7.629-34.606-8.45-51.528-2.318l-307.41 111.424c-34.937 12.665-53.055 51.389-40.394 86.324l169.853 468.609c8.262 22.793 27.611 38.414 49.767 43.016a8.114 8.114 0 0 0 4.44 1.318h5.793c1.14 0.056 2.279 0.1 3.427 0.1 1.144 0 2.288-0.039 3.436-0.1h443.414c4.518 0 8.176-3.662 8.176-8.177s-3.66-8.176-8.177-8.176z m-80.245-494.862L756.61 410.2c-7.175-3.887-17.448 1.175-22.954 11.317L584.131 697.114c-0.666 1.227-1.01 2.58-0.965 3.823l0.978 30.492c-0.465 0.03-0.931 0.125-1.387 0.3l-46.448 17.309a4.956 4.956 0 1 0 3.461 9.29l44.706-16.662 0.012 0.356c0.11 3.362 2.874 4.862 5.749 3.118l35.162-21.289c1.065-0.644 2.014-1.666 2.68-2.893l149.524-275.6c5.502-10.136 4.149-21.514-3.027-25.405z m-334.26 364.87l-34.088 12.703a4.954 4.954 0 0 0-2.913 6.375 4.957 4.957 0 0 0 6.375 2.914l34.087-12.704a4.956 4.956 0 0 0 2.915-6.375 4.95 4.95 0 0 0-6.377-2.913z m71.22-26.552l-46.448 17.314a4.955 4.955 0 0 0-2.914 6.375 4.957 4.957 0 0 0 6.375 2.914l46.448-17.312a4.953 4.953 0 0 0 2.914-6.377 4.953 4.953 0 0 0-6.376-2.914z m-136.713-76.617a4.96 4.96 0 0 1-4.65-3.228 4.96 4.96 0 0 1 2.913-6.375l29.148-10.864a4.957 4.957 0 0 1 3.462 9.289l-29.147 10.864a4.9 4.9 0 0 1-1.726 0.314z m53.916-20.098c-2.01 0-3.901-1.236-4.645-3.232a4.956 4.956 0 0 1 2.913-6.376l46.448-17.314a4.956 4.956 0 0 1 6.375 2.913 4.953 4.953 0 0 1-2.913 6.377l-46.448 17.314a4.914 4.914 0 0 1-1.73 0.318z m71.219-26.546a4.963 4.963 0 0 1-4.644-3.227 4.953 4.953 0 0 1 2.913-6.376l46.448-17.319a4.956 4.956 0 0 1 6.375 2.914 4.953 4.953 0 0 1-2.913 6.376l-46.449 17.314a4.947 4.947 0 0 1-1.73 0.318z m71.22-26.552a4.957 4.957 0 0 1-1.73-9.603l46.447-17.313a4.955 4.955 0 0 1 6.376 2.913 4.954 4.954 0 0 1-2.913 6.375l-46.448 17.315a4.953 4.953 0 0 1-1.731 0.313z m0 0" p-id="2186" fill="#e6e6e6"></path>
        </svg>
        <p>暂无场馆, 去添加场馆~</p>
      </div>
      <div class="box-store" v-else>
        <el-card class="box-card" v-for='store in storesInfo' :key='store.storeID'>
          <div slot="header" class="clearfix store-name">
            <span>{{store.storeName}}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click='deleteStore(store)'>删除</el-button>
          </div>
          <div class="reveal-info">
            <div>
              <div>
                <img :src='store.logourl' alt="" v-if='store.logourl !== ""'>
                <!-- <svg viewBox="0 0 1024 1024" width="100%" height="100%" v-else>
                  <path d="M910.2 113.8H113.8C51.2 113.8 0 165 0 227.6v568.9C0 859 51.2 910.2 113.8 910.2h796.4c62.6 0 113.8-51.2 113.8-113.8V227.6c0-62.6-51.2-113.8-113.8-113.8z m-796.4 56.9h796.4c31.4 0 56.9 25.5 56.9 56.9v471.8L768 500.2 583.1 685.1 257 359 56.9 559.2V227.6c0-31.4 25.5-56.9 56.9-56.9zM56.9 796.4V639.6L257 439.4l413.9 413.9H113.8c-31.4 0-56.9-25.5-56.9-56.9z m853.3 56.9H751.3l-128-128L768 580.7l199.1 199.1v16.7c0 31.3-25.5 56.8-56.9 56.8z" p-id="6237" fill="#cccccc"></path><path d="M682.7 455.1c62.8 0 113.8-50.9 113.8-113.8s-50.9-113.8-113.8-113.8-113.8 50.9-113.8 113.8 50.9 113.8 113.8 113.8z m0-170.7c31.4 0 56.9 25.5 56.9 56.9s-25.5 56.9-56.9 56.9-56.9-25.5-56.9-56.9 25.5-56.9 56.9-56.9z" p-id="6238" fill="#cccccc"></path>
                </svg> -->
                <img src="../assets/img/upload-icon.png" alt="" v-else>
              </div>
            </div>
            <ul>
              <li>电话: {{store.storePhone}}</li>
              <li>地址: {{store.storeAddr}}</li>
              <li>邮箱: {{store.mail ? store.mail : '暂无'}}</li>
              <li>微信: {{store.weChat ? store.weChat : '暂无'}}</li>
            </ul>
          </div>
          <el-button type="primary" class="into" @click='intoStoreBtn(store)'>进入场馆</el-button>
        </el-card>
      </div>
      <add-store v-if='addStoreShow'></add-store>
  </div>
</template>
<script>
import AddStore from '../components/AddStore'
import { deleteVenue, fetchAllVenue } from '@/api/venue'
// import { queryStore } from '@/api/vipcard'
import { isArray } from 'util'
export default {
  name: 'home',
  inject: ['reload'],
  components: {
    AddStore
  },
  data () {
    return {
      storesInfo: [],
      imgUrl: '',
      addStoreShow: false
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    fetchAllVenue().then(res => {
      if (res.code === 200) {
        let data = res.data.res
        this.$store.commit('setLoading', false)
        if (data.allStores) {
          this.storesInfo = data.allStores
          this.storesInfo.map(item => {
            let pic = item.pictureurl
            if (!isArray(pic)) {
              item.pictureurl = item.pictureurl.split(' ')
            }
            return item.pictureurl
          })
        }
      } else {
        throw res
      }
    }).catch(err => {
      alert(err.errMsg)
    })
  },
  methods: {
    addStore () {
      this.addStoreShow = true
    },
    addStoreCloseEvent () {
      this.addStoreShow = false
    },
    getStoreInfo () {
    },
    deleteStore (v) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteVenue({storeid: v.storeID}).then(res => {
          fetchAllVenue().then(res => {
            let data = res.data.res
            this.storesInfo = data.allStores
            if (data.allStores.length === 0) {
              localStorage.removeItem('storeid')
              this.reload()
            }
          })
        })
      }).catch(() => {
      })
    },
    intoStoreBtn (e) {
      localStorage.setItem('storeid', e.storeID)
      this.$router.push({name: 'homeSurvey'})
      this.reload()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/home.styl'
</style>
