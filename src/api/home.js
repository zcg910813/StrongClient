import axios from '@/config/request'

export const getSalesCount = (info) => { // 获取客流
  const data = info
  return axios.request({
    url: 'v1/homepage/queryDayCount',
    data,
    method: 'get'
  })
}

export const getSalesCard = (info) => { // 获取售卡
  const data = info
  return axios.request({
    url: 'v1/homepage/queryCardCount',
    data,
    method: 'get'
  })
}

export const privateChart = (info) => { // 私教消课图表
  const data = info
  return axios.request({
    url: 'v1/homepage/query30DayCount',
    data,
    method: 'get'
  })
}

export const memberChart = (info) => { // 新增会员图表
  const data = info
  return axios.request({
    url: 'v1/homepage/query30MemberCount',
    data,
    method: 'get'
  })
}

export const getPrivateTable = (info) => { // 获取私教预约表格
  const data = info
  return axios.request({
    url: 'v1/homepage/queryOrderPrivateLesson',
    data,
    method: 'get'
  })
}

export const getGroupTable = (info) => { // 获取团课排课表格
  const data = info
  return axios.request({
    url: 'v1/homepage/queryGroupLesson',
    data,
    method: 'get'
  })
}

export const getExprienceTable = (info) => { // 获取体验表格
  const data = info
  return axios.request({
    url: 'v1/homepage/queryExprience',
    data,
    method: 'get'
  })
}

export const getRemindInfo = (info) => { // 获取提醒信息
  const data = info
  return axios.request({
    url: 'v1/homepage/memberStatistics',
    data,
    method: 'get'
  })
}

export const getFlowCount = (info) => { // 获取客流图标
  const data = info
  return axios.request({
    url: 'v1/homepage/query30flowCount',
    data,
    method: 'get'
  })
}

export const getVolumeCount = (info) => { // 获取客流图表
  const data = info
  return axios.request({
    url: 'v1/homepage/query30DayVolume',
    data,
    method: 'get'
  })
}
