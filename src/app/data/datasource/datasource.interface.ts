export interface IDataSource {
    getById<T>(id: number | string): Promise<T>;
    list<T>(): Promise<T[]>;
    createOrUpdate<T>(item: T): Promise<T>;
    delete<T>(item: T): Promise<T>;
}
