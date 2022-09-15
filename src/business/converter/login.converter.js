'use strict'
const parseLoginResponse = (token, userData) => {
	return {
		token,
		user_rol: userData.P_ROL
	}
}

module.exports = { parseLoginResponse }
