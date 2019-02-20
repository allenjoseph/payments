import { IDataSource } from './datasource.interface';

export abstract class BaseDataSource implements IDataSource {
    abstract getById<T>(id: number | string): Promise<T>;

    abstract list<T>(): Promise<T[]>;

    abstract createOrUpdate<T>(item: T): Promise<T>;

    abstract delete<T>(item: T): Promise<T>;
}
