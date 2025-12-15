const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const PORT = process.env.PORT || 8080

server.use(middlewares)
server.use(router)

server.listen(PORT, '0.0.0.0', () => {
  console.log(`JSON Server rodando na porta ${PORT}`)
})
