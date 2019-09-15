import { addordergroup, deleteordergroup, queryordergroup } from '@/api/ordergroup'

export const addordergroupHandle = (info) => {
  return new Promise((resolve, reject) => {
    addordergroup(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteordergroupHandle = (info) => {
  return new Promise((resolve, reject) => {
    deleteordergroup(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const queryordergroupHandle = () => {
  return new Promise((resolve, reject) => {
    queryordergroup().then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
