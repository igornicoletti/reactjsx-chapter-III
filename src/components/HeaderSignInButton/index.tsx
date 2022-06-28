import { signIn, signOut, useSession } from 'next-auth/react'
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import styles from './styles.module.scss'

export function HeaderSignInButton() {
  const { data: session } = useSession()

  return session ? (
    <button
      type="button"
      onClick={() => signOut()}
      className={styles.headerSignInButtonTrue}>
      <FaGithub />
      <span>{session.user?.name}</span>
      <FiX />
    </button>
  ) : (
    <button
      type="button"
      onClick={() => signIn('github')}
      className={styles.headerSignInButtonFalse}>
      <FaGithub />
      <span>Sign in with Github</span>
    </button>
  )
}