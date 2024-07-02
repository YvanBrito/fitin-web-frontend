'use client'
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  TextField,
  Typography,
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Controller, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { signUpSchema } from '@/src/schemas/signup-schema'
import { submitSignup } from './signupAction'
import { useFormState } from 'react-dom'
import { useEffect, useRef } from 'react'
import InputMask from 'react-input-mask'
import { SubmitBtn } from '../submit-btn'
import { showToast } from '@/src/utils/show-toast'
import { useRouter } from 'next/navigation'

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
  const router = useRouter()
  const [state, formAction] = useFormState(submitSignup, {
    type: 'error',
    message: '',
  })
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

  useEffect(() => {
    if (state.message) showToast(state.type, <p>{state.message}</p>)
    if (state.type === 'success') router.push('/signin')
  }, [router, state])

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
        action={async (data) => {
          const isError = signUpSchema.validate(Object.fromEntries(data))?.error
          trigger()
          if (!isError) await formAction(data)
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
        <SubmitBtn label="CRIAR CONTA" />
      </Box>
    </Container>
  )
}
