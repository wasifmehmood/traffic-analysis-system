import pino from 'pino'
import config from '../config'

export const logger = pino({
  name: config.get('appId'),
  level: config.get('logLevel') || 'debug'
})
