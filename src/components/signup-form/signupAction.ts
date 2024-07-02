'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { SignUpFormValues } from '.'

export type FormState = {
  type: 'success' | 'error'
  message: string
  fields?: SignUpFormValues
}

export const submitSignup = async (
  prevState: FormState,
  data: FormData,
): Promise<FormState> => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const {
    username,
    password,
    passwordrepeat,
    name,
    birthdate,
    document,
    phone,
  } = Object.fromEntries(data)

  if (password !== passwordrepeat)
    return {
      type: 'error',
      message: 'As senhas estão diferentes',
      fields: {
        username: username.toString(),
        password: password.toString(),
        passwordrepeat: passwordrepeat.toString(),
        name: name.toString(),
        birthdate: birthdate.toString(),
        document: document.toString(),
        phone: phone.toString(),
      },
    }
  try {
    const res = await fetch(process.env.ROOT_URL + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        name,
        birthdate: birthdate.toString().split('/').reverse().join('-'),
        document,
        phone,
      }),
    })

    if (!res.ok) {
      const json = await res.json()
      return {
        type: 'error',
        message: json.message,
        fields: {
          username: username.toString(),
          password: password.toString(),
          passwordrepeat: passwordrepeat.toString(),
          name: name.toString(),
          birthdate: birthdate.toString(),
          document: document.toString(),
          phone: phone.toString(),
        },
      }
    }
  } catch (e: unknown) {
    const error = e as Error
    return {
      type: 'error',
      message: error.message,
      fields: {
        username: username.toString(),
        password: password.toString(),
        passwordrepeat: passwordrepeat.toString(),
        name: name.toString(),
        birthdate: birthdate.toString(),
        document: document.toString(),
        phone: phone.toString(),
      },
    }
  }

  return {
    type: 'success',
    message: 'Conta cadastrada com sucesso!',
    fields: {
      username: username.toString(),
      password: password.toString(),
      passwordrepeat: passwordrepeat.toString(),
      name: name.toString(),
      birthdate: birthdate.toString(),
      document: document.toString(),
      phone: phone.toString(),
    },
  }
}

export const submitLogout = () => {
  cookies().set('Authorization', '', {
    expires: new Date(0),
  })
  redirect('/')
}
