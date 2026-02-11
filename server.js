const fastify = require('fastify')({ logger: true })


// Swagger core
fastify.register(require('@fastify/swagger'), {
    exposeRoute : true,
    routePrefix: '/docs',
    swagger: {
    info: {
        title: 'Fastify API',
    }
  }
})

// // Swagger UI
fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs'
})


// Routes
fastify.register(require('./routes/items'))

const PORT = 3000

const start = async () => {
  try {
    await fastify.listen({ port: PORT })
    console.log(`Server listening on http://localhost:${PORT}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()
