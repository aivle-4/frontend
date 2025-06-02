import axios from 'axios'
import {store} from '../store/store'
import {logout} from '../store/authSlice'

const api = axios.create({
  baseURL: 'http://43.201.95.39:8080/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
}, (error) => {
  // 에러 일괄 처리가능
  // unauthorized 에러 발생 시 token 삭제
  if (error.response && error.response.status === 401) {
    store.dispatch(logout())
  }
  return Promise.reject(error)
})

export default api 