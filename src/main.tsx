import '@fontsource-variable/montserrat'
import { ThemeProvider } from '@mui/material'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import LoadingModal from './components/modals/LoadingModal.tsx'
import { theme } from './constants/theme.ts'
import './global.css'
import store, { persistor } from './libs/redux/store.ts'
import Router from './router/index.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={<LoadingModal />} persistor={persistor}>
      <Suspense fallback={<LoadingModal />}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={Router} />
        </ThemeProvider>
      </Suspense>
    </PersistGate>
  </Provider>
)
