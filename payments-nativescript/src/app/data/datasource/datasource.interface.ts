export interface DataSource {
    getById(id: number | string): Promise<any>;
    list(): Promise<any>;
    createOrUpdate(item: any): Promise<any>;
    delete(item: any): Promise<any>;
    query(options?: IQueryOptions): Promise<any>;
}

export interface IQueryOptions {
    orderBy?: string;
    startAt?: any;
    endAt?: any;
    limitFirst?: number;
    limitLast?: number;
}
