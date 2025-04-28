import express from 'express'
const router = express.Router()

import { getAnalytics } from '../controllers/analytics.js'

router.get('/', getAnalytics)

export default router
