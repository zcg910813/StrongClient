<template>
<div>
  <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
        <el-form-item>
          <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
        </el-form-item>
      </el-form>
    <div class="amap-page-container">
    <el-amap
        vid="amap"
        :zoom="zoom"
        :plugin="plugin"
        class="amap-demo"
        :center="center"
        :events="events"
    >
    <!-- <el-amap-marker
          vid="component-marker"
          :position="makerConf.positions ? makerConf.positions : ''"
          :content="makerConf.content"
        ></el-amap-marker> -->
    </el-amap>
    <div class="toolbar">
        <span v-if="makerConf.positions.loaded">
        location: lng = {{ lng }} lat = {{ lat }}
        </span>
        <span v-else>正在定位</span>
    </div>
</div>
<div slot="footer" class="dialog-footer">
  <el-button @click="prev">上一步</el-button>
  <el-button type="primary" @click="mapFinish">确 定</el-button>
</div>
</div>
</template>
<script>
export default {
  data () {
    let _t = this
    return {
      center: [121.59996, 31.197646],
      zoom: 17,
      lng: 0,
      lat: 0,
      address: '',
      events: {
        click: (e, f) => {
          var geocoder = new window.AMap.Geocoder({
            radius: 1000,
            extensions: 'all'
          })
          _t.center = [e.lnglat.lng, e.lnglat.lat]
          geocoder.getAddress([e.lnglat.lng, e.lnglat.lat], function (
            status,
            result
          ) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                _t.address = result.regeocode.formattedAddress
                if (result.regeocode.aois.length !== 0) {
                  _t.center = [result.regeocode.aois[0].location.lng, result.regeocode.aois[0].location.lat]
                }
                _t.makerConf.positions.lng = _t.center[0]
                _t.makerConf.positions.lat = _t.center[1]
                localStorage.setItem('lng', _t.makerConf.positions.lng)
                localStorage.setItem('lat', _t.makerConf.positions.lat)
                _t.changeLocation()
              }
            } else {
              document.querySelector('.search-box-wrapper input').value = this.$parent.$parent.detailAddress
            }
          })
        }
      },
      makerConf: {
        positions: {
          lng: '',
          lat: '',
          address: '',
          loaded: false
        },
        content: ''
      },
      searchOption: {
        city: _t.address,
        citylimit: true
      },
      plugin: [
        'ToolBar',
        'Scale',
        'MapType',
        'OverView',
        {
          pName: 'Geolocation',
          showButton: true,
          zoomToAccuracy: true,
          showMarker: true,
          showCircle: true,
          panToLocation: true,
          buttonPosition: 'RB',
          events: {
            init (o) {
              o.getCurrentPosition((status, result) => {
                let Ads = result.formattedAddress
                if (_t.$parent.$parent.detailAddress === '' || _t.$parent.$parent.detailAddress === Ads) {
                  _t.address = Ads
                  localStorage.setItem('address', _t.address)
                  _t.makerConf.positions.lng = result.position.lng
                  _t.makerConf.positions.lat = result.position.lat
                } else {
                  _t.makerConf.positions.lng = localStorage.getItem('lng')
                  _t.makerConf.positions.lat = localStorage.getItem('lat')
                  // 地图对应经纬度切换
                  _t.center = [_t.makerConf.positions.lng, _t.makerConf.positions.lat]
                  _t.address = _t.$parent.$parent.detailAddress
                }
                document.querySelector('.search-box-wrapper input').value = _t.address
                _t.makerConf.positions.loaded = true
              })
            },
            complete: function (result) {
              var address = result.formattedAddress
              var point = result.position
              let Ads = result.formattedAddress
              if (_t.$parent.$parent.detailAddress !== '' || _t.$parent.$parent.detailAddress === Ads) {
                point.lng = localStorage.getItem('lng')
                point.O = localStorage.getItem('lng')
                point.lat = localStorage.getItem('lat')
                point.P = localStorage.getItem('lat')
              } else {
                _t.address = localStorage.getItem('address')
              }
              const obj = {
                address,
                name: '',
                location: point
              }
              _t.list = [obj]
            },
            error: function (data) {}
          }
        }
      ]
    }
  },
  mounted () {
    document.querySelector('.search-box-wrapper span').innerHTML = '地图定位'
    let _t = this
    // 点击定位赋值
    document.querySelector('.search-box-wrapper span').onclick = function () {
      if (_t.onSearchResult instanceof Function) {
        _t.onSearchResult()
      } else {
        document.querySelector('.search-box-wrapper input').value = _t.address
      }
    }
  },
  methods: {
    prev () {
      this.$parent.$parent.dialogFirstShow = true
    },
    mapFinish () {
      this.$parent.$parent.dialogFirstShow = true
      this.makerConf.positions.lng = localStorage.getItem('lng')
      this.makerConf.positions.lat = localStorage.getItem('lat')
      this.$emit('location', this.makerConf, this.address)
    },
    // 输入后查询索引
    onSearchResult (pois) {
      if (pois && pois.length > 0) {
        const poi = pois[0]
        const lng = poi['lng']
        const lat = poi['lat']
        this.center = [lng, lat]
        this.makerConf.positions = [lng, lat]
        this.makerConf.content = poi.name
        this.address = this.makerConf.content
        this.list = pois
      } else {
        document.querySelector('.search-box-wrapper input').value = this.address
        this.list = []
      }
    },
    Geocoder (options) {
      options = options || {}
      if (window.AMap) {
        window.AMap.plugin(['AMap.Geocoder'], function () {
          const geocoder = new window.AMap.Geocoder({
            radius: options.radius || 1000,
            extensions: options.extensions || 'all'
          })
          const lnglatXY = options.lnglatXY || [114.397169, 30.50576]
          geocoder.getAddress(lnglatXY, (status, result) => {
            if (status === 'complete' && result.info === 'OK') {
              options.success && options.success(result)
            } else {
              options.error && options.error(status, result)
            }
          })
        })
      }
    },
    changeLocation (data) {
      var _t = this
      var geocoder = new window.AMap.Geocoder({
        radius: 1000,
        extensions: 'all'
      })
      geocoder.getLocation(data, function (status, result) {
        if (status === 'complete' && result.info === 'OK') {
          if (result && result.geocodes) {
            _t.center = [
              result.geocodes[0].location.lng,
              result.geocodes[0].location.lat
            ]
          }
        }
      })
    }
  }
}
</script>
<style lang='stylus'>
.amap-page-container
  position relative
  width 100%
  margin-top 0.03rem
  height 500px
  font-size 0.12rem
  color #fff
  margin-bottom 50px
  overflow hidden
.search-tips ul li
  color #000
.amap-page-container .el-input
  width 400px
.amap-page-container .el-button
  padding 10px 20px
.el-vue-search-box-container
  width: 650px !important
  border: 0 none !important
  box-shadow: none !important
.el-vue-search-box-container input
  border 1px solid #DCDEE2 !important
  padding 20px 0
.el-vue-search-box-container .search-btn
  background-color #2D8CF0 !important
  color #fff !important
  width 100px !important
  height 42px !important
  margin-left 15px !important
</style>
