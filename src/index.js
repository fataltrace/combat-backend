import fastify from 'fastify'
import fastifyStaticPlugin from 'fastify-static'
import config from './config.js'

const fastifyServer = fastify({
    logger: config.logger
})

fastifyServer.register(fastifyStaticPlugin, {
  root: config.staticRootPath
})

fastifyServer.get('*', (request, reply) => {
  return reply.sendFile('index.html')
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