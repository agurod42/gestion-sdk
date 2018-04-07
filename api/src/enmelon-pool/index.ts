import crypto from 'crypto';
import Enmelon from '../enmelon';
import GestionORT from '../gestion/ort';

export default class EnmelonPool {

    private static instances: any = {};
    private static instanceReviverToken: any = {};

    static async instance(id: any): Promise<Enmelon> {
        if (!id) throw Error('instance id cannot be empty');

        if (!this.instances[id]) {
            this.instances[id] = new Enmelon(new GestionORT());
            await this.instances[id].init();
            this.instanceReviverToken[crypto.randomBytes(16).toString('hex')] = id;
        }

        return this.instances[id];
    }

    static async authenticatedInstance(token: any): Promise<Enmelon> {
        if (!this.instanceReviverToken[token]) throw Error('Invalid token');

        return await this.instance(this.instanceReviverToken[token]);
    }
 
}