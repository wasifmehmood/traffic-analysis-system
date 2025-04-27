import { notifyClients } from '../utils/sseManager.js'

export const initTrafficEventService = (data) => {
  setInterval(() => {
    notifyClients(data)
  }, 3000)
}
