const fp = require("fastify-plugin");

module.exports = fp(async (fastify, opts) => {
  fastify.register(require("@fastify/swagger"), {
    routePrefix: "/documentation",

    swagger: {
      info: {
        title: "ChatScape API",
        description: "ChatScape API documentation",
        version: "0.1.0",
      },
      securityDefinitions: {
        ApiToken: {
          description: 'Authorization header token, sample: "Bearer #TOKEN#"',
          type: "apiKey",
          name: "Authorization",
          in: "header",
        },
      },
      host: process.env.APP_HOST || "localhost:3000",
      schemes: ["https", "http"],
      consumes: ["application/json"],
      produces: ["application/json"],
    },
    hideUntagged: true,
    exposeRoute: true,
  });
});
