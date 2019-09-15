<template>
  <div>
    <div class="add-store-btn">
      <el-button type="primary" @click='addSelfCourse'>添加私教课</el-button>
    </div>
    <div class="course-data table-modal">
      <div class="amount-tip">
        <h5>课程数量: <strong>{{this.count}}</strong></h5>
      </div>
      <el-table
        :data='allCards'
        border
        style="width: 100%">
        <el-table-column
          prop="privatename"
          width='100'
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="param"
          label="时长（分钟）">
        </el-table-column>
        <el-table-column
          prop="validity"
          label="有效天数"
          >
          <template slot-scope="scope">
            {{scope.row.validity !== 0 ? scope.row.validity : '无限期'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="price"
          label="售价(单价)">
        </el-table-column>
        <el-table-column
          label="操作"
          width='210'
          class-name="operate">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" class="DoderBlue" @click='selfCourseDetail(scope.row)'>详情</el-button>
            <el-button type="danger" size="mini" class="OrangeRed" @click='deleteSelfCourse(scope)'>删除</el-button>
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
  </div>
</template>
<style lang='stylus' scoped>
@import '../../assets/css/course.styl'
</style>
<script>
import { getAllPrivates, deletePrivate } from '@/api/persongroup'
export default {
  data () {
    return {
      allCards: [],
      pageCount: 10,
      curPage: 1,
      count: 0
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    this.getAllCourseData()
  },
  methods: {
    getAllCourseData () {
      getAllPrivates({
        pageCount: this.pageCount,
        curPage: this.curPage
      }).then(res => {
        if (res.code === 200) {
          this.$store.commit('setLoading', false)
          this.allCards = res.data.res.allCards
          this.count = res.data.res.count
        }
      })
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getAllCourseData()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getAllCourseData()
    },
    addSelfCourse () {
      this.$router.push({name: 'addSelfCourse', params: {selfCourseUid: 'null'}})
      localStorage.setItem('selfCourseUid', 'null')
    },
    selfCourseDetail (e) {
      this.$router.push({name: 'selfCourseDetail', params: {selfCourseUid: e.uid}})
      localStorage.setItem('selfCourseUid', e.uid)
    },
    deleteSelfCourse (e) {
      this.$confirm(`是否确认删除私教课吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deletePrivate({
          uids: [e.row.uid]
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getAllCourseData()
          } else {
            this.$alert(`已经有会员购买的私教课不可以删除`, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            }).catch(() => {
            })
          }
        })
      }).catch(() => {
      })
    }
  }
}
</script>
