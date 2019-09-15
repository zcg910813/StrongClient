import { memberBuyVipCard, EditVipCard, ShengCard, LeaveCard, PinCard, PatchCard } from '@/api/buyvipcard'

export const memberButVipCardHandle = (info) => {
  return new Promise((resolve, reject) => {
    memberBuyVipCard(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const EditVipCardHandle = (info) => {
  return new Promise((resolve, reject) => {
    EditVipCard(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const HandShengCard = (info) => {
  return new Promise((resolve, reject) => {
    ShengCard(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getLeaveCard = (info) => {
  return new Promise((resolve, reject) => {
    LeaveCard(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getPinCard = (info) => {
  return new Promise((resolve, reject) => {
    PinCard(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getPatchCard = (info) => {
  return new Promise((resolve, reject) => {
    PatchCard(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
