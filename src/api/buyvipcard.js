import axios from '@/config/request'

export const memberBuyVipCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/memberBuyVipCard',
    data,
    method: 'post'
  })
}

export const quertEffective = () => {
  return axios.request({
    url: 'v1/buyvipcard/queryEffective',
    // method: 'post'
    method: 'get'
  })
}

export const queryPotential = () => {
  return axios.request({
    url: 'v1/buyvipcard/queryPotential',
    // method: 'post'
    method: 'get'
  })
}

export const expiredMember = () => {
  return axios.request({
    url: 'v1/buyvipcard/expiredMember',
    method: 'post'
  })
}

export const experienceMember = () => {
  return axios.request({
    url: 'v1/buyvipcard/experienceMember',
    method: 'post'
  })
}

export const cabinetMember = () => {
  return axios.request({
    url: 'v1/buyvipcard/cabinetMember',
    method: 'post'
  })
}

export const nearFutureCard = (cardtype, cardsubtype) => {
  const data = {
    type: cardtype,
    subtype: cardsubtype
  }
  return axios.request({
    url: 'v1/buyvipcard/nearFutureCard',
    data,
    method: 'post'
  })
}

export const frequencyCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/frequencyCard',
    data,
    method: 'post'
  })
}

export const balanceDeplete = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/balanceDeplete',
    data,
    method: 'post'
  })
}

export const birthdayReminding = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/birthdayReminding',
    data,
    method: 'post'
  })
}

export const Revoke = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/Revoke',
    data,
    method: 'post'
  })
}
//未找到对应文档

export const ShengCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/ShengCard',
    data,
    method: 'post'
  })
}
//未找到对应文档

export const RenewalCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/RenewalCard',
    data,
    method: 'post'
  })
}

export const EditVipCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/EditVipCard',
    data,
    method: 'post'
  })
}

export const TransferCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/TransferCard',
    data,
    method: 'post'
  })
}

export const LeaveCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/LeaveCard',
    data,
    method: 'post'
  })
}

export const PinCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/PinCard',
    data,
    method: 'post'
  })
}
//未找到对应文档

export const PatchCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/PatchCard',
    data,
    method: 'post'
  })
}
//未找到对应文档

export const giveCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/GiveExperienceCard',
    data,
    method: 'post'
  })
}

export const buyPriCourse = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/MemberBuyPrivate',
    data,
    method: 'post'
  })
}

export const QueryAllBVCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/QueryAllBVCard',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const QueryAllBPCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/QueryAllBPCard',
    data,
    // method: 'post'
    method: 'get'
  })
}

export const addRenewalCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/RenewalCard',
    data,
    method: 'post'
  })
}

export const Charge = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/ChargeCard',
    data,
    method: 'post'
  })
}

export const stopCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/StopCard',
    data,
    // method: 'post'
    method: 'put'
  })
}
//不确定put请求的用法

export const transferCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/TransferCard',
    data,
    method: 'post'
  })
}

export const BatchLeave = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/LeaveCard',
    data,
    method: 'post'
  })
}

