import axios from '@/config/request'

export const login = ({ username, password }) => {
  return axios.request({
    url: 'v1/users/login',
    data: { username, password },
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
