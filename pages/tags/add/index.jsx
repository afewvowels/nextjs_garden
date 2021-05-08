import React, { useState, useEffect } from 'react'

import Router from 'next/router'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { v4 as uuidv4 } from 'uuid'

const Index = () => {
  const [uuid, set_uuid] = useState('')
  const [name, set_name] = useState('')
  const [description, set_description] = useState('')
  const [error_msg, set_error_msg] = useState('')

  const generateIdentifiers = () => {
    set_uuid(uuidv4())
  }

  const handleCreateTag = async () => {
    if (uuid == '') {
      generateIdentifiers()
      return
    }

    const tag = {
      uuid: uuid,
      name: name,
      description: description
    }

    const tagRes = await fetch('/api/tags', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tag)
    })

    if (tagRes.status == 201) {
      console.log('Successfully created tag')
      Router.replace('/tags')
    } else {
      console.error('Error creating tag')
      set_error_msg(await tagRes.text())
    }
  }

  return(<>
    <Head>
      <title>Add | Tags | Garden</title>
    </Head>
    <h2>Create Tag</h2>
    {error_msg ? <p style={{color: 'red'}}>{error_msg}</p> : null}
    <button onClick={generateIdentifiers}>Generate UUID</button>
    <div>
      <label>UUID</label>
      <input
        type='text'
        value={uuid}
        readOnly={true}
        onChange={e => set_uuid(e.target.value)}/>
    </div>
    <div>
      <label>Name</label>
      <input
        type='text'
        value={name}
        readOnly={false}
        onChange={e => set_name(e.target.value)}/>
    </div>
    <div>
      <label>Description</label>
      <textarea
        value={description}
        onChange={e => set_description(e.target.value)}/>
    </div>
    <button onClick={handleCreateTag}>Create</button>
  </>)
}

export default Index