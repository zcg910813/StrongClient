<template>
  <el-button type="primary" :loading="uoloadExcelLoading" :disabled="importExcelAbled">
    <span v-if='importExcelAbled'>导入<i class="el-icon-upload el-icon--right"></i></span>
    <el-upload
      v-if='!importExcelAbled'
      action="http://47.105.67.223:8888/v1/import/importData"
      multiple
      :show-file-list='ShowList'
      :before-remove="beforeRemove"
      :limit="limitnum"
      :on-exceed="handleExceed"
      :beforeUpload="beforeAvatarUpload">
      导入<i class="el-icon-upload el-icon--right"></i>
    </el-upload>
  </el-button>
</template>
<script>
import { UploadExcel } from '@/api/place'
export default {
  name: 'ImportExcel',
  props: ['importExcelAbled'],
  data () {
    return {
      limitUpload: 1,
      fileTemp: null,
      uoloadExcelLoading: false,
      ShowList: false,
      limitnum: 1
    }
  },
  created () {
  },
  methods: {
    handleChange (file, fileList) {
      this.fileTemp = file.raw
    },
    beforeRemove (file, fileList) {
      return true
    },
    handleExceed (files, fileList) {
      this.$message.error('最多只能导入1个文件')
    },
    beforeAvatarUpload (file) {
      this.uoloadExcelLoading = true
      const isJPG = (
            file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.indexOf('.xlsx') > 0 || file.name.indexOf('.doc') > 0)
      const isLt5M = file.size / 1024 / 1024 < 10
      if (!isJPG) {
        this.$message({
          type: 'warning',
          message: '只能导入word、excel文件!'
        })
        return false
      }
      if (!isLt5M) {
        this.$message({
          type: 'warning',
          message: '导入文件大小不能超过10MB!'
        })
        return false
      }
      return new Promise(async (resolve, reject) => {
        try {
          let formData = new FormData()
          formData.append('file', file)
          let result = await UploadExcel(formData)
          if (result.data.res !== true) {
            this.$message.error('导入失败')
            this.uoloadExcelLoading = false
            reject()
            return
          }
          setTimeout(_ => {
            this.$message.success('导入成功')
            // this.$parent.getAllMemberData()
            // this.$parent.getMemberCardListData()
            this.$parent.QueryAllBVCardData()
            this.uoloadExcelLoading = false
            resolve()
          }, 20000)
        } catch (error) {
          this.uoloadExcelLoading = false
          reject()
        } finally {
          setTimeout(_ => {
            this.uoloadExcelLoading = false
          }, 20000)
        }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
.is-loading>span>div
  display inline-block
</style>

