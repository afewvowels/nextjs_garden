import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('planters')
    .where('uuid', '==', uuid)
    .get()
    .then((planters) => {
      let plantersArr = []
      planters.forEach(planter => {
        plantersArr.push(planter.data())
      })
      res.status(201).json(plantersArr[0])
    })
    .catch((err) => res.status(401).send(`error getting planters ${uuid} ${err.message}`))
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const planter = {
    uuid: req.body.uuid,
    name: req.body.name,
    plot_uuid: req.body.plot_uuid,
    image_uuid: req.body.image_uuid,
    is_active: req.body.is_active,
    date_added: req.body.date_added
  }

  await db
    .collection('planters')
    .doc(uuid)
    .update(planter)
    .then(() => res.status(201).send(`successfully added planter ${uuid}`))
    .catch((err) => res.status(401).send(`error updating planter ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('planters')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted planter ${uuid}`))
    .catch((err) => res.status(401).send(`error deleting planter ${uuid} ${err.message}`))
})

export default handler