import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('images')
    .where('uuid', '==', uuid)
    .get()
    .then((images) => {
      let imagesArr = []
      images.forEach(proto => { imagesArr.push(proto.data()) })
      res.status(201).json(imagesArr[0])
    })
    .catch((err) => { res.status(401).send(`error getting images ${err.message}`) })
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const image = {
    uuid: req.body.uuid,
    base64: req.body.base64,
    description: req.body.description,
    date: req.body.date
  }

  await db
    .collection('images')
    .doc(uuid)
    .update(image)
    .then(() => res.status(201).send(`successfully updated image with uuid ${uuid}`))
    .catch((err) => res.status(401).send(`error updating image with uuid ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('images')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted image with uuid ${uuid}`))
    .catch((err) => res.status(401).send(`error deleting image with uuid ${uuid} ${err.message}`))
})

export default handler