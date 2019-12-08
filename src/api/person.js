import axios from '@/config/request'

export const addEmployee = (info) => {   // 添加工作人员
  const data = info
  return axios.request({
    url: 'v1/staff/employeer/single',
    data,
    method: 'post'
  })
}

export const updateEmployee = (info) => {  // 编辑工作人员
  const data = info
  return axios.request({
    url: `v1/staff/employeer/single`,
    data,
    method: 'put'
  })
}

export const deleteEmployee = (personId) => {  // 删除工作人员
  const data = {
    id: personId
  }
  return axios.request({
    url: 'v1/staff/employeer/single',
    data,
    method: 'delete'
  })
}

export const queryJob = () => {
  const data = {}
  return axios.request({
    url: 'v1/staff/employeer/single/positionquery',
    data,
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
    url: 'v1/staff/employeer/single/adminPositionUpdate',
    data,
    method: 'get'
  })
}

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
    url: 'v1/customer/member/memberPrivate',
    data,
    method: 'get'
  })
}

export const resumeOffice = (info) => { // 员工离职恢复
  const data = info
  return axios.request({
    url: 'v1/staff/employeer/single/resumeOffice',
    data,
    method: 'post'
  })
}
