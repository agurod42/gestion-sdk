const querystring = require('querystring');

module.exports = function (sdk) {

    return {

        /**
         * Retorna los comienzos para el producto con id `idProducto`.
         * @param {number} idProducto
         * @returns {Promise<Array<Comienzo>>}
         */
        comienzos(idProducto) {
            return sdk._request('get', `Cursos/Comienzos?idProducto=${idProducto}`);
        },

        /**
         * Retorna las inscripciones del estudiante autenticado.
         * @returns {Promise<Array<Inscripcion>>}
         */
        inscripciones() {
            return sdk._request('get', `Cursos/Inscripciones`);
        },

        /**
         * Retorna los créditos disponibles de la oferta con id `idOferta` para el producto con id `idProducto`, el comienzo con id `idComienzo`.
         * @param {number} idProducto
         * @param {number} idComienzo
         * @param {number} idOferta
         * @returns {Promise<Array<OfertaCredito>>}
         */
        ofertasCreditos(idProducto, idComienzo, idOferta) {
            return sdk._request('post', `Cursos/OfertasCreditos?idProducto=${idProducto}&idComienzo=${idComienzo}`, querystring.stringify({ '[]': idOferta }));
        },

        /**
         * Retorna las ofertas disponibles para el producto con id `idProducto`, el comienzo con id `idComienzo`.
         * @param {number} idProducto
         * @param {number} idComienzo
         * @returns {Promise<Array<Oferta>>}
         */
        ofertasPorProducto(idProducto, idComienzo) {
            return sdk._request('get', `Cursos/OfertasPorProducto?idProducto=${idProducto}&idComienzo=${idComienzo}`);
        },

        /**
         * Retorna los productos adquiridos por el estudiante autenticado.
         * @returns {Promise<Array<Producto>>}
         */
        productos() {
            return sdk._request('get', `Cursos/Productos`);
        }
        
    };

};