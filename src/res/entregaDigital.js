
module.exports = function (sdk) {

    return {

        /**
         * Retorna el equipo asociado con la entrega digital con id `idEntrega`.
         * @param {number} idEntrega 
         * @returns {Promise<Array<Credito>>}
         */
        equipo(idEntrega) {
            return sdk._request('get', `EntregaDigital/${idEntrega}/Equipo`);
        },
        
    };

};