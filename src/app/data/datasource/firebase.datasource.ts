import {
    getValue,
    push,
    ServerValue,
    remove,
    setValue,
} from 'nativescript-plugin-firebase';

import { BaseDataSource } from './base.datasource';

export class FirebaseDataSource extends BaseDataSource {
    private resource: string;

    constructor(resource: string) {
        super();
        this.resource = resource;
    }

    getById<T>(id: string | number): Promise<T> {
        return getValue(`/${this.resource}/${id}`);
    }

    list<T>(): Promise<T[]> {
        return getValue(`/${this.resource}/`);
    }

    async createOrUpdate<T>(item: T): Promise<T> {
        if (item['id']) {
            return setValue(`/${this.resource}/ ${item['id']}`, item);
        }
        const { key } = await push(this.resource, {
            ...item,
            createdAt: ServerValue.TIMESTAMP,
        });

        return this.getById(key);
    }

    delete<T>(item: T): Promise<T> {
        return remove(`/${this.resource}/ ${item['id']}`);
    }
}
