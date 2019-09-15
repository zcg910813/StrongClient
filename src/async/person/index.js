import { addEmployee, deleteEmployee, updateEmployee, queryJob, addJob, updateJob, deleteJob } from '@/api/person'

export const addCoachHandle = (info) => {
  return new Promise((resolve, reject) => {
    addCoach(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const addEmployeeHandle = (info) => {
  return new Promise((resolve, reject) => {
    addEmployee(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateEmployeeHandle = (info) => {
  return new Promise((resolve, reject) => {
    updateEmployee(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteEmployeeHandle = (personId) => {
  return new Promise((resolve, reject) => {
    deleteEmployee(personId).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const queryJobHandle = () => {
  return new Promise((resolve, reject) => {
    queryJob().then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const addJobHandle = (name) => {
  return new Promise((resolve, reject) => {
    addJob(name).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateJobHandle = (info) => {
  return new Promise((resolve, reject) => {
    updateJob(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteJobHandle = (info) => {
  return new Promise((resolve, reject) => {
    deleteJob(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
