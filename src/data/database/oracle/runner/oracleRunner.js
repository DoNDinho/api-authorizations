'use strict'
const oracledb = require('oracledb')
const RunnerStrategy = require('./runnerStrategy')

class OracleRunner extends RunnerStrategy {
	constructor() {
		super()
	}

	async runProcedure(procedure) {
		try {
			// TODO Validar donde colocar conexion a base de datos
			const connection = await oracledb.getConnection({
				user: process.env.ORACLE_DB_USER,
				password: process.env.ORACLE_DB_PASSWORD,
				connectString: process.env.ORACLE_DB_HOST
			})

			logger.info(`Ejecutando procedimiento ${procedure.statement}`)
			const result = await connection.execute(procedure.statement, procedure.bind, {
				outFormat: oracledb.OUT_FORMAT_OBJECT
			})
			logger.info(`Procedimiento ${procedure.name} ejecutado exitosamente`)
			await connection.close()
			return result
		} catch (error) {
			logger.error(error)
		}
	}
}

module.exports = OracleRunner
