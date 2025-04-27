import config from './index.js'

export default {
  dialect: 'postgres',
  database: config.get('db.name'),
  username: config.get('db.username'),
  password: config.get('db.password'),
  host: config.get('db.host'),
  port: config.get('db.port')
}
