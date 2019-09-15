<template>
  <div id="dialog">
    <el-dialog title="添加场地" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>场地名称</span>
              <el-input v-model="name" placeholder="请输入场地名称" @input="deleteMessage"></el-input>
            </el-form-item>
            <el-form-item label="temp">
              <span slot="label"><i>*</i>容纳人数</span>
              <el-input v-model="amount" placeholder="请输容纳人数" @input="deleteMessage"></el-input>
            </el-form-item>
            <el-form-item label="temp" class="sex-radio-group">
              <span slot="label"><i>*</i>场地用途</span>
              <el-radio-group v-model="purpose" @change='change'>
                <el-radio label="1">私教课</el-radio>
                <el-radio label="2">团课</el-radio>
              </el-radio-group>
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
import { addPlace, getPlaceData, updatePlace } from '@/api/place'
export default {
  props: ['placeUid'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      name: '',
      amount: '',
      purpose: '1',
      disabled: false
    }
  },
  created () {
    if (this.placeUid !== null) {
      getPlaceData({uid: this.placeUid}).then(res => {
        if (res.code === 200) {
          let data = res.data.res
          this.name = data.name
          this.amount = data.number
          this.purpose = String(data.type)
        }
      })
    }
  },
  methods: {
    confirm () {
      this.disabled = true
      if (!this.name) {
        this.tipControl('请输入场地名称')
      } else if (!this.amount) {
        this.tipControl('请输入场地可容纳人数')
      } else if (!this.purpose) {
        this.tipControl('请选择场地用途')
      } else {
        if (this.placeUid === null) {
          addPlace({
            name: this.name,
            number: this.amount,
            type: this.purpose
          }).then(res => {
            this.disabled = false
            if (res.code === 200) {
              this.dialogVisible = false
              this.$message({
                type: 'success',
                message: '添加场地成功'
              })
              this.$parent.getPlaceList()
            }
          })
        } else {
          updatePlace({
            uid: this.placeUid,
            name: this.name,
            number: this.amount,
            type: this.purpose
          }).then(res => {
            this.disabled = false
            if (res.code === 200) {
              this.dialogVisible = false
              this.$message({
                type: 'success',
                message: '更新场地成功'
              })
              this.$parent.getPlaceList()
            }
          })
        }
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
      this.$parent.addVenueEventClose()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
