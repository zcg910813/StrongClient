import axios from '@/config/request'

export const getBusinessData = (info) => {
  const data = info
  return axios.request({
    url: 'v1/report/OperationFlow',
    data,
    method: 'post'
  })
}

export const getSalesReport = (info) => {
  const data = info
  return axios.request({
    url: 'v1/report/VipCardSaleReport',
    data,
    method: 'post'
  })
}

export const getPrivateSaleReport = (info) => {
  const data = info
  return axios.request({
    url: 'v1/report/PrivateSaleReport',
    data,
    method: 'post'
  })
}

export const getAmount = (info) => {
  const data = info
  return axios.request({
    url: 'v1/report/GrossIncome',
    data,
    method: 'post'
  })
}

export const getPDisCourseReport = (info) => {
  const data = info
  return axios.request({
    url: 'v1/report/PDisCourseReport',
    data,
    method: 'post'
  })
}
