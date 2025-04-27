import { notifyClients } from '../utils/sseManager'

export const initTrafficEventService = (data) => {
  setInterval(() => {
    notifyClients(data)
  }, 3000)
}
