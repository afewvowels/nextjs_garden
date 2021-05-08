import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'

import styles from '@styles/elements.module.css'

const TagCard = ({tag}) => {
  const deleteTag = async () => {
    const delResponse = await fetch(`/api/tags/${tag.uuid}`, {
      method: 'DELETE'
    })

    if (delResponse.status == 201) {
      console.log('delete successful')
      Router.push('/tags')
    } else {
      console.error('error deleteing tag')
    }
  }

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.cardTitle}>
        <h3>{tag.name}</h3>
        {/* <FontAwesomeIcon icon={['far', 'minus-square']} /> */}
      </div>
      <div>
        <p>{tag.description}</p>
      </div>
      <div className={styles.cardButtonWrapper}>
        <button onClick={deleteTag}>Delete</button>
      </div>
    </div>
  )
}

export default TagCard