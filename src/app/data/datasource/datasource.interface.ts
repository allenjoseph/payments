export interface IDataSource {
    getById(id: number | string): Promise<any>;
    list(): Promise<any>;
    createOrUpdate(item: any): Promise<any>;
    delete(item: any): Promise<any>;
}
