import axios from '@/config/request'

export const addEmployeeGroup = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/employeer/group',
    data,
    method: 'post'
  })
}

export const updateEmployeeGroup = (info) => {
  const data = info
  return axios.request({
    url: `v1/staff/employeer/group/${data.id}`,
    data,
    method: 'put'
  })
}

export const deleteEmployeeGroup = (employeeId) => {
  const data = {
    id: employeeId
  }
  return axios.request({
    url: 'v1/staff/employeer/group',
    data,
    method: 'delete'
  })
}
// delete用法

export const queryEmployeeGroup = () => {
  const data = {}
  return axios.request({
    url: 'v1/staff/employeer/group/${data.id}',
    data,
    method: 'get'
  })
}

export const getAllPrivates = (info) => {  // 获取私教课列表
  const data = info
  return axios.request({
    url: `v1/customer/membercard/private/${data.id}`,
    data,
    method: 'get'
  })
}

export const queryPrivateDetails = (uid) => {
  const data = uid
  return axios.request({
    url: 'v1/customer/membercard/private',
    data,
    method: 'get'
  })
}

export const deletePrivate = (uid) => {
  const data = uid
  return axios.request({
    url: 'v1/customer/membercard/private',
    data,
    method: 'delete'
  })
}
// delete用法

export const addPrivate = (uid) => {
  const data = uid
  return axios.request({
    url: 'v1/customer/membercard/private',
    data,
    method: 'post'
  })
}

export const editPrivate = (uid) => {
  const data = uid
  return axios.request({
    url: 'v1/customer/membercard/private',
    data,
    method: 'put'
  })
}
