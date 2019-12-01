import axios from '@/config/request'

export const addLeague = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/course/group/sign',
    data,
    method: 'post'
  })
}

export const addGroupLesson = (info) => {  // 团课排课添加
  const data = info
  return axios.request({
    url: 'v1/staff/course/group',
    data,
    method: 'post'
  })
}

export const updateLeague = (info) => {
  const data = info
  return axios.request({
    url: `v1/staff/course/group/${data.id}`,
    data,
    method: 'put'
  })
}

export const deleteLeague = (courseId) => {
  const data = {
    id: courseId
  }
  return axios.request({
    url: 'v1/staff/course/group',
    data,
    method: 'delete'
  })
}
// delete用法

export const copyLeague = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/course/group/copy',
    data,
    method: 'post'
  })
}

export const clearLeague = (date) => {
  const data = {
    date: date
  }
  return axios.request({
    url: 'v1/staff/course/group/clear',
    data,
    method: 'post'
  })
}

export const queryLeague = (info) => { // 获取单独排课
  const data = info
  return axios.request({
    url: `v1/staff/course/group/${data.id}`,
    data,
    method: 'get'
  })
}

export const signLeague = (info) => { // 签退
  const data = info
  return axios.request({
    url: 'v1/staff/course/group/signOk',
    data,
    method: 'post'
  })
}

export const cancelLeague = (info) => { // 取消签退
  const data = info
  return axios.request({
    url: 'v1/staff/course/group/cancelSign',
    data,
    method: 'post'
  })
}

export const getCopyCourse = (info) => { // 复制单个课程
  const data = info
  return axios.request({
    url: 'v1/staff/course/group/copyOne',
    data,
    method: 'post'
  })
}

export const grouplessonOrder = (info) => { // 团课预约添加
  const data = info
  return axios.request({
    url: 'v1/staff/order/group',
    data,
    method: 'post'
  })
}

export const grouplessonquery = (info) => {  // 团课预约查询(教练签到)
  const data = info
  return axios.request({
    url: `v1/staff/order/group/${data.id}`,
    data,
    method: 'get'
  })
}

export const orderTimeSet = (info) => {  // 团课预约限制设置
  const data = info
  return axios.request({
    url: 'v1/staff/course/group/orderTimeSet',
    data,
    method: 'post'
  })
}

export const orderTimeSetQuery = (uid) => { // // 团课预约限制获取
  const data = uid
  return axios.request({
    url: 'v1/staff/course/group/orderTimeSetQuery',
    data,
    method: 'post'
  })
}

export const priOrderTimeSet = (uid) => { // // 私教课预约限制set
  const data = uid
  return axios.request({
    url: 'v1/staff/coach/single/order/timeSet',
    data,
    method: 'post'
  })
}

export const priOrderTimeSetQuery = (uid) => { // // 私教课预约限制get
  const data = uid
  return axios.request({
    url: 'v1/staff/coach/single/order/timeSet',
    data,
    method: 'get'
  })
}
