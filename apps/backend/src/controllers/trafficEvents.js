import { db as Models } from '../models/index.js'
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
export const getTrafficEvents = (req, res) => {
  res.send('respond with a resource')
}

export const subscribeToTrafficEvents = async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const [
    violationsCount,
    violationsByVehicleType,
    trafficViolationByCountry,
    recentTrafficViolations,
    speedViolationsInLastHour
  ] = await Promise.all([
    Models.TrafficEvents.getTrafficViolationCount(),
    Models.TrafficEvents.getTrafficViolationByVehicleType(),
    Models.TrafficEvents.getTrafficViolationByCountry(),
    Models.TrafficEvents.getRecentTrafficViolations(),
    Models.TrafficEvents.getSpeedTrafficViolationsInLastHour()
  ])
  res.write(
    `data: ${JSON.stringify({
      violationsCount,
      violationsByVehicleType,
      trafficViolationByCountry,
      recentTrafficViolations,
      speedViolationsInLastHour
    })}\n\n`
  )

  addClient(res)

  req.on('close', () => {
    removeClient(res)
  })
}
