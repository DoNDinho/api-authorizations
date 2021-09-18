'use strict'
const Runner = require('../database/oracle/runner/runner')
const sqlProcedures = require('../database/oracle/sql_procedures')

const authenticateUser = async (email) => {
	try {
		console.log('Entrando a login repository') // TODO borrar esto
		const database = new Runner()
		const procedure = sqlProcedures.authenticateUser(email)
		console.log('El procedimiento es ', JSON.stringify(procedure)) // TODO borrar esto
		const result = await database.runProcedure(procedure)
		console.log('Saliendo login repository') // TODO borrar esto
		return result.outBinds
	} catch (error) {
		console.log('REPOSITORY ', error)
	}
}

module.exports = { authenticateUser }
