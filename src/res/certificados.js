
module.exports = function (sdk) {

    return {

        /**
         * Retorna el PDF del certificado 195 para el título con id `idTitulo` en `base64`. 
         * @param {number} idTitulo
         * @returns {Promise<string>}
         */
        cert195PDF(idTitulo) {
            return sdk._request('get', `Certificado/195XML?idTitulo=${idTitulo}&enviaMail=false`).then(certificado => certificado.PDF);
        },
        
    };

};