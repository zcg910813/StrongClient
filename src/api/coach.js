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
    method: 'post'
  })
}

export const deleteCoach = (coachId) => { // 删除教练
  const data = {
    id: coachId
  }
  return axios.request({
    url: 'v1/coach/delete',
    data,
    method: 'post'
  })
}

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

export const updatePosition = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/positionupdate',
    data,
    method: 'post'
  })
}

export const deletePosition = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/positiondelete',
    data,
    method: 'post'
  })
}

export const queryPosition = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/positionquery',
    data,
    method: 'post'
  })
}

export const queryOrderCoach = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/queryOrderCoach',
    data,
    method: 'post'
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
    method: 'post'
  })
}

export const pauseworktimeupdate = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/pauseworktimeupdate',
    data,
    method: 'post'
  })
}

export const queryPrivateLessonInfo = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/queryPrivateLessonInfo',
    data,
    method: 'post'
  })
}

export const queryCoachPrivatelessonTime = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/queryCoachPrivatelessonTime',
    data,
    method: 'post'
  })
}

export const worktimeupdate = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coach/worktimeupdate',
    data,
    method: 'post'
  })
}

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
