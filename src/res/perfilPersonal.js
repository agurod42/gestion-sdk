const querystring = require('querystring');

module.exports = function (sdk) {

    return {

        /**
         * Cambia la contraseña del estudiante autenticado. 
         * @param {string} contrasenaActual 
         * @param {string} contrasenaNueva 
         * @returns {Promise<void>}
         */
        cambiarContrasena(contrasenaActual, contrasenaNueva) {
            return sdk._request('put', `PerfilPersonal/CambiarPassword`, querystring.stringify({ usuario: sdk._usuario.Nombre, Password: contrasenaActual, NuevoPassword: contrasenaNueva }));
        },
        
    };

};