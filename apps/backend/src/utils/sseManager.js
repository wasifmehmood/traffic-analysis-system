const clients = []

export const addClient = (client) => {
  clients.push(client)
}

export const removeClient = (client) => {
  clients.splice(clients.indexOf(client), 1)
}

export const notifyClients = (data) => {
  const payload = JSON.stringify(data)
  console.log('notifying', payload)
  clients.forEach((client) => {
    client.write(payload)
  })
}
