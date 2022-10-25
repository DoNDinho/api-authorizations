'use strict'

const authenticateUser = (email) => {
  return {
    name: 'SP_AUTENTICAR_USUARIO',
    statements: [
      `CALL SP_AUTENTICAR_USUARIO('${email}', @PASSWORD, @ROL, @DESCRIPCION, @NOMBRE)`,
      'SELECT @PASSWORD, @ROL, @DESCRIPCION, @NOMBRE;'
    ],
    values: []
  }
}

module.exports = { authenticateUser }
