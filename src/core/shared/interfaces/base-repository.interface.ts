import { BaseEntity } from "../entities/base-entity.entity";

export type GetListOptions = Partial<{
    limit: number;
    offset: number;
    includeDeleted: boolean;
}>;

export interface GetByIdOptions {
    includeDeleted?: boolean;
}

export interface BaseRepository<T extends BaseEntity> {
    save(entity: T): Promise<T>;
    update(entityId: T["entityId"], payload: Partial<T>): Promise<T>;
    getById(entityId: T["entityId"], options: GetByIdOptions): Promise<T | null>;
    getList<TGetListCondition = any>(cond: TGetListCondition, options?: GetListOptions): Promise<T[]>;
    delete(entityId: T["entityId"]): Promise<void>;
}
