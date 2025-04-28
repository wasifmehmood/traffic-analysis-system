import express from 'express'
const router = express.Router()

// Routers
import trafficEventsRouter from './trafficEvents.js'
import analyticsRouter from './analytics.js'

router.use('/traffic-events', trafficEventsRouter)
router.use('/analytics', analyticsRouter)

export default router
