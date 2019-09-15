import Cookies from 'vue-cookies'
export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 1
  })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

export const setStoresInfo = (storesInfo) => {
  if (storesInfo && storesInfo.length !== 0) {
    window.localStorage.setItem('storesInfo', JSON.stringify(storesInfo))
  }
}

// export const getBaseStoreID = (index = 0) => {
//   if (window.localStorage.getItem('storesInfo')) {
//     const storesInfo = JSON.parse(window.localStorage.getItem('storesInfo'))
//     return storesInfo[index].storeID
//   }
//   return null
// }
export const getBaseStores = () => {
  if (window.localStorage.getItem('storesInfo')) {
    return JSON.parse(window.localStorage.getItem('storesInfo'))
  }
  return null
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}

export const findNodeUpper = (ele, tag) => {
  if (ele.parentNode) {
    if (ele.parentNode.tagName === tag.toUpperCase()) {
      return ele.parentNode
    } else {
      return findNodeUpper(ele.parentNode, tag)
    }
  }
}

export const findNodeDownward = (ele, tag) => {
  const tagName = tag.toUpperCase()
  if (ele.childNodes.length) {
    let i = -1
    let len = ele.childNodes.length
    while (++i < len) {
      let child = ele.childNodes[i]
      if (child.tagName === tagName) return child
      else return findNodeDownward(child, tag)
    }
  }
}
