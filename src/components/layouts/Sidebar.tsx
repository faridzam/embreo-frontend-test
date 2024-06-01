import { colors } from '@/constants/colors'
import { CalendarMonth } from '@mui/icons-material'
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'

interface ISidebarProps {
  toggleDrawer?: (val: boolean) => void
}

const Sidebar = (props: ISidebarProps) => {
  const { toggleDrawer = () => {} } = props
  return (
    <Box
      role="presentation"
      onClick={() => toggleDrawer(false)}
      sx={{
        height: '100%',
        width: '100%',
        minWidth: '250px',
        paddingTop: '104px',
        zIndex: '10000 !important',
      }}
    >
      <Box
        position={'absolute'}
        width={'100%'}
        height={'100%'}
        top={0}
        left={0}
        sx={{
          background: colors.secondary.light,
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          opacity: '0.2',
          backdropFilter: 'blur(8px)',
          outline: '1px solid rgba(255, 255, 255, 0.3)',
        }}
      />
      <List>
        {['Events'].map(text => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ color: `${colors.primary.light} !important` }}>
                <CalendarMonth />
              </ListItemIcon>
              <ListItemText>
                <Typography color={colors.primary.light} variant="h6">
                  {text}
                </Typography>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
