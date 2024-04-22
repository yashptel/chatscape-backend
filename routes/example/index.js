"use strict";

/**
 * @param {import('fastify').FastifyInstance} fastify
 */
module.exports = async function (fastify, opts) {
  fastify.get("/", async function (request, reply) {
    return "this is an example";
  });
};
