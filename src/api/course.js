import axios from '@/config/request'

export const getCourse = (info) => {
  const data = info
  return axios.request({
    url: 'v1/course',
    data,
    method: 'post'
  })
}

export const addCourse = (info) => {
  const data = info
  return axios.request({
    url: 'v1/course/add',
    data,
    method: 'post'
  })
}

export const updateCourse = (info) => {
  const data = info
  return axios.request({
    url: `v1/course/${data.courseId}/update`,
    data,
    method: 'post'
  })
}

export const deleteCourse = (info) => {
  const data = info
  return axios.request({
    url: 'v1/course/delete',
    data,
    method: 'delete'
  })
}

export const queryCourseOneInfo = (courseId) => {
  const data = {
    courseId: courseId
  }
  return axios.request({
    url: 'v1/course/querycourseinfo',
    data,
    method: 'post'
  })
}

export const getCourseName = () => {
  return axios.request({
    url: 'v1/course/coursename',
    method: 'get'
  })
}

export const RenewalPrivate = (info) => {
  const data = info
  return axios.request({
    url: `v1/buyvipcard/RenewalPrivate`,
    data,
    method: 'post'
  })
}
