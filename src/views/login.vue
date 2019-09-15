<template>
  <div class="login-content">
    <div class="login-modal">
        <el-form>
          <img src="../assets/img/logo.png" alt="">
          <div class="tipMessage tip-color">{{tipMessage}}</div>
          <el-form-item>
              <el-input v-model="username" placeholder="请输入账号" @input="deleteMessage"></el-input>
          </el-form-item>
          <el-form-item class="psd">
              <el-input v-model="password" placeholder="请输入密码" :type='type' @input="deleteMessage" @keyup.enter.native='login'>
              </el-input>
              <span @click='visible' class="visible">
              <img src="../assets/img/visible.png" alt="" v-if='show'>
              <img src="../assets/img/invisible.png" alt="" v-if='!show'>
              </span>
          </el-form-item>
          <el-button type="primary" class="login-btn" @click='login'>登录</el-button>
        </el-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      tipMessage: '',
      show: false,
      type: 'password'
    }
  },
  created () {
  },
  computed: {
  },
  beforeCreate () {
    this.$store.commit('setLoading', false)
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    visible () {
      if (this.show) {
        this.show = false
        this.type = 'password'
      } else {
        this.show = true
        this.type = 'text'
      }
    },
    login () {
      if (!this.username) {
        this.tipControl('请输入账号')
      } else if (!this.password) {
        this.tipControl('请输入密码')
      } else {
        this.$router.replace({path: 'home'})
        this.$store.dispatch('handleLogin', {
          username: this.username,
          password: this.password
        }).then(res => {
          if (res.code !== 200) {
            throw res
          }
          this.$router.replace({path: 'home'})
          localStorage.setItem('username', this.username)
        }).catch(err => {
          this.tipControl(err.errMsg)
        })
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
<style lang="stylus" scoped>
@import '../assets/css/login.styl'
</style>
