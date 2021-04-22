import React from 'react'
import Image from 'next/image'

import styles from '@styles/pages.module.css'

const side = () => {
  return(<>
    <h2>Side</h2>
    <div className={styles.layoutDiagramWrapper}>
      <img
        src='/images/Side.svg'
        alt='Side garden layout diagram'
      />
    </div>
  </>)
}

export default side