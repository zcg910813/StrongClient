<template>
  <div id="dialog">
    <el-dialog title="添加会员卡" :visible.sync="dialogForm" width="450" center @closed='closed'>
      <div class='membercard'>
        <el-form label-width="110px" class='member-card'>
          <el-form-item label="会员卡类型" class='memberCardType'>
            <!-- <el-radio-group v-model="cardtype" size="small" @change='cardTypeChange'>
              <el-radio-button label="1" >单店卡</el-radio-button>
              <el-radio-button label="2" disabled>多店卡</el-radio-button>
              <el-radio-button label="3" :disabled="cardsubtype === '4' || cardsubtype === '3'">体验卡</el-radio-button>
            </el-radio-group> -->
            <el-radio-group v-model="cardsubtype" size="small" @change='cardsubtypeChange'>
              <el-radio-button label="1" >期限卡</el-radio-button>
              <el-radio-button label="2">次卡</el-radio-button>
              <el-radio-button label="3" :disabled="cardtype === '3'">储值卡</el-radio-button>
              <!-- <el-radio-button label="4" :disabled="cardtype === '3'">私教课</el-radio-button> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item label="temp">
            <span slot="label" class="indent"><i>*</i>会员卡名称</span>
            <el-input v-model="name" placeholder="请输入会员名" @input="inputChangeEvent"></el-input>
          </el-form-item>
          <el-form-item label="temp" v-if="cardsubtype === '3' && cardtype !== '3'">
            <span slot="label" class="indent"><i>*</i>储值金额</span>
            <el-input v-model="amount" placeholder="请输入储值金额" @input="inputChangeEvent"></el-input>
          </el-form-item>
          <el-form-item label="次卡" v-if="cardsubtype === '2'">
            <el-input-number v-model="subCard" controls-position="right" @change="handleChange" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="temp" v-if="cardsubtype === '1'">
            <span slot="label" class="indent"><i>*</i>有效时间(天)</span>
            <el-input v-model="effectiveTime" placeholder="请输入有效时间" @input="inputChangeEvent"></el-input>
          </el-form-item>
          <el-form-item label="有效时间(天)" v-if="cardsubtype !== '1'">
            <el-input v-model="noeffectivetime" placeholder="请输入有效时间" @input="inputChangeEvent"></el-input><label style="color:#bbb;margin-left: 15px;"><i class="el-icon-warning no-limit" style='padding-right: 6px; color: #409EFF;'></i>不填表示无限卡</label>
          </el-form-item>
          <el-form-item label="temp" v-if="cardtype !== '3'">
            <span slot="label" class="indent"><i>*</i>{{cardsubtype === '4' ? '单节售价' : '售价'}}</span>
            <el-input v-model="price" placeholder="请输入价格" @input="inputChangeEvent"></el-input>
          </el-form-item>
          <el-form-item label="temp" v-if="cardsubtype === '4' && cardtype !== '3'">
            <span slot="label" class="indent"><i>*</i>单节时长</span>
            <el-input v-model="singleTime" placeholder="请输入有效单节时长" @input="inputChangeEvent"></el-input>
          </el-form-item>
          <el-form-item label="会员手机端购买" v-if="cardsubtype !=='3'">
            <el-radio-group v-model="purchase" size="mini" @change='purchaseChange'>
              <el-radio label="1">支持</el-radio>
              <el-radio label="0">不支持</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="会员卡描述" v-if="cardtype !== '3'">
            <el-input v-model="remark" placeholder="请输入内容" @input="inputChangeEvent" type='textarea'></el-input>
          </el-form-item>
          <el-form-item label="多店通用卡" v-if="cardtype === '2'">
            <el-checkbox-group
              v-model="venue">
              <el-checkbox v-for="item in storeList"  :label="item.storename" :value="item.uid" :key="item.uid"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="tipMessage tip-color" style="text-indent: 10px;">{{tipMessage}}</div>
        <div class="dialog-footer">
          <el-button @click="dialogForm = false">取消</el-button>
          <el-button type="primary" @click="confirm" :disabled="disabled">确定</el-button>
        </div>
      </div>
  </el-dialog>
  </div>
</template>
<script>
import { addVipCard } from '@/async/vipcards'
export default {
  data () {
    return {
      dialogForm: true,
      name: '',
      amount: '',
      subCard: '',
      effectiveTime: '',
      noeffectivetime: '',
      price: '',
      singleTime: '',
      purchase: '1',
      remark: '',
      storeList: [],
      venue: [],
      cardtype: '1',
      cardsubtype: '1',
      param: 0,
      tipMessage: '',
      disabled: false
    }
  },
  methods: {
    purchaseChange (e) {
      this.purchase = e
      this.disabled = false
    },
    cardsubtypeChange (val) {
      this.cardsubtype = val
      this.disabled = false
    },
    cardTypeChange (val) {
      this.cardtype = val
      this.disabled = false
    },
    inputChangeEvent () {
      this.tipMessage = ''
      this.disabled = false
    },
    confirm () {
      this.disabled = true
      if ((this.cardtype === '1' && this.cardsubtype === '1') || (this.cardtype === '2' && this.cardsubtype === '1')) {
        if (!this.name) {
          this.tipControl('请输入会员卡名称')
        } else if (!this.effectiveTime) {
          this.tipControl('请输入有效时间')
        } else if (!/^[0-9]*$/.test(this.effectiveTime)) {
          this.tipControl('有效时间输入格式有误')
        } else if (!this.price) {
          this.tipControl('请输入售价')
        } else if (!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.price)) {
          this.tipControl('售价输入格式有误')
        } else {
          this.addMemberCard()
        }
      } else if (this.cardtype === '3' && this.cardsubtype === '1') {
        if (!this.name) {
          this.tipControl('请输入会员卡名称')
        } else if (!this.effectiveTime) {
          this.tipControl('请输入有效时间')
        } else if (!/^[0-9]*$/.test(this.effectiveTime)) {
          this.tipControl('有效时间输入格式有误')
        } else {
          this.addMemberCard()
        }
      } else if (this.cardtype === '1' && this.cardsubtype === '2') {
        if (!this.name) {
          this.tipControl('请输入会员卡名称')
        } else if (!this.price) {
          this.tipControl('请输入售价')
        } else if (!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.price)) {
          this.tipControl('售价输入格式有误')
        } else {
          this.addMemberCard()
        }
      } else if (this.cardtype === '1' && this.cardsubtype === '3') {
        if (!this.name) {
          this.tipControl('请输入会员卡名称')
        } else if (!this.price) {
          this.tipControl('请输入售价')
        } else if (!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.price)) {
          this.tipControl('售价输入格式有误')
        } else {
          this.addMemberCard()
        }
      } else if (this.cardtype === '1' && this.cardsubtype === '4') {
        if (!this.name) {
          this.tipControl('请输入会员卡名称')
        } else if (this.noeffectivetime && !/^[0-9]*$/.test(this.noeffectivetime)) {
          this.tipControl('有效时间格式有误')
        } else if (!this.price) {
          this.tipControl('请输入单节售价')
        } else if (!/^[0-9]+([.]{1}[0-9]+){0,1}$/.test(this.price)) {
          this.tipControl('售价输入格式有误')
        } else if (!this.singleTime) {
          this.tipControl('请输入单节时长')
        } else if (!/^[0-9]*$/.test(this.singleTime)) {
          this.tipControl('单节时长输入格式有误')
        } else {
          this.addMemberCard()
        }
      }
    },
    addMemberCard () {
      addVipCard({
        cardtype: this.cardtype,
        cardsubtype: this.cardsubtype,
        cardname: this.name,
        validity: this.cardsubtype === '1' ? this.effectiveTime : this.noeffectivetime,
        price: this.price,
        purchase: this.purchase,
        remark: this.remark,
        param: this.cardtype === '1' && this.cardsubtype === '2' ? this.subCard : this.amount
      }).then(res => {
        this.disabled = false
        if (res.code === 200) {
          this.$parent.getMemberCardList()
          this.dialogForm = false
        } else {
          throw res
        }
      }).catch(res => {
        this.tipControl(res.errMsg)
      })
    },
    handleChange (val) {
      this.disabled = false
    },
    closed () {
      this.$parent.addMemberCardEventClose()
    },
    tipControl (txt) {
      this.tipMessage = txt
    },
    deleteMessage () {
      this.tipMessage = ''
    }
  }
}
</script>
