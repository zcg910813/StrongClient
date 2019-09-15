import axios from '@/config/request'

export const getMemberData = (info) => {
  const data = info
  return axios.request({
    url: '/v1/members',
    data,
    method: 'get'
  })
}

export const getCardData = (info) => {
  const data = info
  return axios.request({
    url: 'v1/vipcard',
    data,
    method: 'post'
  })
}

export const getCourseData = (info) => {
  const data = info
  return axios.request({
    url: 'v1/course',
    data,
    method: 'post'
  })
}

export const getCoachData = (info) => {  // 获取教练列表
  const data = info
  return axios.request({
    url: 'v1/coach/query',
    data,
    method: 'post'
  })
}

export const getAllWorker = (info) => {
  const data = info
  return axios.request({
    url: 'v1/employee/queryinfo',
    data,
    method: 'post'
  })
}

export const getWorkerMember = (info) => {
  const data = info
  return axios.request({
    url: 'v1/employee/query',
    data,
    method: 'post'
  })
}

export const getRoomsData = (info) => { // 获取场馆教室
  const data = info
  return axios.request({
    url: 'v1/manage/QueryStoreRoom',
    data,
    method: 'post'
  })
}

export const getAllPersonData = (info) => { // 查询工作人员或教练
  const data = info
  return axios.request({
    url: 'v1/employee/queryEmployeeAndCoach',
    data,
    method: 'post'
  })
}
