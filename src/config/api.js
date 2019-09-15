import Axios from 'axios'
import Cookies from 'vue-cookies'
// const root = 'http://47.105.67.223:8888'
const root = 'http://127.0.0.1:8888/'
// const root = 'http://192.168.0.114:8888'
class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    this.queue = {}
  }
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    return queue.length
  }
  interceptors (instance, url) {
    instance.interceptors.request.use(config => {
      if (!config.url.includes('login')) {
        config.headers['Authorization'] = `Bearer ${Cookies.get('token')}`
        config.headers['storeid'] = localStorage.getItem('storeid')
      }
      return config
    }, error => {
      return Promise.reject(error)
    })
    instance.interceptors.response.use((res) => {
      let { data } = res
      const is = this.destroy(url)
      if (!is) {
        setTimeout(() => {
        }, 500)
      }
      if (data.code !== 200) {
        if (data.code === 401) {
          this.$cookies.remove('token')
          window.location.href = '/#/login'
        } else {
        }
        return data
      }
      return data
    }, (error) => {
      return Promise.reject(error)
    })
  }
  create (token) {
    let conf = {
      baseURL: root,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
    return Axios.create(conf)
  }
  mergeReqest (instances = []) {
  }
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
