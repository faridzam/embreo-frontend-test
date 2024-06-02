import DateInput from '@/components/inputs/DateInput'
import MultiSelectInput from '@/components/inputs/MultiSelectInput'
import TextInput from '@/components/inputs/TextInput'
import { initialUpdateEvent } from '@/constants/event'
import { UpdateEvent } from '@/types/events'
import { setNestedState } from '@/utils/stateHelper'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import { ChangeEvent, useEffect, useState } from 'react'
import useEvent from '../_hooks/useEvent.hook'

interface ICreateEventModalProps {
  id: string
  open: boolean | undefined
  data?: UpdateEvent
  onClose: (id: string) => void
  onCreate: (data: UpdateEvent) => void
  [key: string]: any
}

const CreateEventModal = (props: ICreateEventModalProps) => {
  const {
    id,
    open,
    data = initialUpdateEvent,
    onClose,
    onCreate = () => {},
    ...restProps
  } = props

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const { vendors, getVendors } = useEvent()

  const onSubmit = () => {
    onCreate(form)
  }

  const [form, setForm] = useState<UpdateEvent>(() => data)

  const handleChangeForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    const keys = name.split('.')

    setForm((prevState: UpdateEvent) => setNestedState(prevState, keys, value))
  }

  const updateDateAtIndex = (index: number, newDate: string) => {
    setForm(prevState => ({
      ...prevState,
      dates: prevState.dates!.map((date, i) => (i === index ? newDate : date)),
    }))
    console.log(form)
  }

  const conditionSubmit =
    form.name &&
    form.name.length > 0 &&
    form.location &&
    form.location.length > 0 &&
    form.vendors!.length > 0 &&
    form.dates!.length > 0

  useEffect(() => {
    getVendors()
  }, [])

  return (
    <>
      <Dialog
        {...restProps}
        id={id}
        fullScreen={fullScreen}
        open={open || false}
        onClose={onClose}
        sx={{
          zIndex: '10000',
        }}
      >
        <DialogTitle variant="h4">Create Event</DialogTitle>
        <DialogContent>
          <Grid2 container direction={'row'} spacing={3}>
            <Grid2 xs={12}>
              <TextInput
                label="Name"
                name="name"
                placeholder="Enter event's name"
                value={form.name || ''}
                onChange={e => handleChangeForm(e)}
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextInput
                label="Location"
                name="location"
                placeholder="Enter event's location"
                value={form.location || ''}
                onChange={e => handleChangeForm(e)}
              />
            </Grid2>
            {new Array(3).fill('').map((_, index) => (
              <Grid2 xs={4} key={`date-picker-${index}`}>
                <DateInput
                  label={`Date ${index + 1}`}
                  value={form.dates![index]}
                  onChange={value => updateDateAtIndex(index, value.format('YYYY-MM-DD'))}
                />
              </Grid2>
            ))}
            <Grid2 xs={12}>
              <MultiSelectInput
                label="Vendors"
                placeholder="Select tagged vendors"
                // value={form.vendors!.map(val => val.toString())}
                options={vendors}
                onChange={value =>
                  setForm(prevState => {
                    return {
                      ...prevState,
                      vendors: value
                        .filter(stringVal => stringVal != '')
                        .map(stringVal => parseInt(stringVal, 10)),
                    }
                  })
                }
              />
            </Grid2>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={() => onClose(id)}>
            Cancel
          </Button>
          <Button
            disabled={!conditionSubmit}
            variant="contained"
            color="primary"
            onClick={onSubmit}
            autoFocus
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateEventModal
