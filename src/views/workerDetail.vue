<template>
  <div class="appMain">
    <div class="trainer-info">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card shadow="hover">
            <el-row :gutter="20">
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <img src="../assets/img/upload-icon.png" alt="" v-if='PersonneList[5] && PersonneList[5].length == 0'>
                  <img :src="PersonneList[5]" alt="" v-else>
                </div>
              </el-col>
              <el-col :span="12">
                <div class="grid-content bg-purple worker-ifo">
                  <h2>{{PersonneList[1]}}</h2>
                  <p><strong>性<span style="margin: 0 13px;"></span>别:</strong> {{PersonneList[2] === '1' ? '男' : '女'}}</p>
                  <p><strong>手<span style='margin: 0 6px;'>机</span>号: </strong>{{PersonneList[3]}}</p>
                  <p><strong>身<span style="margin: 0 13px;"></span>份: </strong> {{PersonneList[4]}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  <el-button plain @click='editData'>修改资料</el-button>
                  <el-button @click='leaveBtn' type="primary">离职</el-button>
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
import { deleteEmployee } from '@/api/person'
// import { getAllWorker } from '@/api/data'
import Face from '../components/Face.vue'
export default {
  components: {
    Face
  },
  data () {
    return {
      activeName: 'introduce',
      faceShow: false,
      PersonneList: [],
      workerInfo: []
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  created () {
    if (this.$route.params.PersonneList) {
      this.PersonneList = this.$route.params.PersonneList
    } else {
      this.PersonneList = localStorage.getItem('PersonneList').split(',')
    }
    if (this.PersonneList !== null || this.PersonneList !== undefined) {
      this.$store.commit('setLoading', false)
    }
    // getAllWorker({
    //   id: this.PersonneList
    // }).then(res => {
    //   if (res.code === 200) {
    //     this.$store.commit('setLoading', false)
    //     this.workerInfo = res.data.employees[0]
    //   }
    // })
  },
  methods: {
    editData () {
      this.$router.push({name: 'editWorkerInfo', params: {PersonneList: this.PersonneList}})
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
      this.$confirm(`确定将${this.workerInfo.name}设为离职吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteEmployee(this.PersonneList[0]).then(res => {
          if (res.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 1000
            })
          }
          this.$router.push({name: 'worker'})
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
