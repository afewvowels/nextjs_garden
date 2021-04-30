import React from 'react'
import Router from 'next/router'

import styles from '@styles/elements.module.css'

const ImageCard = ({ image }) => {
  const deleteImage = async () => {
    const deleteRes = await fetch('/api/images/' + image.uuid, {
      method: 'DELETE'
    })

    if (deleteRes.status == 201) {
      console.log('delete successful')
      Router.push('/images')
    } else {
      console.error('delete failed')
    }
  }

  return(<>
    <div className={styles.cardWrapper}>
      <div>
        <p>UUID</p>
        <p>{image.uuid}</p>
      </div>
      <div>
        <p>Date</p>
        <p>{image.date}</p>
      </div>
      <div className={styles.cardImageWrapper}>
        <img src={image.base64} />
      </div>
      <div>
        <button onClick={deleteImage}>Delete</button>
      </div>
    </div>
  </>)
}

export default ImageCard