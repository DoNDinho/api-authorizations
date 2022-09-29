'use strict'
const jwt = require('jsonwebtoken')
const JWT_SIGNATURE = process.env.JWT_SIGNATURE

const execute = async (token) => {
	try {
		jwt.verify(token, JWT_SIGNATURE)
	} catch (error) {
		logger.error('Password invalido')
		throw { httpCode: 401, message: 'Token invalido' }
	}
}

module.exports = { execute }
