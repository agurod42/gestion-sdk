
module.exports = function (sdk) {

    return {

        /**
         * Retorna los carritos para el estudiante autenticado. 
         * @returns {Promise<Carrito>}
         */
        carritos() {
            return sdk._request('get', `Pagos/Carritos`);
        },

        /**
         * Retorna los movimientos en la cuenta corriente del estudiante autenticado. 
         * @returns {Promise<Movimientos>}
         */
        movimientos() {
            return sdk._request('get', `Pagos/CtaCte?estado=MOVIMIENTOS`);
        },

        /**
         * Retorna el saldo actual de la cuenta corriente del estudiante autenticado. 
         * @returns {Promise<SaldoActual>}
         */
        saldoActual() {
            return sdk._request('get', `Pagos/CtaCte?estado=SALDO_ACTUAL`);
        },
        
    };

};