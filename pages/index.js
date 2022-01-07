import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SeeDetails from '../facebook/index'
import FACEBOOK_PIXEL from '../facebook/pixel'


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trusted store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <FACEBOOK_PIXEL/>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hello in Trusted store.
        </h1>
        <h1>
          Only today we offering a free products!!
        </h1>

       <SeeDetails/>
        
        </main>
    </div>
  )
}
