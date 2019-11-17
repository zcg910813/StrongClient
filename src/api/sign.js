import axios from '@/config/request'

export const getSigninTable = (info) => { // 获取签到列表
  const data = info
  return axios.request({
    url: 'v1/signin/',
    data,
    method: 'post'
  })
}

export const querySigninTable = (info) => { // 签到搜索用户信息
  const data = info
  return axios.request({
    url: 'v1/signin/memberConfirm',
    data,
    method: 'post'
  })
}

export const addSigninTable = (info) => { // 添加用户签到
  const data = info
  return axios.request({
    url: 'v1/signin/memberSignin',
    data,
    method: 'post'
  })
}

export const cancelSigninTable = (info) => { // 取消用户
  const data = info
  return axios.request({
    url: 'v1/signin/cancelMemSignin',
    data,
    // method: 'post'
    method: 'delete'
  })
}
// delete用法

export const addLeadCard = (info) => { // 领手牌
  const data = info
  return axios.request({
    url: 'v1/signin/leadingCard',
    data,
    method: 'post'
  })
}

export const returnCard = (info) => { // 还手牌
  const data = info
  return axios.request({
    url: 'v1/signin/returnCard',
    data,
    method: 'post'
  })
}

// 确认签到
export const confirmPrivateTable = (info) => {  // 私教签到
  const data = info
  return axios.request({
    url: 'v1/coach/SignPrivateLesson',
    data,
    method: 'post'
  })
}

export const getPrivateTable = (info) => { // 获取私教消课列表
  const data = info
  return axios.request({
    url: 'v1/coach/querySignPrivateLesson',
    data,
    // method: 'post'
    method: 'get'
  })
}
// 有两个接口相同的接口,但都是get请求

export const checkBackPrivateTable = (info) => { // 签退
  const data = info
  return axios.request({
    url: 'v1/coach/SignOkPrivateLesson',
    data,
    method: 'post'
  })
}
// 未找到文档

export const cancelPrivateTable = (info) => { // 取消签到
  const data = info
  return axios.request({
    url: 'v1/coach/CancelSignPrivateLesson',
    data,
    // method: 'post'
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