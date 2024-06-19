export default interface Repository<T> {
    getAll?: () => Promise<T[]>;
    getAllByUserId?: (userId: string) => Promise<T[]>;
}
