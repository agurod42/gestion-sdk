import crypto from 'crypto';
import Enmelon from '../enmelon';
import GestionORT from '../gestion/ort';

export default class EnmelonPool {

    private static instances: any = {};
    private static instancesTokens: any = {};
    private static instancesTokenReviver: any = {};

    static async instance(id: any): Promise<Enmelon> {
        if (!id) throw Error('instance id cannot be empty');

        if (!this.instances[id]) {
            this.instances[id] = new Enmelon(new GestionORT());
            await this.instances[id].init();

            let token = crypto.randomBytes(16).toString('hex');
            this.instancesTokens[id] = token;
            this.instancesTokenReviver[token] = id;
        }

        return this.instances[id];
    }

    static async instanceFromToken(token: any): Promise<Enmelon> {
        if (!this.instancesTokenReviver[token]) throw Error('Invalid token');

        return await this.instance(this.instancesTokenReviver[token]);
    }

    static instanceToken(id: string): string {
        return this.instancesTokens[id];
    }
 
}