'use strict'
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const loginRepository = require('../../data/repository/login.repository')

const login = async (data) => {
	try {
		// TODO falta agregar el converter para la respuesta
		const userData = await authenticateUser(data.username)
		validatePassword(data.password, userData.P_PASSWORD)
		const token = generateToken(data.username, userData)
		return { token, userData: userData.P_ROL }
	} catch (error) {
		throw error
	}
}

const authenticateUser = async (email) => {
	try {
		const result = await loginRepository.authenticateUser(email)

		logger.info('Validando existencia de usuario')
		if (result.P_CODIGO !== '000') {
			throw { httpCode: 401, code: result.P_CODIGO, message: result.P_MENSAJE }
		}
		logger.info('Usuario existe')
		return result
	} catch (error) {
		throw error
	}
}

const validatePassword = (passwordRQ, passwordBD) => {
	logger.info('Validando password de usuario')
	const validate = bcrypt.compareSync(passwordRQ, passwordBD)
	if (!validate) {
		logger.error('Password invalido')
		throw { httpCode: 401, code: '401', message: 'Credenciales invalidas' }
	}
	logger.info('Password valido')
}

const generateToken = (email, userData) => {
	logger.info('Generando token')
	const { P_ROL } = userData
	const payload = new Object()
	payload.username = email
	payload.rol = P_ROL

	const token = jwt.sign(payload, process.env.JWT_SIGNATURE, { expiresIn: process.env.JWT_EXPIRATION })
	logger.info('Token generado')
	return token
}

module.exports = { login }
