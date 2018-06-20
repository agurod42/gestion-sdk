const crypto = require('crypto');
const Gestion = require('../gestion');

class EnmelonPool {

    constructor() {
        this.instances = {};
        this.instancesTokens = {};
        this.instancesTokenReviver = {};
    }

    async deinitAllInstances() {
        for (var i in this.instances) {
            await this.instances[i].deinit();
        }
    }

    async instance(id) {
        if (!id) throw Error('instance id cannot be empty');

        if (!this.instances[id]) {
            this.instances[id] = new Gestion();
            await this.instances[id].init();

            let token = crypto.randomBytes(16).toString('hex');
            this.instancesTokens[id] = token;
            this.instancesTokenReviver[token] = id;
        }

        return this.instances[id];
    }

    async instanceFromToken(token) {
        if (!this.instancesTokenReviver[token]) throw Error('Invalid token');

        return await this.instance(this.instancesTokenReviver[token]);
    }

    async instanceToken(id) {
        return this.instancesTokens[id];
    }
 
}

module.exports = new EnmelonPool();