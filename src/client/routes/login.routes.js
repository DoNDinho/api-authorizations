const express = require('express')
const router = express.Router()
const { basePath } = require('../../business/utils/configs/api.config')
const headersValidation = require('../middlewares/validations/headers.validation')
const loginValidation = require('../middlewares/validations/login.validation')

router.post(`${basePath}/v1/login`, [headersValidation, loginValidation], (req, res) => {
	// TODO eliminar estos despues de realizar integración con BBDD
	const username01 = 'admin@admin.cl'
	const username02 = 'profesional@profesional.cl'
	const username03 = 'cliente@cliente.cl'
	const password01 = '1234'

	const username = req.body.data.username
	const password = req.body.data.password

	if (password !== password01) {
		return res.status(401).json({
			code: '401',
			message: 'Credenciales de usuario invalidas'
		})
	}

	let userRol
	switch (username) {
		case username01:
			userRol = 'ADMIN'
			break
		case username02:
			userRol = 'PROFESIONAL'
			break
		case username03:
			userRol = 'CLIENTE'
			break
		default:
			return res.status(401).json({
				code: '401',
				message: 'Credenciales de usuario invalidas'
			})
			break
	}

	return res.status(200).json({
		data: {
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
			user_rol: userRol
		}
	})
})

module.exports = router
