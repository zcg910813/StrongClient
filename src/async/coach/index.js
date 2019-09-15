import { addCoach, addPosition, updatePosition, deletePosition, queryPosition, deleteCoach, updateCoach } from '@/api/coach'

export const addCoachHandle = (info) => {
  return new Promise((resolve, reject) => {
    addCoach(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateCoachHandle = (info) => {
  return new Promise((resolve, reject) => {
    updateCoach(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteCoachHandle = (coachId) => {
  return new Promise((resolve, reject) => {
    deleteCoach(coachId).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const addPositionHandle = (info) => {
  return new Promise((resolve, reject) => {
    addPosition(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updatePositionHandle = (info) => {
  return new Promise((resolve, reject) => {
    updatePosition(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
export const deletePositionHandle = (info) => {
  return new Promise((resolve, reject) => {
    deletePosition(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
export const queryPositionHandle = (info) => {
  return new Promise((resolve, reject) => {
    queryPosition(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
