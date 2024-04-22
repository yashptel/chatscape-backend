const fp = require("fastify-plugin");

module.exports = fp(async (fastify, opts) => {
  fastify.register(require("@fastify/jwt"), {
    secret: process.env.JWT_SECRET || "secret",
  });

  fastify.decorate("authenticate", async (request, reply) => {
    try {
      const decoded = await request.jwtVerify();

      // attach decoded user id to req object
      request.credentials = {
        id: decoded.id,
        userRoleId: decoded.userRoleId,
      };
    } catch (err) {
      reply.send(err);
    }
  });
});
