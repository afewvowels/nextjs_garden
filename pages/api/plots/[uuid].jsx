import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('plots')
    .where('uuid', '==', uuid)
    .get()
    .then((plots) => {
      let plotsArr = []
      plots.forEach(plot => {
        plotsArr.push(plot.data())
      })
      res.status(201).json(plotsArr[0])
    })
    .catch((err) => res.status(401).send(`error getting plots ${uuid} ${err.message}`))
})

handler.post(async (req, res) => {
  const {
    query: { uuid }
  } = req

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
    .doc(uuid)
    .update(plot)
    .then(() => res.status(201).send(`successfully added plot ${uuid}`))
    .catch((err) => res.status(401).send(`error updating plot ${uuid} ${err.message}`))
})

handler.delete(async (req, res) => {
  const {
    query: { uuid }
  } = req

  await db
    .collection('plots')
    .doc(uuid)
    .delete()
    .then(() => res.status(201).send(`successfully deleted plot ${uuid}`))
    .catch((err) => res.status(401).send(`error deleting plot ${uuid} ${err.message}`))
})

export default handler