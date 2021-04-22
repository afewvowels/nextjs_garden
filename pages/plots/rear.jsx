import React from 'react'
import Image from 'next/image'

import styles from '@styles/pages.module.css'

const rear = () => {
  return(<>
    <h2>Rear</h2>
    <div className={styles.layoutDiagramWrapper}>
      <img
        src='/images/Rear.svg'
        alt='Rear garden layout diagram'
      />
    </div>
  </>)
}

export default rear