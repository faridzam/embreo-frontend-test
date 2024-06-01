import { Event } from '@/types/events'
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
    updateEvent: (state, action: PayloadAction<Event>) => {
      try {
        const eventIndex = [...state.events].findIndex(
          user => user.id === action.payload.id
        )
        state.events[eventIndex] = action.payload
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

export const { setEvent, addEvent, updateEvent, setPage, setRowsPerPage } =
  eventSlice.actions
export const eventReducer = eventSlice.reducer
