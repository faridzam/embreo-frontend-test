import { colors } from '@/constants/colors'
import { setEvent } from '@/libs/redux/features/events/eventSlice'
import { useAppDispatch } from '@/libs/redux/hooks'
import store from '@/libs/redux/store'
import { Event } from '@/types/events'
import { Add } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import CreateEventModal from './_components/CreateEventModal'
import EventTable from './_components/EventTable'
import useEvent from './_hooks/useEvent.hook'

const EventPage = () => {
  const dispatch = useAppDispatch()
  const { events } = useLoaderData() as { events: Event[] }

  const { modalOpen, handleOpenModal, handleCloseModal, handleCreateEvent } = useEvent()

  useEffect(() => {
    dispatch(setEvent(events))
  }, [])

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'16px'} data-testid="event-page">
      <CreateEventModal
        data-testid="modal-create"
        id="modal-create"
        open={modalOpen['modal-create'] === true}
        onClose={() => handleCloseModal('modal-create')}
        onCreate={data => handleCreateEvent(data)}
      />
      <Box
        display={'flex'}
        alignItems={'center'}
        justifyContent={'space-between'}
        marginTop={'32px'}
      >
        <Typography variant="h4" fontWeight={500}>
          Event List
        </Typography>
        {store.getState().auth.role.id === 1 && (
          <Button
            data-testid="create-event-button"
            variant="contained"
            color="primary"
            startIcon={<Add sx={{ color: colors.white.light, fontSize: '18px' }} />}
            onClick={() => handleOpenModal('modal-create')}
          >
            <Typography variant="button" color={colors.white.light}>
              Create Event
            </Typography>
          </Button>
        )}
      </Box>
      <EventTable />
    </Box>
  )
}

export default EventPage
