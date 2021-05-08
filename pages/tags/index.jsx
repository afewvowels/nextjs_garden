import React, { useState, useLayoutEffect } from 'react'
import Head from 'next/head'

import Title from '@components/templates/Title'
import TagCard from '@components/elements/TagCard'

import styles from '@styles/pages.module.css'

const Tags = ({tags}) => {
  return (<div className={styles.cardLayoutColumn}>
    {tags.map((tag, index) => {
      return <TagCard tag={tag} key={index} />
    })}
  </div>)
}

const TagsL = ({tags}) => {
  return(<div className={styles.cardLayoutColumn}>
    {tags.map((tag, index) => {
      if (index % 2 == 1) {
        return <TagCard tag={tag} key={index} />
      }
    })}
  </div>)
}

const TagsR = ({tags}) => {
  return(<div className={styles.cardLayoutColumn}>
    {tags.map((tag, index) => {
      if (index % 2 == 0) {
        return <TagCard tag={tag} key={index} />
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

const Index = ({tags}) => {
  const [windowSize] = useSize()

  return(<>
    <Head>
      <title>Tags | Garden</title>
    </Head>
    <Title title='Tags' addUrl='/tags/add' />
    <section className={styles.cardLayoutWrapper}>
      {(windowSize > 666) ? <><TagsR tags={tags}/><TagsL tags={tags}/></> : <Tags tags={tags}/>}
    </section>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/tags`)
  let tags = await res.json()

  return { props: { tags } }
}

export default Index