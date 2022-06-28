import { HeaderSignInButton } from '../HeaderSignInButton'
import styles from './styles.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerCtn}>
        <div className={styles.headerCtnLf}>
          <img src="/images/logo.svg" alt="" />
          <nav>
            <ul>
              <li>
                <a href="">Home</a>
              </li>
              <li>
                <a href="">Post</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.headerCtnRt}>
          <HeaderSignInButton />
        </div>
      </div>
    </header>
  )
}