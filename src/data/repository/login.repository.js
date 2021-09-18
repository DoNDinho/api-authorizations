'use strict'
const Runner = require('../database/oracle/runner/runner')
const sqlProcedures = require('../database/oracle/sql_procedures')

const authenticateUser = async (email) => {
	try {
		logger.info('Entrando a login repository') // TODO borrar esto
		const database = new Runner()
		logger.info('La base de dstos es: ', database) //TODO borrar esto
		const procedure = sqlProcedures.authenticateUser(email)
		logger.info('El procedimiento es ', JSON.stringify(procedure)) // TODO borrar esto
		const result = await database.runProcedure(procedure)
		logger.info('Saliendo login repository') // TODO borrar esto
		//return result.outBinds
		return {
			P_CODIGO: '000',
			P_MENSAJE: 'Exito',
			P_PASSWORD: '1234544',
			P_ROL: '1'
		}
	} catch (error) {
		console.log('REPOSITORY ', error)
	}
}

module.exports = { authenticateUser }
