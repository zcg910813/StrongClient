import axios from '@/config/request'

export const addCoachGroup = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coachgroup/add',
    data,
    method: 'post'
  })
}

export const updateCoachGroup = (info) => {
  const data = info
  return axios.request({
    url: 'v1/coachgroup/update',
    data,
    // method: 'post'
    method: 'put'
  })
}
//put用法

export const deleteCoachGroup = (coachId) => {
  const data = {
    id: coachId
  }
  return axios.request({
    url: 'v1/coachgroup/delete',
    data,
    // method: 'post'
    method: 'delete'
  })
}
//delete用法

export const queryCoachGroup = () => {
  const data = {}
  return axios.request({
    url: 'v1/coachgroup/query',
    data,
    // method: 'post'
    method: 'get'
  })
}
