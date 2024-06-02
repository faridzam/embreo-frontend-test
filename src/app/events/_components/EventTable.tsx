import RowContainer from '@/components/containers/RowContainer'
import { colors } from '@/constants/colors'
import { setPage, setRowsPerPage } from '@/libs/redux/features/events/eventSlice'
import { useAppDispatch, useAppSelector } from '@/libs/redux/hooks'
import store, { RootState } from '@/libs/redux/store'
import { Check, Close, InfoOutlined } from '@mui/icons-material'
import {
  Fab,
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
import dayjs from 'dayjs'
import { Fragment } from 'react/jsx-runtime'
import useEvent from '../_hooks/useEvent.hook'
import EventDetailModal from './EventDetailModal'
import UpdateEventModal from './UpdateEventModal'

interface Column {
  id:
    | 'id'
    | 'company'
    | 'name'
    | 'location'
    | 'dates'
    | 'vendors'
    | 'remarks'
    | 'created_at'
    | 'action'
  label: string
  minWidth?: number
  align?: 'right' | 'left' | 'center'
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 30, align: 'center' },
  { id: 'company', label: 'Company', minWidth: 70, align: 'left' },
  { id: 'name', label: 'Name', minWidth: 100, align: 'left' },
  { id: 'location', label: 'Location', minWidth: 100, align: 'left' },
  { id: 'dates', label: 'Proposed Dates', minWidth: 70, align: 'left' },
  { id: 'vendors', label: 'Tagged Vendors', minWidth: 70, align: 'left' },
  { id: 'remarks', label: 'Remarks', minWidth: 100, align: 'left' },
  { id: 'created_at', label: 'Created At', minWidth: 100, align: 'left' },
  { id: 'action', label: 'Action', minWidth: 100, align: 'left' },
]

const EventTable = () => {
  const dispatch = useAppDispatch()

  const theme = useTheme()
  const smallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const {
    modalOpen,
    handleOpenModal,
    handleCloseModal,
    handleApproveEvent,
    handleRejectEvent,
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
                    <Fragment key={`event-${row.id}`}>
                      {store.getState().auth.role.id === 2 && (
                        <>
                          <UpdateEventModal
                            data-testid={`modal-update-approve-${row.id}`}
                            id={`modal-update-approve-${row.id}`}
                            type="approve"
                            data={row}
                            open={modalOpen[`modal-update-approve-${row.id}`] === true}
                            onClose={() =>
                              handleCloseModal(`modal-update-approve-${row.id}`)
                            }
                            onApprove={data => handleApproveEvent(data)}
                          />
                          <UpdateEventModal
                            data-testid={`modal-update-reject-${row.id}`}
                            id={`modal-update-reject-${row.id}`}
                            type="reject"
                            data={row}
                            open={modalOpen[`modal-update-reject-${row.id}`] === true}
                            onClose={() =>
                              handleCloseModal(`modal-update-reject-${row.id}`)
                            }
                            onReject={data => handleRejectEvent(data)}
                          />
                        </>
                      )}
                      <EventDetailModal
                        data-testid={`modal-detail-${row.id}`}
                        id={`modal-detail-${row.id}`}
                        open={modalOpen[`modal-detail-${row.id}`] === true}
                        data={row}
                        onClose={handleCloseModal}
                      />
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        data-testid={`event-row-${row.id}`}
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
                          {row.dates.map(date => (
                            <Typography variant="body2" key={`date-${date}`}>
                              - {dayjs(date).format('YYYY-MM-DD')}
                            </Typography>
                          ))}
                        </TableCell>
                        <TableCell align={'left'}>
                          {row.vendors.map(vendor => (
                            <RowContainer alignItems={'center'}>
                              <Typography
                                key={`vendor-name-${vendor.name}`}
                                variant="body2"
                              >
                                - {vendor.name}
                              </Typography>
                              {vendor.status === 'approved' && (
                                <Check sx={{ color: colors.success.main }} />
                              )}
                              {vendor.status === 'rejected' && (
                                <Close sx={{ color: colors.error.main }} />
                              )}
                            </RowContainer>
                          ))}
                        </TableCell>
                        <TableCell align={'left'}>
                          {row.vendors.map(vendor => (
                            <Typography
                              variant="body2"
                              key={`vendor-remarks-${vendor.name}`}
                            >
                              {vendor.remarks}
                            </Typography>
                          ))}
                        </TableCell>
                        <TableCell align={'left'}>
                          <Typography variant="body2">
                            {dayjs(row.created_at).format('YYYY-MM-DD')}
                          </Typography>
                        </TableCell>
                        <TableCell
                          align={'center'}
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
                          <Fab
                            size="small"
                            color="info"
                            sx={{ marginX: '4px' }}
                            data-testid={`reject-event-button-${row.id}`}
                            onClick={() => handleOpenModal(`modal-detail-${row.id}`)}
                          >
                            <InfoOutlined sx={{ color: colors.white.light }} />
                          </Fab>
                          {store.getState().auth.role.id === 2 && (
                            <>
                              <Fab
                                size="small"
                                color="error"
                                sx={{ marginX: '4px' }}
                                data-testid={`reject-event-button-${row.id}`}
                                onClick={() =>
                                  handleOpenModal(`modal-update-reject-${row.id}`)
                                }
                              >
                                <Close sx={{ color: colors.white.light }} />
                              </Fab>
                              <Fab
                                size="small"
                                color="success"
                                sx={{ marginX: '4px' }}
                                data-testid={`approve-event-button-${row.id}`}
                                onClick={() =>
                                  handleOpenModal(`modal-update-approve-${row.id}`)
                                }
                              >
                                <Check sx={{ color: colors.white.light }} />
                              </Fab>
                            </>
                          )}
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
