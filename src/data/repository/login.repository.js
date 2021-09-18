'use strict'
const Runner = require('../database/oracle/runner/runner')
const sqlProcedures = require('../database/oracle/sql_procedures')

const authenticateUser = async (email) => {
	try {
		logger.info('Entrando a login repository') // TODO borrar esto
		const database = new Runner()
		const procedure = sqlProcedures.authenticateUser(email)
		const result = await database.runProcedure(procedure)
		return result.outBinds
	} catch (error) {
		console.log('REPOSITORY ', error)
	}
}

module.exports = { authenticateUser }
