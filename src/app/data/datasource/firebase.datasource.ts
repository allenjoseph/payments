import {
    getValue,
    push,
    ServerValue,
    remove,
    setValue,
} from 'nativescript-plugin-firebase';

import { IDataSource } from './datasource.interface';

export class FirebaseDataSource implements IDataSource {
    private ref: string;

    constructor(reference: string) {
        this.ref = reference;
    }

    getById(id: string | number): Promise<any> {
        return getValue(`/${this.ref}/${id}`);
    }

    list(): Promise<any> {
        return getValue(`/${this.ref}/`);
    }

    async createOrUpdate(item: any): Promise<any> {
        if (item.id) {
            return setValue(`/${this.ref}/${item.id}`, item);
        }
        try {
            item.createdAt = ServerValue.TIMESTAMP;
            const result = await push(this.ref, item);
            return this.getById(result.key);
        } catch (err) {
            return Promise.resolve(null);
        }
    }

    delete(item: any): Promise<any> {
        return remove(`/${this.ref}/${item.id}`);
    }
}
