import { addEmployeeGroup, updateEmployeeGroup, deleteEmployeeGroup, queryEmployeeGroup } from '@/api/persongroup'

export const addEmployeeGroupHandle = (info) => {
  return new Promise((resolve, reject) => {
    addEmployeeGroup(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateEmployeeGroupHandle = (info) => {
  return new Promise((resolve, reject) => {
    updateEmployeeGroup(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteEmployeeGroupHandle = (id) => {
  return new Promise((resolve, reject) => {
    deleteEmployeeGroup(id).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const queryEmployeeGroupHandle = () => {
  return new Promise((resolve, reject) => {
    queryEmployeeGroup().then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
