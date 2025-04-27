import express from 'express'
const router = express.Router()

// Routers
import trafficEventsRouter from './trafficEvents.js'
import analyticsRouter from './trafficEvents.js'

router.use('/traffic-events', trafficEventsRouter)
router.use('/analytics', analyticsRouter)

export default router
