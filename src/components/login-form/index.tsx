'use client'
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { LoadingButton } from '@mui/lab'
import { useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { loginSchema } from '@/src/schemas/login-schema'
import { submitLogin } from './loginAction'
import { SubmitBtn } from '../submit-btn'

export interface LoginFormValues {
  username: string
  password: string
}

export default function LoginForm() {
  const [state, formAction] = useFormState(submitLogin, { message: '' })
  const {
    control,
    formState: { errors },
    trigger,
  } = useForm<LoginFormValues>({
    resolver: joiResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      ...(state?.fields ?? {}),
    },
  })

  const formRef = useRef<HTMLFormElement>(null)

  return (
    <Container maxWidth="xs" className="mb-40">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
        component="form"
        ref={formRef}
        action={(data) => {
          const isError = loginSchema.validate(Object.fromEntries(data))?.error
          trigger()
          if (!isError) formAction(data)
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome de Usuário*"
                variant="outlined"
                fullWidth
              />
            )}
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Senha*"
                type="password"
                variant="outlined"
                fullWidth
              />
            )}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </Box>
        {state?.message !== '' && (
          <div className="text-red-500">{state.message}</div>
        )}
        <SubmitBtn label="ENTRAR" />
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Esqueci a senha
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              {'Criar conta'}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}
