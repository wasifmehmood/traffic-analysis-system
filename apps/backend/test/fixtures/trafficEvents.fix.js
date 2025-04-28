import { faker } from '@faker-js/faker'
import { db as Models } from '../../src/models/index.js'
import { insertOne as insertSensor } from './sensors.fix'
import { insertOne as insertViolation } from './violations.fix'
import { insertOne as insertVehicleType } from './vehicleType.fix'

export const insertOne = async ({
  fk_sensor_id,
  fk_violation_id,
  fk_vehicle_type_id,
  metadata = JSON.stringify({
    license_plate: faker.vehicle.vrm(),
    vehicle_color: faker.color.human(),
    registered_name: faker.person.fullName(),
    camera_id: faker.string.alphanumeric(8),
    timestamp: faker.date.recent({ days: 10 }).toISOString(),
    vehicle_make: faker.vehicle.manufacturer(),
    vehicle_model: faker.vehicle.model()
  }),
  speed_kph = faker.number.float({ min: 30, max: 180, precision: 0.1 })
} = {}) => {
  if (!fk_sensor_id) {
    const sensor = await insertSensor()
    fk_sensor_id = sensor.id
  }
  if (!fk_violation_id) {
    const violation = await insertViolation()
    fk_violation_id = violation.id
  }
  if (!fk_vehicle_type_id) {
    const vehicleType = await insertVehicleType()
    fk_vehicle_type_id = vehicleType.id
  }

  const events = {
    fk_sensor_id,
    fk_violation_id,
    fk_vehicle_type_id,
    metadata,
    speed_kph
  }

  return Models.TrafficEvents.create(events)
}

export const insertMany = async (numberOfEvents = 10) => {
  const events = []
  for (let i = 0; i < numberOfEvents; i++) {
    const event = await insertOne()
    events.push(event)
  }
  return events
}

export const deleteByIds = async (ids) => {
  await Models.TrafficEvents.destroy({
    where: {
      id: ids
    }
  })
}
