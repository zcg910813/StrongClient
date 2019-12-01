import axios from '@/config/request'

export const getPlaceList = (info) => {  // 获取场地列表
  const data = info
  return axios.request({
    url: 'v1/manage/queryAllRoom',
    data,
    method: 'get'
  })
}
// 未找到文档

export const getPlaceData = (info) => { // 获取单个场地信息
  const data = info
  return axios.request({
    url: `v1/manage/queryRoom/${data.uid}`,
    data,
    method: 'get'
  })
}
// 未找到文档

export const addPlace = (info) => { // 添加场地
  const data = info
  return axios.request({
    url: 'v1/storage/room',
    data,
    method: 'post'
  })
}

export const updatePlace = (info) => { // 更新场地
  const data = info
  return axios.request({
    url: `v1/storage/room/${data.id}`,
    data,
    method: 'put'
  })
}

export const deletePlace = (info) => { // 删除场地
  const data = info
  return axios.request({
    url: `v1/storage/room/${data.id}`,
    data,
    method: 'delete'
  })
} 

export const UploadExcel = (info) => { // 导入Excel
  const data = info
  return axios.request({
    url: 'v1/import/importData',
    data,
    method: 'update'
  })
}
// 未找到文档  并且不知道update用法
