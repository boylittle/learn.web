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
  toLogin: params => postInstance.post('/learn/user/account/toLogin', { ...params }),
  updateAccount: params => postInstance.post('/learn/user/account/update', { ...params }),
  getAccount: params => getInstance.get('/learn/user/account/getAccount', { params })
}

const ArticleAPI = {
  findBySamples: params => postInstance.post('/learn/article/findBySamples', { ...params }),
  findByPage: params => postInstance.get('/learn/article/findByPage', { params }),
  save: params => postInstance.post('/learn/article/save', { ...params }),
  delete: params => postInstance.post('/learn/article/delete', { ...params })
}

const ArticleTagAPI = {
  findAll: params => getInstance.get('/learn/articleTag/findAll', { params })
}

export {
  UserAPI,
  ArticleAPI,
  ArticleTagAPI
}
