import {
  login,
  logout, getUserInfo
} from '@/api/user'
import { setToken, getToken, setStoresInfo } from '@/config/util'
const users = {
  state: {
    token: getToken(),
    username: '',
    userId: '',
    access: '',
    storesInfo: [],
    loading: false
  },
  mutations: {
    setUserId (state, id) {
      state.userId = id
    },
    setLoading (state, value) {
      state.loading = value
    },
    setUserName (state, name) {
      state.username = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setStoresInfo (state, storesInfo) {
      state.storesInfo = storesInfo
      setStoresInfo(storesInfo)
    }
  },
  actions: {
    handleLogin: ({ commit, dispatch, state }, { username, password }) => {
      return new Promise((resolve, reject) => {
        login({ username, password }).then(res => {
          if (res.code !== 200) {
            throw res
          }
          const data = res.data
          commit('setToken', data.token)
          commit('setStoresInfo', data.storesInfo)
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    handleLogOut ({ commit, dispatch, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          commit('setStoresInfo', [])
          window.localStorage.removeItem('storesInfo')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getUserInfo ({ commit, dispatch, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(res => {
          const data = res.data
          commit('setUserName', data.user_name)
          commit('setUserId', data.user_id)
          commit('setAccess', data.access)
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
export default users
