import { addExperience, updateExperience, deleteExperience, queryExperience, enterExperience, levelExperience, cancelExperience } from '@/api/experience'

export const addExperienceHandle = (info) => {
  return new Promise((resolve, reject) => {
    addExperience(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateExperienceHandle = (info) => {
  return new Promise((resolve, reject) => {
    updateExperience(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteExperienceHandle = (experienceId) => {
  return new Promise((resolve, reject) => {
    deleteExperience(experienceId).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const queryExperienceHandle = (info) => {
  return new Promise((resolve, reject) => {
    queryExperience(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const enterExperienceHandle = (experienceId) => {
  return new Promise((resolve, reject) => {
    enterExperience(experienceId).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const levelExperienceHandle = (info) => {
  return new Promise((resolve, reject) => {
    levelExperience(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const cancelExperienceHandle = (experienceId) => {
  return new Promise((resolve, reject) => {
    cancelExperience(experienceId).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
