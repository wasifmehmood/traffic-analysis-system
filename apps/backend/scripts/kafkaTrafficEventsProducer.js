import { Kafka } from 'kafkajs'
import { faker } from '@faker-js/faker'
import { ulid } from 'ulid'

const kafka = new Kafka({
  clientId: 'traffic-events',
  brokers: ['kafka:9092']
})

const producer = kafka.producer()

const generateTrafficEvents = () => {
  return {
    id: ulid(),
    fk_sensor_id: faker.number.int({ min: 1, max: 80 }),
    fk_violation_id: faker.number.int({ min: 1, max: 5 }),
    fk_vehicle_type_id: faker.number.int({ min: 1, max: 5 }),
    metadata: JSON.stringify({
      license_plate: faker.vehicle.vrm(),
      vehicle_color: faker.color.human(),
      registered_name: faker.person.fullName(),
      camera_id: faker.string.alphanumeric(8),
      timestamp: faker.date.recent({ days: 10 }).toISOString(),
      vehicle_make: faker.vehicle.manufacturer(),
      vehicle_model: faker.vehicle.model()
    }),
    speed_kph: faker.number.float({ min: 0, max: 180, precision: 0.1 }),
    created_at: new Date(),
    updated_at: new Date()
  }
}

const sendTrafficEvents = async (numEvents) => {
  const messages = []
  for (let i = 0; i < numEvents; i++) {
    const trafficEventData = generateTrafficEvents()
    messages.push({
      value: JSON.stringify(trafficEventData)
    })
  }
  try {
    await producer.send({
      topic: 'traffic-events',
      messages: messages
    })
    console.log('successfullu sent traffic events', messages.length)
  } catch (error) {
    console.log('Error sending events', error)
  }
}

const run = async () => {
  await producer.connect()
  await sendTrafficEvents(500)
  await producer.disconnect()
}

run()
