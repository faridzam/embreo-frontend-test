import { removeToken } from '@/libs/redux/features/auth/authSlice'
import store from '@/libs/redux/store'
import { apiRequest } from '../libs/axios/apiRequest'

export const checkAuth = async (): Promise<boolean> => {
  try {
    const response = await apiRequest.get('/auth/check')
    return response.status === 200 || response.status === 201 ? true : false
  } catch (error) {
    return false
  }
}

export const logout = () => {
  store.dispatch(removeToken())
  window.location.replace('/login')
}
