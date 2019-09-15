import axios from '@/config/request'

export const getPlaceList = (info) => {  // 获取场地列表
  const data = info
  return axios.request({
    url: 'v1/manage/queryAllRoom',
    data,
    method: 'get'
  })
}

export const getPlaceData = (info) => { // 获取单个场地信息
  const data = info
  return axios.request({
    url: `v1/manage/queryRoom/${data.uid}`,
    data,
    method: 'get'
  })
}

export const addPlace = (info) => { // 添加场地
  const data = info
  return axios.request({
    url: 'v1/manage/addRoom',
    data,
    method: 'post'
  })
}

export const updatePlace = (info) => { // 更新场地
  const data = info
  return axios.request({
    url: 'v1/manage/updateRoom',
    data,
    method: 'put'
  })
}

export const deletePlace = (info) => { // 删除场地
  const data = info
  return axios.request({
    url: 'v1/manage/delRoom',
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
