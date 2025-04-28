import { db as Models } from '../models/index.js'
import { Kafka } from 'kafkajs'
import { notifyClients } from '../utils/sseManager.js'

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
    console.log('Kafka consumer connected')
    await consumer.subscribe({ topic: 'traffic-events', fromBeginning: false })
    console.log('Kafka consumer subcscribe')
  } catch (error) {
    console.error('Failed to connect/subcscribe to Kafka:', error)
    return
  }

  consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString())
      batch.push(data)

      if (batch.length >= BATCH_SIZE) {
        const trafficEvents = await Models.TrafficEvents.insertEvents(batch)
        batch = []
        notifyClients(trafficEvents)
      }
    }
  })
}

setInterval(() => {
  if (batch.length) {
    const trafficEvents = Models.TrafficEvents.insertEvents(batch)
    batch = []
    notifyClients(trafficEvents)
  }
}, 5000)
