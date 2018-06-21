const GestionPool = require('../src/gestion-pool');

require('dotenv').config();

afterAll(async () => {
    await GestionPool.deinitAllInstances();
});

test('login', async () => {
    let gestion = await GestionPool.instance(process.env.GESTION_USER);
    let token = await gestion.login(process.env.GESTION_USER, process.env.GESTION_PASSWORD, 10000);
    expect(token.length > 0).toBeTruthy();
}, 10000);

test('login with wrong credentials', async () => {
    let gestion = await GestionPool.instance('invalid_user');
    expect(gestion.login('invalid_user', 'invalid_password')).rejects.toEqual(new Error());
});

test('carrerasActivas', async () => {
    let gestion = await GestionPool.instance(process.env.GESTION_USER);
    let carrerasActivas = await gestion.carrera.activas();
    expect(carrerasActivas.length > 0).toBeTruthy();
    expect(carrerasActivas[0]).toHaveProperty('IdProducto');
});

test('dictadosActivos', async () => {
    let gestion = await GestionPool.instance(process.env.GESTION_USER);
    let dictadosActivos = await gestion.dictado.activos();
    expect(dictadosActivos.length > 0).toBeTruthy();
    expect(dictadosActivos[0]).toHaveProperty('ObjMateria.IdMateria');
});

test('dictadoEvaluaciones', async () => {
    let gestion = await GestionPool.instance(process.env.GESTION_USER);
    let dictadosActivos = await gestion.dictado.activos();
    let evaluaciones = await gestion.dictado.evaluaciones(dictadosActivos[0].Id);
    expect(evaluaciones).toHaveProperty('CantidadPuntos');
});