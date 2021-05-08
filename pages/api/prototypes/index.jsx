import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('prototypes')
    .orderBy('name')
    .get()
    .then((prototypes) => {
      let prototypesArr = []
      prototypes.forEach((proto) => prototypesArr.push(proto.data()))
      res.status(201).json(prototypesArr)
    })
    .catch((err) => res.status(401).send(`error getting prototypes ${err.message}`))
})

handler.post(async (req, res) => {
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
    .doc(prototype.uuid)
    .set(prototype)
    .then(() => res.status(201).send(`successfully added prototype ${prototype.scientific_name}`))
    .catch((err) => res.status(401).send(`error adding prototype ${prototype.scientific_name} ${err.message}`))
})

export default handler