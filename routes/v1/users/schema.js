// schema
const authenticate = {
  description: 'Authenticate a user',
  tags: ['Users'],
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
    },
    required: ['username', 'password'],
  },
  response: {
    200: {
      type: 'object',
      properties: {
        token: { type: 'string' },
      },
    },
  },
}

const add = {
  description: 'Add a user',
  tags: ['Users'],
  body: {
    type: 'object',
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      userRoleId: { type: 'integer' },
    },
    required: ['username', 'password', 'userRoleId'],
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        username: { type: 'string' },
        userRoleId: { type: 'integer' },
      },
    },
  },
}

const getAll = {
  description: 'Get all users',
  tags: ['Users'],
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          username: { type: 'string' },
          userRoleId: { type: 'integer' },
        },
      },
    },
  },
}

module.exports = {
  authenticate,
  add,
  getAll,
}
