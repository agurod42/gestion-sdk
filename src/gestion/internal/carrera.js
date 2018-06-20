module.exports = class Carrera {

    constructor(root) {
        this.root = root;
    }

    async activas() {
        return this.root._apiRequestWithJSONResponse('Cursos/Productos');
    }

}