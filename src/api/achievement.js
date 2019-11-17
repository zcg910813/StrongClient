import axios from '@/config/request'

export const getAchievementPerson = (info) => {
  const data = info
  return axios.request({
    url: 'v1/order/queryEmployeeAchi',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const getAchievementCoach = (info) => {
  const data = info
  return axios.request({
    url: 'v1/order/queryCoachAchi',
    data,
    // method: 'post'
    method: 'get'
  })
}
