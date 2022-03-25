import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import styles from '../styles/Home.module.css'



export default function Home() {

  return (
    <div className={styles.container}>
      
      <Head>
        <title>UC003: Order Capture – Fiber contract v7.00, Approach A (BFF)</title>
        <meta name="description" content="UC003: Order Capture – Fiber contract v7.00, Approach A (BFF) as Defined on IG1228" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {}
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://www.tmforum.org/resources/reference/ig1228-how-to-use-oda-using-open-apis-to-realize-use-cases-v7-0-0/" target="_blank">UC003: Order Capture – Fiber contract v7.00, Approach A (BFF)</a>
        </h1>

        <p className={styles.description}>
          As defined on {' '}
          <code className={styles.code}>TM Forum IG1228 v7.0.0</code>
        </p>

        <div className={styles.grid}>
          <a href="/userView/0nameAndPhone" className={styles.card}>
            <h2>Start &rarr;</h2>
            <p>Start Demo using configured components</p>
          </a>

          <a href="/configure" className={styles.card}>
            <h2>Configure &rarr;</h2>
            <p>Manually configure the endpoints for the Backend for Frontend (BFF)</p>
          </a>

          <a
            href="/healthcheck"
            className={styles.card}
          >
            <h2>Healthcheck &rarr;</h2>
            <p>Check status and accessbility of UC003 Components.</p>
          </a>

          <a
            href="http://localhost:3000/" target="_blank"
            className={styles.card}
          >
            <h2>Cluster &rarr;</h2>
            <p>
              Go back to cluster configuration.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.tmforum.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/TMForum_logo_2021.svg" alt="TM Forum Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
