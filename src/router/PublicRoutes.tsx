import checkAuth from '@/middlewares/CheckAuth';
import { delay } from '@/utils/helper';
import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const Login = lazy(
  () => delay(100).then(() => import("@/app/login/Page"))
);

const isLoggedIn = await checkAuth()

export default function PublicRoutes(): RouteObject[] {

  return [
    {
      path: "/*",
      element: isLoggedIn ? <Navigate to={'/'} replace /> : <Login />,
    },
    {
      path: "/login",
      element: isLoggedIn ? <Navigate to={'/'} replace /> : <Login />,
    },
  ]
}
