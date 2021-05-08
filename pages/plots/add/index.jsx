import React, { useState, useCallback } from 'react'
import SimpleTitle from '@components/templates/SimpleTitle'

import Router from 'next/router'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { v4 as uuidv4 } from 'uuid'

const Index = () => {
  const [uuid, set_uuid] = useState('')
  const [name, set_name] = useState('')
  const [description, set_description] = useState('')
  const [date_started, set_date_started] = useState('')
  const [date_closed, set_date_closed] = useState('null')
  const [layout_uuid, set_layout_uuid] = useState('')
  const [layout_base64, set_layout_base64] = useState('')
  const [layout_date, set_layout_date] = useState('')
  const [layout_description, set_layout_description] = useState('')
  const [location, set_location] = useState('')
  const [error_msg, set_error_msg] = useState('')

  const generateIdentifiers = () => {
    set_uuid(uuidv4())
    set_layout_uuid(uuidv4())

    let date = new Date()
    let today = date.getFullYear() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getDate()
    set_date_started(today)
    set_layout_date(today)
  }

  const handleCreatePlot = async () => {
    const layout_image = {
      uuid: layout_uuid,
      base64: layout_base64,
      date: layout_date,
      description: layout_description
    }

    const layoutResponse = await fetch('/api/layouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(layout_image)
    })

    if (layoutResponse.status == 201) {
      console.log('Successfully added layout image, continuing to create plot database entry')
    } else {
      console.error('Error creating layout image database entry')
      set_error_msg(await layoutResponse.text())
    }

    const plot = {
      uuid: uuid,
      name: name,
      description: description,
      location: location,
      layout_uuid: layout_uuid,
      date_started: date_started,
      date_closed: date_closed
    }

    const plotResponse = await fetch('/api/plots', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(plot)
    })

    if (plotResponse.status == 201) {
      console.log('Successfully added plot')
      Router.replace('/plots')
    } else {
      console.error('Error adding plot')
      set_error_msg(await plotResponse.text())
    }
  }

  return(<>
    <Head>
      <title>Add | Plots | Garden</title>
    </Head>
    <SimpleTitle title='Create Plot' link='plots' />
    {error_msg ? <p style={{color: 'red'}}>{error_msg}</p> : null}
    <button onClick={generateIdentifiers}>Generate Identifiers</button>
    <div>
      <label>UUID</label>
      <input
        type='text'
        value={uuid}
        readOnly={true}
        onChange={e => set_uuid(e.target.value)}
      />
    </div>
    <div>
      <label>Name</label>
      <input
        type='text'
        value={name}
        onChange={e => set_name(e.target.value)}
      />
    </div>
    <div>
      <label>Location</label>
      <select
        value={location}
        onChange={e => set_location(e.target.value)}>
        <option value='default'>Make a selection</option>
        <option value='Hermitage'>Hermitage</option>
      </select>
    </div>
    <div>
      <label>Date Started</label>
      <input
        type='text'
        value={date_started}
        readOnly={true}
        onChange={e => set_date_started(e.target.value)}
      />
    </div>
    <div>
      <label>Date Closed</label>
      <input
        type='text'
        value={date_closed}
        readOnly={true}
        onChange={e => set_date_closed(e.target.value)}
      />
    </div>
    <div>
      <label>Layout UUID</label>
      <input
        type='text'
        value={layout_uuid}
        readOnly={true}
        onChange={e => set_layout_uuid(e.target.value)}
      />
    </div>
    <div>
      <label>Layout SVG</label>
      <input
        type='text'
        value={layout_base64}
        onChange={e => set_layout_base64(e.target.value)}
      />
    </div>
    <div>
      <label>Layout Description</label>
      <input
        type='text'
        value={layout_description}
        onChange={e => set_layout_description(e.target.value)}
      />
    </div>
    <div>
      <label>Layout Date</label>
      <input
        type='text'
        value={layout_date}
        readOnly={true}
        onChange={e => set_layout_date(e.target.value)}
      />
    </div>
    <button onClick={handleCreatePlot}>Create</button>
  </>)
}

export default Index