import axios from '@/config/request'

export const getAllRole = (info) => {
  const data = info
  return axios.request({
    url: 'v1/permission/role/query',
    data,
    method: 'post'
  })
}

export const deleteRole = (info) => {
  const data = info
  return axios.request({
    url: `v1/staff/permission/role/${data.id}`,
    data,
    method: 'delete'
  })
}

export const addRole = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/permission/role',
    data,
    method: 'post'
  })
}

export const editRole = (info) => {
  const data = info
  return axios.request({
    url: `v1/staff/permission/role/${data.id}`,
    data,
    method: 'put'
  })
}

export const getRoleResource = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/permission/role/queryResource',
    data,
    method: 'get'
  })
}