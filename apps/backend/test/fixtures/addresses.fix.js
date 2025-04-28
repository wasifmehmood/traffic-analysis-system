import { faker } from '@faker-js/faker'
import { db as Models } from '../../src/models/index.js'
import { insertOne as insertCountry } from './countries.fix'

export const insertOne = async ({
  fk_country_id,
  name = faker.location.country(),
  iso_code = faker.number.int({ min: 1, max: 999 }),
  street_name = faker.location.street(),
  city = faker.location.city(),
  state = faker.location.state(),
  zip_code = faker.location.zipCode(),
  longitude = parseFloat(faker.location.longitude({ max: 180, min: -180 })),
  latitude = parseFloat(faker.location.latitude({ max: 90, min: -90 }))
} = {}) => {
  if (!fk_country_id) {
    const country = await insertCountry({ name, iso_code })
    fk_country_id = country.id
  }

  const address = {
    fk_country_id,
    street_name,
    city,
    state,
    zip_code,
    longitude,
    latitude
  }

  return Models.Addresses.create(address)
}

export const insertMany = async (numberOfAddresses = 10) => {
  const addresses = []
  for (let i = 0; i < numberOfAddresses; i++) {
    const address = await insertOne()
    addresses.push(address)
  }
  return addresses
}

export const deleteByIds = async (ids) => {
  await Models.Addresses.destroy({
    where: {
      id: ids
    }
  })
}
