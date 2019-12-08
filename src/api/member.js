import axios from '@/config/request'

export const registerMember = (info) => {
  const data = info
  return axios.request({
    url: 'v1/member/registermember',
    data,
    method: 'post'
  })
}
//文档不懂

export const updateRfid = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/member/rfid',
    data,
    method: 'put'
  })
}

export const queryMemberInfo = (memberuid) => {
  const data = {}
  return axios.request({
    url: `v1/member/querymemberinfo/${memberuid}`,
    data,
    method: 'get'
  })
}

export const insertDeposit = (deposit) => {
  const data = deposit
  return axios.request({
    url: 'v1/member/insertdeposit',
    data,
    method: 'post'
  })
}

export const insertEarnest = (earnest) => {
  const data = earnest
  return axios.request({
    url: 'v1/customer/member/earnest',
    data,
    method: 'post'
  })
}

export const queryDeposit = (memberuid) => {
  const data = {
    memberid: memberuid
  }
  return axios.request({
    url: 'v1/customer/member/deposit',
    data,
    method: 'get'
  })
}

export const queryEarnest = (memberuid) => {
  const data = {
    memberid: memberuid
  }
  return axios.request({
    url: 'v1/customer/member/earnest',
    data,
    method: 'get'
  })
}

export const deleteEarnest = (memberuid) => {
  const data = memberuid
  return axios.request({
    url: 'v1/customer/member/earnest',
    data,
    method: 'delete'
  })
}

export const deleteDeposit = (memberuid) => {
  const data = memberuid
  return axios.request({
    url: 'v1/customer/member/deposit',
    data,
    method: 'delete'
  })
}

export const notifyMsg = (msgdata) => {
  const data = msgdata
  return axios.request({
    url: 'v1/customer/member/notify',
    data,
    method: 'put'
  })
}

export const getAllDeposits = (info) => {   // 获取押金列表
  const data = info
  return axios.request({
    url: 'v1/member/getAllDeposits',
    data,
    method: 'post'
  })
}
// 未找到文档

export const getAllEarnests = (info) => { // 获取定金列表
  const data = info
  return axios.request({
    url: 'v1/member/getAllEarnests',
    data,
    method: 'post'
  })
}
// 未找到文档

export const insertCabinets = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/member/cabinets',
    data,
    method: 'post'
  })
}

export const queryEffective = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/queryEffective',
    data,
    method: 'get'
  })
}

export const queryPotential = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/queryPotential',
    data,
    method: 'get'
  })
}

export const expiredMember = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/expiredMember',
    data,
    method: 'post'
  })
}

export const experienceMember = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/experienceMember',
    data,
    method: 'post'
  })
}

export const signInfo = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/memberanalysis/sign',
    data,
    method: 'get'
  })
}

export const orderRecord = (info) => { // 约课记录
  const data = info
  return axios.request({
    url: 'v1/customer/memberanalysis/order',
    data,
    method: 'get'
  })
}

export const signPrivateLessonRecord = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/memberanalysis/sign/private',
    data,
    method: 'get'  
  })
}

export const queryMemberVipCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/memberanalysis/memberVipCard',
    data,
    method: 'get'
  })
}

export const trainingRecordList = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/memberanalysis/training',
    data,
    method: 'get'
  })
}

export const contractList = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/memberanalysis/contract',
    data,
    method: 'get'
  })
}

export const followList = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/memberanalysis/follow',
    data,
    method: 'get'
  })
}

export const deleteFollow = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/pursue',
    data,
    method: 'delete'
  })
}

export const deleteMembers = (info) => { // 删除会员
  const data = info
  return axios.request({
    url: `v1/customer/member`,
    data,
    method: 'delete'
  })
}

export const updateMembers = (info) => { // 编辑会员
  const data = info
  return axios.request({
    url: `v1/customer/member`,
    data,
    method: 'put'
  })
}

export const depletedMembers = (info) => { // 耗尽会员
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/depletedMember',
    data,
    method: 'post'
  })
}

export const pincardMembers = (info) => { // 销卡会员
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/pincardMember',
    data,
    method: 'post'
  })
}

export const cabinetMember = (info) => { // 租柜会员
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/cabinetMember',
    data,
    method: 'post'
  })
}

export const leaveMemberData = (info) => { // 请假会员
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/leaveMember',
    data,
    method: 'post'
  })
}

export const addFollow = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/pursue',
    data,
    method: 'post'
  })
}

export const ContractOrder = (info) => { // 合同订单
  const data = info
  return axios.request({
    url: 'v1/customer/member/orderList',
    data,
    method: 'get'
  })
}

export const getMemberBelongCard = (info) => { // 该会员的所有会员卡列表
  const data = info
  return axios.request({
    url: 'v1/customer/member/memberVipCard',
    data,
    method: 'get'
  })
}

export const TrainingRecord = (info) => { // 训练记录
  const data = info
  return axios.request({
    url: 'v1/customer/member/signList',
    data,
    method: 'get'
  })
}

export const FollowUp = (info) => { // 跟进记录
  const data = info
  return axios.request({
    url: 'v1/customer/member/followList',
    data,
    method: 'get'
  })
}

export const queryMemberSignInfo = (info) => { // 会员分析
  const data = info
  return axios.request({
    url: 'v1/customer/memberanalysis/sign',
    data,
    method: 'get'
  })
}
export const BuyWater = (info) => { // 购买水费
  const data = info
  return axios.request({
    url: 'v1/customer/member/addWaterRate',
    data,
    method: 'post'
  })
}
