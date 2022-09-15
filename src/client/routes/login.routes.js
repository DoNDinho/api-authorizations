const express = require('express')
const loginService = require('../../business/services/login.service')
const router = express.Router()

router.post(`/Authorizations/v1/login`, async (req, res, next) => {
	try {
		// const transactionId = req.headers['transaction-id']
		// logger.addContext('transaction_id', transactionId)
		// const response = await loginService.login(req.body)
		// logger.info({ message: 'Login exitoso', data: response })
		const response = login(req.body.username, req.body.password)
		res.json(response)
	} catch (error) {
		next(error)
	}
})
// TODO esto se debe borrar
const login = (username, password) => {
	let idRol
	let nameRol
	if(username == 'admin@gmail.com' && password == '12345') {
		idRol = 1
		nameRol = 'ADMIN'
	} else if (username == 'cliente@gmail.com' && password == '12345') {
		idRol = 2
		nameRol = 'CLIENTE'
	} else if (username == 'bodega@gmail.com' && password == '12345') {
		idRol = 3
		nameRol = 'BODEGA'
	} else if (username == 'finanza@gmail.com' && password == '12345') {
		idRol = 4
		nameRol = 'FINANZA'
	} else if ( username == 'cocina@gmail.com' && password == '12345') {
		idRol = 5
		nameRol = 'COCINA'
	} else {
		throw { httpCode: 401, message: "Credenciales invalidas" }
	}
	
	return {
		token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
		expires_in: '3600',
		user: {
			role: {
				code: idRol,
				name: nameRol
			}
		}
	}
}

module.exports = router
