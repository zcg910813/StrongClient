<template>
  <div class="appMain">
    <div class="add-membe">
      <el-card class="box-card" shadow='hover'>
        <el-form ref="member_register" :model="form" @keydown.enter.native="handleSubmit" label-position="right" class="member-details">
          <el-form-item prop="username" label="temp">
            <span slot="label"><i>*</i>姓名: </span>
            <el-input size="small" placeholder="请输入工作人员姓名" v-model="form.username" @input="changeEvent"/>
          </el-form-item>
          <el-form-item label="性别: " prop="sex">
            <el-radio-group v-model="form.sex" size="medium">
              <el-radio-button label="1">男</el-radio-button>
              <el-radio-button label="2">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item prop="cellphone" label="temp">
            <span slot="label"><i>*</i>电话: </span>
            <el-input size="small" placeholder="请输入手机号码" maxlength="11" v-model="form.cellphone" @input="changeEvent"/>
          </el-form-item>
          <el-form-item prop="idcard" label="身份证号: ">
            <el-input size="small" placeholder="请输入身份证号" maxlength="18" v-model="form.idcard" @input="changeEvent"/>
          </el-form-item>
          <el-form-item label="出生日期: ">
            <el-row>
              <el-col :span="11">
                <el-form-item prop="birthday">
                  <el-date-picker :editable='false' type="date" placeholder="请选择会员出生日期" value-format="yyyy-MM-dd" v-model="form.birthday" @on-change="dateChange"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="潜客来源: ">
            <el-select v-model="form.from" @change='changeEvent'>
              <el-option v-for="item in memberFrom" :value="item.value" :key="item.value" :label="item.label">{{ item.label }}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-show="this.form.from === '其他'" label="描述其他来源: ">
            <el-input v-model="form.from" type="textarea" @input="changeEvent" :autosize="{minRows:1,maxRows:3}" placeholder="请输入内容..."></el-input>
          </el-form-item>
          <el-form-item label="会籍归属: ">
            <el-select v-model="form.belong" @change='changeEvent'>
              <el-option v-for="item in clubList"
              :key="item.uid"
              :label="item.name"
              :value="item.uid"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="添加标签: ">
            <el-input style='width: 170px' v-model="tag" placeholder="请输入标签..." @input="changeEvent"></el-input>
            <el-button type="dashed" style='padding: 8px 13px;' size="small" @click="handleAdd"><i class="el-icon-plus"></i> 添加标签</el-button>
          </el-form-item>
          <el-form-item v-if="tags.length > 0 || getTags.length > 0" label="标签: " class="tags">
            <div v-if='memberid === "null"'>
              <el-tag v-for="(item, index) in tags" :key="index" :name="item" closable @close="handleClose(index)">{{ item }}</el-tag>
            </div>
            <div v-else class="get-tags">
              <span v-for='(item, idx) in getTags' :key='item'>{{item}}<i class="el-icon-circle-close" @click='deleteDeftTag(idx)'></i></span>
            </div>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input v-model="form.remark" @input="changeEvent" type="textarea" placeholder="请输入内容..."></el-input>
          </el-form-item>
        </el-form>
        <div class="tipMessage tip-color">{{tipMessage}}</div>
        <div class="dialog-footer clearfix">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addMember" :disabled="disabled">确 定</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script>
import { getAllWorker } from '@/api/data'
import { registerMember, queryMemberInfo, updateMembers } from '@/api/member'
// import { queryVipCardDetails } from '@/api/vipcard'
// import { getEmployeeData } from '@/api/data'
export default {
  data () {
    return {
      tag: '',
      form: {
        username: '',
        sex: '1',
        cellphone: '',
        idcard: '',
        birthday: '',
        from: '',
        belong: '',
        remark: ''
      },
      tags: [],
      tipMessage: '',
      memberFrom: [
        {
          value: '1',
          label: '会籍带客'
        },
        {
          value: '2',
          label: '朋友介绍'
        },
        {
          value: '3',
          label: '网络广告'
        },
        {
          value: '4',
          label: '传单广告'
        },
        {
          value: '5',
          label: '场馆招牌'
        },
        {
          value: '6',
          label: '手机注册'
        },
        {
          value: '7',
          label: '自然到店'
        },
        {
          value: '8',
          label: '营销活动'
        }
      ],
      clubList: [],
      memberid: '',
      getTags: [],
      disabled: false
    }
  },
  created () {
    getAllWorker({
      curPage: 1,
      pageCount: 1000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data
        for (let v of data.employees) {
          this.clubList.push({name: v.name + ' ' + '(' + v.cellphone + ')', uid: v.id})
        }
      }
    })
    if (this.$route.params.addMemberId) {
      this.memberid = this.$route.params.addMemberId
    } else {
      this.memberid = localStorage.getItem('addMemberId')
    }
    if (this.memberid === 'null') {
    } else {
      queryMemberInfo(this.memberid).then(res => {
        let data = res.data.res
        this.form = data
        let temp = this.clubList.find((o) => o.uid === Number(data.belong)) ? this.clubList.find((o) => o.uid === Number(data.belong)).name : ''
        this.form.belong = temp
        if (data.tags.length > 1) {
          this.getTags = data.tags.split(',')
        }
      })
    }
    // getEmployeeData().then(res => {
    // })
  },
  methods: {
    changeEvent () {
      this.tipMessage = ''
      this.disabled = false
    },
    addMember () {
      this.disabled = true
      if (!this.form.username) {
        this.tipControl('请输入会员名')
      } else if (this.form.cellphone && !/^1[0-9]{10}$/.test(this.form.cellphone)) {
        this.tipControl('请输入正确的电话')
      } else if (this.form.idcard && !/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(this.form.idcard)) {
        this.tipControl('请输入正确身份证号')
      } else {
        if (this.memberid === 'null') {
          registerMember({
            memberid: '',
            username: this.form.username,
            sex: this.form.sex,
            cellphone: this.form.cellphone,
            idcard: this.form.idcard,
            birthday: this.form.birthday,
            from: this.form.from,
            tags: this.tags,
            belong: this.form.belong,
            remark: this.form.remark
          }).then(res => {
            this.disabled = false
            if (res.code !== 200) {
              throw res
            }
            this.$router.push({name: 'member'})
            this.$message({
              type: 'success',
              message: '添加成功'
            })
          }).catch(err => {
            this.tipControl(err.errMsg)
          })
        } else {
          updateMembers({
            memberid: this.memberid,
            username: this.form.username,
            sex: this.form.sex,
            cellphone: this.form.cellphone,
            idcard: this.form.idcard,
            birthday: this.form.birthday,
            from: this.form.from,
            tags: this.tags.length === 0 ? this.getTags : this.tags,
            belong: this.form.belong,
            remark: this.form.remark
          }).then(res => {
            this.disabled = false
            this.$router.push({name: 'member'})
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
          })
        }
      }
    },
    handleAdd () {
      if (this.memberid !== 'null') {
        this.getTags.push(this.tag)
        this.tag = ''
      } else {
        if (this.tag !== '') {
          this.tags.push(this.tag)
          this.tag = ''
        } else {
          this.tipControl('请先输入便签')
        }
      }
    },
    handleClose (tag) {
      this.tags.splice(tag, 1)
    },
    dateChange (time) {
      this.form.birthday = time
      this.tipMessage = ''
    },
    cancel () {
      this.$router.go(-1)
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    deleteDeftTag (e) {
      this.getTags.splice(e, 1)
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/member.styl'
</style>
