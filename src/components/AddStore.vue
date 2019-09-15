<template>
  <div id="dialog">
    <el-dialog title="添加场馆" :visible.sync="dialogVisible" center :close-on-click-modal="closeOnClickModal" @closed="closed">
      <div v-if='dialogFirstShow'>
        <div class="dialog-content">
          <div class="upload-logo">
            <el-upload
              v-model='uploadFile'
              :action="updateUrl"
              list-type="picture-card"
              :on-change="picChange"
              :headers="headers"
              :on-success="uploadeSuccess"
              >
              <button>
                <span class="upload-tip">添加图片</span><span>支持jpg, png大小</span><span>不超过1M</span>
              </button>
            </el-upload>
          </div>
          <div>
            <el-form label-width="80px">
              <el-form-item label="temp">
                <span slot="label"><i>*</i>场馆名称</span>
                <el-input v-model="name" placeholder="请输入场馆名称" @input='deleteMessage'></el-input>
              </el-form-item>
              <el-form-item label="temp">
                <span slot="label"><i>*</i>场馆电话</span>
                <el-input v-model="tel" placeholder="请输入场馆电话" maxlength="11" @input='deleteMessage'></el-input>
              </el-form-item>
              <el-form-item label="temp" class="store-adress-item">
                <span slot="label"><i>*</i>场馆地址</span>
                <el-select v-model="province" @change="queryCity">
                  <el-option
                    @input='deleteMessage'
                    placeholder="请选择"
                    v-for="item in provinceList"
                    :value="item.value"
                    :key="item.value"
                    :label="item.label">
                  </el-option>
                </el-select>
                <el-select v-model="city" @change="queryArea">
                  <el-option
                    @input='deleteMessage'
                    v-for="item in cityList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    placeholder="请选择">
                  </el-option>
                </el-select>
                <el-select v-model="area">
                  <el-option
                    @input='deleteMessage'
                    v-for="item in areaList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    placeholder="请选择">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="temp">
                <span slot="label"><i>*</i>详细地址</span>
                <el-input v-model="detailAddress" @input='deleteMessage' placeholder="请输入详细地址" @focus='addressChange'></el-input>
              </el-form-item>
              <el-form-item label="temp">
                <span slot="label"><i>*</i>营业面积</span>
                <el-input v-model="sellingArea" @input='deleteMessage' placeholder="请输入营业面积"></el-input>
              </el-form-item>
              <el-form-item label="场馆微信">
                <el-input v-model="wechat" @input='deleteMessage' placeholder="请输入微信"></el-input>
              </el-form-item>
              <el-form-item label="场馆邮件">
                <el-input v-model="email" @input='deleteMessage' placeholder="请输入邮件"></el-input>
              </el-form-item>
              <el-form-item label="场馆介绍">
                <el-input type="textarea" @input='deleteMessage' v-model="introduce" placeholder="请输入场馆介绍"></el-input>
              </el-form-item>
              <div class="tipMessage tip-color">{{tipMessage}}</div>
            </el-form>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="confirm" :disabled="disabled">确 定</el-button>
        </div>
      </div>
      <div v-else>
        <Map @location='location(arguments)'></Map>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import Map from './Map'
import update from '@/update'
import { getRegion, addVenue, fetchAllVenue } from '@/api/venue'
// import { queryStore } from '@/api/vipcard'
export default {
  components: {
    Map
  },
  inject: ['reload'],
  data () {
    return {
      updateUrl: update.uploadUrl,
      dialogVisible: true,
      closeOnClickModal: true,
      uploadFile: [],
      name: '',
      tel: '',
      province: '',
      city: '',
      area: '',
      provinceList: [],
      cityList: [],
      areaList: [],
      detailAddress: '',
      sellingArea: '',
      introduce: '',
      wechat: '',
      email: '',
      coordinate: '',
      tipMessage: '',
      dialogFirstShow: true,
      getLocation: '',
      headers: {Authorization: `Bearer ${this.$cookies.get('token')}`},
      disabled: false,
      positions: []
    }
  },
  mounted () {
    getRegion({ parentid: 0 }).then(res => {
      this.provinceList = res.data.res.map(item => {
        return {
          // 注释test
          label: item.cityname,
          value: item.codeid
        }
      })
    })
  },
  methods: {
    picChange () {
      this.tipMessage = ''
    },
    uploadeSuccess (res) {
      this.uploadFile.push(res.data.fileurl)
    },
    location (val) {
      this.detailAddress = val[1]
      this.coordinate = val[0].positions
    },
    queryCity (val) {
      this.tipMessage = ''
      this.disabled = false
      this.city = ''
      this.area = ''
      getRegion({ parentid: val }).then(res => {
        this.cityList = res.data.res.map(item => {
          return {
            label: item.cityname,
            value: item.codeid
          }
        })
      })
    },
    queryArea (val) {
      this.tipMessage = ''
      this.disabled = false
      this.area = ''
      getRegion({ parentid: val }).then(res => {
        this.areaList = res.data.res.map(item => {
          return {
            label: item.cityname,
            value: item.codeid
          }
        })
      })
    },
    addressChange () {
      this.dialogFirstShow = false
      this.tipMessage = ''
      this.disabled = false
    },
    confirm () {
      this.disabled = true
      if (!this.name) {
        this.tipControl('请输入场馆名称')
      } else if (!this.tel) {
        this.tipControl('请输入场馆电话')
      } else if (!/^1[0-9]{10}$/.test(this.tel)) {
        this.tipControl('请输入正确电话')
      } else if (!this.province) {
        this.tipControl('请选择所在省')
      } else if (!this.city) {
        this.tipControl('请选择所在市')
      } else if (!this.area) {
        this.tipControl('请选择所在区')
      } else if (!this.detailAddress) {
        this.tipControl('请输入详细地址')
      } else if (!this.sellingArea) {
        this.tipControl('请输入营业面积')
      } else if (this.email && !/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(this.email)) {
        this.tipControl('请输入正确格式的邮件')
      } else {
        addVenue({
          storename: this.name,
          storephone: this.tel,
          province: this.province,
          city: this.city,
          county: this.area,
          storeaddr: this.detailAddress,
          businessarea: this.sellingArea,
          introduction: this.introduce,
          wechat: this.wechat,
          mail: this.email,
          coordinate: JSON.stringify(this.coordinate),
          pictureurl: this.uploadFile || []
        }).then(res => {
          this.disabled = false
          this.dialogVisible = false
          this.$router.push({name: 'home'})
          fetchAllVenue().then(res => { this.$parent.storesInfo = res.data.res.allStores })
          this.reload()
        })
      }
    },
    cancel () {
      this.closed()
      this.$message({
        type: 'success',
        message: '已经取消',
        duration: 1000
      })
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
      this.disabled = false
    },
    closed () {
      this.$parent.addStoreCloseEvent()
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/AddStore.styl'
</style>
