import axios from '@/config/request'

export const addLeague = (info) => {
  const data = info
  return axios.request({
    url: 'v1/grouplesson/sign',
    data,
    method: 'post'
  })
}

export const addGroupLesson = (info) => {  // 团课排课添加
  const data = info
  return axios.request({
    url: 'v1/grouplesson/add',
    data,
    method: 'post'
  })
}

export const updateLeague = (info) => {
  const data = info
  return axios.request({
    url: 'v1/grouplesson/update',
    data,
    method: 'post'
  })
}

export const deleteLeague = (courseId) => {
  const data = {
    id: courseId
  }
  return axios.request({
    url: 'v1/grouplesson/delete',
    data,
    method: 'post'
  })
}

export const copyLeague = (info) => {
  const data = info
  return axios.request({
    url: 'v1/grouplesson/copy',
    data,
    method: 'post'
  })
}

export const clearLeague = (date) => {
  const data = {
    date: date
  }
  return axios.request({
    url: 'v1/grouplesson/clear',
    data,
    method: 'post'
  })
}

export const queryLeague = (info) => { // 获取单独排课
  const data = info
  return axios.request({
    url: 'v1/grouplesson/query',
    data,
    method: 'post'
  })
}

export const signLeague = (info) => { // 签退
  const data = info
  return axios.request({
    url: 'v1/grouplesson/signOk',
    data,
    method: 'post'
  })
}

export const cancelLeague = (info) => { // 取消签退
  const data = info
  return axios.request({
    url: 'v1/grouplesson/cancelSign',
    data,
    method: 'post'
  })
}

export const getCopyCourse = (info) => { // 复制单个课程
  const data = info
  return axios.request({
    url: 'v1/grouplesson/copyOne',
    data,
    method: 'post'
  })
}

export const grouplessonOrder = (info) => { // 团课预约添加
  const data = info
  return axios.request({
    url: 'v1/ordergroup/add',
    data,
    method: 'post'
  })
}

export const grouplessonquery = (info) => {  // 团课预约查询(教练签到)
  const data = info
  return axios.request({
    url: 'v1/ordergroup/query',
    data,
    method: 'post'
  })
}

export const orderTimeSet = (info) => {  // 团课预约限制设置
  const data = info
  return axios.request({
    url: 'v1/grouplesson/orderTimeSet',
    data,
    method: 'post'
  })
}

export const orderTimeSetQuery = (uid) => { // // 团课预约限制获取
  const data = uid
  return axios.request({
    url: 'v1/grouplesson/orderTimeSetQuery',
    data,
    method: 'post'
  })
}

export const priOrderTimeSet = (uid) => { // // 私教课预约限制set
  const data = uid
  return axios.request({
    url: 'v1/coach/orderTimeSet',
    data,
    method: 'post'
  })
}

export const priOrderTimeSetQuery = (uid) => { // // 私教课预约限制get
  const data = uid
  return axios.request({
    url: 'v1/coach/orderTimeSetQuery',
    data,
    method: 'post'
  })
}
