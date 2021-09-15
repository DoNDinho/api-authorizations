const express = require('express')
const router = express.Router()
const { basePath } = require('../../business/utils/configs/api.config')
const headersValidation = require('../middlewares/validations/headers.validation')
const loginValidation = require('../middlewares/validations/login.validation')

router.post(`${basePath}/v1/login`, [headersValidation, loginValidation], (req, res) => {
	return res.status(200).json({
		data: {
			token:
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
		}
	})
})

module.exports = router
