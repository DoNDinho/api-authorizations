'use strict'
const parseLoginResponse = (token, userData) => {
  return {
    token: token.token,
    expires_in: token.expiresIn,
    user: {
      name: userData['@NOMBRE'],
      role: {
        code: parseInt(userData['@ROL']),
        name: userData['@DESCRIPCION']
      }
    }
  }
}

module.exports = { parseLoginResponse }
