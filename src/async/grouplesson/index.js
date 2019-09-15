import { addLeague, updateLeague, deleteLeague, copyLeague, clearLeague, queryLeague } from '@/api/grouplesson'

export const addLeagueHandle = (info) => {
  return new Promise((resolve, reject) => {
    addLeague(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateLeagueHandle = (info) => {
  return new Promise((resolve, reject) => {
    updateLeague(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteLeagueHandle = (courseId) => {
  return new Promise((resolve, reject) => {
    deleteLeague(courseId).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const copyLeagueHandle = (sourceDate, targetDate) => {
  return new Promise((resolve, reject) => {
    copyLeague(sourceDate, targetDate).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const clearLeagueHandle = (date) => {
  return new Promise((resolve, reject) => {
    clearLeague(date).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const queryLeagueHandle = (info) => {
  return new Promise((resolve, reject) => {
    queryLeague(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
