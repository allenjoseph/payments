import {
    getValue,
    push,
    ServerValue,
    remove,
    setValue,
    query,
    QueryOrderByType,
    QueryLimitType,
    QueryOptions,
} from 'nativescript-plugin-firebase';
import { getString } from 'tns-core-modules/application-settings/application-settings';
import { ListOptions } from '@payments/repository/commons/list-options';
import { DataSource } from '@payments/repository/commons/datasource';
import * as R from 'ramda';
import { Injectable } from '@angular/core';

@Injectable()
export class FirebaseService implements DataSource {
    getById(id: string | number): Promise<any> {
        return getValue(`/${this.ref}/${id}`);
    }

    async list(): Promise<any> {
        return getValue(`/${this.ref}/`).then(res => R.values(res.value));
    }

    async query(options: ListOptions): Promise<any> {
        return query(
            null,
            `/${this.ref}/`,
            this.generateQueryOptions(options)
        ).then(res => R.values(res.value));
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

    private generateQueryOptions(options: ListOptions) {
        const queryOptions = <QueryOptions>{ singleEvent: true };
        if (options.orderBy) {
            queryOptions.orderBy = {
                type: QueryOrderByType.CHILD,
                value: options.orderBy,
            };
        }
        if (options.limitFirst || options.limitLast) {
            queryOptions.limit = {
                type: options.limitFirst
                    ? QueryLimitType.FIRST
                    : QueryLimitType.LAST,
                value: options.limitFirst || options.limitLast,
            };
        }
        return queryOptions;
    }
}
