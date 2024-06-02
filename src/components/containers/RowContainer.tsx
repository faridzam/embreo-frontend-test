import { Grid, GridProps } from '@mui/material'

export default function RowContainer(params: GridProps) {
  const {
    container = true,
    direction = 'row',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    gap = '16px',
    children,
    ...props
  } = params
  return (
    <Grid
      {...props}
      container={container}
      flexDirection={direction}
      display={'flex'}
      gap={gap}
      alignItems={alignItems}
      justifyContent={justifyContent}
    >
      {children}
    </Grid>
  )
}
