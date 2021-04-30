import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('plants')
    .where('uuid', '==', uuid)
    .get()
    .then((plants) => {
      let plantsArr = []
      plants.forEach(plant => {
        plantsArr.push(plant.data())
      })
      res.status(201).json(plantsArr[0])
    })
    .catch((err) => res.status(401).send(`error getting plants ${uuid} ${err.message}`))
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

  const plant = {
    uuid: req.body.uuid,
    prototype_uuid: req.body.prototype_uuid,
    plot_uuid: req.body.plot_uuid,
    planter_uuid: req.body.planter_uuid,
    image_uuids: req.body.image_uuids,
    date_planted: req.body.date_planted,
    date_harvested: req.body.date_harvested
  }

  await db
    .collection('plants')
    .doc(uuid)
    .update(plant)
    .then(() => res.status(201).send(`successfully added plant ${uuid}`))
    .catch((err) => res.status(401).send(`error updating plant ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('plants')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted plant ${uuid}`))
    .catch((err) => res.status(401).send(`error deleting plant ${uuid} ${err.message}`))
})

export default handler