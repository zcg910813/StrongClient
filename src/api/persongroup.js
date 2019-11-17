import axios from '@/config/request'

export const addEmployeeGroup = (info) => {
  const data = info
  return axios.request({
    url: 'v1/employeegroup/add',
    data,
    method: 'post'
  })
}

export const updateEmployeeGroup = (info) => {
  const data = info
  return axios.request({
    url: 'v1/employeegroup/update',
    data,
    // method: 'post'
    method: 'put'
  })
}
// put用法

export const deleteEmployeeGroup = (employeeId) => {
  const data = {
    id: employeeId
  }
  return axios.request({
    url: 'v1/employeegroup/delete',
    data,
    // method: 'post'
    method: 'delete'
  })
}
// delete用法

export const queryEmployeeGroup = () => {
  const data = {}
  return axios.request({
    url: 'v1/employeegroup/query',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const getAllPrivates = (info) => {  // 获取私教课列表
  const data = info
  return axios.request({
    url: 'v1/vipcard/getAllPrivates',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const queryPrivateDetails = (uid) => {
  const data = uid
  return axios.request({
    url: 'v1/vipcard/queryPrivateDetails',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const deletePrivate = (uid) => {
  const data = uid
  return axios.request({
    url: 'v1/vipcard/deletePrivate',
    data,
    // method: 'post'
    method: 'delete'
  })
}
// delete用法

export const addPrivate = (uid) => {
  const data = uid
  return axios.request({
    url: 'v1/vipcard/addPrivate',
    data,
    method: 'post'
  })
}

export const editPrivate = (uid) => {
  const data = uid
  return axios.request({
    url: 'v1/vipcard/updatePrivate',
    data,
    // method: 'post'
    method: 'put'
  })
}
