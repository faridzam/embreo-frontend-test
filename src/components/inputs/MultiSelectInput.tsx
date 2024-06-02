import { Company } from '@/types/events'
import { InputBase, Typography } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useState } from 'react'

interface IMultiSelectProps {
  label?: string
  placeholder?: string
  // value: string[]
  options: Company[]
  onChange: (val: string[]) => void
}

export default function MultiSelectInput(params: IMultiSelectProps) {
  const { label = '', placeholder = '', options, onChange } = params
  const [selected, setSelected] = useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof selected>) => {
    const val = event.target.value

    setSelected(typeof val === 'string' ? val.split(',') : val)
    onChange(typeof val === 'string' ? val.split(',') : val)
  }

  return (
    <FormControl fullWidth>
      <Typography variant="body1">{label}</Typography>
      <Select
        placeholder={placeholder}
        multiple
        // value={value.map((value) => value.toString())}
        value={selected}
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
        renderValue={selected =>
          options
            .map(option => (selected.includes(option.id.toString()) ? option.name : null))
            .filter(val => val)
            .join(', ')
        }
        MenuProps={{
          sx: {
            zIndex: '10000 !important',
          },
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
        {options.map(option => (
          <MenuItem key={`option-${option.id}`} value={option.id.toString()}>
            <Checkbox checked={selected.indexOf(option.id.toString()) > -1} />
            <ListItemText primary={option.name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
