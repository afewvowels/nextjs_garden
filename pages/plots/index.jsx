import React from 'react'
import Link from 'next/link'

import Title from '@components/templates/Title'

import templatesStyles from '@styles/templates.module.css'

const Index = ({plots}) => {
  return(<>
    <Title title='Plots' addUrl='/plots/add' />
    <ul className={templatesStyles.navListSimple}>
      {plots.map((plot, index) => {
        return <li><Link index={index} href={`/plots/${plot.uuid}`}>{plot.name}</Link></li>
      })}
    </ul>
  </>)
}

export async function getServerSideProps() {
  let res = await fetch(`${process.env.NEXT_PUBLIC_URL}api/plots`)
  let plots = await res.json()

  return { props: { plots } }
}

export default Index