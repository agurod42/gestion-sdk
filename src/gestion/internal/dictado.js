module.exports = class Dictado {

    constructor(root) {
        this.root = root;
    }

    async activos() {
        return this.root._apiRequestWithJSONResponse('Dictados', 'estado=MATERIASACTIVAS');
    }

    async evaluaciones(idDictado) {
        return this.root._apiRequestWithJSONResponse(`Dictados/${idDictado}/Evaluaciones`);
    }

}