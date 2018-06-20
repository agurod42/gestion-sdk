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

test('cursosActivos', async () => {
    let gestion = await GestionPool.instance('194412');
    let cursosActivos = await gestion.cursosActivos();
    expect(cursosActivos.length > 0).toBeTruthy();
    expect(cursosActivos[0]).toHaveProperty('ObjMateria.IdMateria');
});