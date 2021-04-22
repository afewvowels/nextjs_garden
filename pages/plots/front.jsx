import React from 'react'
import Image from 'next/image'

import styles from '@styles/pages.module.css'

const front = () => {
  return(<>
    <h2>Front</h2>
    <div className={styles.layoutDiagramWrapper}>
      <img
        src='/images/Front.svg'
        alt='Front garden layout diagram'
      />
    </div>
  </>)
}

export default front