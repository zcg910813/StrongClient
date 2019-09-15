<template>
  <div class="appMain">
    <div class="add-store-btn add-venue">
      <el-button type="primary" @click="add">添加</el-button>
    </div>
    <div class="table-modal">
      <el-table
        :data='venueManageData'
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="场地名称">
        </el-table-column>
        <el-table-column
          prop="number"
          label="可容纳人数">
        </el-table-column>
        <el-table-column
          prop="type"
          label="场地适用">
          <template slot-scope="scope">
            {{scope.row.type === 1 ? '私教课' : '团课'}}
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click='edit(scope.row)'>编辑</el-button>
            <el-button type="danger" size="mini" class="OrangeRed" @click='deletePlace(scope.row)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        :total="count"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next, sizes"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        >
      </el-pagination>
    </div>
    <addVenue v-if='addVenueShow' :placeUid='placeUid'></addVenue>
  </div>
</template>
<script>
import { getCurrentStoreData } from '@/api/venue'
import { getPlaceList, deletePlace } from '@/api/place'
import AddVenue from '@/components/AddVenue'
export default {
  components: {
    AddVenue
  },
  data () {
    return {
      name: '',
      number: '',
      data: '',
      venueManageData: [],
      addVenueShow: false,
      curPage: 1,
      pageCount: 10,
      count: 0
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    getCurrentStoreData().then(res => {
      if (res.code === 200) {
        this.$store.commit('setLoading', false)
        // let currentStoreId = localStorage.getItem('storeid')
        // this.venueManageData = res.data.res.allStores.filter((o) => { return o.storeID === currentStoreId })
      } else {
        throw res
      }
    })
    this.getPlaceList()
  },
  methods: {
    getPlaceList () {
      getPlaceList().then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          let data = res.data.res
          this.venueManageData = data.allRoomInfo
          this.count = data.count
        }
      })
    },
    add () {
      this.placeUid = null
      this.addVenueShow = true
    },
    addVenueEventClose () {
      this.addVenueShow = false
    },
    edit (e) {
      this.placeUid = e.uid
      this.addVenueShow = true
    },
    deletePlace (e) {
      this.$confirm(`确定要删除该场地吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePlace({uid: e.uid}).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getPlaceList()
          } else {
            this.$alert('已经绑定课程的场地无法进行删除操作', '场地删除提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `取消删除`
                })
              }
            })
          }
        })
      }).catch(() => {
      })
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getPlaceList()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getPlaceList()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
