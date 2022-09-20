const express = require('express')
const loginService = require('../../business/services/login.service')
const router = express.Router()

router.post(`/Authorizations/v1/login`, async (req, res, next) => {
	try {
		// const transactionId = req.headers['transaction-id']
		// logger.addContext('transaction_id', transactionId)
		const response = await loginService.login(req.body)
		logger.info({ message: 'Login exitoso', data: JSON.stringify(response) })
		res.json(response)
	} catch (error) {
		console.log('error: ', error.message)
		next(error)
	}
})
module.exports = router
