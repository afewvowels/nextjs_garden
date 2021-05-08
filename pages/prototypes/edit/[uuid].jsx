import React from 'react'

const Index = ({prototype}) => {
  return(<>
    <p>{prototype.name}</p>
  </>)
}

export async function getServerSideProps({params}) {
  let res = await fetch(process.env.NEXT_PUBLIC_URL + 'api/prototypes/' + params.uuid)
  let prototype = await res.json()

  return { props: { prototype } }
}

export default Index