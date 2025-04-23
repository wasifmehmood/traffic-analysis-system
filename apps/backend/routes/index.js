import express from 'express'
const router = express.Router()

// Routers
import analyticsRouter from './analytics.js'

router.use('/analytics', analyticsRouter)

export default router
