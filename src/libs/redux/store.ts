import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from './features/auth/authSlice'
import { eventReducer } from './features/events/eventSlice'

const reducers = combineReducers({
  auth: authReducer,
  event: eventReducer
})

const persistedReducer = persistReducer(
  {
    key: 'persist-storage',
    version: 1,
    storage,
    blacklist: ['event'],
  },
  reducers
)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['items.dates'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store

export const persistor = persistStore(store)
