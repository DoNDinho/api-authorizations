const loginSchema = {
	type: 'object',
	properties: {
		data: {
			type: 'object',
			properties: {
				username: {
					type: 'string',
					minLength: 1
				},
				password: {
					type: 'string',
					minLength: 1
				}
			},
			required: ['username', 'password']
		}
	},
	required: ['data']
}

module.exports = loginSchema
