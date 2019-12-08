import axios from '@/config/request'

export const getCourse = (info) => {
  const data = info
  return axios.request({
    url: 'v1/course',
    data,
    method: 'post'
  })
}
//未找到文档

export const addCourse = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/course/single',
    data,
    method: 'post'
  })
}

export const updateCourse = (info) => {
  const data = info
  return axios.request({
    url: `v1/staff/course/single`,
    data,
    method: 'put'
  })
}

export const deleteCourse = (info) => {
  const data = info
  return axios.request({
    url: 'v1/staff/course/single',
    data,
    method: 'delete'
  })
}

export const queryCourseOneInfo = (courseId) => {
  const data = {
    courseId: courseId
  }
  return axios.request({
    url: 'v1/staff/course/single',
    data,
    method: 'get'
  })
}

export const getCourseName = () => {
  return axios.request({
    url: 'v1/staff/course/single/coursename',
    method: 'get'
  })
}

export const RenewalPrivate = (info) => {
  const data = info
  return axios.request({
    url: `v1/customer/buycard/RenewalPrivate`,
    data,
    method: 'post'
  })
}
