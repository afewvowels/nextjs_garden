import React, { useState, useCallback, useLayoutEffect } from 'react'
import Head from 'next/head'

import Title from '@components/templates/Title'
import PrototypeCard from '@components/elements/PrototypeCard'

import styles from '@styles/pages.module.css'

const Prototypes = ({prototypes, tag}) => {
  return (<div className={styles.cardLayoutColumn}>
    {prototypes.map((proto, index) => {
      if (tag == 'all') return <PrototypeCard prototype={proto} key={index} />

      proto.tag_uuids.map(tag_uuid => {
        if (tag_uuid == tag) return <PrototypeCard prototype={proto} key={index} />
      })
    })}
  </div>)
}

const PrototypesL = ({prototypes, tag}) => {
  return(<div className={styles.cardLayoutColumn}>
    {prototypes.map((proto, index) => {
      if (index % 2 == 1) {
        if (tag == 'all') return <PrototypeCard prototype={proto} key={index} />

        proto.tag_uuids.map(tag_uuid => {
          if (tag_uuid == tag) return <PrototypeCard prototype={proto} key={index} />
        })
      }
    })}
  </div>)
}

const PrototypesR = ({prototypes, tag}) => {
  return(<div className={styles.cardLayoutColumn}>
    {prototypes.map((proto, index) => {
      if (index % 2 == 0) {
        if (tag == 'all') return <PrototypeCard prototype={proto} key={index} />

        proto.tag_uuids.map(tag_uuid => {
          if (tag_uuid == tag) return <PrototypeCard prototype={proto} key={index} />
        })
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

const Index = ({prototypes, tags}) => {
  const [windowSize] = useSize()
  const [tag, set_tag] = useState('all')

  const tagsRef = useCallback(node => {
    if (node != null) {
      node.innerHtml = ''
      node.insertAdjacentHTML('beforeend', '<option value="all">All</option>')
      tags.forEach((tag, index) => {
        node.insertAdjacentHTML('beforeend', `<option value=${tag.uuid} index=${index}>${tag.name}</option>`)
      })
    }
  }, [tags])

  return(<>
    <Head>
      <title>Prototypes | Garden</title>
    </Head>
    <Title title='Prototypes' addUrl='/prototypes/add' />
    <section className={styles.pageSelectWrapper}>
      <h3>Tag Select</h3>
      <select
        value={tag}
        onChange={e => set_tag(e.target.value)}
        ref={tagsRef}
      />
    </section>
    <section className={styles.cardLayoutWrapper}>
      {(windowSize > 666) ? <><PrototypesR prototypes={prototypes} tag={tag} /><PrototypesL prototypes={prototypes} tag={tag} /></> : <Prototypes prototypes={prototypes} tag={tag} />}
    </section>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/prototypes`)
  let prototypes = await res.json()

  res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/tags`)
  let tags = await res.json()

  return { props: { prototypes, tags } }
}

export default Index