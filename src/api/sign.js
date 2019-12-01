import axios from '@/config/request'

export const getSigninTable = (info) => { // 获取签到列表
  const data = info
  return axios.request({
    url: `v1/customer/sign/${data.id}`,
    data,
    method: 'get'
  })
}

export const querySigninTable = (info) => { // 签到搜索用户信息
  const data = info
  return axios.request({
    url: 'v1/customer/sign/confirm',
    data,
    method: 'post'
  })
}

export const addSigninTable = (info) => { // 添加用户签到
  const data = info
  return axios.request({
    url: 'v1/customer/sign',
    data,
    method: 'post'
  })
}

export const cancelSigninTable = (info) => { // 取消用户
  const data = info
  return axios.request({
    url: `v1/customer/sign/${data.id}`,
    data,
    method: 'delete'
  })
}

export const addLeadCard = (info) => { // 领手牌
  const data = info
  return axios.request({
    url: 'v1/customer/sign/leadingCard',
    data,
    method: 'post'
  })
}

export const returnCard = (info) => { // 还手牌
  const data = info
  return axios.request({
    url: 'v1/customer/sign/returnCard',
    data,
    method: 'post'
  })
}

// 确认签到
export const confirmPrivateTable = (info) => {  // 私教签到
  const data = info
  return axios.request({
    url: 'v1/staff​/coach​/single​/sign​/privateLesson​',
    data,
    method: 'post'
  })
}

export const getPrivateTable = (info) => { // 获取私教消课列表
  const data = info
  return axios.request({
    url: `v1/staff/coach/single/sign/privateLesson/${data.id}`,
    data,
    method: 'get'
  })
}

export const checkBackPrivateTable = (info) => { // 签退
  const data = info
  return axios.request({
    url: 'v1/staff/coach/single/sign/privateLesson',
    data,
    method: 'post'
  })
}

export const cancelPrivateTable = (info) => { // 取消签到
  const data = info
  return axios.request({
    url: `v1/staff/coach/single/sign/privateLesson/${data.id}`,
    data,
    method: 'delete'
  })
}

export const searchDate = (info) => { // 模糊查询
  const data = info
  return axios.request({
    url: 'v1/search/searchData',
    data,
    method: 'post'
  })
}
// 未找到文档