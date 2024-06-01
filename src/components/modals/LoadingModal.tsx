import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { SyntheticEvent } from 'react'

const LoadingModal = () => {
  const handleDlgClose = (_event: SyntheticEvent<Element, Event>, reason: string) => {
    if (reason && reason == 'backdropClick') {
      return
    }
  }

  return (
    <Dialog
      open={true}
      disableEscapeKeyDown
      onClose={(event: SyntheticEvent<Element, Event>, reason) =>
        handleDlgClose(event, reason)
      }
      PaperProps={{
        style: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <DialogContent>
        <CircularProgress />
      </DialogContent>
      <DialogTitle>Loading...</DialogTitle>
    </Dialog>
  )
}

export default LoadingModal
