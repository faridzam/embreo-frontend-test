import { colors } from '@/constants/colors'
import { setPage, setRowsPerPage } from '@/libs/redux/features/events/eventSlice'
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks'
import { RootState } from '@/libs/redux/store'
import { Description, Edit } from '@mui/icons-material'
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Fragment } from 'react/jsx-runtime'
import useEvent from '../_hooks/useEvent.hook'

interface Column {
  id: 'id' | 'company' | 'name' | 'location' | 'dates' | 'vendors' | 'created_at' | 'action';
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 30, align: 'center' },
  { id: 'company', label: 'Company', minWidth: 100, align: 'left' },
  { id: 'name', label: 'Name', minWidth: 170, align: 'left' },
  { id: 'location', label: 'Location', minWidth: 100, align: 'left' },
  { id: 'dates', label: 'Proposed Dates', minWidth: 100, align: 'left' },
  { id: 'vendors', label: 'Vendors', minWidth: 100, align: 'left' },
  { id: 'created_at', label: 'Created At', minWidth: 100, align: 'left' },
  { id: 'action', label: 'Action', minWidth: 120, align: 'left' },
]

const EventTable = () => {
  const dispatch = useAppDispatch()

  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const {
    handleOpenModal,
  } = useEvent()

  const events = useAppSelector((state: RootState) => state.event.events)
  const page = useAppSelector((state: RootState) => state.event.page)
  const rowsPerPage = useAppSelector((state: RootState) => state.event.rowsPerPage)

  const handleChangePage = (_: unknown, newPage: number) => {
    dispatch(setPage(newPage))
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRowsPerPage(+event.target.value))
    dispatch(setPage(0))
  }

  return (
    <>
      <Paper
        sx={{
          height: '70vh',
          minHeight: '250px',
          maxHeight: '980px',
          overflow: 'hidden',
          padding: '0 !important',
        }}
      >
        <TableContainer sx={{ height: '70vh', minHeight: '250px', maxHeight: '1154px' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    sx={
                      column.id === 'action' && !smallScreen
                        ? {
                            minWidth: column.minWidth,
                            position: 'sticky',
                            right: 0,
                            background: colors.secondary.dark,
                            zIndex: '999 !important',
                          }
                        : {
                            minWidth: column.minWidth,
                            background: colors.secondary.light,
                          }
                    }
                  >
                    <Typography variant="subtitle2" color={colors.black.main}>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {events
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(row => {
                  return (
                    <Fragment key={`user-${row.id}`}>
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        data-testid={`user-row-${row.id}`}
                      >
                        <TableCell align={'center'}>
                          <Typography variant="body2">{row.id}</Typography>
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{row.company.name}</Typography>
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{row.name}</Typography>
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{row.location}</Typography>
                        </TableCell>
                        <TableCell align={'left'}>
                          {
                            row.dates.map((date) => (
                              <Typography variant="body2">{Date.parse(date)}</Typography>
                            ))
                          }
                        </TableCell>
                        <TableCell align={'left'}>
                          {
                            row.vendors.map((vendor) => (
                              <Typography variant="body2">{vendor.name}</Typography>
                            ))
                          }
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">{Date.parse(row.created_at).toLocaleString('id')}</Typography>
                        </TableCell>
                        <TableCell
                          align={'left'}
                          sx={
                            !smallScreen
                              ? {
                                  position: 'sticky',
                                  right: 0,
                                  background: colors.secondary.light,
                                  zIndex: '998 !important',
                                }
                              : {}
                          }
                        >
                          <IconButton
                            data-testid={`detail-user-button-${row.id}`}
                            onClick={() => handleOpenModal(`modal-detail-${row.id}`)}
                          >
                            <Description />
                          </IconButton>
                          <IconButton
                            data-testid={`update-user-button-${row.id}`}
                            onClick={() => handleOpenModal(`modal-update-${row.id}`)}
                          >
                            <Edit />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </Fragment>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={events.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  )
}

export default EventTable