<template>
  <div class="appMain">
    <div class="add-membe self-order-edit">
      <el-card class="box-card" shadow='hover'>
        <el-form ref="member_register" label-position="right" class="member-details">
          <el-form-item prop="username" label="课程日期">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item prop="username" label="每日最多上课次数">
            <el-input-number v-model="num" controls-position="right" @change="handleChange"></el-input-number>
          </el-form-item>
          <div class="setting">
              <div class="title">设置上课周期</div>
              <div class="choice-day" v-for='(cor, idx) in courseTerms' :key='idx'>
                <el-form-item label="星期">
                  <el-checkbox-group v-model="cor.week">
                    <el-checkbox label="星期一"></el-checkbox>
                    <el-checkbox label="星期二"></el-checkbox>
                    <el-checkbox label="星期三"></el-checkbox>
                    <el-checkbox label="星期四"></el-checkbox>
                    <el-checkbox label="星期五"></el-checkbox>
                    <el-checkbox label="星期六"></el-checkbox>
                    <el-checkbox label="星期日"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <!-- <el-button type="text" v-if='idx !== 0' class="button-text" @click='deleteCourseTerm(idx)'>删除</el-button> -->
                <el-form-item label="可预约时间">
                  <el-time-picker
                    is-range
                    v-model="cor.orderTime"
                    range-separator="至"
                    value-format="HH-mm-ss"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                  </el-time-picker>
                </el-form-item>
                <p>说明：可预约时间段为星期一、星期二、星期三、星期四、星期五、星期六、星期日的 00:00-00:00</p>
              </div>
              <!-- <el-button type="text" @click='addCourseTerm' class="button-text">+增加课程周期</el-button> -->
            </div>
        </el-form>
        <div class="tipMessage tip-color">{{tipMessage}}</div>
        <div class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm" :disabled="disabled">确定</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { ordercoach } from '@/api/coach'
export default {
  data () {
    return {
      date: '',
      num: '',
      courseTerms: [
        {
          week: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
          orderTime: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)]
        }
      ],
      uid: '',
      tipMessage: '',
      disabled: false
    }
  },
  created () {
    if (this.$route.params.uid) {
      this.uid = this.$route.params.uid
    } else {
      this.uid = localStorage.getItem('uid')
    }
  },
  methods: {
    cancel () {
      this.$router.go(-1)
    },
    handleChange () {
      this.tipMessage = ''
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    confirm () {
      this.disabled = true
      ordercoach({
        coachId: this.uid,
        cardId: ''
        // time:
      })
    }
  }
}
</script>

