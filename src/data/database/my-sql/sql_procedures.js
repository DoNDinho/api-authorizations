'use strict'

const authenticateUser = (email) => {
	return {
		name: 'SP_AUTENTICAR_USUARIO',
		statements: [
			`CALL SP_AUTENTICAR_USUARIO('${email}', @PASSWORD, @ROL, @DESCRIPCION)`,
			'SELECT @PASSWORD, @ROL, @DESCRIPCION;'
		],
		values: []
	}
}

module.exports = { authenticateUser }
