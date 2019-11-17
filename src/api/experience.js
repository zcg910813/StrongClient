import axios from '@/config/request'

export const addExperience = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/expect',
    data,
    method: 'post'
  })
}
// 未找到文档

export const updateExperience = (info) => {
  const data = info
  return axios.request({
    url: `v1/customer/expect/${data.id}`,
    data,
    method: 'put'
  })
}
//不确定接口

export const deleteExperience = (experienceId) => {
  const data = {}
  return axios.request({
    url: `v1/customer/expect/${experienceId}`,
    data,
    method: 'delete'
  })
}
// 不确定接口

export const queryExperience = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/expect',
    data,
    method: 'get'
  })
}

export const enterExperience = (experienceId) => {
  const data = experienceId
  return axios.request({
    url: 'v1/customer/expect/enter',
    data,
    method: 'post'
  })
}

export const levelExperience = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/expect/leave',
    data,
    method: 'post'
  })
}

export const cancelExperience = (experienceId) => {
  const data = {
    id: experienceId
  }
  return axios.request({
    url: 'v1/customer/expect/cancel',
    data,
    // method: 'post'
    method: 'delete'
  })
}
