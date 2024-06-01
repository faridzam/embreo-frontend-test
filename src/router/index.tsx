import checkAuth from '@/middlewares/CheckAuth'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'

const Router = createBrowserRouter([
  await checkAuth() ? PrivateRoutes() : {}
  , ...PublicRoutes()
])

export default Router
