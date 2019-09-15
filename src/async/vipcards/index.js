import { addvipcard, updatevipcard, queryVipCardDetails, deleteVipCard } from '@/api/vipcard'

export const addVipCard = (info) => {
  return new Promise((resolve, reject) => {
    addvipcard(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateVipCardHandle = (info) => {
  return new Promise((resolve, reject) => {
    updatevipcard(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const queryVipCardDetailsHandle = (reqVipCardUid) => {
  return new Promise((resolve, reject) => {
    queryVipCardDetails(reqVipCardUid).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteVipCardHandle = (uidArray) => {
  return new Promise((resolve, reject) => {
    deleteVipCard(uidArray).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
