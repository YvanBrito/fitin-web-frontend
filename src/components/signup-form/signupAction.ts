'use server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { SignUpFormValues } from '.'

export type FormState = {
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
  const json = await res.json()

  if (res.ok) {
    cookies().set('Authorization', 'token', {
      secure: true,
      httpOnly: true,
      expires: Date.now() + 24 * 60 * 60 * 1000 * 3,
      path: '/',
      sameSite: 'strict',
    })
    redirect('/app')
  } else {
    return {
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
}

export const submitLogout = () => {
  cookies().set('Authorization', '', {
    expires: new Date(0),
  })
  redirect('/')
}
