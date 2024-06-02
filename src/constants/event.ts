import { Event, UpdateEvent } from '@/types/events'
import dayjs from 'dayjs'

export const initialUpdateEvent: UpdateEvent = {
  event_id: 0,
  name: '',
  location: '',
  remarks: '',
  vendors: [],
  dates: [
    dayjs(new Date()).format('YYYY-MM-DD'),
    dayjs(new Date()).format('YYYY-MM-DD'),
    dayjs(new Date()).format('YYYY-MM-DD'),
  ],
}

export const initialEvent: Event = {
  company: {
    id: 0,
    name: '',
  },
  vendors: [],
  dates: [],
  id: 0,
  user_id: 0,
  name: '',
  location: '',
  created_at: '',
}
