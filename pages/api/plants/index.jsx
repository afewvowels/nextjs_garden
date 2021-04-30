import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('plants')
    .orderBy('date_planted')
    .get()
    .then((plants) => {
      let plantsArr = []
      plants.forEach((proto) => plantsArr.push(proto.data()))
      res.status(201).json(plantsArr)
    })
    .catch((err) => res.status(401).send(`error getting plants ${err.message}`))
})

handler.post(async (req, res) => {
  const plant = {
    uuid: req.body.uuid,
    plant_uuid: req.body.plant_uuid,
    plot_uuid: req.body.plot_uuid,
    planter_uuid: req.body.planter_uuid,
    image_uuids: req.body.image_uuids,
    date_planted: req.body.date_planted,
    date_harvested: req.body.date_harvested
  }

  await db
    .collection('plants')
    .doc(plant.uuid)
    .set(plant)
    .then(() => res.status(201).send(`successfully added plant ${plant.scientific_name}`))
    .catch((err) => res.status(401).send(`error adding plant ${plant.scientific_name} ${err.message}`))
})

export default handler