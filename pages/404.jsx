import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const PageNotFound = () => {
  return(<>
    <Head>
      <title>404 | Page Not Found</title>
    </Head>
    <div>404 Page Not found</div>
    <Link href='/'>Go home</Link>
  </>)
}

export default PageNotFound