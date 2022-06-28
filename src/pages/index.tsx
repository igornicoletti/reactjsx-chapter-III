import { GetStaticProps } from 'next'
import Head from 'next/head'
import { HomeSubscribeButton } from '../components/HomeSubscribeButton'
import { stripe } from '../services/stripe'
import styles from './styles.module.scss'

type HomeProps = {
  product: {
    priceId: string
    amount: number
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>ig.news | Home</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.mainCtn}>
          <div className={styles.mainCtnLf}>
            <span>Hey, Welcome</span>
            <h1>News about <br /> the <span>React</span> World</h1>
            <p>Get acess to all the publications <br /><span>for {product.amount} month</span></p>
            <HomeSubscribeButton priceId={product.priceId} />
          </div>
          <div className={styles.mainCtnRt}>
            <img src="/images/avatar.svg" alt="" />
          </div>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KpckmGrxmWHjWGKWwY8LGvR')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount! / 100)
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24 //24h
  }
}
