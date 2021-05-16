import fastify from 'fastify'
import fastifyStaticPlugin from 'fastify-static'
import fastifyWebSocketPlugin from 'fastify-websocket'
import config from './config.js'
import { pingPongHandler, cameraHandler } from './handlers.js'

const fastifyServer = fastify({
    logger: config.logger,
    /**
     http2: true,
     https: {
       key: config.sslKey,
       cert: config.sslCert
     }
    */
})

fastifyServer.register(fastifyStaticPlugin, {
  root: config.staticRootPath
})

fastifyServer.register(fastifyWebSocketPlugin, {
  options: {
    clientTracking: true
  },  
  errorHandler: function (error, connection, request, reply) {
    connection.destroy(error)
  }
})

fastifyServer.get('*', (request, reply) => {
  return reply.sendFile('index.html')
})

fastifyServer.route({
  method: 'GET',
  url: '/api/camera',
  handler (request, reply) {
    return {
      status: 'success',
      data: 'Please change protocol to ws'
    }
  },
  wsHandler (connection, request) {
    /**
     * ascii | utf8 | utf-8 | utf16le | ucs2 | ucs-2 |
     * base64 | base64url | latin1 | binary | hex
     */
    connection.setEncoding('utf8')
    connection.socket.on('close', () => {})

    pingPongHandler(connection)
    cameraHandler(connection)
  }
})

fastifyServer.get('/api/version', async (request, reply) => {
    return {
      status: 'success',
      data: config.packageVersion 
    }
})

const start = async () => {
  try {
    await fastifyServer.listen(config.httpPort)
  } catch (error) {
    fastifyServer.log.error(error)
    process.exit(1)
  }
}

start()