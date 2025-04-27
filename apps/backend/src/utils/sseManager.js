const clients = []

export const addClient = (client) => {
  clients.push(client)
}

export const removeClient = (client) => {
  clients.splice(clients.indexOf(client), 1)
}

export const notifyClients = (data) => {
  if (!data) return
  const payload = JSON.stringify(data)
  clients.forEach((client) => {
    return client.write(`data: ${payload}\n\n`)
  })
}
