import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { randomSet } from '@components/modules/palette/palette.jsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { invert } from '@components/modules/palette/palette'

import styles from '@styles/templates.module.css'

const Footer = () => {
  const router = useRouter()

  const [palette, set_palette] = useState([])

  useEffect(() => {
    getPalette()
  }, [router.isReady])

  const paletteRef = useCallback(node => {
    if (node != null) {
      if (palette[3] == palette[2]) {
        node.innerHTML = palette[2]
      } else {
        node.innerHTML = `${palette[2]} & ${palette[3]}`
      }
    }
  }, [palette])

  const getPalette = () => {
    let palette
    palette = localStorage.getItem('palette')

    try {
      palette = palette.split(',')
      if (palette.length != 4) throw new Error
      set_palette(palette)
    } catch {
      console.log(`error getting palette`)
    }
  }

  const updatePalette = async () => {
    await randomSet()
    getPalette()
  }

  return(<footer className={styles.footerWrapper}>
    <span className={styles.footerPaletteButton} onClick={updatePalette}>
      <FontAwesomeIcon icon={['fas', 'palette']}/>
      <p ref={paletteRef}></p>
    </span>
    <FontAwesomeIcon icon={['far', 'sync-alt']} onClick={invert} />
  </footer>)
}

export default Footer