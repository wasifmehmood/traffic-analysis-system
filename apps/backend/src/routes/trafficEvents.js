import express from 'express'
const router = express.Router()

import { postTrafficEvent } from '../controllers/trafficEvents.js'

router.post('/', postTrafficEvent)

export default router
