import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Head from 'next/head'
import Router from 'next/router'

import PaletteCard from '@components/elements/PaletteCard'
import SimpleTitle from '@components/templates/SimpleTitle'

import styles from '@styles/pages.module.css'
import elementsStyles from '@styles/elements.module.css'

const Index = ({palettes}) => {
  const [hex0, set_hex0] = useState('')
  const [hex1, set_hex1] = useState('')
  const [color0, set_color0] = useState('')
  const [color1, set_color1] = useState('')
  const [error_msg, set_error_msg] = useState('')

  const handleCreate = async () => {
    localStorage.setItem('palettes', undefined)

    const newPalette = {
      uuid: uuidv4(),
      hex0: hex0,
      hex1: hex1,
      color0: color0,
      color1: color1,
    }

    const paletteRes = await fetch('/api/palettes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPalette)
    })

    if (paletteRes.status == 201) {
      set_hex0('')
      set_hex1('')
      set_color0('')
      set_color1('')
      localStorage.setItem('palettes', undefined)
      Router.push('/palettes')
    } else {
      console.error('error while creating palette')
      set_error_msg(await paletteRes.text())
    }
  }

  return(<>
    <Head>
      <title>Palettes | Garden</title>
    </Head>
    <SimpleTitle title='Palettes' link='palettes' />
    {error_msg ? <p style={{color: 'red'}}>{error_msg}</p> : null}
    <section className={elementsStyles.cardWrapper}>
      <div className={elementsStyles.cardTitle}>
        <h3>Add New Palette</h3>
      </div>
      <div className={elementsStyles.cardInputWrapperGrid}>
        <div className={elementsStyles.cardInputWrapper}>
          <label>Color A</label>
          <input
            type='text'
            value={color0}
            onChange={e => set_color0(e.target.value)}
          />
        </div>
        <div className={elementsStyles.cardInputWrapper}>
          <label>Color B</label>
          <input
            type='text'
            value={color1}
            onChange={e => set_color1(e.target.value)}
          />
        </div>
        <div className={elementsStyles.cardInputWrapper}>
          <label>Hex A</label>
          <input
            type='text'
            value={hex0}
            onChange={e => set_hex0(e.target.value)}
          />
        </div>
        <div className={elementsStyles.cardInputWrapper}>
          <label>Hex B</label>
          <input
            type='text'
            value={hex1}
            onChange={e => set_hex1(e.target.value)}
          />
        </div>
      </div>
      <div className={elementsStyles.cardButtonWrapper}>
        <button onClick={handleCreate}>Add New Palette</button>
      </div>
    </section>
    <section className={styles.cardLayoutWrapper}>
      {palettes.map((palette, index) => {
        return <PaletteCard palette={palette} key={index} />
      })}
    </section>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/palettes`)
  let palettes = await res.json()

  return { props: { palettes } }
}

export default Index