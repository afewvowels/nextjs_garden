import React from 'react'
import Router from 'next/router'

import styles from '@styles/elements.module.css'

const PaletteCard = ({palette}) => {
  const handleDelete = async () => {
    const delResponse = await fetch(`/api/palettes/${palette.uuid}`, {
      method: 'DELETE'
    })

    if (delResponse.status == 201) {
      console.log('delete successful')
      Router.push('/palettes')
    } else {
      console.error('error deleting palette')
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <span className={styles.paletteColorInfo}>
        <div style={{backgroundColor: `#${palette.hex0}`}}></div>
        <p>#{palette.hex0}</p>
        <p>{palette.color0}</p>
      </span>
      <span className={styles.paletteColorInfo}>
        <div style={{backgroundColor: `#${palette.hex1}`}}></div>
        <p>#{palette.hex1}</p>
        <p>{palette.color1}</p>
      </span>
      <span className={styles.cardButtonWrapper}>
        <button onClick={handleDelete}>Delete</button>
      </span>
    </div>
  )
}

export default PaletteCard