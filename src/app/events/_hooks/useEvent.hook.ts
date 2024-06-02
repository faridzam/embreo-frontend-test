import { apiRequest } from '@/libs/axios/apiRequest'
import { addEvent, approveEvent, rejectEvent } from '@/libs/redux/features/events/eventSlice'
import store from '@/libs/redux/store'
import { Company, UpdateEvent } from '@/types/events'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

interface IModalOpenState {
  [id: string]: boolean | undefined
}

const useEvent = () => {
  const dispatch = useDispatch()
  const [modalOpen, setModalOpen] = useState<IModalOpenState>({})
  const [vendors, setVendors] = useState<Company[]>([])

  const handleCloseModal = (id: string) => {
    setModalOpen({
      [id]: false,
    })
  }

  const handleOpenModal = (id: string) => {
    setModalOpen({
      [id]: true,
    })
  }

  const getVendors = async () => {
    try {
      const response = await apiRequest.get('/company/vendor')
      if (response.status === 200) {
        setVendors(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateEvent = async (data: UpdateEvent) => {
    try {
      const response = await apiRequest.post('/event', {
        name: data.name,
        location: data.location,
        vendors: data.vendors,
        dates: data.dates
      })
      if (response.status === 201) {
        dispatch(addEvent(response.data.data))
        setModalOpen({})
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleApproveEvent = async (data: UpdateEvent) => {
    try {
      const response = await apiRequest.patch('/event/approve', {
        event_id: data.event_id,
        remarks: data.remarks
      })
      if (response.status === 200) {
        dispatch(approveEvent({...response.data.data, id: data.event_id, company_name: store.getState().auth.company.name}))
        setModalOpen({})
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleRejectEvent = async (data: UpdateEvent) => {
    try {
      const response = await apiRequest.patch('/event/reject', {
        event_id: data.event_id,
        remarks: `rejected by ${store.getState().auth.company.name} with : "${data.remarks}"`
      })
      if (response.status === 200) {
        dispatch(rejectEvent({...response.data.data, id: data.event_id, company_name: store.getState().auth.company.name}))
        setModalOpen({})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    modalOpen,
    vendors,
    getVendors,
    handleOpenModal,
    handleCloseModal,
    handleCreateEvent,
    handleApproveEvent,
    handleRejectEvent,
  }
}

export default useEvent
