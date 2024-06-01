import { Grid, GridProps } from "@mui/material";

export default function ColumnContainer(params:GridProps) {
  const {
    container = true,
    direction = 'column',
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    children,
    gap = '16px',
    ...props
  } = params;
  return(
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
  );
}