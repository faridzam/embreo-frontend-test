import { Event, UpdateEvent } from '@/types/events'
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit/react'

export interface EventState {
  events: Event[]
  rowsPerPage: number
  page: number
}

const initialState: EventState = {
  events: [] as Event[],
  rowsPerPage: 10,
  page: 0,
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEvent: (state, action: PayloadAction<Event[]>) => {
      try {
        state.events = action.payload
      } catch (error) {
        console.log(error)
      }
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      try {
        state.events.push({ ...action.payload })
      } catch (error) {
        console.log(error)
      }
    },
    approveEvent: (state, action: PayloadAction<{id: number, company_name: string} & UpdateEvent>) => {
      try {
        const eventIndex = [...state.events].findIndex(
          (event) => event.id === action.payload.id
        )
        const vendorIndex = [...state.events][eventIndex].vendors
        .findIndex((vendor) => vendor.name === action.payload.company_name)
        
        state.events[eventIndex].vendors[vendorIndex].status = 'approved'
        state.events[eventIndex].vendors[vendorIndex].remarks = action.payload.remarks
      } catch (error) {
        console.log(error)
      }
    },
    rejectEvent: (state, action: PayloadAction<{id: number, company_name: string} & UpdateEvent>) => {
      try {
        const eventIndex = [...state.events].findIndex(
          (event) => event.id === action.payload.id
        )
        const vendorIndex = [...state.events][eventIndex].vendors
        .findIndex((vendor) => vendor.name === action.payload.company_name)
        
        state.events[eventIndex].vendors[vendorIndex].status = 'reject'
        state.events[eventIndex].vendors[vendorIndex].remarks = action.payload.remarks
      } catch (error) {
        console.log(error)
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload
    },
  },
})

export const { setEvent, addEvent, approveEvent, rejectEvent, setPage, setRowsPerPage } =
  eventSlice.actions
export const eventReducer = eventSlice.reducer
