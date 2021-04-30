import React, { useLayoutEffect, useState } from 'react'
import Head from 'next/head'

import ImageCard from '@components/elements/ImageCard'
import SimpleTitle from '@components/templates/SimpleTitle'

import styles from '@styles/pages.module.css'

const Images = ({images}) => {
  return (<div className={styles.cardLayoutColumn}>
    {images.map((image) => {
      return <ImageCard image={image} />
    })}
  </div>)
}

const ImagesL = ({images}) => {
  return (<div className={styles.cardLayoutColumn}>
    {images.map((image, index) => {
      if (index % 2 == 1) {
        return <ImageCard image={image} />
      }
    })}
  </div>)
}

const ImagesR = ({images}) => {
  return (<div className={styles.cardLayoutColumn}>
    {images.map((image, index) => {
      if (index % 2 == 0) {
        return <ImageCard image={image} />
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


const Index = ({images}) => {
  const [windowSize] = useSize()

  return(<>
    <Head>
      <title>Images | Garden</title>
    </Head>
    <SimpleTitle title='Images' link='images' />
    <section className={styles.cardLayoutWrapper}>
      {(windowSize > 666) ? <><ImagesL images={images} /><ImagesR images={images} /></> : <Images images={images} />}
    </section>
  </>)
}

export async function getServerSideProps() {
  let imagesRes = await fetch(process.env.NEXT_PUBLIC_URL + 'api/images')
  let images = await imagesRes.json()

  return { props: { images } }
}

export default Index
