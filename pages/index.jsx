import Head from 'next/head'

import pages from '@styles/pages.module.css'

const Home = () => {
  return (<>
    <Head>
      <title>Home | Garden</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <section>
      <h2>Home</h2>
    </section>
  </>)
}

export default Home