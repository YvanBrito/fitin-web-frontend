'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { LoginFormValues } from '.'

export type FormState = {
  type: 'success' | 'error'
  message: string
  fields?: LoginFormValues
}

export const submitLogin = async (
  prevState: FormState,
  data: FormData,
): Promise<FormState> => {
  const { username, password } = Object.fromEntries(data)

  try {
    const res = await fetch(process.env.ROOT_URL + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    const json = await res.json()

    if (!res.ok) {
      return {
        type: 'error',
        message: json.message,
        fields: {
          username: username.toString(),
          password: password.toString(),
        },
      }
    }
    cookies().set('Authorization', json.access_token, {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
      path: '/',
      sameSite: 'strict',
    })
    return {
      type: 'success',
      message: json.message,
      fields: { username: username.toString(), password: password.toString() },
    }
  } catch (e: unknown) {
    const error = e as Error
    return {
      type: 'error',
      message: error.message,
      fields: { username: username.toString(), password: password.toString() },
    }
  }
}

export const submitLogout = () => {
  cookies().set('Authorization', '', {
    expires: new Date(0),
  })
  redirect('/')
}
