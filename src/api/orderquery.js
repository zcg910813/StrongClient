import axios from '@/config/request'

export const getOrderList = (info) => {
  const data = info
  return axios.request({
    url: 'v1/order/queryOrderList',
    data,
    // method: 'post'
    method: 'get'
  })
}
