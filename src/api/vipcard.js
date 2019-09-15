import axios from '@/config/request'
export const getMemberCard = (info) => {   // 获取会员卡列表
  const data = info
  return axios.request({
    url: 'v1/vipcard/getAllVipCards',
    data,
    method: 'post'
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
    method: 'post'
  })
}

export const queryVipCardDetails = (uid) => {
  const data = {
    uid: uid
  }
  return axios.request({
    url: 'v1/vipcard/queryvipcarddetails',
    data,
    method: 'post'
  })
}

export const deleteVipCard = (uidArray) => {
  const data = {
    uids: uidArray
  }
  return axios.request({
    url: 'v1/vipcard/deletevipcard',
    data,
    method: 'post'
  })
}

export const updateVonsale = (info) => { // 修改会员卡在售状态
  const data = info
  return axios.request({
    url: 'v1/vipcard/updateVOnsale',
    data,
    method: 'post'
  })
}

export const RecoveryCard = (info) => { // 会员卡停用后恢复
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/RecoveryCard',
    data,
    method: 'post'
  })
}
