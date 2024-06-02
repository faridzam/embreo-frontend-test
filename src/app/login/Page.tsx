import ColumnContainer from '@/components/containers/ColumnContainer'
import { Button, Container, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import useLogin from './hooks/useLogin.hooks'

const Login: React.FC = () => {
  const { usernameRef, passwordRef, handleSubmit } = useLogin()

  return (
    <ColumnContainer
      height={'80vh'}
      alignItems={'center'}
      justifyContent={'center'}
      data-testid="login_page_container"
    >
      <Container component="main" maxWidth="xs">
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5">Login</Typography>
          <TextField
            inputRef={usernameRef}
            label="Username"
            variant="outlined"
            margin="normal"
            fullWidth
            data-testid="text_field_username"
          />
          <TextField
            inputRef={passwordRef}
            label="Password"
            variant="outlined"
            margin="normal"
            fullWidth
            type="password"
            data-testid="text_field_password"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ marginTop: 2 }}
            data-testid="login_button"
          >
            Login
          </Button>
        </Paper>
      </Container>
    </ColumnContainer>
  )
}

export default Login
