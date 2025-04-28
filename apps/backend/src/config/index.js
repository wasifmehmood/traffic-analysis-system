import convict from 'convict'
import { STRING } from 'sequelize'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: 8080,
    env: 'PORT',
    arg: 'port'
  },
  host: {
    doc: 'Host of the front end',
    format: STRING,
    default: '',
    env: 'FRONTEND_ENDPOINT'
  },
  appId: {
    doc: 'Application id',
    format: String,
    default: 'traffic-analytics',
    env: 'APP_ID'
  },
  db: {
    host: {
      doc: 'Database host name/IP',
      format: String,
      default: '127.0.0.1',
      env: 'DB_HOST'
    },
    name: {
      doc: 'Database name',
      format: String,
      default: 'database_development',
      env: 'DB_NAME'
    },
    username: {
      doc: 'db user',
      format: String,
      default: 'root',
      env: 'DB_USERNAME'
    },
    password: {
      doc: 'db password',
      format: '*',
      default: null,
      env: 'DB_PASSWORD'
    },
    port: {
      doc: 'db port',
      format: String,
      default: '5432',
      env: 'DB_PORT'
    },
    pool: {
      max: {
        doc: 'Maximum number of connections in the pool',
        format: Number,
        default: 30,
        env: 'DB_POOL_MAX'
      },
      min: {
        doc: 'Minimum number of connections in the pool',
        format: Number,
        default: 5,
        env: 'DB_POOL_MIN'
      },
      idle: {
        doc: 'Maximum time, in milliseconds, that a connection can be idle before being released',
        format: Number,
        default: 10000,
        env: 'DB_POOL_IDLE'
      },
      acquire: {
        doc: 'Maximum time, in milliseconds, to wait for a connection from the pool',
        format: Number,
        default: 30000,
        env: 'DB_POOL_ACQUIRE'
      }
    }
  },
  kafka: {
    brokers: {
      doc: 'Kafka brokers',
      format: String,
      default: 'kafka:9092',
      env: 'KAFKA_BROKERS'
    },
    noOfEvents: {
      doc: 'Number of events to be fetched from kafka',
      format: Number,
      default: 5,
      env: 'KAFKA_NO_OF_EVENTS'
    }
  }
})

// Load environment dependent configuration
const env = config.get('env')
if (env === 'development') {
  config.loadFile(__dirname + '/environments/' + env + '.json')
}

// Perform validation
config.validate({ allowed: 'strict' })
export default config
