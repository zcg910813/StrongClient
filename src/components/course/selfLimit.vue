<template>
  <div>
    <div class="add-store-btn">
      <el-button type="primary" class="btn-width-auto" @click='edit' v-if='!editShow'>编辑</el-button>
      <div v-else>
        <el-button class="btn-width-auto" @click='cancel'>取消</el-button>
        <el-button type="primary" class="btn-width-auto" @click='save'>保存</el-button>
      </div>
    </div>
    <div class="suggest">
      <span>会员在私教开始前多少分钟不能预约?</span>
      <div class="suggest-tip">
        <div class="tipMessage tip-color">{{tipMessage}}</div>
        <el-input v-model="orderTime" placeholder="输入几分钟" v-if='editShow' @input="deleteMessage"></el-input>
        <span v-else>{{this.orderTime ? this.orderTime : 60}}分钟</span>
      </div>
    </div>
    <div class="suggest">
      <span>会员在私教开始前多少分钟不能取消预约?</span>
      <div class="suggest-tip">
        <div class="tipMessage tip-color">{{tipMessages}}</div>
        <el-input v-model="cancelTime" placeholder="输入几分钟" v-if='editShow' @input="deleteMessage"></el-input>
        <span v-else>{{this.cancelTime ? this.cancelTime : 60}}分钟</span>
      </div>
    </div>
  </div>
</template>
<script>
import { priOrderTimeSet, priOrderTimeSetQuery } from '@/api/grouplesson'
export default {
  data () {
    return {
      orderTime: '',
      cancelTime: '',
      editShow: false,
      tipMessage: '',
      tipMessages: ''
    }
  },
  mounted () {
    priOrderTimeSetQuery().then(res => {
      if (res.code === 200) {
        let data = res.data
        if (data === null) {
        } else {
          this.orderTime = data.priavteLessonOrderTimeLimit
          this.cancelTime = data.privateLessonCancelOrderTimeLimit
        }
      }
    })
  },
  methods: {
    tipControl (txt) {
      this.tipMessage = txt
    },
    tipControls (txt) {
      this.tipMessages = txt
    },
    deleteMessage () {
      this.tipMessage = ''
      this.tipMessages = ''
    },
    edit () {
      this.editShow = true
    },
    cancel () {
      this.editShow = false
      this.tipMessage = ''
      this.tipMessages = ''
    },
    save () {
      if (!this.orderTime) {
        this.tipControl('会员在私教开始前多少分钟不能预约')
      } else if (!/^[0-9]*$/.test(this.orderTime)) {
        this.tipControl('会员在私教开始前多少分钟不能预约的格式不正确')
      } else if (!this.cancelTime) {
        this.tipControls('会员在私教开始前多少分钟不能取消预约')
      } else if (!/^[0-9]*$/.test(this.cancelTime)) {
        this.tipControls('会员在私教开始前多少分钟不能取消预约的格式不正确')
      } else {
        priOrderTimeSet({
          orderTime: this.orderTime,
          cancelTime: this.cancelTime
        }).then(res => {
          if (res.code === 200) {
            this.editShow = false
          }
        })
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
@import '../../assets/css/course.styl'
</style>
