import config from './config/index.js'
import app from './app.js'

app.listen(config.get('port'), () => {
  console.info(`Server running on port: http://localhost:${config.get('port')}`)
})
