import { Box, Drawer } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import BreadcrumbsPath from './BreadcrumbsPath'
import Header from './Header'
import Sidebar from './Sidebar'

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)
  const toggleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen)
  }
  return (
    <Grid2
      columns={16}
      container
      direction={'row'}
      justifyContent={'flex-end'}
      maxHeight={'100vh'}
      maxWidth={'100vw'}
    >
      <Grid2 sm={16} md={16} xl={16}>
        <Header toggleDrawer={toggleSidebarOpen} />
      </Grid2>
      <Grid2
        xs={0}
        sm={0}
        md={3}
        xl={2}
        display={{ xs: 'none', sm: 'none', md: 'flex' }}
        sx={{
          position: 'fixed',
          left: 0,
          height: '100vh',
        }}
      >
        <Drawer open={sidebarOpen} onClose={() => toggleSidebarOpen()}>
          <Sidebar toggleDrawer={toggleSidebarOpen} />
        </Drawer>
        <Sidebar />
      </Grid2>
      <Grid2 xs={16} sm={16} md={13} xl={14} marginTop={'72px'}>
        <Box padding={'32px'}>
          <BreadcrumbsPath />
          <Outlet />
        </Box>
      </Grid2>
    </Grid2>
  )
}

export default MainLayout
