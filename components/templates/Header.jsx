import React from 'react'

import Link from 'next/link'

import styles from '@styles/templates.module.css'

const Header = () => {
  return(<header className={styles.navWrapper}>
    <Link href='/'>
      <h1 className={styles.navTitle}>Garden</h1>
    </Link>
    <nav>
      <ul className={styles.navList}>
        <Link href='/plots'>
          <li>Plots</li>
        </Link>
        <Link href='/prototypes'>
          <li>Prototypes</li>
        </Link>
        <Link href='/images'>
          <li>Images</li>
        </Link>
      </ul>
    </nav>
  </header>)
}

export default Header