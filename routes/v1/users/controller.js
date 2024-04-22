const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const authenticate = async (req, res) => {
  try {
    if (req.validationError) {
      return res.status(400).send(req.validationError)
    }

    const { username, password } = req.body

    const user = await db.User.findOne({
      where: {
        username,
      },
    })

    if (!user) {
      return res.status(401).send({
        message: 'Username or password is incorrect',
      })
    }

    const match = await await bcrypt.compare(password, user.password)

    if (!match) {
      return res.status(401).send({
        message: 'Username or password is incorrect',
      })
    }

    const token = await jwt.sign(
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

const add = async (req, res) => {
  try {
    if (req.validationError) {
      return res.status(400).send(req.validationError)
    }

    const { username, password, userRoleId } = req.body

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await db.User.create({
      username,
      password: hash,
      userRoleId,
    })

    return res.status(201).send(user)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const getAll = async (req, res) => {
  try {
    if (req.validationError) {
      return res.status(400).send(req.validationError)
    }

    const users = await db.User.findAll({
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt'],
      },
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
