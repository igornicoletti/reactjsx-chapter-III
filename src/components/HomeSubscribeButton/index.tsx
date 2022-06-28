import { signIn, useSession } from 'next-auth/react'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'

type HumeSubscribeButtonProps = {
  priceId: string
}

export function HomeSubscribeButton({ priceId }: HumeSubscribeButtonProps) {
  const { data: session } = useSession()

  async function handleHomeSubscribeButton() {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data
      const stripe = await getStripeJs()
      await stripe?.redirectToCheckout({ sessionId })
    } catch (err) {
      err instanceof Error ? alert(err.message) : alert(err)
    }
  }

  return (
    <button
      type="button"
      onClick={handleHomeSubscribeButton}
      className={styles.homeSubscribeButton}>
      Subscribe now
    </button>
  )
}