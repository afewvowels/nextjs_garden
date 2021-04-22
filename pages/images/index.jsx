import React from 'react'

import ImageCard from '@components/elements/ImageCard'

const Index = ({ images }) => {
  return(<>
    <h1>Images</h1>
    {images.map((image, index) => {
      return <ImageCard image={image} />
    })}
  </>)
}

export async function getServerSideProps() {
  let imagesRes = await fetch(process.env.NEXT_PUBLIC_URL + 'api/images')
  let images = await imagesRes.json()

  return { props: { images } }
}

export default Index
