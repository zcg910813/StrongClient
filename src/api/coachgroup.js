import axios from '@/config/request'

export const addCoachGroup = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/coach/group',
    data,
    method: 'post'
  })
}

export const updateCoachGroup = (info) => {
  const data = info
  return axios.request({
    url: `v1/staff/coach/group`  ,
    data,
    method: 'put'
  })
}
//put用法

export const deleteCoachGroup = (coachId) => {
  const data = {
    id: coachId
  }
  return axios.request({
    url: 'v1/staff/coach/group',
    data,
    method: 'delete'
  })
}
//delete用法

export const queryCoachGroup = () => {
  const data = {}
  return axios.request({
    url: 'v1/staff/coach/group',
    data,
    method: 'get'
  })
}
