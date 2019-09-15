<template>
  <div class="appMain" style='width: 50%; margin: 0 auto;'>
    <div class="add-store-btn add-venue">
      <el-button type="primary" @click="add" :disabled="venueManageData.length === 1">添加硬件</el-button>
    </div>
    <div class="amount-tip">
      <h3>中心主机</h3>
    </div>
    <div class="table-modal">
      <el-table
        :data='venueManageData'
        border
        style="width: 100%">
        <el-table-column
          label="中心主机ID">
          <template slot-scope="scope">
            <el-input v-model="scope.row.devid" placeholder="请输入中心主机ID" v-if='editHardWare === true' @blur='blur(scope.row)'></el-input>
            <span v-else>{{scope.row.devid}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click='edit(scope.row)'>编辑</el-button>
            <el-button type="danger" size="mini" class="OrangeRed" @click='deleteH(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <AddHardWare v-if='addHardWareShow'></AddHardWare>
  </div>
</template>
<script>
import { fetchVenue, HardWare, updateHardWare } from '@/api/venue'
import AddHardWare from '@/components/AddHardWare'
export default {
  components: {
    AddHardWare
  },
  data () {
    return {
      name: '',
      number: '',
      data: '',
      venueManageData: [],
      addHardWareShow: false,
      curPage: 1,
      pageCount: 10,
      count: 0,
      editHardWare: false,
      storeUid: '',
      typeId: ''
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    this.HardWare()
    fetchVenue().then(res => {
      if (res.code === 200) {
        this.$store.commit('setLoading', false)
        let data = res.data.res.storeInfo
        this.storeUid = data.uid
      }
    })
  },
  methods: {
    HardWare () {
      HardWare().then(res => {
        if (res.code === 200) {
          let arr = []
          for (let i = 0; i < res.data.res.length; i++) {
            if (res.data.res[i].name === '中心主机' && res.data.res[i].devid) {
              arr.push(res.data.res[i])
            }
          }
          this.venueManageData = arr
        }
      })
    },
    add () {
      this.addHardWareShow = true
    },
    addHardWareShowEventClose () {
      this.addHardWareShow = false
    },
    blur (e) {
      updateHardWare({
        type: e.type,
        id: e.devid
      }).then(res => {
        if (res.code === 200) {
          this.editHardWare = false
          this.HardWare()
        }
      })
    },
    edit (e) {
      if (e.name === e.name) {
        this.editHardWare = true
      }
    },
    deleteH (e) {
      this.$confirm(`确定要删除当前中心主机ID吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateHardWare({
          type: e.type,
          id: ''
        }).then(res => {
          if (res.code === 200) {
            this.editHardWare = false
            this.HardWare()
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
