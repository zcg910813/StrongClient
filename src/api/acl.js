import axios from '@/config/request'

export const createRole = (info) => {
  return axios.request({
    url: 'v1/role/add',
    data: info,
    method: 'post'
  })
}

export const createAccount = (info) => {
  return axios.request({
    url: 'admin/users',
    data: info,
    method: 'post'
  })
}

export const getRoles = () => {
  return axios.request({
    url: 'v1/permission/role/query',
    method: 'post'
  })
}
