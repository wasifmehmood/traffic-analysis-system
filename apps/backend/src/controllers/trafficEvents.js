import Models from '../models/index.js'
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

export const subscribeToTrafficEvents = (req, res) => {
  res.send('respond with a resource')
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  addClient(res)

  req.on('close', () => {
    removeClient(res)
  })
  // Send an initial message
  res.write(`data: Connected to server\n\n`)
}
