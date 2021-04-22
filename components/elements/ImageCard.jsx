import React from 'react'
import Router from 'next/router'

const ImageCard = ({ image }) => {
  const deleteImage = async () => {
    const deleteRes = await fetch('/api/images/' + image.uuid, {
      method: 'DELETE'
    })

    if (deleteRes.status == 201) {
      console.log('delete successful')
      Router.push('/images')
    } else {
      console.error('delete failed')
    }
  }

  return(<>
    <div>
      <div>
        <p>UUID</p>
        <p>{image.uuid}</p>
      </div>
      <div>
        <img src={image.base64} />
      </div>
      <div>
        <button onClick={deleteImage}>Delete</button>
      </div>
    </div>
  </>)
}

export default ImageCard