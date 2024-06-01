import CircleImage from '@/components/images/CircleImage'
import { colors } from '@/constants/colors'
import { initialEvent } from '@/constants/event'
import { Event } from '@/types/events'
import { Close } from '@mui/icons-material'
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'

interface IUserDetailModalProps {
  id: string
  open: boolean | undefined
  data?: Event
  onClose: (id: string) => void
  [key: string]: any
}

const UserDetailModal = (props: IUserDetailModalProps) => {
  const { id, open, data = initialEvent, onClose, ...restProps } = props

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Dialog
      {...restProps}
      id={id}
      fullScreen={fullScreen}
      open={open || false}
      onClose={onClose}
      sx={{
        zIndex: '10000',
      }}
      PaperProps={{
        sx: {
          backgroundImage: `linear-gradient(45deg, ${colors.secondary.dark}, ${colors.white.main})`,
        },
      }}
    >
      <Box
        position={'absolute'}
        top={{ xs: 32, sm: 32, md: 16 }}
        right={{ xs: 32, sm: 32, md: 16 }}
      >
        <IconButton onClick={() => onClose(id)}>
          <Close sx={{ fontSize: '32px' }} />
        </IconButton>
      </Box>
      <DialogContent>
        <Grid2
          container
          direction={'row'}
          spacing={0}
          columns={16}
          minWidth={{ md: '500px' }}
        >
          <Grid2 xs={16} display={'flex'} justifyContent={'center'} height={140}>
            <CircleImage
              src={`https://picsum.photos/id/${data.id}/140.webp`}
              alt={`photo-${data.id}`}
              size="140px"
            />
          </Grid2>
          <Grid2 xs={16} display={'flex'} justifyContent={'center'} marginTop={'24px'}>
            <Typography variant="h4">{data.name}</Typography>
          </Grid2>
          <Grid2
            xs={16}
            container
            columns={16}
            component={Box}
            position={'relative'}
            display={'flex'}
            marginTop={'16px'}
            width={'100%'}
            borderRadius={'16px'}
            overflow={'hidden'}
          >
            <Box
              position={'absolute'}
              width={'100%'}
              height={'100%'}
              top={0}
              left={0}
              sx={{
                background: colors.white.light,
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                opacity: '0.2',
                backdropFilter: 'blur(5px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}
            />
            <Grid2
              xs={8}
              component={Box}
              padding={'32px 32px'}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
              gap={'16px'}
              zIndex={999}
            >
              <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                <Typography variant="body2">Username</Typography>
                {/* <Typography variant="subtitle2">{data.username}</Typography> */}
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                <Typography variant="body2" color={colors.black.light}>
                  Phone
                </Typography>
                {/* <Typography variant="subtitle2">{data.phone}</Typography> */}
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                <Typography variant="body2" color={colors.black.light}>
                  Address
                </Typography>
                {/* <Typography variant="subtitle2" paragraph>{`
                  ${data.address.street}, ${data.address.suite}
                  ${data.address.city}, ${data.address.zipcode}
                `}</Typography> */}
              </Box>
            </Grid2>
            <Grid2
              xs={8}
              component={Box}
              padding={'32px 32px'}
              display={'flex'}
              flexDirection={'column'}
              alignItems={'flex-start'}
              justifyContent={'flex-start'}
              gap={'16px'}
              zIndex={999}
            >
              <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                <Typography variant="body2" color={colors.black.light}>
                  Email
                </Typography>
                {/* <Typography variant="subtitle2">{data.email}</Typography> */}
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                <Typography variant="body2" color={colors.black.light}>
                  Website
                </Typography>
                {/* <Typography variant="subtitle2">{data.website}</Typography> */}
              </Box>
              <Box display={'flex'} flexDirection={'column'} gap={'8px'}>
                <Typography variant="body2" color={colors.black.light}>
                  Company
                </Typography>
                <Typography variant="subtitle2">{data.company.name}</Typography>
              </Box>
            </Grid2>
          </Grid2>
        </Grid2>
      </DialogContent>
    </Dialog>
  )
}

export default UserDetailModal
