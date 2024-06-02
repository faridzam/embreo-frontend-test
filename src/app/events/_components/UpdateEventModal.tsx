import SelectInput from '@/components/inputs/SelectInput'
import TextInput from '@/components/inputs/TextInput'
import store from '@/libs/redux/store'
import { Event, UpdateEvent } from '@/types/events'
import { setNestedState } from '@/utils/stateHelper'
import { capitalizeFirstLetter } from '@/utils/strings'
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
import dayjs from 'dayjs'
import { ChangeEvent, useState } from 'react'

interface IUpdateEventModalProps {
  id: string
  type: 'approve' | 'reject'
  open: boolean | undefined
  data: Event
  onClose: (id: string) => void
  onApprove?: (data: UpdateEvent) => void
  onReject?: (data: UpdateEvent) => void
  [key: string]: any
}

const UpdateEventModal = (props: IUpdateEventModalProps) => {
  const {
    id,
    type,
    open,
    data,
    onClose,
    onApprove = () => {},
    onReject = () => {},
    ...restProps
  } = props

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const onSubmit = () => {
    switch (type) {
      case 'approve':
        onApprove(form)
        break

      case 'reject':
        onReject(form)
        break

      default:
        break
    }
  }

  const [form, setForm] = useState<UpdateEvent>({
    event_id: data.id,
    remarks: '',
  })

  const handleChangeForm = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    const keys = name.split('.')

    setForm((prevState: UpdateEvent) => setNestedState(prevState, keys, value))
  }

  const conditionSubmit = form.remarks && form.remarks.length > 0 && form.remarks !== ''

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
        <DialogTitle variant="h4">{`${capitalizeFirstLetter(type)} Event ${data.name}`}</DialogTitle>
        <DialogContent>
          <Grid2 container direction={'row'} spacing={3}>
            <Grid2 xs={12}>
              {type === 'reject' && (
                <TextInput
                  label="Remarks"
                  name="remarks"
                  placeholder="Enter event's remark"
                  value={form.remarks || ''}
                  onChange={e => handleChangeForm(e)}
                />
              )}
            </Grid2>
            <Grid2 xs={12}>
              {type === 'approve' && (
                <SelectInput
                  label="Date"
                  placeholder="Select approved date"
                  options={data.dates.map(date => dayjs(date).format('YYYY-MM-DD'))}
                  onChange={val =>
                    setForm(prevState => ({
                      ...prevState,
                      remarks: `approved by ${store.getState().auth.company.name} on ${val}`,
                    }))
                  }
                />
              )}
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

export default UpdateEventModal
