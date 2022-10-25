'use strict'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const loginRepository = require('../../data/repository/login.repository')
const loginConverter = require('../converter/login.converter')

const login = async (data) => {
  try {
    const userData = await authenticateUser(data.username)
    validatePassword(data.password, userData['@PASSWORD'])
    const tokenData = generateToken(data.username, userData)
    return loginConverter.parseLoginResponse(tokenData, userData)
  } catch (error) {
    throw error
  }
}

const authenticateUser = async (email) => {
  try {
    const result = await loginRepository.authenticateUser(email)
    return result
  } catch (error) {
    throw { httpCode: 401, message: error.message }
  }
}

const validatePassword = (passwordRQ, passwordBD) => {
  const validate = bcrypt.compareSync(passwordRQ, passwordBD)
  if (!validate) {
    logger.error('Password invalido')
    throw { httpCode: 401, message: 'Credenciales inválidas' }
  }
}

const generateToken = (email, userData) => {
  const payload = new Object()
  payload.username = email
  payload.rolId = userData['@ROL']
  payload.rolRescription = userData['@DESCRIPTION']

  const token = jwt.sign(payload, process.env.JWT_SIGNATURE, {
    expiresIn: process.env.JWT_EXPIRATION
  })
  return { token, expiresIn: '36000' }
}

module.exports = { login }
