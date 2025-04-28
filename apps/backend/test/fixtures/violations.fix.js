import { faker } from '@faker-js/faker'
import { db as Models } from '../../src/models/index.js'

export const insertOne = async ({
  name = faker.helpers.arrayElement([
    'Speeding',
    'Red Light',
    'Illegal Parking',
    'No Helmet',
    'Wrong Way Driving'
  ])
} = {}) => {
  const violation = {
    name
  }

  return Models.Violations.create(violation)
}

export const insertMany = async (numberOfViolations = 10) => {
  const violations = []
  for (let i = 0; i < numberOfViolations; i++) {
    const violation = await insertOne()
    violations.push(violation)
  }
  return violations
}

export const deleteByIds = async (ids) => {
  await Models.Violations.destroy({
    where: {
      id: ids
    }
  })
}
