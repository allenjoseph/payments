export abstract class UseCase {
    abstract execute(): Promise<any[]>;
}
