import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { notFound } from './middlewares/notFound.js'
import { initTrafficEventService } from './services/trafficEventService.js'
import { dbInitializationPromise } from './models/index.js'
import { logger } from './utils/logger.js'
import { run } from '../scripts/kafkaTrafficEventsProducer.js'

try {
  await dbInitializationPromise()
  logger.info('Database initialized successfully.')
} catch (error) {
  logger.error('Error initializing the database:', error)
  process.exit(1) // Exit the process on database initialization failure
}

const app = express()

app.use(express.static('assets'))
app.use(helmet())

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3001']
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)

// routes
app.use('/api/v1', router)

initTrafficEventService()

app.use(notFound)
app.use(errorHandler)

setTimeout(() => {
  setInterval(() => {
    run(5)
  }, 10000)
}, 10000)

export default app
