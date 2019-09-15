import { addCoachGroup, updateCoachGroup, deleteCoachGroup, queryCoachGroup } from '@/api/coachgroup'

export const addCoachGroupHandle = (info) => {
  return new Promise((resolve, reject) => {
    addCoachGroup(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateCoachGroupHandle = (info) => {
  return new Promise((resolve, reject) => {
    updateCoachGroup(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteCoachGroupHandle = (id) => {
  return new Promise((resolve, reject) => {
    deleteCoachGroup(id).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const queryCoachGroupHandle = () => {
  return new Promise((resolve, reject) => {
    queryCoachGroup().then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
