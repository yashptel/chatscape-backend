const schema = require('./schema')
const controller = require('./controller')

module.exports = async function (fastify, opts) {
  fastify.route({
    method: 'POST',
    url: '/authenticate',
    schema: schema.authenticate,
    handler: controller.authenticate,
  })

  fastify.route({
    method: 'POST',
    url: '/',
    schema: schema.add,
    handler: controller.add,
  })

  fastify.route({
    method: 'GET',
    url: '/',
    // schema: schema.getAll,
    handler: controller.getAll,
  })
}
