'use strict'
// AI Generated Seed
import { faker } from '@faker-js/faker'
import { ulid } from 'ulid'

/** @type {import('sequelize-cli').Seeder} */
export default {
  async up(queryInterface, Sequelize) {
    // Create many countries
    const countryData = Array.from({ length: 5 }).map(() => ({
      name: faker.location.country(),
      iso_code: faker.number.int({ min: 1, max: 999 }),
      created_at: new Date(),
      updated_at: new Date()
    }))

    const countries = await queryInterface.bulkInsert(
      'countries',
      countryData,
      { returning: true }
    )

    // Create many addresses
    const addressData = Array.from({ length: 50 }).map(() => ({
      fk_country_id: faker.helpers.arrayElement(countries).id,
      street_name: faker.location.street(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip_code: faker.location.zipCode(),
      longitude: parseFloat(faker.location.longitude({ max: 180, min: -180 })),
      latitude: parseFloat(faker.location.latitude({ max: 90, min: -90 })),
      created_at: new Date(),
      updated_at: new Date()
    }))

    const addresses = await queryInterface.bulkInsert(
      'addresses',
      addressData,
      { returning: true }
    )

    // Create many sensors
    const sensorData = Array.from({ length: 80 }).map(() => ({
      fk_address_id: faker.helpers.arrayElement(addresses).id,
      name: `Sensor-${faker.string.alphanumeric(5)}`,
      description: faker.lorem.sentence(5),
      created_at: new Date(),
      updated_at: new Date()
    }))

    const sensors = await queryInterface.bulkInsert('sensors', sensorData, {
      returning: true
    })

    // Create many vehicle types
    const vehicleTypeNames = ['Car', 'Truck', 'Motorcycle', 'Bus', 'Bicycle']
    const vehicleTypeData = vehicleTypeNames.map((name) => ({
      name,
      created_at: new Date(),
      updated_at: new Date()
    }))

    const vehicleTypes = await queryInterface.bulkInsert(
      'vehicle_types',
      vehicleTypeData,
      { returning: true }
    )

    // Create many violations
    const violationNames = [
      'Speeding',
      'Red Light',
      'Illegal Parking',
      'No Helmet',
      'Wrong Way Driving'
    ]
    const violationData = violationNames.map((name) => ({
      name,
      created_at: new Date(),
      updated_at: new Date()
    }))

    const violations = await queryInterface.bulkInsert(
      'violations',
      violationData,
      { returning: true }
    )

    // Create many traffic events
    const trafficEventData = Array.from({ length: 150 }).map(() => ({
      id: ulid(),
      fk_sensor_id: faker.helpers.arrayElement(sensors).id,
      fk_violation_id: faker.helpers.arrayElement(violations).id,
      fk_vehicle_type_id: faker.helpers.arrayElement(vehicleTypes).id,
      metadata: JSON.stringify({
        license_plate: faker.vehicle.vrm(),
        vehicle_color: faker.color.human(),
        registered_name: faker.person.fullName(),
        camera_id: faker.string.alphanumeric(8),
        timestamp: faker.date.recent({ days: 10 }).toISOString(),
        vehicle_make: faker.vehicle.manufacturer(),
        vehicle_model: faker.vehicle.model()
      }),
      speed_kph: faker.number.float({ min: 30, max: 180, precision: 0.1 }),
      created_at: new Date(),
      updated_at: new Date()
    }))

    await queryInterface.bulkInsert('traffic_events', trafficEventData)
  },

  async down(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.bulkDelete('traffic_events', null, {}),
      queryInterface.bulkDelete('violations', null, {}),
      queryInterface.bulkDelete('vehicle_types', null, {}),
      queryInterface.bulkDelete('sensors', null, {}),
      queryInterface.bulkDelete('addresses', null, {}),
      queryInterface.bulkDelete('countries', null, {})
    ])
  }
}
