const OracleRunner = require('./oracleRunner')

class Runner {
	constructor() {
		this.strategy = new OracleRunner()
	}

	async runProcedure(procedure) {
		return await this.strategy.runProcedure(procedure)
	}
}

module.exports = Runner
