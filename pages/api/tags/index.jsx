import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('tags')
    .orderBy('name')
    .get()
    .then((tags) => {
      let tagsArr = []
      tags.forEach((tag) => tagsArr.push(tag.data()))
      res.status(201).json(tagsArr)
    })
    .catch((err) => res.status(401).send(`error getting tags ${err.message}`))
})

handler.post(async (req, res) => {
  const tag = {
    uuid: req.body.uuid,
    name: req.body.name,
    description: req.body.description
  }

  await db
    .collection('tags')
    .doc(tag.uuid)
    .set(tag)
    .then(() => res.status(201).send(`successfully added tag ${tag.name}`))
    .catch((err) => res.status(401).send(`error adding tag ${tag.name} ${err.message}`))
})

export default handler