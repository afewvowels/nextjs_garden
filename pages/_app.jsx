import React, { useEffect } from 'react'
import Head from 'next/head'
import { initialize } from '@components/modules/palette/palette'

import Layout from '@templates/Layout'

import '../styles/globals.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/pro-solid-svg-icons'
import { far } from '@fortawesome/pro-regular-svg-icons'
import { fal } from '@fortawesome/pro-light-svg-icons'
import { fad } from '@fortawesome/pro-duotone-svg-icons'

library.add(fas, far, fal, fad)

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initialize()
  }, [])

  return (<Layout>
    <Head>
      <title>Garden</title>
      <meta name="description" content="Home garden management portal" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      <meta name="apple-mobile-web-app-title" content="Garden" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="MobileOptimized" content="width" />

      <link rel="apple-touch-icon" type="image/png" href='/icons/apple-touch-icon.png' />
      <link rel="icon" type="image/svg" href='/icons/seedling-duotone.svg' />
      <link rel="manifest" href='/manifest.json' />
    </Head>
    <Component {...pageProps} />
  </Layout>)
}

export default MyApp
