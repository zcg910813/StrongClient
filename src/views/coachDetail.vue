<template>
  <div class="appMain">
    <div class="trainer-info">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card shadow="hover">
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <img src="../assets/img/upload-icon.png" alt="" v-if='courseDetailList[5] && courseDetailList[5].length == 0'>
                  <img :src="courseDetailList[5]" alt="" v-else>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple worker-ifo">
                  <h2>{{courseDetailList[1]}}</h2>
                  <p><strong>性<span style="margin: 0 13px;"></span>别:</strong> {{courseDetailList[2] === 1 ? '男' : '女'}}</p>
                  <p><strong>手<span style='margin: 0 6px;'>机</span>号: </strong>{{courseDetailList[3]}}</p>
                  <p><strong>教练类型: </strong> {{courseDetailList[4] === '1' ? '团课教练' : '私课教练'}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-button plain @click='editData'>修改资料</el-button>
                  <el-button @click='leaveBtn' type='primary'>离职</el-button>
                </div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="introduce">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="介绍" name="introduce"></el-tab-pane>
        <el-tab-pane label="人脸识别ID" name="faceCheck">
          <div class="face-check">
            <h3>当前人脸</h3>
            <el-button type='primary' @click='face'>添加人脸ID</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <face v-if='faceShow'></face>
  </div>
</template>
<script>
// import { getCoachData } from '@/api/data'
import { deleteCoach } from '@/api/coach'
import Face from '../components/Face.vue'
export default {
  components: {
    Face
  },
  data () {
    return {
      activeName: 'introduce',
      faceShow: false,
      courseDetailList: '',
      coachInfo: [],
      isCoach: ''
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    if (this.$route.params.courseDetailList) {
      this.courseDetailList = this.$route.params.courseDetailList
    } else {
      this.courseDetailList = localStorage.getItem('courseDetailList').split(',')
    }
    if (this.courseDetailList !== null) {
      this.$store.commit('setLoading', false)
    }
    // getCoachData({
    //   coachId: this.courseDetailList
    // }).then(res => {
    //   this.coachInfo = res.data.coachs[0]
    // })
  },
  methods: {
    editData () {
      this.$router.push({name: 'editCoachInfo', params: {courseDetailList: this.courseDetailList}})
      localStorage.setItem('courseDetailList', this.courseDetailList)
    },
    handleClick (e) {
      switch (e.name) {
        case 'introduce':
          break
        case 'faceCheck':
          break
        default:
          break
      }
    },
    face () {
      this.faceShow = true
    },
    faceCloseEvent () {
      this.faceShow = false
    },
    leaveBtn () {
      this.$confirm(`确定将${this.coachInfo.name}设为离职吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteCoach(this.courseDetailList).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '离职成功',
              duration: 1000
            })
          }
          this.$router.push({name: 'trainer'})
        })
      }).catch(() => {
        this.$message({
          type: 'success',
          message: '已经取消',
          duration: 1000
        })
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../assets/css/Controller.styl'
</style>
