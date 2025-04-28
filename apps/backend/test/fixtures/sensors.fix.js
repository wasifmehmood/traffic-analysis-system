import { faker } from '@faker-js/faker'
import { db as Models } from '../../src/models/index.js'
import { insertOne as insertAddress } from './addresses.fix'

export const insertOne = async ({
  fk_address_id,
  name = `Sensor-${faker.string.alphanumeric(5)}`,
  description = faker.lorem.sentence(5)
} = {}) => {
  if (!fk_address_id) {
    const address = await insertAddress()
    fk_address_id = address.id
  }

  const sensor = {
    fk_address_id,
    name,
    description
  }

  return Models.Sensors.create(sensor)
}

export const insertMany = async (numberOfSensors = 10) => {
  const sensors = []
  for (let i = 0; i < numberOfSensors; i++) {
    const sensor = await insertOne()
    sensors.push(sensor)
  }
  return sensors
}

export const deleteByIds = async (ids) => {
  await Models.Sensors.destroy({
    where: {
      id: ids
    }
  })
}
