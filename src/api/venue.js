import axios from '@/config/request'

export const getRegion = (info) => { // 获取所在地区
  const data = info
  return axios.request({
    url: `v1/storage/manage/area/${data.id}`,
    data,
    method: 'get'
  })
}

export const addVenue = (info) => { // 新增场馆
  const data = info
  return axios.request({
    url: 'v1/storage/manage',
    data,
    method: 'post'
  })
}

export const fetchVenue = (info) => { // 获取单个场馆
  const data = info
  return axios.request({
    url: `v1/storage/manage/uid`,
    data,
    method: 'get'
  })
}

export const fetchAllVenue = (info) => { // 获取场馆列表
  const data = info
  return axios.request({
    url: 'v1/storage/manage',
    data,
    method: 'get'
  })
}

export const deleteVenue = (info) => { // 删除场馆
  const data = info
  return axios.request({
    url: `v1/storage/manage/${data.id}`,
    data,
    method: 'delete'
  })
}

export const updateVenue = (info) => { // 编辑场馆
  const data = info
  return axios.request({
    url: `v1/storage/manage/${data.id}`,
    data,
    method: 'put'
  })
}

// 系统设置
export const getCurrentStoreData = (info) => { // 场馆管理
  const data = info
  return axios.request({
    url: `v1/storage/manage/${data.id}`,
    data,
    method: 'get'
  })
}

export const AddField = (info) => { // 场馆管理
  const data = info
  return axios.request({
    url: 'v1/storage/manage',
    data,
    method: 'post'
  })
}

export const HardWare = (info) => { // 获取硬件
  const data = info
  return axios.request({
    url: 'v1/storage/manage/queryHWlist',
    data,
    method: 'get'
  })
}

export const updateHardWare = (info) => { // 添加硬件
  const data = info
  return axios.request({
    url: 'v1/storage/manage/updateHardWare',
    data,
    method: 'post'
  })
}
// 这个文件貌似之前改过
