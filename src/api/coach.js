import axios from '@/config/request'

export const addCoach = (info) => {  // 添加教练
  const data = info
  return axios.request({
    url: 'v1/coach/add',
    data,
    method: 'post'
  })
}

export const updateCoach = (info) => { // 编辑教练
  const data = info
  return axios.request({
    url: 'v1/coach/update',
    data,
    // method: 'post'
    method: 'put'
  })
}
//不确定put的用法

export const deleteCoach = (coachId) => { // 删除教练
  const data = {
    id: coachId
  }
  return axios.request({
    url: 'v1/coach/delete',
    data,
    // method: 'post'
    method: 'delete'
  })
}
//不确定delete的用法

export const addPosition = (info) => {
  const data = {
    name: info
  }
  return axios.request({
    url: 'v1/coach/positionadd',
    data,
    method: 'post'
  })
}
// 未找到对应文档

export const updatePosition = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/positionupdate',
    data,
    method: 'post'
  })
}
//未找到对应文档

export const deletePosition = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/positiondelete',
    data,
    method: 'post'
  })
}
//未找到对应文档

export const queryPosition = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/positionquery',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const queryOrderCoach = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/queryOrderCoach',
    data,
    //method: 'post'
    method: 'get'
  })
}

export const ordercoach = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/ordercoach',
    data,
    method: 'post'
  })
}

export const deleteOrderCoach = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/deleteOrderCoach',
    data,
    // method: 'post'
    method: 'delete'
  })
}
//不确定delete用法

export const pauseworktimeupdate = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/pauseworktimeupdate',
    data,
    // method: 'post'
    method: 'put'
  })
}
//put用法

export const queryPrivateLessonInfo = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/queryPrivateLessonInfo',
    data,
    method: 'post'
  })
}
//未找到对应文档

export const queryCoachPrivatelessonTime = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/queryCoachPrivatelessonTime',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const worktimeupdate = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/worktimeupdate',
    data,
    // method: 'post'
    method: 'put'
  })
}
//put用法

export const resumeOffice = (info) => { // 教练离职恢复
  const data = info
  return axios.request({
    url: 'v1/coach/resumeOffice',
    data,
    method: 'post'
  })
}

export const changeCoach = (info) => { // 更换教练
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/changeCoach',
    data,
    method: 'post'
  })
}
//未找到文档
