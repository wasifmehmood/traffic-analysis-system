import { faker } from '@faker-js/faker'
import { db as Models } from '../../src/models/index.js'

export const insertOne = async ({
  name = faker.helpers.arrayElement([
    'Car',
    'Truck',
    'Motorcycle',
    'Bus',
    'Bicycle'
  ])
} = {}) => {
  const vehicleType = {
    name
  }

  return Models.VehicleTypes.create(vehicleType)
}

export const insertMany = async (numberOfVehicleTypes = 10) => {
  const vehicleTypes = []
  for (let i = 0; i < numberOfVehicleTypes; i++) {
    const vehicleType = await insertOne()
    vehicleTypes.push(vehicleType)
  }
  return vehicleTypes
}

export const deleteByIds = async (ids) => {
  await Models.VehicleTypes.destroy({
    where: {
      id: ids
    }
  })
}
