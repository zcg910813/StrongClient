<template>
  <div>
    <div class="add-store-btn">
      <el-button type="primary" @click='addCourseBtn'>添加团课</el-button>
    </div>
    <div class="course-data table-modal">
      <div class="amount-tip">
        <!-- <h5>课程数量: <strong>{{courseAmount}}</strong></h5> -->
        <h5>课程</h5>
      </div>
      <el-table
        :data='courseData'
        border
        style="width: 100%">
        <el-table-column
          prop="coursename"
          width='100'
          label="课程名称">
        </el-table-column>
        <el-table-column
          prop="coursetime"
          label="时长（分钟）">
        </el-table-column>
        <el-table-column
          prop="maxcoursemember"
          label="可约人数"
          >
        </el-table-column>
        <el-table-column
          prop="mincoursemember"
          label="最少开课人数">
        </el-table-column>
        <el-table-column
          label="操作"
          width='210'
          class-name="operate">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" class="DoderBlue" @click='courseDetail(scope)'>详情</el-button>
              <el-button type="danger" size="mini" class="OrangeRed" @click='deleteCourse(scope)'>删除</el-button>
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
import { getCourse, deleteCourse } from '@/api/course'
export default {
  data () {
    return {
      name: '',
      count: 0,
      courseData: [],
      curPage: 1,
      pageCount: 10
    }
  },
  created () {
    this.getCourse()
  },
  methods: {
    getCourse () {
      getCourse({
        curPage: this.curPage,
        pageCount: this.pageCount
      }).then(res => {
        if (res.code === 200) {
          this.courseData = res.data.coursesInfo.allCourse
          this.count = res.data.coursesInfo.courseCount
        }
      })
    },
    courseDetail (e) {
      this.$router.push({name: 'courseDetail', params: {courseId: e.row.uid}})
      localStorage.setItem('courseId', e.row.uid)
    },
    deleteCourse (e) {
      this.$confirm(`是否确认删除该团课吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCourse({
          courseIds: e.row.uid
        }).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getCourse()
          } else {
            this.$alert(`已经排课的团课数据不可以删除`, '提示', {
              confirmButtonText: '确定',
              type: 'warning'
            })
          }
        })
      }).catch(() => {
      })
    },
    handleCurrentChange (curPage) {
      this.curPage = curPage
      this.getCourse()
    },
    handleSizeChange (pageSize) {
      this.pageCount = pageSize
      this.getCourse()
    },
    addCourseBtn () {
      this.$router.push({name: 'addCourse', params: {courseId: null}})
      localStorage.setItem('courseId', null)
    }
  }
}
</script>
