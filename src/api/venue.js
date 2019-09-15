import axios from '@/config/request'

export const getRegion = (info) => { // 获取所在地区
  const data = info
  return axios.request({
    url: 'v1/storage/manage/queryArea',
    data,
    method: 'get'
  })
}

export const addVenue = (info) => { // 新增场馆
  const data = info
  return axios.request({
    url: 'v1/storage/manage/addStore',
    data,
    method: 'post'
  })
}

export const fetchVenue = (info) => { // 获取场馆
  const data = info
  return axios.request({
    url: 'v1/storage/manage/queryStore',
    data,
    method: 'get'
  })
}

export const fetchAllVenue = (info) => { // 获取场馆
  const data = info
  return axios.request({
    url: 'v1/storage/manage/queryAllStores',
    data,
    method: 'get'
  })
}

export const deleteVenue = (info) => { // 删除场馆
  const data = info
  return axios.request({
    url: 'v1/storage/manage/deleteStore',
    data,
    method: 'delete'
  })
}

export const updateVenue = (info) => { // 编辑场馆
  const data = info
  return axios.request({
    url: 'v1/storage/manage/updateStore',
    data,
    method: 'put'
  })
}

// 系统设置
export const getCurrentStoreData = (info) => { // 场馆管理
  const data = info
  return axios.request({
    url: 'v1/storage/manage/queryAllStores',
    data,
    method: 'get'
  })
}

export const AddField = (info) => { // 场馆管理
  const data = info
  return axios.request({
    url: 'v1/storage/manage/AddStore',
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
