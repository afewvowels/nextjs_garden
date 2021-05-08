import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('tags')
    .where('uuid', '==', uuid)
    .get()
    .then((tags) => {
      let tagsArr = []
      tags.forEach(tag => {
        tagsArr.push(tag.data())
      })
      res.status(201).json(tagsArr[0])
    })
    .catch((err) => res.status(401).send(`error getting tags ${uuid} ${err.message}`))
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const tag = {
    uuid: req.body.uuid,
    name: req.body.name,
    description: req.body.description
  }

  await db
    .collection('tags')
    .doc(uuid)
    .update(tag)
    .then(() => res.status(201).send(`successfully added tag ${uuid}`))
    .catch((err) => res.status(401).send(`error updating tag ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('tags')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted tag ${uuid}`))
    .catch((err) => res.status(401).send(`error deleting tag ${uuid} ${err.message}`))
})

export default handler