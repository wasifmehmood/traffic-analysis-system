import config from './config/index.js'
import app from './app.js'
import { spawnSync } from 'child_process'
;(() => {
  if (config.get('env') === 'production') {
    spawnSync('npx', ['sequelize', 'db:create'], {
      stdio: 'inherit'
    })
    const migrationProcess = spawnSync('npx', ['sequelize', 'db:migrate'], {
      stdio: 'inherit'
    })
    if (migrationProcess.error) {
      console.error(
        'Error running Sequelize migrations:',
        migrationProcess.error
      )
      process.exit(1)
    }
  }
  app.listen(config.get('port'), () => {
    console.info(`Server running on port: ${config.get('port')}`)
  })
})()
