import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('layout_images')
    .orderBy('date')
    .get()
    .then((layout_images) => {
      let imagesArr = []
      layout_images.forEach((image) => imagesArr.push(image.data()))
      res.status(201).json(imagesArr)
    })
    .catch((err) => res.status(401).send(`error getting layout_images ${err.message}`))
})

handler.post(async (req, res) => {
  const layout_image = {
    uuid: req.body.uuid,
    date: req.body.date,
    base64: req.body.base64,
    description: req.body.description
  }

  await db
    .collection('layout_images')
    .doc(layout_image.uuid)
    .set(layout_image)
    .then(() => res.status(201).send(`successfully added layout_image ${layout_image.scientific_name}`))
    .catch((err) => res.status(401).send(`error adding layout_image ${layout_image.scientific_name} ${err.message}`))
})

export default handler