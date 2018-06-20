'use strict';

const EnmelonPool = require('../src/enmelon-pool');

afterAll(async () => {
    await EnmelonPool.deinitAllInstances();
});

test('login', async () => {
    let enmelon = await EnmelonPool.instance('194412');
    let res = await enmelon.login('194412', 'F3d320102');
    expect(res.length > 0).toBeTruthy();
});

test('dictados', async () => {
    let enmelon = await EnmelonPool.instance('194412');
});