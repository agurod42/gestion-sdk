const axios = require('axios');
const querystring = require('querystring');

const API_URL = 'https://gestionapi.ort.edu.uy/ORT';
const SECURE_API_URL = 'https://gestionapi.ort.edu.uy/ORTSecure';

module.exports = (function () {

    var _token;
    var _usuario;

    return {
    
        /**
         * Autentica al usuario con las credenciales `usuario` y `contrasenha`.
         * @param {string} usuario
         * @param {string} contrasenha
         * @returns {Promise<Usuario>}
         */
        iniciarSesion: (usuario, contrasenha) => {
            return axios.post(`${API_URL}/Login`, querystring.stringify({ Usuario: usuario, Password: contrasenha }))
                        .then(res => {
                            _token = res.data.Password;
                            _usuario = usuario;
                            return res.data;
                        });
        },
    
        /**
         * Retorna la foto de perfil del estudiante autenticado en formato `base64`.
         * @returns {Promise<string>}
         */
        foto: () => {
            return this._request('get', 'Foto');
        },
    
        certificados: (() => require('./res/certificados')(this))(),
        cursos: (() => require('./res/cursos')(this))(),
        dictados: (() => require('./res/dictados')(this))(),
        entregaDigital: (() => require('./res/entregaDigital')(this))(),
        examenes: (() => require('./res/examenes')(this))(),
        pagos: (() => require('./res/pagos')(this))(),
        perfilAcademico: (() => require('./res/perfilAcademico')(this))(),

        _request: _request = (method, path, data) => {
            if (!_token || !_token.length) throw 'Unauthorized method invocation';
    
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'x-token': _token
            };
    
            return axios(`${SECURE_API_URL}/${path}`, { method: method, headers: headers, data: data }).then(res => res.data);
        },

        _usuario: (() => _usuario)()

    };

})();
