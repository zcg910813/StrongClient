import axios from '@/config/request'

export const getAchievementPerson = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/order/single/queryEmployeeAchi',
    data,
    method: 'get'
  })
}

export const getAchievementCoach = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/order/single/queryCoachAchi',
    data,
    method: 'get'
  })
}
