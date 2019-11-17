import axios from '@/config/request'

export const getAllRole = (info) => {
  const data = info
  return axios.request({
    url: 'v1/permission/role/query',
    data,
    method: 'post'
  })
}
// 未找到文档

export const deleteRole = (info) => {
  const data = info
  return axios.request({
    url: 'v1/permission/role/delete',
    data,
    method: 'post'
  })
}
// 未找到文档

export const addRole = (info) => {
  const data = info
  return axios.request({
    url: 'v1/permission/role/add',
    data,
    method: 'post'
  })
}

export const editRole = (info) => {
  const data = info
  return axios.request({
    url: 'v1/permission/role/update',
    data,
    method: 'post'
  })
}
// 未找到文档

export const getRoleResource = (info) => {
  const data = info
  return axios.request({
    url: 'v1/permission/role/queryResource',
    data,
    method: 'post'
  })
}
// 未找到文档