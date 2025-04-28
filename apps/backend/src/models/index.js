import { readdirSync } from 'fs'
import { dirname, join } from 'path'
import { Sequelize } from 'sequelize'
import config from '../config/index.js'
import { fileURLToPath } from 'url'
import { camelCase, upperFirst } from 'lodash-es'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

let sequelize = new Sequelize(
  config.get('db.name'),
  config.get('db.username'),
  config.get('db.password'),
  {
    host: config.get('db.host'),
    port: config.get('db.port'),
    dialect: 'postgres',
    pool: {
      max: config.get('db.pool.max'),
      min: config.get('db.pool.min'),
      acquire: config.get('db.pool.acquire'),
      idle: config.get('db.pool.idle')
    },
    logging: config.get('env') === 'development' ? console.info : false,
    define: {
      timestamps: true
    }
  }
)

const db = {}

const initializeDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.info('Connection has been established successfully.')
  } catch (err) {
    console.error('Unable to connect to the database:', err)
    throw err
  }

  const modelFiles = readdirSync(__dirname).filter((file) =>
    file.endsWith('.model.js')
  )

  for (const file of modelFiles) {
    const model = (await import(join(__dirname, file))).default(
      sequelize,
      Sequelize.DataTypes
    )
    let name = upperFirst(camelCase(model.name))
    db[name] = model
  }

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db)
    }
  })

  db.sequelize = sequelize
  db.Sequelize = Sequelize
}

const dbInitializationPromise = initializeDatabase

// Exporting the promise so it can be awaited
export { dbInitializationPromise, db }
