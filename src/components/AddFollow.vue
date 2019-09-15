<template>
  <div id="dialog">
    <el-dialog title="添加跟进记录" width='600px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content recover-dialog">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>跟进人</span>
              <el-select v-model="man" placeholder="请选择" @change='changeEvent'>
                <el-option
                  v-for="item in mans"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>跟进方式</span>
              <el-select v-model="type" placeholder="请选择" @change='changeEvent'>
                <el-option
                  v-for="item in types"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="跟进记录">
              <el-input v-model="record" @input="changeEvent" type="textarea" :autosize="{minRows:4,maxRows:6}" placeholder="请输入跟进记录"></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color" style="text-indent: 30px;">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { getAllWorker, getCoachData } from '@/api/data'
import { addFollowHandle } from '@/async/members'
export default {
  props: ['paramsPass'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      man: '',
      mans: [],
      type: '',
      types: [
        {
          value: 1,
          label: '电话跟进'
        },
        {
          value: 2,
          label: '微信跟进'
        }
      ],
      record: '',
      payees: [],
      coachs: [],
      disabled: false
    }
  },
  created () {
    getAllWorker({
      curPage: 1,
      pageCount: 10000
    }).then(res => {
      if (res.code === 200) {
        let data = res.data.employees
        this.payees = data.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
        getCoachData({
          pageCount: 1000,
          curPage: 1
        }).then(res => {
          if (res.code === 200) {
            this.coachs = res.data.coachs.map(o => { return {name: o.name + ' ' + '(' + o.cellphone + ')', uid: o.id} })
            this.mans = this.payees.concat(this.coachs)
          }
        })
      }
    })

    this.mans = this.payees.concat(this.coachs)
  },
  methods: {
    changeEvent () {
      this.tipMessage = ''
      this.disabled = false
    },
    confirm () {
      this.disabled = true
      if (!this.man) {
        this.tipControl('请选择跟进人')
      } else if (!this.type) {
        this.tipControl('请选择跟进方式')
      } else {
        addFollowHandle({
          memberid: this.paramsPass.uid,
          personnel: this.man,
          mode: this.type,
          remark: this.record
        }).then(res => {
          this.disabled = false
          if (res) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '跟进成功'
            })
            this.$parent.getFollowUp()
          } else {
            throw res
          }
        })
      }
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    cancel () {
      this.dialogVisible = false
      this.$message({
        type: 'success',
        message: '取消成功'
      })
    },
    closed () {
      this.$parent.AddFollowCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/memberInfoDetail'
</style>
