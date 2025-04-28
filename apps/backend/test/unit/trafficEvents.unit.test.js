/* eslint-disable no-undef */
import request from 'supertest'
import { insertOne as insertEvents } from '../fixtures/trafficEvents.fix'

describe('Traffic Events', () => {
  let events
  beforeAll(async () => {
    events = await insertEvents()
  })

  afterAll(async () => {})

  it('should get all traffic events', async () => {
    const response = await request('http://localhost:3000').get(
      '/v1/traffic-events/'
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('status', 'success')
    expect(response.data).toHaveLength(events.length)
  })

  it('should get one traffic event', async () => {
    const response = await request('http://localhost:3000').get(
      `/v1/traffic-events/${events[0].id}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('status', 'success')
    expect(response.data).toHaveLength(1)
  })

  it('should fail to get one traffic event with message', async () => {
    const response = await request('http://localhost:3000').get(
      `/v1/traffic-events/non-existing-id`
    )
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'error')
    expect(response.body).toHaveProperty('message', 'Missing required fields')
  })

  it('should delete one traffic event', async () => {
    const response = await request('http://localhost:3000').delete(
      `/v1/traffic-events/${events[0].id}`
    )
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('status', 'error')
  })

  it('should insert one traffic event', async () => {
    const response = await request('http://localhost:3000').post(
      '/v1/traffic-events/',
      {
        fk_sensor_id: 3,
        fk_violation_id: 1,
        fk_address_id: 2,
        fk_vehicle_type_id: 1,
        speed_kph: 240,
        metadata: {
          license_plate: 'FDA 2231'
        }
      }
    )
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('status', 'success')
  })

  it('should fail with missing required fields', async () => {
    const response = await request('http://localhost:3000').post(
      '/v1/traffic-events/',
      {
        fk_violation_id: 1,
        fk_address_id: 2,
        fk_vehicle_type_id: 1,
        speed_kph: 240,
        metadata: {
          license_plate: 'FDA 2231'
        }
      }
    )
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('status', 'error')
    expect(response.body).toHaveProperty('message', 'Missing required fields')
  })
})
