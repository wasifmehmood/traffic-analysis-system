import { db as Models } from '../models/index.js'
import { addClient, removeClient } from '../utils/sseManager.js'
import { logger } from '../utils/logger.js'

export const postTrafficEvent = async (req, res) => {
  const {
    metadata,
    fk_sensor_id,
    fk_violation_id,
    fk_address_id,
    fk_vehicle_type_id,
    speed_kph
  } = req.body

  try {
    if (!metadata || !fk_sensor_id || !fk_violation_id || !fk_address_id) {
      logger.error('[postTrafficEvent] Missing required fields')
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      })
    }

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
  } catch (error) {
    logger.error(`[postTrafficEvent] Error creating traffic event: ${error}`)
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}
export const getTrafficEvents = async (req, res) => {
  try {
    const trafficEvents = await Models.TrafficEvents.findAll({
      limit: 100
    })

    res.json({
      status: 'success',
      data: trafficEvents
    })
  } catch (error) {
    logger.error(`[getTrafficEvents] Error getting traffic events: ${error}`)
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

export const deleteTrafficEvent = async (req, res) => {
  try {
    const id = req.params.id
    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      })
    }
    const trafficEvents = await Models.TrafficEvents.destroy({
      where: { id: id }
    })
    if (trafficEvents) {
      res.json({
        status: 'success',
        message: 'Violation deleted successfully'
      })
    } else {
      res.status(404).json({
        status: 'error',
        message: 'Violation not found'
      })
    }
  } catch (error) {
    logger.error(`[deleteTrafficEvents] Error deleting traffic event: ${error}`)
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

export const getTrafficEvent = async (req, res) => {
  try {
    const id = req.params.id
    logger.info(`[getTrafficEvent] Getting traffic event with id: ${id}`)
    if (!id) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      })
    }
    const trafficEvents = await Models.TrafficEvents.findAll({
      where: { id: id }
    })

    if (!trafficEvents) {
      return res.status(404).json({
        status: 'error',
        message: 'Violation not found'
      })
    }

    res.json({
      status: 'success',
      data: trafficEvents
    })
  } catch (error) {
    logger.error(`[getTrafficEvent] Error getting traffic event: ${error}`)
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error'
    })
  }
}

export const subscribeToTrafficEvents = async (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    res.flushHeaders()

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

    const heartbeatId = setInterval(() => {
      res.write(':keep-alive\n\n')
    }, 20000)

    addClient(res)

    req.on('close', () => {
      clearInterval(heartbeatId)
      removeClient(res)
      res.end()
    })
  } catch (error) {
    logger.error(
      `[subscribeToTrafficEvents] Error subscribing to traffic events: ${error}`
    )
    res.end()
  }
}
