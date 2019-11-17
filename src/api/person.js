import axios from '@/config/request'

export const addEmployee = (info) => {   // 添加工作人员
  const data = info
  return axios.request({
    url: 'v1/employee/add',
    data,
    method: 'post'
  })
}

export const updateEmployee = (info) => {  // 编辑工作人员
  const data = info
  return axios.request({
    url: 'v1/employee/update',
    data,
    // method: 'post'
    method: 'put'
  })
}
//put用法 

export const deleteEmployee = (personId) => {  // 删除工作人员
  const data = {
    id: personId
  }
  return axios.request({
    url: 'v1/employee/delete',
    data,
    // method: 'post'
    method: 'delete'
  })
}
// delete用法

export const queryJob = () => {
  const data = {}
  return axios.request({
    url: 'v1/employee/positionquery',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const addJob = (info) => {
  const data = {
    name: info
  }
  return axios.request({
    url: 'v1/employee/positionadd',
    data,
    method: 'post'
  })
}
// 未找到文档

export const updateJob = (info) => {
  const data = info
  return axios.request({
    url: 'v1/employee/positionupdate',
    data,
    method: 'post'
  })
}
// 未找到文档

export const deleteJob = (info) => {
  const data = info
  return axios.request({
    url: 'v1/employee/positiondelete',
    data,
    method: 'post'
  })
}
// 未找到文档

export const queryMemberPrivate = (info) => { // 会员拥有的私教课
  const data = info
  return axios.request({
    url: 'v1/members/queryMemberPrivate',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const resumeOffice = (info) => { // 员工离职恢复
  const data = info
  return axios.request({
    url: 'v1/employee/resumeOffice',
    data,
    method: 'post'
  })
}
