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
        const trafficEvents = await Models.TrafficEvents.insertEvents(batch)
        batch = []
        logger.info('Batch cleared after insertion:', batch.length === 0)
        notifyClients(trafficEvents)
        await consumer.commitOffsets(uncommittedOffsets)
      }
    }
  })
}

setInterval(() => {
  if (batch.length) {
    logger.info(`inserting, clearing and sending... ${batch.length}`)
    const trafficEvents = Models.TrafficEvents.insertEvents(batch)
    batch = []
    notifyClients(trafficEvents)
  }
}, 5000)
