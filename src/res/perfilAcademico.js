
module.exports = function (sdk) {

    return {

        /**
         * Retorna los créditos obtenidos por el estudiante autenticado. 
         * @returns {Promise<Array<Credito>>}
         */
        creditos() {
            return sdk._request('get', `PerfilAcademico/CreditosACD`);
        },

        /**
         * Retorna las materias del título con id `idTitulo`.
         * @param {number} idTitulo 
         * @returns {Promise<Array<Materia>>}
         */
        materiasDelTitulo(idTitulo) {
            return sdk._request('get', `PerfilAcademico/MateriaDelTitulo?idTitulo=${idTitulo}`);
        },

        /**
         * Retorna las materias previas de la materia con id `idMateria` del título con id `idTitulo`.
         * @param {number} idTitulo 
         * @returns {Promise<Array<Materia>>}
         */
        previasDeMateria(idTitulo, idMateria) {
            return sdk._request('get', `PerfilAcademico/MateriaDelTitulo/PreviasDeMateria?idTitulo=${idTitulo}&idMateria=${idMateria}`);
        },

        /**
         * Retorna los títulos disponibles en el perfil académico del estudiante autenticado.
         * @returns {Promise<Array<Titulo>>}
         */
        titulos() {
            return sdk._request('get', `PerfilAcademico/Titulos?estado=CERTIFICADO195`);
        },
        
    };

};