import axios from '@/config/request'

export const registerMember = (info) => {
  const data = info
  return axios.request({
    url: 'v1/members/registermember',
    data,
    method: 'post'
  })
}

export const updateRfid = (info) => {
  const data = info
  return axios.request({
    url: 'v1/members/updaterfid',
    data,
    method: 'post'
  })
}

export const queryMemberInfo = (memberuid) => {
  const data = {}
  return axios.request({
    url: `v1/members/querymemberinfo/${memberuid}`,
    data,
    method: 'post'
  })
}

export const insertDeposit = (deposit) => {
  const data = deposit
  return axios.request({
    url: 'v1/members/insertdeposit',
    data,
    method: 'post'
  })
}

export const insertEarnest = (earnest) => {
  const data = earnest
  return axios.request({
    url: 'v1/members/insertearnest',
    data,
    method: 'post'
  })
}

export const queryDeposit = (memberuid) => {
  const data = {
    memberid: memberuid
  }
  return axios.request({
    url: 'v1/members/querydeposit',
    data,
    method: 'post'
  })
}

export const queryEarnest = (memberuid) => {
  const data = {
    memberid: memberuid
  }
  return axios.request({
    url: 'v1/members/queryearnest',
    data,
    method: 'post'
  })
}

export const deleteEarnest = (memberuid) => {
  const data = memberuid
  return axios.request({
    url: 'v1/members/deleteearnest',
    data,
    method: 'post'
  })
}

export const deleteDeposit = (memberuid) => {
  const data = memberuid
  return axios.request({
    url: 'v1/members/deleteDeposit',
    data,
    method: 'post'
  })
}

export const notifyMsg = (msgdata) => {
  const data = msgdata
  return axios.request({
    url: 'v1/members/updatenotifymsg',
    data,
    method: 'post'
  })
}

export const getAllDeposits = (info) => {   // 获取押金列表
  const data = info
  return axios.request({
    url: 'v1/members/getAllDeposits',
    data,
    method: 'post'
  })
}

export const getAllEarnests = (info) => { // 获取定金列表
  const data = info
  return axios.request({
    url: 'v1/members/getAllEarnests',
    data,
    method: 'post'
  })
}

export const insertCabinets = (info) => {
  const data = info
  return axios.request({
    url: 'v1/members/insertCabinets',
    data,
    method: 'post'
  })
}

export const queryEffective = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/queryEffective',
    data,
    method: 'post'
  })
}

export const queryPotential = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/queryPotential',
    data,
    method: 'post'
  })
}

export const expiredMember = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/expiredMember',
    data,
    method: 'post'
  })
}

export const experienceMember = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/experienceMember',
    data,
    method: 'post'
  })
}

export const signInfo = (info) => {
  const data = info
  return axios.request({
    url: 'v1/memberanalysis/signInfo',
    data,
    method: 'post'
  })
}

export const orderRecord = (info) => { // 约课记录
  const data = info
  return axios.request({
    url: 'v1/memberanalysis/orderRecord',
    data,
    method: 'post'
  })
}

export const signPrivateLessonRecord = (info) => {
  const data = info
  return axios.request({
    url: 'v1/memberanalysis/signPrivateLessonRecord',
    data,
    method: 'post'
  })
}

export const queryMemberVipCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/memberanalysis/queryMemberVipCard',
    data,
    method: 'post'
  })
}

export const trainingRecordList = (info) => {
  const data = info
  return axios.request({
    url: 'v1/memberanalysis/trainingRecordList',
    data,
    method: 'post'
  })
}

export const contractList = (info) => {
  const data = info
  return axios.request({
    url: 'v1/memberanalysis/contractList',
    data,
    method: 'post'
  })
}

export const followList = (info) => {
  const data = info
  return axios.request({
    url: 'v1/memberanalysis/followList',
    data,
    method: 'post'
  })
}

export const deleteFollow = (info) => {
  const data = info
  return axios.request({
    url: 'v1/follow/delete',
    data,
    method: 'post'
  })
}

export const deleteMembers = (info) => { // 删除会员
  const data = info
  return axios.request({
    url: 'v1/members/deleteMember',
    data,
    method: 'post'
  })
}

export const updateMembers = (info) => { // 编辑会员
  const data = info
  return axios.request({
    url: 'v1/members/updateMember',
    data,
    method: 'post'
  })
}

export const depletedMembers = (info) => { // 耗尽会员
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/depletedMember',
    data,
    method: 'post'
  })
}

export const pincardMembers = (info) => { // 销卡会员
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/pincardMember',
    data,
    method: 'post'
  })
}

export const cabinetMember = (info) => { // 租柜会员
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/cabinetMember',
    data,
    method: 'post'
  })
}

export const leaveMemberData = (info) => { // 请假会员
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/leaveMember',
    data,
    method: 'post'
  })
}

export const addFollow = (info) => {
  const data = info
  return axios.request({
    url: 'v1/follow/add',
    data,
    method: 'post'
  })
}

export const ContractOrder = (info) => { // 合同订单
  const data = info
  return axios.request({
    url: 'v1/members/queryOrderList',
    data,
    method: 'post'
  })
}

export const getMemberBelongCard = (info) => { // 该会员的所有会员卡列表
  const data = info
  return axios.request({
    url: 'v1/members/queryMemberVipCard',
    data,
    method: 'post'
  })
}

export const TrainingRecord = (info) => { // 训练记录
  const data = info
  return axios.request({
    url: 'v1/members/querySigninList',
    data,
    method: 'post'
  })
}

export const FollowUp = (info) => { // 跟进记录
  const data = info
  return axios.request({
    url: 'v1/members/queryFollowList',
    data,
    method: 'post'
  })
}

export const queryMemberSignInfo = (info) => { // 会员分析
  const data = info
  return axios.request({
    url: 'v1/memberanalysis/queryMemberSignInfo',
    data,
    method: 'post'
  })
}
export const BuyWater = (info) => { // 购买水费
  const data = info
  return axios.request({
    url: 'v1/members/addWaterRate',
    data,
    method: 'post'
  })
}
