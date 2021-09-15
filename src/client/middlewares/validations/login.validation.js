'use strict'
const express = require('express')
const loginValidation = express.Router()
const Ajv = require('ajv')
const loginSchema = require('./models/login.model')

loginValidation.use((req, res, next) => {
	const data = req.body
	const ajv = new Ajv()
	const validate = ajv.compile(loginSchema)
	const valid = validate(data)

	logger.info('Validando request de la solicitud')
	if (valid) {
		logger.info('Request valido')
		next()
	} else {
		logger.error(`Request invalido - ${validate.errors[0].message}`)
		res.status(400).json({
			code: '400',
			message: validate.errors[0].message
		})
	}
})

module.exports = loginValidation
