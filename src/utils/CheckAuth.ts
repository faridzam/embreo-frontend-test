import { apiRequest } from "../libs/axios/apiRequest"

const checkAuth = async () : Promise<boolean> => {
  try {
    const response = await apiRequest.get('/auth/check')
    return response.status === 200 || response.status === 201 ? true : false
  } catch (error) {
    return false
  }
}

export default checkAuth;