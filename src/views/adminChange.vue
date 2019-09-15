<template>
  <div class="appMain">
    <h3 class="title">变更超级管理员</h3>
    <div class="admin-change">
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <h4>原超级管理员</h4>
            <span class="pic"><img src="" alt=""></span>
            <span>admin</span>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple-light">
            <h4>新超级管理员</h4>
            <el-form ref="form">
              <el-form-item label="姓名">
                <el-input v-model="name" placeholder="请输入姓名" @input="deleteMessage"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input placeholder="请输入手机号" v-model="tel" @input="deleteMessage" maxlength="11" class="input-with-select"></el-input>
              </el-form-item>
              <el-form-item label="验证码" class="get-code">
                <el-input v-model="code" placeholder='请输入验证码' @input="deleteMessage"></el-input>
                <div class='codeBtn' v-if='timeDown === 60' @click='getCode'>发送验证码</div>
                <div class='codeBtn' v-else>已发送 ({{timeDown}})</div>
              </el-form-item>
              <div class="tipMessage tip-color" style='text-indent: 45px;'>{{tipMessage}}</div>
            </el-form>
            <el-button type="primary">身份变更</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  name: 'adminChange',
  data () {
    return {
      areaCode: '1',
      name: '',
      tel: '',
      code: '',
      timeDown: 60,
      tipMessage: ''
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  },
  methods: {
    timeControl () {
      clearInterval(this.time)
      this.time = setInterval(() => {
        if (this.timeDown <= 1) {
          clearInterval(this.time)
          this.timeDown = 60
        } else {
          this.timeDown--
        }
      }, 1000)
    },
    getCode () {
      if (!this.tel) {
        this.tipControl('请输入手机号')
      } else if (!/^(1\d{10})$/.test(this.tel)) {
        this.tipControl('请输入格式正确的手机号')
      } else {
        this.timeControl()
      }
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../assets/css/Controller.styl'
</style>
