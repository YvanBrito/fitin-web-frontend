'use client'
import {
  Avatar,
  Box,
  Button,
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
import { signUpSchema } from '@/src/schemas/signup-schema'
import { submitSignup } from './signupAction'
import { useFormState } from 'react-dom'
import { useRef } from 'react'
import InputMask from 'react-input-mask'
import { SubmitBtn } from '../submit-btn'

export interface SignUpFormValues {
  username: string
  password: string
  passwordrepeat: string
  name: string
  birthdate: string
  document: string
  phone: string
}

export default function SignUpForm() {
  const [state, formAction] = useFormState(submitSignup, { message: '' })
  const {
    control,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormValues>({
    resolver: joiResolver(signUpSchema),
    defaultValues: {
      username: '',
      password: '',
      passwordrepeat: '',
      name: '',
      birthdate: '',
      document: '',
      phone: '',
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
          const isError = signUpSchema.validate(Object.fromEntries(data))?.error
          trigger()
          if (!isError) formAction(data)
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Criar conta
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
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome*"
                variant="outlined"
                fullWidth
              />
            )}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Controller
            name="birthdate"
            control={control}
            render={({ field }) => (
              <InputMask
                mask="99/99/9999"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={false}
                maskChar=" "
              >
                <TextField
                  {...field}
                  label="Data de Nascimento*"
                  variant="outlined"
                  fullWidth
                />
              </InputMask>
            )}
          />
          {errors.birthdate && (
            <p className="text-red-500">{errors.birthdate.message}</p>
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Controller
            name="document"
            control={control}
            render={({ field }) => (
              <InputMask
                mask="999.999.999-99"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={false}
                maskChar=" "
              >
                <TextField
                  {...field}
                  label="CPF*"
                  variant="outlined"
                  fullWidth
                />
              </InputMask>
            )}
          />
          {errors.document && (
            <p className="text-red-500">{errors.document.message}</p>
          )}
        </Box>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <InputMask
                mask="(99)99999 9999"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={false}
                maskChar=" "
              >
                <TextField
                  {...field}
                  label="Nº de Telefone*"
                  variant="outlined"
                  fullWidth
                />
              </InputMask>
            )}
          />
          {errors.phone && (
            <p className="text-red-500">{errors.phone.message}</p>
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
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Controller
            name="passwordrepeat"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Repetir Senha*"
                type="password"
                variant="outlined"
                fullWidth
              />
            )}
          />
          {errors.passwordrepeat && (
            <p className="text-red-500">{errors.passwordrepeat.message}</p>
          )}
        </Box>
        {state?.message !== '' && (
          <div className="text-red-500">{state.message}</div>
        )}
        <SubmitBtn label="CRIAR CONTA" />
      </Box>
    </Container>
  )
}
