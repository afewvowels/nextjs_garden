import React, { useState, useEffect, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import Link from 'next/link'
import useSWR from 'swr'

import styles from '@styles/elements.module.css'

const fetcher = (...args) => fetch(...args).then(res => res.json())

function useImage(uuid) {
  const { data, error } = useSWR(`/api/images/${uuid}`, fetcher)
  return { image: data, isLoading: !error && !data, isError: error }
}

function PrototypeImage({uuid}) {
  const { image, isLoading, isError } = useImage(uuid)

  if (isLoading) return (
    <span><FontAwesomeIcon icon={['far', 'atom-alt']} /></span>
  )

  if (isError) return (
    <span><FontAwesomeIcon icon={['far', 'exclamation']} /></span>
  )

  return <img src={image.base64} alt={image.description} />
}

const PrototypeCard = ({prototype}) => {
  const [edit_url, set_edit_url] = useState('')
  const [collapsed, set_collapsed] = useState(true)

  useEffect(() => {
    set_edit_url('/prototypes/edit/' + prototype.uuid)
  })

  const deletePrototype = async () => {
    const delResponse = await fetch(`/api/prototypes/${prototype.uuid}`, {
      method: 'DELETE'
    })

    if (delResponse.status == 201) {
      console.log('delete successful')
      set_collapsed(true)
      Router.push('/prototypes')
    } else {
      console.error('error deleteing prototype')
    }
  }

  const openCard = () => {
    set_collapsed(false)
  }

  const closeCard = () => {
    set_collapsed(true)
  }

  if (collapsed) {
    return (
      <div className={styles.cardWrapper}>
        <div onClick={openCard} className={styles.cardTitle}>
          <h3>{prototype.name}</h3>
          <FontAwesomeIcon icon={['far', 'plus-square']} />
        </div>
      </div>
    )
  } else {
    return (
      <div className={styles.cardWrapper}>
        <div onClick={closeCard} className={styles.cardTitle}>
          <h3>{prototype.name}</h3>
          <FontAwesomeIcon icon={['far', 'minus-square']} />
        </div>
        <div>
          <p>{prototype.scientific_name}</p>
          <p>{prototype.description}</p>
        </div>
        <div className={styles.cardImageWrapper}>
          {prototype.image_uuids.map(uuid => {
            return <PrototypeImage uuid={uuid} />
          })}
        </div>
        <div className={styles.cardButtonWrapper}>
          <button onClick={deletePrototype}>Delete</button>
        </div>
      </div>
    )
  }
}

export default PrototypeCard