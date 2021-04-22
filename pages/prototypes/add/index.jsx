import React, { useState, useCallback } from 'react'

import Router from 'next/router'
import Head from 'next/head'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { v4 as uuidv4 } from 'uuid'
import Compressor from 'compressorjs'
import { isMobile } from 'react-device-detect'

const Index = () => {
  let fileReader

  const [uuid, set_uuid] = useState('')
  const [name, set_name] = useState('')
  const [sci_name, set_sci_name] = useState('')
  const [description, set_description] = useState('')
  const [image_uuids, set_image_uuids] = useState([])
  const [image_base64s, set_image_base64s] = useState([])
  const [image_base64, set_image_base64] = useState('')
  const [image_description, set_image_description] = useState('')
  const [image_date, set_image_date] = useState('')
  const [error_msg, set_error_msg] = useState('')

  const imageRef = useCallback(node => {
    if (node != null) {
      node.innerHTML = ''
      if (image_base64 != '') {
        node.insertAdjacentHTML(`beforeend`, `<img src=${image_base64} alt=${image_description}/>`)
      }
    }
  }, [image_base64])

  const thumbnailsRef = useCallback(node => {
    if (node != null && image_base64s.length > 0) {
      node.innerHTML = ''
      image_base64s.forEach(base64 => {
        node.insertAdjacentHTML(`beforeend`, `<img src=${base64} />`)
      })
    }
  }, [image_base64s])

  const generateIdentifiers = () => {
    set_uuid(uuidv4())
  }

  const generateDate = () => {
    let date = new Date()
    let today = date.getFullYear() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getDate()
    set_image_date(today)
  }

  const handleImageRead = () => {
    const image = fileReader.result
    set_image_base64(image)
  }

  const handleImageConversion = (image) => {
    const mime = (isMobile) ? 'image/jpeg' : 'image/webp'
    new Compressor(image, {
      maxWidth: 780,
      maxHeight: 780,
      minWidth: 100,
      minHeight: 100,
      quality: 0.7,
      mimeType: mime,
      success(result) {
        fileReader = new FileReader()
        fileReader.readAsDataURL(result)
        fileReader.onloadend = handleImageRead
      }
    })
  }

  const handleImageUpload = async () => {
    let imageUuid = uuidv4()

    const image = {
      uuid: imageUuid,
      base64: image_base64,
      description: image_description,
      date: image_date
    }

    const imageRes = await fetch('/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(image)
    })

    if (imageRes.status == 201) {
      console.log(`image created successfully`)
      set_image_uuids(image_uuids => [...image_uuids, imageUuid])
      set_image_base64s(image_base64s => [...image_base64s, image_base64])
      set_image_base64('')
      set_image_description('')
    } else {
      console.error(`error uploading image to database`)
      set_error_msg(await imageRes.text())
    }
  }

  const handleCreatePrototype = async () => {
    const prototype = {
      uuid: uuid,
      name: name,
      scientific_name: sci_name,
      description: description,
      image_uuids: image_uuids
    }

    const prototypeResponse = await fetch('/api/prototypes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(prototype)
    })

    if (prototypeResponse.status == 201) {
      console.log('Successfully created prototype')
      Router.replace('/api/prototypes')
    } else {
      console.error('Error creating prototype')
      set_error_msg(await prototypeResponse.text())
    }
  }

  return(<>
    <Head>
      <title>Add | Prototypes | Garden</title>
    </Head>
    <h2>Create Prototype</h2>
    {error_msg ? <p style={{color: 'red'}}>{error_msg}</p> : null}
    <button onClick={generateDate}>Get Date</button>
    <div>
      <label>Date</label>
      <input
        type='text'
        value={image_date}
        readOnly={true}
        onChange={e => set_uuid(e.target.value)}/>
    </div>
    <div>
      <div ref={imageRef}></div>
      <label>Image</label>
      <input
        type='file'
        multiple={false}
        accept='image/*'
        onChange={e => handleImageConversion(e.target.files[0])}/>
    </div>
    <button onClick={handleImageUpload}>Upload Image</button>
    <div ref={thumbnailsRef}></div>

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
      <label>Scientific Name</label>
      <input
        type='text'
        value={sci_name}
        readOnly={false}
        onChange={e => set_sci_name(e.target.value)}/>
    </div>
    <div>
      <label>Description</label>
      <textarea
        value={description}
        onChange={e => set_description(e.target.value)}/>
    </div>
    <button onClick={handleCreatePrototype}>Create</button>
  </>)
}

export default Index