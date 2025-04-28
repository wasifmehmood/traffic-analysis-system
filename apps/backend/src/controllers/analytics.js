import { db as Models} from '../models/index.js'
import { addClient, removeClient } from '../utils/sseManager.js'

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
export const getAnalytics = async (req, res) => {
  const [
    violationsCount,
    analytics,
    trafficViolationByCountry
  ] = await Promise.all([
    Models.TrafficEvents.getTrafficViolationCount(),
    Models.TrafficEvents.getTrafficViolationAnalytics(),
    Models.TrafficEvents.getTrafficViolationByCountry()
  ])

  res.status(200).json({
    status: 'success',
    data: {
      violationsCount,
      analytics,
      trafficViolationByCountry
    }
  })
}

export const subscribeToTrafficEvents = async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const initialData = await Models.TrafficEvents.findAll({ raw: true })
  res.write(`data: ${JSON.stringify(initialData)}\n\n`)

  addClient(res)

  req.on('close', () => {
    removeClient(res)
  })
}
