import { registerMember, updateRfid, queryMemberInfo, insertDeposit, cabinetMember, leaveMemberData, insertEarnest, notifyMsg, queryDeposit, deleteDeposit, deleteEarnest, getAllDeposits, getAllEarnests, insertCabinets, queryEffective, queryPotential, expiredMember, experienceMember, queryMemberVipCard, signPrivateLessonRecord, orderRecord, signInfo, trainingRecordList, contractList, followList, deleteMembers, deleteFollow, updateMembers, depletedMembers, pincardMembers, addFollow } from '@/api/member'

export const register = (info) => {
  return new Promise((resolve, reject) => {
    registerMember(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const bindingRfid = (info) => {
  return new Promise((resolve, reject) => {
    updateRfid(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const acquireMemberInfo = (info) => {
  return new Promise((resolve, reject) => {
    queryMemberInfo(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const starInsertDeposit = (deposit) => {
  return new Promise((resolve, reject) => {
    insertDeposit(deposit).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const starInsertEarnest = (earnest) => {
  return new Promise((resolve, reject) => {
    insertEarnest(earnest).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateNotifyMsg = (msgdata) => {
  return new Promise((resolve, reject) => {
    notifyMsg(msgdata).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const memberQueryDeposit = (memberuid) => {   // 查询押金
  return new Promise((resolve, reject) => {
    queryDeposit(memberuid).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteDepositHandle = (uidlist) => {
  return new Promise((resolve, reject) => {
    deleteDeposit(uidlist).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteEarnestHandle = (uidlist) => {
  return new Promise((resolve, reject) => {
    deleteEarnest(uidlist).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getAllDepositsHandle = () => {
  return new Promise((resolve, reject) => {
    getAllDeposits().then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getAllEarnestsHandle = () => {
  return new Promise((resolve, reject) => {
    getAllEarnests().then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const insertCabinetsHandle = (info) => {
  return new Promise((resolve, reject) => {
    insertCabinets(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const queryEffectiveHandle = (info) => {
  return new Promise((resolve, reject) => {
    queryEffective(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const queryPotentialHandle = (info) => {
  return new Promise((resolve, reject) => {
    queryPotential(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const expiredMemberHandle = (info) => {
  return new Promise((resolve, reject) => {
    expiredMember(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const experienceMemberHandle = (info) => {
  return new Promise((resolve, reject) => {
    experienceMember(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const cabinetMemberHandle = (info) => {
  return new Promise((resolve, reject) => {
    cabinetMember(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const HandleleaveMemberData = (info) => {
  return new Promise((resolve, reject) => {
    leaveMemberData(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getqueryMemberVipCard = (info) => {
  return new Promise((resolve, reject) => {
    queryMemberVipCard(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getsignPrivateLessonRecord = (info) => {
  return new Promise((resolve, reject) => {
    signPrivateLessonRecord(info).then(res => {
      const data = res
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getorderRecord = (info) => {
  return new Promise((resolve, reject) => {
    orderRecord(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getsignInfo = (info) => {
  return new Promise((resolve, reject) => {
    signInfo(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const gettrainingRecordList = (info) => {
  return new Promise((resolve, reject) => {
    trainingRecordList(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getcontractList = (info) => {
  return new Promise((resolve, reject) => {
    contractList(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const getfollowList = (info) => {
  return new Promise((resolve, reject) => {
    followList(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteMemberHandle = (info) => {
  return new Promise((resolve, reject) => {
    deleteMembers(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const deleteFollowHandle = (info) => {
  return new Promise((resolve, reject) => {
    deleteFollow(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const updateMemberHandle = (info) => {
  return new Promise((resolve, reject) => {
    updateMembers(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const depletedMemberHandle = (info) => {
  return new Promise((resolve, reject) => {
    depletedMembers(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const pincardMemberHandle = (info) => {
  return new Promise((resolve, reject) => {
    pincardMembers(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

export const addFollowHandle = (info) => {
  return new Promise((resolve, reject) => {
    addFollow(info).then(res => {
      const data = res.data
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
