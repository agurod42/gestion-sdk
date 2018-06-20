'use strict';

const GestionPool = require('../src/gestion-pool');

afterAll(async () => {
    await GestionPool.deinitAllInstances();
});

test('login', async () => {
    let gestion = await GestionPool.instance('194412');
    let token = await gestion.login('194412', 'F3d320102');
    expect(token.length > 0).toBeTruthy();
});

test('dictadosActivos', async () => {
    let gestion = await GestionPool.instance('194412');
    let dictadosActivos = await gestion.dictado.activos();
    expect(dictadosActivos.length > 0).toBeTruthy();
    expect(dictadosActivos[0]).toHaveProperty('ObjMateria.IdMateria');
});

test('dictadoEvaluaciones', async () => {
    let gestion = await GestionPool.instance('194412');
    let dictadosActivos = await gestion.dictado.activos();
    let evaluaciones = await gestion.dictado.evaluaciones(dictadosActivos[0].Id);
    expect(evaluaciones).toHaveProperty('CantidadPuntos');
});