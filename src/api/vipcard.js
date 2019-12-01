import axios from '@/config/request'
export const getMemberCard = (info) => {   // 获取会员卡列表
  const data = info
  return axios.request({
    url: 'v1/vipcard/getAllVipCards',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const addvipcard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/vipcard/addvipcard',
    data,
    method: 'post'
  })
}

export const updatevipcard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/vipcard/updateVipCard',
    data,
    // method: 'post'
    method: 'put'
  })
}
// put用法

export const queryVipCardDetails = (uid) => {
  const data = {
    uid: uid
  }
  return axios.request({
    url: 'v1/customer/membercard',
    data,
    method: 'get'
  })
}

export const deleteVipCard = (uidArray) => {
  const data = {
    uids: uidArray
  }
  return axios.request({
    url: 'v1/customer/membercard',
    data,
    method: 'delete'
  })
}
// delete用法

export const updateVonsale = (info) => { // 修改会员卡在售状态
  const data = info
  return axios.request({
    url: 'v1/customer/membercard/sale/von',
    data,
    method: 'put'
  })
}
// put用法

export const RecoveryCard = (info) => { // 会员卡停用后恢复
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/RecoveryCard',
    data,
    method: 'post'
  })
}
