import axios from '@/config/request'

export const addordergroup = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/order/group',
    data,
    method: 'post'
  })
}

export const deleteordergroup = (info) => {
  const data = info
  return axios.request({
    url: `v1/staff/order/group`,
    data,
    method: 'delete'
  })
}

export const queryordergroup = (curpage) => {
  let curPage = 1
  const data = {
    curPage: curPage
  }
  return axios.request({
    url: `v1/staff/order/group`,
    data,
    method: 'get'
  })
}

export const OrderGroup = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/order/group/sign',
    data,
    method: 'post'
  })
}
