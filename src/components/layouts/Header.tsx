import Logo from '@/assets/images/logo/logo.svg'
import { colors } from '@/constants/colors'
import { MenuRounded, Notifications } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import CircleImage from '../images/CircleImage'

interface IHeaderProps {
  toggleDrawer: (val: boolean) => void
}

const Header = (props: IHeaderProps) => {
  const { toggleDrawer } = props
  return (
    <Grid2
      container
      direction={'row'}
      columns={16}
      padding={'16px 24px'}
      width={'100vw'}
      alignItems={'center'}
      position={'fixed'}
      sx={{
        backgroundColor: colors.secondary.dark,
        zIndex: '9999',
      }}
    >
      <Grid2 xs={13} md={12} xl={12}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'}>
          <Box display={{ sx: 'flex', sm: 'flex', md: 'none' }}>
            <IconButton onClick={() => toggleDrawer(true)}>
              <MenuRounded sx={{ color: colors.white.light, fontSize: '32px' }} />
            </IconButton>
          </Box>
          <img src={Logo} alt="logo_blue" width={40} />
          <Typography color={colors.white.light} variant="h6">
            Logo
          </Typography>
        </Box>
      </Grid2>
      <Grid2 xs={3} md={4} xl={4}>
        <Box display={'flex'} justifyContent={'flex-end'} gap={'16px'}>
          <IconButton>
            <Notifications sx={{ color: colors.white.light, fontSize: '32px' }} />
          </IconButton>
          <CircleImage
            src="https://picsum.photos/40.webp"
            alt="account_avatar"
            size="40px"
          />
        </Box>
      </Grid2>
    </Grid2>
  )
}

export default Header
