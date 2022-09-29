const express = require('express')
const validateTokenService = require('../../business/services/validate-token')
const router = express.Router()

router.get(`/Authorizations/v1/authentications/:token/validate`, async (req, res, next) => {
	try {
		await validateTokenService.execute(req.params.token)
		const message = 'Autorizacion exitosa'
		logger.info({ message })
		res.json({ message })
	} catch (error) {
		console.log('error: ', error.message)
		next(error)
	}
})
module.exports = router
