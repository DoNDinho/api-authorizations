'use strict'
const oracledb = require('oracledb')

const authenticateUser = (email) => {
	return {
		name: 'SP_AUTENTICAR_USUARIO',
		statement: `BEGIN SP_AUTENTICAR_USUARIO('${email}', :P_PASSWORD, :P_ROL, :P_CODIGO, :P_MENSAJE); END;`,
		bind: {
			P_PASSWORD: { dir: oracledb.BIND_OUT },
			P_ROL: { dir: oracledb.BIND_OUT },
			P_CODIGO: { dir: oracledb.BIND_OUT },
			P_MENSAJE: { dir: oracledb.BIND_OUT }
		}
	}
}

module.exports = { authenticateUser }
