import React, { useCallback } from 'react'
import SimpleTitle from '@components/templates/SimpleTitle'

const Index = ({plot, layout}) => {
  const layoutImageRef = useCallback(node => {
    if (node != null && layout.base64 != '') {
      node.innerHTML = ''
      node.insertAdjacentHTML('beforeend', `${layout.base64}`)
    }
  }, [layout])

  return(<>
    <SimpleTitle title={`${plot.name}`} link='plots' />
    <div ref={layoutImageRef}></div>
  </>)
}

export async function getServerSideProps({params}) {
  let res = await fetch(process.env.NEXT_PUBLIC_URL + 'api/plots/' + params.uuid)
  let plot = await res.json()

  res = await fetch(process.env.NEXT_PUBLIC_URL + 'api/layouts/' + plot.layout_uuid)
  let layout = await res.json()

  return { props: { plot, layout } }
}

export default Index