<template>
  <div id="dialog">
    <el-dialog title="添加职位" width='520px' :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div class="dialog-content">
          <el-form ref="form">
            <el-form-item label="temp">
              <span slot="label"><i>*</i>职位名称</span>
              <el-input v-model="name" placeholder="请输入职位名称" @input="inputChangeEvent"></el-input>
            </el-form-item>
            <el-form-item label="复制职位权限" class="signin-coach" v-if='rolePerShow'>
              <el-select v-model="rolePower" placeholder="请选择" @change="inputChangeEvent">
                <el-option
                  v-for="item in rolePowers"
                  :key="item.uid"
                  :label="item.name"
                  :value="item.uid">
                </el-option>
              </el-select>
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
import { getAllRole, addRole, editRole } from '@/api/role'
export default {
  props: ['role'],
  data () {
    return {
      dialogVisible: true,
      closeOnClickModal: true,
      tipMessage: '',
      name: '',
      sex: 'boy',
      tel: '',
      position: '',
      positions: [],
      defaultCoach: true,
      rolePerShow: false,
      rolePower: 500,
      rolePowers: [],
      disabled: false
    }
  },
  created () {
    if (this.role === '' || this.role === undefined) {
      this.rolePerShow = true
    } else {
      this.rolePerShow = false
      this.name = this.role.name
    }
    getAllRole({
      pageCount: 1000,
      curPage: 1
    }).then(res => {
      let data = res.data.data
      this.rolePowers = data.map(o => { return {name: o.name, uid: o.uid} })
      this.rolePowers.unshift({name: '不复制', uid: 500})
    })
  },
  methods: {
    change () {
      this.defaultCoach = false
    },
    inputChangeEvent () {
      this.disabled = false
      this.tipMessage = ''
    },
    confirm () {
      this.disabled = true
      if (this.role === '' || this.role === undefined) {
        if (!this.name) {
          this.tipControl('请输入姓名')
        } else if (!this.rolePower) {
          this.tipControl('请选择是否复制职位权限')
        } else {
          addRole({
            name: this.name,
            resources: '1',
            permissions: '1',
            owner: 2
          }).then(res => {
            this.disabled = false
            this.closed()
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.$parent.getAllRole()
          })
        }
      } else {
        editRole({
          roleId: this.role.uid,
          name: this.name
        }).then(res => {
          this.disabled = false
          if (res.code === 200) {
            this.closed()
            this.$message({
              type: 'success',
              message: '编辑成功'
            })
            this.$parent.getAllRole()
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
    },
    closed () {
      this.$parent.addPositionCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
