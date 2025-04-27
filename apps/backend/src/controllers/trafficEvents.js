import Models from '../models/index.js'

export const postTrafficEvent = async (req, res) => {
  const {
    metadata,
    fk_sensor_id,
    fk_violation_id,
    fk_address_id,
    fk_vehicle_type_id,
    speed_kph
  } = req.body

  const trafficEvents = await Models.TrafficEvents.insertEvent({
    metadata,
    fk_sensor_id,
    fk_violation_id,
    fk_address_id,
    fk_vehicle_type_id,
    speed_kph
  })

  res.status(201).json({
    status: 'success',
    data: trafficEvents
  })
}
export const getTrafficEvents = (req, res) => {
  res.send('respond with a resource')
}
