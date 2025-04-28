import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './routes/index.js'
import { errorHandler } from './middlewares/errorHandler.js'
import { notFound } from './middlewares/notFound.js'
import { initTrafficEventService } from './services/trafficEventService.js'
import { dbInitializationPromise } from './models/index.js'

try {
  await dbInitializationPromise()
  console.log('Database initialized successfully.')
} catch (error) {
  console.error('Error initializing the database:', error)
  process.exit(1) // Exit the process on database initialization failure
}

const app = express()

app.use(express.static('assets'))
app.use(helmet())
app.use(
  express.json({
    limit: '50mb'
  })
)
app.use(express.urlencoded({ limit: '50mb', extended: false }))

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

export default app
