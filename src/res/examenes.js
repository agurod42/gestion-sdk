
module.exports = function (sdk) {

    return {

        /**
         * Retorna el calendario de exámenes vigente para el producto con id `idProducto`.
         * @param {number} idProducto
         * @returns {Promise<Array<Examen>>}
         */
        calendario(idProducto) {
            return sdk._request('get', `Examenes?estado=Calendario&idProducto=${idProducto}`);
        },

        /**
         * Retorna los exámenes con estado `estado` para el estudiante autenticado.
         * @param {('ABIERTOS'|'ARENDIR'|'RENDIDOS')} estado
         * @returns {Promise<Array<Examen>>}
         */
        listar(estado) {
            return sdk._request('get', `Examenes?estado=${estado}`);
        },

        /**
         * Retorna los exámenes abiertos para el estudiante autenticado.
         * @returns {Promise<Array<Examen>>}
         */
        listarAbiertos() {
            return this.listar('ABIERTOS');
        },

        /**
         * Retorna los exámenes a rendir para el estudiante autenticado.
         * @returns {Promise<Array<Examen>>}
         */
        listarARendir() {
            return this.listar('ARENDIR');
        },

        /**
         * Retorna los exámenes rendidos para el estudiante autenticado.
         * @returns {Promise<Array<Examen>>}
         */
        listarRendidos() {
            return this.listar('RENDIDOS');
        },
        
    };

};