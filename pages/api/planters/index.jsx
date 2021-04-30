import db from '@db/firebase'
import nc from 'next-connect'

const handler = nc()

handler.get(async (req, res) => {
  await db
    .collection('planters')
    .orderBy('name')
    .get()
    .then((planters) => {
      let plantersArr = []
      planters.forEach((planter) => plantersArr.push(planter.data()))
      res.status(201).json(plantersArr)
    })
    .catch((err) => res.status(401).send(`error getting planters ${err.message}`))
})

handler.post(async (req, res) => {
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
    .doc(planter.uuid)
    .set(planter)
    .then(() => res.status(201).send(`successfully added planter ${planter.name}`))
    .catch((err) => res.status(401).send(`error adding planter ${planter.name} ${err.message}`))
})

export default handler