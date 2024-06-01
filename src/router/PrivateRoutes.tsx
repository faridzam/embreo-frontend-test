import MainLayout from '@/components/layouts/MainLayout'
import { apiRequest } from '@/libs/axios/apiRequest'
import { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

export default function PrivateRoutes() : RouteObject {
  const EventPage = lazy(() => import('@/app/events/Page'))
  const EventPageError = lazy(() => import('@/app/events/Error'))
  return {
    element: <MainLayout />,
    path: '/',
    children: [
      {
        path: '',
        element: <Navigate to={'/events'} replace />,
      },
      {
        path: '*',
        element: <Navigate to={'/events'} replace />,
      },
      {
        path: 'events',
        element: <EventPage />,
        errorElement: <EventPageError />,
        loader: async () => {
          const events = (await apiRequest.get('/event')).data.data
          return { events }
        },
      },
    ],
  }
}
