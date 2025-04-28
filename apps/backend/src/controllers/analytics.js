import { db as Models } from '../models/index.js'
import { logger } from '../utils/logger.js'

export const getAnalytics = async (req, res) => {
  try {
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

    res.status(200).json({
      status: 'success',
      data: {
        violationsCount,
        violationsByVehicleType,
        trafficViolationByCountry,
        recentTrafficViolations,
        speedViolationsInLastHour
      }
    })
  } catch (error) {
    logger.error(`Error getting analytics: ${error}`)
    res.status(500).json({
      status: 'error',
      message: 'Error getting analytics'
    })
  }
}
