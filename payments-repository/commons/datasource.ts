import { ListOptions } from './list-options';

export abstract class DataSource {
    abstract getById(id: number | string): Promise<any>;
    abstract list(): Promise<any>;
    abstract createOrUpdate(item: any): Promise<any>;
    abstract delete(item: any): Promise<any>;
    abstract query(options?: ListOptions): Promise<any>;
}
