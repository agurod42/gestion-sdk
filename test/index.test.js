'use strict';

const GestionPool = require('../src/gestion-pool');

afterAll(async () => {
    await GestionPool.deinitAllInstances();
});

test('login', async () => {
    let gestion = await GestionPool.instance('194412');
    let res = await gestion.login('194412', 'F3d320102');
    expect(res.length > 0).toBeTruthy();
});

test('dictados', async () => {
    let gestion = await GestionPool.instance('194412');
});