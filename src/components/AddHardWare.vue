<template>
  <div id="dialog">
    <el-dialog title="智能硬件" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form" @submit.native.prevent>
            <el-form-item class="sex-radio-group" style='margin-left: 25px;'>
              <el-radio-group v-model="type" @change="typeChange">
                <el-radio :label="item.value" :key="index" v-for="(item,index) in types">{{item.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>中心主机</span>
              <el-input v-model="typeId" placeholder="请输入中心主机ID" @input="deleteMessage"></el-input>
            </el-form-item>
          </el-form>
          <div class="tipMessage tip-color">{{tipMessage}}</div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
          </div>
        </div>
    </el-dialog>
  </div>
</template>
<script>
import { fetchVenue, updateHardWare } from '@/api/venue'
export default {
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      storeUid: '',
      typeId: '',
      type: 1,
      types: [
        {
          label: '中心主机',
          value: 1
        }
      ],
      disabled: false
    }
  },
  created () {
    fetchVenue().then(res => {
      if (res.code === 200) {
        let data = res.data.res.storeInfo
        this.storeUid = data.uid
      }
    })
  },
  methods: {
    typeChange (e) {
      console.log(e)
    },
    confirm () {
      this.disabled = true
      if (!this.typeId) {
        this.tipControl('请输入中心主机ID')
      } else {
        updateHardWare({
          type: this.type,
          id: this.typeId
        }).then(res => {
          if (res.code === 200) {
            this.dialogVisible = false
            this.$parent.HardWare()
            this.$message({
              type: 'success',
              message: '添加硬件成功'
            })
          }
        })
      }
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    change () {
      this.tipMessage = ''
      this.disabled = false
    },
    deleteMessage () {
      this.tipMessage = ''
      this.disabled = false
    },
    cancel () {
      this.dialogVisible = false
    },
    closed () {
      this.$parent.addHardWareShowEventClose()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
