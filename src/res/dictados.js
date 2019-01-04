
module.exports = function (sdk) {

    return {

        /**
         * Retorna las instancias de evaluación para el dictado con id `idDictado`. 
         * @param {number} idDictado
         * @returns {Promise<Array<Evaluacion>>}
         */
        evaluaciones(idDictado) {
            return sdk._request('get', `Dictados/${idDictado}/Evaluaciones`);
        },

        /**
         * Retorna los dictados con estado `estado` para el estudiante autenticado.
         * @param {('CON_EVALUACIONES_ABIERTAS'|'CON_EVALUACIONES_ARENDIR'|'CON_EVALUACIONES_RENDIDAS'|'MATERIASACTIVAS')} estado
         * @returns {Promise<Array<Dictado>>}
         */
        listar(estado) {
            return sdk._request('get', `Dictados?estado=${estado}${estado.indexOf('CON_EVALUACIONES') === 0 ? '&tipoEvaluacion=TODAS' : ''}`);
        },

        /**
         * Retorna los dictados con evaluaciones a rendir para el estudiante autenticado.
         * @returns {Promise<Array<Dictado>>}
         */
        listarConEvaluacionesAbiertas() {
            return this.listar('CON_EVALUACIONES_ABIERTAS');
        },

        /**
         * Retorna los dictados con evaluaciones a rendir para el estudiante autenticado.
         * @returns {Promise<Array<Dictado>>}
         */
        listarConEvaluacionesARendir() {
            return this.listar('CON_EVALUACIONES_ARENDIR');
        },

        /**
         * Retorna los dictados con evaluaciones rendidas para el estudiante autenticado.
         * @returns {Promise<Array<Dictado>>}
         */
        listarConEvaluacionesRendidas() {
            return this.listar('CON_EVALUACIONES_RENDIDAS');
        },

        /**
         * Retorna los dictados activos para el estudiante autenticado.
         * @returns {Promise<Array<Dictado>>}
         */
        listarConMateriasActivas() {
            return this.listar('MATERIASACTIVAS');
        },
        
    };

};