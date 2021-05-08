import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('prototypes')
    .where('uuid', '==', uuid)
    .get()
    .then((prototypes) => {
      let protosArr = []
      prototypes.forEach(proto => { protosArr.push(proto.data()) })
      res.status(201).json(protosArr[0])
    })
    .catch((err) => { res.status(401).send(`error getting prototypes ${err.message}`) })
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const prototype = {
    uuid: req.body.uuid,
    name: req.body.name,
    scientific_name: req.body.scientific_name,
    description: req.body.description,
    image_uuids: req.body.image_uuids,
    tag_uuids: req.body.tag_uuids
  }

  await db
    .collection('prototypes')
    .doc(uuid)
    .update(prototype)
    .then(() => res.status(201).send(`successfully updated prototype with uuid ${uuid}`))
    .catch((err) => res.status(401).send(`error updating prototype with uuid ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('prototypes')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted prototype with uuid ${uuid}`))
    .catch((err) => res.status(401).send(`error deleting prototype with uuid ${uuid} ${err.message}`))
})

export default handler