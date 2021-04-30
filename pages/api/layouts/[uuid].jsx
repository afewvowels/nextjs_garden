import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('layout_images')
    .where('uuid', '==', uuid)
    .get()
    .then((layout_images) => {
      let imagesArr = []
      layout_images.forEach(image => {
        imagesArr.push(image.data())
      })
      res.status(201).json(imagesArr[0])
    })
    .catch((err) => res.status(401).send(`error getting layout_images ${uuid} ${err.message}`))
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const layout_image = {
    uuid: req.body.uuid,
    date: req.body.date,
    base64: req.body.base64,
    description: req.body.description
  }

  await db
    .collection('layout_images')
    .doc(uuid)
    .update(layout_image)
    .then(() => res.status(201).send(`successfully added layout_image ${uuid}`))
    .catch((err) => res.status(401).send(`error updating layout_image ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('layout_images')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted layout_image ${uuid}`))
    .catch((err) => res.status(401).send(`error deleting layout_image ${uuid} ${err.message}`))
})

export default handler