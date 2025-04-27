import express from 'express'
const router = express.Router()

import {
  postTrafficEvent,
  subscribeToTrafficEvents
} from '../controllers/trafficEvents.js'

router.post('/', postTrafficEvent)
router.post('/subscribe', subscribeToTrafficEvents)

export default router
