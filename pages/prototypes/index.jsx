import React, { useState, useLayoutEffect } from 'react'
import Head from 'next/head'

import Title from '@components/templates/Title'
import PrototypeCard from '@components/elements/PrototypeCard'

import styles from '@styles/pages.module.css'

const Prototypes = ({prototypes}) => {
  return (<div className={styles.cardLayoutColumn}>
    {prototypes.map((proto, index) => {
      return <PrototypeCard prototype={proto} key={index} />
    })}
  </div>)
}

const PrototypesL = ({prototypes}) => {
  return(<div className={styles.cardLayoutColumn}>
    {prototypes.map((proto, index) => {
      if (index % 2 == 1) {
        return <PrototypeCard prototype={proto} key={index} />
      }
    })}
  </div>)
}

const PrototypesR = ({prototypes}) => {
  return(<div className={styles.cardLayoutColumn}>
    {prototypes.map((proto, index) => {
      if (index % 2 == 0) {
        return <PrototypeCard prototype={proto} key={index} />
      }
    })}
  </div>)
}

function useSize() {
  const [size, set_size] = useState([0])

  useLayoutEffect(() => {
    function updateWindowSize() {
      set_size([window.innerWidth])
    }

    window.addEventListener('resize', updateWindowSize)
    window.addEventListener('orientationchange', updateWindowSize)
    updateWindowSize()
    return () => {
      window.removeEventListener('resize', updateWindowSize)
      window.removeEventListener('orientationchange', updateWindowSize)
    }
  }, [])
  return size
}

const Index = ({prototypes}) => {
  const [windowSize] = useSize()

  return(<>
    <Head>
      <title>Prototypes | Garden</title>
    </Head>
    <Title title='Prototypes' addUrl='/prototypes/add' />
    <section className={styles.cardLayoutWrapper}>
      {(windowSize > 666) ? <><PrototypesR prototypes={prototypes}/><PrototypesL prototypes={prototypes}/></> : <Prototypes prototypes={prototypes}/>}
    </section>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/prototypes`)
  let prototypes = await res.json()

  return { props: { prototypes } }
}

export default Index