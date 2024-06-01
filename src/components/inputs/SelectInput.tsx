import { InputBase, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ISelectInputProps {
  label?: string;
  placeholder?: string;
  options: string[];
  onChange: (val: string) => void;
}

export default function SelectInput(params: ISelectInputProps) {
  const {
    label = "", placeholder = "", options, onChange
  } = params

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value)
  };

  return (
    <FormControl fullWidth>
      <Typography variant='body1'>{label}</Typography>
      <Select
        placeholder={placeholder}
        onChange={handleChange}
        input={
          <InputBase
            sx={{
              marginTop: '4px',
              paddingX: '12px',
              paddingTop: '8px',
              paddingBottom: '4px',
              borderRadius: '8px',
            }}
            size="small"
          />
        }
        MenuProps={{
          sx:{
            zIndex: '10000 !important'
          }
        }}
        sx={{
          backgroundColor: '#F8F9F9',
          marginTop: '8px',
          paddingX: '12px',
          paddingTop: '8px',
          paddingBottom: '4px',
          borderRadius: '8px',
        }}
      >
        {options.map((option) => (
          <MenuItem key={`option-${option}`} value={option.toString()}>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
