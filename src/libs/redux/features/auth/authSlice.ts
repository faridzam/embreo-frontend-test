import { Company, Role, User } from '@/types/events'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export interface AuthState {
  token: string,
  user: User,
  company: Company,
  role: Role
}

const initialState: AuthState = {
  token: '',
  user: {
    id: 0,
    role_id: 0,
    company_id: 0,
    name: ''
  },
  company: {
    id: 0,
    name: ''
  },
  role: {
    id: 0,
    name: ''
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<AuthState>) => {
      state.token = action.payload.token
      state.user = action.payload.user
      state.company = action.payload.company
      state.role = action.payload.role
    },
    removeToken: (state) => {
      state.token = ''
    },
  }
})

export const {setToken, removeToken} = authSlice.actions
export const getToken = (state: RootState) => state.auth.token
export const authReducer = authSlice.reducer