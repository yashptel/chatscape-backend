const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('../../../lib/firebase')
const _ = require('lodash')

const authenticate = async (req, res) => {
  try {
    if (req.validationError) {
      return res.status(400).send(req.validationError)
    }

    const { username, password } = req.body

    const exists = await db
      .collection('users')
      .where('username', '==', username)
      .get()

    if (exists.empty) {
      return res.status(401).send({
        message: 'Username or password is incorrect',
      })
    }

    const user = _.first(exists.docs).data()

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).send({
        message: 'Username or password is incorrect',
      })
    }

    const token = jwt.sign(
      {
        id: user.id,
        userRoleId: user.userRoleId,
      },
      process.env.JWT_SECRET || 'secret',
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      }
    )

    return res.status(200).send({ token })
  } catch (error) {
    return res.status(500).send(error)
  }
}

/**
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 * @returns {Promise<import('fastify').FastifyReply>}
 */
const add = async (req, res) => {
  try {
    if (req.validationError) {
      return res.status(400).send(req.validationError)
    }

    const { username, password, userRoleId } = req.body

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const exists = await db
      .collection('users')
      .where('username', '==', username)
      .get()

    if (!exists.empty) {
      return res.status(400).send({
        message: 'Username already exists',
      })
    }

    const doc = await db.collection('users').add({
      username,
      password: hash,
      userRoleId,
    })
    const snapshot = await doc.get()

    return res.status(201).send({
      id: snapshot.id,
      ...snapshot.data(),
    })
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getAll = async (req, res) => {
  try {
    if (req.validationError) {
      return res.status(400).send(req.validationError)
    }

    const snapshot = await db.collection('users').get()
    const users = []

    snapshot.forEach((doc) => {
      const data = doc.data()
      data.id = doc.id
      delete data.password
      users.push(data)
    })

    return res.status(200).send(users)
  } catch (error) {
    return res.status(500).send(error)
  }
}

module.exports = {
  authenticate,
  getAll,
  add,
}
