import pino from 'pino'
import config from '../config/index.js'

export const logger = pino({
  name: config.get('appId'),
  level: 'debug'
})
