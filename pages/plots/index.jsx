import React from 'react'
import Link from 'next/link'

import SimpleTitle from '@components/templates/SimpleTitle'

import templatesStyles from '@styles/templates.module.css'

const Index = () => {
  return(<>
    <SimpleTitle title='Plots' link='plots' />
    <ul className={templatesStyles.navListSimple}>
      <Link href='/plots/front'>
        <li>Front</li>
      </Link>
      <Link href='/plots/side'>
        <li>Side</li>
      </Link>
      <Link href='/plots/rear'>
        <li>Rear</li>
      </Link>
    </ul>
  </>)
}

export default Index