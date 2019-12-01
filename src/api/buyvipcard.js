import axios from '@/config/request'

export const memberBuyVipCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/MemberBuyVipCard',
    data,
    method: 'post'
  })
}

export const quertEffective = () => {
  return axios.request({
    url: 'v1/customer/buycard/queryEffective',
    method: 'get'
  })
}

export const queryPotential = () => {
  return axios.request({
    url: 'v1/customer/buycard/queryPotential',
    method: 'get'
  })
}

export const expiredMember = () => {
  return axios.request({
    url: 'v1/customer/buycard/expiredMember',
    method: 'post'
  })
}

export const experienceMember = () => {
  return axios.request({
    url: 'v1/customer/buycard/experienceMember',
    method: 'post'
  })
}

export const cabinetMember = () => {
  return axios.request({
    url: 'v1/customer/buycard/cabinetMember',
    method: 'post'
  })
}

export const nearFutureCard = (cardtype, cardsubtype) => {
  const data = {
    type: cardtype,
    subtype: cardsubtype
  }
  return axios.request({
    url: 'v1/customer/buycard/nearFutureCard',
    data,
    method: 'post'
  })
}

export const frequencyCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/frequencyCard',
    data,
    method: 'post'
  })
}

export const balanceDeplete = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/balanceDeplete',
    data,
    method: 'post'
  })
}

export const birthdayReminding = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/birthdayReminding',
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

export const ShengCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/buyvipcard/ShengCard',
    data,
    method: 'post'
  })
}

export const RenewalCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/RenewalCard',
    data,
    method: 'post'
  })
}

export const EditVipCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/EditVipCard',
    data,
    method: 'post'
  })
}

export const TransferCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/TransferCard',
    data,
    method: 'post'
  })
}

export const LeaveCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/LeaveCard',
    data,
    method: 'post'
  })
}

export const PinCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/pincardMember',
    data,
    method: 'post'
  })
}

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
    url: 'v1/customer/buycard/GiveExperienceCard',
    data,
    method: 'post'
  })
}

export const buyPriCourse = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/MemberBuyPrivate',
    data,
    method: 'post'
  })
}

export const QueryAllBVCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/QueryAllBVCard',
    data,
    method: 'get'
  })
}

export const QueryAllBPCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/QueryAllBPCard',
    data,
    method: 'get'
  })
}

export const addRenewalCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/RenewalCard',
    data,
    method: 'post'
  })
}

export const Charge = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/ChargeCard',
    data,
    method: 'post'
  })
}

export const stopCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/StopCard',
    data,
    method: 'put'
  })
}

export const transferCard = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/TransferCard',
    data,
    method: 'post'
  })
}

export const BatchLeave = (info) => {
  const data = info
  return axios.request({
    url: 'v1/customer/buycard/LeaveCard',
    data,
    method: 'post'
  })
}

