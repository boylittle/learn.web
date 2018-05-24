import axios from 'axios'
import qs from 'qs'

axios.defaults.headers.post['Content-Type'] = 'application/json'

const apiHost = process.env.API_HOST

const postInstance = axios.create({
  baseURL: apiHost
})

const getInstance = axios.create({
  baseURL: apiHost,
  transformRequest: [data => qs.stringify(data)]
})

const UserAPI = {
  toLogin: params => postInstance.post('/user/account/toLogin', { ...params }),
  getAccount: params => getInstance.get('/user/account/getAccount', { params })
}

const ArticleAPI = {
  findBySamples: params => postInstance.post('/article/findBySamples', { ...params }),
  findByPage: params => postInstance.get('/article/findByPage', { params }),
  save: params => postInstance.post('/article/save', { ...params }),
  delete: params => postInstance.post('/article/delete', { ...params })
}

export {
  UserAPI,
  ArticleAPI
}
