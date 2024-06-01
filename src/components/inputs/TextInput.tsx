import { colors } from '@/constants/colors'
import { FormControl, FormHelperText, InputBase, Typography } from '@mui/material'
import { ChangeEvent, HTMLInputTypeAttribute } from 'react'

interface ITextInputProps {
  name?: string
  type?: HTMLInputTypeAttribute
  label: string
  placeholder?: string
  errorHintText?: string
  hintText?: string
  disabled?: boolean
  error?: boolean
  limitChar?: number
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const TextInput = (props: ITextInputProps) => {
  const {
    name = '',
    type = 'text',
    label,
    placeholder = '',
    errorHintText,
    hintText,
    error = false,
    disabled = false,
    limitChar,
    value,
    onChange,
  } = props

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange(e)
  }

  return (
    <FormControl fullWidth>
      <Typography component={'span'} variant="body1">
        {label}
      </Typography>
      <InputBase
        type={type}
        name={name}
        disabled={disabled}
        value={value}
        onChange={e => handleChangeValue(e)}
        inputProps={{
          maxLength: limitChar || '',
        }}
        sx={{
          backgroundColor: disabled ? colors.white.main : '#F8F9F9',
          marginTop: '4px',
          paddingX: '12px',
          paddingTop: '8px',
          paddingBottom: '4px',
          borderRadius: '8px',
        }}
        size="small"
        placeholder={placeholder}
      />
      <FormHelperText
        id="helper-text"
        sx={{
          margin: '6px 0 0 0',
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 500,
          color: error ? colors.error.main : colors.white.dark,
        }}
      >
        {error ? errorHintText : hintText}
      </FormHelperText>
    </FormControl>
  )
}

export default TextInput
