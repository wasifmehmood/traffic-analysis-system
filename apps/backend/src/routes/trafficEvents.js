import express from 'express'
const router = express.Router()

import {
  postTrafficEvent,
  subscribeToTrafficEvents,
  getTrafficEvent,
  getTrafficEvents,
  deleteTrafficEvent
} from '../controllers/trafficEvents.js'

router.post('/', postTrafficEvent)
router.get('/:id', getTrafficEvent)
router.get('/', getTrafficEvents)
router.delete('/:id', deleteTrafficEvent)
router.get('/subscribe', subscribeToTrafficEvents)

export default router
