import {
    getValue,
    push,
    ServerValue,
    remove,
    setValue,
} from 'nativescript-plugin-firebase';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { InjectionToken } from '@angular/core';
import * as R from 'ramda';

import { IDataSource } from './datasource.interface';

export class FirebaseDataSource implements IDataSource {
    getById(id: string | number): Promise<any> {
        return getValue(`/${this.ref}/${id}`);
    }

    list(): Promise<any> {
        return getValue(`/${this.ref}/`).then(res => R.values(res.value));
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

    get ref() {
        return getString('firebase.db.ref');
    }
}

/**
 * Create a provider to inject DataSourceProvider instance
 * of FirebaseDataSource or any other data source.
 */
export const DataSourceProvider = new InjectionToken(
    'DataSource provider for angular',
    {
        providedIn: 'root',
        factory: () => new FirebaseDataSource(),
    }
);
