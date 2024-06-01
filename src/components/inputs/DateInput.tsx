import { colors } from '@/constants/colors';
import { CalendarMonth } from '@mui/icons-material';
import {
  Box,
  Button,
  InputBase,
  InputBaseProps,
  TextFieldProps,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

type IDateInputProps = {
  placeholder?: string;
  label?: string;
  value: string | null;
  onChange: (value: Dayjs) => void;
  isDisabled?: boolean;
  isOptional?: boolean;
};

export default function DateInput({
  placeholder = '',
  label = '',
  value,
  onChange,
  isDisabled = false,
  isOptional = false,
}: IDateInputProps) {
  const [calendarOpen, setCalendarOpen] = React.useState<boolean>(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    e.preventDefault();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          marginBottom: '8px',
        }}
      >
        <Typography
          sx={{
            display: 'inline',
          }}
        >
          {label}{' '}
          {isOptional ? (
            <Typography sx={{ display: 'inline', color: colors.black.light }} variant='body1'>
              (optional)
            </Typography>
          ) : null}
        </Typography>
      </Box>
      <DatePicker
        minDate={dayjs(new Date)}
        disabled={isDisabled}
        open={calendarOpen && !isDisabled}
        onClose={() => {
          setCalendarOpen(false);
        }}
        value={dayjs(value)}
        onChange={(value: Dayjs | null) => onChange(dayjs(value))}
        sx={{
          position: 'relative',
        }}
        slots={{textField: (params: TextFieldProps) => (
          <InputBase
            {...(params as InputBaseProps)}
            placeholder={placeholder}
            disabled={isDisabled}
            onClick={() => setCalendarOpen(!calendarOpen)}
            onKeyDown={onKeyDown}
            fullWidth
            size="small"
            inputProps={{
              ...params.inputProps,
              placeholder: placeholder || 'DD/MM/YYYY',
            }}
            endAdornment={
              <Button
                disabled={isDisabled}
                onClick={() => setCalendarOpen(!calendarOpen)}
                sx={{ margin: '0', padding: '0' }}
              >
                <CalendarMonth sx={{ color: '#929393' }} />
              </Button>
            }
            sx={{
              backgroundColor: isDisabled ? colors.white.main : '#F8F9F9',
              paddingLeft: '8px',
              paddingTop: '8px',
              paddingBottom: '4px',
              borderRadius: '8px',
            }}
          />
        )}}
        slotProps={{
          popper: {
            sx: {
              position: 'relative',
              width: '100vw !important',
              height: '100vh !important',
              zIndex: '10000 !important',
              backgroundColor: 'none',
            }
          },
          desktopPaper: {
            sx: {
              position: 'absolute',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: 'auto',
              marginBottom: 'auto',
              left: '0',
              right: '0',
              top: '0',
              bottom: '0',
              width: '600px',
              height: '400px',
              backgroundColor: 'white',
              border: `1px solid ${colors.white.dark}`,
              borderRadius: '8px',
            }
          },
          
        }}
      />
    </LocalizationProvider>
  );
}
