import { cookies } from 'next/headers'
import Link from 'next/link'
import { submitLogout } from '../login-form/loginAction'

export default function Header() {
  const isLoggedIn = cookies().get('Authorization')

  return (
    <header className="flex justify-between shadow-md px-[10vw] py-3">
      <Link href="/">
        <span>FITIN</span>
      </Link>
      <nav>
        {isLoggedIn ? (
          <form action={submitLogout}>
            <button type="submit">Sair</button>
          </form>
        ) : (
          <Link href="/signin">Entrar</Link>
        )}
      </nav>
    </header>
  )
}
