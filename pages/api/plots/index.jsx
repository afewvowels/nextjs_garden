import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('plots')
    .orderBy('name')
    .get()
    .then((plots) => {
      let plotsArr = []
      plots.forEach((proto) => plotsArr.push(proto.data()))
      res.status(201).json(plotsArr)
    })
    .catch((err) => res.status(401).send(`error getting plots ${err.message}`))
})

handler.post(async (req, res) => {
  const plot = {
    uuid: req.body.uuid,
    name: req.body.name,
    location: req.body.location,
    description: req.body.description,
    layout_uuid: req.body.layout_uuid,
    date_started: req.body.date_started,
    date_closed: req.body.date_closed
  }

  await db
    .collection('plots')
    .doc(plot.uuid)
    .set(plot)
    .then(() => res.status(201).send(`successfully added plot ${plot.scientific_name}`))
    .catch((err) => res.status(401).send(`error adding plot ${plot.scientific_name} ${err.message}`))
})

export default handler