'use strict'
const mysql = require('mysql2/promise')

class MySqlRunner {
	constructor(client) {
		this.connection = client.getConnection()
	}

	async runProcedure(procedure) {
		try {
			const result = []
			// await this.connect()
			for (const statement of procedure.statements) {
				const [rows] = await this.connection.execute(statement, procedure.values)
				result.push(rows)
			}
			// this.close()
			return result
		} catch (error) {
			console.log(`error al ejecutar procedimiento ${procedure.name}. ${error.message}`)
			throw error
		}
	}

	async connect() {
		const connection = await mysql.createConnection({
			host: process.env.MYSQL_HOST,
			user: process.env.MYSQL_USER,
			password: process.env.MYSQL_PASS,
			database: process.env.MYSQL_DATABASE,
			multipleStatements: true
		})

		this.connection = connection
	}

	async close() {
		await this.connection.end()
	}
}

module.exports = MySqlRunner
