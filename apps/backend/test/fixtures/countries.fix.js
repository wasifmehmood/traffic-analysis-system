import { faker } from '@faker-js/faker'
import { db as Models } from '../../src/models/index.js'

const insertOne = async ({
  name = faker.location.country(),
  iso_code = faker.number.int({ min: 1, max: 999 })
} = {}) => {
  const country = {
    name,
    iso_code
  }

  return Models.Countries.create(country)
}

const insertMany = async (numberOfCountries = 10) => {
  const countries = []
  for (let i = 0; i < numberOfCountries; i++) {
    const country = await insertOne()
    countries.push(country)
  }
  return countries
}

const deleteByIds = async (ids) => {
  await Models.Countries.destroy({
    where: {
      id: ids
    }
  })
}

export { insertOne, insertMany, deleteByIds }
