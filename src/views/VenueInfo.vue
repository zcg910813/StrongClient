<template>
  <div class="appMain">
    <div class="add-store-btn add-venue">
      <el-button type="primary" @click="edit" v-if='!editShow'>编辑</el-button>
      <div v-else>
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </div>
    <el-row :gutter="12" class="division">
      <el-col :span="24">
        <el-card shadow="hover" class="venue-info-card">
          <div class="venue-information add-course">
            <h3>场馆信息</h3>
            <div class="info dialog-content">
              <el-row :gutter="20">
                <el-col :span="16">
                  <div class="grid-content bg-purple">
                    <ul>
                      <li>
                        <span>场馆ID: </span>
                        <span v-if='editShow'><el-input v-model="id" placeholder="请输入场馆ID"></el-input></span>
                        <span v-else>{{id}}</span>
                      </li>
                      <li>
                        <span>场馆名称: </span>
                        <span v-if='editShow'><el-input v-model="name" placeholder="请输入场馆名称"></el-input></span>
                        <span v-else>{{name}}</span>
                      </li>
                      <li>
                        <span>场馆电话: </span>
                        <span v-if='editShow'><el-input v-model="tel" placeholder="请输入场馆电话"></el-input></span>
                        <span v-else>{{tel}}</span>
                      </li>
                      <li>
                        <span>场馆邮箱: </span>
                        <span v-if='editShow'><el-input v-model="mail" placeholder="请输入场馆邮箱"></el-input></span>
                        <span v-else>{{mail ? mail : '暂无'}}</span>
                      </li>
                      <li class="place-country">
                        <span>地区: </span>
                        <span v-if='editShow'>
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
                          <el-select v-model="area" @change="areaChange">
                            <el-option
                              @input='deleteMessage'
                              v-for="item in areaList"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                              placeholder="请选择">
                            </el-option>
                          </el-select>
                        </span>
                        <span v-else>{{province}} {{city}} {{area}}</span>
                      </li>
                      <li>
                        <span>详细地址: </span>
                        <span v-if='editShow'><el-input v-model="address" placeholder="请输入详细地址"></el-input></span>
                          <span v-else>{{address}}</span>
                        </li>
                        <li>
                          <span>营业面积: </span>
                          <span v-if='editShow'><el-input v-model="mul" placeholder="请输入营业面积"></el-input></span>
                          <span v-else>{{mul}}</span>
                        </li>
                      </ul>
                    </div>
                    <div class="tipMessage tip-color" style='text-indent: 30px;'>{{tipMessage}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" v-if='!editShow'>
                      <img src="../assets/img/upload-icon.png" alt="" v-if='coverImg === ""'>
                      <img :src="coverImg" alt="" v-else>
                    </div>
                    <div v-else class="upload-logo venue-info">
                      <div class="venue-infoList">
                        <el-upload
                          class="uplod-Img"
                          v-model="uploadFile"
                          :action="updateUrl"
                          :headers="headers"
                          :on-success="success"
                          :on-change="deleteMessage"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          >
                          <img :src="coverImg" alt="">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12" class="division">
      <el-col :span="24">
        <el-card shadow="hover" class="venue-info-card">
          <div class="venue-information">
            <h3>场馆相册</h3>
            <div class="info album" v-if='!editShow'>
              <div v-if='picList.length <= 0' class="no-data">暂无场馆相册~</div>
              <ul v-else v-for='(img, index) in picList' :key='index'>
                <li><img :src="img" alt="" @click='showPic(index)'></li>
              </ul>
            </div>
            <div v-else class="upload-storelogo">
              <div class="album">
                <ul v-for='(img, index) in picList' :key='index'>
                  <li><img :src="img" alt=""><i class="el-icon-circle-close" @click='deleteCurrentImg(index)'></i></li>
                </ul>
              </div>
              <el-upload
                class="upload-list"
                v-model="uploadFileList"
                :action="updateUrl"
                :headers="headers"
                :on-success="updateSuccessList"
                :on-change="deleteMessage"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover" class="venue-info-card">
          <div class="venue-information describe">
            <h3>场馆描述</h3>
            <div class="info" v-if='!editShow'>
              <div v-if='noDescribe' class="no-data">暂无场馆描述~</div>
              <div v-else>{{content}}</div>
            </div>
            <div v-else class="describe-edit">
              <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorReady($event)">
                >
              </quill-editor>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <transition name="slide-fade" class="fadeView">
      <div v-if="show">
        <image-view
          :imgArr="bigImgUrl"
          :showImageView="true"
          v-on:hideImage="hideImageView">
        </image-view>
      </div>
    </transition>
  </div>
</template>
<script>
import ImageView from '../components/imageView'
import { updateVenue, getRegion, fetchAllVenue } from '@/api/venue'
// import { queryStore } from '../api/vipcard'
import update from '@/update'
export default {
  components: {
    ImageView
  },
  data () {
    return {
      editShow: false,
      noDescribe: true,
      dialogImageUrl: '',
      dialogVisible: false,
      editorOption: {
        placeholder: '请输入内容'
      },
      storesInfo: [],
      id: '',
      name: '',
      tel: '',
      mail: '',
      address: '',
      mul: '',
      content: '',
      tipMessage: '',
      updateUrl: update.uploadUrl,
      uploadFileList: [],
      uploadFile: '',
      headers: {Authorization: `Bearer ${this.$cookies.get('token')}`},
      picList: [],
      coverPic: '',
      province: '',
      provinceList: [],
      city: '',
      cityList: [],
      area: '',
      areaList: [],
      provinceId: '',
      cityId: '',
      defaultProviceId: '',
      defaultCityId: '',
      defaultAreaId: '',
      defaultProvinceName: '',
      defaultCityName: '',
      defaultAreaName: '',
      coverImg: '',
      show: false,
      imgUrl: [],
      bigImgUrl: []
    }
  },
  beforeCreate () {
    this.$store.commit('setLoading', true)
  },
  mounted () {
    getRegion({ parentid: 0 }).then(res => {
      this.$store.commit('setLoading', false)
      this.provinceList = res.data.res.map(item => {
        return {
          label: item.cityname,
          value: item.codeid
        }
      })
    })
  },
  created () {
    this.getCurrentStore()
  },
  methods: {
    showPic (index) {
      fetchAllVenue().then(res => {
        if (res.code === 200) {
          let data = res.data.res.storeInfo
          this.imgUrl = data.pictureurl
          this.show = true
          this.bigImgUrl = []
          this.bigImgUrl.push(this.imgUrl.slice(index, index + 1)[0])
        }
      })
    },
    getCurrentStore () {
      fetchAllVenue().then(res => {
        if (res.code === 200) {
          let data = res.data.res.storeInfo
          this.id = data.uid
          this.name = data.storename
          this.tel = data.storephone
          this.mail = data.mail
          this.address = data.storeaddr
          this.mul = data.businessarea
          this.content = data.introduction
          this.picList = data.pictureurl
          this.province = this.defaultProvinceName = data.provinceName
          this.defaultProviceId = data.province
          this.city = this.defaultCityName = data.cityName
          this.defaultCityId = data.city
          this.area = this.defaultAreaName = data.countyName
          this.defaultAreaId = data.county
          this.coverImg = data.logourl
          if (this.content !== '') {
            this.noDescribe = false
          } else {
            this.noDescribe = true
          }
        } else {
          throw res
        }
      })
    },
    queryCity (val) {
      this.province = val
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
      this.city = val
      getRegion({ parentid: val }).then(res => {
        this.areaList = res.data.res.map(item => {
          return {
            label: item.cityname,
            value: item.codeid
          }
        })
      })
    },
    areaChange (e) {
      this.area = e
    },
    edit () {
      this.editShow = true
    },
    cancel () {
      this.getCurrentStore()
      this.editShow = false
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    updateSuccessList (res) {
      this.uploadFileList.push(res.data.fileurl)
      // for (let i of this.picList) {
      //   this.uploadFileList.push(i)
      // }
    },
    success (res) {
      this.uploadFile = res.data.fileurl
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    },
    deleteCurrentImg (idx) {
      this.picList.splice(idx, 1)
      this.updateUrlList = this.imgUrl
    },
    onEditorReady (quill) {
      this.tipMessage = ''
      this.content = quill.text
    },
    confirm () {
      if (!this.id) {
        this.tipControl('请输入场馆ID')
      } else if (!this.name) {
        this.tipControl('请输入场馆姓名')
      } else if (!this.tel) {
        this.tipControl('请输入场馆电话')
      } else if (!this.address) {
        this.tipControl('请输入详细地址')
      } else {
        updateVenue({
          storename: this.name,
          storephone: this.tel,
          logourl: this.uploadFile.length === 0 ? this.coverImg : this.uploadFile,
          province: this.province === this.defaultProvinceName ? this.defaultProviceId : this.province,
          city: this.city === this.defaultCityName ? this.defaultCityId : this.city,
          county: this.area === this.defaultAreaName ? this.defaultAreaId : this.area,
          storeaddr: this.address,
          businessarea: this.businessarea,
          introduction: this.content,
          wechat: this.wechat,
          mail: this.mail,
          coordinate: this.coordinate,
          pictureurl: this.uploadFileList.length === 0 ? this.picList : this.uploadFileList
        }).then(res => {
          if (res.code === 200) {
            this.editShow = false
            this.getCurrentStore()
          }
        })
      }
    },
    hideImageView () {
      this.show = false
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '../assets/css/venue.styl'
</style>
