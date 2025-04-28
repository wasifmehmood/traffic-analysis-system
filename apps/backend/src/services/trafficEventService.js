import { db as Models } from '../models/index.js'
import { Kafka } from 'kafkajs'
import { notifyClients } from '../utils/sseManager.js'
import { logger } from '../utils/logger.js'

const BATCH_SIZE = 50
let batch = []

export const initTrafficEventService = async () => {
  const kafkaConsumer = new Kafka({
    clientId: 'traffic-events',
    brokers: ['kafka:9092']
  })

  const consumer = kafkaConsumer.consumer({ groupId: 'traffic-events' })

  try {
    await consumer.connect()
    logger.info('Kafka consumer connected')
    await consumer.subscribe({ topic: 'traffic-events', fromBeginning: false })
    logger.info('Kafka consumer subcscribe')
  } catch (error) {
    logger.error('Failed to connect/subcscribe to Kafka:', error)
    return
  }

  consumer.run({
    eachMessage: async ({ message, uncommittedOffsets }) => {
      const data = JSON.parse(message.value.toString())
      batch.push(data)

      if (batch.length >= BATCH_SIZE) {
        logger.info(`Batch reached size, inserting... ${data}`)
        await Models.TrafficEvents.insertEvents(batch)
        batch = []
        await getAnalyticsAndNotify()
        logger.info('Batch cleared after insertion:', batch.length === 0)
        await consumer.commitOffsets(uncommittedOffsets)
      }
    }
  })
}

setInterval(async () => {
  if (batch.length) {
    logger.info(`inserting, clearing and sending... ${batch.length}`)
    await Models.TrafficEvents.insertEvents(batch)
    batch = []
    await getAnalyticsAndNotify()
  }
}, 5000)

const getAnalyticsAndNotify = async () => {
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
  notifyClients({
    violationsCount,
    violationsByVehicleType,
    trafficViolationByCountry,
    recentTrafficViolations,
    speedViolationsInLastHour
  })
  return
}
